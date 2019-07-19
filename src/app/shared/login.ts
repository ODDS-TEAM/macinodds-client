import { User } from './user';

export interface Login {
    firstLogin: boolean;
    token: string;
    register: boolean;
    user: User;
}
