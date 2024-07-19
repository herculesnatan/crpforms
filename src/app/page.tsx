'use client';

import styles from '~/styles/homepage.module.css'
import React, { useState } from 'react';
import axios from 'axios';
import Header from '~/_components/header';
import Representante from '~/_components/representante';

function FormularioCRP01() {
    const [formData, setFormData] = useState({
        nome: '',
        nomeSocial: '',
        nascimento: '',
        cpf: '',
        rg: '',
        endereco: '',
        cep: '',
        telefone: '',
        email: '',
        documento: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                form.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post('/api/send-email', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Email enviado com sucesso!');
        } catch (error) {
            alert('Erro ao enviar email');
            console.error('Erro:', error);
        }
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} target="_blank" method="POST">
                <Representante onChange={handleInputChange} />
                <button type="submit" className="enviar__forms">Enviar</button>
            </form>
            <footer>
                <p>Developer by Hércules</p>
            </footer>
        </div>
    );
}

export default FormularioCRP01;


