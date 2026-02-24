"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../i18n/useTranslation";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actions?: ActionButton[];
  quickReplies?: string[];
}

interface ActionButton {
  label: string;
  action: string;
  href?: string;
}

// Comprehensive FAQ knowledge base with keywords for matching
const faqKnowledge = {
  en: [
    // LEVELS & GETTING STARTED
    {
      category: "getting-started",
      keywords: ["level", "beginner", "advanced", "start", "english level", "what level", "a1", "a2", "b1", "b2", "c1", "c2", "never studied", "no english", "zero"],
      answer: "🎯 Any level is welcome! Whether you're:\n• Complete beginner (A0-A1)\n• Elementary (A2)\n• Intermediate (B1-B2)\n• Advanced (C1-C2)\n\nLessons are 100% personalized to YOUR current level and goals. After enrollment, you'll receive a diagnostic test with a tutor to find exactly where you are.",
      followUp: ["How does the diagnostic test work?", "What are the prices?", "How do I register?"]
    },
    {
      category: "getting-started",
      keywords: ["how to start", "register", "sign up", "join", "enroll", "begin", "first step", "get started"],
      answer: "🚀 Getting started is easy!\n\n1️⃣ Fill out the registration form on our website\n2️⃣ Choose your package (private or group)\n3️⃣ Complete payment (bank transfer or PayPal)\n4️⃣ Upload payment proof in the form\n5️⃣ Get your 15-min oral diagnostic test with a tutor\n6️⃣ Start learning!\n\nThe whole process takes less than 10 minutes!",
      actions: [{ label: "📝 Register Now", action: "scroll", href: "#contact" }],
      followUp: ["What payment methods do you accept?", "What are the prices?"]
    },
    {
      category: "getting-started",
      keywords: ["diagnostic", "test", "assessment", "level test", "placement", "evaluate"],
      answer: "🧪 After payment, you'll receive a 15-minute oral diagnostic test as a bonus:\n\n✅ Conducted live with one of our tutors\n✅ Via Zoom/Google Meet\n✅ Assesses speaking, listening & vocabulary\n✅ No written tests - purely conversational\n✅ Results help customize your learning plan\n✅ No pressure - it's just to help us help you!",
      followUp: ["When do sessions start?", "Who is the teacher?"]
    },
    // PRICING
    {
      category: "pricing",
      keywords: ["price", "cost", "how much", "pricing", "fee", "expensive", "affordable", "cheap", "rates", "tariff", "money"],
      answer: "💰 Our transparent pricing:\n\n**Private Sessions (1-on-1, 50 min):**\n• Single session: 200 MAD\n• Weekly (4 sessions): 550 MAD ✨ Save 13%\n• Monthly (16 sessions): 2,200 MAD ✨ Save 31%\n• Trimester (48 sessions): 6,500 MAD ✨ Save 32%\n\n**Group Sessions (1 hour/week):**\n• Group of 10: 200 MAD/month 🔥 Most affordable\n• Group of 5: 400 MAD/month 💎 More speaking time",
      actions: [{ label: "💳 See Full Pricing", action: "scroll", href: "#pricing" }],
      followUp: ["What's the difference between groups?", "Which package is best for me?"]
    },
    {
      category: "pricing",
      keywords: ["difference", "group 5", "group 10", "which group", "better", "compare", "vs", "versus"],
      answer: "🤔 Group of 5 vs Group of 10:\n\n**Group of 10 (200 MAD/month):**\n✅ Most affordable option\n✅ Learn with more classmates\n✅ Great for shy learners who prefer listening first\n\n**Group of 5 (400 MAD/month):**\n✅ 2x more speaking time per person\n✅ More personalized attention\n✅ Faster progress\n✅ Better for active learners\n\nBoth have the same teaching quality!",
      followUp: ["When do groups start?", "Can I switch groups later?"]
    },
    {
      category: "pricing",
      keywords: ["best package", "recommend", "which package", "best for me", "should i choose", "suggestion"],
      answer: "🎁 My recommendations:\n\n**For budget-conscious learners:**\n→ Group of 10 (200 MAD/month)\n\n**For balanced learning:**\n→ Group of 5 (400 MAD/month)\n\n**For serious improvement:**\n→ Monthly private package (2,200 MAD)\n\n**For exam prep or urgent needs:**\n→ Trimester private (6,500 MAD)\n\n**Just want to try first?**\n→ Single session (200 MAD)",
      actions: [{ label: "📝 Choose Your Package", action: "scroll", href: "#contact" }]
    },
    // SESSIONS & SCHEDULING
    {
      category: "sessions",
      keywords: ["how long", "duration", "minutes", "session length", "time", "hour"],
      answer: "⏱️ Session durations:\n\n• **Private sessions:** 50 minutes\n  (Optimal for focused learning)\n\n• **Group sessions:** 60 minutes\n  (More time for group activities)\n\nWhy 50 minutes for private? Research shows this is the sweet spot for maximum concentration and retention!",
      followUp: ["How many sessions per week?", "Can I book multiple sessions?"]
    },
    {
      category: "sessions",
      keywords: ["schedule", "time slot", "change time", "flexible", "when", "availability", "morning", "evening", "weekend"],
      answer: "📅 Scheduling flexibility:\n\n**Private Sessions:**\n✅ Flexible scheduling\n✅ Book times that work for YOU\n✅ Morning, afternoon, or evening slots\n✅ Weekdays & weekends available\n\n**Group Sessions:**\n⚠️ Fixed schedule (set when group forms)\n⚠️ Cannot change after group starts\n⚠️ Make sure you can commit before joining!",
      followUp: ["What if I miss a session?", "Can I reschedule?"]
    },
    {
      category: "sessions",
      keywords: ["miss", "missed", "absent", "skip", "can't attend", "reschedule", "postpone", "late"],
      answer: "📋 Rescheduling policy:\n\n✅ **24+ hours notice:** Free rescheduling\n⚠️ **Less than 24 hours:** Session counted as completed\n❌ **No-show:** Session counted as completed\n\n💡 Tip: Life happens! Just let us know in advance and we'll find a new time that works.",
      followUp: ["What's your refund policy?", "How do I contact you?"]
    },
    {
      category: "sessions",
      keywords: ["group", "start", "when", "begin", "fill", "seats", "wait", "waiting", "form"],
      answer: "👥 How groups start:\n\n• Groups start ONLY when all seats are filled\n• Group of 10 → needs 10 learners\n• Group of 5 → needs 5 learners\n\n⏳ **What happens while waiting?**\n• We'll contact you once your group is complete\n• If group doesn't form in 30 days → 100% refund\n• You choose your preferred schedule during registration",
      followUp: ["How long is the wait usually?", "Can I get a refund if I can't wait?"]
    },
    // PAYMENT
    {
      category: "payment",
      keywords: ["payment", "pay", "bank", "paypal", "transfer", "money", "how to pay", "cih", "wire"],
      answer: "💳 Payment options:\n\n**Bank Transfer (CIH Bank):**\n• Transfer to our CIH account\n• Upload screenshot in registration form\n\n**PayPal:**\n• Pay via PayPal\n• Upload confirmation screenshot\n\n⚠️ **Important:**\n• Payment must be completed BEFORE first session\n• Keep your payment proof!\n• We'll confirm receipt within 24 hours",
      followUp: ["What's your refund policy?", "Can I pay in installments?"]
    },
    {
      category: "payment",
      keywords: ["installment", "split", "pay later", "partial", "credit"],
      answer: "💰 Payment terms:\n\nCurrently, we require full payment upfront before sessions begin.\n\n**Why?** This ensures commitment and allows us to reserve your time slots.\n\n💡 **Budget-friendly options:**\n• Start with a single session (200 MAD)\n• Try the monthly group (200 MAD/month)\n• Use the weekly package for smaller commitment",
      followUp: ["What are the package prices?", "What's the refund policy?"]
    },
    // REFUNDS
    {
      category: "refund",
      keywords: ["refund", "money back", "cancel", "cancellation", "get refund", "return", "guarantee"],
      answer: "💸 Refund Policy:\n\n**Private Sessions:**\n• Before 1st session: 100% refund ✅\n• Within 1st week: 80% refund\n• Within 1st month: 50% refund\n• After 30 days: No refund\n\n**Group Sessions:**\n• If group doesn't form in 30 days: 100% refund ✅\n• After group starts: Standard policy applies\n\n🛡️ **Money-back guarantee:** If you're not satisfied after your first session, we'll work with you to find a solution!",
      followUp: ["How do I request a refund?", "What if I'm not satisfied?"]
    },
    // TECHNICAL
    {
      category: "technical",
      keywords: ["equipment", "need", "computer", "phone", "laptop", "device", "zoom", "google meet", "requirements", "internet"],
      answer: "🖥️ What you need:\n\n✅ Smartphone, tablet, or computer\n✅ Stable internet connection\n✅ Quiet space to focus\n✅ Headphones (recommended)\n\n**Platforms we use:**\n• Zoom (free to download)\n• Google Meet (works in browser)\n\nNo special software or equipment needed! Most learners use their phone.",
      followUp: ["How do I download Zoom?", "Is it really all online?"]
    },
    {
      category: "technical",
      keywords: ["online", "in person", "location", "where", "virtual", "physical", "meet", "office"],
      answer: "🌐 100% Online Learning!\n\n✅ Learn from home, office, or anywhere\n✅ No commuting needed\n✅ Just need internet connection\n✅ Zoom or Google Meet\n\nStudents join from Morocco, Europe, USA, and beyond! The flexibility of online learning means you can learn from anywhere in the world.",
      followUp: ["What equipment do I need?", "What time zones do you support?"]
    },
    // TEACHER & METHOD
    {
      category: "teacher",
      keywords: ["teacher", "who", "said", "instructor", "tutor", "coach", "about you", "experience", "qualified", "team", "tutors"],
      answer: "👋 Meet the Takalam Team!\n\n🏫 Founded by Said, a Moroccan English teacher\n🌟 Team of qualified English tutors\n📚 Years of experience with adult learners\n🎯 Focus: Speaking confidence & fluency\n💬 Method: Practical, real-life English\n❌ NOT: Boring textbook grammar\n\nOur goal? Help you SPEAK confidently, not memorize rules. We understand the challenges Moroccan learners face!",
      followUp: ["What's your teaching method?", "What will I learn?"]
    },
    {
      category: "teacher",
      keywords: ["method", "approach", "teach", "learn", "style", "how do you teach", "methodology"],
      answer: "📖 My Teaching Method:\n\n🗣️ **Speaking-focused:** 80% of class is YOU speaking\n🎯 **Practical:** Real conversations, not textbook exercises\n🔄 **Personalized:** Lessons based on YOUR goals\n💼 **Relevant:** Topics you actually need (work, travel, social)\n😊 **Supportive:** Mistakes are welcome - that's how we learn!\n\nNo grammar drills. No memorizing lists. Just real English practice.",
      followUp: ["What topics do you cover?", "Can you help with exams?"]
    },
    // SPECIFIC PROGRAMS
    {
      category: "programs",
      keywords: ["ielts", "toefl", "exam", "test prep", "duolingo", "det", "cambridge", "certification"],
      answer: "📝 Exam Preparation:\n\n✅ IELTS (Academic & General)\n✅ TOEFL (iBT & PBT)\n✅ Duolingo English Test (DET)\n✅ Cambridge exams (FCE, CAE)\n\n**What's included:**\n• Test strategies & tips\n• Practice tests\n• Speaking mock exams\n• Writing feedback\n• Confidence building\n\nMany students have achieved their target scores!",
      followUp: ["What score can I expect?", "How many sessions do I need?"]
    },
    {
      category: "programs",
      keywords: ["business", "work", "professional", "corporate", "meetings", "email", "presentation"],
      answer: "💼 Business English:\n\n**What we cover:**\n• Professional emails & writing\n• Meeting participation\n• Presentations & public speaking\n• Negotiations & persuasion\n• Client calls & networking\n• Job interviews\n\n**Perfect for:**\n• Professionals working with international clients\n• Job seekers targeting English-speaking companies\n• Entrepreneurs going global",
      followUp: ["Can you help with job interviews?", "What's your availability for business clients?"]
    },
    {
      category: "programs",
      keywords: ["conversation", "speaking", "talk", "chat", "fluent", "fluency", "confidence"],
      answer: "💬 Conversational English:\n\n**Focus areas:**\n• Everyday conversations\n• Social situations\n• Expressing opinions\n• Travel English\n• Making friends internationally\n• Pop culture & entertainment\n\n**My approach:**\n• 80% of class is YOU speaking\n• Real topics you care about\n• Build confidence step by step\n• Learn to think in English",
      followUp: ["How fast will I improve?", "What if I'm too shy to speak?"]
    },
    // CONTACT & COMMUNICATION
    {
      category: "contact",
      keywords: ["whatsapp", "contact", "communicate", "message", "call", "email", "reach", "support"],
      answer: "📞 How to reach us:\n\n**WhatsApp:**\n+212 722 774 753\n\n**Email:**\ntakalamenglishcenter@gmail.com\n\n✅ We're available anytime!\n✅ Questions before or after registration\n✅ WhatsApp or email - your choice!\n\n⚡ Response time: Within a few hours (usually faster!)",
      followUp: ["How do I register?", "What's the payment process?"]
    },
    // PACKAGE CHANGES
    {
      category: "packages",
      keywords: ["change package", "upgrade", "switch package", "different package", "downgrade", "modify"],
      answer: "🔄 Changing your package:\n\n**Upgrades:** ✅ Yes! Contact us anytime to upgrade to a larger package. We'll credit remaining sessions.\n\n**Downgrades:** Contact us to discuss options.\n\n**Group → Private:** Possible! Extra payment for the difference.\n\n**Private → Group:** Discuss with us for best solution.\n\nWe're flexible! Just reach out and we'll find a solution.",
      followUp: ["How do I contact you?", "What are all the packages?"]
    },
    // RESULTS & EXPECTATIONS
    {
      category: "results",
      keywords: ["result", "improve", "progress", "how long", "fast", "quickly", "expect", "outcome", "success"],
      answer: "📈 What to expect:\n\n**Typical progress:**\n• After 1 month: More confidence, better pronunciation\n• After 3 months: Noticeably more fluent\n• After 6 months: Significant improvement in all areas\n\n**Factors that affect speed:**\n• Your starting level\n• Practice between sessions\n• Session frequency\n• Your commitment\n\n💡 Consistency is key! Regular practice beats occasional cramming.",
      followUp: ["How many sessions should I take?", "What's the best package for fast progress?"]
    },
    // GENERAL GREETINGS
    {
      category: "greeting",
      keywords: ["hello", "hi", "hey", "good morning", "good evening", "salam", "salut", "bonjour"],
      answer: "👋 Hello! Welcome to Takalam!\n\nI'm here to help you with any questions about:\n• 📚 Our English courses\n• 💰 Pricing & packages\n• 📅 Scheduling & sessions\n• 💳 Payment methods\n• 📋 Policies & refunds\n\nWhat would you like to know?",
      followUp: ["What are your prices?", "How do I get started?", "Who is the teacher?"]
    },
    // THANKS
    {
      category: "thanks",
      keywords: ["thank", "thanks", "merci", "شكر", "appreciate", "helpful"],
      answer: "😊 You're welcome! I'm happy to help!\n\nIs there anything else you'd like to know about our English courses? I'm here for you!",
      followUp: ["I want to register", "I have another question"]
    }
  ],
  fr: [
    // NIVEAUX & DÉMARRAGE
    {
      category: "getting-started",
      keywords: ["niveau", "débutant", "avancé", "commencer", "a1", "a2", "b1", "b2", "c1", "c2", "zéro", "jamais étudié"],
      answer: "🎯 Tous les niveaux sont acceptés !\n\n• Débutant complet (A0-A1)\n• Élémentaire (A2)\n• Intermédiaire (B1-B2)\n• Avancé (C1-C2)\n\nLes leçons sont 100% personnalisées selon VOTRE niveau et vos objectifs. On commence par un test diagnostic gratuit pour évaluer exactement où vous en êtes.",
      followUp: ["Comment fonctionne le test?", "Quels sont les tarifs?", "Comment m'inscrire?"]
    },
    {
      category: "getting-started",
      keywords: ["inscrire", "inscription", "rejoindre", "commencer", "première étape", "démarrer", "s'inscrire"],
      answer: "🚀 C'est facile de commencer !\n\n1️⃣ Remplissez le formulaire d'inscription\n2️⃣ Choisissez votre forfait (privé ou groupe)\n3️⃣ Effectuez le paiement (virement ou PayPal)\n4️⃣ Téléchargez la preuve de paiement\n5️⃣ Recevez votre test diagnostic gratuit\n6️⃣ Commencez à apprendre !\n\nTout le processus prend moins de 10 minutes !",
      actions: [{ label: "📝 S'inscrire", action: "scroll", href: "#contact" }],
      followUp: ["Quels modes de paiement acceptez-vous?", "Quels sont les tarifs?"]
    },
    {
      category: "getting-started",
      keywords: ["diagnostic", "test", "évaluation", "placement", "évaluer"],
      answer: "🧪 Après paiement, vous recevrez un test diagnostic GRATUIT de 15 minutes :\n\n✅ Réalisé via Zoom/Google Meet\n✅ Évalue expression orale, écoute & vocabulaire\n✅ Pas de tests écrits - purement conversationnel\n✅ Les résultats personnalisent votre plan d'apprentissage\n✅ Sans pression - c'est juste pour mieux vous aider !",
      followUp: ["Quand commencent les sessions?", "Qui est le professeur?"]
    },
    // TARIFS
    {
      category: "pricing",
      keywords: ["prix", "coût", "combien", "tarif", "frais", "cher", "abordable", "pas cher", "argent"],
      answer: "💰 Nos tarifs transparents :\n\n**Sessions Privées (1-à-1, 50 min) :**\n• Session unique : 200 MAD\n• Hebdomadaire (4 sessions) : 550 MAD ✨ -13%\n• Mensuel (16 sessions) : 2 200 MAD ✨ -31%\n• Trimestriel (48 sessions) : 6 500 MAD ✨ -32%\n\n**Sessions de Groupe (1h/semaine) :**\n• Groupe de 10 : 200 MAD/mois 🔥 Le plus économique\n• Groupe de 5 : 400 MAD/mois 💎 Plus de temps de parole",
      actions: [{ label: "💳 Voir les Tarifs", action: "scroll", href: "#pricing" }],
      followUp: ["Quelle est la différence entre les groupes?", "Quel forfait me convient?"]
    },
    {
      category: "pricing",
      keywords: ["différence", "groupe 5", "groupe 10", "quel groupe", "meilleur", "comparer", "vs"],
      answer: "🤔 Groupe de 5 vs Groupe de 10 :\n\n**Groupe de 10 (200 MAD/mois) :**\n✅ Option la plus économique\n✅ Apprendre avec plus de camarades\n✅ Idéal pour les timides qui préfèrent écouter d'abord\n\n**Groupe de 5 (400 MAD/mois) :**\n✅ 2x plus de temps de parole par personne\n✅ Attention plus personnalisée\n✅ Progrès plus rapides\n✅ Meilleur pour les apprenants actifs\n\nMême qualité d'enseignement pour les deux !",
      followUp: ["Quand commencent les groupes?", "Puis-je changer de groupe?"]
    },
    // SESSIONS & PLANNING
    {
      category: "sessions",
      keywords: ["durée", "minutes", "temps", "heure", "longueur"],
      answer: "⏱️ Durée des sessions :\n\n• **Sessions privées :** 50 minutes\n  (Optimal pour un apprentissage concentré)\n\n• **Sessions de groupe :** 60 minutes\n  (Plus de temps pour les activités de groupe)\n\nPourquoi 50 minutes en privé ? Les recherches montrent que c'est le temps idéal pour une concentration et rétention maximales !",
      followUp: ["Combien de sessions par semaine?", "Puis-je réserver plusieurs sessions?"]
    },
    {
      category: "sessions",
      keywords: ["horaire", "créneau", "changer heure", "flexible", "quand", "disponibilité", "matin", "soir", "weekend"],
      answer: "📅 Flexibilité des horaires :\n\n**Sessions Privées :**\n✅ Horaires flexibles\n✅ Réservez aux heures qui VOUS conviennent\n✅ Créneaux matin, après-midi ou soir\n✅ Semaine & week-end disponibles\n\n**Sessions de Groupe :**\n⚠️ Horaire fixe (défini à la formation du groupe)\n⚠️ Ne peut pas changer après le début\n⚠️ Assurez-vous de pouvoir vous engager avant de rejoindre !",
      followUp: ["Et si je manque une session?", "Puis-je reporter?"]
    },
    {
      category: "sessions",
      keywords: ["manquer", "absent", "rater", "reporter", "annuler", "retard"],
      answer: "📋 Politique de report :\n\n✅ **Préavis 24h+:** Report gratuit\n⚠️ **Moins de 24h:** Session comptée comme effectuée\n❌ **Absence:** Session comptée comme effectuée\n\n💡 Conseil : La vie nous réserve des surprises ! Prévenez-nous à l'avance et on trouvera un nouveau créneau.",
      followUp: ["Quelle est votre politique de remboursement?", "Comment vous contacter?"]
    },
    {
      category: "sessions",
      keywords: ["groupe", "commencer", "quand", "début", "remplir", "places", "attendre", "former"],
      answer: "👥 Comment les groupes démarrent :\n\n• Les groupes commencent UNIQUEMENT quand toutes les places sont remplies\n• Groupe de 10 → besoin de 10 apprenants\n• Groupe de 5 → besoin de 5 apprenants\n\n⏳ **Que se passe-t-il pendant l'attente ?**\n• Nous vous contacterons une fois votre groupe complet\n• Si le groupe ne se forme pas en 30 jours → remboursement 100%\n• Vous choisissez votre horaire préféré lors de l'inscription",
      followUp: ["Combien de temps l'attente généralement?", "Puis-je être remboursé si je ne peux pas attendre?"]
    },
    // PAIEMENT
    {
      category: "payment",
      keywords: ["paiement", "payer", "banque", "paypal", "virement", "cih", "comment payer"],
      answer: "💳 Options de paiement :\n\n**Virement Bancaire (CIH Bank) :**\n• Transférez sur notre compte CIH\n• Téléchargez la capture d'écran dans le formulaire\n\n**PayPal :**\n• Payez via PayPal\n• Téléchargez la confirmation\n\n⚠️ **Important :**\n• Paiement à effectuer AVANT la première session\n• Gardez votre preuve de paiement !\n• Confirmation sous 24 heures",
      followUp: ["Quelle est votre politique de remboursement?", "Puis-je payer en plusieurs fois?"]
    },
    // REMBOURSEMENT
    {
      category: "refund",
      keywords: ["remboursement", "annulation", "rembourser", "annuler", "récupérer", "garantie"],
      answer: "💸 Politique de Remboursement :\n\n**Sessions Privées :**\n• Avant 1ère session : 100% remboursé ✅\n• Première semaine : 80% remboursé\n• Premier mois : 50% remboursé\n• Après 30 jours : Pas de remboursement\n\n**Sessions de Groupe :**\n• Si groupe ne se forme pas en 30 jours : 100% remboursé ✅\n• Après début du groupe : Politique standard\n\n🛡️ **Garantie satisfait ou remboursé !**",
      followUp: ["Comment demander un remboursement?", "Et si je ne suis pas satisfait?"]
    },
    // TECHNIQUE
    {
      category: "technical",
      keywords: ["équipement", "besoin", "ordinateur", "téléphone", "laptop", "appareil", "zoom", "google meet", "internet"],
      answer: "🖥️ Ce dont vous avez besoin :\n\n✅ Smartphone, tablette ou ordinateur\n✅ Connexion internet stable\n✅ Espace calme pour vous concentrer\n✅ Casque (recommandé)\n\n**Plateformes utilisées :**\n• Zoom (gratuit à télécharger)\n• Google Meet (fonctionne dans le navigateur)\n\nPas d'équipement spécial ! La plupart utilisent leur téléphone.",
      followUp: ["Comment télécharger Zoom?", "C'est vraiment 100% en ligne?"]
    },
    {
      category: "technical",
      keywords: ["en ligne", "présentiel", "lieu", "où", "virtuel", "physique", "bureau"],
      answer: "🌐 Apprentissage 100% En Ligne !\n\n✅ Apprenez de chez vous, au bureau, ou n'importe où\n✅ Pas de déplacement\n✅ Juste besoin d'une connexion internet\n✅ Via Zoom ou Google Meet\n\nDes étudiants nous rejoignent du Maroc, d'Europe, des USA et d'ailleurs !",
      followUp: ["Quel équipement me faut-il?", "Quels fuseaux horaires supportez-vous?"]
    },
    // PROFESSEUR
    {
      category: "teacher",
      keywords: ["professeur", "qui", "said", "instructeur", "tuteur", "coach", "expérience", "qualifié"],
      answer: "👋 Rencontrez votre professeur - Said !\n\n🎓 Professeur d'anglais marocain\n📚 Années d'expérience avec les adultes\n🎯 Focus : Confiance et fluidité à l'oral\n💬 Méthode : Anglais pratique et réel\n❌ PAS : Grammaire ennuyeuse des manuels\n\nMon objectif ? Vous aider à PARLER avec confiance !",
      followUp: ["Quelle est votre méthode?", "Qu'est-ce que j'apprendrai?"]
    },
    // PROGRAMMES
    {
      category: "programs",
      keywords: ["ielts", "toefl", "examen", "préparation", "duolingo", "det", "cambridge", "certification"],
      answer: "📝 Préparation aux Examens :\n\n✅ IELTS (Académique & Général)\n✅ TOEFL (iBT & PBT)\n✅ Duolingo English Test (DET)\n✅ Examens Cambridge (FCE, CAE)\n\n**Ce qui est inclus :**\n• Stratégies et astuces\n• Tests pratiques\n• Simulations d'oral\n• Correction d'écriture\n• Développement de la confiance",
      followUp: ["Quel score puis-je espérer?", "Combien de sessions me faut-il?"]
    },
    {
      category: "programs",
      keywords: ["business", "travail", "professionnel", "entreprise", "réunion", "email", "présentation"],
      answer: "💼 Anglais des Affaires :\n\n**Ce qu'on couvre :**\n• Emails & écriture professionnelle\n• Participation aux réunions\n• Présentations & prise de parole\n• Négociations & persuasion\n• Appels clients & networking\n• Entretiens d'embauche\n\n**Parfait pour :**\n• Professionnels avec clients internationaux\n• Chercheurs d'emploi visant des entreprises anglophones",
      followUp: ["Pouvez-vous m'aider pour les entretiens?", "Quelle est votre disponibilité?"]
    },
    // CONTACT
    {
      category: "contact",
      keywords: ["whatsapp", "contact", "communiquer", "message", "appeler", "email", "joindre", "support"],
      answer: "📞 Comment nous joindre :\n\n**WhatsApp :**\n+212 722 774 753\n\n**Email :**\ntakalamenglishcenter@gmail.com\n\n✅ Nous sommes disponibles à tout moment !\n✅ Questions avant ou après l'inscription\n✅ WhatsApp ou email - c'est votre choix !\n\n⚡ Temps de réponse : En quelques heures (souvent plus rapide !)",
      followUp: ["Comment m'inscrire?", "Comment se passe le paiement?"]
    },
    // SALUTATIONS
    {
      category: "greeting",
      keywords: ["bonjour", "salut", "bonsoir", "hello", "hi", "salam"],
      answer: "👋 Bonjour ! Bienvenue chez Takalam !\n\nJe suis là pour vous aider avec vos questions sur :\n• 📚 Nos cours d'anglais\n• 💰 Tarifs & forfaits\n• 📅 Horaires & sessions\n• 💳 Modes de paiement\n• 📋 Politiques & remboursements\n\nQue souhaitez-vous savoir ?",
      followUp: ["Quels sont vos tarifs?", "Comment démarrer?", "Qui est le professeur?"]
    },
    // REMERCIEMENTS
    {
      category: "thanks",
      keywords: ["merci", "thanks", "remercie", "gentil"],
      answer: "😊 De rien ! Je suis heureux de vous aider !\n\nY a-t-il autre chose que vous aimeriez savoir sur nos cours d'anglais ?",
      followUp: ["Je veux m'inscrire", "J'ai une autre question"]
    }
  ],
  ar: [
    // المستويات والبداية
    {
      category: "getting-started",
      keywords: ["مستوى", "مبتدئ", "متقدم", "ابدأ", "أبدأ", "أ1", "أ2", "ب1", "ب2", "صفر", "لا أعرف انجليزي", "ماعرفش"],
      answer: "🎯 جميع المستويات مرحب بها!\n\n• مبتدئ تماماً (A0-A1)\n• مستوى أولي (A2)\n• متوسط (B1-B2)\n• متقدم (C1-C2)\n\nالدروس مخصصة 100% حسب مستواك وأهدافك. نبدأ باختبار تشخيصي مجاني لمعرفة مستواك الحقيقي.",
      followUp: ["كيف يعمل الاختبار؟", "ما هي الأسعار؟", "كيف أسجل؟"]
    },
    {
      category: "getting-started",
      keywords: ["تسجيل", "سجل", "انضم", "ابدأ", "أول خطوة", "كيف أبدأ", "أريد أن أبدأ"],
      answer: "🚀 البدء سهل جداً!\n\n1️⃣ املأ استمارة التسجيل على موقعنا\n2️⃣ اختر الباقة (خاصة أو جماعية)\n3️⃣ أكمل الدفع (تحويل بنكي أو PayPal)\n4️⃣ ارفع صورة الدفع\n5️⃣ احصل على اختبارك التشخيصي المجاني\n6️⃣ ابدأ التعلم!\n\nالعملية كلها تستغرق أقل من 10 دقائق!",
      actions: [{ label: "📝 سجل الآن", action: "scroll", href: "#contact" }],
      followUp: ["ما هي طرق الدفع؟", "ما هي الأسعار؟"]
    },
    {
      category: "getting-started",
      keywords: ["تشخيصي", "اختبار", "تقييم", "مستوى", "تحديد مستوى"],
      answer: "🧪 بعد الدفع، ستحصل على اختبار تشخيصي مجاني لمدة 15 دقيقة:\n\n✅ عبر Zoom أو Google Meet\n✅ يقيّم النطق والاستماع والمفردات\n✅ لا اختبارات كتابية - محادثة فقط\n✅ النتائج تساعد على تخصيص خطة تعلمك\n✅ بدون ضغط - هذا فقط لمساعدتك!",
      followUp: ["متى تبدأ الحصص؟", "من هو المدرس؟"]
    },
    // الأسعار
    {
      category: "pricing",
      keywords: ["سعر", "كم", "تكلفة", "أسعار", "ثمن", "رخيص", "غالي", "فلوس", "درهم"],
      answer: "💰 أسعارنا الشفافة:\n\n**الحصص الخاصة (1-1، 50 دقيقة):**\n• حصة واحدة: 200 درهم\n• أسبوعي (4 حصص): 550 درهم ✨ وفر 13%\n• شهري (16 حصة): 2,200 درهم ✨ وفر 31%\n• فصلي (48 حصة): 6,500 درهم ✨ وفر 32%\n\n**حصص المجموعات (ساعة/أسبوع):**\n• مجموعة 10: 200 درهم/شهر 🔥 الأرخص\n• مجموعة 5: 400 درهم/شهر 💎 وقت تحدث أكثر",
      actions: [{ label: "💳 شاهد الأسعار", action: "scroll", href: "#pricing" }],
      followUp: ["ما الفرق بين المجموعات؟", "أي باقة تناسبني؟"]
    },
    {
      category: "pricing",
      keywords: ["فرق", "مجموعة 5", "مجموعة 10", "أي مجموعة", "أفضل", "مقارنة"],
      answer: "🤔 مجموعة 5 مقابل مجموعة 10:\n\n**مجموعة 10 (200 درهم/شهر):**\n✅ الخيار الأرخص\n✅ تعلم مع زملاء أكثر\n✅ مثالي للخجولين\n\n**مجموعة 5 (400 درهم/شهر):**\n✅ ضعف وقت التحدث لكل شخص\n✅ اهتمام شخصي أكثر\n✅ تقدم أسرع\n✅ أفضل للمتعلمين النشطين\n\nنفس جودة التدريس للاثنين!",
      followUp: ["متى تبدأ المجموعات؟", "هل يمكنني تغيير المجموعة؟"]
    },
    // الحصص والمواعيد
    {
      category: "sessions",
      keywords: ["مدة", "دقيقة", "ساعة", "وقت", "كم طول"],
      answer: "⏱️ مدة الحصص:\n\n• **الحصص الخاصة:** 50 دقيقة\n  (مثالي للتعلم المركز)\n\n• **حصص المجموعات:** 60 دقيقة\n  (وقت أكثر للأنشطة الجماعية)\n\nلماذا 50 دقيقة للخاصة؟ الأبحاث تظهر أنه الوقت المثالي للتركيز والاستيعاب!",
      followUp: ["كم حصة بالأسبوع؟", "هل يمكنني حجز عدة حصص؟"]
    },
    {
      category: "sessions",
      keywords: ["موعد", "وقت", "تغيير الوقت", "مرن", "متى", "صباح", "مساء", "عطلة"],
      answer: "📅 مرونة المواعيد:\n\n**الحصص الخاصة:**\n✅ مواعيد مرنة\n✅ احجز الأوقات التي تناسبك\n✅ صباحاً، مساءً أو ليلاً\n✅ أيام الأسبوع والعطلة\n\n**حصص المجموعات:**\n⚠️ موعد ثابت (يُحدد عند تشكيل المجموعة)\n⚠️ لا يمكن تغييره بعد البدء\n⚠️ تأكد من التزامك قبل الانضمام!",
      followUp: ["ماذا لو فاتتني حصة؟", "هل يمكنني إعادة الجدولة؟"]
    },
    {
      category: "sessions",
      keywords: ["غياب", "فات", "غاب", "تأجيل", "إعادة جدولة", "متأخر"],
      answer: "📋 سياسة إعادة الجدولة:\n\n✅ **إشعار 24+ ساعة:** إعادة جدولة مجانية\n⚠️ **أقل من 24 ساعة:** الحصة تُحسب كمكتملة\n❌ **عدم الحضور:** الحصة تُحسب كمكتملة\n\n💡 نصيحة: الحياة تحدث! فقط أخبرنا مسبقاً وسنجد وقتاً جديداً.",
      followUp: ["ما هي سياسة الاسترداد؟", "كيف أتواصل معكم؟"]
    },
    {
      category: "sessions",
      keywords: ["مجموعة", "بدء", "متى تبدأ", "انتظار", "امتلاء", "مقاعد"],
      answer: "👥 كيف تبدأ المجموعات:\n\n• المجموعات تبدأ فقط عند امتلاء جميع المقاعد\n• مجموعة 10 ← تحتاج 10 متعلمين\n• مجموعة 5 ← تحتاج 5 متعلمين\n\n⏳ **ماذا يحدث أثناء الانتظار؟**\n• سنتواصل معك عند اكتمال مجموعتك\n• إذا لم تتشكل في 30 يوم ← استرداد 100%\n• تختار موعدك المفضل عند التسجيل",
      followUp: ["كم مدة الانتظار عادة؟", "هل يمكنني الاسترداد إذا لم أستطع الانتظار؟"]
    },
    // الدفع
    {
      category: "payment",
      keywords: ["دفع", "بنك", "باي بال", "تحويل", "كيف أدفع", "cih", "سي آي إتش"],
      answer: "💳 طرق الدفع:\n\n**تحويل بنكي (CIH Bank):**\n• حوّل إلى حسابنا في CIH\n• ارفع صورة الشاشة في نموذج التسجيل\n\n**PayPal:**\n• ادفع عبر PayPal\n• ارفع صورة التأكيد\n\n⚠️ **مهم:**\n• يجب الدفع قبل الحصة الأولى\n• احتفظ بإثبات الدفع!\n• سنؤكد الاستلام خلال 24 ساعة",
      followUp: ["ما هي سياسة الاسترداد؟", "هل يمكنني الدفع بالتقسيط؟"]
    },
    // الاسترداد
    {
      category: "refund",
      keywords: ["استرداد", "إلغاء", "رد المال", "استرجاع", "ضمان"],
      answer: "💸 سياسة الاسترداد:\n\n**الحصص الخاصة:**\n• قبل الحصة الأولى: استرداد 100% ✅\n• خلال الأسبوع الأول: 80%\n• خلال الشهر الأول: 50%\n• بعد 30 يوم: لا استرداد\n\n**حصص المجموعات:**\n• إذا لم تتشكل في 30 يوم: 100% ✅\n• بعد بدء المجموعة: السياسة العادية\n\n🛡️ **ضمان استرداد المال!**",
      followUp: ["كيف أطلب استرداد؟", "ماذا لو لم أكن راضياً؟"]
    },
    // التقنية
    {
      category: "technical",
      keywords: ["معدات", "احتاج", "كمبيوتر", "هاتف", "لابتوب", "جهاز", "زوم", "جوجل ميت", "انترنت"],
      answer: "🖥️ ما تحتاجه:\n\n✅ هاتف ذكي، تابلت، أو كمبيوتر\n✅ اتصال إنترنت مستقر\n✅ مكان هادئ للتركيز\n✅ سماعات (مستحسن)\n\n**المنصات المستخدمة:**\n• Zoom (مجاني للتحميل)\n• Google Meet (يعمل في المتصفح)\n\nلا حاجة لمعدات خاصة! معظم المتعلمين يستخدمون هواتفهم.",
      followUp: ["كيف أحمل Zoom؟", "هل هو حقاً أونلاين 100%؟"]
    },
    {
      category: "technical",
      keywords: ["أونلاين", "حضوري", "مكان", "أين", "افتراضي", "مكتب"],
      answer: "🌐 تعلم 100% أونلاين!\n\n✅ تعلم من البيت، المكتب، أو أي مكان\n✅ لا حاجة للتنقل\n✅ فقط تحتاج اتصال إنترنت\n✅ عبر Zoom أو Google Meet\n\nطلاب ينضمون إلينا من المغرب، أوروبا، أمريكا وأماكن أخرى!",
      followUp: ["ما المعدات المطلوبة؟", "ما المناطق الزمنية المدعومة؟"]
    },
    // المدرس
    {
      category: "teacher",
      keywords: ["مدرس", "أستاذ", "من", "سعيد", "معلم", "مدرب", "خبرة", "مؤهل"],
      answer: "👋 تعرف على مدرسك - سعيد!\n\n🎓 مدرس إنجليزية مغربي\n📚 سنوات من الخبرة مع البالغين\n🎯 التركيز: الثقة والطلاقة في الكلام\n💬 الطريقة: إنجليزية عملية وواقعية\n❌ ليس: قواعد مملة من الكتب\n\nهدفي؟ مساعدتك على التحدث بثقة!",
      followUp: ["ما هي طريقتك؟", "ماذا سأتعلم؟"]
    },
    // البرامج
    {
      category: "programs",
      keywords: ["آيلتس", "توفل", "امتحان", "تحضير", "دولينجو", "كامبردج", "شهادة", "ielts", "toefl"],
      answer: "📝 التحضير للامتحانات:\n\n✅ IELTS (أكاديمي وعام)\n✅ TOEFL (iBT & PBT)\n✅ Duolingo English Test (DET)\n✅ امتحانات Cambridge (FCE, CAE)\n\n**ما يتضمنه:**\n• استراتيجيات ونصائح\n• اختبارات تدريبية\n• محاكاة المحادثة\n• تصحيح الكتابة\n• بناء الثقة",
      followUp: ["ما الدرجة المتوقعة؟", "كم حصة أحتاج؟"]
    },
    {
      category: "programs",
      keywords: ["بزنس", "عمل", "مهني", "شركة", "اجتماعات", "إيميل", "عرض تقديمي"],
      answer: "💼 إنجليزية الأعمال:\n\n**ما نغطيه:**\n• الإيميلات والكتابة المهنية\n• المشاركة في الاجتماعات\n• العروض والخطابة\n• التفاوض والإقناع\n• المكالمات والتواصل\n• مقابلات العمل\n\n**مثالي لـ:**\n• المحترفين مع عملاء دوليين\n• الباحثين عن عمل",
      followUp: ["هل يمكنك المساعدة في المقابلات؟", "ما أوقات توفرك؟"]
    },
    // التواصل
    {
      category: "contact",
      keywords: ["واتساب", "اتصال", "تواصل", "رسالة", "اتصل", "إيميل", "دعم"],
      answer: "📞 كيف تتواصل معنا:\n\n**واتساب:**\n+212 722 774 753\n\n**الإيميل:**\ntakalamenglishcenter@gmail.com\n\n✅ نحن متاحون في أي وقت!\n✅ أسئلة قبل أو بعد التسجيل\n✅ واتساب أو إيميل - اختيارك!\n\n⚡ وقت الرد: خلال ساعات قليلة (عادة أسرع!)",
      followUp: ["كيف أسجل؟", "ما هي عملية الدفع؟"]
    },
    // التحيات
    {
      category: "greeting",
      keywords: ["مرحبا", "سلام", "أهلا", "هلا", "صباح الخير", "مساء الخير", "hello", "hi"],
      answer: "👋 مرحباً! أهلاً بك في تكلم!\n\nأنا هنا لمساعدتك في أسئلتك حول:\n• 📚 دوراتنا في الإنجليزية\n• 💰 الأسعار والباقات\n• 📅 المواعيد والحصص\n• 💳 طرق الدفع\n• 📋 السياسات والاسترداد\n\nماذا تريد أن تعرف؟",
      followUp: ["ما هي أسعاركم؟", "كيف أبدأ؟", "من هو المدرس؟"]
    },
    // شكر
    {
      category: "thanks",
      keywords: ["شكرا", "شكراً", "مشكور", "thanks", "merci"],
      answer: "😊 عفواً! سعيد بمساعدتك!\n\nهل هناك شيء آخر تريد معرفته عن دوراتنا في الإنجليزية؟",
      followUp: ["أريد التسجيل", "لدي سؤال آخر"]
    }
  ]
};

