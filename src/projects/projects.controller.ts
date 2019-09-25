import { Controller, Get, Param, Query } from '@nestjs/common';
import { Project } from '../project.interface';
import { ProjectsService } from './projects.service';
import { DateBoundQuery } from '../date-bound-query.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':projectId/stats')
  async findOneWtihStats(@Param('projectId') projectId: string, 
                         @Query() query: DateBoundQuery): Promise<Project> {
    return this.projectsService.stats(projectId, query.startDate, query.endDate);
  }
}
