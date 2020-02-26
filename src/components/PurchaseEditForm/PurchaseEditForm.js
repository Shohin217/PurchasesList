import React, { useContext } from 'react'
import PurchaseContext from '../../contexts/PurchaseContext'
import { getPurchases, editPurchaseChangeField, editPurchaseCancel, editPurchase, editPurchasesFailure } from '../../actions/actionCreators'
import Loader from '../Loader/Loader'

export default function PurchaseEditForm() {
    const { state: { editedPurchase }, dispatch } = useContext(PurchaseContext)
    const handleSubmit = async evt => {
        evt.preventDefault();
        try {
            await editPurchase(dispatch, editedPurchase.item)
            await getPurchases(dispatch)
        } catch (e) {
            dispatch(editPurchasesFailure(e))
            throw e
        }
    }

    const handleCancel = evt => {
        dispatch(editPurchaseCancel())
    }

    const handleChange = evt => {
        const { target: { name, value } } = evt
        dispatch(editPurchaseChangeField(name, value))
    }
    const getFooter = () => {
        if (editedPurchase.loading) {
            return <Loader />
        }
        if (editedPurchase.error) {
            return (
                <>
                    Произошла ошибка, повторить?
                    <button>Да</button>
                    <button type='reset'>Отменить</button>
                </>
            )
        }
        return (
            <>
                <button>{editedPurchase.item.id === 0 ? 'Добавить' : 'Сохранить'}</button>
                <button type='reset'>Отменить</button>
            </>
        )
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleCancel} className='clearfix'>
            <div className='inputForms'>
                <select onChange={handleChange} name="category" value={editedPurchase.item.category}>
                    <option value="Авто">Авто</option>
                    <option value="Путешествие">Путешествие</option>
                    <option value="Еда">Еда</option>
                </select>
                <input placeholder='Введите сумму' onChange={handleChange} type="text" name="amount" value={editedPurchase.item.amount} />
                <textarea placeholder='Введите описание' name="description" onChange={handleChange} value={editedPurchase.item.description}></textarea>
            </div>
            <div className='Form_buttons'>
            {getFooter()}
            </div>
        </form>
    )
}
