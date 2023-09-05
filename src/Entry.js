import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import logo from "./sagLogoFull.svg";
function Entry() {
  let { pathID } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    onSnapshot(doc(db, "paid-users", pathID), (dc) => setData(dc.data()));
  }, []);
  return (
    <div className="flex flex-col w-[94%] bg-white h-[90%] rounded-xl shadow-lg overflow-y-auto ">
      <div className="flex items-center p-4 justify-center  bg-[url('./bg-top.svg')] bg-cover h-full w-full">
        {data?.scan ? (
          <div className="flex flex-col mx-auto w-full">
            <CheckBadgeIcon className="w-2/4 mx-auto text-green-500 stroke stroke-green-300 stroke-[0.2]" />
            <h1 className="text-center text-lg font-bold text-white">
              Scan was successful!
            </h1>
            <h1 className="text-center text-white text-sm">
              Enjoy your meal :)
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 class="font-bold text-2xl my-1 text-white">QRlicious!!</h1>

            <QRCode
              className="bg-white rounded-lg p-1"
              value={"onam#" + pathID}
            />
            <h1 className="text-sm text-center mx-10 mt-1 text-white">
              Here is your delicious QR code for the feast. Scan this QR code
              and enjoy your sadhya.
            </h1>
          </div>
        )}
      </div>
      <div className="bg-white h-full w-full">
        {data?.scan ? (
          <div className="flex flex-col py-4">
            <h1 className="text-orange-500 px-4 font-bold">
              Learn how to eat sadhya :
            </h1>
            <iframe
              className="w-full h-auto left-0 top-0 overflow-hidden"
              src={`https://www.youtube.com/embed/RlrjmM_iGc4?si=bZlpJk4ZX2iiYNvE`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            <h1 className="text-orange-500 pt-4 px-4 font-bold">
              Nutrition in Onam sadhya :
            </h1>
            <h1 className="text-gray-400 my-1 text-sm text-justify w-full px-4">
              The Onam sadhya is a well-balanced combination of carbs, proteins,
              fats, fiber, minerals, and vitamins served on banana leaf which
              itself is rich in antioxidants, and exhibits antibacterial
              properties. This aids proper digestion of the full fledge meal.
              <br />
            </h1>

            <h1 className="text-orange-500 pt-3 pb-1 px-4 font-bold">
              The key ingredients of Onam sadhya with extraordinary health
              benefits are:
            </h1>
            <ul className="px-4">
              <li className="text-sm text-gray-400 text-justify">
                <b className="text-gray-700">1. Red rice:</b> The red rice used
                in sadhya are rich in antioxidants and magnesium. Their
                consumption also regulates insulin levels, manages diabetes,
                recovers from asthma, and aid digestion.
              </li>
              <li className="text-sm text-gray-400 text-justify">
                <b className="text-gray-700">2. Jaggery:</b> The antioxidants
                and minerals in jaggery are known to detox your body. Besides
                consumption of jaggery also boosts immunity, prevents anemia,
                and aids digestion.
              </li>
              <li className="text-sm text-gray-400 text-justify">
                <b className="text-gray-700">3. Ginger:</b> Ginger used in puli
                inji curry helps to manage nausea, manage arthritis, lower blood
                sugar levels, control cholesterol and keep your mouth germ free.
              </li>
              <li className="text-sm text-gray-400 text-justify">
                <b className="text-gray-700">4. Buttermilk:</b> Besides
                regulating your body temperature, the good bacteria in
                buttermilk act as probiotics to help you digest meals. Vitamin A
                in buttermilk boosts your immune system and keeps your lungs,
                heart, and kidneys in a healthy state.
              </li>
              <li className="text-sm text-gray-400 text-justify">
                <b className="text-gray-700">5. Yam:</b> Yam or jimikand
                improves our gastric health and promotes good gut bacteria. It
                is rich in minerals, such as magnesium, and potassium, which are
                beneficial for bone health, decrease cholesterol levels and
                improve heart conditions. Diosgenin present in yam is also known
                to sharpen memory and brain functioning.
              </li>
              <li className="text-sm text-gray-400 text-justify">
                <b className="text-gray-700">6. Coconut milk:</b> It’s the
                high-calorie ingredient used in most dishes of Onamsadhya.
                However, it offers numerous health benefits such as boosting
                immunity, increasing stamina, treating muscle dysfunction and
                promoting heart health.
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex flex-col p-4">
            <h1 class="font-semi text-orange-500 mb-1">Coupon Details :</h1>
            <div className="flex flex-row bg-yellow-100 rounded-md border-orange-300 border">
              <img
                src={logo}
                className="border-r border-orange-300 pr-4 mx-0 w-20 px-4 mb-2 my-2"
                alt=""
              />
              <div className="flex flex-col w-1/2 ml-4">
                <div className="grid grid-cols-2  my-2 place-items-start">
                  <h1 className="text-sm font-bold">Name :</h1>
                  <h1 className="text-sm">{data?.name}</h1>
                </div>
                <div className="grid grid-cols-2  place-items-start  my-2  ">
                  <h1 className="text-sm font-bold">Email :</h1>
                  <h1 className="text-sm">{data?.email}</h1>
                </div>
              </div>
            </div>

            <h1 class="font-bold text-transparent mt-4 text-xl bg-clip-text bg-gradient-to-br from-orange-600 to-yellow-400">
              Happy Onam
            </h1>
            <h1 className="text-sm text-gray-400">
              Onam is an annual Indian - regional harvest or cultural festival
              celebrated mostly by the people of Kerala. A major annual event
              for Keralites, it is the official festival of the state and
              includes a spectrum of cultural events. Onam commemorates King
              Mahabali and Vamana.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Entry;
