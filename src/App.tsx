import { useEffect } from 'react';
import { useSelector } from './store';
import Routes from './Routes';

function App() {
  const theme = useSelector((state) => state.user.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <Routes />;
}

export default App;