// Greeting messages
const greetings = {
  en: "👋 Hi! I'm Takalam's AI assistant.\n\nI can help you with:\n• 📚 Course information\n• 💰 Pricing & packages\n• 📅 Scheduling questions\n• 💳 Payment methods\n• 📋 Policies & refunds\n\nAsk me anything or tap a quick question below!",
  fr: "👋 Salut! Je suis l'assistant IA de Takalam.\n\nJe peux vous aider avec :\n• 📚 Informations sur les cours\n• 💰 Tarifs & forfaits\n• 📅 Questions d'horaire\n• 💳 Modes de paiement\n• 📋 Politiques & remboursements\n\nPosez-moi une question ou cliquez ci-dessous !",
  ar: "👋 مرحباً! أنا مساعد تكلم الذكي.\n\nيمكنني مساعدتك في:\n• 📚 معلومات الدورات\n• 💰 الأسعار والباقات\n• 📅 أسئلة المواعيد\n• 💳 طرق الدفع\n• 📋 السياسات والاسترداد\n\nاسألني أي شيء أو اضغط سؤالاً سريعاً!"
};

// Quick reply suggestions for each language
const quickReplies = {
  en: ["What are your prices?", "How do I register?", "Private vs Group?", "Who is the teacher?"],
  fr: ["Quels sont vos tarifs?", "Comment m'inscrire?", "Privé ou Groupe?", "Qui est le professeur?"],
  ar: ["ما هي الأسعار؟", "كيف أسجل؟", "خاص أم جماعي؟", "من هو المدرس؟"]
};

