import express = require('express');
import { router } from './router/router.ts';

class App {
    public app: express.Express;

    constructor() {
        this.app = express();

        this.config();

        this.app.use(router);
    }

    public start(PORT: string | number): void {
        this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }

    private config():void {
        const accessControl: express.RequestHandler = (_req, res, next) => {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
          res.header('Access-Control-Allow-Headers', '*');
          next();
        };
    
        this.app.use(express.json());
        this.app.use(accessControl);
      }
    
}

export { App }
