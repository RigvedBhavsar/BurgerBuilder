import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


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
        totalPrice : 60,
        purchasable : false,
        purchasing : false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum , el)=>{
                return sum + el; 
            },0);
        this.setState({purchasable : sum >0});
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler= ()=> {
        this.setState({purchasing:true});
    } 

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
        alert('you continue');
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
                <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients ={this.state.ingredients}
                        price = {this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued ={this.purchaseContinueHandler} />
                
                </Modal>
                
                <Burger ingredients={this.state.ingredients} />
                
                <BuildControls 
                    ingredientAdded={this.addIngredienthandler}
                    ingredientRemoved ={this.removeIngredientHandler}
                    disabled ={disabledInfo}
                    purchasable  ={this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price = {this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;