import './index.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Cabecalho() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fecharMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', fecharMenu);
        return () => {
            document.removeEventListener('mousedown', fecharMenu);
        };
    }, []);

    return (
        <div className="cabecalho">
            <div className="img">
                <Link to="/">
                    <img src="/assets/images/loganfeelgood.png" alt="logo" />
                </Link>
            </div>
            <div className={`menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/contatos" onClick={toggleMenu}>Contatos</Link>
                <Link to="/sobree" onClick={toggleMenu}>Sobre nós</Link>
                <Link to="/cadastroCliente" onClick={toggleMenu}>Cadastro</Link>
                <Link to="/telaCliente" onClick={toggleMenu}>Entrar</Link>
            </div>
            <div className="hamburguer" onClick={toggleMenu}>
                <div className="linha"></div>
                <div className="linha"></div>
                <div className="linha"></div>
            </div>
        </div>
    );
}
