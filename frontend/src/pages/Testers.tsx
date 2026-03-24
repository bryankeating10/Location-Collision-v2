import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

interface Tester {
  id: number;
  name: string;
  assigned_quant: number;
  created_at: string;
}

interface Quant {
  id: number;
  name: string;
}

const Testers: React.FC = () => {
  const [testers, setTesters] = useState<Tester[]>([]);
  const [quants, setQuants] = useState<Quant[]>([]);
  const [name, setName] = useState("");
  const [assignedQuantId, setAssignedQuantId] = useState<string>("");

  const fetchTesters = async () => {
    try {
      const res = await axios.get("http://localhost:8000/testers/");
      setTesters(res.data);
    } catch (err) {
      console.error("Fetch testers error:", err);
    }
  };

  const fetchQuants = async () => {
    try {
      const res = await axios.get("http://localhost:8000/quants/");
      setQuants(res.data);
    } catch (err) {
      console.error("Fetch quants error:", err);
    }
  };

  useEffect(() => {
    fetchTesters();
    fetchQuants();
  }, []);

  const handleAddTester = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // API expects name and assigned_quant as query params
      await axios.post(
        `http://localhost:8000/testers/?name=${encodeURIComponent(
          name.trim()
        )}&assigned_quant=${assignedQuantId}`
      );

      // Reset form
      setName("");
      setAssignedQuantId("");

      fetchTesters();
    } catch (err: any) {
      console.error("POST error:", err);
      console.log("Backend response:", err.response?.data);
    }
  };

  const handleDeleteTester = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this tester?")) return;
    try {
      await axios.delete(`http://localhost:8000/testers/${id}`);
      fetchTesters();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Testers</h1>

      {/* Form */}
      <form onSubmit={handleAddTester} className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Tester Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        />

        <select
          value={assignedQuantId}
          onChange={(e) => setAssignedQuantId(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        >
          <option value="" disabled>
            Select Quant
          </option>
          {quants.map((q) => (
            <option key={q.id} value={q.id}>
              {q.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      {/* Table */}
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Assigned Quant</th>
            <th className="border p-2">Created</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testers.map((tester) => (
            <tr key={tester.id}>
              <td className="border p-2">{tester.id}</td>
              <td className="border p-2">{tester.name}</td>
              <td className="border p-2">
                {quants.find((q) => q.id === tester.assigned_quant)?.name ||
                  tester.assigned_quant}
              </td>
              <td className="border p-2">
                {new Date(tester.created_at).toLocaleString()}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDeleteTester(tester.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Testers;