"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyle }) => {
  const dashboardUrl = "/dashboard";

  if (session) {
    return (
      <Link
        href={dashboardUrl}
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        Welcome back {session.user.name || "friend"}
        {session.user.name && session.user.name}
      </Link>
    );
  }
  return (
    <button
      className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      onClick={() => {
        signIn(undefined, { callbackUrl: dashboardUrl });
      }}
    >
      Get Started
    </button>
  );

  //1. Create a /login page

  //2. Create an email/password form

  //3. Make a POST request to /api/login
};

export default ButtonLogin;
