import Popup from 'reactjs-popup';
import FormProdutos from '../formprodutos/FormProdutos';
import 'reactjs-popup/dist/index.css';
import './ModalProduto.css'


function ModalProduto() {
  return (
   
    <>
        <Popup
            trigger={
                <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-gray-700 rounded hover:bg-white group py-1.5 px-2.5">
              <span className="w-56 h-48 rounded bg-gray-950 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-amber-100 transition-colors duration-300 ease-in-out group-hover:text-white">Novo Produto</span>
           </button>
            }
            modal
            >
                <FormProdutos />
        </Popup>
    
    </>
  )
}

export default ModalProduto