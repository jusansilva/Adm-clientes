import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiMinus } from "react-icons/fi";
import { Button } from "../components/ui/button";
import { api } from "../services/api";

type Cliente = {
  id: number;
  nome: string;
  salario: string;
  empresa: string;
};

export default function ClientesList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [porPagina, setPorPagina] = useState(16);
  const [modalOpen, setModalOpen] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    salario: "",
    empresa: "",
  });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);
  const [clienteExcluir, setClienteExcluir] = useState<Cliente | null>(null);
  const [selecionados, setSelecionados] = useState<number[]>(() => {
    const saved = localStorage.getItem("clientesSelecionados");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    (async () => {
      const clientRequest = await api.get("/client");
      if (clientRequest) {
        setClientes(clientRequest.data);
      }
    })();
  }, []);

  const clientesPagina = clientes.slice(
    (paginaAtual - 1) * porPagina,
    paginaAtual * porPagina
  );

  const totalPaginas = Math.ceil(clientes.length / porPagina);

  const abrirModalCriar = () => {
    setNovoCliente({ nome: "", salario: "", empresa: "" });
    setEditandoId(null);
    setModalOpen(true);
  };

  const abrirModalEditar = (cliente: Cliente) => {
    setNovoCliente({
      nome: cliente.nome,
      salario: cliente.salario ? String(cliente.salario) : "",
      empresa: cliente.empresa,
    });
    setEditandoId(cliente.id);
    setModalOpen(true);
  };

  const handleSalvarCliente = async () => {
    if (editandoId === null) {
      const salvarCliente = await api.post("/client", {
        nome: novoCliente.nome,
        salario: novoCliente.salario,
        empresa: novoCliente.empresa,
      });

      const cliente = salvarCliente.data;

      setClientes([
        ...clientes,
        {
          id: cliente.id,
          nome: cliente.nome,
          salario: cliente.salario,
          empresa: cliente.empresa,
        },
      ]);
    } else {
      const clientPorId = await api.get(`client/${editandoId}`);
      if (!clientPorId) {
        alert("Cliente não existe");
        return;
      }

      await api.put(`client/${editandoId}`, {
        nome: novoCliente.nome || clientPorId.data.nome,
        salario: novoCliente.salario || clientPorId.data.salario,
        empresa: novoCliente.empresa || clientPorId.data.empresa,
      });

      setClientes(
        clientes.map((c) =>
          c.id === editandoId ? { ...c, ...novoCliente } : c
        )
      );
    }
    setModalOpen(false);
    setNovoCliente({ nome: "", salario: "", empresa: "" });
    setEditandoId(null);
  };

  const abrirModalExcluir = (cliente: Cliente) => {
    setClienteExcluir(cliente);
    setModalExcluirOpen(true);
  };

  const handleExcluirCliente = async () => {
    if (clienteExcluir) {
      await api.delete(`client/${clienteExcluir.id}`);
      setClientes(clientes.filter((c) => c.id !== clienteExcluir.id));
      setModalExcluirOpen(false);
      setClienteExcluir(null);

      const novaSelecionados = selecionados.filter(id => id !== clienteExcluir.id);
      setSelecionados(novaSelecionados);
      localStorage.setItem("clientesSelecionados", JSON.stringify(novaSelecionados));
    }
  };

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const selecionarCliente = (id: number) => {
    let novaLista;
    if (selecionados.includes(id)) {
      novaLista = selecionados.filter((cid) => cid !== id);
    } else {
      novaLista = [...selecionados, id];
    }
    setSelecionados(novaLista);
    localStorage.setItem("clientesSelecionados", JSON.stringify(novaLista));
  };

  return (
    <div className="p-4 m-20">
      <div className="flex items-center gap-4 mb-2 justify-between">
        <div className="text-sm text-gray-500">
          <strong>{clientes.length}</strong> clientes encontrados:
        </div>
        <label className="text-sm text-gray-700 flex items-center gap-2">
          Clientes por página:
          <input
            type="number"
            min={1}
            max={clientes.length}
            value={porPagina}
            onChange={(e) => {
              setPorPagina(
                Number(e.target.value) <= 0 ? 1 : Number(e.target.value)
              );
              setPaginaAtual(1);
            }}
            className="border rounded px-2 py-1 w-16"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {clientesPagina.map((cliente) => (
          <div
            key={cliente.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div className="font-semibold text-center">
              {capitalizeWords(cliente.nome)}
            </div>
            <div className="text-sm text-center mt-1">
              Salário: R${Number(cliente.salario).toLocaleString("pt-BR")}
              <br />
              Empresa: R$
              {Number(cliente.empresa).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="flex justify-around mt-4 text-gray-600">
              {selecionados.includes(cliente.id) ? (
                <FiMinus
                  className="cursor-pointer hover:text-black"
                  onClick={() => selecionarCliente(cliente.id)}
                />
              ) : (
                <FiPlus
                  className="cursor-pointer hover:text-black"
                  onClick={() => selecionarCliente(cliente.id)}
                />
              )}
              <FiEdit2
                className="cursor-pointer hover:text-black"
                onClick={() => abrirModalEditar(cliente)}
              />
              <FiTrash2
                className="cursor-pointer hover:text-red-500"
                onClick={() => abrirModalExcluir(cliente)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          onClick={abrirModalCriar}
          className="text-orange-500 border-orange-400 hover:bg-orange-100 w-[100%]"
        >
          Criar cliente
        </Button>
      </div>

      {/* Modal para criar/editar */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editandoId === null ? "Criar Cliente" : "Editar Cliente"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSalvarCliente();
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Digitar Nome"
                value={novoCliente.nome}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, nome: e.target.value })
                }
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Digitar Salário"
                value={novoCliente.salario}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setNovoCliente({
                    ...novoCliente,
                    salario: value,
                  });
                }}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Digitar Empresa"
                value={novoCliente.empresa}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, empresa: e.target.value })
                }
                className="border rounded px-3 py-2"
                required
              />
              <Button
                type="submit"
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Salvar
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de exclusão */}
      {modalExcluirOpen && clienteExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setModalExcluirOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-2">Excluir cliente:</h2>
            <p className="mb-6">
              Você está prestes a excluir o cliente:{" "}
              <strong>{clienteExcluir.nome}</strong>
            </p>
            <button
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600"
              onClick={handleExcluirCliente}
            >
              Excluir cliente
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-4">
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded ${
              i + 1 === paginaAtual ? "bg-orange-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setPaginaAtual(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
