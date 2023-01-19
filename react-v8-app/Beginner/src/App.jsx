import { useState, lazy, Suspense } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from './Utility/AdoptedPetContext';

const Details = lazy(() => import("./Pages/Details"));
const SearchParams = lazy(() => import("./Pages/SearchParams"));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Cache is fine as long as the user is on a session
      cacheTime: Infinity,
    },
  },
})

const App = () => {
  const adoptedPet = useState(null); // for context
  return (
    <div className="m-0 p-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}>

        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div className='loading-pane'>
            <h2 className='loader'>🐶</h2>
          </div>}>
            <AdoptedPetContext.Provider value={adoptedPet}>
              <header className='w-full mb-10 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center'>
                <Link className="text-6xl text-white hover:text-gray-200" to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/" element={<SearchParams />} />
                <Route path="/details/:id" element={<Details />} />
              </Routes>
            </AdoptedPetContext.Provider>
          </Suspense>
        </QueryClientProvider>

    </div>
  );
};

export default App;
