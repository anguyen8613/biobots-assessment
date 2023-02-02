import { getByLabelId, suggestLabelIds } from './../controllers/shippingDataController';
import { Router } from 'express';

const shippingDataRouter = Router();

shippingDataRouter.get('/:labelId', getByLabelId);

shippingDataRouter.get('/suggest/:labelId', suggestLabelIds);

export default shippingDataRouter;
