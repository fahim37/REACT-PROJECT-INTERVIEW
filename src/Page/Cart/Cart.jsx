import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CartContext } from "../../ContextAPIs/CartProvider";

const Cart = () => {
  const { cartItems, dispatch } = useContext(CartContext);

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const handleDecreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const calculateSubTotal = (price, quantity) => price * quantity;

  return (
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
        Cart
      </h1>
      <div className="pt-p_16px">
        <div className="lg:flex items-start gap-3">
          <div className="w-full lg:w-[58%] bg-white border-2">
            <table className="overflow-x-auto w-full">
              <thead>
                <tr className="border-b-4 border-gray-300">
                  <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                    Course
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Price
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Quantity
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Sub Total
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-x-auto">
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="w-[20%] text-center flex items-center justify-center">
                          <RiDeleteBin5Line
                            className="text-xl hover:text-footer_color cursor-pointer"
                            onClick={() => handleRemove(item.id)}
                          />
                        </div>
                        <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                          <div className="mask">
                            <img
                              className="h-[40px] w-[70px]"
                              src={item.photo}
                              alt={item.course_name}
                            />
                          </div>
                          <p className="text-[14.4px] px-[7px] text-center flex">
                            {item.course_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                        Tk {item.discount_price}
                      </p>
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <div className="border">
                          <button
                            className="px-4 w-[30px] font-bold font_standard my-1.5"
                            onClick={() => handleDecreaseQuantity(item.id)}
                          >
                            -
                          </button>
                        </div>
                        <div className="border-y">
                          <input
                            type="number"
                            className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                            value={item.quantity}
                            readOnly
                          />
                        </div>
                        <div className="border">
                          <button
                            className="px-4 w-[30px] font-bold font_standard my-1.5"
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                        Tk{" "}
                        {calculateSubTotal(item.discount_price, item.quantity)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:w-[41%] bg-white border-2">
            <div className="p-4">
              <Link to="/checkout">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
