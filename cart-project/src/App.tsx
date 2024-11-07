import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
