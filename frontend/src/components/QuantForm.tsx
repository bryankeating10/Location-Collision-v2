import { useState } from "react";

type Props = { onSubmit: (name: string) => void };

export default function QuantForm({ onSubmit }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name);
    setName("");
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New quant name"
      />
      <button onClick={handleSubmit}>Add Quant</button>
    </div>
  );
}