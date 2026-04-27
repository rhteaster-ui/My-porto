import { Background } from './components/Background';
import { CursorGlow } from './components/CursorGlow';
import { Nav } from './components/Nav';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Stack } from './sections/Stack';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  return (
    <>
      <Background />
      <CursorGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
