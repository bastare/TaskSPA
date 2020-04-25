/** @format */

export type Task = {
  Task: string;
  Deadline: string;
  Status: Status;

  ProjectId: number;
};

export type TaskForUpdate = {
  task: string;
  deadline: Date;
};

enum Status {
  Done,
  Expired,
  Onway
}
