import { useState } from 'react';
import gitlogo from '../assets/github.png'
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import Button from '../components/Buttom';
import { api } from '../services/api';

function App() {
  const [currentRepo, setCurrentRepo] = useState([]);
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`);
    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id)

      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return
      }
    }
    alert('Repositório não encontrado ou inexistente!')
  }

  const handleRemoveRepo = (id) =>{
    const newRepo = repos.filter(repo => (repo.id !== id));
    setRepos(newRepo);
  }

  return (
    <Container>
      <img src={gitlogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
