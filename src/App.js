import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import useReducer from "./reducerHook";
import { useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
function App({ children }) {
  const { popup } = useReducer();
  const testFn = () => {
    addDoc(collection(db, "paid-users"), {
      name: "test",
      email: "test@gmail.com",
    }).then((dc) => console.log(dc));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[url('./bg.svg')] bg-cover bg-center">
      <div
        className={
          "absolute flex flex-row justify-around top-5 transition-all ease-in-out duration-1000 px-4 py-0.5 rounded-full border-2 z-100  " +
          (popup !== null ? " top-5" : " -top-20 ") +
          (popup?.type === 0 && " border-red-500 text-red-500 bg-red-100 ") +
          (popup?.type === 1 &&
            " border-green-500 text-green-500 bg-green-100 ")
        }
      >
        {popup?.type === 1 && <CheckCircleIcon className="w-6 mr-2" />}
        {popup?.type === 0 && <XCircleIcon className="w-6 mr-2" />}
        {popup?.message}
      </div>
      {children}
    </div>
  );
}

export default App;
