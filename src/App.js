import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: "Desafio 03 GoStack!",
      url: "https://github.com/tiagoalcantara/gostack-desafio-03",
      techs: ["React", "ReactJS", "JavaScript"],
    }
    const response = await api.post('/repositories', newRepository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const repositoriesCopy = [...repositories];
    repositoriesCopy.splice(repositoryIndex, 1);
    setRepositories(repositoriesCopy);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
