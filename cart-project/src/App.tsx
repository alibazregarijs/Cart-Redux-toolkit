import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
