
import './index.scss';
import { Link } from 'react-router-dom';
import CabecalhoADM from '../../components/cabecalhoADM';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddCorretor() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [telefone, setTelefone] = useState('')

    async function addCorretor() {
       try {
        const corretorObj = {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone
        }


        let url = `http://4.172.207.208:5005/addCorretor`;
        let resp = await axios.post(url, corretorObj);
        toast.success('corretor adicionado')
        setEmail('')
        setSenha('')
        setNome('')
       }
        catch (err) {
            if(err.response)
                toast.error(err.response.data.err);
            else 
                toast.error(err.message);
       }
    }

    return (
        <div className="addCorretor">
            <div className="esquerda">
        <div className="intro">
          <img src="/assets/images/loganfeelgood.png" alt="logan" />
          <div className="texto">
            <h1> FEEL GOOD INC</h1>
            <p>ADMIN PAINEL</p>
          </div>
        </div>
        <div className="botoes">
          <Link to="/addimovel">ADICIONAR IMOVEL</Link>
          <Link to="/gestao">GESTÃO DE IMOVEIS</Link>
          <Link to="/gestaoCliente">GESTÃO DE CLIENTE</Link>
          <Link to="/addCorretor">Adicionar Corretor</Link>
          <Link to="/gestaoCorretor">GESTÃO DE CORRETORES</Link>
          <Link to="/dashboardAdm">DASHBOARD</Link>
        </div>
      </div>

      <div className="direita">
        <CabecalhoADM />

        <div className="corpo">
            <div className="card">
                <h1>Adicione o corretor</h1>

                <div className="seguranca">
                    <h1>nome:</h1>
                    <input type="text" placeholder='nome do corretor' value={nome} onChange={e=> setNome(e.target.value)} />
                </div>
                <div className="seguranca">
                    <h1>email:</h1>
                    <input type="text" placeholder='email do corretor' value={email} onChange={e=> setEmail(e.target.value)}/>
                </div>
                <div className="seguranca">
                    <h1>telefone:</h1>
                    <input type="text" placeholder='telefone do corretor'value={telefone} onChange={e=> setTelefone(e.target.value)} />
                </div>
                <div className="seguranca">
                    <h1>senha:</h1>
                    <input type="text" placeholder='senha do corretor'value={senha} onChange={e=> setSenha(e.target.value)} />
                </div>

                <button onClick={addCorretor}>Criar</button>
            </div>
        </div>

      

    
      </div>
        </div>
    )
}