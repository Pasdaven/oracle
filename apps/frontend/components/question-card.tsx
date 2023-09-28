import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"
import { ArrowRightCircle, Timer } from 'lucide-react';

interface QuestionCardProps {
    question: string;
    questionId: string;
    progress: number;
}

const QuestionCard = ({ question, questionId, progress }: QuestionCardProps) => {
    return (
        <div className="grid grid-cols-7 w-full h-fit rounded-xl border border-gray-200 px-8 py-4 mt-2">
            <div className="col-span-3 flex items-center">
                <div className="ml-4">
                    <p className="text-lg font-medium py-1">{question}</p>
                    <p className='text-sm'>Event ID: {questionId}</p>
                </div>
            </div>
            <div className="col-span-3 flex items-center justify-center">
                <span className='text-sm mr-2'>Start</span>
                <Timer size={20} className='mr-2'/>
                <Progress value={progress} className='w-4/5'/>
                <span className='text-sm ml-2'>End</span>
            </div>
            <div className="col-span-1 flex items-center justify-end">
                <Link href={`/event/${questionId}`}>
                    <Button variant="ghost" size="icon" className='h-12 w-12'>
                        <ArrowRightCircle size={32} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default QuestionCard;