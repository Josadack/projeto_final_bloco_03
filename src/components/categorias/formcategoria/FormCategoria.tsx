import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../model/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";



function FormCategoria() {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {

        try {
            await buscar(`/categorias/${id}`, setCategoria)

        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])



    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }


    function retornar(){
         navigate('/categorias')
    }


    async function gerarNovoCategoria(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        setIsLoading(true)

        if(id !== undefined){

            try {
                
                await atualizar('/categorias', categoria, setCategoria) 
                ToastAlerta('A Categoria foi atualizado com sucesso!', 'sucesso')

            } catch (error: any) {
                if(error.toString().includes('401')){
                    
                }else{
                    ToastAlerta('Erro ao atulizar o Categoria!', 'erro')
                }
            }
           }else {
                try {
                    
                    await cadastrar ('/categorias', categoria, setCategoria)
                       ToastAlerta('A Categoria foi cadastrado com sucesso!', 'sucesso')

                } catch (error: any) {
                    if(error.toString().includes('401')){

                    }else{
                        ToastAlerta('Erro ao atulizar o tema!' , 'erro')
                    }
                }
                
            }

            setIsLoading(false)
            retornar()
        }


  return (
    
    <div className="container flex flex-col items-center justify-center mx-auto">
    <h1 className="text-4xl text-center my-8">
      {id === undefined ? 'Cadastrar Categoria': 'Atualizar Categoria'}</h1>

    <form className="w-1/2 flex flex-col gap-4" 
              onSubmit={gerarNovoCategoria}>

      <div className="flex flex-col gap-2">
         <label htmlFor="tipo">Tipo da Categoria</label>
         <input type="text" name="nome" id="tipo" placeholder="Descreva a Categoria"
          className="border-2 border-slate-700 rounded p-2"
          value={categoria.nome}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
       </div>

        
      <button type='submit'
          className='rounded text-slate-100 bg-gray-800 hover:bg-cyan-950 w-1/2 py-2 mx-auto 
                  flex justify-center'> 
                  {isLoading ?
                 <RotatingLines
                 strokeColor="white"
                 strokeWidth="5"
                 animationDuration="0.75"
                 width="24"
                 visible={true}
             /> 
                  :
                  <span> {id === undefined ? 'Cadastrar': 'Atualizar'}</span>
                  }
                  
     </button>
    </form>
     
 </div>
  ) 
}
export default FormCategoria