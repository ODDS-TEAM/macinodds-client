import { User } from './user';

export interface Login {
    token: string;
    firstLogin: boolean
    register: boolean;
    user: User;
}
