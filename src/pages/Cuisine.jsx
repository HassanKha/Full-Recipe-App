import React, { useEffect } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import {Link,useParams} from "react-router-dom"
import { useState } from 'react'


function Cuisine() {

const params = useParams()

    const [cuisine , setCuisine] = useState([])

    const getCuisine = async (name) => {
    
    const data = await fetch( `https://api.spoonacular.com/recipes/complexSearch?apiKey=4a1248731f8c49a09daef05f234b6252&cuisine=${name}`)
    const recipes = await data.json();
    setCuisine(recipes.results);
    }

    useEffect(()=>{
     getCuisine(params.type)
    },[params.type])

  return (
    <Grid
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity:0}}
    transition={{duration: 0.5}}
    >
        {
            cuisine.map((item)=>{
                return (
                    <Link to={"/Recipe/"+item.id}>
                    <Card key={item.id}>
                       <img src={item.image} alt={item.title} />
                       <h4>{item.title}</h4>
                    </Card>
                    </Link>
                )
            })
        }
    </Grid>
  )
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(15rem,1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img{
        width:100%;
        border-radius: 2rem;

    }
    a{
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`

export default Cuisine