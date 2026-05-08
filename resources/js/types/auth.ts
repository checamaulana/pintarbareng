/**
 * Auth types — re-export dari models untuk backward compatibility.
 * User type yang lengkap ada di models.ts.
 */
export type { User } from './models';

export type Auth = {
    user: import('./models').User | null;
};
