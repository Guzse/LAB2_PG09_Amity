import authRoutes from './auth.routes.js';
import safezoneRoutes from './safezone.routes.js';
import safezoneUserRoute from './safezoneUser.routes.js';

const configureRoutes = (app) => {
    authRoutes(app);
    safezoneRoutes(app);
    safezoneUserRoute(app);
}

export default configureRoutes;