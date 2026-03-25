import React, { useState } from "react";
import axios from "axios";

interface CasinoAvailability {
  casino_id: number;
  casino_name: string;
  available: boolean;
  conflicting_action_id?: number | null;
}

interface AvailabilityResponse {
  tester_id: number;
  location_id: number;
  availability: CasinoAvailability[];
}

const Availability: React.FC = () => {
  const [testerId, setTesterId] = useState<number | "">("");
  const [locationId, setLocationId] = useState<number | "">("");
  const [availability, setAvailability] = useState<CasinoAvailability[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (testerId === "" || locationId === "") {
      setError("Please enter both Tester ID and Location ID.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<AvailabilityResponse>(
        `http://127.0.0.1:8000/availability/?tester_id=${testerId}&location_id=${locationId}`
      );

      // Ensure availability is always an array
      setAvailability(response.data.availability || []);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch availability.");
      setAvailability([]);
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  const availList = Array.isArray(availability) ? availability : [];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check Availability</h1>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Tester ID</label>
          <input
            type="number"
            value={testerId}
            onChange={(e) => setTesterId(Number(e.target.value))}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location ID</label>
          <input
            type="number"
            value={locationId}
            onChange={(e) => setLocationId(Number(e.target.value))}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Check Availability
        </button>
      </form>

      {loading && <div>Loading availability...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Availability table */}
      {submitted && !loading && !error && availList.length > 0 && (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Casino</th>
              <th className="border px-4 py-2 text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {availList.map((casino) => (
              <tr key={casino.casino_id}>
                <td className="border px-4 py-2">{casino.casino_name}</td>
                <td
                  className={`border px-4 py-2 font-bold ${
                    casino.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {casino.available ? "Available" : "Collision"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Optional: no casinos found */}
      {submitted && !loading && !error && availList.length === 0 && (
        <div>No accounts found for this tester at this location.</div>
      )}
    </div>
  );
};

export default Availability;