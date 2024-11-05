import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default function MenuLateral() {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <div className={`MenuLateral ${menuAberto ? 'aberto' : ''}`}>
            <div className="intro">
                <img src="/assets/images/loganfeelgood.png" alt="logan" />
                <div className="texto">
                    <h1>FEEL GOOD INC</h1>
                    <p>ADMIN PAINEL</p>
                </div>
            </div>
            <div className="hamburguer" onClick={toggleMenu}>
                <div className="linha" />
                <div className="linha" />
                <div className="linha" />
            </div>
            {menuAberto && (
                <div className="botoes">
                    <Link to="/addimovel">ADICIONAR IMOVEL</Link>
                    <Link to="/gestao">GESTÃO DE IMOVEIS</Link>
                    <Link to="/gestaoCliente">GESTÃO DE CLIENTE</Link>
                    <Link to="/addCorretor">Adicionar Corretor</Link>
                    <Link to="/gestaoCorretor">GESTÃO DE CORRETORES</Link>
                    <Link to="/dashboardAdm">DASHBOARD</Link>
                </div>
            )}
        </div>
    );
};
