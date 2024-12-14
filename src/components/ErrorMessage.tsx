import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="bg-red-50 text-red-800 px-6 py-4 rounded-lg flex items-center gap-3">
        <AlertCircle className="text-red-600" size={24} />
        <p>{message}</p>
      </div>
    </div>
  );
}