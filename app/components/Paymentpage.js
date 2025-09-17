'use client';

import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchPayments, fetchuser, initiate, updateprofile } from '@/actions/useractions';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { Bounce } from 'react-toastify';


const Paymentpage = ({ username }) => {
  const { data: session } = useSession();
  const [currentuser, setcurrentuser] = useState({})
  const [payment, Setpayment] = useState([]);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({})
  const searchParams = useSearchParams();
  const [toastShown, setToastShown] = useState(false);
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    number: ""
  });

  useEffect(() => {
    getdata();
  }, []);


  useEffect(() => {
    const paymentDone = searchParams.get("paymentdone");

    if (paymentDone === "true" && !toastShown) {
      toast.success('✅ Payment completed successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
        toastId: 'payment-success', // prevents duplicate toasts
      });

      setToastShown(true);

      // Clean URL
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }
  }, [searchParams, toastShown]);

  const handlechange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getdata = async () => {
    let u = await fetchuser(username)
    setcurrentuser(u)
    let dbpayments = await fetchPayments(username)
    Setpayment(dbpayments)
  }

  const pay = async (amount) => {
    const a = await initiate(amount, username, paymentform);
    const orderId = a.id;

    const options = {
      key: currentuser.razorpayId,
      amount: Number.parseInt(amount) * 100,
      currency: 'INR',
      name: 'get me a chai',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: orderId,
      handler: async function (response) {
        const formData = new URLSearchParams();
        formData.append("razorpay_payment_id", response.razorpay_payment_id);
        formData.append("razorpay_order_id", response.razorpay_order_id);
        formData.append("razorpay_signature", response.razorpay_signature);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`, {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        if (result.success) {
          setSuccess(true);
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: paymentform.name,
        email: session?.user?.email || '',
        contact: '',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="min-h-screen text-white flex flex-col">

        {/* Header Cover */}
        {currentuser?.profilePicture ? (
          <div className="relative w-full h-48 md:h-64 flex-shrink-0">
            <Image
              src={currentuser.profilePicture}
              alt="User profile"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full h-48 md:h-64 bg-gray-700" />
        )}

        {/* Profile Picture */}
        <div className="flex justify-center -mt-12 md:-mt-16 relative">
          <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-gray-800 shadow-lg">
            {currentuser?.coverPicture ? (
              <Image
                src={currentuser.coverPicture}
                alt="profile"
                width={128}
                height={128}
                className="absolute top-0 left-0 w-full h-full object-cover z-10"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gray-600 rounded-full" />
            )}
          </div>
        </div>

        {/* Username */}
        <div className="text-center mt-3 md:mt-4 px-4 mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold">@{username}</h1>
          <p className="text-gray-400 text-sm md:text-base">Lets help {username} get a chai! </p>
          <p className="text-gray-500 text-xs md:text-sm mt-1">{payment.length} Payment. ₹ {payment.reduce((a, b) => a + b.amount, 0)} raised</p>
        </div>

        {/* Payment Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-4 pb-8">
          {/* Supporters */}
          <div className="bg-[#1e293b] rounded-lg p-4 md:p-6 order-2 lg:order-1">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Supporters</h2>
            <div className="space-y-3 md:space-y-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
              {payment.length === 0 ? (
                <p className="text-gray-400 text-sm md:text-base">No supporters yet.</p>
              ) : (
                payment.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 md:gap-3 hover:bg-slate-800 p-2 rounded-md transition"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                      alt={`Avatar of ${p.name}`}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                    />
                    <p className="text-xs md:text-sm break-words">
                      <span className="font-medium">{p.name}</span> donated{" "}
                      <span className="font-bold text-green-400">₹{p.amount}</span>
                      {p.message && (
                        <>
                          {" "}with a message{" "}
                          <span className="text-gray-300">&quot;{p.message}&quot;</span>

                        </>
                      )}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment Box */}
          <div className="bg-[#1e293b] rounded-lg p-4 md:p-6 order-1 lg:order-2">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Make a Payment</h2>
            <form className="space-y-3 md:space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                value={paymentform.name}
                name="name"
                onChange={handlechange}
                type="text"
                placeholder="Enter Name"
                className="w-full px-3 py-2 md:px-4 md:py-2 rounded bg-[#334155] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <input
                name="message"
                value={paymentform.message}
                onChange={handlechange}
                type="text"
                placeholder="Enter Message"
                className="w-full px-3 py-2 md:px-4 md:py-2 rounded bg-[#334155] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <input
                name="number"
                value={paymentform.number}
                onChange={handlechange}
                type="number"
                placeholder="Enter Amount"
                className="w-full px-3 py-2 md:px-4 md:py-2 rounded bg-[#334155] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />

              <button
                type="button"
                onClick={() => {
                  const amt = Number(paymentform.number);
                  if (!amt || amt < 1) {
                    toast.error("Please enter a valid amount");
                    return;
                  }
                  pay(amt);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded font-semibold text-sm md:text-base"
              >
                Pay ₹{paymentform.number || '...'}
              </button>

              {/* Quick Amount Buttons */}
              <div className="flex gap-2 mt-3 md:mt-4 flex-wrap">
                <button onClick={() => pay(10)} type="button" className="bg-[#334155] px-3 py-1 md:px-4 md:py-1 rounded hover:bg-[#475569] text-xs md:text-sm">
                  ₹10
                </button>
                <button onClick={() => pay(20)} type="button" className="bg-[#334155] px-3 py-1 md:px-4 md:py-1 rounded hover:bg-[#475569] text-xs md:text-sm">
                  ₹20
                </button>
                <button onClick={() => pay(30)} type="button" className="bg-[#334155] px-3 py-1 md:px-4 md:py-1 rounded hover:bg-[#475569] text-xs md:text-sm">
                  ₹30
                </button>
              </div>

              {success && (
                <div className="text-green-400 font-semibold mt-3 md:mt-4 text-center text-sm md:text-base">
                  ✅ Payment completed successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paymentpage;