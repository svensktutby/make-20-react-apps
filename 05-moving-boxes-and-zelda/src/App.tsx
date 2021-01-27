import React, { FC, useEffect, useRef } from 'react';

import './App.css';
import { useMovement } from './useMovement';

export const App: FC = () => {
  const { x, y, direction, move } = useMovement();

  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  const linkDownRef = useRef<null | HTMLImageElement>(null);
  const linkUpRef = useRef<null | HTMLImageElement>(null);
  const linkRightRef = useRef<null | HTMLImageElement>(null);
  const linkLeftRef = useRef<null | HTMLImageElement>(null);

  // set the height and width of canvas
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.canvas.height = window.innerHeight;
      ctx.canvas.width = window.innerWidth;
    }
  }, []);

  // move the box if x or y changes
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);

      let theLinkRef;
      if (direction === 'down') theLinkRef = linkDownRef;
      if (direction === 'up') theLinkRef = linkUpRef;
      if (direction === 'left') theLinkRef = linkLeftRef;
      if (direction === 'right') theLinkRef = linkRightRef;

      if (theLinkRef && theLinkRef.current)
        ctx.drawImage(theLinkRef.current, x, y);
    }
  }, [x, y, direction]);

  return (
    <div className="app">
      <canvas ref={canvasRef} height="100%" width="100%" />

      <div className="arrows">
        <button type="button" onClick={() => move('up')}>
          Up
        </button>
        <button type="button" onClick={() => move('left')}>
          Left
        </button>
        <button type="button" onClick={() => move('down')}>
          Down
        </button>
        <button type="button" onClick={() => move('right')}>
          Right
        </button>
      </div>

      <div className="images">
        <img
          ref={linkDownRef}
          src="https://i.imgur.com/JYUB0m3.png"
          alt="Down"
        />
        <img
          ref={linkRightRef}
          src="https://i.imgur.com/GEXD7bk.gif"
          alt="Right"
        />
        <img ref={linkUpRef} src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img
          ref={linkLeftRef}
          src="https://i.imgur.com/4LGAZ8t.gif"
          alt="Left"
        />
      </div>
    </div>
  );
};
