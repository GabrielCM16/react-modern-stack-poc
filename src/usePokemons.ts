import { useQuery } from '@tanstack/react-query'

/*
  Função responsável por buscar os dados da API.

  React Query NÃO faz o fetch sozinho.
  Ele apenas gerencia a execução e o cache.

  Quem realmente busca os dados é essa função async.
*/
const fetchPokemons = async () => {

    /*
      Busca os primeiros 100 pokémons.
    */
    const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=100'
    )

    /*
      Converte resposta para JSON.
    */
    const data = await response.json()

    /*
      Promise.all:
      executa várias requisições simultaneamente.
  
      A primeira API retorna apenas:
      - nome
      - URL
  
      Então precisamos buscar detalhes individuais.
    */
    const pokemons = await Promise.all(

        data.results.map(async (pokemon: any) => {

            /*
              Busca detalhes do pokémon.
            */
            const response = await fetch(pokemon.url)

            const details = await response.json()

            /*
              Retornamos apenas os campos
              que a aplicação realmente precisa.
      
              Isso reduz complexidade.
            */
            return {
                id: details.id,
                name: details.name,
                hp: details.stats[0].base_stat,
            }
        })
    )

    return pokemons
}

/*
  Hook customizado da aplicação.

  Encapsula o React Query.
*/
export const usePokemons = () => {

    return useQuery({

        /*
          queryKey:
          identificador ÚNICO do cache.
    
          React Query salva os dados usando essa chave.
    
          Exemplo:
          cache['pokemons']
        */
        queryKey: ['pokemons'],

        /*
          queryFn:
          função responsável pela requisição.
        */
        queryFn: fetchPokemons,

    })
}