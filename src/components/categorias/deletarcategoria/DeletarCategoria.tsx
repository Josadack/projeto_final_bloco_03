
import { useState, useEffect } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import Categoria from "../../../model/Categoria"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"



function DeletarCategoria() {

    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [categoria, setCategoria] = useState<Categoria>( {} as Categoria)

    const { id } = useParams<{ id: string }>()

     async function buscarPorId(id: string) {

              try {
                  await buscar(`/categorias/${id}`, setCategoria )

              } catch (error: any) {

                  if(error.toString().includes('401')){
                    
                  }
              }
          }

    useEffect(() => {
     if (id !== undefined) {
            buscarPorId(id)
                 }
    }, [id])


    async function deletarCategoria() {
        setIsLoading(true)

        try {
           
            await deletar(`/categorias/${id}`,)
            ToastAlerta('Categoria apagado com sucesso','sucesso')

        } catch (error: any) {
            if(error.toString().includes('401')){
        }else{
            ToastAlerta('Erro ao excluir Categoria', 'erro')
        }
     }

      setIsLoading(false)
      retornar()
    }


    function retornar(){
        navigate('/categorias')
    }

  return (
    <div className='container w-1/3 mx-auto'>
    <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
    <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar o tema a seguir?</p>
    <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header 
            className='py-2 px-6 text-slate-100 bg-gray-800 font-bold text-2xl'>
                   Categoria      
             </header>
        <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.nome}  </p>
        <div className="flex">
            <button 
                className='text-slate-100 bg-red-400  hover:bg-red-500 w-full py-2'
                onClick={retornar}>
                Não
            </button>
            <button 
                className='w-full text-slate-100 bg-gray-800 hover:bg-cyan-950 flex items-center justify-center'
                           onClick={deletarCategoria}>
               {isLoading ?
               <RotatingLines
               strokeColor="white"
               strokeWidth="5"
               animationDuration="0.75"
               width="24"
               visible={true}
                />
                        :
                        <span>sim</span>
                                               }
            </button>
        </div>
    </div>
</div>
  )
}

export default DeletarCategoria