import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { JiraService } from '../jira/jira.service';
import { ConfigService } from '../config/config.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, JiraService, ProjectsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
