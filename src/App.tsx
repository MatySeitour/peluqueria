import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import "./index.css";

function App() {
  return (
    <main className="h-full w-full bg-slate-100">
      <Nav />
      <Home />
    </main>
  );
}

export default App;
