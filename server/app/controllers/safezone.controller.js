import db from "../models/index.js";
import { verifyJwtToken } from '../global/Global.js';
import { ErrorMessage } from '../global/ErrorMessage.js';

export const createSafezone = (res, req) => {
    console.log('create', res, req);
}

export const getSafezone = (res, req) => {
    console.log('get', res, req);
}

export const updateSafezone = (res, req) => {
    console.log('update', res, req);
}

export default createSafezone;