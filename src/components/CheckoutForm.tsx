import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

interface CheckoutFormProps {
  clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(result.error.message || 'Ocurrió un error');
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        setPaymentSuccess(true);
        // Redirigir a la página de reservas después de un breve retraso
        setTimeout(() => {
          navigate('/reservas');
        }, 2000); // Espera 2 segundos antes de redirigir
      }
    }
  };

  const cardElementOptions = {
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-gray-700 text-sm font-bold mb-2">
          Tarjeta de Crédito/Débito
        </label>
        <CardElement id="card-element" className="p-2 border border-gray-300 rounded-md" options={cardElementOptions} />
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {paymentSuccess && <div className="text-green-500 text-sm mt-2">¡Pago exitoso!</div>}
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Pagar
      </button>
    </form>
  );
};

export default CheckoutForm;
