import PokemonForm from './PokemonForm'
import PokemonTable from './PokemonTable'

import './index.css'

import { usePokemons } from './usePokemons'

function App() {

  const { data, isLoading, error } =
    usePokemons()

  if (isLoading) {
    return <h1>Carregando...</h1>
  }

  if (error) {
    return <h1>Erro ao buscar Pokémons</h1>
  }

  return (

      <div className="app">

      <h1>Pokémons</h1>

      <PokemonForm />

      <br />

      <PokemonTable data={data || []} />

    </div>

  )
}

export default App