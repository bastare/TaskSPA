import { Project } from 'src/modules/project/models';

export type UserForView = {
  Login: string;
  Projects: Project[];
};

export type UserForAuthorization = {
  Login: string;
  Password: string;
};
