import { Issue } from './issue.interface';
export interface Release {
  version: string;
  description: string;
  leadTimeAsString: string;
  issues: Issue[];
}
