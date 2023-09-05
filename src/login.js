import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useReducer from "./reducerHook";
import logo from "./sagLogoFull.svg";
import login_logo from "./login.svg";
function Login() {
  const [user, setUserLogin] = useState();
  const auth = getAuth();
  const { setUser, setpopup } = useReducer();
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, user.name, user.pass)
      .then((userCredential) => {
        // Signed in
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
        setpopup({ message: "Logged in successfully!", type: 1 });
      })
      .catch((err) => err && setpopup({ message: err.message, type: 0 }));
  };
  return (
    <div className="flex flex-col bg-white w-3/4 h-3/4 rounded-xl shadow-lg overflow-hidden">
      <div className="w-full h-1/2 bg-gradient-to-t from-orange-500 to-yellow-500">
        <img
          src={logo}
          className="w-24 bg-white rounded-md p-2 mx-auto"
          alt=""
        />
        <img src={login_logo} className="mx-auto h-3/5 w-auto" alt="" />
      </div>

      <div>
        <div className="flex flex-col justify-center p-4">
          <h3 className="text-lg py-1 text-gray-600">Username</h3>
          <input
            onChange={(e) => setUserLogin({ ...user, name: e.target.value })}
            type="text"
            className=" rounded-md text-lg text-gray-400 selection:bg-indigo-300 selection:text-indigo-700 decoration-none p-1 border-indigo-500 border"
          />
          <h3 className="text-lg mt-2 py-1 text-gray-600">Password</h3>
          <input
            onChange={(e) => setUserLogin({ ...user, pass: e.target.value })}
            type="password"
            className=" rounded-md text-lg text-gray-400 selection:bg-indigo-300 selection:text-indigo-700 decoration-none p-1 border-indigo-500 border"
          />
          <div
            onClick={() => handleLogin()}
            className="mx-auto mt-4 bg-gradient-to-br text-center text-white cursor-pointer hover:from-purple-600 hover:to-indigo-800 from-purple-600 transition-all duration-500 to-indigo-400 px-6 py-1 rounded-full my-1 w-auto"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
