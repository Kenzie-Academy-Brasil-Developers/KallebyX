import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';
import LogoutButton from '../LogoutButton';
import logo from '../../assets/logo.png'; 

function DashboardPage({ user }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(`/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
      }
    };

    if (!user) {
      navigate('/');
    } else {
      getUserData();
    }
  }, [user, navigate]);

  return (
    <div className="dashboard-container">
      <div className='img-sair'>
        <img className='img' src={logo} alt="Logo" />
        <LogoutButton className="sair" />
      </div>
      <hr></hr>
      <div className='boxNomeEmod'>
        <div className='nome-modulo'>
          <p className='nome'>Olá, {userData?.name}!</p>
          <p className='modulo'>Módulo: {userData?.course_module}</p>
        </div>
      </div>
      <hr></hr>
      {userData ? (
        <div className='paragrafos'>
          <p className='p1'>Que pena! Estamos em desenvolvimento :(</p>
          <p className='p2'>Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
        </div>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}
    </div>
  );
}

export default DashboardPage;