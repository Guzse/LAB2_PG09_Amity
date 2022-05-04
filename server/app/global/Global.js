import dotenv from 'dotenv';
dotenv.config({ path: '.env.local'});

import jwt from 'jsonwebtoken';

export const verifyJwtToken = (accessToken, options = undefined) => {
    return jwt.verify(accessToken, process.env.AUTH_SECRET, undefined);
}
