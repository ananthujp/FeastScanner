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
import ReactLoading from "react-loading";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import useReducer from "./reducerHook";
import Login from "./login";
import axios from "axios";
function View() {
  const { user, setpopup, server_add } = useReducer();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const [email_hover, setEmHover] = useState({
    visible: false,
    name: null,
    code: null,
    email: null,
  });
  const sendEmail = async (s_email, code, name) => {
    setLoad(true);
    await axios({
      method: "get",
      url:
        server_add +
        "send?code=" +
        code +
        "&email=" +
        s_email +
        "&name=" +
        name,
      data: "",
    }).then((response) => {
      setpopup({ message: "Email sent!", type: 1 });
      setDoc(
        doc(db, "paid-users", code),
        { sent_email: true, email: email_hover.email },
        { merge: true }
      ).then(() =>
        setEmHover({
          visible: false,
          name: null,
          code: null,
          email: null,
        })
      );
    });
    setLoad(false);
  };
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
    <div className="relative flex flex-col bg-white  w-[94%] h-[90%] rounded-xl shadow-lg overflow-hidden">
      {email_hover?.visible && (
        <div className="absolute flex w-full h-full bg-white/20 backdrop-blur-sm">
          <div className="flex flex-col gap-1 p-2 rounded-lg bg-green-100 border border-green-300 w-1/2 max-h-28 my-auto mx-auto">
            <div className="flex flex-row justify-between">
              <h1 className="text-gray-600">Email</h1>
              <XCircleIcon
                onClick={() =>
                  setEmHover({
                    visible: false,
                    name: null,
                    code: null,
                    email: null,
                  })
                }
                className="w-6 text-emerald-700 hover:text-emerald-500 cursor-pointer"
              />
            </div>
            <input
              type="text"
              onChange={(e) =>
                setEmHover({ ...email_hover, email: e.target.value })
              }
              value={email_hover?.email}
              className="bg-green-200 rounded-md px-2 italic text-gray-700 text-sm border border-green-300"
            />
            <div
              onClick={() =>
                sendEmail(email_hover.email, email_hover.code, email_hover.name)
              }
              className="flex flex-row items-center justify-between bg-gradient-to-br cursor-pointer from-green-600 hover:to-emerald-500  hover:from-green-600 text-sm to-emerald-400 px-4 my-2 mx-auto py-1 text-white rounded-full"
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
              Send
            </div>
          </div>
        </div>
      )}
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
            style={{ gridTemplateColumns: "30% 15% 15% 15% 25%" }}
            className="grid grid-cols-5 gap-4	 bg-orange-200 px-4 py-1 w-full justify-between"
          >
            <h1>Name</h1>
            <h1>Amount</h1>
            <h1>Email</h1>
            <h1>Scan</h1>
            <h1 className="">Action</h1>
          </div>
          {data.length > 1 &&
            data?.map((dc) => (
              <div
                key={`view.data.${dc.id}`}
                style={{ gridTemplateColumns: "30% 15% 15% 15% 25%" }}
                className="grid grid-cols-5 gap-4 cursor-default transition-all duration-250 hover:bg-orange-100  bg-orange-50 px-4 py-1 w-full justify-between"
              >
                <h1>
                  {dc?.data.name +
                    (dc?.data.guests > 1
                      ? " + " + parseInt(dc?.data.guests - 1)
                      : "")}
                </h1>
                <h1>{dc?.data.amount}</h1>
                <h1>
                  {dc?.data.sent_email ? (
                    <div
                      onClick={() =>
                        setEmHover({
                          visible: true,
                          name: dc?.data.name,
                          code: dc?.id,
                          email: dc?.data.email,
                        })
                      }
                      className="flex flex-row cursor-pointer group items-center w-auto bg-white hover:bg-green-500 rounded-full"
                    >
                      <CheckCircleIcon className="w-6 text-green-500 group-hover:text-white" />
                      <h1 className="text-white ml-0.5 text-sm hidden group-hover:block">
                        Re-send
                      </h1>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setEmHover({
                          visible: true,
                          name: dc?.data.name,
                          code: dc?.id,
                          email: dc?.data.email,
                        })
                      }
                      className="flex flex-row cursor-pointer group items-center w-auto bg-white hover:bg-red-500 rounded-full"
                    >
                      <XCircleIcon className="w-6 text-red-500 group-hover:text-white" />
                      <h1 className="text-white ml-0.5 text-sm hidden group-hover:block">
                        send
                      </h1>
                    </div>
                  )}
                </h1>
                <h1>
                  {dc?.data.scan ? (
                    <div
                      onClick={() => changeScan(dc.id, dc?.data.scan)}
                      className="flex flex-row cursor-pointer group items-center w-auto bg-white hover:bg-green-500 rounded-full"
                    >
                      <CheckCircleIcon className="w-6 cursor-pointer hover:animate-spin text-green-500 group-hover:text-white" />
                      <h1 className="text-white ml-0.5 text-sm hidden group-hover:block">
                        Change
                      </h1>
                    </div>
                  ) : (
                    <div
                      onClick={() => changeScan(dc.id, dc?.data.scan)}
                      className="flex flex-row cursor-pointer group items-center w-auto bg-white hover:bg-red-500 rounded-full"
                    >
                      <XCircleIcon
                        onClick={() => changeScan(dc.id, dc?.data.scan)}
                        className="w-6 cursor-pointer hover:animate-spin text-red-500 group-hover:text-white"
                      />
                      <h1 className="text-white ml-0.5 text-sm hidden group-hover:block">
                        Change
                      </h1>{" "}
                    </div>
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
