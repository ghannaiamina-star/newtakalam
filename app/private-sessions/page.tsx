import type { Metadata } from "next";
import Header from "../components/Header";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Private English Sessions & Pricing | 1-on-1 Lessons | Takalam",
  description:
    "Book private 1-on-1 English sessions with expert tutors. Flexible packages starting from 200 DHS. Personalized learning tailored to your goals.",
  keywords: [
    "private English lessons Morocco",
    "1-on-1 English sessions",
    "English tutoring pricing",
    "private English classes online",
    "cours anglais privé Maroc",
    "دروس انجليزية خصوصية المغرب",
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/private-sessions",
  },
  openGraph: {
    title: "Private English Sessions & Pricing | Takalam English Center",
    description:
      "Book private 1-on-1 English sessions with expert tutors. Flexible pricing packages.",
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
      name: "Private Sessions",
      item: "https://takalamenglish.ma/private-sessions",
    },
  ],
};

export default function PrivateSessionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content" className="pt-32">
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
