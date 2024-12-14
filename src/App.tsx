import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner.tsx';

const Home = lazy(() => import('./pages/Home.tsx'));
const MovieUpload = lazy(() => import('./pages/MovieUpload.tsx'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
