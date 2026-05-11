import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'

/*
  QueryClient:
  é o "gerenciador central" do React Query.

  Ele controla:
  - cache
  - refetch
  - mutations
  - sincronização dos dados
*/
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    {/*
      QueryClientProvider:
      disponibiliza o React Query para TODA a aplicação.

      Sem ele:
      useQuery() e useMutation() não funcionam.
    */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

  </StrictMode>,
)