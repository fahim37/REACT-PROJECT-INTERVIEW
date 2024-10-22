import React, { useContext, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CartContext } from "../../ContextAPIs/CartProvider";

const Checkout = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  const calculateSubTotal = (price, quantity) => price * quantity;
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const handleDecreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const [formData, setFormData] = useState({
    course_id: 3,
    admission_date: "",
    name: "",
    father_name: "",
    father_phone_no: "",
    school_collage_name: "",
    job_title: "",
    email: "",
    gender: "",
    present_address: "",
    permanent_address: "",
    nid_no: "",
    phone_no: "",
    local_guardian_name: "",
    local_guardian_phone_no: "",
    date_of_birth: "",
    blood_group: "",
    course_fee: 0,
    course_qty: 0,
    total_course_fee: 0,
    discount_course_fee: 0,
    sub_total_course_fee: 0,
  });
  const handleChange = () => {
    return null;
  };
  return (
    <div className="  mt-5 border mx-2">
      <div class="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form className="bg-white shadow-md rounded-lg p-6">
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="father_name"
                className="block font-semibold text-base mb-2"
              >
                Father name:
              </label>
              <input
                type="text"
                id="father_name"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.father_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="father_phone_no"
                className="block font-semibold text-base mb-2"
              >
                Father phone no:
              </label>
              <input
                type="text"
                id="father_phone_no"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.father_phone_no}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="school_collage_name"
                className="block font-semibold text-base mb-2"
              >
                School/collage name:
              </label>
              <input
                type="text"
                id="school_collage_name"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.school_collage_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="job_title"
                className="block font-semibold text-base mb-2"
              >
                Job title:
              </label>
              <input
                type="text"
                id="job_title"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.job_title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="present_address"
                className="block font-semibold text-base mb-2"
              >
                Present address:
              </label>
              <textarea
                type="email"
                id="present_address"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.present_address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="permanent_address"
                className="block font-semibold text-base mb-2"
              >
                Permanent address:
              </label>
              <textarea
                id="permanent_address"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.permanent_address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                id="gender"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.gender || ""}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="date_of_birth"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="date_of_birth"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid_no"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                type="text"
                id="nid_no"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.nid_no}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="phone_no"
                className="block font-semibold text-base mb-2"
              >
                Mobile No:
              </label>
              <input
                type="text"
                id="phone_no"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="local_guardian_name"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian’s Name:
              </label>
              <input
                type="text"
                id="local_guardian_name"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.local_guardian_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="local_guardian_phone_no"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian’s Number:
              </label>
              <input
                type="text"
                id="local_guardian_phone_no"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.local_guardian_phone_no}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="blood_group"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                id="blood_group"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.blood_group || ""}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </div>

        <div className="m-mt_16px">
          <div className="pt-p_16px">
            <div className="lg:flex items-start gap-3">
              <div className="w-full lg:w-[58%] bg-white border-2">
                <table className=" overflow-x-auto  w-full">
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
                            {calculateSubTotal(
                              item.discount_price,
                              item.quantity
                            )}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="lg:w-[41%] bg-white border-2 ">
                <div className="px-[30px]">
                  <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                    Cart Summary
                  </h2>
                  <div className="py-3 flex justify-between border-b border-gray-300">
                    <p className="text-black font-bold">Total Price</p>
                    <p className="text-black font-bold"></p>
                  </div>

                  <Link
                    state={"bdt"}
                    className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                  >
                    Submit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
