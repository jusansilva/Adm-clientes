import { useNavigate } from 'react-router-dom';
// import './Home.css'; 

export default function Home() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nome = new FormData(e.currentTarget).get('nome') as string;
    localStorage.setItem('nome', nome);
    navigate('/clientes');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f9f9f9]">
      <form className="flex flex-col gap-3 items-center p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-[#222] mb-0">Olá, seja bem-vindo</h2>
        <input
          className="w-[100%] p-2 text-base border border-[#ccc] rounded"
          type="text"
          name="nome"
          placeholder="Digite o seu nome:"
          required
        />
        <button
          className="w-[320px] p-2 bg-[#f26522] border-none text-white text-base font-bold rounded cursor-pointer hover:bg-[#d95418]"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
