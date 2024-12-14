import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useStripe } from "@stripe/stripe-react-native";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";
import { useAuth } from "@clerk/clerk-expo";
import { IntentCreationCallbackParams } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";
import { Result } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentMethod";

interface PaymentSheetParams {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
}

const Payment: React.FC<PaymentProps> = ({
  fullName,
  driverId,
  email,
  amount,
  setSuccess,
  rideTime,
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const {
    userAddress,
    userLatitude,
    userLongitude,
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const stripeAmount = parseInt(amount) * 100 + 6000;

  const fetchPaymentSheetParams = async () => {
    const { customer, ephemeralKey, paymentIntent } =
      await fetchAPI<PaymentSheetParams>("/(api)/(stripe)/paymentSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: stripeAmount,
        }),
      });

    return { paymentIntent, ephemeralKey, customer };
  };

  const initializePaymentSheet = async () => {
    const { customer, ephemeralKey, paymentIntent } =
      await fetchPaymentSheetParams();
    console.log({
      customer,
      ephemeralKey,
      paymentIntent,
    });
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Ryde Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,

      appearance: {
        colors: {
          background: "#F6F8FA",
          primaryText: "#000000",
          componentBackground: "#ffffff",
          componentText: "#000000",
          componentBorder: "#d3d3d3",
          placeholderText: "#333333",
          icon: "#000000",
          secondaryText: "#000000",
        },
      },
      defaultBillingDetails: {
        address: {
          country: "PE",
        },
      },
      returnURL: "my-app://book-ride",
    });

    if (error) {
      console.log("Initializing payment sheet failed", error);
    }
  };

  const openPaymentSheet = async () => {
    setLoading(true);
    const { error, paymentOption } = await presentPaymentSheet();
    if (error) {
      setLoading(false);
      console.log("Error on opening payment sheet", error);
    } else {
      console.log({
        paymentOption,
      });
      console.log("Payment sheet opened successfully");
      const { data } = await fetchAPI<any>("/(api)/ride/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          origin_address: userAddress,
          destination_address: destinationAddress,
          origin_latitude: userLatitude,
          origin_longitude: userLongitude,
          destination_latitude: destinationLatitude,
          destination_longitude: destinationLongitude,
          ride_time: rideTime.toFixed(0),
          fare_price: stripeAmount,
          payment_status: "paid",
          driver_id: driverId,
          user_id: userId,
        }),
      });
      setSuccess(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={() => openPaymentSheet()}
        loading={loading}
      />
    </>
  );
};

export default Payment;
