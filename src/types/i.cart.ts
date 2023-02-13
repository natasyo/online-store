import { IProduct } from "./i.product";

export interface ICartProduct {
  product: IProduct;
  count: number;
}

export interface ICartProducts {
  products: ICartProduct[];
}
