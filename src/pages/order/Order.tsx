
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

export default function Order({ carts, setCarts, handleSearchResult, handleSearchButton, onKeyDownSearch }: OrderProp) {
  // console.log(orders)
  return (
    <div>
      <Header
        carts={carts}
        setCarts={setCarts}
        handleSearchResult={handleSearchResult}
        handleSearchButton={handleSearchButton}
        onKeyDownSearch={onKeyDownSearch}
      />
      Order
    </div>
  );
}