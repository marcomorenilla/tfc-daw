import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

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
