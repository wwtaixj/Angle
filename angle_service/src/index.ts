import express from 'express';
import router from './router/index';
import { corsky } from './utils/index';
// import { send } from "express/lib/response";

const app = express();

app.use(corsky);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/api', router);

app.listen(Number(process.env.LISTEN_PORT), process.env.LISTEN_URL, () => {
  console.log(
    `server running at http://${process.env.LISTEN_URL}:${process.env.LISTEN_PORT}`
  );
});
