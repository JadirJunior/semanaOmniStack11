import React, {useState} from 'react';
import './styles.css';

import LogoImg from '../../assets/logo.svg'

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../Services/api';

export default function Incident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const OngId = localStorage.getItem('OngId');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: OngId,
                },
            });

            history.push('/profile');

        } catch (error) {
            alert('Erro ao cadastrar caso');
        }
    }

    return (
        <div className="newIncidentContainer">
        <div className="content">
            <section>
                <img src={LogoImg} alt="Be The Hero"/>

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft  size={16} color="E02041"/>
                    Voltar para home
                </Link>
            </section>

            <form onSubmit={handleRegister}>
                <input 
                placeholder="Título do caso"
                value={title}
                onChange = {e => setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição"
                value={description}
                onChange = {e => setDescription(e.target.value)}
                />
                <input 
                placeholder="Valor em Reais" 
                value={value}
                onChange = {e => setValue(e.target.value)}
                />
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}