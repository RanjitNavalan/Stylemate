import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhyStyleMate from '../components/WhyStyleMate';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <WhyStyleMate />
      <Testimonials />
    </div>
  );
}