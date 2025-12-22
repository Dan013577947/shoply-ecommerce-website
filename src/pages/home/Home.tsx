import { type ProductsList, type ProductType } from "../../interfaces/products";
import Header from "../../components/Header";
import Products from "./Products";
import Footer from "../../components/Footer";
import type { CartType } from "../../interfaces/carts";

interface HomeProp {
  carts: CartType[];
  setCarts: React.Dispatch<React.SetStateAction<CartType[]>>;
  searchedProducts: ProductType[] | undefined;
  productsList: ProductsList | null;
  handleSearchResult: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchButton: (event: React.MouseEvent) => void;
  onKeyDownSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;

}
export default function Home({ carts, setCarts, productsList, searchedProducts, handleSearchResult, handleSearchButton, onKeyDownSearch }: HomeProp) {
  return (
    <div>
      <title>Shoply</title>
      <Header
        carts={carts}
        setCarts={setCarts}
        handleSearchResult={handleSearchResult}
        handleSearchButton={handleSearchButton}
        onKeyDownSearch={onKeyDownSearch}
      />
      <Products
        carts={carts}
        setCarts={setCarts}
        products={productsList}
        searchedProducts={searchedProducts}
      />
      <Footer />
    </div>
  );
}