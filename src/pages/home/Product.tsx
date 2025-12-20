import { type ProductType } from "../../interfaces/products";
import { useState } from "react";

interface ProductProps {
  product: ProductType;
  handleAddToCart:(product:ProductType, addAmount:number) => void;
}

export default function Product({ product, handleAddToCart }: ProductProps) {
  const [addAmount, setAddAmount] = useState<number>(1)
  
  const handleAmountAddToCart = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAddAmount(Number(event.target.value))
  }

  return (
    <>
      <div key={product.id} className="bg-white w-47 h-70 shadow-[0px_0px_2px_rgba(0,0,0,0.4)] p-2 flex flex-col justify-between">
        <div>
          {product.images.length === 1 ? product.images.map(image => {
            return (
              <div key={image}>
                <img src={image} />
              </div>
            );
          }) : product.images.map((image, index) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <img src={image} />
                </div>
              );
            }
            else {
              return (
                <div key={index}></div>
              );
            }
          })}
        </div>
        <p className="text-[15px] leading-4 truncate pb-1">{product.title}</p>
        <div className="flex justify-between">
          <p className="text-orange-500 font-medium">&#36;{product.price}</p>
          <div className="bg-gray-200 flex justify-center items-center rounded-[4px] shadow-[0_0_8px_rgba(0,0,0,0.1)] hover:border hover:border-orange-500 hover:border-2">
            <select name="amount" id={`amount-${product.id}`} className="cursor-pointer border-none outline-none w-10"
              onChange={handleAmountAddToCart}
              value={addAmount}
            >
              <option value="1" className="bg-gray-200">1</option>
              <option value="2" className="bg-gray-200">2</option>
              <option value="3" className="bg-gray-200">3</option>
              <option value="4" className="bg-gray-200">4</option>
              <option value="5" className="bg-gray-200">5</option>
              <option value="6" className="bg-gray-200">6</option>
              <option value="7" className="bg-gray-200">7</option>
              <option value="8" className="bg-gray-200">8</option>
              <option value="9" className="bg-gray-200">9</option>
              <option value="10" className="bg-gray-200">10</option>
            </select>
          </div>
        </div>
        <button
          className="bg-orange-500 text-white cursor-pointer font-500 -m-2 py-1 hover:bg-red-500 active:bg-red-500 active:opacity-40"
          onClick={()=>{
            handleAddToCart(product, addAmount)
            setAddAmount(1)
          }}
        >Add to Cart</button>

      </div>
    </>
  );
}