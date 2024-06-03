import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useAuthProvider } from '../context/useAuthProvider';

const stripePromise = loadStripe(
  'pk_test_51PMOwPGyhw2g7FFtODhJ9gTmtImLU0zAJU0vXftXY5mQPTCNTeNAHyKLLxKdNsJKpo0If1B5Rm50pPptHk1AeIka00Mf3cAZb5',
);

interface CheckoutPageProps {
  amount: number;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ amount }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { user } = useAuthProvider();

  useEffect(() => {
    const fetchClientSecret = async () => {
      console.log('Fetching client secret with amount:', amount);
      try {
        const response = await fetch('http://localhost:8000/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ amount }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Received client secret:', data.clientSecret);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    fetchClientSecret();
  }, [user, amount]);

  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default CheckoutPage;
