import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TUserLoginBody, TUserRegisterBody } from '@utils-types';

type RegisterProps = {
  onRegister: (dataUser: TUserRegisterBody) => void;
};

export const Register = ({ onRegister }: RegisterProps) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password || !userName) {
      return;
    }
    console.log(email, userName, password);
    onRegister({ email: email, name: userName, password: password });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
