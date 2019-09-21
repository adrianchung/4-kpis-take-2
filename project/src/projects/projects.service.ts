import { Injectable } from '@nestjs/common';
import { Project } from '../project.interface';

@Injectable()
export class ProjectsService {
  stats(key: string): Project {
    return {
      key: 'DLK',
      leadTime: 32,
      deploymentFrequency: 2,
      deploymentFailureRate: 7,
      meanTimeToRestore: 53,
    }
  }
}
