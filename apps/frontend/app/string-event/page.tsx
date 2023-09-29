'use client';

import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import QuestionCard from '@/components/question-card';
import NoQuestionCard from '@/components/no-question-card';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import style from '../../styles/style.module.css';
import { getStringEvent as fetchStringEvent } from '@/lib/oracle';
import { checkMetamaskLogin } from '@/lib/metamask';

export default function StringEventPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkMetamaskLogin();
      if (!isLoggedIn) {
        router.push('/login'); // redirect to login page
      } else {
        setWalletAddress(window.ethereum.selectedAddress || '');
      }
    };

    const fetchData = async () => {
      const metamaskAccount = window.ethereum.selectedAddress;
      try {
        const [questionIdsData, questionsData] = await fetchStringEvent(
          metamaskAccount || ''
        );
        setQuestionIds(questionIdsData.toString().split(','));
        setQuestions(questionsData);
      } catch (error) {
        console.error('發生錯誤：', error);
      }
    };

    const fetchAllData = async () => {
      await checkLogin();
      await fetchData();
      setIsLoading(false);
    };

    fetchAllData();
  }, [router]);

  if (isLoading) return <></>; // wait for Metamask login to complete

  return (
    <>
      <div className="flex-col md:flex h-screen">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4 mx-6">
              <UserNav walletAddress={walletAddress} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 px-28 my-6 h-[calc(100%-7rem)]">
          <h2 className="text-3xl font-semibold tracking-wide">
            String Question
          </h2>
          <div className={`pt-2 overflow-auto h-[90%] ${style.scroll}`}>
            {questionIds.length == 0 ? (
              <NoQuestionCard questionType="String" />
            ) : (
              questions.map((question, index) => (
                <QuestionCard
                  key={questionIds[index]}
                  question={question}
                  questionId={questionIds[index]}
                  state="Answering"
                  progress={50}
                  timeLeft={10}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
