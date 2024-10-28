// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useState } from 'react';
// import axios from 'axios';

// const PaymentForm = ({ totalAmount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsProcessing(true);

//     const { data } = await axios.post('/api/payment/create-payment-intent', {
//       totalAmount, // Pass total in cents
//       currency: 'usd',
//     });

//     const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: 'Customer Name',
//         },
//       },
//     });

//     if (error) {
//       console.error('Payment failed:', error);
//     } else {
//       console.log('Payment successful:', paymentIntent);
//       // Handle successful payment
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={isProcessing || !stripe || !elements}>
//         {isProcessing ? 'Processing...' : `Pay $${totalAmount / 100}`}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;


import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Send totalAmount to the backend to create a PaymentIntent
    const response = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalAmount * 100 }), // Stripe uses cents
    });
    
    const { clientSecret } = await response.json();

    // Confirm card payment using Stripe.js
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment Successful!</div>}
    </form>
  );
};

export default PaymentForm;

