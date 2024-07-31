import { SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { TUserLoginBody } from '@utils-types';
import { on } from 'process';

type LoginProps = {
  onLogin: (dataUser: TUserLoginBody) => void;
};

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin({ email: email, password: password });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
