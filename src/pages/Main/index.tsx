import Tabs from './Tabs';
import Game from './Game';

function Main() {
  return (
    <div className='h-[100%] flex flex-col'>
      <div className='grow'>
        <Game />
      </div>

      <div>
        <Tabs />
      </div>
    </div>
  );
}

export default Main;
