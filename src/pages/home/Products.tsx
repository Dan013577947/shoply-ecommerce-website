import { type ProductType, type ProductsList } from "../../interfaces/products";
import Product from "./Product";

interface ProductsProps {
  products: ProductsList | null;
  searchedProducts: ProductType[] | undefined;
  handleAddToCart:(productId:number, addAmount:number)=>void;
}

function Products({ products, searchedProducts, handleAddToCart }: ProductsProps) {


  return (
    <div className="pt-35 flex">
      <div className='w-[20%]'></div>
      <div className='w-[60%]'>
        <div className="grid grid-cols-[100px_100px_100px_100px_100px_100px] gap-x-25 gap-y-3">
          {
            searchedProducts
              ? searchedProducts?.map((product) => {
                return (
                  <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                )
              })
              : products?.products.map((product) => {
                return (
                  <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                )
              })
          }
        </div>
      </div>
      <div className='w-[20%]'></div>
    </div>
  );
}


export default Products