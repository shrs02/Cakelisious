import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logged : false,
    userInfo : null,
    cart:null,
    carti:[],
    custom:[],
    total:0,
}

const ASlice = createSlice({
    name:"log",
    initialState,
    reducers:{
        login: (state,action)=>{
            state.logged = true;
            state.userInfo = action.payload.user;
            state.cart=action.payload.curr;
            console.log(state);
        },
        logout: (state)=>{
            state.logged = false;
            state.userInfo=null;
            state.cart=null;
            state.carti=[];
            state.custom=[];
            state.total=0;
        },
        setCart:(state,action)=>{
            console.log(action);
            const curr=action.payload;
            return{
                ...state,
                carti:curr,
            }
        },
        setCust:(state,action)=>{
            console.log(action);
            const cust=action.payload;
            return{
                ...state,
                custom:cust,
            }
        },
        setTot:(state,action)=>{
            console.log(action);
            const cust = state.total + action.payload;
            return{
                ...state,
                total:cust,
            }
        }
    }
})


export const {login, logout,setCart,setCust,setTot} = ASlice.actions;

export default ASlice.reducer;