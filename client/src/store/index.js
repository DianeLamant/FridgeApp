import React from 'react';

export const initialState = {
    isLogged: false,
    token: '',
    user: {},
    fridge: {}, 
    filterValue: 0,
    foods: {}
}

export function reducer(state, action) {
    switch (action.type) {
        case 'setIsLogged':
            return {
                ...state,
                isLogged: action.payload.isLogged
            };
        case 'setToken': 
            return {
                ...state,
                token: action.payload.token
            }
        case 'setUser': 
            return {
                ...state,
                user: action.payload.user
            }
        case 'setFridge': 
            return {
                ...state,
                fridge: action.payload.fridge
            }
        case 'setFilterValue': 
            return {
                ...state,
                filterValue: action.payload.filterValue
            }
        case 'setFoods': 
            return {
                ...state,
                foods: action.payload.foods
            }
        default: 
            throw new Error();
    }
}

export const GlobalState = React.createContext();