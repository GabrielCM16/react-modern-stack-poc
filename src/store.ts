import { create } from 'zustand'

/*
  Estrutura da store.

  Define:
  - estados
  - funções de atualização
*/
type BattleStore = {

  /*
    IDs dos pokémons favoritados.
  */
  favorites: number[]

  /*
    Adiciona/remove favorito.
  */
  toggleFavorite: (pokemonId: number) => void
}

/*
  create():
  cria a store global do Zustand.
*/
export const useBattleStore = create<BattleStore>((set) => ({

  /*
    Estado inicial.
  */
  favorites: [],

  /*
    Toggle de favorito.
  */
  toggleFavorite: (pokemonId) =>

    /*
      set():
      atualiza estado da store.
    */
    set((state) => {

      /*
        Verifica se já existe.
      */
      const alreadyFavorite =
        state.favorites.includes(pokemonId)

      /*
        Remove dos favoritos.
      */
      if (alreadyFavorite) {

        return {
          favorites: state.favorites.filter(
            (id) => id !== pokemonId
          ),
        }
      }

      /*
        Adiciona aos favoritos.
      */
      return {
        favorites: [...state.favorites, pokemonId],
      }
    }),
}))