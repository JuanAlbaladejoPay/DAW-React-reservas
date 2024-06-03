import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReservaModal } from '../types/types';
import { useAuthProvider } from '../context/useAuthProvider';

export interface ReservaModalProps {
  reservationData: ReservaModal;
  handleCloseModal: () => void;
  handleRefetch: () => void;
  handleShowEditReservation?: () => void;
}

export const ReservationModal = ({
  reservationData,
  handleCloseModal,
  handleRefetch,
  handleShowEditReservation,
}: ReservaModalProps) => {
  const { precioHora, fechaYHora, nombreInstalacion, duraciones, idInstalacion, isEdit, reservationId } =
    reservationData;
  const [currentDuration, setCurrentDuration] = useState(duraciones[0]);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const { user } = useAuthProvider();
  const navigate = useNavigate();

  const importe = useMemo(() => {
    const calculatedImporte = ((currentDuration / 60) * precioHora).toFixed(2);
    console.log('Calculated importe:', calculatedImporte);
    return calculatedImporte;
  }, [currentDuration]);

  const [date, timeWithZone] = fechaYHora.split('T');
  const [time, _] = timeWithZone.split('+');

  const fechaYHoraCorrecta = new Date(`${date}T${time}`).toISOString(); // Ajusta a la zona horaria de España (CEST)

  useEffect(() => {
    if (responseMessage && responseMessage.includes('correctamente')) {
      const timer = setTimeout(() => {
        handleCloseModal();
        handleShowEditReservation && handleShowEditReservation();
        handleRefetch();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage, handleCloseModal]);

  const handleAddReservation = async () => {
    const reservationDetails = {
      fecha: date,
      hora: time,
      duracion: currentDuration,
      importe,
      idInstalacion: idInstalacion,
      fechaYHora: fechaYHoraCorrecta, // Enviamos la fecha y hora en ISO string con la zona horaria correcta
    };

    debugger;
    const endpoint =
      isEdit && reservationId !== null
        ? `http://127.0.0.1:8000/api/reservas/edit/${reservationId}`
        : 'http://127.0.0.1:8000/api/reservas/new';
    const method = isEdit && reservationId !== null ? 'POST' : 'POST';

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(reservationDetails),
    });
    const data = await response.json();
    if (data.ok) {
      setResponseMessage(data.ok);
      navigate('/checkout', { state: { amount: parseFloat(importe) * 100 } });
    } else if (data.error) {
      setResponseMessage(data.error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-lg w-full max-w-sm m-auto relative">
        <button
          onClick={handleCloseModal}
          className="absolute right-2 top-2 text-lg font-bold bg-red-500 hover:bg-red-700 text-white rounded-full h-10 w-10 flex items-center justify-center"
        >
          &times;
        </button>

        <h2 className="text-center">Reserva</h2>
        <p>
          <span className="font-bold">Instalación:</span> {nombreInstalacion}
        </p>
        <p>
          <span className="font-bold">Fecha:</span> {date}
        </p>
        <p>
          <span className="font-bold">Hora: </span>
          {time}
        </p>
        <div className="mb-3">
          <label className="font-bold">Duración: </label>
          <select value={currentDuration} onChange={(e) => setCurrentDuration(parseInt(e.target.value))}>
            {duraciones.map((duracion, indx) => (
              <option key={indx} value={duracion}>
                {duracion} minutos
              </option>
            ))}
          </select>
        </div>
        <p>
          <span className="font-bold">Importe:</span> {importe}€
        </p>
        <button
          onClick={handleAddReservation}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Añadir Reserva
        </button>
        {responseMessage && (
          <p
            className={`mt-4 text-center font-bold ${
              responseMessage.includes('correctamente') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};
