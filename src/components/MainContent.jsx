// MainContent.jsx  ◂─ only sizes tweaked
import ScrollReveal from "../components/ScrollReveal";
import Beams from "../components/Beams";

export default function MainContent() {
  return (
    <main className="mt-24 px-4">
      {/* background */}
      {/** 
      <div className="fixed inset-0 -z-50">
        <Beams
          beamWidth={2}
          beamHeight={25}
          beamNumber={18}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={45}
        />
      </div>
      <div className="fixed inset-0 -z-50" style={{ backgroundColor: '#4A90E2' }}></div>
      */}
      
      <div className="fixed inset-0 -z-50 bg-[#FDF6F2]"></div>

      {/* headline */}
      <ScrollReveal
        baseOpacity={1}
        enableBlur={true}
        baseRotation={5}
        blurStrength={15}
        containerClassName="max-w-4xl mx-auto text-center mb-6"
        textClassName="text-2xl sm:text-3xl lg:text-4xl font-bold text-black"
      >
        Die größte Kleinfeld-Mannschaft aller Zeiten
      </ScrollReveal>

      {/* paragraphs (reuse these two class strings everywhere) */}
      <ScrollReveal
        baseOpacity={1}
        enableBlur={true}
        baseRotation={5}
        blurStrength={15}
        containerClassName="max-w-4xl mx-auto text-center mb-4"
        textClassName="text-md sm:text-sm md:text-lg leading-relaxed text-black"
      >
        Im Herzen des Fußballs gibt es eine Kategorie von Teams, die durch ihre
        außergewöhnliche Leistung im Kleinfeldturnier-Format hervorsticht. Die
        größte Kleinfeldturnier-Mannschaft, die je gelebt hat, ist ohne Zweifel
        die legendäre Mannschaft „Athletic BinBlau“. Obwohl erst 2017 gegründet,
        zählt ABB im Talboden bereits zu den traditionsreichsten und
        einflussreichsten Vereinen.
      </ScrollReveal>

      <ScrollReveal
        baseOpacity={1}
        enableBlur={true}
        baseRotation={5}
        blurStrength={15}
        containerClassName="max-w-4xl mx-auto text-center mb-4"
        textClassName="text-md sm:text-sm md:text-lg leading-relaxed text-black"
      >
        Mit einer Mischung aus technischem Können, unermüdlichem Einsatz und
        einem einzigartigen Teamgeist eroberte ABB die Kleinfeldturnierszene im
        Sturm. Ihr Spielstil besticht durch schnelles Passspiel und kreative
        Kombinationen, die selbst erfahrene Gegner oft ins Wanken bringen. ABB
        ist weit mehr als nur ein Team – vielmehr eine eingeschworene
        Gemeinschaft, die durch Zusammenhalt und Leidenschaft für den Fußball
        besticht.
      </ScrollReveal>

      <ScrollReveal
        baseOpacity={1}
        enableBlur={true}
        baseRotation={5}
        blurStrength={15}
        containerClassName="max-w-4xl mx-auto text-center mb-4"
        textClassName="text-md sm:text-sm md:text-lg leading-relaxed text-black"
      >
        Besonders bemerkenswert ist, wie die Spieler von ABB ihren Siegeswillen
        stets mit Fair Play und Sportsgeist verbinden. Sie begeistern Fans durch
        ihre mitreißenden Auftritte und zeigen gleichzeitig auf und neben dem
        Platz eine Verbundenheit, die ihresgleichen sucht. Trotz ihres jungen
        Bestehens hat ABB schon jetzt ein beeindruckendes Vermächtnis
        geschaffen, das künftige Generationen von Kleinfeldfußballern prägen
        wird.
      </ScrollReveal>

      <ScrollReveal
        baseOpacity={1}
        enableBlur={true}
        baseRotation={5}
        blurStrength={15}
        containerClassName="max-w-4xl mx-auto text-center"
        textClassName="text-md sm:text-sm md:text-lg leading-relaxed text-black"
      >
        In der Geschichte dieses Sports wird der Name Athletic BinBlau für immer
        leuchten – nicht nur als Synonym für Erfolg, sondern als Inbegriff einer
        Mannschaft, die den Kleinfeldfußball zu einem unvergesslichen Erlebnis
        für alle Beteiligten macht.
      </ScrollReveal>
    </main>
  );
}
