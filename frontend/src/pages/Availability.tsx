// frontend/src/pages/Availability.tsx

import React, { useEffect, useState } from "react";
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

interface AvailabilityProps {
  testerId: number;
  locationId: number;
}

const Availability: React.FC<AvailabilityProps> = ({ testerId, locationId }) => {
  const [availability, setAvailability] = useState<CasinoAvailability[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<AvailabilityResponse>(
          `/availability/?tester_id=${testerId}&location_id=${locationId}`
        );
        setAvailability(response.data.availability);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch availability.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [testerId, locationId]);

  if (loading) return <div>Loading availability...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Availability for Tester {testerId} at Location {locationId}
      </h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Casino</th>
            <th className="border px-4 py-2 text-left">Availability</th>
          </tr>
        </thead>
        <tbody>
          {availability.map((casino) => (
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
    </div>
  );
};

export default Availability;