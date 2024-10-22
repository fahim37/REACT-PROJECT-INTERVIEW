import { MdMenu } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useUser from "../../Security/useUser";
import { FaUserCircle } from "react-icons/fa";
import useSmallScreen from "../../Hooks/useSmallScreen";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "./../../ContextAPIs/CartProvider";
import Cart from "../../Page/Cart/Cart";

const NavbarTop = () => {
  const { open, setOpen, sidebarRef } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userData, , refetch] = useUser();
  const imgUrl = `https://littleaccount.com/uploads/userProfile/`;
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axiosSecure("/api/logout");
      if (res.data) {
        navigate("/login");
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
        window.location.reload();
        refetch();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isSmallScreen) {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, isSmallScreen]);

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen, setOpen]);

  return (
    <div className="bg-white py-pt_primary text-_white w-full shadow-md border-b-1">
      <ul className="flex gap-gap_primary justify-between px-pt_secondary items-center">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold lg:hidden">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black"
          />
        </div>
        <div className="hidden lg:block"></div>

        <div className="flex items-center gap-4">
          <Link
            to={"/cart"}
            className="relative flex items-center cursor-pointer"
            onMouseEnter={() => setShowCartDropdown(true)}
            onMouseLeave={() => setShowCartDropdown(false)}
          >
            <FiShoppingCart className="w-[40px] h-[40px] text-black" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}

            {/* {showCartDropdown && (
              <div className="absolute top-10 right-0 w-64 bg-white shadow-lg rounded-md p-3 z-20">
                {cartItems.length > 0 ? (
                  <Cart />
                ) : (
                  <p className="text-center text-gray-500">No items in cart</p>
                )}
              </div>
            )} */}
          </Link>

          <div className="flex flex-col items-center justify-center text-text_sm font-semibold relative group">
            <div className="flex items-center">
              <h1 className="text-blue-500 text-xl font-medium">
                {userData?.userData.name}
              </h1>

              {userData?.userData.image ? (
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src={`${imgUrl}${userData.userData.image}`}
                  alt=""
                />
              ) : (
                <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black" />
              )}
            </div>

            <div className="absolute top-10 right-3 bg-_white shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 group-hover:scale-100 transition-transform duration-300 transform origin-top-right scale-0">
              {userData && (
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Profile
                </Link>
              )}
              {userData ? (
                <Link
                  onClick={handleLogout}
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavbarTop;
