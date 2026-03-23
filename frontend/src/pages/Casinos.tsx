import { useEffect, useState} from "react";
import React from "react";
import axios from "axios";

interface Casino {
    id: number;
    name: string;
    network: string;
    active: boolean;
    signup_rest: boolean;
    deposit_rest: boolean;
    play_rest: boolean;
    withdrawal_rest: boolean;
    network_rest: boolean;
    created_at: string;
    updated_at: string;
}

export default function CasinoPage() {
    const [casinos, setCasinos] = useState<Casino[]>([]);
    const [name, setName] = useState("");
    const [network, setNetwork] = useState("");
    const [active, setActive] = useState(false);
    const [signup_rest, setSignUpRestriction] = useState(false);
    const [deposit_rest, setDepositRestriction] = useState(false);
    const [play_rest, setPlayRestriction] = useState(false);
    const [withdrawal_rest, setWithdrawalRestriction] = useState(false);
    const [network_rest, setNetworkRestriction] = useState(false);

    const fetchCasinos = async () => {
        try {
            const res = await axios.get("http://localhost:8000/casinos/");
            setCasinos(res.data);
        } catch (err) {
            console.error("Fetch error", err)
        }
    };

    useEffect(() => {
        fetchCasinos();
    }, []);

    const handleAddCasino = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const payload = {
                name: name.trim(),
                network: network.trim(),
                active: active,
                signup_rest: signup_rest,
                deposit_rest: deposit_rest,
                play_rest: play_rest,
                withdrawal_rest: withdrawal_rest,
                network_rest: network_rest,
            };

            await axios.post("http://localhost:8000/casinos/", payload);

            // Clear form
            setName("");
            setNetwork("");
            setActive(false);
            setSignUpRestriction(false);
            setDepositRestriction(false);
            setPlayRestriction(false);
            setWithdrawalRestriction(false);
            setNetworkRestriction(false);

            fetchCasinos();

        } catch (err: any) {
            console.error("POST error", err);
            console.log("Backend response:", err.response?.data);
        }
    };
    
    return (
        <div style={{ padding: "20px" }}>
            <h1>Casinos</h1>
            
            <form onSubmit={handleAddCasino} style={{ display: "flex", flexDirection: "column", maxWidth: "400px", gap: "10px", marginBottom: "40px" }}>
                <div>
                    <label style={{ display: "block" }}>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%" }} />
                </div>
                <div>
                    <label style={{ display: "block" }}>Network:</label>
                    <input type="text" value={network} onChange={(e) => setNetwork(e.target.value)} required style={{ width: "100%" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
                    <label>Active</label>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" checked={signup_rest} onChange={(e) => setSignUpRestriction(e.target.checked)} />
                    <label>Signup Restriction</label>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" checked={deposit_rest} onChange={(e) => setDepositRestriction(e.target.checked)} />
                    <label>Deposit Restriction</label>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" checked={play_rest} onChange={(e) => setPlayRestriction(e.target.checked)} />
                    <label>Play Restriction</label>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" checked={withdrawal_rest} onChange={(e) => setWithdrawalRestriction(e.target.checked)} />
                    <label>Withdrawal Restriction</label>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" checked={network_rest} onChange={(e) => setNetworkRestriction(e.target.checked)} />
                    <label>Network Restriction</label>
                </div>
                <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Add Casino</button>
            </form>

            <hr />

            <h3>Current Casinos</h3>
            <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Network</th>
                        <th>Active</th>
                        <th>Signup Restriction</th>
                        <th>Deposit Restriction</th>
                        <th>Play Restriction</th>
                        <th>Withdrawal Restriction</th>
                        <th>Network Restriction</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {casinos.map((casino) => (
                        <tr key={casino.id}>
                            <td>{casino.id}</td>
                            <td>{casino.name}</td>
                            <td>{casino.network}</td>
                            <td>{casino.active ? "Yes" : "No"}</td>
                            <td>{casino.signup_rest ? "Yes" : "No"}</td>
                            <td>{casino.deposit_rest ? "Yes" : "No"}</td>
                            <td>{casino.play_rest ? "Yes" : "No"}</td>
                            <td>{casino.withdrawal_rest ? "Yes" : "No"}</td>
                            <td>{casino.network_rest ? "Yes" : "No"}</td>
                            <td>{new Date(casino.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}