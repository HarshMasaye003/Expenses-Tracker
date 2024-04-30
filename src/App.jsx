import { Router } from "react-router";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Section from "./layout/Section";

function App() {
  return (
    <div className="h-[100dvh] ">
      <Header />

      <Section />

      <Footer />
    </div>
  );
}

export default App;
