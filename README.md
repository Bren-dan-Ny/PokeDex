# Pokedex - Proyecto Hackaton 17

Este proyecto es una Pokédex desarrollada como parte de la Hackaton 17. Permite a los usuarios explorar información sobre diferentes Pokémon, incluyendo detalles como tipos, habilidades, estadísticas y evoluciones.

---

## ✅ Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Git](https://git-scm.com/) (opcional pero recomendado)
- Un terminal o consola (CMD, PowerShell, Bash, etc.)

---

## ⚙️ Instalación y Uso

1. **Clona el repositorio o descarga el ZIP**:

   ```bash
   git clone https://github.com/Bren-dan-Ny/PokeDex.git
   cd PokeDex
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

4. **Abre en tu navegador**
   [http://localhost:5173](http://localhost:5173)

---

## 🚀 Tecnologías Utilizadas

- **React** – Librería para construir interfaces de usuario.
- **Vite** – Herramienta rápida para desarrollo con React.
- **Bootstrap 5** – Framework CSS para diseño responsivo.
- **PokeAPI** – API pública para obtener información de Pokémon.
- **CSS / Sass** – Estilizado personalizado.

---

## 📁 Estructura del Proyecto

```
/src
├── /components     # Componentes reutilizables (Navbar, Pagination, etc.)
├── /pages          # Páginas principales (Home, PokemonDetail, etc.)
├── /services       # Funciones para consumir APIs externas (pokeApi.js, etc.)
├── /styles         # Archivos CSS y Sass personalizados
├── /assets         # Imágenes y logos como pokelogo.png
├── App.jsx         # Componente principal
└── main.jsx        # Entrada principal del proyecto
```
