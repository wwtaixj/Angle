import express from 'express';
import router from './router';
import { corsky } from './utils';
// import { send } from "express/lib/response";

const app = express();

app.use(corsky);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/api', router);

app.listen(Number(process.env.LISTEN_PORT), () => {
  console.log(`server running at http://localhost:${process.env.LISTEN_PORT}`);
});
