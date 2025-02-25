function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>
            
                <div className="container flex justify-between text-lg">
                    PharmaGo

                    <div className='flex gap-4'>
                        Produtos
                        Categorias
                        Cadastrar Categoria
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar