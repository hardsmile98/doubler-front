import prizeX0 from '@/assets/images/x0.webp';
import prizeX2 from '@/assets/images/x2.webp';
import { shuffle } from '@/helpers';
import { useEffect, useRef, useState } from 'react';

const prizes = [prizeX0, prizeX2];

const totalDuplicates = 8;
const defaultSize = 150;

function Game() {
  const slotRef = useRef<null | HTMLDivElement>(null);

  const [items, setItems] = useState<string[]>(prizes);

  const buildItemLists = (winItemIndex?: number) => {
    const randomPrizes = shuffle(prizes.flatMap((i) => Array(totalDuplicates).fill(i))) as string[];

    if (winItemIndex !== undefined) {
      randomPrizes.push(prizes[winItemIndex]);
    }

    setItems(randomPrizes);
  };

  useEffect(() => {
    buildItemLists();
  }, []);

  const startAnimation = () => {
    if (slotRef.current) {
      buildItemLists(0);

      const totalHeight = prizes.length * totalDuplicates * defaultSize;

      slotRef.current.animate(
        [
          {
            transform: 'translateY(0)',
          },
          {
            transform: `translateY(-${totalHeight}px)`,
          },
        ],
        {
          duration: 6000,
          fill: 'forwards',
          easing: 'ease-in-out',
        },
      );
    }
  };

  return (
    <div className='h-[100%] flex items-center justify-center'>
      <div className='rounded-xl w-[150px] h-[150px] overflow-hidden'>
        <div ref={slotRef}>
          {items.map((prize, index) => (
            <img key={index} className='block' src={prize} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
