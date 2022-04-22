import react from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { AnimatePresence } from "framer-motion";
function Pages() {
  const Location = useLocation();
  return (
    <div>
      <AnimatePresence exitBeforeEnter>
      <Routes location={Location} key={Location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/Searched/:type" element={<Searched />} />
        <Route path="/Recipe/:name" element={<Recipe />} />
      </Routes>
      </AnimatePresence>
    </div>
  );
}

export default Pages;
