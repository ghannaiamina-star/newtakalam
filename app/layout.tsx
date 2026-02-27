import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LanguageWrapper from "./components/LanguageWrapper";
import CookieConsent from "./components/CookieConsent";
import AIChatBot from "./components/AIChatBot";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1318221776728009";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://takalamenglish.ma";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Takalam English Center Morocco | Online English Classes & IELTS Prep",
    template: "%s | Takalam English Center Morocco",
  },
  description: "Takalam English Center - Morocco's online English school. Private 1-on-1 lessons & group classes. IELTS prep, business English, speaking confidence. Start today!",
  keywords: [
    // Primary English keywords
    "English classes Morocco",
    "learn English online Morocco",
    "English courses Morocco",
    "online English lessons Morocco",
    "English tutoring Morocco",
    "private English lessons",
    "group English classes",
    "English speaking practice",
    // IELTS/Exam keywords
    "IELTS preparation Morocco",
    "TOEFL preparation Morocco",
    "English exam prep",
    // Business keywords
    "business English Morocco",
    "professional English courses",
    "English for work",
    // Location keywords
    "English classes Casablanca",
    "English courses Rabat",
    "English lessons Marrakech",
    "online English Morocco",
    // Arabic keywords
    "تعلم الإنجليزية في المغرب",
    "دروس انجليزية اون لاين",
    "كورسات انجليزي المغرب",
    "مركز تكلم للانجليزية",
    // French keywords
    "cours d'anglais Maroc",
    "apprendre anglais en ligne Maroc",
    "cours anglais Casablanca",
    // Brand keywords
    "Takalam English",
    "Takalam Morocco",
    "affordable English courses Morocco"
  ],
  authors: [{ name: "Takalam English Center" }],
  creator: "Takalam English Center",
  publisher: "Takalam English Center",
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-48x48.png",
  },
  openGraph: {
    title: "Takalam English Center | Online English Courses in Morocco",
    description: "Affordable online English courses in Morocco. Structured levels, live communication sessions, and certified teachers.",
    url: siteUrl,
    siteName: "Takalam English Center",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_MA"],
    type: "website",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Takalam English Center - Learn English Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takalam English Center | Online English Courses in Morocco",
    description: "Affordable online English courses in Morocco. Structured levels, live sessions & certified teachers.",
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console - Add your verification code here after getting it from GSC
    // Steps: Go to Google Search Console > Add Property > Choose URL prefix method
    // Then select "HTML tag" verification and paste the content value here
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    // Optional: Yandex, Bing verification
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en": siteUrl,
      "fr": `${siteUrl}?lang=fr`,
      "ar": `${siteUrl}?lang=ar`,
    },
  },
  category: "Education",
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Takalam English Center",
  "alternateName": ["Takalam", "مركز تكلم للانجليزية", "Centre Takalam"],
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "image": `${siteUrl}/logo.png`,
  "description": "Morocco's leading online English center. Private 1-on-1 lessons and group classes for all levels. IELTS prep, business English, speaking confidence.",
  "email": "takalamenglishcenter@gmail.com",
  "telephone": "+212722774753",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MA",
    "addressRegion": "Morocco"
  },
  "sameAs": [
    "https://www.instagram.com/takalamenglishcenter/",
    "https://web.facebook.com/takalamenglishcenter/",
    "https://www.tiktok.com/@takalamenglishcenter"
  ],
  "areaServed": [
    {
      "@type": "Country",
      "name": "Morocco"
    },
    {
      "@type": "City",
      "name": "Casablanca"
    },
    {
      "@type": "City",
      "name": "Rabat"
    },
    {
      "@type": "City", 
      "name": "Marrakech"
    }
  ],
  "knowsLanguage": ["en", "fr", "ar"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "English Courses",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Private English Lessons"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Group English Classes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IELTS Preparation"
        }
      }
    ]
  }
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Learn English Online - Private & Group Classes",
  "description": "Personalized English courses for all levels. Private 1-on-1 sessions and group classes. IELTS prep, business English, speaking confidence training.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Takalam English Center",
    "url": siteUrl
  },
  "courseMode": "online",
  "educationalLevel": "Beginner to Advanced",
  "inLanguage": "en",
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT50M",
      "name": "Private 1-on-1 English Session"
    },
    {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT60M",
      "name": "Group English Class"
    }
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "Single Session",
      "price": "200",
      "priceCurrency": "MAD",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Monthly Package",
      "price": "2200",
      "priceCurrency": "MAD",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Group Session (10 learners)",
      "price": "200",
      "priceCurrency": "MAD",
      "availability": "https://schema.org/InStock"
    }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Takalam English Center",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

