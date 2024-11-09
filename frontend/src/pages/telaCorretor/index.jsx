import './index.scss';
import axios from 'axios';
import storage from 'local-storage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function TelaCorretor() {

    const [pesquisa, setPesquisa] = useState('')
    const [array, setArray] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const idCorretor = storage('corretor-logado').id; 
    const [showPopup, setShowPopup] = useState(false);
    const [editCorretor, setEditCorretor] = useState({ id: '', nome: '', email: '',telefone: '', senha: '' });
    const [TotalImovel, setTotalImovel] = useState('')
    const [imovelVendido, setImovelVendido] = useState('')
    const [foto, setFoto] = useState(null);
    const [nameImg, setNameImg] = useState('');


    async function findNameImg() {
        const x = await axios.get(`http://4.172.207.208:5005/find/${idCorretor}`);
        if (x.data.nm_foto != null) {
            const z = await axios.get(`http://4.172.207.208:5005/img/${x.data.nm_foto}`);
            setNameImg(z.data.url);
        } else {
            setNameImg(x.data.nm_foto);
        }   
    }
        
        
    
    const navigate = useNavigate();

    useEffect(() => {

        if(!storage('corretor-logado')) {
            navigate('/loginCorretor');
        }
        else {
            const CorretorLogado = storage('corretor-logado');
            setNome(CorretorLogado.nome);
            setEmail(CorretorLogado.email);
            setTelefone(CorretorLogado.telefone);
            findNameImg()
        }

    }, [])

    function sair() {
        storage.remove('corretor-logado');
        navigate('/loginCorretor');
    }

    
    
    async function imovelPorCorretor() {
        const response = await axios.get(`http://4.172.207.208:5005/imovelPorCorretor/${idCorretor}`);
        setArray(response.data);
      }

    async function totalImovelCorretor() {
        const response = await axios.get(`http://4.172.207.208:5005/totalImovel/porCorretor/${idCorretor}`);
        let x = response.data
        console.log(response.data)
        setTotalImovel(x.total)
    }

    async function vendidoCorretor() {
        const response = await axios.get(`http://4.172.207.208:5005/totalvendido/porCorretor/${idCorretor}`);
        let x = response.data;
        setImovelVendido(x.total_vendidos)
    }


      useEffect(() => {
        imovelPorCorretor();
        totalImovelCorretor();
        vendidoCorretor();
      }, []);

      const handleEdit = (corretor) => {
        setEditCorretor({
            id: idCorretor,
            nome: corretor.nm_adm,
            email: corretor.ds_email,
            telefone: corretor.ds_telefone,
            senha: corretor.ds_senha
        });
        setShowPopup(true);
    };

    const handleUpdate = async () => {
        try {

            if (foto != null) {
                const formData = new FormData();
                formData.append('img', foto);
            
                const x = await axios.post(`http://4.172.207.208:5005/multer`, formData, {
                    headers: {
                        "Content-Type": "multparts/formdata"
                    }
                });

                setShowPopup(false);
                await axios.put(`http://4.172.207.208:5005/addPictureCorretor/${x.data.fl}/${idCorretor}`);
                toast.success('foto atualizada');

            }

            if(nome.length > 0  && email.length > 0 && telefone.length > 0 ) {
                await axios.put(`http://4.172.207.208:5005/atualizar/corretor/${nome}/${email}/${senha}/${telefone}/${idCorretor}`);
           
                setShowPopup(false);
                imovelPorCorretor();
                toast.success('dados atualizados');
            }

            else {
                return 
            }

           
           
        } catch (error) {
            console.error('Erro ao atualizar corretor:', error);
            
        }
    }; 

    const pdfURL = '/assets/doc/contrato_Feel_Good.pdf';  

    function baixarPDF() {
    const link = document.createElement('a');
    link.href = pdfURL;
    link.setAttribute('download', 'Contrato.pdf');  
    document.body.appendChild(link);
    link.click();  
    document.body.removeChild(link);  
}  

    function clickFoto() {
        document.getElementById("foto").click();
    }


    return(
        <div className="telaCorretor">
            <div className="cabe">
                <div className="esquerda">
                    <img id='logo' src="/assets/images/loganfeelgood.png" alt="" />
                    <div className="infos">
                        <h1>FEEL GOOD INC</h1>
                        <p>CORRETOR PAINEL</p>
                    </div>
                </div>

                <div className="direita">
                    <button onClick={sair}>Sair</button>
                    <img src={`${nameImg != null ? nameImg : '/imgs/6256.254928160821.png'}`} alt="" style={{borderRadius: "50%", width: "75px", height: "75px"}}/>
                </div>
            </div>


            <div className="card">
                <div className="esquerdaCard">
                    <h1>Seja bem-vindo, <span>{nome}</span>!</h1>
                    <div className="infos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
                    </svg>
                    <p><span>Email:</span> {email}</p>
                    </div>

                    <div className="infos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                    <p><span>Telefone:</span> {telefone}</p>
                    </div>
                </div>

                <div className="direitaCard">
                    <button onClick={handleEdit}>Editar Dados</button>
                    <button onClick={baixarPDF}>Contrato</button>
                </div>
            </div>

            <div className="seccao2">
                <div className="bloco">
                    <h1>Total de Imoveis</h1>
                    <p>{TotalImovel} Imoveis</p>
                </div>

                <div className="bloco">
                    <h1>Total de Vendidos</h1>
                    <p>{imovelVendido} vendidos</p>
                </div>
            </div>

            <div className="rodapeCorretor">
                <div className="titulo">
                    <h1>Imoveis responsavel</h1>
                </div>

                <div className="lupa">
                    <input type="text" placeholder='pesquise' value={pesquisa} onChange={e => setPesquisa(e.target.value)} />   
                    <img src="/assets/images/lupaaa.png" alt="lupa" />
                </div>

                <div className="table">
          <table className='tabela'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Imóvel</th>
                <th>Status</th>
                <th>Corretor</th>
                <th>Vendido</th>
              </tr>
            </thead>
            <tbody>
              {array.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.imovel}</td>
                    <td>{item.status}</td>
                    <td>{item.corretor}</td>
                    <td>{item.vendido ? "sim" : "nao"}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Editar Corretor</h2>

                        <div style={{backgroundImage: `url(${foto != null ? URL.createObjectURL(foto) : ''})`, backgroundPosition: "center", backgroundSize: "cover"}} className='preview'></div>
                        <div onClick={clickFoto} className='foto'><p>Foto de perfil</p></div>
                        <input onChange={e => setFoto(e.target.files[0])} id='foto' type="file" style={{display: "none"}}/>

                        <label>Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label>Telefone:</label>
                        <input
                            type="phone"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                        />
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)} 
                        />
                        <div className="popup-buttons">
                            <button onClick={handleUpdate}>Confirmar</button>
                            <buton onClick={() => setShowPopup(false)}>Cancelar</buton>
                        </div>

                        
                    </div>
                </div>
            )}
        </div>
    )
}