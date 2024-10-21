import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./index.css";
import Link from "next/link";
import DropDown from "../components/DropDown/DropDown";
import SearchBar from "../components/SearchBar/SearchBar";
import fetchProducts from "../fetcher/fetchProducts";
import ProductActions from "../components/buttons/ProductActions";
// import LocalProductsList from "../components/LocalProductsList/LocalProductsList";

export default async function Products({ searchParams }) {
  const debouncedSearch = searchParams.search || "";
  const sortOption = searchParams.option || "";
  const sortOrder = searchParams.order || "";
  const fetchItemType = "products";

  const sortOptions = [
    {
      label: "Price: Low to High",
      value: "price-low-to-high",
      option: "price",
      order: "asc",
    },
    {
      label: "Price: High to Low",
      value: "price-high-to-low",
      option: "price",
      order: "desc",
    },
    {
      label: "Name: A-Z",
      value: "name-ascending",
      option: "title",
      order: "asc",
    },
    {
      label: "Name: Z-A",
      value: "name-descending",
      option: "title",
      order: "desc",
    },
  ];
  
  var products = await fetchProducts({
    fetchItemType,
    debouncedSearch,
    sortOption,
    sortOrder,
  });

  console.log(products[0], "products");
  
  
  if (products.length === 0) {
    
    return (
      <div className="loading-screen">
        <div className="app-bar">
          <Header />
          <SearchBar searchItemType="Search Products" />
        </div>
      </div>
    );
  }
  
  return (
    
    <div className="products-page">
      <div className="app-bar">
        <Header />
        <SearchBar searchItemType="Search Posts" />
      </div>

      <div className="dropdown-menu">
        <DropDown
          buttonText="Sort Products By:"
          content={sortOptions}
        ></DropDown>
      </div>
      <div className="products-list">
        
        {products.map((product) => {
          return (
            <div key={product.id} className="product-card">
              <img
                className="product-image"
                src={product.thumbnail}
                alt={product.title}
              ></img>
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="product-info">
                  <strong>{product.title}</strong>
                </div>
              </Link>
              <div className="product-info">{product.description}</div>
              <div className="product-info">Price: {product.price}$</div>
              <ProductActions
                product={product}
                
                
              />
            </div>
          );
        })}
      </div>
      {/* <LocalProductsList initialProducts={products} type={"products"}/> */}
      <Footer />
    </div>
  );
}
