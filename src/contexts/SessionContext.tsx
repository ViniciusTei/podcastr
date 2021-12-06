import { createContext, ReactNode, useContext, useState } from 'react';
import { useCookies } from "react-cookie";
import LoginService from '../services/Login';

type User = {
  id: string;
  name: string;
  email: string;
}

type Session = {
  token: string;
  user: User;
}

interface ISessionContext {
  session: Session;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const SessionContext = createContext({} as ISessionContext)

export default function SessionProvider({children}: { children: ReactNode }) {
  const [cookie, setCookie] = useCookies(["session"]);
  const [session, setSession] = useState<Session>(cookie.session ? cookie.session : null);
  const loginService = new LoginService()

  async function login(email: string, password: string) {
    const login = await loginService.login({ email, password });

    if (login) {
      setCookie("session", JSON.stringify({token: login.token, user: login.user}), {
        path: "/",
        maxAge: 3600 * 24, // Expires after 24hr
        sameSite: true,
      });
      setSession({token: login.token, user: login.user});
    }
  }

  async function logout() {
    setSession(null);
    setCookie('session', null)
  }

  return (
    <SessionContext.Provider value={{session, login, logout}}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}