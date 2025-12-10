
export interface CartProduct {
  discountPercentage:number;
  discountedPrice:number;
  id:number;
  price:number;
  quantity:number;
  thumbnail:string;
  title:string;
  total:number;
}

export interface CartType {
  discountedTotal: number;
  id: number;
  products: CartProduct[];
  total:number;
  totalProducts:number;
  totalQuantity:number;
  userId:number;
}

export interface CartList {
  carts: CartType[];
  total: number;
  skip: number;
  limit: number;
}