// Default responses when no match found
const defaultResponses = {
  en: "🤔 I'm not sure about that specific question. Here are some ways I can help:\n\n• Ask about pricing & packages\n• Ask about sessions & scheduling\n• Ask about payment methods\n• Ask about our refund policy\n\nOr contact us directly at:\n📧 takalamenglishcenter@gmail.com",
  fr: "🤔 Je ne suis pas sûr de cette question. Voici comment je peux vous aider :\n\n• Questions sur les tarifs & forfaits\n• Questions sur les sessions & horaires\n• Questions sur les paiements\n• Questions sur la politique de remboursement\n\nOu contactez-nous :\n📧 takalamenglishcenter@gmail.com",
  ar: "🤔 لست متأكداً من هذا السؤال. إليك كيف يمكنني مساعدتك:\n\n• اسأل عن الأسعار والباقات\n• اسأل عن الحصص والمواعيد\n• اسأل عن طرق الدفع\n• اسأل عن سياسة الاسترداد\n\nأو تواصل معنا مباشرة:\n📧 takalamenglishcenter@gmail.com"
};

// Chatbot translations
const chatbotText = {
  en: {
    title: "Takalam Assistant",
    subtitle: "Ask me anything!",
    placeholder: "Type your question...",
    send: "Send",
    online: "Online - replies instantly",
    thinking: "Thinking...",
    suggestedQuestions: "Quick Questions",
    poweredBy: "Powered by Takalam AI"
  },
  fr: {
    title: "Assistant Takalam",
    subtitle: "Posez-moi vos questions !",
    placeholder: "Tapez votre question...",
    send: "Envoyer",
    online: "En ligne - répond instantanément",
    thinking: "Réflexion...",
    suggestedQuestions: "Questions Rapides",
    poweredBy: "Propulsé par Takalam AI"
  },
  ar: {
    title: "مساعد تكلم",
    subtitle: "اسألني أي شيء!",
    placeholder: "اكتب سؤالك...",
    send: "إرسال",
    online: "متصل - يرد فوراً",
    thinking: "جاري التفكير...",
    suggestedQuestions: "أسئلة سريعة",
    poweredBy: "مدعوم من تكلم AI"
  }
};

