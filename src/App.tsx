import { useEffect, useState } from 'react';
import { useSelector } from './store';
import Routes from './Routes';

function App() {
  const [appStatus] = useState<'notinitialized' | 'error' | 'initialized'>('initialized');

  const theme = useSelector((state) => state.user.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  if (appStatus === 'notinitialized') {
    return <div />;
  }

  if (appStatus === 'error') {
    return <div />;
  }

  return <Routes />;
}

export default App;
