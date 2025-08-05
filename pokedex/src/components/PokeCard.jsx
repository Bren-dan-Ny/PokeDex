import { Link } from "react-router-dom";
import "../styles/pokecard.css";
function PokeCard({ pokemon }) {
  const {
    name,
    image,
    id,
    height,
    weight,
    habitat = "Unknown",
    stats = [],
    types = [],
    evolutions = [],
  } = pokemon;

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
    <Link
      to={`/pokemon/${pokemon.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className="card p-3 rounded-4 shadow position-relative hover-scale card-hover cursor-pointer "
        style={{
          backgroundColor: typeColors[types[0]]?.background || "#f8f8f8",

          width: "300px",
          marginTop: "5em",
          marginBottom: "3.5rem",
        }}
      >
        <div className="poke-img-hover">
          <img
            className="position-absolute start-50 translate-middle pb-5 "
            src={image}
            alt={name}
            style={{ width: "160px" }}
          />
        </div>
        <p
          className="fw-bold bg-white rounded border border-dark  text-center"
          style={{ width: "50px" }}
        >
          #{String(id).padStart(3, "0")}
        </p>

        <h4 className="text-black text-capitalize fw-bold">{name}</h4>
        <div
          style={{ fontSize: "0.75rem", color: "#484848" }}
          className="fw-bold text-capitalize"
        >
          <p className="m-0">Altura: {height} Cm</p>
          <p className="m-0">Peso: {weight} Kg</p>
          <p className="m-0">Habitat: {habitat}</p>
        </div>

        {/* habilidades y barra de progreso */}
        <div className="text-capitalize mt-2 px-3 ">
          {stats.map(({ name, value }) => (
            <div key={name}>
              <div
                className="d-flex justify-content-between fw-bold"
                style={{ fontSize: "0.76rem", color: "#484848" }}
              >
                <span>{name}</span>
                <span>{value}</span>
              </div>
              <div className="custom-progress mb-0">
                <div
                  className="custom-progress-bar"
                  role="progressbar"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 d-flex gap-2 justify-content-between">
          {types.map((type) => (
            <span
              key={type}
              className="badge text-capitalize"
              style={{
                backgroundColor: typeColors[type]?.primary || "#eee",
                color: "#fff",
                border: "1px solid #000",
                textTransform: "capitalize",
              }}
            >
              {type}
            </span>
          ))}
        </div>

        {evolutions.length > 1 && (
          <div className="mt-3">
            <ul className="list-unstyled mb-0 d-flex flex-wrap justify-content-evenly">
              {evolutions.map((evo, idx) => (
                <li
                  key={idx}
                  className="text-black text-capitalize text-center"
                >
                  <img
                    src={evo.image}
                    alt={evo.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      marginBottom: "0.7rem",
                    }}
                  />
                  <div
                    style={{ fontSize: "0.75rem", color: "#484848" }}
                    className="fw-bold"
                  >
                    {evo.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Link>
  );
}

export default PokeCard;
