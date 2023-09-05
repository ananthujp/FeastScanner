import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { Component, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { db } from "./firebase";
import { LifebuoyIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import logo from "./sagLogoFull.svg";
import ringer from "./success.mp3";
import ringer_2 from "./wrong.mp3";

import ReactLoading from "react-loading";

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: null,
      data: [],
      user: null,
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    if (data && data.text?.split("#")[0] === "onam") {
      this.setState({
        result: data,
      });
      getDoc(doc(db, "paid-users", data.text?.split("#")[1])).then((dc) => {
        console.log(dc.data());
        if (dc.data().scan) {
          this.setState({
            user: {
              status: false,
              time: new Date(dc.data().timestamp.seconds * 1000).toString(),
            },
          });
          const audio = new Audio(ringer_2);
          audio.play();
          setTimeout(() => this.setState({ result: null, user: null }), 3000);
        } else {
          setDoc(
            doc(db, "paid-users", dc.id),
            { scan: true, timestamp: serverTimestamp() },
            { merge: true }
          ).then(() => {
            const audio = new Audio(ringer);
            audio.play();
            //::TODO: success.play();
            this.setState({
              user: {
                status: true,
                name: dc.data().name,
                guests: dc.data().guests,
              },
            });
            this.setState((prevState) => ({
              data: [
                ...prevState.data,
                {
                  name: dc.data().name,
                  email: dc.data().email,
                  guests: dc.data().guests,
                },
              ],
            }));
            setTimeout(() => this.setState({ result: null, user: null }), 3000);
          });
        }
      });
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div className="flex flex-col justify-between bg-orange-600  w-[94%] h-[90%] rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-1/2 bg-orange-400">
          {this.state.result && this.state.user ? (
            this.state.user.status ? (
              <div className="w-full h-full py-4 bg-gradient-to-br from-green-600 to-green-400 flex flex-col justify-between items-center">
                <h1></h1>
                <div>
                  <h1 className="text-white text-2xl font-bold">
                    Welcome {this.state.user.name}
                  </h1>
                  <h1 className="text-white text-lg font-light">
                    Wishing you a Happy Onam
                  </h1>
                </div>
                <h1 className="text-white text-md font-bold">
                  Enjoy your meal
                </h1>
              </div>
            ) : (
              <div className="w-full h-full py-4 bg-red-400 flex flex-col justify-between items-center">
                <h1></h1>
                <div>
                  <h1 className="text-white text-2xl font-bold">
                    You have already scanned
                  </h1>
                  <h1 className="text-white text-lg font-light">
                    at {this.state.user.time}
                  </h1>
                </div>
                <h1 className="text-white text-md font-bold">
                  Please contact the authority if this is some error from our
                  side
                </h1>
              </div>
            )
          ) : this.state.result ? (
            <div className="flex items-center justify-center w-full h-full bg-white">
              <ReactLoading
                type={"spin"}
                color={"orange"}
                height={"20%"}
                width={"20%"}
              />
            </div>
          ) : (
            //<></>
            <QrReader
              delay={this.state.delay}
              className="h-auto w-full"
              onError={this.handleError}
              onScan={this.handleScan}
            />
          )}
          {!this.state.result && (
            <div className="absolute  z-50 bg-white rounded-full top-4 left-[30%] flex flex-row items-center">
              <LifebuoyIcon className="w-8 text-green-500 animate-spin" />
              <h1 className="text-green-500 text-lg">Scan your QR code</h1>
            </div>
          )}
        </div>
        <div className="relative flex flex-col h-1/2 items-center justify-between mt-4">
          {/* <p>{this.state.result?.text}</p> */}

          <div className="flex flex-col w-full bg-orange-100 h-full">
            <h1 className="font-semibold text-lg text-orange-800 px-2 py-0.5 bg-orange-200">
              Recent Entries
            </h1>
            <div className="flex flex-col overflow-y-auto">
              {this.state.data?.toReversed().map((dc, i) => (
                <div
                  className={
                    "flex flex-row justify-between w-full " +
                    (i === 0 ? " px-4 py-2" : " px-4 py-1")
                  }
                >
                  <div className="flex flex-row">
                    <CheckCircleIcon
                      className={
                        " text-green-400" + (i === 0 ? " w-8" : " w-4")
                      }
                    />
                    <h1
                      className={
                        " font-semibold text-slate-600 ml-2 " +
                        (i === 0 ? " text-md" : " text-xs")
                      }
                    >
                      {dc.name + (dc.guests > 1 ? " +" + dc.guests : "")}
                    </h1>
                  </div>
                  <h1
                    className={
                      " italic text-slate-600" +
                      (i === 0 ? " text-md" : " text-xs")
                    }
                  >
                    {dc.email}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute z-50 bg-white rounded-full bottom-2 flex flex-row items-center">
            <img src={logo} className="w-14 mx-auto mb-2" alt="" />
          </div>
        </div>
      </div>
    );
  }
}
export default Scan;
