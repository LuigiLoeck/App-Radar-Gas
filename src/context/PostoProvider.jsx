import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const PostoContext = createContext({});

export const PostoProvider = ({children}) => {
  const [postos, setPostos] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('postos')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        if (snapShot) {
          let data = [];
          snapShot.forEach(doc => {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setPostos(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  const save = async posto => {
    console.log(posto);
    // try {
    //   await firestore()
    //     .collection('postos')
    //     .add({
    //       nome: posto.nome,
    //       endereco: posto.endereco,
    //     })
    //     .then(() => {
    //       //setPostos([...postos, posto]);
    //       return true;
    //     });
    // } catch (e) {
    //   console.error('PostoProvider, salvar: ' + e);
    //   return false;
    // }
  };

  const update = async posto => {
    console.log(posto);
    try {
      await firestore()
        .collection('postos')
        .doc(posto.id)
        .update({
          nome: posto.nome,
          endereco: posto.endereco,
        })
        .then(() => {
          return true;
        });
    } catch (e) {
      console.error('PostoProvider, atualizar: ' + e);
      return false;
    }
  };

  const delposto = async posto => {
    console.log(posto);
    try {
      await firestore()
        .collection('postos')
        .doc(posto.id)
        .delete()
        .then(() => {
          return true;
        });
    } catch (e) {
      console.error('PostoProvider, deletar: ' + e);
      return false;
    }
  };

  return (
    <PostoContext.Provider value={{postos, setPostos, save, update, delposto}}>
      {children}
    </PostoContext.Provider>
  );
};
