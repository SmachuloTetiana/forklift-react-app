import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { myFirebase } from '../../firebase';
import { setCurrentUser } from '../../actions';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    myFirebase.auth().onAuthStateChanged(user => {
        dispatch(setCurrentUser(user))
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};
