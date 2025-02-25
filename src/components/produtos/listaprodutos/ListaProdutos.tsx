import { useEffect, useState } from "react";
import CardProdutos from "../cardprodutos/CardProdutos";
import Produto from "../../../model/Produto";
import { buscar } from "../../../services/Service";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


function ListaProdutos() {

    const [produtos, setProdutos] = useState<Produto[]>([])

    async function buscarprodutos() {
        try {
            await buscar ('produtos', setProdutos,)

        } catch (error) {
            
        }
    }
    useEffect(() => {
        buscarprodutos()
    }, [produtos.length])
    return (
        <>

         {produtos.length === 0 && (
                 <DotLottieReact
                 src="https://lottie.host/f3af32aa-947a-4fa1-aa57-d121f66bf81e/f8XwJwEdhS.lottie"
                 loop
                 autoplay
               />
            )}
            <div className="flex justify-center w-full my-4">

                <div className="container flex flex-col mx-2">

                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 
                        lg:grid-cols-3 gap-4'>
                            {produtos.map((produto: Produto) => (
                                <CardProdutos key={produto.id} produto={produto}/> 
                            ))}
                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaProdutos