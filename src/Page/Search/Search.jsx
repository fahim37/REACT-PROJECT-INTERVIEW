import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { PurchaseFormContext } from "../../ContextAPIs/PurchaseFormProvider";

const Search = () => {
  const [formNo, setFormNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const { setPurchaseData } = useContext(PurchaseFormContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const requestData = {
        form_no: formNo,
        phone_no: phoneNo,
      };

      const response = await axios.post(
        "https://itder.com/api/search-purchase-data",
        requestData
      );

      if (response.status === 201) {
        setPurchaseData(response.data.singleCoursePurchaseData);
        navigate("/order-details");
      } else {
        console.error("Error loading purchase data:", response.message);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
      <h1 className="w-[600px] mx-auto text-center">Search here</h1>
      <div className="w-[500px] p-2">
        <input
          type="text"
          name="form_no"
          placeholder="Form Number"
          value={formNo}
          onChange={(e) => setFormNo(e.target.value)}
          className="text-black p-3 w-full block h-full outline-0 rounded-lg border"
        />
        <input
          type="text"
          name="phone_no"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="text-black p-3 w-full block h-full outline-0 rounded-lg border mt-2"
        />
        <button
          className="text-2xl text-black cursor-pointer border py-2 w-[485px] hover:bg-[#06284B] hover:text-white rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
