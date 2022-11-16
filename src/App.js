import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Cart from "./components/Cart";
import products from "./mockdata/Products";
import Pagination from "./components/pagination";
import Search from "./components/Search";

//  function getcall(){
//   let url="https://dummyjson.com/products";
//   return fetch(url);
//  }
function App() {
  const [productData, setproductData] = useState([]);
  const [cartProducts, setcartProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  function getProducts() {
    return new Promise((resolve) => {
      resolve(products);
    });
  }
  function processData(Promise) {
    Promise.then((data) => {
      setproductData(data.products);
      setFilteredData(data.products);
    }).catch(Error);
  }
  useEffect(()=>{
    processData(getProducts());
  },[]);
  useEffect(
    () => {
      const filter = productData.filter(val => val.title.toLowerCase().includes(searchText));
      console.log("filter",filter);
      setFilteredData([...filter]);
    },
    [searchText]
  );

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    console.log("value",value);
    setSearchText(value);
  };

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
  const currentPost = filteredData?.slice(firstPostIndex, lastPostIndex);
  console.log("cuurnt",currentPost)
  return (
    <div className="App">
      <Header />
      <Search
        searchText={searchText}
        handleSearch={handleSearch}
      />
      <Main handleAddToCart={handleAddToCart} filteredData={currentPost} />
      <Pagination
        totalPosts={filteredData.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Cart cartProducts={cartProducts} handleAddToCart1={handleAddToCart1} />
    </div>
  );
}
export default App;
