import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/auth/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";
import githubLogo from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/use-sign-in-with-oauth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //mutate 는 mutationFn 실행시키는 함수
  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      // callback 함수 활용 장점
      // ui (컴포넌트) 수준에서 처리되어야 하는 로직 쉽게 구현 가능 및 역할/책임 분리
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });

        setPassword("");
      },
    });
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
  };

  const handleSignInWithOAuthClick = () => {
    signInWithOAuth("github");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
        />
        <Input
          disabled={isPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          disabled={isPending}
          onClick={handleSignInWithPasswordClick}
          className="w-full"
        >
          로그인
        </Button>
        <Button
          disabled={isPending}
          onClick={handleSignInWithOAuthClick}
          className="w-full"
          variant={"outline"}
        >
          <img src={githubLogo} className="h-4 w-4" />
          Github 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={"/sign-up"} className="text-muted-foreground hover:underline">
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          to={"/forget-password"}
          className="text-muted-foreground hover:underline"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
