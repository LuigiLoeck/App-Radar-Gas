import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import postosData from '../assets/postosData.json';

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
    try {
      await firestore().collection('postos').add(posto);
      return true;
    } catch (e) {
      console.error('PostoProvider, salvar: ' + e);
      return false;
    }
    // try {
    //   for (let i = 0; i < postosData.length; i++) {
    //     await firestore().collection('postos').add(postosData[i]);
    //   }
    //   return true;
    // } catch (e) {
    //   console.error('PostoProvider, salvar: ' + e);
    //   return false;
    // }
  };

  const update = async posto => {
    let {id} = posto;
    delete posto.id;
    try {
      await firestore().collection('postos').doc(id).update(posto);
      return true;
    } catch (e) {
      console.error('PostoProvider, atualizar: ' + e);
      return false;
    }
  };

  const delposto = async posto => {
    console.log(posto);
    try {
      await firestore().collection('postos').doc(posto.id).delete();
      return true;
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

// import React, {createContext, useState, useEffect, useContext} from 'react';
// import {ApiContext} from './ApiProvider';
// import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// export const PostoContext = createContext({});

// export const PostoProvider = ({children}) => {
//   const [postos, setPostos] = useState([]);
//   const {api} = useContext(ApiContext);

//   useEffect(() => {
//     if (api) {
//       getPostos();
//     }
//   }, [api]);

//   const getPostos = async () => {
//     try {
//       let data = [];
//       const response = await api.get('/postos');
//       response.data.documents.map(doc => {
//         let key = doc.name.split('/').pop();
//         let {fields} = doc;

//         data.push({
//           id: key,
//           endereco: fields.endereco.stringValue,
//           nome: fields.nome.stringValue,
//         });
//       });
//       data.sort((a, b) => a.nome.localeCompare(b.nome));
//       console.log(data);
//       setPostos(data);
//     } catch (e) {
//       console.error('PostoProvider, getPostos: ' + e);
//     }
//   };

//   const save = async posto => {
//     try {
//       await api.post('/postos/', {
//         fields: {
//           nome: {
//             stringValue: posto.nome,
//           },
//           endereco: {
//             stringValue: posto.endereco,
//           },
//         },
//       });
//       getPostos();
//       return true;
//     } catch (e) {
//       console.error('PostoProvider, salvar: ' + e);
//       return false;
//     }
//   };

//   const update = async posto => {
//     try {
//       await api.patch(`/postos/${posto.id}`, {
//         fields: {
//           nome: {
//             stringValue: posto.nome,
//           },
//           endereco: {
//             stringValue: posto.endereco,
//           },
//         },
//       });
//       getPostos();
//       return true;
//     } catch (e) {
//       console.error('PostoProvider, atualizar: ' + e);
//       return false;
//     }
//   };

//   const delposto = async posto => {
//     try {
//       await api.delete(`/postos/${posto.id}`);
//       getPostos();
//       return true;
//     } catch (e) {
//       console.error('PostoProvider, deletar: ' + e);
//       return false;
//     }
//   };

//   return (
//     <PostoContext.Provider value={{postos, save, update, delposto}}>
//       {children}
//     </PostoContext.Provider>
//   );
// };
