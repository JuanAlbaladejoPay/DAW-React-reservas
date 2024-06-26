export interface ReservationsErrorsProps {
  error: string;
}

export default function ReservationsErrors({ error }: ReservationsErrorsProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="m-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg w-auto" role="alert">
        <strong className="font-bold block mb-2">Error!</strong>
        <span className="block sm:inline">{error}</span>
      </div>
    </div>
  );
}
