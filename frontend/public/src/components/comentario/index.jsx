import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ComentarioFeed({nome, comentario, foto}) {


    const [img, setImg] = useState(null);

    async function a() {
        console.log(foto)
        if (foto != null) {
            const x = await axios.get(`http://4.172.207.208:5005/img/${foto}`);
            setImg(x.data.url);
            console.log(x);
        } else {
            setImg(foto);
        }
        
    }

    useEffect(() => { a() });

    return(
        <div className="feed">
                <img style={{width: "75px", height: "75px", borderRadius: "50%", boxShadow: "0px 0px 10px #00000050"}}  src={`${img != null ? img : '/imgs/6256.254928160821.png'}`} alt="viktor" />
                <div className="infos">
                    <h1>{nome}</h1>
                    <p>{comentario}</p>
                </div> 
        </div>
    )
}