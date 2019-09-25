import { Injectable, Param } from '@nestjs/common';
import { Project } from '../project.interface';
import { JiraService } from '../jira/jira.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly jiraService: JiraService) {}

  async stats(projectId: string, startDate: string, endDate: string): Promise<Project> {
    return {
      key: projectId,
      releases: await this.jiraService.releases(projectId, startDate, endDate)
    }
    // return {
    //   key: 'DLK',
    //   leadTime: 32,
    //   deploymentFrequency: 2,
    //   deploymentFailureRate: 7,
    //   meanTimeToRestore: 53,
    // }
  }
}
