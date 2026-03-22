import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Quants from "./pages/Quants";
import Testers from "./pages/Testers";
import Casinos from "./pages/Casinos";
import Accounts from "./pages/Accounts";
import Locations from "./pages/Locations";
import Actions from "./pages/Actions";
import Availability from "./pages/Availability";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quants" element={<Quants />} />
          <Route path="/testers" element={<Testers />} />
          <Route path="/casinos" element={<Casinos />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/availability" element={<Availability />} />
        </Routes>
      </Router>
  )
}

export default App;