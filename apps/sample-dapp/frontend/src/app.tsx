import { useState, useEffect } from 'react';
import { useOracle } from './hooks/use-oracle';
import { Input } from './components/ui/input';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Loader2, Send, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from './components/ui/separator';

import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

const AppPage = () => {
  const { askOracle, getStringResponse, getNumericResponse } = useOracle();
  const [stringQuestion, setStringQuestion] = useState<string>('');
  const [numericQuestion, setNumericQuestion] = useState<string>('');
  const [stringResponse, setStringResponse] = useState<string | null>(null);
  const [numericResponse, setNumericResponse] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitStringQuestion = async () => {
    setLoading(true);
    if (!stringQuestion) {
      toast.error('請輸入問題');
      setLoading(false);
      return;
    }
    try {
      await askOracle({
        dataType: 'String',
        question: stringQuestion,
      });
      toast.success('已將問題提交給 Oracle');
      setStringQuestion('');
    } catch (error) {
      console.error('oracle error:', error);
      toast.error('Oracle 發生錯誤');
    }
    setLoading(false);
  };

  const submitNumericQuestion = async () => {
    setLoading(true);
    if (!numericQuestion) {
      toast.error('請輸入問題');
      setLoading(false);
      return;
    }
    try {
      await askOracle({
        dataType: 'Numeric',
        question: numericQuestion,
      });
      toast.success('已將問題提交給 Oracle');
      setNumericQuestion('');
    } catch (error) {
      console.error('oracle error:', error);
      toast.error('Oracle 發生錯誤');
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchOracleResponse = async () => {
      const stringResponse = await getStringResponse();
      const numericResponse = await getNumericResponse();
      setStringResponse(stringResponse);
      setNumericResponse(numericResponse);
    };
    fetchOracleResponse();
  }, []);

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mt-12">Sample DApp</h1>
      <Tabs defaultValue="string" className="mt-6">
        <TabsList>
          <TabsTrigger value="string">字串問題</TabsTrigger>
          <TabsTrigger value="numeric">數字問題</TabsTrigger>
        </TabsList>
        <TabsContent value="string">
          <h2 className="mt-4 text-lg">請輸入字串問題</h2>
          <div className="flex mt-2 space-x-2">
            <Input
              placeholder="請輸入問題"
              value={stringQuestion}
              onChange={(e) => setStringQuestion(e.target.value)}
            />
            <Button
              className="flex-shrink-0"
              onClick={submitStringQuestion}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {loading ? '送出中' : '送出'}
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="numeric">
          <h2 className="mt-4 text-lg">請輸入數字問題</h2>
          <div className="flex mt-2 space-x-2">
            <Input
              placeholder="請輸入問題"
              value={numericQuestion}
              onChange={(e) => setNumericQuestion(e.target.value)}
            />
            <Button
              className="flex-shrink-0"
              onClick={submitNumericQuestion}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {loading ? '送出中' : '送出'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      <Separator className="my-8" />
      <div className="flex space-x-3">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Oracle 字串回應</AlertTitle>
          <AlertDescription>
            {stringResponse ?? '等待 Oracle 回應中'}
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Oracle 數字回應</AlertTitle>
          <AlertDescription>
            {numericResponse ?? '等待 Oracle 回應中'}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default AppPage;
