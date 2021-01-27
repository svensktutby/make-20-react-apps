import { useCallback, useEffect, useState } from 'react';

type DirectionType = 'up' | 'down' | 'right' | 'left';

type UseMovementType = {
  move: (dir: DirectionType) => void;
  x: number;
  y: number;
  direction: DirectionType;
};

export const useMovement = (): UseMovementType => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState<DirectionType>('down');

  const increase = (prevState: number) => prevState + 20;
  const decrease = (prevState: number) => prevState - 20;

  const move = useCallback(
    (dir: DirectionType) => {
      setDirection(dir);

      switch (dir) {
        case 'up':
          setY(decrease);
          break;
        case 'left':
          setX(decrease);
          break;
        case 'down':
          setY(increase);
          break;
        case 'right':
          setX(increase);
          break;
        default:
          break;
      }
    },
    [setX, setY],
  );

  // add event listener to window to listen for arrow keys
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          move('up');
          break;
        case 'ArrowLeft':
          move('left');
          break;
        case 'ArrowDown':
          move('down');
          break;
        case 'ArrowRight':
          move('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [move]);

  return { x, y, direction, move };
};
