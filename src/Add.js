import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import useReducer from "./reducerHook";
import Login from "./login";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import logo from "./sagLogoFull.svg";
import axios from "axios";
import ReactLoading from "react-loading";

function Add() {
  const { user, setpopup, server_add } = useReducer();
  const [form, setForm] = useState({});
  const [email, setEmail] = useState(true);
  const [check, setCheck] = useState(false);
  const [load, setLoad] = useState(false);
  const sendEmail = async (s_email, code, name) => {
    axios({
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
    });
  };
  const AddData = async () => {
    setLoad(true);
    if (form?.name && form?.email && form?.amount && form?.guests) {
      setCheck(false);
      addDoc(collection(db, "paid-users"), {
        ...form,
        scan: false,
        added_by: user.email,
        sent_email: email,
      }).then(async (dc) => {
        email && (await sendEmail(form?.email, dc.id, form?.name));
        setForm({ name: "", email: "", amount: "", guests: "" });
        setpopup({ message: "Item Added", type: 1 });
        setLoad(false);
      });
    } else {
      setCheck(true);
    }
  };
  const nav = useNavigate();
  return user ? (
    <div className="flex flex-col bg-white w-[94%] h-[90%] rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-row items-center justify-between px-12 h-1/5 bg-[url('./bg-top.svg')] bg-cover ">
        <div className="flex flex-row">
          <ArrowLeftCircleIcon
            onClick={() => nav(-1)}
            className="w-16 stroke-2 text-white transition-all hover:text-white/60 rounded-full cursor-pointer text-red"
          />
          <div className="flex flex-col ml-4">
            <h1 className="text-3xl font-extrabold text-white">Add</h1>
            <h1 className="text-lg text-white">Data</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between mx-auto  h-4/5 p-4">
        {check && (
          <h1 className="text-red-500 bg-red-100 w-full text-center mx-auto">
            Fill all fields
          </h1>
        )}
        <div className="flex flex-col mt-4 gap-3 items-start justify-center">
          <div className="grid-col-1 items-center gap-2">
            <h1 className="text-slate-600">Name : </h1>
            <input
              value={form?.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className=" decoration-indigo-400 bg-indigo-100 border-indigo-500 px-2 py-1 rounded-md "
              type="text"
            />
          </div>
          <div className="grid-col-1 items-center gap-2">
            <h1 className="text-slate-600">Email : </h1>
            <input
              value={form?.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className=" decoration-indigo-400 bg-indigo-100 border-indigo-500 px-2 py-1 rounded-md "
              type="email"
            />
          </div>
          <div className="grid-col-1 items-center gap-2">
            <h1 className="text-slate-600">Amount : </h1>
            <input
              value={form?.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className=" decoration-indigo-400 bg-indigo-100 border-indigo-500 px-2 py-1 rounded-md "
              type="number"
            />
          </div>
          <div className="grid-col-1 items-center gap-2">
            <h1 className="text-slate-600">Guests: </h1>
            <input
              value={form?.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
              className=" decoration-indigo-400 bg-indigo-100 border-indigo-500 px-2 py-1 rounded-md "
              type="number"
            />
          </div>

          <div className="grid-col-1 items-center gap-2">
            <input
              checked={email}
              onChange={(e) => setEmail(e.target.checked)}
              type="checkbox"
              className="transform scale-125"
              name="email_check"
            />
            <label className="ml-1 text-slate-600 " htmlFor="email_check">
              Send email
            </label>
          </div>

          <div
            onClick={() => AddData()}
            className="flex flex-row items-center justify-between bg-gradient-to-br from-orange-600 hover:to-yellow-500 cursor-pointer hover:from-orange-600 to-yellow-400 px-6 my-2 mx-auto py-1 text-white rounded-full"
          >
            {load && (
              <ReactLoading
                className="mr-2"
                type={"spin"}
                color={"blue"}
                height={20}
                width={20}
              />
            )}
            Add
          </div>
        </div>
        <img src={logo} className="w-14 mx-auto mb-2" alt="" />
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default Add;
