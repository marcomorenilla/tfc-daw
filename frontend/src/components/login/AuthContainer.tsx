import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface RegisterProps {
  readonly apiUrl: string;
}

export default function AuthContainer() {
  const [isLogginView, setIsLoginView] = useState(true);

  const handleSwitch = () => setIsLoginView(!isLogginView);

  return (
    <>
      {isLogginView ? (
        <LoginForm onSwitch={handleSwitch} />
      ) : (
        <RegisterForm onSwitch={handleSwitch} />
      )}
    </>
  );
}
