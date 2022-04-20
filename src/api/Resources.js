require("dotenv").config({ path: '.env.local'}); 
export default class Resources {
    static ServerUrl = process.env.API_URI;
}