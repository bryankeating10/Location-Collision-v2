type Quant = { id: number; name: string };

type Props = {
  quants: Quant[];
  onDelete: (id: number) => void;
};

export default function QuantList({ quants, onDelete }: Props) {
  if (!quants.length) return <p>No quants yet</p>;

  return (
    <ul>
      {quants.map((q) => (
        <li key={q.id}>
          {q.name} <button onClick={() => onDelete(q.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}