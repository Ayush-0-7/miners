import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { changepayment } from "../features/miners/MinerSlice";
import { loadCashfree } from "./util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseurl } from "../urls";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { auth, db } from "./Firebase";

const Wallet = () => {
  const dispatch = useDispatch();
  const psi = useSelector((state) => state.psi);
  const oid = useSelector((state) => state.oid);
  const [bal, setbal] = useState(0);
  const topup = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      try {
        const docRef = async() => {
          const balancedoc = await getDoc(doc(db,'balance',user.uid));
          return balancedoc.data();
        }
        docRef().then((res)=>{setbal(parseFloat(res.balance.toFixed(2)))});
      }
      catch (error) {
        console.log(error);
      }  
    })
   
      
     
  }, []);

  const handlepayment = async () => {
    if (!topup.current.value) {
      return toast("Please Enter a valid amount.");
    }

    try {
      const res = await fetch(`${baseurl}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topup: topup.current.value }),
      });

      const data1 = await res.json();
      localStorage.setItem("oid", data1.order_id);
      dispatch(changepayment({ psi: data1.psi, oid: data1.order_id }));

      const cashfree = await loadCashfree();

      let checkoutOptions = {
        paymentSessionId: data1.psi,
        returnUrl: "https://miners-frontgg67.vercel.app",
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          alert(result.error.message);
          navigate("/wallet");
        }
      });
    } catch (error) {
      console.error("Error processing payment: ", error);
    }
  };

  const handlevalidate = async () => {
    const oid = localStorage.getItem("oid");

    try {
      const res = await fetch(`${baseurl}/api/paymentStatus/${oid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      const balanceDoc = await getDoc(doc(db, 'balance', auth.currentUser.uid));
      const total_balance = balanceDoc.data().balance + data.order_data.order_amount;

      if (data.order_data.order_status === "PAID") {
        await setDoc(doc(db, 'balance', auth.currentUser.uid), {
          balance: total_balance,
        });
        setbal(total_balance);
        toast("Payment is successful");
        localStorage.setItem("oid", "");
      } else if (data.order_data.order_status === "ACTIVE") {
        toast("Oops!! Payment failed.");
      }

      localStorage.setItem("oid", "");
    } catch (error) {
      console.error("Error validating payment: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] bg-white">
      <ToastContainer />
      <div className="md:h-[35vh] md:w-[30vw] h-[50vh] w-full bg-black text-white rounded-md text-left font-serif p-3">
        <h1 className="text-center font-extrabold text-3xl underline">My Wallet</h1>
        <h2 className="p-2">
          <span className="font-bold">Account Holder's Name</span> :Ayush
        </h2>
        <hr className="border-1 border-white"></hr>
        <h2 className="p-2">
          <span className="font-bold">Balance</span> : {bal.toFixed(2)}
        </h2>
        <hr className="border-1 border-white"></hr>
        <div className="flex">
          <Link
            to={""}
            type="button"
            className="inline-flex items-center text-black rounded-md bg-white px-3 py-2 text-sm m-2 font-semibold"
            onClick={handlepayment}
          >
            Top-Up
          </Link>
          <button
            className="bg-white rounded-md text-black font-semibold m-2"
            onClick={handlevalidate}
          >
            Validate Payment
          </button>
          <div className="w-full md:w-[10vw] m-2">
            <input
              ref={topup}
              className="flex h-12 w-full rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 border-white border-2"
              type="text"
              placeholder="Amount"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
