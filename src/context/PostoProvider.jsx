import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Image} from 'react-native';
import postosData from '../assets/postosData.json';

export const PostoContext = createContext({});

export const PostoProvider = ({children}) => {
  const [postos, setPostos] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const bandeiras = {
    Azeredo:
      'https://firebasestorage.googleapis.com/v0/b/radargasapp.appspot.com/o/images%2Fbandeiras%2FAzeredo.png?alt=media&token=720d050d-cc6c-42ce-b91d-5868ee77afa0',
    Coqueiro:
      'https://firebasestorage.googleapis.com/v0/b/radargasapp.appspot.com/o/images%2Fbandeiras%2FCoqueiro.png?alt=media&token=bb7de0a2-df4e-4790-a2f2-a128e5419d92',
    Ipiranga:
      'https://firebasestorage.googleapis.com/v0/b/radargasapp.appspot.com/o/images%2Fbandeiras%2FIpiranga.png?alt=media&token=3e565c3f-3c62-4949-969a-5a5ae7df3361',
    Petrobras:
      'https://firebasestorage.googleapis.com/v0/b/radargasapp.appspot.com/o/images%2Fbandeiras%2FPetrobras.png?alt=media&token=1bbbe9ac-0770-41bf-b3b7-7fe0aab7c420',
    Rodoil:
      'https://firebasestorage.googleapis.com/v0/b/radargasapp.appspot.com/o/images%2Fbandeiras%2FRodoil.png?alt=media&token=6a8c8a41-5df9-4d4f-a613-191b2a3940c7',
    Shell:
      'https://firebasestorage.googleapis.com/v0/b/radargasapp.appspot.com/o/images%2Fbandeiras%2FShell.png?alt=media&token=d40aaeaa-179c-4c39-8671-99987beec72e',
    Sim: 'https://firebasestorage.googleapis.com/v0/b/radargasapp.appspot.com/o/images%2Fbandeiras%2FSim.png?alt=media&token=23588d45-41b4-40b1-84f7-ff3486fcfeda',
    BandeiraBranca:
      'https://firebasestorage.googleapis.com/v0/b/radargasapp.appspot.com/o/images%2Fbandeiras%2FBandeiraBranca.png?alt=media&token=7583e106-bc77-4bb0-ba70-b4507ab35a38',
  };

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
              bandImage: bandeiras[doc.data().bandeira]
                ? bandeiras[doc.data().bandeira]
                : bandeiras.BandeiraBranca,
            });
          });
          setPostos(data);
          prefetchImages(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  const prefetchImages = postos => {
    let loadedImages = 0;
    postos.forEach(posto => {
      Image.prefetch(posto.bandImage).then(() => {
        loadedImages += 1;
        if (loadedImages === postos.length) {
          setImagesLoaded(true);
        }
      });
    });
  };

  // const save = async posto => {
  //   try {
  //     await firestore().collection('postos').add(posto);
  //     return true;
  //   } catch (e) {
  //     console.error('PostoProvider, salvar: ' + e);
  //     return false;
  //   }
  //   // try {
  //   //   for (let i = 0; i < postosData.length; i++) {
  //   //     await firestore().collection('postos').add(postosData[i]);
  //   //   }
  //   //   return true;
  //   // } catch (e) {
  //   //   console.error('PostoProvider, salvar: ' + e);
  //   //   return false;
  //   // }
  // };

  // const update = async posto => {
  //   let {id} = posto;
  //   delete posto.id;
  //   try {
  //     await firestore().collection('postos').doc(id).update(posto);
  //     return true;
  //   } catch (e) {
  //     console.error('PostoProvider, atualizar: ' + e);
  //     return false;
  //   }
  // };

  // const delposto = async posto => {
  //   console.log(posto);
  //   try {
  //     await firestore().collection('postos').doc(posto.id).delete();
  //     return true;
  //   } catch (e) {
  //     console.error('PostoProvider, deletar: ' + e);
  //     return false;
  //   }
  // };

  return (
    <PostoContext.Provider
      value={{postos, imagesLoaded, setPostos}}>
      {children}
    </PostoContext.Provider>
  );
};

