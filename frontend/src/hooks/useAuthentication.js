import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { auth } from 'API/services';
import {
  IDENTIFIER,
  PASSWORD,
} from 'constants/fields';
import { JWT } from 'constants/env';
import { routes } from 'constants/routes';

const useHooks = () => {
  const history = useHistory();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async (evt) => {
    evt.preventDefault();
    if (userName === '' || password === '') {
      return;
    }

    try {
      const { jwt } = await auth({
        [IDENTIFIER]: userName,
        [PASSWORD]: password,
      });

      if (jwt) {
        window.localStorage.setItem(JWT, jwt);

        // redirect
        history.push(routes.home);
      }
    } catch (error) {
      alert('Wrong username/password!');
    }
  }, [history, password, userName]);

  return {
    state: {
      userName,
      password,
    },
    handler: {
      setUsername,
      setPassword,
      handleLogin,
    }
  }
};

export default useHooks;