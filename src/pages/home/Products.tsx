
import { type ProductsList } from "../../interfaces/products";
import Product from "./Product";
interface ProductsProps {
  products: ProductsList | null;
  totalAddToCartAmount: number;
  settotalAddToCartAmount: React.Dispatch<React.SetStateAction<number>>
}

export default function Products({ products, totalAddToCartAmount, settotalAddToCartAmount }: ProductsProps) {

  return (
    <div className="pt-35 flex">
      <div className='w-[20%]'></div>
      <div className='w-[60%]'>
        <div className="grid grid-cols-[100px_100px_100px_100px_100px_100px] gap-x-25 gap-y-3">
          {products?.products.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                products={products}
                totalAddToCartAmount={totalAddToCartAmount}
                settotalAddToCartAmount={settotalAddToCartAmount}
              />
            );
          })}
        </div>
      </div>
      <div className='w-[20%]'></div>
    </div>
  );
}