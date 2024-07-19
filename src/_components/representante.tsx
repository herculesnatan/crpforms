"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Modal from "./modal";

interface RepresentanteProps {
    onSubmit: (data: RepresentanteData) => void;
}

interface RepresentanteData {
    nome: string;
    nomeSocial: string;
    nascimento: string;
    cpf: string;
    rg: string;
    endereco: string;
    cep: string; 
    email: string;
    telefone: string;
    documento: File | null;
}

const Representante: React.FC<RepresentanteProps> = ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [representante, setRepresentante] = useState<RepresentanteData>({
        nome: '',
        nomeSocial: '',
        nascimento: '',
        cpf: '',
        rg: '',
        endereco: '',
        cep: '',
        email: '',
        telefone: '',
        documento: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setRepresentante((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(representante).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
        });
        const response = await fetch('src/app/api/pages/send-email.ts', {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        console.log(result);
        setIsOpen(false);
    };

    return (
        <div className="representante">
            <h5>1. Dados de Identificação da(o) Representante</h5>
            <button type="button" onClick={() => setIsOpen(true)}>
                Clique para adicionar o representante
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="dados__representante__nome">Nome completo</label>
                    <input type="text" id="dados__representante__nome" name="nome" value={representante.nome} onChange={handleChange} required />
                    <label htmlFor="dados__representante__nome__social">Nome Social</label>
                    <input type="text" id="dados__representante__nome__social" name="nomeSocial" value={representante.nomeSocial} onChange={handleChange} />
                    <label htmlFor="dados__representante__nascimento">Data de nascimento</label>
                    <input type="text" id="dados__representante__nascimento" name="nascimento" value={representante.nascimento} onChange={handleChange} required />
                    <label htmlFor="dados__representante__RG">RG</label>
                    <input type="text" id="dados__representante__RG" name="rg" value={representante.rg} onChange={handleChange} required />
                    <label htmlFor="dados__representante__CPF">CPF</label>
                    <input type="text" id="dados__representante__CPF" name="cpf" value={representante.cpf} onChange={handleChange} required />
                    <label htmlFor="dados__representante__endereco">Endereço</label>
                    <input type="text" id="dados__representante__endereco" name="endereco" value={representante.endereco} onChange={handleChange} required />
                    <label htmlFor="dados__representante__CEP">CEP</label>
                    <input type="text" id="dados__representante__CEP" name="cep" value={representante.cep} onChange={handleChange} required />
                    <label htmlFor="dados__representante__telefone">Telefone</label>
                    <input type="text" id="dados__representante__telefone" name="telefone" value={representante.telefone} onChange={handleChange} required />
                    <label htmlFor="dados__representante__email">Email</label>
                    <input type="email" id="dados__representante__email" name="email" value={representante.email} onChange={handleChange} required />
                    <label htmlFor="dados__representante__documento">Documento</label>
                    <input type="file" id="dados__representante__documento" name="documento" onChange={handleChange} required />
                    <button type="submit">Adicionar representante</button>
                </form>
            </Modal>
        </div>
    );
}

export default Representante;
