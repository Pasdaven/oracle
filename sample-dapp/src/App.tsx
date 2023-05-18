import Web3 from "web3";
import { AbiItem } from "web3-utils";
import LatestAddress from "../../artifacts/contracts/LatestAddress.sol/LatestAddress.json";
import { useState } from "react";

const web3 = new Web3("http://localhost:8545");

const LatestAddressABI = LatestAddress.abi;
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const latestAddress = new web3.eth.Contract(
  LatestAddressABI as AbiItem[],
  contractAddress
);

const App = () => {
  const [questionType, setQuestionType] = useState<string>("numeric");
  const [oracleAddress, setOracleAddress] = useState<string>("");

  const handleQuestionType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionType(e.target.value);
  };

  const getLatestAddress = async () => {
    const address = await latestAddress.methods.getLatestAddress().call();
    return address;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOracleAddress(await getLatestAddress());
  };

  getLatestAddress();
  return (
    <div className="bg-slate-50 h-screen w-screen items-center justify-center flex">
      <div className="gap-6 flex flex-col w-1/2">
        <h1 className="text-3xl font-semibold text-slate-900">Sample DApp</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              required
              type="radio"
              value={"numeric"}
              id="numeric"
              name="questionType"
              checked={questionType === "numeric"}
              onChange={handleQuestionType}
              className="hidden"
            />
            <label
              htmlFor="numeric"
              className={`border-slate-300 border rounded-lg px-3 py-2 cursor-pointer ${
                questionType === "numeric" && "bg-slate-200"
              }`}
            >
              數字類型
            </label>
            <input
              required
              type="radio"
              value={"string"}
              id="string"
              name="questionType"
              checked={questionType === "string"}
              onChange={handleQuestionType}
              className="hidden"
            />
            <label
              htmlFor="string"
              className={`border-slate-300 border rounded-lg px-3 py-2 cursor-pointer ${
                questionType === "string" && "bg-slate-200"
              }`}
            >
              文字類型
            </label>
          </div>
          <div>
            <input
              required
              type="text"
              className="h-12 w-full rounded-lg border-slate-300 border px-4"
            />
          </div>
          <div>
            <button
              type="submit"
              className="border-slate-300 border rounded-lg px-3 py-2"
            >
              送出
            </button>
          </div>
        </form>
        <div>
          <h1>回應：</h1>
          <p>Oracle 合約地址：{oracleAddress}</p>
          <p>Oracle 回應：</p>
        </div>
      </div>
    </div>
  );
};

export default App;
