import { IProduct } from "../models/interfaces";
import Product from "../models/product.model";

async function createProduct(product: IProduct): Promise<IProduct> {
  try {
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error: any) {
    throw new Error(`Error creating product: ${error.message}`);
  }
}

export default createProduct;
