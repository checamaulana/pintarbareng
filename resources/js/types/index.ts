export type * from './models';
export type { Auth } from './auth';

import type { User } from './models';

export type SharedData = {
    name: string;
    auth: {
        user: User | null;
    };
    flash?: {
        success?: string;
        error?: string;
        info?: string;
    };
    [key: string]: unknown;
};
