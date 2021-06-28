import React, { useEffect } from 'react';
import Routes from './Routes';
import useAuth from './useAuth';
import useToken from './useToken';

const ManageAccess = (code) => {
  const accessToken = useAuth(code);
  console.log(accessToken);
  const [localToken, setLocalToken] = useToken('localToken', accessToken);

  //   useEffect(() => {
  //     console.log(accessToken);
  //     setLocalToken((localToken) => accessToken);
  //   }, [localToken]);

  return null;
};

export default ManageAccess;
