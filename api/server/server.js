import express from 'express';
import bodyParser from 'body-parser';
import  cors  from'cors';
import http from 'http'; 
import { Connection } from '../db/dbConnection.js';
import { API_ROUTES } from '../constants/constants.js';
import { errorMiddleware } from '../middlewares/errorMiddleware.js';
import { logRequestDetails } from '../middlewares/logRequestDetails.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.hostname = '0.0.0.0';
        this.server = http.createServer(this.app);
        this.db = null;
        this.path = {
            user : API_ROUTES?.USERS,
            auth : API_ROUTES?.AUTH,            
        }

        this.initDatabase();
        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    async initDatabase(){
        try {
            const dbConnection = new Connection();
            await dbConnection.dbConnection(); 
            this.db = dbConnection.db;            
            this.app.locals.db = this.db;
        } catch (error) {
            console.error('Error al inicializar la base de datos:', error);
        }
    }

    middlewares() {
        const allowedOrigins = ['http://localhost:3000'];
        this.app.use(cors({
            origin: '*',
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use( logRequestDetails );
    }

    async routes() {
        const authRouter = (await import('../routes/auth.js')).default;
        this.app.use(this.path.auth, authRouter);
        const userRoute = ( await import('../routes/user.js')).default;
        this.app.use( this.path.user, userRoute );
    }

    errorHandling() {        
        this.app.use(errorMiddleware);
    }

    start() {
        this.app.listen(this.port, () =>
            console.log(`Server running on :${this.port}`)
        );
    }
}