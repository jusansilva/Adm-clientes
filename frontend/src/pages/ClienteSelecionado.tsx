import { useEffect, useState } from "react";
import { api } from "../services/api";
import { type Cliente } from "../types/Cliente";
import { Button } from "../components/ui/button";

export default function ClientesSelecionados() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const selecionados = JSON.parse(
      localStorage.getItem("clientesSelecionados") || "[]"
    );
    if (selecionados.length === 0) {
      setClientes([]);
      return;
    }
    Promise.all(
      selecionados.map((id: number) =>
        api.get(`/client/${id}`).then((res) => res.data)
      )
    ).then(setClientes);
  }, []);

  const limparSelecionados = () => {
    setClientes([]);
    localStorage.removeItem("clientesSelecionados");
  };
  function capitalizeWords(str: string) {
  if (!str) return "";
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

  return (
    <div className="p-4 m-20">
      <div className="flex items-center gap-4 mb-2 justify-between">
        <div className="font-inter font-bold text-[22px] leading-[1] tracking-[0] text-gray-700">
          <strong>Clientes Selecionados:</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {clientes.map((cliente) => (
          <div
            key={cliente.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div className="font-semibold text-center">
              {capitalizeWords(cliente.nome ?? "")}
            </div>
            <div className="text-sm text-center mt-1">
              Salário: R${Number(cliente.salario ?? 0).toLocaleString("pt-BR")}
              <br />
              Empresa: R$
              {Number(cliente.empresa ?? 0).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          onClick={limparSelecionados}
          className="text-orange-500 border-orange-400 hover:bg-orange-100 w-[100%]"
        >
          Limpar clientes selecionados
        </Button>
      </div>
    </div>
  );
}
