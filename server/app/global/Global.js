import dotenv from 'dotenv';
dotenv.config({ path: '.env.local'});

import jwt from 'jsonwebtoken';

export const verifyJwtToken = (accessToken, options = undefined) => {
    return jwt.verify(accessToken, process.env.AUTH_SECRET, undefined);
}

export const compareSort = (a, b, invert = false) => {
    if (typeof a === String) {
        if (a.toLowerCase() < b.toLowerCase() ? !invert : invert) {
            return -1;
        }
        if (a.toLowerCase() > b.toLowerCase() ? !invert : invert) {
            return 1;
        }
    }
    else {
        if (a < b ? !invert : invert) {
            return -1;
        }
        if (a > b ? !invert : invert) {
            return 1;
        }
    }
    return 0;
}