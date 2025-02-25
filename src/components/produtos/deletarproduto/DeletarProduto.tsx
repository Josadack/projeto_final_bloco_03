import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Produto from "../../../model/Produto"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"



function DeletarProduto() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{id: string}>()

    async function buscarPorId(id:string) {
        try {
            await buscar(`/produtos/${id}`, setProduto)
        } catch (error:any) {
            if(error.toString()){

            }
        }
    }

    //Fazer um breve comentario
    useEffect(() => {
        if(id !== undefined){
            buscarPorId(id)
        }
    },[id])


    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`)
            alert(`${produto.nome} apagado com sucesso!`)
        } catch (error:any) {
            if (error.toString()){

            }else{
                alert('Erro ao deletar o Produto ')
            }
        }
        
        setIsLoading(false)
        retornar();
    }

    function retornar(){
        navigate('/produtos')
    }


  return (
    <div className="container w-1/3 mx-auto">
        <h1 className="text-4xl text-center my-4">Deletar Produto </h1>

        <p className="text-center font-semibold"> Você tem certeza de que deseja apagar o <span className="hover:underline font-semibold animate-spin text-red-900">Produto</span> a seguir? </p>
       
        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
            <header className="py-2 px-6 bg-gray-900 text-blue-50 font-bold text-2xl">
                Produto
            </header>

            <div className="p-4">
                <img src={produto.foto} alt={produto.nome} />
                <p className="text-xl">{produto.nome}</p>
                <p className="text-green-700">R$ {produto.preco}</p>
                
            </div>

            <div className="flex">
                <button 
                className="text-slate-100 bg-red-400 hover:bg-red-700 w-full py-2"
                onClick={retornar}>
                    Não
                </button>
                <button 
                className="w-full text-slate-100 bg-gray-700 hover:bg-gray-950"
                onClick={deletarProduto}>
                   {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeletarProduto