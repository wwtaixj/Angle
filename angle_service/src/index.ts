import express from 'express';
import http from 'http';
import router from './router';
import socketRoutes from './router/socket';
import { corsky } from './auth';
import { Url } from '@/enums/url';
import { authentication, apiPermission } from '@/auth';

const app = express();
const server = http.createServer(app);

app.use(corsky);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.use(authentication);
app.use(apiPermission);
app.use(Url.SOCKET, socketRoutes(server));
app.use(Url.API, router);

server.listen(Number(process.env.LISTEN_PORT), () => {
  console.log(`server running at http://localhost:${process.env.LISTEN_PORT}`);
});
