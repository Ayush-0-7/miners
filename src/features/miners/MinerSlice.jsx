import { createSlice } from "@reduxjs/toolkit";
const initialState={
   bombs:0,
   amount:0,
   multiplier:1.02,
   portal:false,
   balance:localStorage.getItem("balances"),
   gamecount:0,
   investedAmount:0,
   start:false
}
const Miners = createSlice({
    name:"miners",
    initialState,
    reducers:{
        changeBomb:(state,action)=>{
            const bombs = action.payload.bombs 
            state.bombs = bombs
        },
        changeAmount:(state,action)=>{
           state.amount = action.payload.amount;
        },
        changeMultiplier:(state,action)=>{
            state.amount=state.amount*state.multiplier
            state.multiplier = action.payload.multiplier;
        },
        isportal:(state,action)=>{
            state.portal = action.payload.isportal;
        },
        changebalance:(state,action)=>{
            const bal = action.payload.balance;

            state.balance = bal ;
        },
        changegamecount: (state,action) => {
            state.gamecount = action.payload.count
        },
        changeinvestedAmount:(state,action) => {
            state.investedAmount = action.payload.invest;
        },
        changestart:(state,action) => {
            state.start = action.payload.start;
        }

    }
})
export const {changeBomb , changeAmount ,changegamecount, isportal , changebalance , changeMultiplier , changeinvestedAmount , changestart } = Miners.actions
export default Miners.reducer;