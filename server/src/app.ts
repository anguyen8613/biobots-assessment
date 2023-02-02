import express, { Application} from 'express';
import shippingDataRouter from './routers/shippingDataRouter';
import cors from 'cors';
const app: Application = express();

const PORT: number = 8080;

app.use(express.json());
app.use(cors());
app.use('/shippingData', shippingDataRouter);

app.listen(PORT, () => {
  console.log(`Connected to port: ${PORT}`);
});
