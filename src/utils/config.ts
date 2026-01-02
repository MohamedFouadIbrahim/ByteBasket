import { RootStackParamList } from '@/navigation/types';
import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

export const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: [
    prefix,
    'bytebasket://',
  ],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          Favorites: 'favorites',
        },
      },
      ProductDetail: {
        path: 'product/:productId',
        parse: {
          productId: (productId: string) => productId,
        },
      },
    },
  },
};
