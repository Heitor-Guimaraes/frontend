import './index.scss';
import { Link } from "react-router-dom";
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';


export default function Rodape() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [popupAberto, setPopupAberto] = useState(false); 

    const abrirPopup = () => {
        setPopupAberto(true);
    };

    const fecharPopup = () => {
        setPopupAberto(false);
    };

    const enviarEmailParaEmpresa = async () => {
        const params = {
            nome: nome,
            email: email,
            telefone: telefone,
            mensagem: mensagem,
            reply_to: "feelgoodinc0508@gmail.com"
        };
    
        try {
            await emailjs.send('service_202bbcw', 'template_0yelr9o', params, 'nl6_StcFGhwPuXEbd');
            toast.success('Solicitação enviada para a empresa!');
        } catch (error) {
            toast.error('Erro ao enviar solicitação.');
            throw error;
        }
    };
    
    const enviarConfirmacaoParaCliente = async () => {
        const params = {
            nome: nome,
            email: email,
            reply_to: "feelgoodinc0508@gmail.com"
        };
    
        try {
            await emailjs.send('service_202bbcw', 'template_8cy5kjd', params, 'nl6_StcFGhwPuXEbd');
            toast.success('Confirmação enviada para o cliente!');
            setEmail('')
            setMensagem('')
            setTelefone('')
            setNome('')
        } catch (error) {
            toast.error('Erro ao enviar confirmação.');
            throw error;
        }
    };

    const enviarAmbosEmails = async () => {
        try {
            await enviarEmailParaEmpresa();
            await enviarConfirmacaoParaCliente();
        } catch (error) {
            console.error('Erro no envio dos e-mails:', error);
        }
    };

    return (
        <div className="rodape">
            
            <div className="rodainfo1">
                    <p>FEEL GOOD INC</p>
                    <div className="imagens">
                        <Link to=""><img src="/assets/images/insta.png" alt="insta" /></Link>
                        <a href="www.linkedin.com/in/joaovictorortelandonascimento"><img  src="/assets/images/linkedin.png" alt="linkedin" /></a>          
                        <Link to=""><img src="/assets/images/whatsapp.png" alt="whatsapp" /></Link>
                        
                    </div>
                
            </div>
            <div className="RiscoBranco"></div>
            <div className="meioRodape">
                <div className="esquerda">
                    <h1>Páginas</h1>
                    <Link to="/">Home</Link>
                    <Link to="/">Corretor online</Link>
                    <Link to="/contatos">Contatos</Link>
                    <Link to="/sobree">Sobre nós</Link>
                </div>

                <div className="direita">
                    <h1>Ajuda</h1>
                    <button onClick={abrirPopup}>Trabalhe conosco</button> 
                    <Link to="/">Email de Contato</Link>
                    <Link to="/">Fundado por ortelan</Link>
                    
                </div>
            </div>

            {popupAberto && (
                <div className="popup-overlay" onClick={fecharPopup}>
                    <div className="popup-content" onClick={e => e.stopPropagation()}>
                        <div className="cartao">
                            <div className="informacoes">
                                <div className="nome">
                                    <h1>Nome:</h1>
                                    <input type="text" placeholder='Coloque seu nome' value={nome} onChange={e => setNome(e.target.value)} />
                                </div>

                                <div className="email">
                                    <h1>Email:</h1>
                                    <input type="text" placeholder='Coloque seu email' value={email} onChange={e => setEmail(e.target.value)} />
                                </div>

                                <div className="numero">
                                    <h1>Telefone:</h1>
                                    <input type="text" placeholder='Coloque seu número' value={telefone} onChange={e => setTelefone(e.target.value)} />
                                </div>

                                <div className="mensagem">
                                    <h1>Mensagem:</h1>
                                    <textarea placeholder='Por que você quer trabalhar aqui?' value={mensagem} onChange={e => setMensagem(e.target.value)}></textarea>
                                </div>
                            </div>

                            <div className="termos">
                                <button  onClick={enviarAmbosEmails}>Enviar</button>
                                <button onClick={fecharPopup} className="fechar-popup">Fechar</button> 
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className="RiscoBranco"></div>
           
            <h1 id='fimRodape'>FEEL GOOD INC - Stratton oakmont S/A. - CNPJ 13.800.191/0001-69 - CEP 04773-000. Av. Coronel Octaviano de Freitas Costa, 463 - Socorro, São Paulo</h1>
        </div>
    );
}
