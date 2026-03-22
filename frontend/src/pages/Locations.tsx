import { useEffect, useState } from "react";
import axios from "axios";

interface Location {
  id: number;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at?: string | null;
}

export default function LocationPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/locations/");
      setLocations(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: name.trim(),
        state: state.trim(),
        latitude: Number(latitude),
        longitude: Number(longitude),
      };

      console.log("Sending payload:", payload);

      await axios.post("http://localhost:8000/locations/", payload);

      // Reset form
      setName("");
      setState("");
      setLatitude("");
      setLongitude("");

      fetchLocations();
    } catch (err: any) {
      console.error("POST error:", err);
      console.log("Backend response:", err.response?.data);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>

      {/* Form */}
      <form onSubmit={handleAddLocation} className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border p-2 rounded w-24"
          required
        />

        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="border p-2 rounded w-32"
          required
        />

        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="border p-2 rounded w-32"
          required
        />

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
            <th className="border p-2">State</th>
            <th className="border p-2">Lat</th>
            <th className="border p-2">Lng</th>
            <th className="border p-2">Created</th>
            <th className="border p-2">Updated</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id}>
              <td className="border p-2">{loc.id}</td>
              <td className="border p-2">{loc.name}</td>
              <td className="border p-2">{loc.state}</td>
              <td className="border p-2">{loc.latitude}</td>
              <td className="border p-2">{loc.longitude}</td>
              <td className="border p-2">
                {new Date(loc.created_at).toLocaleString()}
              </td>
              <td className="border p-2">
                {loc.updated_at
                  ? new Date(loc.updated_at).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}