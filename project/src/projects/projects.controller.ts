import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
// import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';
import { ProjectsService } from './projects.service';
import { Project } from '../project.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  // @Post()
  // create(@Body() createCatDto: CreateCatDto) {
  //   return 'This action adds a new cat';
  // }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return `This action returns a JIRA project ${key}`;
  }

  @Get(':key/stats')
  async findOneWtihStats(@Param('key') key: string): Promise<Project> {
    return this.projectsService.stats(key);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} cat`;
  // }
}
