import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
function Cards(props) {
    const {name,url} = props;
    const [imagePokemon,setImagePokemon] = useState()
    useEffect(()=>{
      const request=async()=>{
        const response = await axios.get(url)
        setImagePokemon(response.data.sprites.front_default)
      }
      request()
    },[url])
  return (
    <Card style={{ width: "22rem"}}>
      <Card.Img variant="top" src={`${imagePokemon}`} className="img-fluid" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        
        
      </Card.Body>
    </Card>
  );
}
Cards.propTypes={
  name:PropTypes.string.isRequired,
  url:PropTypes.string.isRequired

}

export default Cards;
