import React, { FC } from 'react';

import Gandalf from '../img/gandalf.png';

export const Home: FC = () => {
  return (
    <div className="page home">
      <div>
        <img src={Gandalf} alt="Gandalf" />
        <h2>You Shall Not Pass!!!</h2>
      </div>
    </div>
  );
};
