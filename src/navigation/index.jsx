import React from 'react';

import Routes from './Routes';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {PostoProvider} from '../context/PostoProvider';
import {ApiContext} from '../context/ApiProvider';

export default function Providers() {
  return (
    <AuthUserProvider>
      <PostoProvider>
        <Routes />
      </PostoProvider>
    </AuthUserProvider>
  );
}
