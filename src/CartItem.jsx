import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

import { selectTotalQuantity } from './CartSlice';
import './CartItem.css';

// import { Navigate } from 'react-router-dom';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalQuantity = useSelector(selectTotalQuantity);

  // Calculate total amount for all products in the cart

  const calculateTotalAmount = (items) => {
    console.log("Item:", items);
     return items.reduce((acc, item) => {
      const costAsNumber = parseFloat(item.cost) || 0;
      return acc + costAsNumber * item.quantity;
    }, 0);
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    console.log("Cart items:", cart);
  };

  const handleDecrement = (item) => {
    if(item.quantity > 1) {
      dispatch(updateQuantity({name: item.name, quantity: item.quantity - 1}));
    } else {
      dispatch(removeItem({name: item.name}));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({name: item.name}));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  // const handleCheckoutShopping = (e) => {
  //   alert('Functionality to be added for future reference');
  // };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">$ {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>

                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: $ {calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
      <span>Cart ({totalQuantity})</span>
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={() => handleContinueShopping()}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
