import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import type {
  SortingState,
} from '@tanstack/react-table'

import { useState } from 'react'

/*
  Importa a store global do Zustand.
*/
import { useBattleStore } from './store'

type Pokemon = {
  id: number
  name: string
  hp: number
}

type Props = {
  data: Pokemon[]
}

function PokemonTable({ data }: Props) {

  /*
    Estado de sorting da tabela.
  */
  const [sorting, setSorting] =
    useState<SortingState>([])

  /*
    Zustand:
    lê favoritos globais.
  */
  const favorites = useBattleStore(
    (state) => state.favorites
  )

  /*
    Zustand:
    função para adicionar/remover favorito.
  */
  const toggleFavorite = useBattleStore(
    (state) => state.toggleFavorite
  )

  const columnHelper =
    createColumnHelper<Pokemon>()

  const columns = [

    columnHelper.accessor('id', {
      header: 'ID',
    }),

    columnHelper.accessor('name', {
      header: 'Nome',
    }),

    columnHelper.accessor('hp', {
      header: 'HP',
    }),

    /*
      Coluna customizada.

      Não depende diretamente de um campo.
    */
    columnHelper.display({

      id: 'favorite',

      header: 'Favorito',

      /*
        cell:
        renderização personalizada.
      */
      cell: ({ row }) => {

        /*
          Pokémon atual da linha.
        */
        const pokemon = row.original

        /*
          Verifica se é favorito.
        */
        const isFavorite =
          favorites.includes(pokemon.id)

        return (

          <button
            onClick={() =>
              toggleFavorite(pokemon.id)
            }
          >

            {/*
              Renderização dinâmica baseada
              no estado global.
            */}
            {isFavorite ? '⭐' : '☆'}

          </button>

        )
      },
    }),
  ]

  const table = useReactTable({

    data,

    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),
  })

  return (

    <table border={1} cellPadding={10}>

      <thead>

        {table.getHeaderGroups().map((headerGroup) => (

          <tr key={headerGroup.id}>

            {headerGroup.headers.map((header) => (

              <th
                key={header.id}

                onClick={header.column.getToggleSortingHandler()}

                style={{
                  cursor: 'pointer',
                }}
              >

                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}

                {{
                  asc: ' 🔼',
                  desc: ' 🔽',
                }[header.column.getIsSorted() as string] ?? null}

              </th>

            ))}

          </tr>

        ))}

      </thead>

      <tbody>

        {table.getRowModel().rows.map((row) => (

          <tr key={row.id}>

            {row.getVisibleCells().map((cell) => (

              <td key={cell.id}>

                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}

              </td>

            ))}

          </tr>

        ))}

      </tbody>

    </table>
  )
}

export default PokemonTable