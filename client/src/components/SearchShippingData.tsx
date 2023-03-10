import { useState, ChangeEvent, useRef } from 'react';
import useSWR from 'swr';
import { useDebounce } from '../hooks/useDebounce';
import { shippingLabel } from '../interface/shippingLabel';
import ShippingDetail from './ShippingDetail';

const SearchShippingData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const inputRef: any = useRef();

  const [shippingLabel, setShippingLabel] = useState<shippingLabel>({
    label_id: '',
    shipping_tracking_code: '',
  });

  const { data = {}, error } = useSWR(() =>
    debouncedSearch
      ? `http://localhost:8080/shippingData/suggest/${debouncedSearch}`
      : null
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDropDownChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    const shippingLabel = getShippingLabel(value);
    setShippingLabel(shippingLabel);
    setSearchTerm(value);
    inputRef.current.focus();
  };

  const getShippingLabel = (label_id: string) => {
    return data.suggestions.find((item: shippingLabel) => {
      return item.label_id === label_id;
    });
  };

  return (
    <div className='w-screen h-screen grid grid-rows-1 md:grid-cols-2'>
      <div className='w-full h-full flex justify-end mt-40 mr-20'>
        <div className='flex'>
          <label htmlFor='searchTerm' className='mr-2 text-lg font-bold'>
            Search For Shipping Label Id:
          </label>
          <div className='flex flex-col'>
            <input
              id='searchTerm'
              onChange={handleInputChange}
              value={searchTerm}
              autoFocus
              className='w-48 pl-2'
              ref={inputRef}
            />
            {data.suggestions && (
              <select
                name={'shippingLabelId'}
                onChange={handleDropDownChange}
                // Add 1 to size for the disabled option
                size={data.suggestions.length + 1}
                className='overflow-auto w-48 mt-1 pl-2 appearance-none'
              >
                <option disabled value='hidden value'></option>
                {data.suggestions.map((item: shippingLabel) => (
                  <option key={item.label_id} value={item.label_id}>
                    {item.label_id}
                  </option>
                ))}
              </select>
            )}
            {error && (
              <div className='text-red-700'>
                No suggestions found for {debouncedSearch}
              </div>
            )}
          </div>
        </div>
      </div>
      {shippingLabel.label_id !== '' && (
        <div className='w-full h-3/5 centered mt-40 ml-20'>
          <ShippingDetail shippingLabel={shippingLabel} />
        </div>
      )}
    </div>
  );
};

export default SearchShippingData;
