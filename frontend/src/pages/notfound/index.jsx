import Cabecalho from '../../components/cabecalho'
import './index.scss';
import Rodape from '../../components/rodape'


export default function NotFound(){

    return(
        <div className="notfound">
            <Cabecalho/>
                <div className="centro">
                    <h1>Pagina não encontrada!!</h1>
                    <img src="/assets/images/notFound.jpeg" alt="notfound" />
                </div>
            <Rodape/>
        </div>
    )
}