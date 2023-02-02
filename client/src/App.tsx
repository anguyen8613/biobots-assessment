import './App.css';
import { SWRConfig } from 'swr';
import SearchShippingData from './components/SearchShippingData';
import { fetcher } from './utils/fetcher';

function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <SearchShippingData />
    </SWRConfig>
  );
}

export default App;
