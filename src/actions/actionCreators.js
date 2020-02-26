import { FETCH_PURCHASES_REQUEST, FETCH_PURCHASES_SUCCESS, FETCH_PURCHASES_FAILURE, REMOVE_PURCHASES_FAILURE, REMOVE_PURCHASES_SUCCESS, REMOVE_PURCHASES_REQUEST, REMOVE_PURCHASES_CANCEL, REMOVE_PURCHASES_CONFIRM, EDIT_PURCHASE_FIELD_CHANGE, EDIT_PURCHASE_REQUEST, EDIT_PURCHASE_FAILURE, EDIT_PURCHASE_SUCCESS, EDIT_PURCHASE_EXISTING, EDIT_PURCHASE_CANCEL, GET_DESCRIPTION_BY_ID_REQUEST, GET_DESCRIPTION_BY_ID_FAILURE, GET_DESCRIPTION_BY_ID_SUCCSES, GET_DESCRIPTION_BY_ID_CANCEL } from "./actionsTypes";

const api = 'https://context-crud.herokuapp.com/api'

export async function getPurchases(dispatch){

        dispatch(fetchPurchasesRequest())
        try{
            const response = await fetch(`${api}/purchases`)
            if(!response.ok){
                throw new Error();
            }
            const purchases = await response.json()
            dispatch(fetchPurchasesSuccess(purchases))
            
        }
        catch(error){
            dispatch(fetchPurchasesFailure(error));
            throw error
        }
} 

export function fetchPurchasesRequest(){
    return {
        type: FETCH_PURCHASES_REQUEST,
        payload: {},
    }
}

export function fetchPurchasesSuccess(purchase){
    return {
        type: FETCH_PURCHASES_SUCCESS,
        payload: {purchase},
    }
}

export function fetchPurchasesFailure(error){
    return {
        type: FETCH_PURCHASES_FAILURE,
        payload: {error},
    }
}

//removePurchase

export async function removePurchaseById(dispatch, id){
    dispatch(removePurchaseRequest());
    try{
        const response = await fetch(`${api}/purchases/${id}`,{
            method: 'DELETE'
        });
        if(!response.ok){
            throw new Error();
        }
        dispatch(removePurchaseSuccess());
    }catch(e){
        dispatch(removePurchaseFailure(e));
        throw e;
    }
}

export function removePurchaseConfirm(id){
    return{
        type: REMOVE_PURCHASES_CONFIRM,
        payload: {id},
    }
}

export function removePurchaseCancel(){
    return {
        type: REMOVE_PURCHASES_CANCEL,
        payload: {},
    }
}

export function removePurchaseRequest(){
    return {
        type: REMOVE_PURCHASES_REQUEST,
        payload:{},
    }
}

export function removePurchaseSuccess(){
    return{
        type: REMOVE_PURCHASES_SUCCESS,
        payload: {},
    };
}

export function removePurchaseFailure(error){
    return{
        type: REMOVE_PURCHASES_FAILURE,
        payload:{
            error
        }
    }
}


//change


export async function editPurchase(dispatch, item){
   dispatch(editPurchasesRequest())
   try{
       const response = await fetch(`${api}/purchases`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(item)
       })
       if(!response.ok){
           throw new Error()
       } 
       dispatch(editPurchasesSucces())
   }catch(e){
        dispatch(editPurchasesFailure(e))
        throw e
   }
}
export function editPurchasesSucces(){ //ok
    return{
        type: EDIT_PURCHASE_SUCCESS,
        payload:{}
    }
}

export function editPurchasesFailure(error){ //ok
    return{
        type: EDIT_PURCHASE_FAILURE,
        payload:{
            error
        }
    }
}
export function editPurchasesRequest(){ //ok
    return{
        type: EDIT_PURCHASE_REQUEST,
        payload:{}
    }
}
export function editPurchaseChangeField(name, value){ //ok
    return {
        type: EDIT_PURCHASE_FIELD_CHANGE,
        payload: {name, value}
    }
}


export function editPurchaseExisting(item){ //ok
    return {
        type: EDIT_PURCHASE_EXISTING,
        payload: {item}
    }
}
export function editPurchaseCancel(){ //ok
    return {
        type: EDIT_PURCHASE_CANCEL,
        payload: {}
    }
}
// description


export function getDescriptionByIdRequest (id){
    return {
        type: GET_DESCRIPTION_BY_ID_REQUEST,
        payload: {id}
    }
}
export function getDescriptionByIdFailure (error){
    return {
        type: GET_DESCRIPTION_BY_ID_FAILURE,
        payload: {
            error
        }
    }
}

export function getDescriptionByIdSuccess (description, id){
    return {
        type: GET_DESCRIPTION_BY_ID_SUCCSES,
        payload: {description, id}
    }
}

export function getDescriptionByIdCancel(){
    return{
        type: GET_DESCRIPTION_BY_ID_CANCEL,
        payload: {}
    }
}

export async function getDescriptionById (dispatch, id){
    dispatch(getDescriptionByIdRequest(id))
    try{
        const response = await fetch(`${api}/purchases/${id}`)
    if(!response.ok){
        throw new Error()
    }
    const purchase = await response.json()
    const [{description}] = purchase
    dispatch(getDescriptionByIdSuccess(description, id))
    }catch(error){
        dispatch(getDescriptionByIdFailure(error))
        throw error
    }
}