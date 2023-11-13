import express from 'express';
import router from './router';
import { corsky } from './utils';
import { Url } from '@/enums/url';
import { authentication, apiPermission } from '@/auth';

const app = express();

app.use(corsky);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.use(authentication);
app.use(apiPermission);
app.use(Url.API, router);

app.listen(Number(process.env.LISTEN_PORT), () => {
  console.log(`server running at http://localhost:${process.env.LISTEN_PORT}`);
});
