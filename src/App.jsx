import { useState } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">PK</div>
          <ul className="nav-menu">
            <li>
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>
                About
              </a>
            </li>
            <li>
              <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience') }}>
                Experience
              </a>
            </li>
            <li>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}>
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero section">
        <div className="container">
          <p className="intro">Hi, my name is</p>
          <h1 className="name">Pratik K.</h1>
          <h2 className="tagline">I build things for the web.</h2>
          <p className="description">
            I'm a software engineer specializing in building exceptional digital experiences.
            Currently, I'm focused on building accessible, human-centered products.
          </p>
          <a href="#contact" className="cta-button" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
            Get In Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <h2>About Me</h2>
          <div className="content">
            <p>
              Hello! My name is Pratik and I enjoy creating things that live on the internet.
              My interest in web development started back in college when I decided to try
              building custom themes — turns out hacking together a custom theme taught me a lot
              about HTML & CSS!
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of working at various companies,
              a start-up, and a student-led design studio. My main focus these days is building
              accessible, inclusive products and digital experiences for a variety of clients.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className="skills-list">
              <li>JavaScript (ES6+)</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Python</li>
              <li>GraphQL</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience section">
        <div className="container">
          <h2>Where I've Worked</h2>
          <div className="timeline">
            <div className="job">
              <h3>Software Engineer @ <span className="company">Company Name</span></h3>
              <p className="date">January 2023 - Present</p>
              <ul>
                <li>Develop and maintain web applications using React and Node.js</li>
                <li>Collaborate with cross-functional teams to deliver high-quality products</li>
                <li>Write modern, performant, and maintainable code</li>
              </ul>
            </div>
            <div className="job">
              <h3>Frontend Developer @ <span className="company">Previous Company</span></h3>
              <p className="date">June 2021 - December 2022</p>
              <ul>
                <li>Built and shipped features for multiple web applications</li>
                <li>Worked with designers to implement pixel-perfect UI components</li>
                <li>Optimized applications for maximum speed and scalability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects section">
        <div className="container">
          <h2>Some Things I've Built</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Project One</h3>
              <p>A web application built with React and Node.js that helps users manage their tasks efficiently.</p>
              <div className="tech-stack">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
              </div>
            </div>
            <div className="project-card">
              <h3>Project Two</h3>
              <p>A mobile-responsive website that showcases modern web design principles and best practices.</p>
              <div className="tech-stack">
                <span>HTML5</span>
                <span>CSS3</span>
                <span>JavaScript</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
              </div>
            </div>
            <div className="project-card">
              <h3>Project Three</h3>
              <p>An API service that provides real-time data processing and analytics for business applications.</p>
              <div className="tech-stack">
                <span>Python</span>
                <span>FastAPI</span>
                <span>PostgreSQL</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Documentation</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          <h2>Get In Touch</h2>
          <p>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
            I'll try my best to get back to you!
          </p>
          <a href="mailto:your-email@example.com" className="email-link">
            Say Hello
          </a>
          <div className="social-links">
            <a href="https://github.com/pk13055" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 pk13055. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
