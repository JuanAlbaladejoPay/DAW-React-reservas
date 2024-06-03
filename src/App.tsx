import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/authProvider.tsx';
import RequireAuth from './components/auth/RequireAuth.tsx';
import RequireAdmin from './components/auth/RequireAdmin.tsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// --> Páginas
import Home from './pages/Home.tsx';
import Instalaciones from './pages/Instalaciones.tsx';
import Reservas from './pages/Reservas.tsx';
import Servicios from './pages/Servicios.tsx';
import Restaurante from './pages/Restaurante.tsx';
import Contacto from './pages/Contacto.tsx';
import PoliticaCookies from './pages/PoliticaCookies.tsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad.tsx';
// --> Componentes
import AuthPage from './pages/AuthPage.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import AvisoLegal from './pages/AvisoLegal.tsx';
import UserInfo from './pages/UserInfo.tsx';
import UserEdit from './pages/UserEdit.tsx';
import AdminPage from './pages/AdminPage.tsx';
// --> Stripe
import CheckoutPage from './pages/CheckoutPage.tsx';

// Clave pública de Stripe
const stripePromise = loadStripe(
  'pk_test_51PMOwPGyhw2g7FFtODhJ9gTmtImLU0zAJU0vXftXY5mQPTCNTeNAHyKLLxKdNsJKpo0If1B5Rm50pPptHk1AeIka00Mf3cAZb5',
);

const CheckoutPageWrapper = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  console.log('CheckoutPageWrapper received amount:', amount);

  return <CheckoutPage amount={amount} />;
};

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />

          <main className="p-4 flex-grow">
            <Elements stripe={stripePromise}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/instalaciones" element={<Instalaciones />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route
                  path="/reservas"
                  element={
                    <RequireAuth>
                      <Reservas />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/user-info"
                  element={
                    <RequireAuth>
                      <UserInfo />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/user-edit"
                  element={
                    <RequireAuth>
                      <UserEdit />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/adminPage"
                  element={
                    <RequireAdmin>
                      <AdminPage />
                    </RequireAdmin>
                  }
                />
                <Route path="/restaurante" element={<Restaurante />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/politicaCookies" element={<PoliticaCookies />} />
                <Route path="/politicaPrivacidad" element={<PoliticaPrivacidad />} />
                <Route path="/avisoLegal" element={<AvisoLegal />} />
                <Route path="/auth-page" element={<AuthPage />} />
                <Route path="/checkout" element={<CheckoutPageWrapper />} />{' '}
                {/* Nueva ruta para el formulario de pago */}
              </Routes>
            </Elements>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
