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
          <Route
            path="/"
            element={
              <>
                <Home />
                <PaymentMethods />
                <GridImages />
                <Footer />
              </>
            }
          />
          <Route
            path="/servicios"
            element={
              <>
                <Service />
                <Footer />
              </>
            }
          />
          {/* Apartado propio: sin el resto de la web (footer, medios de pago, galería) mezclado. */}
          <Route path="/reservar" element={<Booking />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
