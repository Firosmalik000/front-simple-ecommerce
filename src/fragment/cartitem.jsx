import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { CartContext } from '../contexts/CartContext';
import { DarkMode } from '../contexts/DarkModeContext';

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.amount);
  const { name, _id, image_url, price, amount, user } = item;
  const { isDarkMode } = useContext(DarkMode);
  const { increaseAmount, decreaseAmount, removeCart, detailCart, increaseByAmount } = useContext(CartContext);

  const isLoggedInUserItem = user && user._id === localStorage.getItem('userId');

  if (!isLoggedInUserItem) {
    return null;
  }

  const handleClick = (e) => {
    console.log('User Info', detailCart);
  };

  const handleAmount = (e) => {
    e.preventDefault();
    const newQty = parseInt(e.target.value);

    console.log(newQty, 'newQty');
    setQty(newQty);
  };

  const submitAmount = () => {
    // You can choose whether to call increaseByAmount here or in onBlur, depending on your requirements.
    increaseByAmount(_id, qty);
  };

  return (
    <div className={`flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 items-center  justify-center mx-auto  w-[90%] `}>
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/${_id}`} onClick={handleClick}>
          <img className="max-w-[80px]  rounded-lg " src={`http://localhost:5000/${image_url}`} />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link to={`/${_id}`} onClick={handleClick} className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline">
              {name}
            </Link>
            <div className="text-xl cursor-pointer" onClick={() => removeCart(_id)}>
              <IoMdClose className="text-gray-500 hover:bg-red-500 hover:text-white rounded-full transition duration-300" />
            </div>
          </div>
          <div className=" flex gap-x-2 h-[36px] text-item ">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <button
                className="flex-1 h-full flex justify-center items-center cursor-pointer  bg-white"
                onClick={() => {
                  decreaseAmount(_id);
                  setQty(qty - 1);
                }}
              >
                <IoMdRemove />
              </button>
              <input type="text" className="h-full w-[50px] flex justify-center items-center px-2  bg-white" onChange={handleAmount} onBlur={submitAmount} value={qty} />
              <button
                className="flex-1 h-full flex justify-center items-center cursor-pointer  bg-white"
                onClick={() => {
                  increaseAmount(_id);
                  setQty(qty + 1);
                }}
              >
                <IoMdAdd />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-around">Rp {price} </div>
            <div className={`flex flex-1 justify-end items-center text-primary font-medium ${isDarkMode && ' text-white'}`}> {`Rp ${parseFloat(price * qty).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
