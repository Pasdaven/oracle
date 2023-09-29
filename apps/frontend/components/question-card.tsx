import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRightCircle, CheckCircle2, Rocket, Timer } from 'lucide-react';

import CountdownTimer from '@/components/countdown-timer';

interface QuestionCardProps {
  question: string;
  questionId: string;
  state: string;
  progress: number;
  timeLeft: number;
}

const QuestionCard = ({
  question,
  questionId,
  state,
  progress,
  timeLeft,
}: QuestionCardProps) => {
  return (
    <div className="grid grid-cols-7 w-full h-fit rounded-xl border border-gray-200 px-8 py-4 mt-2">
      <div className="col-span-3 flex items-center">
        <div className="ml-4">
          <p className="text-lg font-medium py-1">{question}</p>
          <div className="flex items-center h-full">
            <p className="text-sm">Event ID: {questionId}, State:</p>
            {state === 'Answering' ? (
              <Rocket size={16} className="mx-1" />
            ) : null}
            {state === 'Voting' ? (
              <CheckCircle2 size={16} className="mx-1" />
            ) : null}
            <p className="text-sm">{state}</p>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex items-center justify-center">
        <span className="text-sm mr-2">Start</span>
        <Timer size={20} className="mr-2" />
        <div className="w-full relative">
          <Progress value={progress} />
          <div className="flex justify-center w-full text-xs font-normal text-muted-foreground absolute py-1">
            <span>time left:</span>
            <div className="ml-1">
              <CountdownTimer second={100} />
            </div>
          </div>
        </div>
        <span className="text-sm ml-2">End</span>
      </div>
      <div className="col-span-1 flex items-center justify-end">
        <Link href={`/event/${questionId}`}>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <ArrowRightCircle size={32} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionCard;
