import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Navbar } from "./Navbar";
import { Scrapeddata } from "./Scrapeddata";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <Navbar />; */}
      <Routes>
        <Route path="/" element={<Scrapeddata />} />
        <Route path="/gadget" element={<Scrapeddata />} />
      </Routes>
    </div>
  );
}

export default App;
