import React, {useState} from 'react'
import Input from '../input/Input' 

const ComandClient = (props) => {
    const [client, setClient] = useState()
    const [table, setTable] = useState()
    return (
        <>
            <div>'Resumo'</div>
            <form>
            <Input type='text' value={client} placeholder='Nome do cliente' onChange={(e) => setClient(e.target.value)}/>
            <Input type='number' value={table} placeholder='Número da mesa' onChange={(e)=> setTable(e.target.value)}/>
            </form>
            <div>
            <div>Produto</div>
            <div>Quantidade</div>
            <div>Deletar</div>
            <div>Preço</div>
            </div>
        </>
    )
}

export default ComandClient;