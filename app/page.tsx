import Header from "./components/Header";
import HeroMinimal from "./components/HeroMinimal";
import Contact from "./components/Contact";
import FooterMinimal from "./components/FooterMinimal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroMinimal />
        <Contact />
      </main>
      <FooterMinimal />
    </>
  );
}
