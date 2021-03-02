import React, { FC } from 'react';

import Frodo from '../img/frodo.png';

export const Dashboard: FC = () => {
  return (
    <div className="page dashboard">
      <div>
        <img src={Frodo} alt="Frodo" />
        <h2>Welcome Persom</h2>
      </div>
    </div>
  );
};
