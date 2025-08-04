import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from '../assets/logo.svg'; 

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('nome');
    if (usuarioSalvo) setUser(usuarioSalvo);
  }, [])

  const handleLogout = () => {
      localStorage.clear();
      navigate("/");
  };

  return (
    <header className="w-full h-[100px] top-0 left-0 bg-white shadow-md relative flex items-center">
      <button
        className="absolute left-4 ml-[24px] top-8 text-2xl text-black"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menu"
      >
        <FiMenu />
      </button>

      <img
        src={Logo}
        alt="Logo"
        className="ml-[100px] w-[100px] h-[48px]"
      />

      <nav className="hidden md:flex w-[323px] h-[19px] mx-auto justify-between">
        <Link
          to="/clientes"
          className={`text-xl font-bold hover:underline ${
            location.pathname === "/clientes" ? "text-[#EC6724] underline" : "text-black"
          } font-inter text-[16px] leading-[19px]`}
        >
          Clientes
        </Link>
        <Link
          to="/clientes/selecionado"
          className={`hover:underline ${
            location.pathname === "/clientes/selecionado" ? "text-[#EC6724] underline" : "text-black"
          } font-inter text-[16px] leading-[19px]`}
        >
          Clientes selecionados
        </Link>
        <Link
          className="hover:underline text-black font-inter text-[16px] leading-[19px] bg-transparent border-none cursor-pointer"
          onClick={handleLogout} to={""}        >
          Sair
        </Link>
      </nav>

      <div className="hidden md:block absolute top-[41px] right-8 w-[100px] h-[19px] text-black font-inter text-[16px] leading-[19px]">
        Olá, {user}!
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="bg-white w-64 h-full p-6 flex flex-col gap-6 shadow-lg">
            <button
              className="self-end text-2xl mb-4"
              onClick={() => setSidebarOpen(false)}
              aria-label="Fechar menu"
            >
              <FiX />
            </button>
            <Link
              to="/clientes"
              className={`text-lg font-bold ${
                location.pathname === "/clientes" ? "text-[#EC6724] underline" : "text-black"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Clientes
            </Link>
            <Link
              to="/clientes/selecionado"
              className={`text-lg ${
                location.pathname === "/clientes/selecionado" ? "text-[#EC6724] underline" : "text-black"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Clientes selecionados
            </Link>
            <Link
              className="text-black"
              onClick={() => {
                setSidebarOpen(false);
                handleLogout();
              } } to={""}            >
              Sair
            </Link>
            <div className="mt-auto text-black font-inter text-[16px]">
              Olá, Usuário!
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
