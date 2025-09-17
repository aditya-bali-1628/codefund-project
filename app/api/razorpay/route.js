import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connect from "@/db/dbconnect";
import User from "@/models/User";


// Handle Razorpay POST callback (server-to-server)
export const POST = async (req) => {
  try {
    await connect();
    const body = Object.fromEntries(await req.formData());

    const payment = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!payment) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    //fetch the user of the who is getting the payment 
let user = await User.findOne({ username: payment.to_username });

    const secret = user.razorpaySecret

    const isValid = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
   secret
    );

    if (isValid) {
      await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: true }
      );

      // Nothing to return — Razorpay only cares about status code
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};

// Handle GET — Razorpay redirects the user here
export const GET = async () => {
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/success?paymentdone=true`);
};
