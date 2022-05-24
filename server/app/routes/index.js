import authRoutes from './auth.routes.js';
import safezoneRoutes from './safezone.routes.js';
import safezoneUserRoute from './safezoneUser.routes.js';
import userRoutes from './user.routes.js';
import routeMessage from './message.routes.js';

const configureRoutes = (app) => {
    authRoutes(app);
    safezoneRoutes(app);
    safezoneUserRoute(app);
    userRoutes(app);
    routeMessage(app);
    
}

export default configureRoutes;