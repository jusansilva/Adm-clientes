import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClienteList from './pages/ClienteList';
import ClientesSelecionados from './pages/ClienteSelecionado';

const AppRoutes = () => {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<ClienteList />} />
        <Route path="/clientes/selecionado" element={<ClientesSelecionados />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
