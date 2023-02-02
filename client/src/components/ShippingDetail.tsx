import { shippingLabel } from '../interface/shippingLabel';

interface pageProps {
  shippingLabel: shippingLabel
}

const ShippingDetail = ({ shippingLabel }: pageProps) => {
  return (
    <div>
      <div className='text-lg font-bold'>Shipping Details</div>
      {shippingLabel && (
        <div>
          <p>
            <span className='font-bold'>Label Id:</span>{' '}
            {shippingLabel.label_id}
          </p>
          <p>
            <span className='font-bold'>Shipping Tracking Code:</span>{' '}
            {shippingLabel.shipping_tracking_code}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingDetail;
