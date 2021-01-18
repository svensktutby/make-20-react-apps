import React, { FC, MouseEvent, useState } from 'react';

type HighlightStyleType = {
  opacity?: number;
  left: number;
};

export const Tab: FC = ({ children }) => {
  const [highlightStyle, setHighlightStyle] = useState<HighlightStyleType>({
    left: 0,
    opacity: 0,
  });

  const moveHighlight = (e: MouseEvent<HTMLDivElement>): void => {
    setHighlightStyle({
      left: e.nativeEvent.offsetX - 150,
    });
  };

  const hideHighlight = (e: MouseEvent<HTMLDivElement>): void => {
    setHighlightStyle({
      opacity: 0,
      left: e.nativeEvent.offsetX - 150,
    });
  };

  return (
    <div
      className="tab"
      onMouseMove={moveHighlight}
      onMouseOut={hideHighlight}
      onBlur={() => {}}
    >
      <div className="highlight" style={highlightStyle} />
      {children}
    </div>
  );
};
