import { Request, Response } from 'express';
import shippingData from '../data/KITS_SHIPPING_DATA.json';

export const getByLabelId = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;
    let shippingDetail = shippingData.find((item) => item.label_id === labelId);

    if (shippingDetail === undefined) {
      res
        .status(404)
        .json({ Error: `Shipping label not found. label_id: ${labelId} ` });
    } else {
      const { id, ...shippingDetailNoId } = shippingDetail;
      res.json({ ...shippingDetailNoId });
    }
  } catch (e) {
    res.send('Error' + e);
  }
};

export const suggestLabelIds = async (req: Request, res: Response) => {
  const labelId = req.params.labelId.toLowerCase();

  const filteredData = shippingData.reduce((filtered: any, item) => {
    //use includes instead?
    if (item.label_id.toLowerCase().startsWith(labelId)) {
      filtered.push({
        label_id: item.label_id,
        shipping_tracking_code: item.shipping_tracking_code,
      });
    }
    return filtered;
  }, []);

  if (filteredData.length === 0) {
    return res.status(404).json({ error: `${labelId} not found` });
  }

  // setTimeout(() => {
  res.json({ suggestions: filteredData });
  // }, 2000)
};
