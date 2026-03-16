import { ContactSection } from './components/organisms/ContactSection'
import { HeroSection } from './components/organisms/HeroSection'
import { InfoSection } from './components/organisms/InfoSection.tsx'
import { WhySection } from './components/organisms/WhySection'
import './App.css'

function App() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <InfoSection />
      <ContactSection />
    </>
  )
}

export default App