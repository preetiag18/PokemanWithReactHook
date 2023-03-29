import axios from "axios";
import React, { useState, useEffect } from "react";
import classes from "./Pokelist.module.css";
import Card from "./Card";

const Pokelist = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((res) => {
        console.log("Hello");
        const fetches = res.data.results.map((p) => {
          return axios.get(p.url).then((res) => res.data);
        });
        Promise.all(fetches).then((res) => {
          setData(res);
          setIsLoading(false);
        });
      });
  }, []);

  return (
    <div className={classes.cards}>
      {data.map((card) => (
        <Card
          key={card.name}
          name={card.name}
          image={card.sprites.other["official-artwork"].front_default}
        />
      ))}
    </div>
  );
};

export default Pokelist;
