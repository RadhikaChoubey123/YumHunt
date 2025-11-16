import Home from "./pages/Home"
import { RecipesList } from "./pages/RecipesList"
import About from "./pages/about"
import Contact from "./pages/contact"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./layout/AppLayout"
import CategoryRecipes from "./components/CategoryRecipes"
import { LRDetail } from "./components/LRDetail"
import { Search } from "./components/search"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "recipesList",
        element: <RecipesList />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "category/:name",
        element: <CategoryRecipes />
      },
      {
        path: "recipes/:id",
        element: <LRDetail />

      },
      {
        path: "/search",
        element: <Search />
      }

    ]
  }
])
const App = () => {
  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          retry: 1,
          retryDelay: 500,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          refetchOnReconnect: false,
          staleTime: 1000 * 60 * 5,
          cacheTime: 1000 * 60 * 10,
        }
      }
    }
  );
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App