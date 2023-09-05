import {
  EyeIcon,
  ArrowLeftCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import useReducer from "./reducerHook";
import Login from "./login";

function View() {
  const { user, setpopup } = useReducer();
  const [data, setData] = useState({});
  useEffect(() => {
    onSnapshot(collection(db, "paid-users"), (dc) =>
      setData(dc.docs.map((dic) => ({ id: dic.id, data: dic.data() })))
    );
  }, []);
  //console.log(data);
  const deleteItem = (id) => {
    if (window.confirm("Delete item?")) {
      deleteDoc(doc(db, "paid-users", id)).then(() =>
        setpopup({ message: "Item deleted", type: 1 })
      );
    }
  };
  const changeScan = (id, sc) => {
    if (window.confirm("Change Status")) {
      setDoc(
        doc(db, "paid-users", id),
        { scan: !sc, timestamp: serverTimestamp() },
        { merge: true }
      );
    }

    //setData(doc(db, "paid-users", id), { scan: true }, { merge: true });
  };
  const nav = useNavigate();
  return user ? (
    <div className="flex flex-col bg-white  w-[94%] h-[90%] rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-row items-center justify-between px-12 h-1/5 bg-gradient-to-br from-orange-400 to-yellow-400">
        <div className="flex flex-row">
          <ArrowLeftCircleIcon
            onClick={() => nav(-1)}
            className="w-16 stroke-2 text-white transition-all hover:text-white/60 rounded-full cursor-pointer text-red"
          />
          <div className="flex flex-col ml-4">
            <h1 className="text-3xl font-extrabold text-white">View</h1>
            <h1 className="text-lg text-white">Data</h1>
          </div>
        </div>
      </div>

      <div className="flex p-4 flex-row items-start justify-between  h-4/5 ">
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <div
            style={{ gridTemplateColumns: "35% 35% 10% 20%" }}
            className="grid grid-cols-4 gap-4	 bg-orange-200 px-4 py-1 w-full justify-between"
          >
            <h1>Name</h1>
            <h1>Amount</h1>
            <h1>Scan</h1>
            <h1 className="">Action</h1>
          </div>
          {data.length > 1 &&
            data?.map((dc) => (
              <div
                key={`view.data.${dc.id}`}
                style={{ gridTemplateColumns: "35% 35% 10% 20%" }}
                className="grid grid-cols-4 gap-4 cursor-default transition-all duration-250 hover:bg-orange-100  bg-orange-50 px-4 py-1 w-full justify-between"
              >
                <h1>
                  {dc?.data.name +
                    (dc?.data.guests > 1 ? " +" + dc?.data.guests : "")}
                </h1>
                <h1>{dc?.data.amount}</h1>
                <h1>
                  {dc?.data.scan ? (
                    <CheckCircleIcon
                      onClick={() => changeScan(dc.id, dc?.data.scan)}
                      className="w-6 hover:animate-spin text-green-500"
                    />
                  ) : (
                    <XCircleIcon
                      onClick={() => changeScan(dc.id, dc?.data.scan)}
                      className="w-6 hover:animate-spin text-red-500"
                    />
                  )}
                </h1>
                <h1 className="flex flex-row">
                  <TrashIcon
                    onClick={() => deleteItem(dc.id)}
                    className="w-6 p-1 hover:text-white transition-all duration-250 hover:bg-orange-400 rounded-full"
                  />

                  <Link to={"/entry/" + dc.id}>
                    <EyeIcon className="w-6 p-1 hover:text-white transition-all duration-250 hover:bg-orange-400 rounded-full" />
                  </Link>
                </h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default View;
