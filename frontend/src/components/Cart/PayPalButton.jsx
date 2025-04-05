import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        // Add style options here instead of inline
        "data-namespace": "paypal_sdk",
        "data-uid": "paypal-button-container",
        "data-page-type": "checkout",
        components: "buttons",
        style: {
          layout: "vertical",
          color: "gold",
        },
      }}
    >
      <PayPalButtons
        // Move style configuration to createOrder or use the provider options
        style={{
          layout: "vertical",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: parseFloat(amount).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
