import styles from './AuthDetails.module.css';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';

export function AuthDetails() {
  const auth = getAuth();
  interface userData {
    email: string | null;
  }
  const initialState: userData = {
    email: null,
  };

  // const [authUser, setAuthUser] = useState<{email:null,password:null} | null>(null)
  const [authUser, setAuthUser] = useState(initialState);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(initialState);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successful');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {authUser.email ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}

export default AuthDetails;
