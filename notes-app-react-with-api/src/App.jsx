import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  Navigate,
} from 'react-router-dom';

import HomePage, { homePageLoader } from './pages/HomePage';
import ArchivePage, { archivePageLoader } from './pages/ArchivePage';
import DetailPage, { detailPageLoader, detailPageAction } from './pages/DetailPage';
import AddPage, { addNoteAction } from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage, { loginAction } from './pages/LoginPage';
import RegisterPage, { registerAction } from './pages/RegisterPage';
import Navigation from './components/Navigation';
import Loading from './components/Loading';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';
import { getUserLogged, putAccessToken } from './utils/network-data';

function AppLayout({ authedUser, onLogout }) {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
        </h1>
        <Navigation name={authedUser?.name} logout={onLogout} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'id');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const fetchUser = useCallback(async () => {
    try {
      const { error, data } = await getUserLogged();
      setAuthedUser(error ? null : data);
    } catch {
      setAuthedUser(null);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onLogout = useCallback(() => {
    setAuthedUser(null);
    putAccessToken('');
  }, []);

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  const localeContextValue = useMemo(() => ({ locale, toggleLocale }), [locale, toggleLocale]);

  const router = useMemo(() => {
    if (authedUser === null) {
      return createBrowserRouter([
        {
          element: <AppLayout authedUser={null} onLogout={onLogout} />,
          children: [
            {
              path: '/',
              element: <LoginPage />,
              action: async (args) => {
                const res = await loginAction(args);
                if (!res?.error) await fetchUser();
                return res;
              },
            },
            {
              path: '/login',
              element: <Navigate to="/" replace />,
            },
            {
              path: '/register',
              element: <RegisterPage />,
              action: registerAction,
            },
            {
              path: '*',
              element: <Navigate to="/" replace />,
            },
          ],
        },
      ]);
    }

    return createBrowserRouter([
      {
        element: <AppLayout authedUser={authedUser} onLogout={onLogout} />,
        children: [
          {
            path: '/',
            element: <HomePage />,
            loader: homePageLoader,
          },
          {
            path: '/login',
            element: <Navigate to="/" replace />,
          },
          {
            path: '/register',
            element: <Navigate to="/" replace />,
          },
          {
            path: '/archives',
            element: <ArchivePage />,
            loader: archivePageLoader,
          },
          {
            path: '/notes/new',
            element: <AddPage />,
            action: addNoteAction,
          },
          {
            path: '/notes/:id',
            element: <DetailPage />,
            loader: detailPageLoader,
            action: detailPageAction,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ]);
  }, [authedUser, onLogout, fetchUser]);

  if (initializing) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <Loading />
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <RouterProvider key={authedUser ? 'user' : 'guest'} router={router} />
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}