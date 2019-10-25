import React from "react";
import "./App.css";
// import pokemonList from "./pokemon/pokemon.js";

function PokemonGo(props) {
  return (
    <div className={"pokedex"}>
      <img src={require(`./pokemon/${props.id}.png`)} alt={props.name} />
      <h2>{props.name}</h2>
      <div className={"pokemon_type"}>{props.type}</div>
      <p>HP: {props.hp}</p>
      <p>Attack: {props.attack}</p>
      <p>Defence: {props.defence}</p>
      <p>SpAttack: {props.spattack}</p>
      <p>SpDefence: {props.spdefence}</p>
      <p>Speed: {props.speed}</p>
    </div>
  );
}

const colourType = {
  Normal: "lightslategrey",
  Fairy: "pink",
  Grass: "yellowgreen",
  Poison: "mediumorchid",
  Fire: "orange",
  Electric: "yellow",
  Ground: "saddlebrown",
  Water: "deepskyblue",
  Bug: "Olive",
  Flying: "mediumturquoise"
};

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemonData: [] };
  }

  componentDidMount() {
    fetch(
      "https://us-central1-pokedex-23fb6.cloudfunctions.net/app/pokemonData"
    )
      .then(res => res.json())
      .then(data =>
        this.setState(state => {
          return { pokemonData: data };
        })
      );
  }

  render() {
    return (
      <div className={"pokemon_layout"}>
        {this.state.pokemonData.map(aPokemon => (
          <PokemonGo
            key={aPokemon.id}
            // can use this method to import the entire object
            // pokemonData={pokemon}
            id={aPokemon.id}
            name={aPokemon.name.english}
            type={aPokemon.type.map(atype => {
              const colorOfPokemonType = colourType[atype];
              return (
                <p style={{ backgroundColor: colorOfPokemonType }}>{atype}</p>
              );
            })}
            hp={aPokemon.base.HP}
            attack={aPokemon.base.Attack}
            defence={aPokemon.base.Defence}
            spattack={aPokemon.base.SpAttack}
            spdefence={aPokemon.base.SpDefence}
            speed={aPokemon.base.Speed}
          />
        ))}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <h1>Pokemon</h1>
      <p>Gotta Catch them All!</p>
      <div>
        <Pokedex />
      </div>
    </div>
  );
}

export default App;
