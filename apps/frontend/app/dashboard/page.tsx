'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkMetamaskLogin } from '@/lib/metamask';

import { BrainCircuit, Rocket, DollarSign, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';

export default function DashboardPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Metamask login is in progress
    const checkLogin = async () => {
      const isLoggedIn = await checkMetamaskLogin();
      if (!isLoggedIn) {
        router.push('/login'); // redirect to login page
      } else {
        setWalletAddress(window.ethereum.selectedAddress || '');
      }
    };

    checkLogin();
    setIsLoading(false); // Metamask login is complete
  }, [router]);

  if (isLoading) return <></>; // wait for Metamask login to complete

  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav walletAddress={walletAddress} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-wide">Overview</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            {/* <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics" >
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger value="reports" disabled>
                                Reports
                            </TabsTrigger>
                            <TabsTrigger value="notifications" disabled>
                                Notifications
                            </TabsTrigger>
                        </TabsList> */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">
                      Answer Question
                    </CardTitle>
                    <BrainCircuit />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">10</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">
                      Reputation Points
                    </CardTitle>
                    <Rocket />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">100</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      40 <span className="text-xs">ETH</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">
                      Pledge
                    </CardTitle>
                    <Banknote />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      25 <span className="text-xs">ETH</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Answer Question</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2"></CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
