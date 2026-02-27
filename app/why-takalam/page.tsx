import type { Metadata } from "next";
import Header from "../components/Header";
import WhyTakalam from "../components/WhyTakalam";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Why Takalam? | What Makes Us Different | Takalam English Center",
  description:
    "Discover why Takalam English Center is the top choice for learning English in Morocco. Personalized lessons, expert teachers, and real results.",
  keywords: [
    "why Takalam English",
    "best English school Morocco",
    "Takalam difference",
    "English learning Morocco",
    "pourquoi Takalam",
    "لماذا تكلم",
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/why-takalam",
  },
  openGraph: {
    title: "Why Takalam? | What Makes Us Different",
    description:
      "Discover what makes Takalam English Center the top choice for learning English in Morocco.",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://takalamenglish.ma",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Why Takalam",
      item: "https://takalamenglish.ma/why-takalam",
    },
  ],
};

export default function WhyTakalamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content" className="pt-32">
        <WhyTakalam />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
