import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Categoria from "../../../model/Categoria";
import Produto from "../../../model/Produto";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormProdutos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const [categorias, setCategorias] = useState<Categoria[]>([])//Buscar todas as categoria

    const [categoria, setCategoria] = useState<Categoria>({id: 0, nome: '',})//Retorno especifico

    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()


    async function buscarProdutoPorId(id:string) {
        try {
            await buscar(`/produtos/${id}`, setCategoria)
        } catch (error: any) {
            if(error.toString()){
            }
        }
    }
    

    async function buscarCategoriaPorID(id:String) {
        try {
            await buscar(`/categorias/${id}`, setCategoria)
        } catch (error: any) {
            if(error){
            }
        }
    }


    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias)
        } catch (error: any) {
            if(error.toString()){
            }
        }
    }

        //Fazer um breve comentario:
   useEffect(() =>{
      buscarCategorias()

      if(id !== undefined){
        buscarProdutoPorId(id)
      }
    },[id])


    //Fazser um breve comentario sobre o metodo
    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        })
    }, [categoria])
    
    //Fazer um breve comentario
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setProduto({
            ...produto,
            [e.target.value]: e.target.value,
            categoria: categoria,
        });
    }


    function retornar(){
        navigate('/produtos')
    }

    //Fazer um breve comentario
    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true)

        if(id !== undefined){
            try {
                 await atualizar('/produtos', produto, setProduto)
                 alert('Produto atualizado com sucesso!')
            
            } catch (error: any) {
                if (error.toString()) {
                    
                } else {
                    alert('Erro ao atualizar o Produto')
                } 
            }
        } else{
            try {
                await cadastrar('/produtos', produto, setProduto)
                alert('Produto Cadastrado com Sucesso!')
            } catch (error: any) {
                if(error.toString()){

                }else{
                    alert('Erro ao Casastrar o Produto')
                }
            }
        }

        setIsLoading(false);
        retornar()
    }


    const carregamentoCategoria = categoria.nome === '';

  return (
    <div className="container flex flex-col mx-auto items-center ">
        <h1 className="text-4xl text-center my-8">
            {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

        <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
            <div className="flex flex-col gap-2">
                <label htmlFor="nome">Nome do Produto</label>
                <input 
                type="text"
                placeholder="Insira aqui o nome do Produto" 
                name="nome" 
                required
                className="border-2 border-slate-700 rounded  p-2"
                value={produto.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
            </div>
           
            <div className="flex flex-col gap-2">
                <label htmlFor="preco">Preço do Produto</label>
                <input 
                type="number"
                placeholder="Adicione aqui o preço do Produto R$" 
                name="preco" 
                step="01"
                required
                className="border-2 border-slate-700 rounded  p-2"
                value={produto.preco}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
            </div>
           
            <div className="flex flex-col gap-2">
                <label htmlFor="foto">Imagem do Produto</label>
                <input 
                type="text"
                placeholder="Adicione aqui a imagem do Produto" 
                name="foto" 
                required
                className="border-2 border-slate-700 rounded  p-2"
                value={produto.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
            </div>

            <div className="flex flex-col gap-2">
                <p>Categoria</p>
                <select name="categoria" id="categoria" className="border p-2 border-slate-800 rounded"
                          onChange={(e) => buscarCategoriaPorID(e.currentTarget.value)}
                   >
                    <option value=""  selected disabled>Selecione uma Categoria</option>

                 
                     {categorias.map((categoria) => (
                           <>
                              <option value={categoria.id} >{categoria.nome}</option>
                           </>
                    ))}
                     
                
                </select>
            </div>

            <button 
                 type="submit"
                 className="rounded disabled:bg-slate-200 bg-cyan-900 hover:bg-cyan-950
                            text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                    disabled={carregamentoCategoria}
                 >
                {isLoading ?
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="25"
                      visible={true} 
                      />:
                      <span>{id !== undefined ? 'Autalizar' : 'Cadastrar'}</span>      
                }
            </button>
            
        </form>
    </div>
  )
}

export default FormProdutos