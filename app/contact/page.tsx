import type { Metadata } from "next";
import Header from "../components/Header";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Get Started with Takalam English Center",
  description:
    "Get in touch with Takalam English Center. Book your free diagnostic test, ask questions, or start your English learning journey today.",
  keywords: [
    "contact Takalam English",
    "English classes signup Morocco",
    "book English lesson",
    "contacter Takalam",
    "تواصل معنا تكلم",
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/contact",
  },
  openGraph: {
    title: "Contact Us | Takalam English Center Morocco",
    description:
      "Get in touch to start your English learning journey. Book a free diagnostic test today.",
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
      name: "Contact",
      item: "https://takalamenglish.ma/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content" className="pt-32">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
