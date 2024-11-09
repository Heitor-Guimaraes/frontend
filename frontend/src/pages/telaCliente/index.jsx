import './index.scss';
import Cabecalho from '../../components/cabecalho'
import Rodape from '../../components/rodape'
import { Link } from 'react-router-dom';
import CorretorPopup from '../../components/botaoPopup';
import Balao from '../../components/balaoSup';
import storage from 'local-storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ComentarioFeed from '../../components/comentario';


export default function TelaCliente() {
    const [comentario, setComentario] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('');
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [array, setArray] = useState([]);
    const idCliente = storage('cliente-logado').id; 
    const [foto, setFoto] = useState(null);
    const [nameImg, setNameImg] = useState(null);
    const [hiden, setHiden] = useState('');

    const navigate = useNavigate();

    function findHiden() {
        if (nameImg != null) {
            setHiden('0');
        } else {
            setHiden('0');
        }
    }

    async function findImg() {
        const x = await axios.get(`http://4.172.207.208:5005/findImgCliente/${idCliente}`);
        if (x.data.nm_foto != null) {
          const z = await axios.get(`http://4.172.207.208:5005/img/${x.data.nm_foto}`)
          setNameImg(z.data.url);
          console.log(nameImg);
        } else {
            setNameImg(x.data.nm_foto);
        }
       
        
    }

    function clickFoto() {
        document.getElementById("foto").click();
    }
   
    useEffect(() => {
        if(storage('cliente-logado')) {
            navigate('/telaCliente')
            const usuarioLogado = storage('cliente-logado');
            setNome(usuarioLogado.nome);
            setEmail(usuarioLogado.email);
            setTelefone(usuarioLogado.telefone); 
        }
        else {
            navigate('/loginCliente')
        }
    }, [navigate])

    function sairClick() {
        storage.remove('cliente-logado');
        navigate('/loginCliente');
    }

    function handleEditClick() {
        setShowEditPopup(true);
    }

    async function handleConfirmEdit() {
        try {

            if (foto != null) {

                const formData = new FormData();
                formData.append('img', foto);
            
                const x = await axios.post(`http://4.172.207.208:5005/multer`, formData, {
                    headers: {
                        "Content-Type": "multparts/formdata"
                    }
                });

                const z = axios.put(`http://4.172.207.208:5005/addPictureCliente/${x.data.fl}/${idCliente}`);

                setShowEditPopup(false);
                toast.success('Foto alterada!');
                
            }

            if(nome.length > 0  && email.length > 0 && telefone.length > 0 ) {
                await axios.put(`http://4.172.207.208:5005/atualizar/cliente/${encodeURIComponent(nome)}/${encodeURIComponent(email)}/${encodeURIComponent(telefone)}/${idCliente}`);
                toast.success('Dados atualizados com sucesso!');
                setShowEditPopup(false);
                const clienteAtualizado = { nome, email, telefone, id: idCliente };
                storage('cliente-logado', clienteAtualizado);  
            }

            else {
                return
            }
        

        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
           
        }
    }

    function handleCancelEdit() {
        setShowEditPopup(false); 
    }



   
    async function addFeed() {
        try {
            await axios.post(`http://4.172.207.208:5005/addFeed/${idCliente}/${comentario}`);
            toast.success('Comenatario adicionado');
            setComentario('')
        } 
        catch (error) {
            console.error('Erro ao add feedback:', error);
            toast.error('Erro ao adicionar comentario' + error);
        }
    }


    async function puxarFeed() {
            const response = await axios.get(`http://4.172.207.208:5005/aparecer/individual/${idCliente}`);
            let x = response.data;
            setArray(x);
    }

    useEffect(() => {
        puxarFeed()
        findImg();
       

    }, []);

    useEffect(() => {
        findHiden();
    }, []);

    return (
        <div className="pgcliente">
            <Cabecalho />
            <Balao />

            <div className="seccao1">
                <div className="texto">
                  
                    <img id='usuario' style={{zIndex: `${hiden}` , borderRadius: "50%", width: "75px", height: "75px", border: "1px solid #00000050", boxShadow: "0px 0px 10px #00000050"}} src={nameImg != null ? nameImg : ''} />
                  
                    <div className="intro">
                        <h1>Bem-vindo, <span>{nome}</span></h1>
                        <div className="email">
                            <img src="/assets/images/gmail.png" alt="gmail" />
                            <p>{email}</p>
                        </div>
                    </div>
                </div>

                <div className="editar">
                    <img src="/assets/images/edit.png" alt="edit" />
                    <button onClick={handleEditClick}>EDITAR DADOS</button>
                    <button onClick={sairClick}>SAIR</button>
                </div>
            </div>

            <h1 id="atalho"><img src="/assets/images/seta.png" alt="seta" /> ATALHOS</h1>

            <div className="seccao2">
                <Link to="/contatos">
                    <h1>NOSSOS SUPORTE</h1>
                    <div className="caixinha">
                        <img src="/assets/images/balaoConversa.png" alt="balão" />
                        <p>Envie mensagem para nosso suporte, para que podemos tirar suas dúvidas.</p>
                    </div>
                </Link>
                <Link to="/">
                    <h1>Fale com um corretor</h1>
                    <div className="caixinha">
                        <img id='contrato' src="/assets/images/contratoo.png" alt="balão" />
                        <p>Fale com um dos nossos corretores clicando no balão para poder fazer um orçamento.</p>
                    </div>
                </Link>
                <Link to="/sobree">
                    <h1>Sobre nós</h1>
                    <div className="caixinha">
                        <img src="/assets/images/likee.png" alt="balão" />
                        <p>Conheça mais sobre nós, por meio da nossa história.</p>
                    </div>
                </Link>
                <Link to="/">
                    <h1>Busque oportunidades</h1>
                    <div className="caixinha">
                        <img src="/assets/images/prediosicon.png" alt="balão" />
                        <p>Olhe nossas variedades de imóveis que mais combinam com você.</p>
                    </div>
                </Link>
            </div>

            {showEditPopup && (
                <div className="edit-popup">
                    <div className="popup-content">
                        <h2>Editar Dados</h2>
                        <div style={{backgroundImage: `url(${foto != null ? URL.createObjectURL(foto) : ''})`, backgroundPosition: "center", backgroundSize: "cover"}} className='preview'></div>
                        <div onClick={clickFoto} className='foto'><p>Foto de perfil</p></div>
                        <input onChange={e => setFoto(e.target.files[0])} id='foto' type="file" style={{display: "none"}}/>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                        />
                        <div className="popup-buttons">
                            <button onClick={handleConfirmEdit}>Confirmar</button>
                            <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="feedbacks">
                <div className="titulo">
                    <h1>Deixe seu comentario sobre a feel Good aqui:</h1>
                </div>

                <div className="comentario">
                    <h1>Escreva aqui:</h1>
                    <input type="text" placeholder='gostei muito' value={comentario} onChange={e => setComentario(e.target.value)} />
                    <button onClick={addFeed}>Enviar</button>
                </div>
            </div>

            <div className="avalicoes">
                    <div className="protecao">
                        {array.map(item =>
                        
                        <ComentarioFeed
                            nome={item.nome_cliente}
                            comentario={item.comentario}
                            foto={item.nome_foto}
                        />
        
                        )} 
                    </div>
            </div>
            <Rodape />
        </div>
    )
}
