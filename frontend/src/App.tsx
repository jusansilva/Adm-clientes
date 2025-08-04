import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Header from './components/Header';

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === '/';

  return (
    <>
      {!hideHeader && <Header />}
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
