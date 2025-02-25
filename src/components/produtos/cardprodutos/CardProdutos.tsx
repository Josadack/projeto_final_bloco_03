import { Link } from "react-router-dom";
import Produto from "../../../model/Produto";

interface CardProdutosProps {
    produto: Produto
}

function CardProdutos({produto}: CardProdutosProps) {  
    return (  
      
      <div className="w-[233px] h-[406px] border rounded-lg border-slate-400 flex flex-col">  

            <div className="flex justify-end mr-2 space-x-2">

                     <Link to={`/editarproduto/${produto.id}`}className="opacity-100 hover:opacity-60 hover:-translate-y-1 ">
                    <img src=
                    "https://ik.imagekit.io/oois5ivj4v/E-commece%20game/drive-download-20250117T181147Z-001/editar.png?updatedAt=1740196624560"
                     alt="editar"
                     className="w-5 h-5 mt-2"/>
                    </Link>

                    <Link to={`/deletarproduto/${produto.id}`} className="opacity-100 hover:opacity-60 hover:-translate-y-1 ">
                   <img src=
                    "https://ik.imagekit.io/oois5ivj4v/E-commece%20game/drive-download-20250117T181147Z-001/botao-apagar.png?updatedAt=1740196710896"
                     alt="editar"
                     className="w-5 h-5 mt-2"/>
                </Link>
            </div>
        
        <img  
          src={produto.foto}
          alt={produto.nome}  
          className="m-3 h-[200px] object-contain rounded-t-lg " 
        />  
        <div className=" text-center">  
          <h3 className="text-sm text-gray-900 font-semibold ">{produto?.nome}</h3> 
          <p className="text-start ml-4.5 text-sm text-red-800 text-clip line-through">R$ {(produto.preco * 1.10).toFixed(2)}</p>
          <p className="text-2xl text-green-700 font-bold">R$ {produto.preco}</p>  
          <p className="text-sm text-gray-500">Categoria: {produto.categoria?.nome}</p>  
          
        </div>  
       
        <button className="mt-5 w-full bg-gray-700 text-white py-2 px-4 rounded-b-lg hover:bg-gray-900">  
          Comprar  
        </button>  
      </div>  
    );  
  }

export default CardProdutos