// import React, {createContext, useState, useEffect, useContext} from 'react';
// import {ApiContext} from './ApiProvider';

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
//         //console.log(fields);

//         data.push({
//           id: key,
//           nome: fields.nome.stringValue,
//           endereco: fields.endereco.stringValue,
//           bairro: fields.bairro.stringValue,
//           cidade: fields.cidade.stringValue,
//           bandeira: fields.bandeira.stringValue,
//           cep: fields.cep.integerValue,
//           cnpj: fields.cnpj.integerValue,
//           cordX: fields.cordX.doubleValue,
//           cordY: fields.cordY.doubleValue,
//           nota: fields.nota.doubleValue,
//           nmrNotas: fields.nmrNotas.integerValue,
//           precos: {
//             gasolinaComum:
//               fields.precos.mapValue.fields.gasolinaComum.doubleValue,
//             gasolinaAditivada:
//               fields.precos.mapValue.fields.gasolinaAditivada.doubleValue,
//             diesel: fields.precos.mapValue.fields.diesel.doubleValue,
//             etanol: fields.precos.mapValue.fields.etanol.doubleValue,
//           },
//         });
//         //console.log(data);
//       });
//       data.sort((a, b) => a.nome.localeCompare(b.nome));
//       setPostos(data);
//     } catch (e) {
//       console.error('PostoProvider, getPostos:', e);
//     }
//   };

//   const save = async posto => {
//     try {
//       await api.post('/postos/', {
//         fields: {
//           nome: {stringValue: posto.nome},
//           endereco: {stringValue: posto.endereco},
//           bairro: {stringValue: posto.bairro},
//           cidade: {stringValue: posto.cidade},
//           bandeira: {stringValue: posto.bandeira},
//           cep: {integerValue: posto.cep},
//           cnpj: {integerValue: posto.cnpj},
//           cordX: {doubleValue: posto.cordX},
//           cordY: {doubleValue: posto.cordY},
//           nota: {doubleValue: posto.nota},
//           nmrNotas: {integerValue: posto.nmrNotas},
//           precos: {
//             mapValue: {
//               fields: {
//                 gasolinaComum: {doubleValue: posto.precos.gasolinaComum},
//                 gasolinaAditivada: {
//                   doubleValue: posto.precos.gasolinaAditivada,
//                 },
//                 diesel: {doubleValue: posto.precos.diesel},
//                 etanol: {doubleValue: posto.precos.etanol},
//               },
//             },
//           },
//         },
//       });
//       getPostos();
//       return true;
//     } catch (e) {
//       console.error('PostoProvider, salvar: ' + e);
//       console.log(e);
//       return false;
//     }
//   };

//   const update = async posto => {
//     try {
//       await api.patch(`/postos/${posto.id}`, {
//         fields: {
//           nome: {stringValue: posto.nome},
//           endereco: {stringValue: posto.endereco},
//           bairro: {stringValue: posto.bairro},
//           cidade: {stringValue: posto.cidade},
//           bandeira: {stringValue: posto.bandeira},
//           cep: {integerValue: posto.cep},
//           cnpj: {integerValue: posto.cnpj},
//           cordX: {doubleValue: posto.cordX},
//           cordY: {doubleValue: posto.cordY},
//           nota: {doubleValue: posto.nota},
//           nmrNotas: {integerValue: posto.nmrNotas},
//           precos: {
//             mapValue: {
//               fields: {
//                 gasolinaComum: {doubleValue: posto.precos.gasolinaComum},
//                 gasolinaAditivada: {
//                   doubleValue: posto.precos.gasolinaAditivada,
//                 },
//                 diesel: {doubleValue: posto.precos.diesel},
//                 etanol: {doubleValue: posto.precos.etanol},
//               },
//             },
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
