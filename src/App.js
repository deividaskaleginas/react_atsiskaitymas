import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { Footer, Header } from "./components/index";
import { Add, Home, Login, Registration } from "./pages/index";

import AppContext from "./context/appContext";

function App() {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <Navigate to="/login" /> : <Home />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/*" element={<h1>404 not found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
