import React from "react";
import "./main.css";
function Main(props) {
  console.log("PROPS main::", props.productData);
  return (
    <div className="Main-block">
      {props?.productData?.map((Data) => {

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
            > add</button>
            
          </div>
        );
      })
      }
    </div>
  );
}
export default Main;