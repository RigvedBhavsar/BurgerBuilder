import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger =(props) => {
    return(
        <div className={classes.Buger}>
            <BurgerIngredient type ="bread-top"/>
            <BurgerIngredient type ="cheese"/>
            <BurgerIngredient type ="meat"/>
            <BurgerIngredient type ="cheese"/>
            <BurgerIngredient type ="bread-bottom"/>
        </div>
    );    
}

export default burger;