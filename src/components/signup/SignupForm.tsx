import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import handleSignup from "@/api/handleSignup";
import { SignupErrorType } from "@/types/SignupPage";
import { AxiosError } from "axios";
import Button from "../common/Button";
import SignupInput from "./SignupInput";
import router from "next/router";
import useValidation from "@/hooks/useValidation";

const SignupForm = () => {
  const { emailRegex, PASSWORD_MIN_LENGTH } = useValidation();

  const [signupErrorMessage, setSignupErrorMessage] = useState<SignupErrorType>(
    {
      emailErrorMessage: null,
      nicknameErrorMessage: null,
      passwordErrorMessage: null,
      passwordConfirmErrorMessage: null,
      unexpectedErrorMessage: null,
    },
  );

  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const { mutate } = useMutation({
    mutationFn: handleSignup,
    onSuccess: () => {
      setSignupErrorMessage({
        emailErrorMessage: null,
        nicknameErrorMessage: null,
        passwordErrorMessage: null,
        passwordConfirmErrorMessage: null,
        unexpectedErrorMessage: null,
      });
      alert("회원가입이 완료 되었습니다");
      router.push("/signin");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const { email, nickname, password } = inputs;

        if (error.response.status === 409) {
          setSignupErrorMessage({
            emailErrorMessage: "중복된 이메일입니다.",
            nicknameErrorMessage: null,
            passwordErrorMessage: null,
            passwordConfirmErrorMessage: null,
            unexpectedErrorMessage: null,
          });
        } else if (error.request.status === 400) {
          // 이메일 확인
          if (email.length === 0) {
            setSignupErrorMessage((prev) => ({
              ...prev,
              emailErrorMessage: "이메일을 입력해주세요.",
            }));
          } else if (!emailRegex.test(email)) {
            setSignupErrorMessage((prev) => ({
              ...prev,
              emailErrorMessage: "이메일 형식으로 작성해주세요.",
            }));
          } else {
            setSignupErrorMessage((prev) => ({
              ...prev,
              emailErrorMessage: null,
            }));
          }

          // 닉네임 확인
          if (nickname.length === 0) {
            setSignupErrorMessage((prev) => ({
              ...prev,
              nicknameErrorMessage: "닉네임을 입력해주세요.",
            }));
          } else if (nickname.length > 10) {
            setSignupErrorMessage((prev) => ({
              ...prev,
              nicknameErrorMessage: "닉네임은 10자 이하로 작성해주세요.",
            }));
          } else {
            setSignupErrorMessage((prev) => ({
              ...prev,
              nicknameErrorMessage: null,
            }));
          }

          // 비밀번호 확인
          if (password.length === 0) {
            setSignupErrorMessage((prev) => ({
              ...prev,
              passwordErrorMessage: "비밀번호를 입력해주세요.",
            }));
          } else if (
            password.length > 0 &&
            password.length < PASSWORD_MIN_LENGTH
          ) {
            setSignupErrorMessage((prev) => ({
              ...prev,
              passwordErrorMessage: "8자 이상 작성해 주세요.",
            }));
          } else {
            setSignupErrorMessage((prev) => ({
              ...prev,
              passwordErrorMessage: null,
            }));
          }
        }
      }
    },
  });

  const { email, nickname, password, passwordConfirm } = inputs;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      if (password.length > 0 && password.length < PASSWORD_MIN_LENGTH) {
        setSignupErrorMessage((prev) => ({
          ...prev,
          passwordErrorMessage: "8자 이상 작성해 주세요.",
        }));
      }
      if (passwordConfirm.length === 0) {
        setSignupErrorMessage((prev) => ({
          ...prev,
          passwordConfirmErrorMessage: "비밀번호 확인값을 입력해주세요.",
        }));
      } else {
        setSignupErrorMessage((prev) => ({
          ...prev,
          passwordConfirmErrorMessage: "비밀번호가 일치하지 않습니다.",
        }));
      }

      return;
    }

    // 비밀번호가 일치하면 에러 메시지 초기화
    setSignupErrorMessage((prev) => ({
      ...prev,
      passwordConfirmErrorMessage: null,
    }));

    mutate({ email, nickname, password });
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="mx-auto flex w-[40rem] flex-col gap-7"
        noValidate
      >
        <SignupInput
          inputName="email"
          onChangeInput={onChangeInput}
          value={email}
          labelName="이메일"
          inputType="email"
          signupErrorMessage={signupErrorMessage}
          setSignupErrorMessage={setSignupErrorMessage}
        />
        <SignupInput
          inputName="nickname"
          onChangeInput={onChangeInput}
          value={nickname}
          labelName="닉네임"
          inputType="text"
          signupErrorMessage={signupErrorMessage}
          setSignupErrorMessage={setSignupErrorMessage}
        />
        <SignupInput
          inputName="password"
          onChangeInput={onChangeInput}
          value={password}
          labelName="비밀번호"
          inputType="password"
          signupErrorMessage={signupErrorMessage}
          setSignupErrorMessage={setSignupErrorMessage}
        />
        <SignupInput
          inputName="passwordConfirm"
          onChangeInput={onChangeInput}
          value={passwordConfirm}
          labelName="비밀번호 확인"
          inputType="password"
          signupErrorMessage={signupErrorMessage}
          setSignupErrorMessage={setSignupErrorMessage}
        />
        <Button>회원가입</Button>
      </form>
    </div>
  );
};

export default SignupForm;
