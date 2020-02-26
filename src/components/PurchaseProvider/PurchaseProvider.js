import React, { useReducer } from 'react'
import PostContext from '../../contexts/PurchaseContext'
import { FETCH_PURCHASES_REQUEST, FETCH_PURCHASES_SUCCESS, FETCH_PURCHASES_FAILURE, REMOVE_PURCHASES_CONFIRM, REMOVE_PURCHASES_CANCEL, REMOVE_PURCHASES_REQUEST, REMOVE_PURCHASES_SUCCESS,REMOVE_PURCHASES_FAILURE, EDIT_PURCHASE_CANCEL, EDIT_PURCHASE_EXISTING, EDIT_PURCHASE_FAILURE, EDIT_PURCHASE_FIELD_CHANGE, EDIT_PURCHASE_REQUEST, EDIT_PURCHASE_SUCCESS, GET_DESCRIPTION_BY_ID_FAILURE, GET_DESCRIPTION_BY_ID_REQUEST, GET_DESCRIPTION_BY_ID_CANCEL, GET_DESCRIPTION_BY_ID_SUCCSES } from '../../actions/actionsTypes'



const initialState = {
    purchases: {
        purchase: [],
        loading: false,
        error: null,
    },
    removedPurchase:{
        id: 0,
        loading: false,
        error: null,
    },
    editedPurchase:{
        item:{
            id: 0,
            category: 'Авто',
            amount: '',
            description: '',
        },
        loading: false,
        error: null
    },
    descriptionPurchase:{
        id: 0,
        description: '',
        loading: false,
        error: null,
        hide: true
    }
}


function postReducer(prevPurchases, action){
    switch(action.type){
        case FETCH_PURCHASES_REQUEST:
            return {...prevPurchases, loading: true, error: null}
        case FETCH_PURCHASES_SUCCESS:
            return {...prevPurchases, purchase: action.payload.purchase,  loading: false, error: null}
        case FETCH_PURCHASES_FAILURE:
            return {...prevPurchases, loading: false, error: action.payload.error}
        default: 
            return prevPurchases
    }
}


function purchaseRemoveReducer(prevPurchase, action){
    switch(action.type){
        case REMOVE_PURCHASES_CONFIRM:
            return {id: action.payload.id, loading: false, error: null};
        case REMOVE_PURCHASES_CANCEL:
            return {id: 0, loading: false, error: null};
        case REMOVE_PURCHASES_REQUEST:
            return {...prevPurchase, loading: true, error: null};
        case REMOVE_PURCHASES_SUCCESS:
            return {id: 0, loading: false, error: null};
        case REMOVE_PURCHASES_FAILURE:
            return {...prevPurchase, loading: false, error: action.payload.error}
        default:
            return prevPurchase;
        
    }
}

function purchaseEditReducer(prevPurchase, action){
    switch(action.type){
        case EDIT_PURCHASE_FIELD_CHANGE:
            return {...prevPurchase, item: {...prevPurchase.item, [action.payload.name]:action.payload.value }}
        case EDIT_PURCHASE_EXISTING:
            return {item: {...action.payload.item}, loading: false, error: null}
        case EDIT_PURCHASE_CANCEL:
            return {
                item: {id:0 ,category: 'Авто', amount: '', description: '' },
                loading: false,
                error: null
            }
        case EDIT_PURCHASE_REQUEST:
            return{
                ...prevPurchase,
                loading: true,
                error: null
            }
        case EDIT_PURCHASE_SUCCESS:
                return {
                    item: {id:0 ,category: 'Авто', amount: '', description: '' },
                    loading: false,
                    error: null
                }
        case EDIT_PURCHASE_FAILURE:
            return{
                ...prevPurchase,
                loading: false,
                error: action.payload.error
            }
        default:
            return prevPurchase
    }
}

function descriptionPurchasesReducer (prevDescription, action){
    switch(action.type){
        case GET_DESCRIPTION_BY_ID_REQUEST:
            return {...prevDescription, id: action.payload.id, loading: true, error: null}
        case GET_DESCRIPTION_BY_ID_SUCCSES:
            return {
                id: action.payload.id,
                description: action.payload.description,
                loading: false,
                error: null,
                hide: false
            }
        case GET_DESCRIPTION_BY_ID_FAILURE:
            return {...prevDescription, loading: false, error: action.payload.error, hide: true}
        case GET_DESCRIPTION_BY_ID_CANCEL:
            return {...prevDescription, loading: false, error: null, hide: true }
        default:
            return prevDescription
    }
}


function reducer (prevState, action){
    switch(action.type){
        case FETCH_PURCHASES_REQUEST:
        case FETCH_PURCHASES_SUCCESS:
        case FETCH_PURCHASES_FAILURE:
            return {...prevState, purchases: postReducer(prevState.purchases, action)};
        case REMOVE_PURCHASES_CONFIRM:
        case REMOVE_PURCHASES_CANCEL:
        case REMOVE_PURCHASES_REQUEST:
        case REMOVE_PURCHASES_SUCCESS:
        case REMOVE_PURCHASES_FAILURE:
            return{...prevState, removedPurchase: purchaseRemoveReducer(prevState.removedPurchase, action)};
        case EDIT_PURCHASE_CANCEL:
        case EDIT_PURCHASE_EXISTING:
        case EDIT_PURCHASE_FAILURE:
        case EDIT_PURCHASE_FIELD_CHANGE:
        case EDIT_PURCHASE_REQUEST:
        case EDIT_PURCHASE_SUCCESS:
            return{...prevState, editedPurchase: purchaseEditReducer(prevState.editedPurchase, action) }
            case GET_DESCRIPTION_BY_ID_REQUEST:
            case GET_DESCRIPTION_BY_ID_SUCCSES:
            case GET_DESCRIPTION_BY_ID_FAILURE:
            case GET_DESCRIPTION_BY_ID_CANCEL:
            return{...prevState, descriptionPurchase: descriptionPurchasesReducer(prevState.descriptionPurchase, action)}
        default: 
        return prevState
    }
}


export default function PurchaseProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            <PostContext.Provider value={{state, dispatch}}>
                {props.children}
            </PostContext.Provider>
        </div>
    )
}
