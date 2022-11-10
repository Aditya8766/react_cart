import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./cart.css";
function Cart(props) {
  console.log("props cart::", props);
  const [grandTotal, setgrandTotal] = useState(0);
  useEffect(() => {
    getGrandTotal();
  }, [props.cartProducts]);
  const getGrandTotal = () => {
    let total = 0;
    props.cartProducts.forEach((c) => {
      total += c.price*c.quantity;
    });
    setgrandTotal(total);
  };
  return (
    <div className="cart">
      <div className="total-cart-val">
        <h3>Grand Total</h3>
        {grandTotal}
      </div>
      {props.cartProducts?.map((Data) => {
        console.log(props.cartProducts);
        return (
          <>
            <div className="container">
              <h5>{`products:${Data.title}`}</h5>
              <h6>{`quantity:${Data.quantity}`}</h6>
              <h5>{`Price:${Data.price}`}</h5>
              <button
              name="remove from cart"
              className="product__btn2"
              onClick={() => {
                props.handleAddToCart1(Data);
              }}
            >remove</button>
            </div>
          </>
        );
      })}
    </div>
  );
}
export default Cart;
