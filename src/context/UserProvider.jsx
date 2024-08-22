import React, {createContext, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthUserContext} from './AuthUserProvider';
import storage from '@react-native-firebase/storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const {getUser} = useContext(AuthUserContext);

  const save = async (user, urlDevice) => {
    try {
      if (urlDevice !== '') {
        user.urlFoto = await sendImageToStorage(urlDevice, user);
        if (!user.urlFoto) {
          return false;
        }
      }
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({urlFoto: user.urlFoto}, {merge: true});
      if (await getUser(user.pass)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  async function sendImageToStorage(urlDevice, user) {
    let imageRedimencionada = await ImageResizer.createResizedImage(
      urlDevice,
      200,
      250,
      'JPEG',
      85,
    );
    const pathToStorage = `images/users/${user.uid}/foto.png`;

    let url = '';
    const task = storage().ref(pathToStorage).putFile(imageRedimencionada?.uri);
    task.on('state_changed', taskSnapshot => {
      // console.log(
      //   'Transf:\n' +
      //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
    });

    await task.then(async () => {
      url = await storage().ref(pathToStorage).getDownloadURL();
    });
    task.catch(e => {
      console.error('EstudanteProvider, sendImageToStorage: ' + e);
      url = null;
    });
    return url;
  }

  return <UserContext.Provider value={{save}}>{children}</UserContext.Provider>;
};
