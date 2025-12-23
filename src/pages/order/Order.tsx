
import Header from "../../components/Header";
import type { CartType } from "../../interfaces/carts";
import type { OrderType } from "../../interfaces/orders";

interface OrderProp {
  orders: OrderType[];
  carts: CartType[];
  setCarts: React.Dispatch<React.SetStateAction<CartType[]>>;
  handleSearchResult: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchButton: (event: React.MouseEvent) => void;
  onKeyDownSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Order({ orders, carts, setCarts, handleSearchResult, handleSearchButton, onKeyDownSearch }: OrderProp) {
  // localStorage.removeItem('orders')
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
          {orders.map(order => {
            return (
              <div key={order.id} className="bg-white w-full rounded-[10px] relative pt-24 mb-10 shadow-[0_0_4px_rgba(0,0,0,0.1)] pb-6">
                <div className="bg-gray-300 flex px-7 py-5 rounded-t-[10px] absolute right-0 left-0 top-0">
                  <div className="w-[25%]">
                    <div className="font-[500]">Order Placed:</div>
                    <div>{order.orderDate}</div>
                  </div>
                  <div className="w-[45%]">
                    <div className="font-[500]">Total</div>
                    <div>${order.total}</div>
                  </div>
                  <div className="w-[30%]">
                    <div className="font-[500]">Order ID:</div>
                    <div className="">{order.id}</div>
                  </div>
                </div>
                <div>
                  {order.orders.map(order => {
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
                                  <div>{order.deliveryDate}</div>
                                </div>
                                <div className="flex">
                                  <div className="mr-1">Quantity:</div>
                                  <div>{order.quantity}</div>
                                </div>
                                <div>
                                  <button className="bg-yellow-300 cursor-pointer px-5 py-2 rounded-[8px] shadow-[0_0_4px_rgba(0,0,0,0.1)]">Buy it again</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[30%]">
                            <div className="flex flex-col items-center justify-evenly h-full">
                              <button className="border border-gray-300 px-24 py-2 rounded-[6px] shadow-[0_0_2px_rgba(0,0,0,0.2)] cursor-pointer">Track Page</button>
                              <button className="px-10 py-2 rounded-[6px] bg-red-600 text-white shadow-[0_0_2px_rgba(0,0,0,0.2)] cursor-pointer">Cancel Order</button>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>
        <div className='w-[20%]'></div>
      </div>


    </div>
  );
}