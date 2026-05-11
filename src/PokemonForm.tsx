import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { useQueryClient } from '@tanstack/react-query'

/*
  Schema de validação.

  Zod:
  - valida
  - tipa
  - gera inferência TypeScript
*/
const pokemonSchema = z.object({

    name: z
        .string()
        .min(3, 'Nome precisa ter no mínimo 3 caracteres'),

    hp: z
        .number()
        .min(1, 'HP mínimo é 1')
        .max(999, 'HP máximo é 999')
})

/*
  Inferência automática de tipos.

  O TypeScript gera o tipo baseado no schema.
*/
type PokemonFormData =
    z.infer<typeof pokemonSchema>

function PokemonForm() {

    /*
      queryClient:
      acesso direto ao cache do React Query.
    */
    const queryClient = useQueryClient()

    /*
      React Hook Form.
    */
    const {

        register,

        handleSubmit,

        reset,

        formState: { errors },

    } = useForm<PokemonFormData>({

        /*
          Integra RHF + Zod.
        */
        resolver: zodResolver(pokemonSchema),

        /*
          Necessário porque input HTML
          retorna string.
        */
    })

    /*
      Submit do formulário.
    */
    const onSubmit = (
        data: PokemonFormData
    ) => {

        /*
          queryClient.setQueryData():
    
          atualiza cache manualmente.
    
          SEM nova request.
        */
        queryClient.setQueryData(

            ['pokemons'],

            (oldData: any[]) => {

                /*
                  Novo Pokémon customizado.
                */
                const newPokemon = {

                    id: oldData.length + 1,

                    name: data.name,

                    hp: data.hp,
                }

                /*
                  Retorna novo array atualizado.
                */
                return [...oldData, newPokemon]
            }
        )

        /*
          Limpa formulário.
        */
        reset()
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <div>

                <input

                    placeholder="Nome"

                    /*
                      register():
                      conecta input ao RHF.
                    */
                    {...register('name')}

                />

                {/*
          Erro do Zod.
        */}
                {errors.name && (
                    <p>{errors.name.message}</p>
                )}

            </div>

            <div>

                <input

                    type="number"

                    placeholder="HP"

                    /*
                      valueAsNumber:
                      converte string -> number.
                    */
                    {...register('hp', {
                        valueAsNumber: true,
                    })}

                />

                {errors.hp && (
                    <p>{errors.hp.message}</p>
                )}

            </div>

            <button type="submit">

                Criar Pokémon

            </button>

        </form>
    )
}

export default PokemonForm