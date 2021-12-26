import { Category } from "./category";

export class Product {
  id!: number;
  title!: string;
  price!: number;
  description!: string;
  category!: Category;
  image!: string;

  // constructor(
  //   id: number,
  //   title: string,
  //   price: number,
  //   description: string,
  //   category: Category,
  //   image: string
  // ) {
  //   this.id = id;
  //   this.title = title;
  //   this.price = price;
  //   this.description = description;
  //   this.category = category;
  //   this.image = image;
  // }
}
