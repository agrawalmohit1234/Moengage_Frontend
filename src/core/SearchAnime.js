import React, { useState } from "react";
import MovieCard from "./AnimeCard";

export default function SearchMovie() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const SearchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const url = `https://api.jikan.moe/v3/search/anime?q=${query}&page=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={SearchMovies}>
        <label className="label" htmlFor="query">
          Anime Name:
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Search an Anime"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button">Search</button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.title)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.mal_id} />
          ))}
      </div>
    </>
  );
}
