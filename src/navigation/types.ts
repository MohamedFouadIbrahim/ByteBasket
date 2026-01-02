import { Product } from "@/types";


export type RootStackParamList = {
  Main: undefined;
  ProductDetail: {
    product?: Product;
    productId?: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Favorites: undefined;
};