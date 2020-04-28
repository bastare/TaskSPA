/** @format */

import { StatusPipe } from './pipe/status.pipe';
import { ProjectService } from './project-service/project.service';
import { TaskService } from './task-service/task.service';

export const pipes = [StatusPipe];

export const services = [ProjectService, TaskService];

export * from './pipe/status.pipe';
export * from './project-service/project.service';
export * from './task-service/task.service';
// export * from './task.resolve';
