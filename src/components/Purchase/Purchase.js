import React from 'react'
import { useContext } from 'react'
import PurchaseContext from '../../contexts/PurchaseContext'
import Loader from '../Loader/Loader'
import { removePurchaseConfirm, removePurchaseById, getPurchases, removePurchaseCancel, removePurchaseFailure, editPurchaseExisting, getDescriptionByIdCancel, getDescriptionById, getDescriptionByIdFailure } from '../../actions/actionCreators'


export default function Purchase({ purchaseItem }) {
    const { state: { removedPurchase, descriptionPurchase }, dispatch } = useContext(PurchaseContext)


    const handleRemove = evt => {
        evt.preventDefault()
        dispatch(removePurchaseConfirm(purchaseItem.id))
    }

    const handleRemovePrecess = async evt => {
        evt.preventDefault();
        try {
            await removePurchaseById(dispatch, purchaseItem.id)
            await getPurchases(dispatch)
        } catch (e) {
            dispatch(removePurchaseFailure(e))
        }
    }

    const handleEdit = evt => {
        evt.preventDefault();
        dispatch(editPurchaseExisting(purchaseItem))
    }

    const handleCancel = async evt => {
        evt.preventDefault()
        dispatch(removePurchaseCancel())

    }

    const handleCancelDesc = evt => {
        evt.preventDefault()
        dispatch(getDescriptionByIdCancel())
    }

    const handleProcessDesc = async evt => {
        evt.preventDefault()
        try {
            await getDescriptionById(dispatch, purchaseItem.id)
        } catch (e) {
            dispatch(getDescriptionByIdFailure(e))
        }
    }

    const handleShowDescription = async evt => {
        evt.preventDefault();
        try {
            await getDescriptionById(dispatch, purchaseItem.id)
        } catch (e) {
            dispatch(getDescriptionByIdFailure(e))
        }
    }

    const getDescription = () => {
        if (descriptionPurchase.id !== purchaseItem.id) {
            return (
                <>
                    <button onClick={handleShowDescription}>Показать описание</button>
                </>
            )
        }

        if (descriptionPurchase.loading) {
            return <Loader />
        }

        if (descriptionPurchase.error) {
            return (
                <div>
                    Ошибка загрузки описания, повторить?
                <button onClick={handleProcessDesc}>Да</button>
                    <button onClick={handleCancelDesc}>Нет</button>
                </div>
            )
        }

        const { description } = descriptionPurchase;
        return (
            <div>
                Описание: {description}
            </div>
        )
    }

    const getFooter = () => {
        if (removedPurchase.id !== purchaseItem.id) {
            return (
                <div>
                    <button onClick={handleEdit}>✎</button>
                    <button onClick={handleRemove}>✘</button>
                </div>
            )
        }
        if (removedPurchase.loading) {
            return <Loader />
        }
        if (removedPurchase.error) {
            return (
                <div>
                    Произошла ошибка. Повторить?
                <button onClick={handleRemovePrecess}>Да</button>
                    <button onClick={handleCancel}>Нет</button>
                </div>
            )
        }
        return (
            <div>
                Вы уверены, что хотите удалить покупку?
            <button onClick={handleRemovePrecess}>Да</button>
                <button onClick={handleCancel}>Нет</button>
            </div>
        )
    }
     
    return (
        <div>
            <div className="Purchase" >
                <p>Категория: {purchaseItem.category}</p>
                <p>Сумма: {purchaseItem.amount}</p>
            </div>
            {getFooter()}
            {getDescription()}
        </div>  
    )
}
