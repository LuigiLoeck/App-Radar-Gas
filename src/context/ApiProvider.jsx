import React, {createContext, useEffect, useState} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState(null);

  const getApi = () => {
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          if (idToken) {
            const apiLocal = create({
              baseURL:
                'https://firestore.googleapis.com/v1/projects/radargasapp/databases/(default)/documents/',
              headers: {Authorization: 'Bearer ' + idToken},
            });

            apiLocal.addResponseTransform(response => {
              if (!response.ok) {
                throw response;
              }
            });
            setApi(apiLocal);
          }
        })
        .catch(e => {
          console.error('ApiProvider, getApi: ' + e);
        });
    }
  };

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        getApi();
      }
    });
    return unsubscriber;
  }, []);

  return (
    <ApiContext.Provider
      value={{
        api,
      }}>
      {children}
    </ApiContext.Provider>
  );
};
