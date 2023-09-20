import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface OracleDataCardProps {
  name: string;
  answer: string;
  time: string;
}

const OracleDataCard = ({ name, answer, time }: OracleDataCardProps) => {
  return (
    <div className="grid grid-cols-7 w-full h-20 rounded-xl border border-gray-200 px-4 mt-2">
      <div className="col-span-2 flex items-center">
        <span className="h-3 w-3 rounded-full bg-green-500"></span>
        <div className="ml-4">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-xs text-gray-700">Responsed</p>
        </div>
      </div>
      <div className="col-span-2 flex items-center">{answer}</div>
      <div className="col-span-2 flex items-center">{time}</div>
      <div className="col-span-1 flex items-center justify-end">
        <Button variant="ghost" size="icon" className="hover:text-green-500">
          <CheckCircle2 />
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-red-500">
          <XCircle />
        </Button>
      </div>
    </div>
  );
};

export default OracleDataCard;
