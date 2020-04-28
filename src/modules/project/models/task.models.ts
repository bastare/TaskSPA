/** @format */

export type Task = {
  id: number;
  name: string;
  deadline: string | Date;
  status: Status;
  priority: number;
};

export type ProjectForCreate = {
  task: string;
};

export type ProjectForUpdate = {
  task: string;
};

export type TaskForCreate = {
  task: string;
  deadline: Date;
  priority: number;
};

export type TaskForUpdate = {
  task: string;
  deadline: Date;
};
export enum Status {
  Done,
  Expired,
  Onway
}
