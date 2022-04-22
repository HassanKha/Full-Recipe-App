import React, { useEffect } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import {Link,useParams} from "react-router-dom"
import { useState } from 'react'


function Recipe() {

    const [recipe,Setrecipe]=useState({});
    const [activeTab,SetactiveTab]=useState("instructions");
    const params = useParams()
    const getrecipe = async (name) => {
    
        const data = await fetch( `https://api.spoonacular.com/recipes/${name}/information?apiKey=4a1248731f8c49a09daef05f234b6252&includeNutrition=false`)
        const recipes = await data.json();
        Setrecipe(recipes);
        console.log(recipes.extendedIngredients)
        }
    
        useEffect(()=>{
            getrecipe(params.name)
        },[params.name])
  return (
    <Detail>
        <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
        </div>
        <Info>
          <Button className={activeTab === 'Ingredients' ?  'active' : ''} onClick={() => SetactiveTab("instructions")}>Instructions</Button>
          <Button className={activeTab === 'instructions' ?  'active' : ''} onClick={() => SetactiveTab("Ingredients")}>Ingredients</Button>
          {activeTab === "instructions" && (
 <div>
 <h3 dangerouslySetInnerHTML={{__html:recipe.summary}}></h3>
 <h3 dangerouslySetInnerHTML={{__html:recipe.instructions}}></h3>
</div>
          )}
         
          
          {activeTab === "Ingredients" && (
 <ul>
      { recipe.extendedIngredients.map((index => (
            <li>{index.original}</li>
        )))}
       
          </ul>
          )}
       
        </Info>

    </Detail>

  )
}

const Detail = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2 {
        margin-bottom: 2rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top:2rem;
    }

`
const Button = styled.button`
padding: 1rem 2rem;
  color: #313131;
  background: white;
  border  : 2px solid black;
  margin-right: 2rem;
  font-weight: 600;

`
const Info = styled.div`
    margin-left: 10rem;
    
`

export default Recipe