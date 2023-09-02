import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'; 
import { z } from 'zod';
import { api } from '../../api/axios';
import logo from '../../assets/logo.png';


const schema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Campo obrigatório' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número' })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], 
    }),
  bio: z.string().min(1, { message: 'Campo obrigatório' }),
  contact: z.string().min(1, { message: 'Campo obrigatório' }),
  course_module: z.string().min(1, { message: 'Campo obrigatório' }),
});

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm(
    {
      resolver: zodResolver(schema)
    }
  );

  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/users', data);
      console.log(response);

      navigate('/');
    } catch (err) {
      console.error('Erro ao criar conta:', err);
    }
  };

  return (
    <div className="containerR">
      <div className='logoVoltar'>
        <img className='imgl' src={logo} alt="Logo" />
        <Link to="/">
          <button className="voltar">Voltar</button>
        </Link>
      </div>
      <div className='fundoR'>
        <h1 className='tituloR'>Crie sua conta</h1>
        <p className='paragrafoR'>Rápido e grátis, vamos nessa!</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formulario">
            <label className='label' htmlFor="name">Nome</label>
            <input
              className='input'
              type="text"
              id="name"
              name="name"
              placeholder="Seu nome"
              {...register('name')}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div className="formularioR">
            <label className='label' htmlFor="email">Email</label>
            <input
              className='input'
              type="email"
              id="email"
              name="email"
              placeholder="Seu email"
              {...register('email')}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="formularioR">
            <label className='label' htmlFor="password">Senha</label>
            <input
              className='input'
              type="password"
              id="password"
              name="password"
              placeholder="Sua senha"
              {...register('password')}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <div className="formularioR">
            <label className='label' htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              className='input'
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>
          <div className="formularioR">
            <label className='label' htmlFor="bio">Bio</label>
            <textarea
              className='inputb'
              id="bio"
              name="bio"
              placeholder="Escreva algo sobre você"
              {...register('bio')}
            ></textarea>
            {errors.bio && <p className="error-message">{errors.bio.message}</p>}
          </div>
          <div className="formularioR">
            <label className='label' htmlFor="contact">Contato (redes sociais, telefone, etc.)</label>
            <input
              className='input'
              type="text"
              id="contact"
              name="contact"
              placeholder="Seu contato"
              {...register('contact')}
            />
            {errors.contact && <p className="error-message">{errors.contact.message}</p>}
          </div>
          <div className="formularioR">
            <label className='label' htmlFor="course_module">Selecionar Módulo</label>
            <select
              className='input' 
              id="course_module"
              name="course_module"
              {...register('course_module')}
            >
              <option value="Primeiro módulo (Introdução ao Frontend)">Primeiro módulo (Introdução ao Frontend)</option>
              <option value="Segundo módulo (Frontend Avançado)">Segundo módulo (Frontend Avançado)</option>
              <option value="Terceiro módulo (Introdução ao Backend)">Terceiro módulo (Introdução ao Backend)</option>
              <option value="Quarto módulo (Backend Avançado)">Quarto módulo (Backend Avançado)</option>
            </select>
            {errors.course_module && <p className="error-message">{errors.course_module.message}</p>}
          </div>
          <button className='cadastrarConfirma' type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
