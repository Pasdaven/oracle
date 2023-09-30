import { Frown } from 'lucide-react';

interface NoQuestionCardProps {
  questionType: string;
}

const NoQuestionCard = ({ questionType }: NoQuestionCardProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="rounded-xl border border-gray-200 w-[50%] h-fit p-10">
        <div className="flex justify-center w-full p-4">
          <Frown size={64} />
        </div>
        <div className="flex justify-center w-full p-4">
          <p className="text-3xl font-semibold tracking-wider">
            No {questionType} Question Now
          </p>
        </div>
        <div className="flex justify-center w-full">
          <p className="text-sm text-muted-foreground">
            pleas wait a moment for next question
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoQuestionCard;
