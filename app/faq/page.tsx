import type { Metadata } from "next";
import Header from "../components/Header";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Takalam English Center Morocco",
  description:
    "Find answers to common questions about Takalam English Center. Learn about sessions, pricing, scheduling, payment methods, and more.",
  keywords: [
    "Takalam FAQ",
    "English classes questions",
    "English course FAQ Morocco",
    "Takalam English help",
    "questions cours anglais Maroc",
    "أسئلة شائعة تكلم",
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/faq",
  },
  openGraph: {
    title: "FAQ | Takalam English Center Morocco",
    description:
      "Find answers to all your questions about learning English with Takalam.",
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
      name: "FAQ",
      item: "https://takalamenglish.ma/faq",
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content" className="pt-32">
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
