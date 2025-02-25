import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-gray-900 text-white'>
            
                <div className="container flex justify-between text-lg">
                <Link to='/home'  className='text-2xl font-bold'>
                        PharmaGo
                        </Link>

                        <div className="flex items-center">
            <input 
                type="text"
                 name="pesquisar" id="pesquisar" 
                 placeholder="Pesquisar... "
                 className="bg-gray-800 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 w-full shadow-xl shadow-blue-950/20"/>
                 
             <button className="bg-gray-800 text-white rounded-md py-2 px-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800 ml-1">  
                  Buscar  
            </button>
        </div>
                    <div className='flex gap-4'>
                        Produtos

                        <Link to='/categorias'  className='hover:underline'>
                        Categorias
                        </Link>

                        <Link to='/cadastrarcategoria'  className='hover:underline'>
                         Cadastrar Categorias
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar