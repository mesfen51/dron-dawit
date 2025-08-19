"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "am"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.properties": "Properties",
    "nav.contact": "Contact",
    "nav.admin": "Admin",

    // Homepage
    "home.hero.title": "Welcome to Dron General Work",
    "home.hero.subtitle":
      "Your trusted partner for aluminum works, property rentals, car sales, and professional services",
    "home.hero.explore": "Explore Services",
    "home.hero.properties": "View Properties",
    "home.services.title": "Our Services",
    "home.services.subtitle":
      "From aluminum fabrication to property management, we provide comprehensive solutions for all your needs",
    "home.services.aluminum.title": "Aluminum Works",
    "home.services.aluminum.desc": "Professional aluminum fabrication and installation services",
    "home.services.aluminum.button": "Learn More",
    "home.services.cars.title": "Car Sales & Rentals",
    "home.services.cars.desc": "Quality vehicles for sale and rent at competitive prices",
    "home.services.cars.button": "View Cars",
    "home.services.property.title": "Property Management",
    "home.services.property.desc": "Houses and commercial properties for rent and sale",
    "home.services.property.button": "View Properties",
    "home.featured.title": "Featured Properties",
    "home.featured.subtitle": "Check out our latest available properties and vehicles",
    "home.featured.viewall": "View All Properties",
    "home.stats.clients": "Happy Clients",
    "home.stats.experience": "Years Experience",
    "home.stats.rating": "Average Rating",
    "home.cta.title": "Ready to Get Started?",
    "home.cta.subtitle": "Contact us today for a free consultation and discover how we can help you",
    "home.cta.contact": "Contact Us",
    "home.cta.about": "Learn About Us",
    "home.work.title": "Excellence in Every Project",
    "home.work.subtitle":
      "At Dron, every piece of work represents our commitment to quality and professional excellence",
    "footer.description": "Professional services for all your aluminum, automotive, and property needs.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.contact": "Contact Info",
    "footer.aluminum": "Aluminum Works",
    "footer.cars": "Car Sales",
    "footer.rentals": "Property Rentals",
    "footer.about": "About Us",
    "footer.projects": "Projects",
    "footer.contact.link": "Contact",
    "footer.email": "Email: info@dron.com",
    "footer.phone": "Phone: +1 (555) 123-4567",
    "footer.address": "Address: 123 Business St, City, State",
    "footer.copyright": "© 2024 Dron. All rights reserved.",

    // About Page
    "about.title": "About Dron",
    "about.subtitle": "Excellence in aluminum works, property management, and automotive services since 2014",
    "about.owner.title": "Meet Our Owner",
    "about.owner.name": "Dawit Habtamu Gugesa",
    "about.owner.position": "Founder & CEO",
    "about.owner.description":
      "With over a decade of experience in construction, automotive, and property management, Dawit Habtamu Gugesa founded Dron with a vision to provide comprehensive professional services that exceed client expectations. His commitment to quality and innovation has made Dron a trusted name in the industry.",
    "about.owner.location": "Based in Ethiopia",
    "about.owner.experience": "10+ Years Experience",
    "about.qualifications.title": "Qualifications & Expertise",
    "about.qualifications.subtitle":
      "Our owner brings extensive qualifications and certifications to ensure the highest quality service",
    "about.education": "Education",
    "about.education.desc": "Academic Background",
    "about.certifications": "Certifications",
    "about.certifications.desc": "Professional Credentials",
    "about.experience": "Experience",
    "about.experience.desc": "Professional Journey",
    "about.values.title": "Our Values",
    "about.values.subtitle": "The principles that guide everything we do at Dron",
    "about.values.quality": "Quality",
    "about.values.quality.desc": "We never compromise on quality, ensuring every project meets the highest standards",
    "about.values.integrity": "Integrity",
    "about.values.integrity.desc": "Honest, transparent business practices built on trust and reliability",
    "about.values.innovation": "Innovation",
    "about.values.innovation.desc": "Continuously improving our methods and embracing new technologies",
    "about.values.service": "Service",
    "about.values.service.desc": "Dedicated customer service that goes above and beyond expectations",
    "about.cta.title": "Ready to Work Together?",
    "about.cta.subtitle": "Get in touch with Dawit and the Dron team for your next project",
    "about.work.commitment": "Our Commitment to Excellence",
    "about.work.description":
      "At Dron, work is not just what we do - it's our passion. Every project represents our dedication to quality craftsmanship and professional excellence.",
  },
  am: {
    // Navigation
    "nav.home": "መነሻ",
    "nav.about": "ስለ እኛ",
    "nav.services": "አገልግሎቶች",
    "nav.properties": "ንብረቶች",
    "nav.contact": "ያግኙን",
    "nav.admin": "አስተዳዳሪ",

    // Homepage
    "home.hero.title": "እንኳን ወደ ድሮን ጠቅላላ ስራ በደህና መጡ",
    "home.hero.subtitle": "ለአሉሚኒየም ስራዎች፣ የንብረት ኪራይ፣ የመኪና ሽያጭ እና ሙያዊ አገልግሎቶች የታመነ አጋርዎ",
    "home.hero.explore": "አገልግሎቶችን ያስሱ",
    "home.hero.properties": "ንብረቶችን ይመልከቱ",
    "home.services.title": "አገልግሎቶቻችን",
    "home.services.subtitle": "ከአሉሚኒየም ማምረት እስከ የንብረት አስተዳደር፣ ለሁሉም ፍላጎቶችዎ ሰፊ መፍትሄዎችን እንሰጣለን",
    "home.services.aluminum.title": "የአሉሚኒየም ስራዎች",
    "home.services.aluminum.desc": "ሙያዊ የአሉሚኒየም ማምረት እና መጫን አገልግሎቶች",
    "home.services.aluminum.button": "ተጨማሪ ይወቁ",
    "home.services.cars.title": "የመኪና ሽያጭ እና ኪራይ",
    "home.services.cars.desc": "በተወዳዳሪ ዋጋ ለሽያጭ እና ለኪራይ ጥራት ያላቸው ተሽከርካሪዎች",
    "home.services.cars.button": "መኪኖችን ይመልከቱ",
    "home.services.property.title": "የንብረት አስተዳደር",
    "home.services.property.desc": "ለኪራይ እና ለሽያጭ ቤቶች እና የንግድ ንብረቶች",
    "home.services.property.button": "ንብረቶችን ይመልከቱ",
    "home.featured.title": "ተመራጭ ንብረቶች",
    "home.featured.subtitle": "የቅርብ ጊዜ የሚገኙ ንብረቶችን እና ተሽከርካሪዎችን ይመልከቱ",
    "home.featured.viewall": "ሁሉንም ንብረቶች ይመልከቱ",
    "home.stats.clients": "ደስተኛ ደንበኞች",
    "home.stats.experience": "አመታት ልምድ",
    "home.stats.rating": "አማካይ ደረጃ",
    "home.cta.title": "ለመጀመር ዝግጁ ነዎት?",
    "home.cta.subtitle": "ዛሬ ለነፃ ምክክር ያግኙን እና እንዴት ልንረዳዎ እንደምንችል ይወቁ",
    "home.cta.contact": "ያግኙን",
    "home.cta.about": "ስለ እኛ ይወቁ",
    "home.work.title": "በእያንዳንዱ ፕሮጀክት ውስጥ ብቃት",
    "home.work.subtitle": "በድሮን፣ እያንዳንዱ ስራ ለጥራት እና ለሙያዊ ብቃት ያለንን ቁርጠኝነት ይወክላል",
    "footer.description": "ለሁሉም የአሉሚኒየም፣ የመኪና እና የንብረት ፍላጎቶችዎ ሙያዊ አገልግሎቶች።",
    "footer.services": "አገልግሎቶች",
    "footer.company": "ኩባንያ",
    "footer.contact": "የመገናኛ መረጃ",
    "footer.aluminum": "የአሉሚኒየም ስራዎች",
    "footer.cars": "የመኪና ሽያጭ",
    "footer.rentals": "የንብረት ኪራይ",
    "footer.about": "ስለ እኛ",
    "footer.projects": "ፕሮጀክቶች",
    "footer.contact.link": "ያግኙን",
    "footer.email": "ኢሜይል: info@dron.com",
    "footer.phone": "ስልክ: +1 (555) 123-4567",
    "footer.address": "አድራሻ: 123 Business St, City, State",
    "footer.copyright": "© 2024 ድሮን። ሁሉም መብቶች የተጠበቁ ናቸው።",

    // About Page
    "about.title": "ስለ ድሮን",
    "about.subtitle": "ከ2014 ጀምሮ በአሉሚኒየም ስራዎች፣ የንብረት አስተዳደር እና የመኪና አገልግሎቶች ላይ ብቃት",
    "about.owner.title": "ባለቤታችንን ያውቁ",
    "about.owner.name": "ዳዊት ሃብታሙ ጉገሳ",
    "about.owner.position": "መስራች እና ዋና ሥራ አስፈፃሚ",
    "about.owner.description":
      "በግንባታ፣ በመኪና እና በንብረት አስተዳደር ላይ ከአስር አመት በላይ ልምድ ያለው ዳዊት ሃብታሙ ጉገሳ ድሮንን የመሰረተው የደንበኞችን ተስፋ የሚያልፍ ሰፊ ሙያዊ አገልግሎት ለመስጠት ባለው ራዕይ ነው። ለጥራት እና ለፈጠራ ያለው ቁርጠኝነት ድሮንን በኢንዱስትሪው ውስጥ የታመነ ስም አድርጎታል።",
    "about.owner.location": "በኢትዮጵያ የሚገኝ",
    "about.owner.experience": "10+ አመት ልምድ",
    "about.qualifications.title": "ብቃቶች እና ሙያዊነት",
    "about.qualifications.subtitle": "ባለቤታችን ከፍተኛ ጥራት ያለው አገልግሎት ለማረጋገጥ ሰፊ ብቃቶች እና የምስክር ወረቀቶች አለው",
    "about.education": "ትምህርት",
    "about.education.desc": "የትምህርት ዳራ",
    "about.certifications": "የምስክር ወረቀቶች",
    "about.certifications.desc": "ሙያዟ ማረጋገጫዎች",
    "about.experience": "ልምድ",
    "about.experience.desc": "ሙያዊ ጉዞ",
    "about.values.title": "እሴቶቻችን",
    "about.values.subtitle": "በድሮን ውስጥ የምናደርገውን ሁሉ የሚመሩ መርሆዎች",
    "about.values.quality": "ጥራት",
    "about.values.quality.desc": "በጥራት ላይ በጭራሽ አንስማማም፣ እያንዳንዱ ፕሮጀክት ከፍተኛ ደረጃዎችን እንዲያሟላ እናረጋግጣለን",
    "about.values.integrity": "ታማኝነት",
    "about.values.integrity.desc": "በመተማመን እና በታማኝነት ላይ የተመሰረተ ሐቀኛ፣ ግልጽ የንግድ ልምዶች",
    "about.values.innovation": "ፈጠራ",
    "about.values.innovation.desc": "ዘዴዎቻችንን በቀጣይነት ማሻሻል እና አዳዲስ ቴክኖሎጂዎችን መቀበል",
    "about.values.service": "አገልግሎት",
    "about.values.service.desc": "ከተስፋ በላይ የሚሄድ ቁርጠኛ የደንበኛ አገልግሎት",
    "about.cta.title": "አብረን ለመስራት ዝግጁ ነዎት?",
    "about.cta.subtitle": "ለቀጣዩ ፕሮጀክትዎ ከዳዊት እና ከድሮን ቡድን ጋር ይገናኙ",
    "about.work.commitment": "ለብቃት ያለን ቁርጠኝነት",
    "about.work.description":
      "በድሮን፣ ስራ የምናደርገው ብቻ አይደለም - ፍቅራችን ነው። እያንዳንዱ ፕሮጀክት ለጥራት ባለሙያነት እና ለሙያዊ ብቃት ያለንን ቁርጠኝነት ይወክላል።",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "am")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
