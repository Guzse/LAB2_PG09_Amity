import authRoutes from './auth.routes.js';
import safezoneRoutes from './safezone.routes.js';

const configureRoutes = (app) => {
    authRoutes(app);
    safezoneRoutes(app);
}

export default configureRoutes;