import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Biography from "./pages/Biography";

//? Home rendert die Homepage, About + alle Projekte
//? Biography render die Biographie

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<Biography />} />
      </Routes>
    </BrowserRouter>
  );
}
