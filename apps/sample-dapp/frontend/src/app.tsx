import { useState, useEffect } from 'react';
import { useOracle } from './hooks/use-oracle';
import { useBlockchain } from './hooks/use-blockchain';

const AppPage = () => {
  const { askOracle, subscribeOracle } = useOracle();
  const { getData } = useBlockchain();
  const [question, setQuestion] = useState<string>('');
  const [callbackAddress, setCallbackAddress] = useState<string>('');

  const handleSubmit = async () => {
    try {
      await askOracle({
        dataType: 'String',
        question: question,
        callBackAddress: callbackAddress,
      });
      console.log('Ask oracle success!');
    } catch (error) {
      console.error('oracle error:', error);
    }
  };

  useEffect(() => {
    subscribeOracle();
    const fetchData = async () => {
      const res = await getData();
      console.log(res);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 h-screen w-screen items-center justify-center flex">
      <div className="gap-6 flex flex-col w-1/2">
        <h1 className="text-3xl font-semibold text-slate-900">Sample DApp</h1>
        <div>
          <input
            className="h-12 w-full rounded-lg border-slate-300 border px-4"
            placeholder="請輸入問題"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            className="h-12 w-full rounded-lg border-slate-300 border px-4"
            placeholder="請輸入回調地址"
            value={callbackAddress}
            onChange={(e) => setCallbackAddress(e.target.value)}
          />
        </div>
        <div>
          <button
            className="border-slate-300 border rounded-lg px-3 py-2"
            onClick={handleSubmit}
          >
            送出
          </button>
        </div>
        <div>
          <p>Oracle 回應：</p>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
