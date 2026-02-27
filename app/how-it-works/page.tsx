import type { Metadata } from "next";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "How It Works | Start Learning English | Takalam English Center",
  description:
    "Learn how Takalam English Center works. From booking your first session to achieving fluency — our simple 4-step process makes it easy to start.",
  keywords: [
    "how Takalam works",
    "start learning English Morocco",
    "English course process",
    "comment ça marche Takalam",
    "كيف يعمل تكلم",
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/how-it-works",
  },
  openGraph: {
    title: "How It Works | Takalam English Center",
    description:
      "Our simple 4-step process makes it easy to start learning English with confidence.",
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
      name: "How It Works",
      item: "https://takalamenglish.ma/how-it-works",
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content" className="pt-32">
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
