import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/pokemonDetail.css";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [habitat, setHabitat] = useState("");
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data1 = await res1.json();
        setPokemon(data1);
        setHeight(data1.height * 10);
        setWeight(data1.weight / 10);

        const res2 = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const data2 = await res2.json();

        const flavorEs = data2.flavor_text_entries.find(
          (entry) => entry.language.name === "es"
        );
        setDescription(
          flavorEs?.flavor_text.replace(/\f|\n/g, " ") || "Sin descripción."
        );

        setHabitat(data2.habitat?.name || "Desconocido");
        // Obtener la cadena evolutiva
        const evoRes = await fetch(data2.evolution_chain.url);
        const evoData = await evoRes.json();

        // Función recursiva para extraer todos los Pokémon de la cadena evolutiva
        const getEvolutions = async (chain) => {
          const evoArray = [];

          const fetchEvo = async (node) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${node.species.name}`
            );
            const data = await res.json();

            evoArray.push({
              name: node.species.name,
              image: data.sprites.other["official-artwork"].front_default,
            });

            if (node.evolves_to.length > 0) {
              for (const next of node.evolves_to) {
                await fetchEvo(next);
              }
            }
          };

          await fetchEvo(chain);
          return evoArray;
        };

        const evoList = await getEvolutions(evoData.chain);
        setEvolutions(evoList);

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar detalles:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (!pokemon)
    return <div className="text-center mt-5">No se encontró el Pokémon.</div>;

  const typeColors = {
    normal: { primary: "#6D6D4E", background: "#EEEED5" },
    fire: { primary: "#B22222", background: "#FFD6C2" },
    water: { primary: "#1E90FF", background: "#D0EFFF" },
    grass: { primary: "#228B22", background: "#D2F8D2" },
    electric: { primary: "#DAA520", background: "#FFFACD" },
    ice: { primary: "#00CED1", background: "#D0F0FD" },
    fighting: { primary: "#C03028", background: "#FFB3B3" },
    poison: { primary: "#7B3F99", background: "#E8D0F8" },
    ground: { primary: "#8B4513", background: "#F1E3D3" },
    flying: { primary: "#4D79FF", background: "#E0EBFF" },
    psychic: { primary: "#FF1493", background: "#FFC9DE" },
    bug: { primary: "#7BAF3A", background: "#D0F4DE" },
    rock: { primary: "#A0522D", background: "#E5D3B3" },
    ghost: { primary: "#6A5ACD", background: "#D6D6FF" },
    dragon: { primary: "#7038F8", background: "#CAB8FF" },
    dark: { primary: "#3C3C3C", background: "#A1A1A1" },
    steel: { primary: "#708090", background: "#D3D3D3" },
    fairy: { primary: "#FF69B4", background: "#FDC5F5" },
  };

  return (
    <div className="pokemon-bg">
      <div className="container" style={{ maxWidth: "1000px" }}>
        <Link to="/" className="close-btn" aria-label="Cerrar">
          &times;
        </Link>

        <div className="p-5 text-center ">
          <h1
            className="pokemon-title"
            style={{
              color: typeColors[pokemon.types[0].type.name]?.primary || "#000",
            }}
          >
            #{String(id).padStart(3, "0")} - {pokemon.name}
          </h1>

          <div className="row align-items-center justify-content-center">
            <div className="col-md-6 text-center mb-4">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="img-fluid p-0 evo-hover"
                style={{ maxWidth: "300px" }}
              />
            </div>

            <div className="col-md-6 d-flex flex-column gap-3">
              <h5 className="text-muted fs-5 fst-italic lh-base text-start">
                {description}
              </h5>

              <div className="d-flex flex-column gap-2 text-start text-capitalize">
                <div className="d-flex gap-2">
                  <span className="text-secondary">Altura:</span>
                  <span>{height} cm</span>
                </div>
                <div className="d-flex gap-2">
                  <span className="text-secondary">Peso:</span>
                  <span>{weight} kg</span>
                </div>
                <div className="d-flex gap-2">
                  <span className="text-secondary ">Hábitat:</span>
                  <span>{habitat || "Desconocido"}</span>
                </div>
              </div>

              <div className="d-flex gap-2 flex-wrap mt-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="badge text-capitalize"
                    style={{
                      backgroundColor:
                        typeColors[t.type.name]?.primary || "#000",
                      color: "#fff",
                      padding: "0.6rem 1.2rem",
                      fontSize: "1rem",
                      borderRadius: "999px",
                      boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                    }}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h4 className=" text-uppercase">Estadisticas</h4>
            <div className="d-flex justify-content-center gap-3 flex-wrap mt-4 px-2">
              {pokemon.stats.map((stat) => (
                <div
                  key={stat.stat.name}
                  className="text-center"
                  style={{ width: "70px" }}
                >
                  <small className="fw-bold">{stat.base_stat}</small>
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "4px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        height: `${Math.min(stat.base_stat, 100)}%`,
                        width: "100%",
                        backgroundColor:
                          typeColors[pokemon.types[0].type.name]?.primary ||
                          "#4caf50",
                        borderRadius: "4px 4px 0 0",
                        transition: "height 0.5s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <small
                    className="text-capitalize mt-2 d-block"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {stat.stat.name.replace("special-", "Sp. ")}
                  </small>
                </div>
              ))}
            </div>
          </div>

          {evolutions.length > 1 && (
            <div className="mt-5">
              <h4 className="mb-4 text-uppercase">Cadena Evolutiva</h4>
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                {evolutions.map((evo, index) => (
                  <div
                    key={evo.name}
                    className="d-flex align-items-center mb-3"
                  >
                    <div
                      className="text-center p-2 evo-poke"
                      style={{ width: "150px" }}
                    >
                      <img
                        src={evo.image}
                        alt={evo.name}
                        className="img-fluid mb-2 evo-hover"
                        style={{ height: "120px", objectFit: "contain" }}
                      />
                      <h6 className="text-capitalize">{evo.name}</h6>
                    </div>
                    {index < evolutions.length - 1 && (
                      <span className="fs-3 mx-2 d-none d-sm-inline">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
