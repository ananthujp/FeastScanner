import React from "react";
import useReducer from "./reducerHook";
import Login from "./login";
import { Link } from "react-router-dom";
import {
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import logo from "./sagLogoFull.svg";
function Home() {
  const { user, setUser, setpopup } = useReducer();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setpopup({ message: "Logged Out", type: 0 });
  };
  return user ? (
    <div className="flex flex-wrap  w-[94%] flex-col items-center justify-center bg-white h-3/4 rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-row items-center justify-start w-full px-12 h-1/5 ">
        <img src={logo} className="w-14 mr-4" alt="" />
        <div className="flex flex-col pl-6">
          <h1 className="text-3xl font-extrabold text-orange-500">
            Onam - Entry
          </h1>
          <h1 className="text-sm text-yellow-500">Home</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-items-center	 items-center  w-full bg-gradient-to-br from-orange-500 to-yellow-500 p-4  h-4/5 ">
        <Link
          className="flex flex-col hover:bg-white/40 text-white justify-around py-4 bg-white/30 w-24 h-28 border border-white rounded-md text-center"
          to="/add"
        >
          <UserPlusIcon className="w-16 text-white mx-auto" />
          Add Data
        </Link>
        <Link
          className="flex flex-col hover:bg-white/40 text-white justify-around py-4 bg-white/30 w-24 h-28 border border-white rounded-md text-center"
          to="/view"
        >
          <ViewfinderCircleIcon className="w-16 text-white mx-auto" />
          View Data
        </Link>
        <Link
          className="flex flex-col hover:bg-white/40 text-white justify-around py-4 bg-white/30 w-24 h-28 border border-white rounded-md text-center"
          to="/scan"
        >
          <UserPlusIcon className="w-16 text-white mx-auto" />
          Scan
        </Link>
        <div
          className="flex flex-col hover:bg-white/40 text-white justify-around py-4 bg-white/30 w-24 h-28 border border-white rounded-md text-center"
          onClick={() => handleLogout()}
        >
          <ArrowLeftOnRectangleIcon className="w-16 text-white mx-auto" />
          Logout
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default Home;
