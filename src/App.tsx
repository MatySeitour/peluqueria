import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import { GridImages } from "./components/GridImages";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import PaymentMethods from "./components/PaymentMethods";
import Service from "./components/Service";
import "./index.css";

function App() {
  return (
    <Router>
      <main className="bg-third/40 h-full w-full">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Service />} />
          <Route path="/reservar" element={<Booking />} />
        </Routes>
        <PaymentMethods />
        <GridImages />
        <Footer />
      </main>
    </Router>
  );
}

export default App;
