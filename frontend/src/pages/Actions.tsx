import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

interface Action {
  id: number;
  category: string;
  magnitude: number | null;
  account_id: number | null;
  location_id: number | null;
  performed_at: string;
}

interface Account {
  id: number;
  tester_id: number;
  casino_id: number;
}

const ACTION_CATEGORIES = ["signup", "deposit", "play", "withdraw"] as const;
type ActionCategory = (typeof ACTION_CATEGORIES)[number];

const Actions: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [testerId, setTesterId] = useState<number | "">("");
  const [casinoId, setCasinoId] = useState<number | "">("");
  const [locationId, setLocationId] = useState<number | "">("");
  const [category, setCategory] = useState<ActionCategory>("signup");
  const [magnitude, setMagnitude] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const requiresMagnitude = useMemo(
    () => category === "deposit" || category === "withdraw",
    [category]
  );

  const fetchActions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Action[]>("http://localhost:8000/actions/");
      setActions(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Fetch actions error:", err);
      setError("Failed to fetch actions.");
      setActions([]);
    } finally {
      setLoading(false);
    }
  };

  const resolveAccountId = async (testerIdValue: number, casinoIdValue: number) => {
    const response = await axios.get<Account[]>("http://localhost:8000/accounts/");
    const account = response.data.find(
      (item) => item.tester_id === testerIdValue && item.casino_id === casinoIdValue
    );

    return account?.id ?? null;
  };

  useEffect(() => {
    fetchActions();
  }, []);

  useEffect(() => {
    if (!requiresMagnitude) {
      setMagnitude("");
    }
  }, [requiresMagnitude]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (testerId === "" || casinoId === "" || locationId === "") {
      setError("Please fill in tester ID, casino ID, and location ID.");
      return;
    }

    if (requiresMagnitude && magnitude.trim() === "") {
      setError(`Please enter a magnitude for ${category}.`);
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const accountId = await resolveAccountId(Number(testerId), Number(casinoId));

      if (!accountId) {
        setError("No account found for that tester ID and casino ID combination.");
        return;
      }

      await axios.post("http://localhost:8000/actions/", {
        category,
        magnitude: requiresMagnitude ? Number(magnitude) : null,
        account_id: accountId,
        location_id: Number(locationId),
      });

      setTesterId("");
      setCasinoId("");
      setLocationId("");
      setCategory("signup");
      setMagnitude("");
      setSuccessMessage("Action created successfully.");

      await fetchActions();
    } catch (err: any) {
      console.error("Submit action error:", err);
      setError(
        err?.response?.data?.detail ||
          "Failed to create action. Please check the backend route and payload."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Actions</h1>

      <form onSubmit={handleSubmit} className="mb-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-1 font-medium">Tester ID</label>
          <input
            type="number"
            value={testerId}
            onChange={(e) =>
              setTesterId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Casino ID</label>
          <input
            type="number"
            value={casinoId}
            onChange={(e) =>
              setCasinoId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location ID</label>
          <input
            type="number"
            value={locationId}
            onChange={(e) =>
              setLocationId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ActionCategory)}
            className="border p-2 rounded w-full"
          >
            {ACTION_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Magnitude</label>
          <input
            type="number"
            step="any"
            value={magnitude}
            onChange={(e) => setMagnitude(e.target.value)}
            className="border p-2 rounded w-full disabled:bg-gray-100"
            disabled={!requiresMagnitude}
            placeholder={requiresMagnitude ? "Enter magnitude" : "Not required"}
          />
          <p className="text-sm text-gray-500 mt-1">
            Required for deposit and withdraw.
          </p>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Add Action"}
          </button>
        </div>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {loading && <div className="mb-4">Loading actions...</div>}

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Magnitude</th>
            <th className="border p-2 text-left">Account ID</th>
            <th className="border p-2 text-left">Location ID</th>
            <th className="border p-2 text-left">Performed At</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action) => (
            <tr key={action.id}>
              <td className="border p-2">{action.id}</td>
              <td className="border p-2">{action.category}</td>
              <td className="border p-2">
                {action.magnitude === null ? "-" : action.magnitude}
              </td>
              <td className="border p-2">{action.account_id ?? "-"}</td>
              <td className="border p-2">{action.location_id ?? "-"}</td>
              <td className="border p-2">
                {new Date(action.performed_at).toLocaleString()}
              </td>
            </tr>
          ))}
          {!loading && actions.length === 0 && (
            <tr>
              <td className="border p-2 text-center" colSpan={6}>
                No actions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Actions;