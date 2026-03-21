type Quant = { id: number; name: string };

export async function getQuants(): Promise<Quant[]> {
  const res = await fetch("/quants/");
  return res.json();
}

export async function createQuant(name: string): Promise<Quant> {
  const res = await fetch("/quants/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function deleteQuant(id: number): Promise<void> {
  await fetch(`/quants/${id}`, { method: "DELETE" });
}