import { IFilter } from "./i.filter";
import { IProduct } from "./i.product";

export interface IStoreProducts {
  products: Array<IProduct>;
  getProducts(filter: IFilter): Array<IProduct>;
  getCategories(): Array<string>;
  getMaxPrice(): number;
}
