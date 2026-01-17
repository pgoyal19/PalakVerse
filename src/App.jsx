import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import ThemeToggle from "./components/ThemeToggle";
import AnimatedSection from "./components/AnimatedSection";

export default function App() {
  return (
    <>
      <NavBar />
      <ThemeToggle />
      <div style={{ marginLeft: 100 }}>

        {/* Hero Section */}
        <section id="hero" style={{ height: "100vh" }}>
          <Hero />
        </section>

        {/* About Section */}
        <AnimatedSection id="about" style={{ minHeight: "60vh" }}>
          <About />
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skills" style={{ minHeight: "50vh" }}>
          <Skills />
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection id="education" style={{ minHeight: "40vh" }}>
          <Education />
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience" style={{ minHeight: "50vh" }}>
          <Experience />
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" style={{ minHeight: "50vh" }}>
          <Projects />
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" style={{ minHeight: "40vh" }}>
          <Contact />
        </AnimatedSection>
      </div>
    </>
  );
}
