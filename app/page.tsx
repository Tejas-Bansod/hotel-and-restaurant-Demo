import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Menu from '@/components/sections/Menu';
import Gallery from '@/components/sections/Gallery';
import Contact from '@/components/sections/Contact';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Contact />
      <Footer />
      <CartDrawer />
    </main>
  );
}
