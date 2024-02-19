import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        items : [],
        count : [],
    },
    reducers : {
        itemCount : (state,action) => {
           state.count.some((val) => val.itemId === action.payload.itemId ? val.count = action.payload.count : '' ) ? 
           '' : state.count.push(action.payload)
        },
        updateAtZero : (state,action) => {
            state.count = state.count.filter((val) => val.itemId !== action.payload.itemId )
            state.items = state.items.filter((item)=> item.card.info.id  !== action.payload.itemId) 
        },
        addItem : (state,action) => {
            state.items.some((item)=> item.card.info.id  === action.payload.card.info.id) ? 
            '' : state.items.push(action.payload);
        },
        removeItem : (state,action) => {
            state.items.some((item)=> item.card.info.id  === action.payload.card.info.id) && 
            state.count.some(val => val.count < 1) ?
            state.items = state.items.filter((item)=> item.card.info.id  !== action.payload.card.info.id) : '';
        },
        clearCart : (state) => {
            state.items.length = 0;
            state.count.length = 0 ;     
        },
    }
})

export const {addItem, removeItem,clearCart,itemCount,updateAtZero} = cartSlice.actions;
export default cartSlice.reducer;