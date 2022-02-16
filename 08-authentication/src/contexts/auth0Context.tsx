import React, {
  createContext,
  Context,
  FC,
  useState,
  useEffect,
  useContext,
} from 'react';
import createAuth0Client, { User } from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

type Auth0ContextProps = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void> | undefined;
  logout: () => void | undefined;
  getToken: () => Promise<string> | undefined;
};

const clientId = String(process.env.REACT_APP_CLIENT_ID);

const Auth0Context = createContext<Auth0ContextProps>(
  {} as Auth0ContextProps,
) as Context<Auth0ContextProps>;
export const useAuth0 = (): Auth0ContextProps => useContext(Auth0Context);

export const Auth0ContextProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [auth0Client, setAuth0Client] = useState<Auth0Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const auth0 = await createAuth0Client({
        domain: 'dev-czo5wv2h.eu.auth0.com',
        client_id: clientId,
        redirect_uri: window.location.origin,
      });

      setAuth0Client(auth0);

      // handle redirect when a user comes back
      if (window.location.search.includes('state=')) {
        try {
          await auth0.handleRedirectCallback();
        } catch (error) {
          // eslint-disable-next-line no-alert
          alert(error);
        }

        window.location.replace(window.location.pathname);
      }

      // is a user authenticated
      const isAuth = await auth0.isAuthenticated();
      setIsAuthenticated(isAuth);

      // go grab the user
      if (isAuth) {
        const userAuth0 = await auth0.getUser();
        setUser(userAuth0 || null);
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login: (...options) => auth0Client?.loginWithRedirect(...options),
        logout: (...options) => auth0Client?.logout(...options),
        getToken: (...options) => auth0Client?.getTokenSilently(...options),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
