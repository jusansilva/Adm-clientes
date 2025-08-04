import { useState } from 'react';
import { type Cliente } from '../types/Cliente';

interface Props {
  onSubmit: (cliente: Omit<Cliente, 'id'>) => void;
  initialValue?: { nome: string; salario: number; empresa: string };
}

export default function ClienteForm({ onSubmit, initialValue = { nome: "", salario: 0, empresa: ""} }: Props) {
  const [nome, setNome] = useState(initialValue.nome);
  const [salario, setSalario] = useState(initialValue.salario);
  const [ empresa, setEmpresa] = useState(initialValue.empresa)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ nome, salario, empresa });
      }}
    >
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome" required />
      <input type="number" value={salario} onChange={(e) => setSalario(Number(e.target.value))} placeholder="Digite o salário" required />
      <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Digite a empresa" required />
      <button type="submit">Salvar</button>
    </form>
  );
}
