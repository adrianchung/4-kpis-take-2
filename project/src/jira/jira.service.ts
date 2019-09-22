import { Injectable, Logger } from '@nestjs/common';
import JiraApi from 'jira-client';
import { ConfigService } from '../config/config.service';
import { min, average } from 'simple-statistics';
import prettyMilliseconds from 'pretty-ms';
import { Release } from '../release.interface';

@Injectable()
export class JiraService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Returns the releases for a specific JIRA project between startDate (inclusive) and endDate (exclusive)
   * along with metadata about the release, including issues in the release as well as lead time.
   * 
   * @param projectId The JIRA project id
   * @param startDate The startDate in yyyy-mm-dd format
   * @param endDate The endDate in yyyy-mm-dd format
   */
  async releases(projectId: string, startDate: string, endDate: string): Promise<Release[]> {
    const jiraClient = new JiraApi({
      protocol: 'https',
      host: this.configService.get('JIRA_HOST'),
      username: this.configService.get('JIRA_USERNAME'),
      password: this.configService.get('JIRA_USER_PASSWORD'),
      apiVersion: '2',
      strictSSL: true
    });
    
    // const endDate = '2019-12-31';
    // const startDate = '2019-07-01';
    // const projectId = 'DLK';

    const releases = [];

    const versions: JiraApi.JsonResponse = await jiraClient.getVersions(projectId);
    const versionsInRange = versions.filter((version: any) => version.released && version.releaseDate < endDate && version.releaseDate >= startDate);

    const averageDoneToReleaseLeadTimes: number[] = [];
    for (const version of versionsInRange) {
      const issuesInVersion = [];

      // Release dates in JIRA only have start of day, so assume we release next day
      const releaseDate: Date = new Date(new Date(version.releaseDate).getTime() + (1000 * 60 * 60 * 24)); 
      console.log(`\n=== RELEASE ${version.name} on ${releaseDate} ===`);

      // console.log(release.name);
      const issues = await jiraClient.searchJira(`project = ${projectId} AND fixVersion = '${version.name}'`, { fields: [ 'created', 'summary' ]});
      const doneDates: Date[] = [];
      for (const issue of issues.issues) {
        // console.log(issue);
        const endStateDates: Date[] = [];
        const histories = (await jiraClient.findIssue(issue.key, "changelog")).changelog.histories;

        // In order to see when a JIRA ticket transitioned to 'Done' or 'Closed' state we need to look at the history items in a ticket
        histories.forEach((h: any) => {
          for (const historyItem of h.items) {
            if (historyItem.field === 'status' && (historyItem.toString === 'Done' || historyItem.toString === 'Closed')) {
              const temp = new Date(h.created);
              // We want to filter out anything that closes after the release date.
              // This can happen if we have a fixVersion in a ticket that is done but we forget to move it to a completed state.
              // If we don't filter this out it can potentially skew the results as we'll have negative lead times
              if (+releaseDate >= +temp) { 
                endStateDates.push(temp);
              }
            }
          }
        });
        if (endStateDates.length > 0) {
          doneDates.push(new Date(min(endStateDates.map(d => +d))));
        }
        issuesInVersion.push({
          key: issue.key,
          url: issue.self,
          title: issue.fields.summary
        });
      }

      const doneDifferences = doneDates.map((d: Date) => (+releaseDate - +d)); // The + coerces to a number
      if (doneDifferences.length > 0) {
        const avgDoneToRelease = average(doneDifferences);
        console.log(`Lead time of ${prettyMilliseconds(avgDoneToRelease)}`);
        averageDoneToReleaseLeadTimes.push(avgDoneToRelease);

        releases.push({
          version: version.name,
          description: version.description || '',
          leadTimeAsString: prettyMilliseconds(average(averageDoneToReleaseLeadTimes)),
          issues: issuesInVersion
        });
      }
    }
    console.log(`\nAverage done to release lead time is: ${prettyMilliseconds(average(averageDoneToReleaseLeadTimes))}`);
    return releases;
  }
}

/**
 * jiraApi.getVersions("DLK") example
 * [{
    self: 'https://jira.miohq.com/rest/api/2/version/13024',
    id: '13024',
    description: 'Roll out feature X',
    name: '1.16',
    archived: true,
    released: true,
    releaseDate: '2017-11-23',
    userReleaseDate: '23/Nov/17',
    projectId: 11410
  }]
 */