// Service schema for better service visibility
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "English Language Education",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Takalam English Center"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Morocco"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "English Courses",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Private English Lessons",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "1-on-1 English Sessions",
              "description": "Personalized private English lessons online"
            }
          }
        ]
      },
      {
        "@type": "OfferCatalog", 
        "name": "Group English Classes",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Group English Sessions",
              "description": "Small group English classes online"
            }
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Exam Preparation",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "IELTS Preparation",
              "description": "IELTS exam preparation courses"
            }
          }
        ]
      }
    ]
  }
};

// FAQ Schema for rich results in Google Search
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What level of English do I need to start at Takalam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Any level! Whether you're a complete beginner or advanced speaker looking to refine your skills, lessons are personalized to your current level and goals. We welcome learners from A1 (beginner) to C2 (advanced)."
      }
    },
    {
      "@type": "Question",
      "name": "How much do English lessons cost at Takalam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Private 1-on-1 sessions start at 200 MAD per session. We offer packages: 4 sessions for 700 MAD, 8 sessions for 1300 MAD, 12 sessions for 1800 MAD, and 16 sessions for 2200 MAD. Group sessions (10 learners) cost 200 MAD per month for 8 sessions."
      }
    },
    {
      "@type": "Question",
      "name": "Are Takalam English classes online or in-person?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All Takalam classes are 100% online via Zoom or Google Meet. You can learn from anywhere in Morocco or abroad with just a smartphone, tablet, or computer and stable internet connection."
      }
    },
    {
      "@type": "Question",
      "name": "How long is each English session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Private 1-on-1 sessions are 50 minutes long. Group sessions are 1 hour (60 minutes) and held twice per week on a fixed schedule."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods does Takalam accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept bank transfers (CIH Bank) and PayPal payments. Payment must be completed before your first session, and you'll need to upload payment proof in the registration form."
      }
    },
    {
      "@type": "Question",
      "name": "Can I reschedule my English lesson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! You can reschedule with 24 hours notice at no extra cost. Sessions missed without notice are counted as completed."
      }
    },
    {
      "@type": "Question",
      "name": "Does Takalam offer IELTS preparation courses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We offer comprehensive IELTS preparation covering all four sections: Speaking, Writing, Reading, and Listening. Our personalized coaching helps you achieve your target band score."
      }
    },
    {
      "@type": "Question",
      "name": "How do group English sessions work at Takalam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Group sessions are 1 hour long, held twice per week on a fixed schedule. Groups of 10 cost 200 MAD/month, and groups of 5 cost 350 MAD/month. Groups start only when all seats are filled."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a diagnostic test included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! After enrollment and payment, you receive a complimentary 15-minute oral diagnostic test with one of our tutors. This helps assess your level and customize your learning plan."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Takalam different from other English schools in Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Takalam focuses on 80% speaking practice rather than memorization. We provide a safe, judgment-free space where mistakes are part of learning. Lessons are personalized for your goals, not a generic curriculum."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {GA_MEASUREMENT_ID && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        {/* DNS prefetch for faster lookups */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Favicon - multiple sizes */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}?lang=fr`} />
        <link rel="alternate" hrefLang="ar" href={`${siteUrl}?lang=ar`} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      </head>
      <body className={`${inter.variable} ${notoSansArabic.variable} antialiased`}>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        
        {/* Meta Pixel */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        <LanguageWrapper>
          {children}
          <CookieConsent />
          <AIChatBot />
        </LanguageWrapper>
      </body>
    </html>
  );
}
