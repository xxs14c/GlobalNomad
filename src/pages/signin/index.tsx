import React from "react";
import Link from "next/link";
import LoginForm from "@/components/signin/LoginForm";
import LinkToSignup from "@/components/signin/LinkToSignup";

const LoginPage = () => (
  <div>
    <Link href="/" legacyBehavior>
      <a>
        <img
          src="/image/logo.svg"
          alt="logo"
          className="mb-[40px] ml-auto mr-auto mt-[104px]"
        />
      </a>
    </Link>
    <LoginForm />
    <LinkToSignup />
  </div>
);

LoginPage.showHeaderFooter = false;

export default LoginPage;
