import React, { FC } from 'react';

import { useAuth0 } from '../contexts/auth0Context';
import Frodo from '../img/frodo.png';

export const Dashboard: FC = () => {
  const { user } = useAuth0();

  return (
    <div className="page dashboard">
      <div>
        <img src={Frodo} alt="Frodo" />
        <h2>Welcome {user?.name}</h2>
      </div>
    </div>
  );
};
