import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../ContextAPIs/CartProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { PurchaseFormContext } from "../../ContextAPIs/PurchaseFormProvider";

const Checkout = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  const { setPurchaseData } = useContext(PurchaseFormContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_id: 0,
    admission_date: new Date().toLocaleDateString("en-CA"),
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
    photo: null,
  });

  const calculateSubTotal = (price, quantity) => {
    const subTotal = price * quantity;
    return subTotal;
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const handleDecreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.discount_price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();

    if (cartItems.length > 0) {
      const item = cartItems[0];
      setFormData({
        ...formData,
        course_id: item.id,
        course_fee: parseFloat(item.regular_price),
        course_qty: item.quantity,
        total_course_fee: item.regular_price * item.quantity,
        discount_course_fee: parseFloat(item.discount_price),
        sub_total_course_fee: item.discount_price * item.quantity,
      });
    }
  }, [cartItems]);

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "photo") {
      setFormData({ ...formData, photo: event.target.files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "photo") {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZDRjMWI5NS1mODRiLTRlOTMtOTM0ZC0xYzc3Y2M5MTY0YTMiLCJqdGkiOiI0NmRkYzc2OWFlZDU4ZmVhZmNiOTYyZGNiYmVkYzI2ZDI1NDUzYThlY2IxMWIwYzQyMzc4ZTVmNTZlZTQ4ZTQ4M2JmYTJmZDRhMDM5OWVjMyIsImlhdCI6MTcyOTU4ODUwMy4zOTg2OTEsIm5iZiI6MTcyOTU4ODUwMy4zOTg2OTUsImV4cCI6MTc2MTEyNDUwMy4zODY1NjYsInN1YiI6IjI1Iiwic2NvcGVzIjpbXX0.QrlPmGrZ8Jyqwba1Cwcc6KAbOmmmM7NkEyCRtQzbV7Z6gGcs-uXl15IA92cQVI3sKnp6-x8pAx4H4VPJ8IZLC9Idlsf9_SG7NZq4gI-7fsTpOIk138hmgaZtSAERs4KGAWGGhYJOETcE207lKZHwqYZGVBAZmYua5mtdmFp_VveXEIxTW1yg09EeMsVzKTWV0RlQ5OBOLqI_KqI7Hc3xjTwYBxS3vHzjwGYi-Szbf2wrU0j9iatQ-DP1uDFL0a2ILCd8CQrrs9WT7nTEX7OzpWOsILjvZXDEBOAZpJ6ALPW57arkcrWjF9PgD__9sEvuaelRRVC967QI6-f7LA7xo1oGmsDa2VXjTZV-liasIw_yPh86Vri-mpP3mValYKKclLN8oZhD92qRXbxMZoYeoSW6F5hTK9xrK9-0IsXqj9r2xkSmHGf0ZtTrOo-FztH5wqumZfkoSU4C6Ad3K_k5y-_en5O6CMgOyh9t9jXm97KUgs2yUmDq0JMgUWVY6bqXM2_IhONncudWqXD9wd-U9ULlrk9izzWhFNiS8VOSP36mAvtvXxYj7TfObOM72U7c-w5-pxoR-1EHx7daRbz0ZZfvAqGbz9i8nnAaijiss6BxEKftuPjwFqeK99yc2W3PEdjBvlu3HzKe3s7bwXtoGBMyp8ZnrbFe4cmE9yQ43Tg";
      const response = await axios.post(
        "https://itder.com/api/course-purchase",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.status_code === 201) {
        console.log("Setting purchase data:", response.coursePurchaseData);
        setPurchaseData(response.data.coursePurchaseData);
        dispatch({ type: "CLEAR" });
        navigate("/order-details");
      }
      toast.success("Form submitted successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Submission failed";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="  mt-5 border mx-2">
      <div class="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
                id="gender"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.gender || ""}
                onChange={handleChange}
              >
                <option value="" disabled>
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
                id="blood_group"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.blood_group || ""}
                onChange={handleChange}
              >
                <option value="" disabled>
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
          <div className="grid grid-cols-1">
            <label htmlFor="photo">Image:</label>
            <input
              required
              className="p-3 border border-gray-300 w-full"
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
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
                                type="button"
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
                                type="button"
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
                    <p className="text-black font-bold">{totalPrice}</p>
                    <p className="text-black font-bold"></p>
                  </div>

                  <button className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full">
                    Submit
                  </button>
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
