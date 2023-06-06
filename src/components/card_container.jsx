import Cards from "./card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { useEffect, useState } from "react";
import SOAPrequest from "./SOAP";
import Countries_list from "./countries";
export default function Card_container() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(10);
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100"
      );
      setPokemon(response.data.results);
    };
    request();
    SOAPrequest()

  }, []);

  const pages = [];
  for (
    let index = 0;
    index < Math.ceil(pokemon.length / pokemonPerPage);
    index++
  ) {
    pages.push(
      <Pagination.Item
        key={index}
        active={index + 1 === currentPage}
        onClick={() => {
          setCurrentPage(index + 1);
        }}
      >
        {index + 1}
      </Pagination.Item>
    );
  }
  const renderPagesNumbers = pages.map((number) => {
    return <li key={number}>{number}</li>;
  });
  const renderPokemon = (pokemon) => {
    return pokemon.map((e, index) => {
      return (
        <Col key={index}>
          <Cards name={e.name} url={e.url} />
        </Col>
      );
    });
  };

  return (
    <Container>
      <Row sm={3}>
        {pokemon.length > 0 ? (
          renderPokemon(currentPokemon)
        ) : (
          <h1>Cargando...</h1>
        )}
      </Row>
      <Row>
        <Pagination>{pages}</Pagination>
      </Row>
      <div>
        <Countries_list/>
      </div>
    </Container>
  );
}
