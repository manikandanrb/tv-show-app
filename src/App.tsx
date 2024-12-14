import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home.tsx'));
const MovieUpload = lazy(() => import('./pages/MovieUpload.tsx'));

function App() {
  return (
    <Suspense fallback={"loading..."}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie-upload" element={<MovieUpload />} />
      </Routes>
    </BrowserRouter>
    </Suspense>
  );
}

export default App;
