/** @format */

import { Task } from './task.models';

export type Project = {
  userId: number;
  projectId: number;
  projectName: string;
  tasks: Task[];
};
