import { Test, TestingModule } from '@nestjs/testing';
import { JiraService } from './jira.service';
import { ConfigService } from '../config/config.service';

describe('JiraService', () => {
  let service: JiraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, JiraService],
    }).compile();

    service = module.get<JiraService>(JiraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
