import { useEffect, useState } from "react"

type Quant = {
  id: number
  name: string
  created_at: string
}

export default function App() {
  const [quants, setQuants] = useState<Quant[]>([])

  useEffect(() => {
  fetch("http://127.0.0.1:8000/quants/")
    .then(res => {
      console.log("RAW RESPONSE", res)
      return res.json()
    })
    .then(data => {
      console.log("PARSED DATA", data)
      setQuants(data)
    })
    .catch(err => console.error("ERROR", err))
}, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quants</h1>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {quants.map(q => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.name}</td>
              <td>{q.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}