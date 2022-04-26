import dotenv from 'dotenv';
dotenv.config({ path: '.env.local'});

import jwt from 'jsonwebtoken';

export const verifyJwtToken = (accessToken, options = undefined) => {
    console.log(accessToken);
    return jwt.verify(accessToken, process.env.AUTH_SECRET, undefined);
}
