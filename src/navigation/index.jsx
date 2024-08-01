import React from 'react';

import { AuthUserProvider } from '../context/AuthUserProvider';
import Routes from './Routes';

export default Providers = () => {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}