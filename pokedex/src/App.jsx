import { useState, useEffect } from "react";
import { fetchPokemonPage, fetchPokemonDetails } from "./services/pokeApi";
import { Router, Routes, Route } from "react-router-dom";
import PokeCard from "./components/PokeCard";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import PokemonDetail from "./pages/PokemonDetail";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [searching, setSearching] = useState(false);
  const [allNames, setAllNames] = useState([]);

  const totalPages = 67; // 1008 Pokémon / 15 por página

  // Cargar nombres de todos los Pokémon al inicio (solo una vez)
  useEffect(() => {
    const fetchAllNames = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );
      const data = await res.json();
      setAllNames(data.results); // Guarda todos los nombres
    };
    fetchAllNames();
  }, []);

  // Cargar la página actual de Pokémon
  useEffect(() => {
    if (!searching) {
      const loadPokemons = async () => {
        const basicList = await fetchPokemonPage(page, 15);
        const fullDetails = await fetchPokemonDetails(basicList);
        setPokemons(fullDetails);
      };
      loadPokemons();
    }
  }, [page, searching]);

  // Buscar Pokémon por nombre exacto
  const handleSearch = async (text) => {
    const searchText = text.toLowerCase().trim();

    if (searchText === "") {
      // Restaurar paginación
      setSearching(false);
      const basicList = await fetchPokemonPage(page, 15);
      const fullDetails = await fetchPokemonDetails(basicList);
      setPokemons(fullDetails);
    } else {
      setSearching(true);

      let matched = allNames.filter(
        (p) => p.name.startsWith(searchText) && !p.name.includes("-")
      );

      // Si coincide exactamente con un nombre, priorízalo
      const exact = allNames.find(
        (p) => p.name === searchText && !p.name.includes("-")
      );
      if (exact) {
        matched = [exact];
      }

      if (matched.length === 0) {
        setPokemons([]);
        return;
      }

      const sliced = matched.slice(0, 15);
      const details = await fetchPokemonDetails(sliced);
      setPokemons(details);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar onSearchPokemon={handleSearch} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
              disabled={searching}
            />
            <div className="d-flex flex-wrap gap-4 justify-content-evenly p-4">
              {pokemons.map((pokemon) => (
                <PokeCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </>
        }
      />

      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;
