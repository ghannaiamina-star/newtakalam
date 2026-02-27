import type { Metadata } from "next";
import Header from "../components/Header";
import GroupSessions from "../components/GroupSessions";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Group English Sessions | Learn Together | Takalam English Center",
  description:
    "Join group English sessions with other motivated learners. Small groups of 5 or 10 students. Affordable, social, and effective English learning in Morocco.",
  keywords: [
    "group English classes Morocco",
    "group English sessions online",
    "English learning group",
    "affordable English classes",
    "cours anglais groupe Maroc",
    "دروس انجليزية جماعية المغرب",
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/group-sessions",
  },
  openGraph: {
    title: "Group English Sessions | Takalam English Center",
    description:
      "Join affordable group English sessions with motivated learners. Small groups for maximum learning.",
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
      name: "Group Sessions",
      item: "https://takalamenglish.ma/group-sessions",
    },
  ],
};

export default function GroupSessionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content" className="pt-32">
        <GroupSessions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
