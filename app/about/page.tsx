import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Takalam English Center | Expert English Tutors Morocco",
  description: "Meet the team behind Takalam English Center. Professional English tutors dedicated to helping Moroccans speak fluent English with confidence.",
  keywords: [
    "English teacher Morocco",
    "about Takalam English",
    "English tutor Casablanca",
    "Moroccan English teacher",
    "learn English Morocco",
    "معلم انجليزي المغرب",
    "professeur anglais Maroc"
  ],
  alternates: {
    canonical: "https://takalamenglish.ma/about",
  },
  openGraph: {
    title: "About Takalam English Center | Your English Learning Partner",
    description: "Meet the dedicated teachers helping Moroccans achieve English fluency.",
    type: "website",
  },
};

// Person Schema for SEO
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Takalam English Teacher",
  "jobTitle": "English Language Instructor",
  "worksFor": {
    "@type": "EducationalOrganization",
    "name": "Takalam English Center",
    "url": "https://takalamenglish.ma"
  },
  "knowsLanguage": ["English", "Arabic", "French"],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University"
  }
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
      "name": "About",
      "item": "https://takalamenglish.ma/about"
    }
  ]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
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

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-green-600">Home</Link></li>
          <li><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></li>
          <li className="text-gray-900 font-medium">About Us</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            About Takalam English Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Your Partner in <span className="text-green-600">English Fluency</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re on a mission to help every Moroccan speak English with confidence. 
            No more fear, no more hesitation – just fluent, natural English.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our <span className="text-green-600">Story</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Takalam was born from a simple observation: thousands of Moroccans study English for years 
                  but still can&apos;t speak it confidently. They know grammar rules, they can read and write, 
                  but when it comes to speaking – they freeze.
                </p>
                <p>
                  We understand this because we&apos;ve been there. As Moroccan English speakers ourselves, 
                  we know the unique challenges Arabic speakers face: the fear of making mistakes, 
                  the different sentence structures, the pronunciation hurdles.
                </p>
                <p>
                  That&apos;s why we created Takalam – a learning experience designed specifically for 
                  Moroccans. We focus on what matters most: <strong>speaking practice</strong>. 
                  Real conversations, not textbook exercises. Personalized feedback, not generic lessons.
                </p>
                <p>
                  The name &ldquo;Takalam&rdquo; (تكلم) means &ldquo;speak&rdquo; in Arabic – because that&apos;s exactly 
                  what we help you do.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Numbers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: "500+", label: "Students Taught" },
                    { number: "5000+", label: "Hours of Lessons" },
                    { number: "98%", label: "Student Satisfaction" },
                    { number: "3+", label: "Years Experience" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Teaching <span className="text-green-600">Philosophy</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Speaking First",
                icon: "🎤",
                desc: "We believe in learning by doing. You'll spend most of your time actually speaking, not just listening or reading. The more you speak, the faster you improve."
              },
              {
                title: "No Judgment Zone",
                icon: "💚",
                desc: "Mistakes are how we learn. We create a safe, supportive environment where you can speak freely without fear of embarrassment. Every mistake is a step forward."
              },
              {
                title: "Personalized Approach",
                icon: "🎯",
                desc: "No two students are the same. We identify your specific weaknesses and create a custom learning path. Why work on things you already know?"
              },
              {
                title: "Real-World Focus",
                icon: "🌍",
                desc: "We teach English you'll actually use – not obscure vocabulary or complicated grammar. Practical skills for real situations."
              },
              {
                title: "Consistency Over Intensity",
                icon: "📈",
                desc: "30 minutes daily beats 3 hours weekly. We help you build sustainable habits that lead to lasting fluency."
              },
              {
                title: "Cultural Understanding",
                icon: "🇲🇦",
                desc: "As Moroccan teachers, we understand your cultural context. We know the specific challenges Arabic speakers face and how to overcome them."
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Makes Us <span className="text-green-600">Different</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-medium text-gray-500">Feature</th>
                  <th className="text-center py-4 px-6 font-medium text-gray-500">Traditional Schools</th>
                  <th className="text-center py-4 px-6 font-bold text-green-600 bg-green-50 rounded-t-xl">Takalam</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Class Size", traditional: "15-30 students", takalam: "1-on-1 sessions" },
                  { feature: "Speaking Time", traditional: "5-10 minutes/class", takalam: "45+ minutes/class" },
                  { feature: "Schedule", traditional: "Fixed times", takalam: "Flexible, you choose" },
                  { feature: "Location", traditional: "Travel to center", takalam: "Learn from home" },
                  { feature: "Curriculum", traditional: "Same for everyone", takalam: "Personalized to you" },
                  { feature: "Feedback", traditional: "Generic grades", takalam: "Detailed, specific" },
                  { feature: "Teacher", traditional: "Changes often", takalam: "Same teacher always" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-500">{row.traditional}</td>
                    <td className="py-4 px-6 text-center bg-green-50 font-medium text-green-700">{row.takalam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our <span className="text-green-600">Values</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                value: "Excellence",
                desc: "We strive for the highest quality in everything we do.",
                icon: "⭐"
              },
              {
                value: "Integrity",
                desc: "Honest feedback, fair pricing, no empty promises.",
                icon: "🤝"
              },
              {
                value: "Student Success",
                desc: "Your progress is our top priority.",
                icon: "🎓"
              },
              {
                value: "Continuous Improvement",
                desc: "We're always learning and improving our methods.",
                icon: "📚"
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.value}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Join hundreds of Moroccans who have transformed their English with Takalam.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
            >
              Book Free Trial Lesson
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© {new Date().getFullYear()} Takalam English Center. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <Link href="/" className="hover:text-green-400">Home</Link>
            <Link href="/blog" className="hover:text-green-400">Blog</Link>
            <Link href="/ielts" className="hover:text-green-400">IELTS</Link>
            <Link href="/business-english" className="hover:text-green-400">Business English</Link>
            <Link href="/rules" className="hover:text-green-400">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
