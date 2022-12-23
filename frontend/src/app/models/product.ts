import { Category } from "./category";

export class Product {
  id!: number;
  name!: string;
  price!: number;
  description!: string;
  category!: Category;
  image!: string;

}
