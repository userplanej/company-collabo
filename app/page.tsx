import { LandingPage } from "@/components/landing";
import { DASHBOARD_URL } from "@/constants";
import { options } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Index() {
  const session = await getServerSession(options);

  // if (session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: DASHBOARD_URL,
  //     },
  //   };
  // }
  // Note session 에 대한 state 관리가 필요 => [fixed] custom signin page 에서 호출되는
  // AuthenticationLayout 이 client 모듈로 전환되는 지점인데 , 이때 지연 발생
  // ===>>> Suspense 로 묶어주어 Incremental Static Page (React Streaming) 로 전환
  //  아래 deprecated . 2023.07.16
  // getServerSession() 으로 fetch 하는 경우 , idle 발생
  // 따라서 client 에서 lookup 하도록 하고 Suspense 로 묶어야 하는데,
  // session 을 server 와 공유하기 위해서 , Context or 상태관리 필요한듯
  // 1. getServerSession <=== 왜 속도가 느린지...

  return (
    <>
      <LandingPage />
    </>
  );
}
