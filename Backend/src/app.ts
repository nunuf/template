import express from 'express';
import cors from 'cors';
import appConfig from './2-utils/app-config';
import catchAll from './3-middleware/catch-all';
import logRequest from './3-middleware/log-request';
import routeNotFound from './3-middleware/route-not-found';
import controller from './6-controllers/controller';

const server = express();

server.use(cors());
server.use(express.json());
server.use(logRequest);
server.use("/api", controller);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

