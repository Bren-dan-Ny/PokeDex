import { useState } from "react";
import pokelogo from "../assets/pokelogo.png";
import "../styles/navbar.css";

function Navbar({ onSearchPokemon }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearchPokemon(value); // búsqueda directa sin debounce
  };

  return (
    <>
      <nav className=" container navbar  px-4 py-2 ">
        <img src={pokelogo} alt="Logo" style={{ height: "70px" }} />
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={search}
          onChange={handleChange}
          className="form-control w-25"
        />
      </nav>
      <div className="color-strip"></div>
    </>
  );
}

export default Navbar;
