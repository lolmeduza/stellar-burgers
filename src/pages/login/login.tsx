import { SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { TUserLoginBody } from '@utils-types';

type LoginProps = {
  onLogin: (dataUser: TUserLoginBody) => void;
};

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    console.log('Submit login');
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    //
    // setEmail(email);
    // setPassword(password);
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
