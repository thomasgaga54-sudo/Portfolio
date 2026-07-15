import { useState, useEffect } from "react";
import ReviewsSection from "./ReviewsSection";
import MusicPlayer from "./MusicPlayer";

const fallbackProjects = [
  {
    id: 1,
    title: "Agro E-commerce Website",
    description: "A responsive agriculture e-commerce platform showcasing farm produce and vendor services.",
    tags: ["React", "Node.js", "Express", "MongoDB", "E-commerce"],
    image: "/Screenshot_20260714-201132.jpg",
    gallery: [
      { url: "/Screenshot_20260714-201132.jpg", caption: "Agro platform screenshot" },
      { url: "/Screenshot_20260714-201259.jpg", caption: "Agro platform view" }
    ],
    github: "https://github.com/gaga477",
    live: "https://example.com",
    caseStudy: {
      overview: "Helen Motherland Agro is a full-stack agricultural e-commerce platform that connects farmers with buyers, enabling online sales of fresh farm produce and vendor services.",
      problem: "Farmers and agricultural vendors lacked a digital platform to reach wider markets, manage product listings, and accept online payments securely.",
      solution: "Built a complete React and Node.js e-commerce platform with product listings, secure authentication, shopping cart, and online payment integration tailored for the agricultural market.",
      features: ["Product Listings & Categories", "User Authentication", "Shopping Cart", "Online Payment Integration", "Vendor Management", "Responsive Design", "Order Tracking"],
      challenges: ["Designed a clean UI suitable for non-tech-savvy farmers", "Integrated payment gateway for agricultural transactions", "Optimized image loading for produce photos", "Deployed seamlessly on cloud infrastructure"],
      results: ["Wider market reach for farmers", "Secure and easy checkout process", "Mobile-friendly for rural users", "Scalable product catalogue"]
    }
  },
  {
    id: 2,
    title: "Green Earth Initiative",
    description: "An environmental impact portal for sustainability programs, volunteering, and green campaigns.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Sustainability"],
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=340&fit=crop",
    gallery: [
      { url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=240&fit=crop", caption: "Community tree planting" },
      { url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=240&fit=crop", caption: "Eco-friendly initiatives" }
    ],
    github: "https://github.com/gaga477",
    live: "https://example.com",
    caseStudy: {
      overview: "Green Earth Initiative is an environmental impact portal designed to promote sustainability programs, coordinate volunteers, and run green campaigns across communities.",
      problem: "Environmental organisations struggled to coordinate volunteers, track campaign impact, and engage communities through a unified digital platform.",
      solution: "Developed a full-stack portal with React and Node.js featuring campaign management, volunteer registration, impact tracking, and community engagement tools.",
      features: ["Campaign Management", "Volunteer Registration", "Impact Dashboard", "Community Forums", "Event Scheduling", "Donation Tracking", "Responsive Design"],
      challenges: ["Designed intuitive dashboards for non-technical users", "Built real-time impact metrics", "Managed complex relational data in MongoDB", "Ensured accessibility across devices"],
      results: ["Increased volunteer engagement", "Transparent impact reporting", "Streamlined campaign coordination", "Accessible on all devices"]
    }
  },
  {
    id: 5,
    title: "Zunny Mini Mart",
    description: "A modern full-stack mini mart and grocery e-commerce platform with product management, shopping cart, secure checkout, customer authentication, inventory tracking, and responsive mobile-first design.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Paystack API", "JWT Auth"],
    image: "/Screenshot_20260714-201259.jpg",
    gallery: [
      { url: "/Screenshot_20260714-201259.jpg", caption: "Zunny Mini Mart storefront" },
      { url: "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=400&h=240&fit=crop", caption: "Mobile shopping experience" },
      { url: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=400&h=240&fit=crop", caption: "Cart and checkout flow" },
      { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=240&fit=crop", caption: "Inventory tracking dashboard" }
    ],
    github: "https://github.com/gaga477",
    live: "https://example.com",
    caseStudy: {
      overview: "Zunny Mini Mart is a complete grocery e-commerce platform that enables customers to shop online while allowing administrators to manage inventory, orders, and payments.",
      problem: "Small businesses often struggle with inventory tracking, online payments, and managing customer orders efficiently.",
      solution: "Built a full-stack application using React, Node.js, Express, MongoDB, JWT Authentication, and Paystack to deliver a secure and responsive shopping experience.",
      features: ["User Registration & Login", "JWT Authentication", "Product Search", "Shopping Cart", "Inventory Management", "Order Tracking", "Paystack Payment", "Responsive Design"],
      challenges: ["Implemented secure JWT authentication", "Integrated Paystack payment verification", "Optimized MongoDB queries", "Resolved deployment issues on Render"],
      results: ["Responsive on all devices", "Secure checkout process", "Real-time inventory updates", "Fast page loading"]
    }
  },
  {
    id: 3,
    title: "Skincare Store",
    description: "A modern e-commerce platform for selling skincare products with a focus on natural ingredients and sustainable practices.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Paystack API", "JWT Auth"],
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=340&fit=crop",
    gallery: [
      { url: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400&h=240&fit=crop", caption: "Beauty product showcase" },
      { url: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400&h=240&fit=crop", caption: "Clean, minimal product pages" },
      { url: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=240&fit=crop", caption: "Secure checkout process" },
      { url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=240&fit=crop", caption: "Inventory and order tracking" }
    ],
    github: "https://github.com/gaga477",
    live: "https://example.com",
    caseStudy: {
      overview: "A modern skincare e-commerce platform built for a beauty brand focused on natural ingredients, enabling customers to browse, purchase, and track skincare products online.",
      problem: "The client needed a professional online store to sell skincare products, accept payments, and manage inventory without relying on generic marketplace platforms.",
      solution: "Developed a full-stack e-commerce solution with React frontend, Node.js/Express backend, MongoDB database, JWT authentication, and Paystack payment integration.",
      features: ["Product Catalogue", "User Authentication", "Shopping Cart & Wishlist", "Paystack Checkout", "Order Management", "Admin Dashboard", "Inventory Tracking", "Responsive Design"],
      challenges: ["Built a visually appealing UI matching the brand identity", "Integrated Paystack for seamless payments", "Implemented admin inventory controls", "Optimised product image delivery"],
      results: ["Professional online presence for the brand", "Seamless payment experience", "Easy inventory management", "Mobile-optimised shopping"]
    }
  }
];

const skills = [
  "JavaScript", "TypeScript", "React", "Node.js", "Express",
  "MongoDB", "REST APIs", "JWT Auth", "Firebase", "Git", "CSS", "Agile"
];

const summaryParagraphs = [
  "Results-driven Full Stack Software Engineer with expertise in designing, developing, deploying, and maintaining secure, scalable web applications using JavaScript, React, Node.js, Express.js, MongoDB, TypeScript, and REST APIs. Proven experience building end-to-end business solutions, including Zunny Mini Mart, a full-stack inventory and POS management system; Helen Motherland Agro, an agricultural e-commerce platform with secure authentication, shopping cart, and online payment integration; and an AI-powered Cryptocurrency Market Analysis Platform that leverages real-time market data and technical indicators to generate actionable trading insights.",
  "Experienced in architecting responsive front-end interfaces, developing robust back-end services, designing optimized database structures, integrating third-party APIs, implementing secure authentication (JWT/Firebase), and deploying cloud-based applications. Adept at writing clean, maintainable code, troubleshooting complex technical challenges, and delivering high-performance software using Agile methodologies and modern development best practices.",
  "Backed by a foundation in Computer Engineering and professional experience in engineering project management, bringing a unique combination of software development expertise, analytical thinking, and problem-solving skills to build innovative digital solutions that improve operational efficiency and user experience."
];

function CaseStudyModal({ project, onClose }) {
  const cs = project.caseStudy;
  return (
    <div className="cs-overlay" onClick={onClose}>
      <div className="cs-modal" onClick={e => e.stopPropagation()}>
        <button className="cs-close" onClick={onClose}>✕</button>
        <h2 className="cs-title">{project.title}</h2>
        <p className="cs-tag">Case Study</p>

        <div className="cs-section">
          <h3>Overview</h3>
          <p>{cs.overview}</p>
        </div>

        <div className="cs-grid">
          <div className="cs-section">
            <h3>Problem</h3>
            <p>{cs.problem}</p>
          </div>
          <div className="cs-section">
            <h3>Solution</h3>
            <p>{cs.solution}</p>
          </div>
        </div>

        <div className="cs-section">
          <h3>Key Features</h3>
          <ul className="cs-list">
            {cs.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>

        <div className="cs-grid">
          <div className="cs-section">
            <h3>Challenges</h3>
            <ul className="cs-list">
              {cs.challenges.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div className="cs-section">
            <h3>Results</h3>
            <ul className="cs-list cs-results">
              {cs.results.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>

        <div className="cs-footer">
          <div className="tags">
            {project.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
          </div>
          <div className="project-links" style={{ marginTop: 0 }}>
            <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={project.live} target="_blank" rel="noreferrer">Live Demo</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onPhotoClick }) {
  const [showCase, setShowCase] = useState(false);
  return (
    <>
      {showCase && <CaseStudyModal project={p} onClose={() => setShowCase(false)} />}
      <div className="project-card">
        <img className="project-card-cover" src={p.image} alt={p.title} />
        <div className="project-card-body">
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          {(p.gallery?.length > 0) && (
            <div className="gallery-grid">
              {(p.gallery || []).map((g, i) => (
                <div key={i} className="gallery-grid-item" onClick={() => onPhotoClick(g)}>
                  <img src={g.url} alt={g.caption} />
                  <span>{g.caption}</span>
                </div>
              ))}
            </div>
          )}
          <div className="tags">
            {(p.tags || []).map(t => <span key={t} className="skill-tag">{t}</span>)}
          </div>
          <div className="project-links">
            <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={p.live} target="_blank" rel="noreferrer">Live</a>
            {p.caseStudy && (
              <button className="btn-case-study" onClick={() => setShowCase(true)}>
                Case Study
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const summaryParagraphs = [
    "Results-driven Full Stack Software Engineer with expertise in designing, developing, deploying, and maintaining secure, scalable web applications using JavaScript, React, Node.js, Express.js, MongoDB, TypeScript, and REST APIs. Proven experience building end-to-end business solutions, including Zunny Mini Mart, a full-stack inventory and POS management system; Helen Motherland Agro, an agricultural e-commerce platform with secure authentication, shopping cart, and online payment integration; and an AI-powered Cryptocurrency Market Analysis Platform that leverages real-time market data and technical indicators to generate actionable trading insights.",
    "Experienced in architecting responsive front-end interfaces, developing robust back-end services, designing optimized database structures, integrating third-party APIs, implementing secure authentication (JWT/Firebase), and deploying cloud-based applications. Adept at writing clean, maintainable code, troubleshooting complex technical challenges, and delivering high-performance software using Agile methodologies and modern development best practices.",
    "Backed by a foundation in Computer Engineering and professional experience in engineering project management, bringing a unique combination of software development expertise, analytical thinking, and problem-solving skills to build innovative digital solutions that improve operational efficiency and user experience."
  ];

  const skills = ["React", "Node.js", "Express", "MongoDB", "JavaScript", "TypeScript", "REST APIs", "JWT Auth", "Firebase", "Git", "CSS", "Agile"];
  const [projects, setProjects] = useState(fallbackProjects);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [contactMsg, setContactMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSent(false);
    setContactMsg("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(true);
        setContactMsg(data.message || "Failed to send. Please try again.");
      }
    } catch {
      setError(true);
      setContactMsg("Could not reach the server. Please email me directly at ejairuogaga@gmail.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <MusicPlayer />
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close">✕</button>
          <img src={lightbox.url} alt={lightbox.caption} onClick={e => e.stopPropagation()} />
          <p>{lightbox.caption}</p>
        </div>
      )}

      <nav>
        <span className="logo">OE.</span>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="hero">
        <div className="hero-text">
          <h1>Hi, I'm <span>Ogaga Ejairu</span></h1>
          <p>Full Stack Software Engineer building secure, scalable web applications with React & Node.js</p>
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>
          <div className="hero-contact">
            <a href="mailto:ejairuogaga@gmail.com">📧 ejairuogaga@gmail.com</a>
            <a href="tel:+2347048666541">📞 +234 704 866 6541</a>
          </div>
        </div>
        <div className="hero-featured">
          <p className="hero-projects-label">Featured Projects</p>
          <div className="hero-cards">
            {projects.map(p => (
              <div key={p.id} className="hero-card">
                <img className="hero-card-cover" src={p.image} alt={p.title} />
                <div className="hero-card-body">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {(p.tags || []).map(t => <span key={t} className="skill-tag">{t}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>
                    <a href={p.live} target="_blank" rel="noreferrer">Live</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="about">
        <h2>About Me</h2>

        <div className="summary-block">
          <p className="summary-label">Professional Summary</p>
          {summaryParagraphs.map((para, i) => (
            <p key={i} className="about-text">{para}</p>
          ))}
        </div>

        <div className="skills">
          {skills.map(s => (
            <span key={s} className="skill-tag">{s}</span>
          ))}
        </div>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map(p => (
            <ProjectCard key={p.id} p={p} onPhotoClick={setLightbox} />
          ))}
        </div>
      </section>

      <ReviewsSection />

      <section id="contact">
        <h2>Contact</h2>
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-info">
              <a href="mailto:ejairuogaga@gmail.com">📧 ejairuogaga@gmail.com</a>
              <a href="tel:+2347048666541">📞 +234 704 866 6541</a>
              <a href="https://wa.me/5519983545747" target="_blank" rel="noreferrer" className="contact-whatsapp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +55 19 98354-5747
              </a>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input placeholder="Your Name" value={form.name} required onChange={e => setForm({ ...form, name: e.target.value })} />
              <input placeholder="Your Email" type="email" value={form.email} required onChange={e => setForm({ ...form, email: e.target.value })} />
              <textarea placeholder="Your Message" value={form.message} required onChange={e => setForm({ ...form, message: e.target.value })} />
              <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }} disabled={sending}>
                {sending ? "Sending…" : "Send Message"}
              </button>
              {sent && <p className="success-msg">✓ Message sent successfully!</p>}
              {error && <p style={{ color: "red" }}>✗ {contactMsg || "Failed to send. Please try again."}</p>}
            </form>
          </div>
          <div className="contact-image">
            <img src="/tech1.png" alt="Technology" />
          </div>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Ogaga Ejairu. Built with React & Node.js</p>
      </footer>
    </>
  );
}