export default function AIChatBot() {
  const { locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [currentLang, setCurrentLang] = useState(locale);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const lang = locale as "en" | "fr" | "ar";
  const text = chatbotText[lang] || chatbotText.en;
  const isRTL = lang === "ar";

  // Reset messages when language changes
  useEffect(() => {
    if (locale !== currentLang) {
      setCurrentLang(locale);
      // Reset messages with new language greeting
      if (isOpen) {
        setMessages([
          {
            id: Date.now(),
            text: greetings[lang] || greetings.en,
            isBot: true,
            timestamp: new Date(),
            quickReplies: quickReplies[lang] || quickReplies.en
          }
        ]);
      } else {
        setMessages([]);
      }
    }
  }, [locale, currentLang, isOpen, lang]);

  // Initialize with greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: greetings[lang] || greetings.en,
          isBot: true,
          timestamp: new Date(),
          quickReplies: quickReplies[lang] || quickReplies.en
        }
      ]);
    }
  }, [isOpen, messages.length, lang]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Synonym mappings for better understanding
  const synonyms: Record<string, string[]> = {
    // English synonyms
    price: ["cost", "fee", "rate", "charge", "pricing", "prices", "how much", "expensive", "cheap", "affordable", "money", "pay", "payment"],
    register: ["sign up", "enroll", "join", "start", "begin", "subscribe", "apply", "registration", "signup"],
    schedule: ["time", "when", "availability", "available", "timing", "hours", "slots", "book", "booking", "calendar"],
    teacher: ["instructor", "tutor", "coach", "professor", "said", "who teaches", "who is"],
    refund: ["money back", "cancel", "cancellation", "return", "reimburse", "guarantee"],
    session: ["class", "lesson", "course", "meeting", "classes", "lessons", "courses"],
    group: ["groups", "team", "collective", "together", "with others"],
    private: ["individual", "one on one", "1 on 1", "personal", "solo", "alone"],
    online: ["virtual", "remote", "internet", "zoom", "digital", "from home"],
    level: ["beginner", "intermediate", "advanced", "a1", "a2", "b1", "b2", "c1", "c2", "starter"],
    duration: ["how long", "length", "minutes", "hours", "time"],
    payment: ["pay", "bank", "transfer", "paypal", "cih", "wire"],
    missed: ["miss", "absent", "skip", "can't attend", "reschedule", "postpone", "late"],
    exam: ["ielts", "toefl", "test", "certification", "duolingo", "cambridge", "preparation"],
    business: ["work", "professional", "corporate", "office", "career", "job"],
    contact: ["email", "phone", "whatsapp", "reach", "message", "call", "support"],
    // French synonyms
    prix: ["coût", "tarif", "combien", "cher", "pas cher", "abordable", "argent", "payer"],
    inscrire: ["inscription", "rejoindre", "commencer", "démarrer", "s'inscrire"],
    horaire: ["quand", "disponibilité", "heure", "créneau", "réserver"],
    professeur: ["enseignant", "tuteur", "coach", "said", "qui enseigne"],
    remboursement: ["annulation", "rembourser", "annuler", "garantie"],
    // Arabic synonyms
    سعر: ["تكلفة", "كم", "ثمن", "فلوس", "درهم", "غالي", "رخيص"],
    تسجيل: ["سجل", "انضم", "ابدأ", "اشترك"],
    موعد: ["وقت", "متى", "حجز", "جدول"],
    مدرس: ["أستاذ", "معلم", "سعيد", "من يدرس"],
    استرداد: ["إلغاء", "رد المال", "ضمان"]
  };

  // Normalize text for matching
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[؟?!.,;:'"()]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Calculate similarity between two strings
  const similarity = (s1: string, s2: string): number => {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    
    // Check if shorter is contained in longer
    if (longer.includes(shorter)) {
      return shorter.length / longer.length + 0.5;
    }
    
    // Check word overlap
    const words1 = longer.split(' ');
    const words2 = shorter.split(' ');
    let matches = 0;
    for (const w1 of words1) {
      for (const w2 of words2) {
        if (w1 === w2 || w1.includes(w2) || w2.includes(w1)) {
          matches++;
          break;
        }
      }
    }
    return matches / Math.max(words1.length, words2.length);
  };

  // Expand query with synonyms
  const expandWithSynonyms = (query: string): string[] => {
    const words = query.split(' ');
    const expanded = new Set<string>(words);
    
    for (const word of words) {
      for (const [key, syns] of Object.entries(synonyms)) {
        if (word.includes(key) || key.includes(word) || syns.some(s => word.includes(s) || s.includes(word))) {
          expanded.add(key);
          syns.forEach(s => expanded.add(s));
        }
      }
    }
    
    return Array.from(expanded);
  };

  // Find best matching answer with improved algorithm
  const findAnswer = (question: string): { answer: string; followUp?: string[]; actions?: ActionButton[] } => {
    const normalizedQuestion = normalizeText(question);
    const questionWords = normalizedQuestion.split(' ').filter(w => w.length > 1);
    const expandedWords = expandWithSynonyms(normalizedQuestion);
    
    // Search in current language first, then English as fallback
    const languagesToSearch = lang === "en" ? ["en"] : [lang, "en"];
    
    let bestMatch = { 
      score: 0, 
      answer: "", 
      followUp: undefined as string[] | undefined, 
      actions: undefined as ActionButton[] | undefined 
    };
    
    for (const searchLang of languagesToSearch) {
      const knowledge = faqKnowledge[searchLang as keyof typeof faqKnowledge] || faqKnowledge.en;
      
      for (const item of knowledge) {
        let score = 0;
        
        for (const keyword of item.keywords) {
          const normalizedKeyword = normalizeText(keyword);
          const keywordWords = normalizedKeyword.split(' ');
          
          // Exact phrase match (highest score)
          if (normalizedQuestion.includes(normalizedKeyword)) {
            score += normalizedKeyword.length * 5;
          }
          
          // Word-by-word matching
          for (const kw of keywordWords) {
            if (kw.length < 2) continue;
            
            // Direct word match in question
            if (questionWords.some(qw => qw === kw)) {
              score += 10;
            }
            // Partial word match (word contains or is contained)
            else if (questionWords.some(qw => qw.includes(kw) || kw.includes(qw))) {
              score += 5;
            }
            // Synonym/expanded match
            else if (expandedWords.some(ew => ew === kw || ew.includes(kw) || kw.includes(ew))) {
              score += 3;
            }
          }
          
          // Fuzzy similarity bonus
          const sim = similarity(normalizedQuestion, normalizedKeyword);
          if (sim > 0.3) {
            score += sim * 5;
          }
        }
        
        // Category bonus - some questions map to specific categories
        const categoryKeywords: Record<string, string[]> = {
          pricing: ["price", "cost", "how much", "prix", "combien", "سعر", "كم", "tarif", "ثمن"],
          "getting-started": ["start", "register", "begin", "how", "commencer", "inscrire", "ابدأ", "تسجيل", "comment"],
          sessions: ["schedule", "time", "when", "duration", "long", "horaire", "quand", "موعد", "وقت", "durée"],
          teacher: ["teacher", "said", "who", "professeur", "مدرس", "سعيد", "qui"],
          refund: ["refund", "cancel", "money back", "remboursement", "استرداد", "annuler"],
          payment: ["pay", "payment", "bank", "paypal", "paiement", "دفع", "بنك"],
          technical: ["online", "zoom", "computer", "phone", "internet", "en ligne", "أونلاين"],
          programs: ["ielts", "toefl", "business", "exam", "examen", "امتحان", "work", "travail"]
        };
        
        for (const [cat, catKeywords] of Object.entries(categoryKeywords)) {
          if (item.category === cat && catKeywords.some(ck => normalizedQuestion.includes(ck))) {
            score += 8;
          }
        }
        
        if (score > bestMatch.score) {
          bestMatch = { 
            score, 
            answer: item.answer, 
            followUp: item.followUp,
            actions: item.actions
          };
        }
      }
      
      // If we found a good match, don't search other languages
      if (bestMatch.score >= 15) break;
    }
    
    // Threshold for accepting a match
    return bestMatch.score >= 8 
      ? { answer: bestMatch.answer, followUp: bestMatch.followUp, actions: bestMatch.actions }
      : { answer: defaultResponses[lang] || defaultResponses.en };
  };

  // Handle action button clicks
  const handleAction = (action: ActionButton) => {
    if (action.action === "scroll" && action.href) {
      setIsOpen(false);
      const element = document.querySelector(action.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    setShowQuickReplies(false);

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const result = findAnswer(userMessage.text);
      const botResponse: Message = {
        id: Date.now() + 1,
        text: result.answer,
        isBot: true,
        timestamp: new Date(),
        actions: result.actions,
        quickReplies: result.followUp
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Buttons Container - responsive positioning */}
      <div className={`fixed bottom-4 sm:bottom-6 ${isRTL ? "left-4 sm:left-6" : "right-4 sm:right-6"} z-50 flex flex-col gap-3 sm:gap-4 items-center`}>
        {/* Live Status Indicator - hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg text-xs font-medium text-gray-700 border border-gray-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {isRTL ? "متصل الآن • نرد خلال دقائق" : "Online • Reply in minutes"}
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/212722774753?text=Hi%20Takalam!%20I'm%20interested%20in%20learning%20English."
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 sm:w-16 sm:h-16 group"
          aria-label="Contact us on WhatsApp"
        >
          {/* Outer glow ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
          {/* Button */}
          <span className="relative w-full h-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full shadow-lg hover:shadow-2xl hover:shadow-green-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-white/30">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
          {/* Tooltip - hidden on mobile */}
          <span className={`hidden sm:block absolute ${isRTL ? "left-20" : "right-20"} top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl`}>
            💬 Chat on WhatsApp
            <span className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "-left-2" : "-right-2"} border-8 border-transparent ${isRTL ? "border-r-gray-900" : "border-l-gray-900"}`}></span>
          </span>
        </a>

        {/* AI Chat Bot Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 group"
          aria-label="Open chat"
        >
          {/* Outer animated ring - only show when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-40 animate-pulse"></span>
          )}
          {/* Button */}
          <span className={`relative w-full h-full ${isOpen ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500'} text-white rounded-full shadow-lg hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-white/30`}>
            {isOpen ? (
              <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <>
                {/* Modern AI/Sparkle icon */}
                <svg className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                </svg>
              </>
            )}
          </span>
          {/* Notification badge - only when closed */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce flex items-center justify-center text-[9px] sm:text-[10px] font-bold shadow-lg border-2 border-white">
              1
            </span>
          )}
          {/* Tooltip - hidden on mobile */}
          <span className={`hidden sm:block absolute ${isRTL ? "left-20" : "right-20"} top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl`}>
            {isOpen ? '✕ Close' : '✨ Ask AI Assistant'}
            <span className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "-left-2" : "-right-2"} border-8 border-transparent ${isRTL ? "border-r-gray-900" : "border-l-gray-900"}`}></span>
          </span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-36 ${isRTL ? "left-4" : "right-4"} z-50 w-[calc(100vw-32px)] sm:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden`}
          style={{ maxHeight: "calc(100vh - 160px)" }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zM7.5 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 9a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{text.title}</h3>
                <div className="flex items-center gap-2 text-green-100 text-sm">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  {text.online}
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${message.isBot ? (isRTL ? "justify-end" : "justify-start") : (isRTL ? "justify-start" : "justify-end")}`}
                >
                  {message.isBot && (
                    <div className={`w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ${isRTL ? "mr-2 order-last" : "mr-2"} flex-shrink-0`}>
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/>
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                      message.isBot
                        ? "bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-sm"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-tr-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
                
                {/* Action buttons */}
                {message.isBot && message.actions && (
                  <div className={`mt-2 flex flex-wrap gap-2 ${isRTL ? "pr-10" : "pl-10"}`}>
                    {message.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAction(action)}
                        className="px-4 py-2 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors shadow-sm"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Follow-up suggestions */}
                {message.isBot && message.quickReplies && (
                  <div className={`mt-3 flex flex-wrap gap-2 ${isRTL ? "pr-10" : "pl-10"}`}>
                    {message.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(reply)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-green-100 hover:text-green-700 transition-colors border border-gray-200"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className={`flex ${isRTL ? "justify-end" : "justify-start"}`}>
                <div className={`w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ${isRTL ? "mr-2 order-last" : "mr-2"} flex-shrink-0`}>
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/>
                  </svg>
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={text.placeholder}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm bg-gray-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            {/* Powered by */}
            <p className="text-center text-[10px] text-gray-400 mt-2">{text.poweredBy}</p>
          </div>
        </div>
      )}
    </>
  );
}
