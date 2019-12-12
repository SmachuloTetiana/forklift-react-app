import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentUser } from 'store/actions';
import { authRef } from '../../firebase';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    authRef.onAuthStateChanged(user => {
        dispatch(setCurrentUser(user))
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};