import { Button } from '@/components/ui/button';
import OracleDataCard from './oracle-data-card';
import { Input } from '@/components/ui/input';
import { oracleData } from './oracle-data';

const isVoting = false;

const EventPage = ({ params }: { params: { id: number } }) => {
  return isVoting ? (
    <div className="container">
      <h1 className="font-bold text-2xl mt-12">
        What is the price of BTC now?
      </h1>
      <p>Event ID: {params.id}, Question Type: string</p>
      <div className="flex flex-col mt-8">
        <h2 className="font-bold text-xl">Oracle Data</h2>
        {oracleData.map((data) => (
          <OracleDataCard key={data.id} {...data} />
        ))}
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[600px] border border-gray-200 rounded-xl p-12">
        <h1 className="font-bold text-xl">What is the price of BTC now?</h1>
        <p>Event ID: {params.id}, Question Type: string</p>
        <div className="flex w-full items-center space-x-2 mt-4">
          <Input placeholder="Enter your answer" />
          <Button type="submit">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
