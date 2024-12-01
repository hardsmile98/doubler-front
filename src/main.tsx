import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/global.css';
import { Provider } from 'react-redux';
import store from './store';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

// this manifest is used temporarily for development purposes
const manifestUrl =
  'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </TonConnectUIProvider>,
);
