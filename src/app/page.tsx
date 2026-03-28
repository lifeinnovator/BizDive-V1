import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { faqs } from '@/data/faqs';

// Import Landing Components
import NavigationBar from '@/components/landing/NavigationBar';
import Hero from '@/components/landing/Hero';
import UserPathSelection from '@/components/landing/UserPathSelection';
import FounderExperience from '@/components/landing/FounderExperience';
import InstitutionExperience from '@/components/landing/InstitutionExperience';
import BannerSection from '@/components/landing/BannerSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If already logged in, redirect them immediately to dashboard
  if (user) {
    redirect('/dashboard');
  }

  // FAQ Schema for SEO/GEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-900 selection:text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Navigation */}
      <NavigationBar />
      
      {/* Main Content Sections (Server Composed) */}
      <main>
        <Hero />
        <UserPathSelection />
        <FounderExperience />
        <InstitutionExperience />
        <BannerSection />
        <FAQSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
