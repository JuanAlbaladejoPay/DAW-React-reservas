import { AiOutlinePhone, AiOutlineMail, AiOutlineHome, AiOutlineClockCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Footer.css';
import facebook from '/src/assets/icons/facebook.svg';
import instagram from '/src/assets/icons/instagram.svg';
import twitter from '/src/assets/icons/twitter.svg';
import tiktok from '/src/assets/icons/tiktok.svg';
import logoEmpresa from '/src/assets/images/logo-white-transp.png';

export default function Footer() {
  return (
    <footer className="p-5 bg-gray-200 text-white flex flex-col items-start md:flex-row md:justify-between md:items-start">
      <div id="social-ftr" className="flex flex-col items-center md:items-center mb-4 md:mb-0">
        <img src={logoEmpresa} alt="LetsMove" className="w-25 h-16" />
        <div className="social-networks flex flex-row mt-4">
          <img src={facebook} alt="Facebook" className="w-4 h-4 mr-2" />
          <img src={instagram} alt="Instagram" className="w-4 h-4 mr-2" />
          <img src={twitter} alt="twitter" className="w-4 h-4 mr-2" />
          <img src={tiktok} alt="tiktok" className="w-4 h-4" />
        </div>
      </div>
      {/* Añadir enlaces politica de cookies, privacidad, aviso legal. */}
      <div className="legal-links flex flex-col text-black mb-4 md:mb-0">
        <Link to="/politicaCookies">Política de cookies</Link>
        <Link to="/politicaPrivacidad" className="mt-2">
          Política de privacidad
        </Link>
        <Link to="/avisoLegal" className="mt-2">
          Aviso legal
        </Link>
      </div>
      <div className="text-black mb-4 md:mb-0">
        <h2 className="font-bold text-lg mb-2">Horario:</h2>
        <p className="mb-1">
          <AiOutlineClockCircle className="inline-block mr-1" />
          <span className="font-bold">Lunes - Domingo:</span> 9:00 - 23:00
        </p>
      </div>
      {/* CONTACTO */}
      <div className="contacto flex flex-col text-black mb-4 md:mb-0">
        <h2 className="font-bold text-lg mb-2">Contacto:</h2>
        <p className="mb-2">
          <AiOutlinePhone className="inline-block mr-1" />
          <span className="font-bold">Teléfono:</span> 968 111 111 - 662 662 662
        </p>
        <p className="mb-2">
          <AiOutlineMail className="inline-block mr-1" />
          <span className="font-bold">Email:</span> letsmove.murcia@gmail.com
        </p>
        <p className="mb-2">
          <AiOutlineHome className="inline-block mr-1" />
          <span className="font-bold">Dirección:</span> C. Maestro Pedro Perez Abadia, 2A, 30100 Espinardo, Murcia
        </p>
      </div>
    </footer>
  );
}
