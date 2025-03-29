import Footer from "./components/Footer";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import Service from "./components/Service";
import "./index.css";

function App() {
  return (
    <main className="h-full w-full bg-slate-100">
      <Nav />
      <Home />
      <Service />
      <Footer />
    </main>
  );
}

export default App;
