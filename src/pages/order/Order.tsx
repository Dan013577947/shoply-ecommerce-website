
import { Link } from "react-router";
import Header from "../../components/Header";
import type { CartType } from "../../interfaces/carts";
import type { Order_, OrderType } from "../../interfaces/orders";
import { fixedDecimalValueOfTwoAddedValues } from "../../utils/fixedDecimalValue";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface OrderProp {
  orders: OrderType[];
  setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
  carts: CartType[];
  setCarts: React.Dispatch<React.SetStateAction<CartType[]>>;
  handleSearchResult: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchButton: (event: React.MouseEvent) => void;
  onKeyDownSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddToCart: (productId: number, addAmount: number) => void;
  handleTrackPage:(order:Order_, orderDate:Dayjs)=>void;
}

export default function Order({ orders, setOrders, carts, setCarts, handleSearchResult, handleSearchButton, onKeyDownSearch, handleAddToCart, handleTrackPage }: OrderProp) {
  // localStorage.removeItem('orders')

  const handleCancelOrder = (ordersId: string, orderId: number) => {
    const updated = orders.map(orders => {
      const removedAmount = orders.orders.reduce((sum, order) => order.id === orderId ? sum += order.price * order.quantity : sum, 0)
      return orders.id === ordersId
        ? {
          id: orders.id,
          orderDate: orders.orderDate,
          orders: orders.orders.filter(order => order.id !== orderId),
          total: fixedDecimalValueOfTwoAddedValues(orders.total, -removedAmount)
        }
        : orders
    })
    const updatedRemovedEmptyOrders = updated.filter(orders => orders.orders.length > 0)
    setOrders(updatedRemovedEmptyOrders)
    localStorage.setItem('orders', JSON.stringify(updatedRemovedEmptyOrders))
  }
  
  return (
    <div>
      <Header
        carts={carts}
        setCarts={setCarts}
        handleSearchResult={handleSearchResult}
        handleSearchButton={handleSearchButton}
        onKeyDownSearch={onKeyDownSearch}
      />

      <div className="pt-35 flex">
        <div className='w-[20%]'></div>
        <div className='w-[60%]'>
          <div>
            <p className="text-[23px] font-bold pt-[40px] pb-3">Review your Orders</p>
          </div>
          {orders.length > 0
            ? orders.map(orders => {
              return (
                <div key={orders.id} className="bg-white w-full rounded-[10px] relative pt-24 mb-10 shadow-[0_0_4px_rgba(0,0,0,0.1)] pb-6">
                  <div className="bg-gray-300 flex px-7 py-5 rounded-t-[10px] absolute right-0 left-0 top-0">
                    <div className="w-[25%]">
                      <div className="font-[500]">Order Placed:</div>
                      <div>{dayjs(orders.orderDate).format('dddd, MMMM DD')}</div>
                    </div>
                    <div className="w-[45%]">
                      <div className="font-[500]">Total</div>
                      <div>${orders.total}</div>
                    </div>
                    <div className="w-[30%]">
                      <div className="font-[500]">Order ID:</div>
                      <div className="">{orders.id}</div>
                    </div>
                  </div>
                  <div>
                    {orders.orders.map(order => {
                      return (
                        <div key={order.id} className="p-2">
                          <div className="flex">
                            <div className="w-[25%]">
                              <div className="flex items-center justify-center h-full">
                                <img src={order.image} alt={order.title} className="w-35" />
                              </div>
                            </div>
                            <div className="w-[45%] py-3">
                              <div className="flex items-center h-full">
                                <div className="h-full flex flex-col justify-between">
                                  <div className="font-[500] text-[17px]">
                                    {order.title}
                                  </div>
                                  <div className="flex">
                                    <div className="mr-1">Arriving on:</div>
                                    <div>{dayjs(order.deliveryDate).format('dddd, MMMM DD')}</div>
                                  </div>
                                  <div className="flex">
                                    <div className="mr-1">Quantity:</div>
                                    <div>{order.quantity}</div>
                                  </div>
                                  <div>
                                    <button className="bg-yellow-300 cursor-pointer px-5 py-2 rounded-[8px] shadow-[0_0_4px_rgba(0,0,0,0.1)]" onClick={() => handleAddToCart(order.id, order.quantity)}>Buy it again</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-[30%]">
                              <div className="flex flex-col items-center justify-evenly h-full">
                                <Link to='/track'>
                                  <button className="border border-gray-300 px-24 py-2 rounded-[6px] shadow-[0_0_2px_rgba(0,0,0,0.2)] cursor-pointer" onClick={()=>handleTrackPage(order, orders.orderDate)}>Track Page</button></Link>
                                <button className="px-10 py-2 rounded-[6px] bg-red-600 text-white shadow-[0_0_2px_rgba(0,0,0,0.2)] cursor-pointer" onClick={() => handleCancelOrder(orders.id, order.id)}>Cancel Order</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })
            :
            <div className="w-200">
              <div>Your orders is empty</div>
              <div>
                <Link to='/'>
                  <button className="bg-yellow-300 cursor-pointer w-30  text-[15px] py-2 rounded-[10px] active:bg-yellow-500 shadow-[0_0_4px_rgba(0,0,0,0.3)] mt-2">View Products</button>
                </Link>
              </div>
            </div>
          }
        </div>
        <div className='w-[20%]'></div>
      </div>


    </div>
  );
}