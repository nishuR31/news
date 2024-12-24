import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const PaymentPortal = () => {
  return (
    <div className="payment-portal">
      <h1>Subscribe for Premium Content</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPortal;
