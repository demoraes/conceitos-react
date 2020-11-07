import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');

      setRepositories(response.data);
    }

    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: `Nova url ${Date.now()}`
    })

    const repositori = response.data;

    setRepositories([...repositories, repositori])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repositori => repositori.id !== id))
  }

  return (

    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositori =>
          <li key={repositori.id}>
            {repositori.title}
            <button onClick={() => handleRemoveRepository(repositori.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
