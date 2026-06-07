import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Lightbox from './components/Lightbox';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Catalogue from './pages/Catalogue';
import Contact from './pages/Contact';

export default function App() {
  const [preview, setPreview] = useState(null);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home onPreview={setPreview} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/catalogue" element={<Catalogue onPreview={setPreview} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      {preview ? <Lightbox project={preview} onClose={() => setPreview(null)} /> : null}
    </>
  );
}
