import React from 'react';

import Routes from './Routes';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {PostoProvider} from '../context/PostoProvider';
import {ApiProvider} from '../context/ApiProvider';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <PostoProvider>
          <Routes />
        </PostoProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
