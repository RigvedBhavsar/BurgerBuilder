import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENTS_PRICES ={
    salad : 10,
    cheese :15,
    meat : 20,
    bacon : 12
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 60
    }

    addIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice =this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice : newPrice , 
                ingredients : updatedIngredients});
    }

    removeIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return; 
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDecution = INGREDIENTS_PRICES[type];
        const oldPrice =this.state.totalPrice;
        const newPrice = oldPrice - priceDecution;

        this.setState({totalPrice : newPrice , 
                ingredients : updatedIngredients});
    }

    render () {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0  
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />

                <BuildControls 
                    ingredientAdded={this.addIngredienthandler}
                    ingredientRemoved ={this.removeIngredientHandler}
                    disabled ={disabledInfo}
                    price = {this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;