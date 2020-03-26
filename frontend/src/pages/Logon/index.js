import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../Services/api';

import './style.css';

import HeroesImg from  '../../assets/heroes.png'
import LogoImg from '../../assets/logo.svg'

export default function Logon() {
    const [id,setId] = useState('');
    const history = useHistory();

    async function Verificar(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('OngId', id);
            localStorage.setItem('OngName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no Login, tente novamente');
        }
    }

    return (
        <div className="LogonContainer">
            <section className="form">
                <img src={LogoImg} alt="Be The Hero"></img>

                <form onSubmit={Verificar}>
                    <h1>Faça seu Logon</h1>
                    <input 
                    placeholder="Seu ID"
                    value = {id}
                    onChange =  {e=> setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn  size={16} color="E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={HeroesImg} alt="Heroes"></img>
        </div>
    );
}