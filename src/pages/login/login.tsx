import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { getUserThunk, loginUserThunk } from '../../services/slices/stellarBurgerSlice';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({email, password}))
      .unwrap()
      .then(payload => {
          localStorage.setItem('refreshToken', payload.refreshToken);
          setCookie('accessToken', payload.accessToken);
          dispatch(getUserThunk());
      });
  }

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
