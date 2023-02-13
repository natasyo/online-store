import { IFilter, IProduct, IStoreProducts } from "../types";
import data from "../data/products.json";
export class ProductsController implements IStoreProducts {
  products: Array<IProduct>;
  constructor() {
    this.products = data.products as unknown as Array<IProduct>;
  }
  getMaxPrice(): number {
    const price = this.products.map((value) => value.price);
    return Math.max(...price);
  }
  getCategories(): string[] {
    const categoryArray: Array<string> = this.products.map(
      (product) => product.category
    );
    const collection: Set<string> = new Set<string>(categoryArray);
    return Array.from(collection) as Array<string>;
  }
  getProducts(filter: IFilter): Array<IProduct> {
    // console.log(filter);
    let products: Array<IProduct> = this.products;
    if (filter.categories && filter.categories?.length > 0) {
      products = products.filter(
        (product) =>
          filter.categories && filter.categories?.indexOf(product.category) >= 0
      );
    }
    if (filter.minPrice > 0 && filter.maxPrice < this.getMaxPrice()) {
      products = products.filter(
        (product) =>
          product.price > filter.minPrice && product.price < filter.maxPrice
      );
    }
    return products;
  }
  getQueryRoute(filter: IFilter) {
    return {
      categories: filter.categories,
      minPrice: filter.minPrice,
      maxPrice: filter.maxPrice,
    };
  }
}
