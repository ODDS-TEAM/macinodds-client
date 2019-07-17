import { User } from './user';

export interface Login {
    token: string;
    firstLogin: boolean;
    user: User;
}
