
export interface CartProduct {
  discountPercentage:number;
  discountedTotal:number;
  id:number;
  price:number;
  quantity:number;
  thumbnail:string;
  title:string;
  total:number;
}

export interface Cart {
  discountedTotal: number;
  id: number;
  products: CartProduct[];
  total:number;
  totalProducts:number;
  totalQuanity:number;
  userId:number;
}

export interface CartList {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}