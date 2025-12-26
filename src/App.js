import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import CopySection from "./components/CopySection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import RetrieveSection from "./components/RetrieveSection";

function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <Navbar />
      <div className="app">
        <Hero />
        <div className="main-body">
          <CopySection />
          <RetrieveSection />
        </div>
      </div>
      <Footer />
      <SpeedInsights />
    </main>
  );
}

export default App;
