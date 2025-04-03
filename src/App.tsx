import Footer from "./components/Footer";
import { GridImages } from "./components/GridImages";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import PaymentMethods from "./components/PaymentMethods";
import Service from "./components/Service";
import "./index.css";

function App() {
  return (
    <main className="h-full w-full bg-slate-100">
      <Nav />
      <Home />
      <Service />
      <PaymentMethods />
      <GridImages />
      <Footer />
    </main>
  );
}

export default App;
