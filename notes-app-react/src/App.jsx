import { Routes, Route, Link } from 'react-router-dom';
import HomePageWrapper from './pages/HomePage';
import ArchiveNotesWrapper from './pages/ArchivePage';
import DetailPageWrapper from './pages/DetailPage';
import AddPageWrapper from './pages/AddPage';
import NotFound from './pages/NotFoundPage';

function App() {
  const routePaths = [
    '/',
    '/archives',
    '/notes/new',
    '/notes/:id',
    '*',
  ];
  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/">Aplikasi Catatan</Link>
        </h1>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/archives">Arsip</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          {routePaths.map((path) => {
            let Component;
            switch (path) {
              case '/':
                Component = HomePageWrapper;
                break;
              case '/archives':
                Component = ArchiveNotesWrapper;
                break;
              case '/notes/new':
                Component = AddPageWrapper;
                break;
              case '/notes/:id':
                Component = DetailPageWrapper;
                break;
              default:
                Component = NotFound;
            }

            return <Route key={path} path={path} element={<Component />} />;
          })}
        </Routes>
      </main>
    </div>
  );
}

export default App;