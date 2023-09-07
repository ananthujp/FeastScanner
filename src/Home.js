import React, { useState } from "react";
import useReducer from "./reducerHook";
import Login from "./login";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import {
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import logo from "./sagLogoFull.svg";
import axios from "axios";

function Home() {
  const { user, setUser, setpopup, server_add } = useReducer();
  const [server_st, setServer] = useState("Please press check ");
  const [load, setLoad] = useState(false);
  const server_stat = async () => {
    setLoad(true);
    await axios({
      method: "get",
      url: server_add + "check?code=123",
      data: "",
    }).then((response) => {
      console.log(response);
      setServer(response.data);
      setLoad(false);
    });
  };
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
      <div className="flex flex-col w-full items-center justify-around bg-gradient-to-br from-orange-500 to-yellow-500 h-4/5 ">
        <div className=" flex flex-col mt-8 mx-auto  ">
          <h1 className="text-md text-center bg-green-500 rounded-t-lg text-white">
            Server status :
          </h1>
          <div className="bg-white flex flex-row p-1 items-center ">
            <input
              type="text"
              value={server_st}
              disabled={true}
              className="w-[80%] mx-2 text-sm text-gray-400"
            />
            <div
              onClick={() => server_stat()}
              className="flex flex-row bg-gradient-to-br cursor-pointer text-white from-blue-400 to-cyan-400 text-sm px-2 py-0.5 rounded-full"
            >
              {load && (
                <ReactLoading
                  className="mr-2"
                  type={"spin"}
                  color={"white"}
                  height={20}
                  width={20}
                />
              )}
              Check
            </div>
          </div>
          <h1 className="text-xs text-center italic bg-blue-100 rounded-b-lg text-slate-400">
            {server_add ? server_add.split("https://")[1].split("/")[0] : ""}
          </h1>
        </div>
        <div className="grid grid-cols-2 w-full items-center h-full justify-items-center	 p-4 ">
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
    </div>
  ) : (
    <Login />
  );
}

export default Home;
