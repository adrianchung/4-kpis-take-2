export interface Project {
  key: string;
  leadTime: number;
  deploymentFrequency: number;
  deploymentFailureRate: number;
  meanTimeToRestore: number;
}
