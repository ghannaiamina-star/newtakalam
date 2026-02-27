import type { Metadata } from "next";
import Header from "../components/Header";
import IntroVideo from "../components/IntroVideo";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Meet Your Teacher | Takalam English Center Morocco",
  description:
    "Meet the expert English teachers at Takalam. Watch our introduction video and see how our personalized approach helps you speak English with confidence.",
  keywords: [
    "English teacher Morocco",
    "meet Takalam teacher",
    "English tutor video",
    "Takalam English teachers",
    "professeur anglais Takalam",
    "معلم انجليزي تكلم",
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/meet-teacher",
  },
  openGraph: {
    title: "Meet Your Teacher | Takalam English Center",
    description:
      "Meet the dedicated teachers helping you achieve English fluency.",
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
      name: "Meet Your Teacher",
      item: "https://takalamenglish.ma/meet-teacher",
    },
  ],
};

export default function MeetTeacherPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content" className="pt-32">
        <IntroVideo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
