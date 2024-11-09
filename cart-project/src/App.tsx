import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/navbar" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
  );
}
