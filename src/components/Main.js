import React from "react";
import "./main.css";
function Main(props) {
  return (
    <div className="Main-block">
      {console.log("filter data",props.filteredData)}
      {props?.filteredData?.map((Data) => {
        console.log("data",Data)
        return (
          <div className="container">
            <h4>{`products:${Data.title}`}</h4>
            <h4>{`Price:${Data.price}`}</h4>

            <button
              name="Add to cart"
              className="product__btn"
              onClick={() => {
                props.handleAddToCart(Data);
              }}
            >
              add
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default Main;
