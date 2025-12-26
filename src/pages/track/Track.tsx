import { Link } from "react-router";
import Header from "../../components/Header";
import type { CartType } from "../../interfaces/carts";
import type { TrackingProp } from "../../interfaces/track";
import dayjs from "dayjs";

interface TrackProp {
  carts: CartType[];
  setCarts: React.Dispatch<React.SetStateAction<CartType[]>>;
  handleSearchResult: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchButton: (event: React.MouseEvent) => void;
  onKeyDownSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  trackOrder: TrackingProp | null;
}


export default function Track({ carts, setCarts, handleSearchResult, handleSearchButton, onKeyDownSearch, trackOrder }: TrackProp) {
  const today = dayjs()
  const startDate = trackOrder?.orderDate
    ? dayjs(trackOrder?.orderDate)
    : null
  const deliveryDate = trackOrder?.order.deliveryDate
    ? dayjs(trackOrder?.order.deliveryDate)
    : null

  const totalDays = deliveryDate && startDate
    ? deliveryDate?.diff(startDate, 'day')
    : 1
    // console.log(totalDays)

  const deliveryProgress = today && startDate
    ? today?.diff(startDate, 'day')
    : 0

  const deliveryProgressPercent = Math.round(Math.abs(Math.max(Math.min((deliveryProgress / totalDays) * 100, 100), 0)))

  console.log(deliveryProgressPercent)

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
          <div className="flex flex-col justify-between">
            <div className="py-4">
              <Link to='/order'>
                <div className="underline text-blue-600 cursor-pointer">View all orders</div>
              </Link>
            </div>
            <div>
              <div className="text-[25px] font-[500]">Arriving on {dayjs(trackOrder?.order.deliveryDate).format('dddd, MMMM DD')}</div>
              <div>{trackOrder?.order.title}</div>
              <div>Quantity: {trackOrder?.order.quantity}</div>
              <div>
                <img src={trackOrder?.order.image} alt={trackOrder?.order.title} className="w-40" />
              </div>
            </div>
            <div className="py-5">
              <div className="flex justify-between text-[20px] font-[500]">
                <div>Preparing</div>
                <div>Shipped</div>
                <div>Delivered</div>
              </div>
              <div className="border border-gray-700 rounded-[20px] h-8">
                <div className={`h-full bg-yellow-400 rounded-[20px]`} style={{width:`${deliveryProgressPercent}%`}}>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[20%]'></div>
      </div>
    </div>
  );
}