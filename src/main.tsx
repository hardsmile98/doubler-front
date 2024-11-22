import { StrictMode } from 'react';
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
const manifestUrl = 'https://CamelNotFemale.github.io/ton-dApp/tonconnect-manifest.json';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </TonConnectUIProvider>
  </StrictMode>,
);
