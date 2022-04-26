import db from "../models/index.js";
import { verifyJwtToken } from '../global/Global.js';
import { ErrorMessage } from '../global/ErrorMessage.js';

export const createSafezone = (accessToken, zoneName, zoneDescription = '') => {
    const token = verifyJwtToken(accessToken);
    console.log(token);
}

export default createSafezone;