import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Media | Takalam English Center Morocco",
  description: "Press kit, media resources, and news coverage about Takalam English Center. Contact us for interviews, partnerships, and media inquiries.",
  keywords: [
    "Takalam press",
    "Takalam media",
    "English education Morocco news",
    "Takalam partnership",
    "English teaching startup Morocco"
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/press",
  },
  openGraph: {
    title: "Press & Media | Takalam English Center",
    description: "Media resources and press information about Takalam English Center Morocco.",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://takalamenglish.ma"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Press",
      "item": "https://takalamenglish.ma/press"
    }
  ]
};

const pressHighlights = [
  {
    stat: "2020",
    label: "Founded"
  },
  {
    stat: "100%",
    label: "Online"
  },
  {
    stat: "10+",
    label: "Countries Reached"
  }
];

const brandAssets = [
  {
    name: "Logo (Primary)",
    description: "Full color logo on white background",
    format: "PNG, SVG"
  },
  {
    name: "Logo (Dark)",
    description: "White logo for dark backgrounds",
    format: "PNG, SVG"
  },
  {
    name: "Brand Colors",
    description: "Primary: #16A34A (Green), Secondary: #0F172A (Slate)",
    format: "HEX, RGB"
  },
  {
    name: "Typography",
    description: "Inter (Headings), System fonts (Body)",
    format: "Google Fonts"
  }
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Takalam English Center"
                width={600}
                height={150}
                className="h-20 w-auto -my-2"
              />
            </Link>
            <Link
              href="/"
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Press & <span className="text-green-600">Media</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Resources for journalists, bloggers, and partners interested in covering Takalam English Center.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {pressHighlights.map((item, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-green-600">{item.stat}</div>
                <div className="text-slate-600 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">About Takalam</h2>
          <div className="prose prose-lg prose-slate max-w-none">
            <p>
              <strong>Takalam English Center</strong> is an online English teaching platform founded in Morocco, 
              dedicated to helping adults gain confidence in speaking English. Our mission is to break down 
              the barriers that prevent people from communicating effectively in English.
            </p>
            <p>
              Unlike traditional language schools that focus on grammar drills and written exercises, 
              Takalam emphasizes speaking practice and real-world communication. Our approach is simple: 
              <strong> you learn to speak by speaking</strong>. Each lesson is designed to maximize 
              speaking time and build practical skills.
            </p>
            <p>
              Founded by Said Elbouzdoudi, a Moroccan English teacher with years of experience, 
              Takalam serves students across Morocco, the Middle East, Europe, and beyond. We offer 
              private 1-on-1 sessions, group classes, exam preparation (IELTS, TOEFL), business English, 
              and programs for children.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Brand Assets</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {brandAssets.map((asset, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{asset.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{asset.description}</p>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{asset.format}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Request Brand Assets</h3>
            <p className="text-slate-600 mb-4">
              Need high-resolution logos or other brand materials? Contact us and we'll send you our press kit.
            </p>
            <a
              href="mailto:takalamenglishcenter@gmail.com?subject=Press Kit Request"
              className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request Press Kit
            </a>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Media Contact</h2>
          <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
            <p className="text-slate-700 mb-6">
              For press inquiries, interviews, or partnership opportunities, please contact:
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Email</div>
                  <a href="mailto:takalamenglishcenter@gmail.com" className="font-medium text-slate-900 hover:text-green-600">
                    takalamenglishcenter@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-slate-500">WhatsApp</div>
                  <a href="https://wa.me/212722774753?text=Hi, I have a media inquiry about Takalam." className="font-medium text-slate-900 hover:text-green-600">
                    +212 722 774 753
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Ideas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Story Ideas</h2>
          <div className="space-y-4">
            {[
              "The rise of online English education in Morocco",
              "How Moroccan professionals are using English to access global opportunities",
              "Breaking language barriers: Adult English learners overcoming fear of speaking",
              "The future of language education: Personalized learning vs. traditional classrooms",
              "From local teacher to global educator: Building an online education business"
            ].map((idea, index) => (
              <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-slate-200">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-slate-700">{idea}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Takalam English Center. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/careers" className="hover:text-white transition-colors">Teach With Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
