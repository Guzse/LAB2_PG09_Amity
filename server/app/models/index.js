import mongoose from 'mongoose';

import User from './user.model.js';
import Role from './role.model.js';

mongoose.Promise = global.Promise;
export const db = {
    mongoose,
    user: User,
    role: Role,
    ROLES: ["user", "admin"]
};

export default db;