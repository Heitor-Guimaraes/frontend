// src/pages/TelaAdd.js
import React from 'react';
import './index.scss';
import NovoCard from '../../components/adcionaImovel';
import CabecalhoADM from '../../components/cabecalhoADM';


const TelaAdd = ({ setExibir }) => {
    return (
        <div className="Tela-add">
            
            <div className="direita">
                <CabecalhoADM />
                <NovoCard setExibir={setExibir} />
            </div>
        </div>
    );
};

export default TelaAdd;
