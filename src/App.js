import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Cart from "./components/Cart";
import products from "./mockdata/Products";
import Pagination from "./components/pagination";

//  function getcall(){
//   let url="https://dummyjson.com/products";
//   return fetch(url);
//  }
function App() {
  const [productData, setproductData] = useState([]);
  const [cartProducts, setcartProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  function getProducts() {
    return new Promise((resolve) => {
      resolve(products);
    });
  }
  function processData(Promise) {
    Promise.then((data) => {
      setproductData(data.products);
    }).catch(Error);
  }
  useEffect(() => {
    processData(getProducts());
  }, []);

  const handleAddToCart = (product) => {
    const matched = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (matched) {
      matched.quantity = matched.quantity + 1;
      setcartProducts([...cartProducts]);
    } else {
      product.quantity = 1;
      setcartProducts([...cartProducts, product]);
    }
  };

  const handleAddToCart1 = (product) => {
    setcartProducts((prevCartProducts) => {
      const index = prevCartProducts.findIndex((p) => p.id === product.id);
      prevCartProducts.splice(index, 1);
      return [...prevCartProducts];
    });
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = productData?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="App">
      <Header />
      <Main
        handleAddToCart={handleAddToCart}
        
        productData={currentPost}
      />
      <Pagination
        totalPosts={productData.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Cart cartProducts={cartProducts}
       handleAddToCart1={handleAddToCart1} />
     
    </div>
  );
}
export default App;
