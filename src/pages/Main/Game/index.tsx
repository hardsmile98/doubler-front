import prizeX0 from '@/assets/images/x0.webp';
import prizeX2 from '@/assets/images/x2.webp';
import { shuffle } from '@/helpers';
import { useDispatch } from '@/store';
import { openNotification } from '@/store/slices/ui';
import { Status } from '@/types';
import { useEffect, useRef, useState } from 'react';

const prizes = [prizeX0, prizeX2];

const totalDuplicates = 8;
const defaultSize = 150;
const animationDurationMs = 6000;

function Game() {
  const dispatch = useDispatch();

  const slotRef = useRef<null | HTMLDivElement>(null);
  const notificationRef = useRef<NodeJS.Timeout | null>(null);

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

  const startAnimation = (status: Status) => {
    if (slotRef.current) {
      const isWin = status === Status.WIN;

      buildItemLists(isWin ? 1 : 0);

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
          duration: animationDurationMs,
          fill: 'forwards',
          easing: 'ease-in-out',
        },
      );

      notificationRef.current = setTimeout(
        () =>
          dispatch(
            openNotification({
              type: isWin ? 'success' : 'error',
              text: isWin ? 'You won' : 'You lost',
            }),
          ),
        animationDurationMs,
      );
    }
  };

  useEffect(
    () => () => {
      if (notificationRef.current) {
        clearTimeout(notificationRef.current);
      }
    },
    [],
  );

  return (
    <div className='h-[100%] flex items-center justify-center py-3'>
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
