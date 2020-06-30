import { Project } from 'src/modules/project/models';

export type UserForView = {
  UserName: string;
  Projects: Project[];
};

export type UserForAuthorization = {
  UserName: string;
  Password: string;
};
