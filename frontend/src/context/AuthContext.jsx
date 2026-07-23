import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginAsGuest() {
    const guestUser = { isGuest: true, displayName: "Guest", email: "guest@insightai.com", photoURL: null };
    localStorage.setItem('isGuest', 'true');
    setCurrentUser(guestUser);
  }

  function logout() {
    localStorage.removeItem('isGuest');
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        const isGuest = localStorage.getItem('isGuest');
        if (isGuest === 'true') {
          setCurrentUser({ isGuest: true, displayName: "Guest", email: "guest@insightai.com", photoURL: null });
        } else {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    loginAsGuest,
    logout,
    signup,
    login
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
