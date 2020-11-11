import express from 'express';
import { urlencoded, json } from 'body-parser';

import morgan from 'morgan';
const app = express();
import cors from 'cors';

//parse application/json
app.use(urlencoded({extended: true}));
app.use(json());
app.use(morgan('dev'));
app.use(cors());

//panggil routes
import routes from './routes';
routes(app);

//daftarkan menu routes dari index
app.use('/auth', require('./middleware'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});