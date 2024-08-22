import React from 'react';

import Routes from './Routes';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {PostoProvider} from '../context/PostoProvider';
import {ApiProvider} from '../context/ApiProvider';
import {UserProvider} from '../context/UserProvider';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <UserProvider>
          <PostoProvider>
            <Routes />
          </PostoProvider>
        </UserProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
