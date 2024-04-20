import "./Footer.css"

export default function Footer() {
  return (
    <footer className="flex flex-row items-start p-5 bg-gray-200">
      <div id="social-ftr" className="flex flex-col items-center justify-center w-1/4 p-6">
        <img src="./src/assets/images/logo-white-transp.png" alt="LetsMove" width={100} height={100} className="w-auto h-auto" />
        <div className="social-networks flex flex-row items-center justify-center">
          <img src="./src/assets/icons/facebook.svg" alt="Facebook" />
          <img src="./src/assets/icons/instagram.svg" alt="Instagram" />
          <img src="./src/assets/icons/twitter.svg" alt="twitter" />
          <img src="./src/assets/icons/tiktok.svg" alt="tiktok" />
        </div>
      </div>
      <div id="politica-ftr" className="flex flex-col justify-center w-1/4 p-6">
        <a href="#">Política de cookies</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Aviso legal</a>
      </div>
      <div id="horarios-ftr" className="flex flex-col  justify-center w-1/4 p-6">
        <p>Lunes - Domingo</p>
        <p>8:00 - 23:00</p>
      </div>
      <div id="contacto-ftr" className="flex flex-col  justify-center w-1/4 p-6">
        <p>C. Maestro Pedro Perez Abadia, 2A, 30100 Espinardo, Murcia</p>
        <p>+34 662 662 662</p>
      </div>
    </footer>
  );
}
