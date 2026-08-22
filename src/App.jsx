import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import AudioPlayer from './components/AudioPlayer';

const Home = lazy(() => import('./pages/Home'));
const Catalogue = lazy(() => import('./pages/Catalogue'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Signal = lazy(() => import('./pages/Signal'));

export default function App() {
  return (
    <>
      <AudioPlayer />
      <SmoothScroll>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/about" element={<About />} />
            <Route path="/signal" element={<Signal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </>
  );
}
