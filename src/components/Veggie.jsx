import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggie() {

    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
      GetVeggie();
    }, []);
  
    const GetVeggie = async () => {
  
  const check = localStorage.getItem('Veggie');
  
  if(check){
      setVeggie(JSON.parse(check));
  }
  else {
    
      const Api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=4a1248731f8c49a09daef05f234b6252&number=9&tags=vegetarian`
        );
        console.log(Api);
        const Data = await Api.json();
        console.log(Data);
        localStorage.setItem('Veggie',JSON.stringify(Data.recipes))
        setVeggie(Data.recipes);
  }
    };

  return (
    <div>
      <Wrapper>
      <h3>Our Vegetarian Picks</h3>
        <Splide options={{
            perPage:3,
            arrows:false,
            pagination:false,
            drag: "free",
            gap: "2rem",
        }
        }>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Link to={"/Recipe/"+recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title}></img>
                  <Gradient/>
                </Card>
                </Link>
                
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 12rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
 
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p{
      position: absolute;
      z-index: 10;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%,0%);
      width: 100%;
      color: white;
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
  }
`;

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`
export default Veggie;
