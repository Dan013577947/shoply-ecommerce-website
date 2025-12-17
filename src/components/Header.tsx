import { type AddToCartProps } from "../interfaces/addToCartAmount";
import { Link } from "react-router";
import ShoplyIcon from "../assets/shoply-icon.png"
import SearchIcon from "../assets/search-icon.png"
import CartIcon from "../assets/cart-icon.png"


export default function Header({ carts,handleSearchResult }: AddToCartProps) {
  const totalAddToCartAmount = carts.reduce((sum, item) => sum + item.totalQuantity, 0) || 0

  return (
    <div className='fixed w-full h-30 bg-gradient-to-l from-orange-500 to-red-500 flex'>
      <div className='w-[20%]'></div>
      <div className='w-[60%] flex justify-between items-center'>
        <Link to='/' className='flex justify-between items-center w-[190px] cursor-pointer'>
          <img className='w-[45px]' src={ShoplyIcon} alt="shoply-icon" />
          <p className='text-[30px] text-white'>Shoply</p>
        </Link>
        <div className="w-full mx-13 flex items-center">
          <input className='bg-white w-full h-10 rounded-[3px] px-4 min-w-[500px]' type="text" placeholder='Search' onChange={handleSearchResult} />
          <button className="bg-orange-500 h-9 w-15 -ml-[62px] rounded-[3px] flex justify-center items-center flex-shrink-0 cursor-pointer">
            <img className='w-[25px]' src={SearchIcon} alt="search-icon" />
          </button>
        </div>
        <Link to='/cart' className="w-[30px] flex justify-center items-center flex-shrink-0 cursor-pointer cursor-pointer relative">
          <img className='w-full' src={CartIcon} alt="cart-icon" />
          <div className="text-orange-500 font-bold absolute bg-white h-4 p-1 rounded-[50%] -top-2 -right-1 flex items-center justify-center">{totalAddToCartAmount}</div>
        </Link>
      </div>
      <div className='w-[20%] flex justify-end'></div>
    </div>
  );
}