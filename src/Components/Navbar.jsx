import React, { useContext } from "react";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout Done");
      })
      .catch((error) => {
        // An error happened.
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="navbar bg-base-100  sticky top-0 z-50 shadow-xs lg:px-6">
      <div className="navbar-start">
        <div className="dropdown mr-3">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100  z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>

            <li>
              <NavLink to="/about">About us</NavLink>
            </li>
            <li>
              <NavLink to="/myReserves">My Reseves</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-2">
          <img
            src="https://i.ibb.co.com/vxyvV9Mh/logo.png"
            alt=""
            className="w-8"
          />
          <p className=" lg:block hidden  text-3xl font-bold"> Evnetly</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-6">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>

          <li>
            <NavLink to="/myReserves">My Reseves</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {user ? (
          <div>
            <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
              <Link to="/profile" className="avatar mx-4 ">
                <div className=" ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                  <img src={user.photoURL} />
                </div>
              </Link>
            </div>
            <Link
              onClick={handleLogout}
              className="btn  bg-indigo-600 text-white hover:bg-indigo-700  lg:btn-md btn-sm"
            >
              Logout <MdOutlineLogout size={20} />
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to="login"
              className="btn  bg- bg-indigo-600 text-white hover:bg-indigo-700  lg:btn-md btn-sm"
            >
              <MdOutlineLogin size={20} /> Login
            </Link>
            <Link
              to="register"
              className="btn  bg- bg-indigo-600 text-white hover:bg-indigo-700  lg:btn-md btn-sm"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
