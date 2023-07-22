import { getServerSession } from "next-auth/next";
import { options } from "app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

import { AuthenticationLayout } from "@/layouts/Authentication";
import { Suspense } from "react";

export default async function SignIn() {
  console.log("SignIn window openning");
  const session = await getServerSession(options);
  // redirect to home if user is already logged in
  // if (session?.user) {
  //   redirect("/");
  // }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthenticationLayout />
    </Suspense>
  );
}
