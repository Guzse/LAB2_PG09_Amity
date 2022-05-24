import mongoose from 'mongoose';

import User from './user.model.js';
import Role from './role.model.js';
import Safezone from './safezone.model.js';
import SafezoneUser from './safezoneUser.model.js';
import Message from './message.model.js';

mongoose.Promise = global.Promise;
export const db = {
    mongoose,
    user: User,
    role: Role,
    message: Message,

    safezone: Safezone,
    safezoneUser: SafezoneUser,

    ROLES: ["user", "admin"]
};

export default db;