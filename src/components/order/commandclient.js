import React from 'react'
import Input from '../input/Input' 

const ComandClient = (props) => {

    return (
        <>
            <div>Resumo</div>
            <form>
            <Input type='text' value={props.valueName} placeholder='Nome do cliente' onChange={props.nameClient}/>
            <Input type='number' value={props.valueTable} placeholder='Número da mesa' onChange={props.numberTable}/>
            </form>
            <div>
            <span>Produto </span>
            <span> Quantidade </span>
            <span> Deletar </span>
            <span> Preço</span>
            </div>
        </>
    )
}

export default ComandClient;