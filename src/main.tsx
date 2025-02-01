import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ItemListProvider } from '@contexts/item.context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ItemListProvider>
      <App />
    </ItemListProvider>
  </StrictMode>,
);
