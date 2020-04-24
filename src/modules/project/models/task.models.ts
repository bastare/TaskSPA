export type Task = {
  Name: string;
  Deadline: string;
  Status: Status;

  ProjectId: number;
};

enum Status {
  Done,
  Expired,
  Onway
}
