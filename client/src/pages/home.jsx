import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Registration from "./ragister";

const Home = ({user}) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const featuresRef = useRef([]);
      
  useEffect(() => {
    setIsVisible(true);
    
    // Mouse move effect for hero section
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    // Intersection Observer for feature cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    featuresRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener("mousemove", handleMouseMove);
    
    // Particle animation
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const particles = [];
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.1
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };

      animate();
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      featuresRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // Enhanced Styles with Advanced Animations
  const heroStyle = {
    height: "100vh",
    width: "100%",
    background: `
      linear-gradient(
        135deg,
        rgba(10, 10, 10, 0.95) 0%,
        rgba(26, 26, 46, 0.9) 50%,
        rgba(22, 33, 62, 0.85) 100%
      ),
      url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "80px",
    color: "white",
    overflow: "hidden"
  };

  const floatingOrbsStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    pointerEvents: "none"
  };

  const floatingOrb = (size, x, y, color, delay) => ({
    position: "absolute",
    width: size,
    height: size,
    background: `radial-gradient(circle, ${color}, transparent)`,
    borderRadius: "50%",
    filter: "blur(40px)",
    left: `${x}%`,
    top: `${y}%`,
    animation: `float 6s ease-in-out ${delay}s infinite`,
    opacity: 0.6
  });

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar user={user} />
      {/* Enhanced Hero Section */}
      <div style={heroStyle}>
        {/* Animated Background Elements */}
        <canvas 
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.3
          }}
        />
        
        {/* Floating Orbs */}
        <div style={floatingOrbsStyle}>
          <div style={floatingOrb("300px", 10, 20, "rgba(102, 126, 234, 0.4)", 0)}></div>
          <div style={floatingOrb("200px", 80, 60, "rgba(118, 75, 162, 0.3)", 2)}></div>
          <div style={floatingOrb("250px", 60, 30, "rgba(240, 147, 251, 0.2)", 4)}></div>
        </div>

        {/* Mouse Follow Gradient */}
        <div style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
          left: `${mousePosition.x - 25}%`,
          top: `${mousePosition.y - 25}%`,
          transition: "all 0.1s ease-out",
          pointerEvents: "none",
          zIndex: 1
        }}></div>

        {/* Content */}
        <div 
          style={{ 
            position: "relative", 
            zIndex: 2, 
            maxWidth: "600px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(50px)",
            transition: "all 1s ease-out"
          }}
        >
          <h1
            style={{
              fontSize: "4.5rem",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "25px",
              background: "linear-gradient(135deg, #ffffff, #a8b1ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 30px rgba(102, 126, 234, 0.5)",
              animation: "textGlow 3s ease-in-out infinite alternate"
            }}
          >
            Analyze your meals <br /> with <span style={{color: "#667eea"}}>AI</span>
          </h1>

          <p
            style={{
              fontSize: "1.4rem",
              opacity: 0.9,
              marginBottom: "40px",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: "300"
            }}
          >
            Discover nutritional insights instantly with our advanced AI technology. 
            Just snap a photo and get detailed analysis.
          </p>

          <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
            <button
              style={{
                padding: "18px 45px",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                border: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.6)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.4)";
              }}
            >
              <span style={{ position: "relative", zIndex: 2 }}>
                <Link to={'/ragister'} style={{textDecoration:"none", color:"white"}}>
                  Get Started Free
                </Link>
              </span>
              <div style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "left 0.5s ease",
              }}></div>
            </button>

            <button
              onClick={scrollToFeatures}
              style={{
                padding: "18px 35px",
                borderRadius: "50px",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
                e.target.style.borderColor = "white";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                Learn More 
                <span style={{ animation: "bounceRight 2s infinite" }}>→</span>
              </span>
            </button>
          </div>

          {/* Trust Badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginTop: "40px",
            opacity: 0.8
          }}>
            <div style={{
              display: "flex",
              gap: "5px"
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ color: "#FFD700", fontSize: "1.2rem" }}>⭐</span>
              ))}
            </div>
            <span style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.7)" }}>
              Trusted by 10,000+ users
            </span>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            cursor: "pointer",
            textAlign: "center",
            color: "white",
            animation: "bounce 2s infinite"
          }}
          onClick={scrollToFeatures}
        >
          <p style={{ 
            marginBottom: "15px", 
            fontSize: "0.9rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            opacity: 0.8
          }}>Explore Features</p>
          <div style={{ 
            fontSize: "1.5rem",
            animation: "scrollPulse 2s infinite"
          }}>⌄</div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div id="features" style={{ 
        padding: "120px 20px", 
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background Pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)`,
          pointerEvents: "none"
        }}></div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h2 style={{ 
            fontSize: "3.5rem", 
            marginBottom: "20px", 
            background: "linear-gradient(135deg, #ffffff, #a8b1ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "700"
          }}>
            How It Works
          </h2>
          <p style={{ 
            fontSize: "1.3rem", 
            color: "rgba(255, 255, 255, 0.7)", 
            marginBottom: "80px", 
            maxWidth: "600px", 
            margin: "0 auto 80px",
            lineHeight: "1.6",
            fontWeight: "300"
          }}>
            Experience the future of nutrition analysis with our cutting-edge AI technology
          </p>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
            gap: "50px",
            alignItems: "start"
          }}>
            {[
              {
                icon: "📸",
                title: "Snap a Photo",
                description: "Simply take a picture of your meal using your smartphone or upload an existing photo. Our AI works with any lighting condition.",
                delay: "0s"
              },
              {
                icon: "🤖",
                title: "AI Analysis",
                description: "Our advanced neural networks identify food items and calculate nutritional values with 95% accuracy in seconds.",
                delay: "0.2s"
              },
              {
                icon: "📊",
                title: "Get Insights",
                description: "Receive detailed breakdown of calories, macros, vitamins, and personalized nutritional recommendations.",
                delay: "0.4s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                ref={el => featuresRef.current[index] = el}
                style={{
                  padding: "50px 35px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "25px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transition: "all 0.5s ease",
                  cursor: "pointer",
                  opacity: 0,
                  transform: "translateY(50px)",
                  animationDelay: feature.delay
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-15px) scale(1.02)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.boxShadow = "0 30px 60px rgba(102, 126, 234, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                }}
              >
                <div style={{
                  width: "90px",
                  height: "90px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 30px",
                  fontSize: "2.5rem",
                  color: "white",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                  animation: "floatIcon 3s ease-in-out infinite"
                }}>{feature.icon}</div>
                <h3 style={{ 
                  fontSize: "1.8rem", 
                  marginBottom: "20px", 
                  color: "#ffffff",
                  fontWeight: "600"
                }}>{feature.title}</h3>
                <p style={{ 
                  color: "rgba(255, 255, 255, 0.7)", 
                  lineHeight: "1.7",
                  fontSize: "1.1rem",
                  fontWeight: "300"
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div style={{ 
        padding: "100px 20px", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('https://www.transparenttextures.com/patterns/diagmonds.png')",
          opacity: 0.1,
          pointerEvents: "none"
        }}></div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "50px" 
          }}>
            {[
              { number: "10K+", label: "Meals Analyzed" },
              { number: "95%", label: "Accuracy Rate" },
              { number: "50+", label: "Food Categories" },
              { number: "24/7", label: "Available" }
            ].map((stat, index) => (
              <div key={index} style={{
                padding: "30px 20px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "transform 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              >
                <h3 style={{ 
                  fontSize: "3.5rem", 
                  marginBottom: "15px", 
                  fontWeight: "800",
                  textShadow: "0 5px 15px rgba(0,0,0,0.3)"
                }}>{stat.number}</h3>
                <p style={{ 
                  fontSize: "1.1rem",
                  opacity: 0.9,
                  fontWeight: "300",
                  letterSpacing: "1px"
                }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer style={{
        background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)",
        color: "white",
        padding: "80px 20px 30px",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "50px",
            marginBottom: "50px"
          }}>
            <div>
              <h3 style={{ 
                fontSize: "1.8rem", 
                marginBottom: "25px", 
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: "700"
              }}>MealAnalyzer AI</h3>
              <p style={{ 
                lineHeight: "1.7", 
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "1rem",
                fontWeight: "300"
              }}>
                Revolutionizing nutrition analysis through artificial intelligence and computer vision. 
                Making healthy eating accessible to everyone.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "25px", fontWeight: "600" }}>Quick Links</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  { to: "/upload", label: "📸 Upload Image" },
                  { to: "/dashboard", label: "📊 Dashboard" },
                  { to: "/meallist", label: "📝 Meal List" }
                ].map((link, index) => (
                  <li key={index} style={{ marginBottom: "12px" }}>
                    <Link to={link.to} style={{ 
                      color: "rgba(255, 255, 255, 0.6)", 
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "block",
                      padding: "8px 0"
                    }}
                    onMouseOver={(e) => {
                      e.target.color = "#ffffff";
                      e.target.transform = "translateX(10px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.color = "rgba(255, 255, 255, 0.6)";
                      e.target.transform = "translateX(0)";
                    }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "25px", fontWeight: "600" }}>Account</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  { to: "/login", label: "🔐 Login" },
                  { to: "/register", label: "🚀 Get Started" }
                ].map((link, index) => (
                  <li key={index} style={{ marginBottom: "12px" }}>
                    <Link to={link.to} style={{ 
                      color: "rgba(255, 255, 255, 0.6)", 
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "block",
                      padding: "8px 0"
                    }}
                    onMouseOver={(e) => {
                      e.target.color = "#ffffff";
                      e.target.transform = "translateX(10px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.color = "rgba(255, 255, 255, 0.6)";
                      e.target.transform = "translateX(0)";
                    }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "25px", fontWeight: "600" }}>Contact</h4>
              <p style={{ 
                color: "rgba(255, 255, 255, 0.6)", 
                lineHeight: "1.7",
                fontSize: "1rem",
                fontWeight: "300"
              }}>
                📧 Email: mk14786431@gmail.com<br />
                📞 Phone: +91 7037203849<br />
                🏢 Location: India
              </p>
            </div>
          </div>
          
          <div style={{ 
            borderTop: "1px solid rgba(255, 255, 255, 0.1)", 
            paddingTop: "30px", 
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "0.9rem"
          }}>
            <p>&copy; 2024 MealAnalyzer AI. All rights reserved. | Built with ❤️ for healthier living</p>
          </div>
        </div>
      </footer>

      {/* Enhanced CSS Animations */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0) translateX(-50%);
            }
            40% {
              transform: translateY(-15px) translateX(-50%);
            }
            60% {
              transform: translateY(-7px) translateX(-50%);
            }
          }

          @keyframes scrollPulse {
            0%, 100% {
              opacity: 1;
              transform: translateY(0);
            }
            50% {
              opacity: 0.5;
              transform: translateY(10px);
            }
          }

          @keyframes textGlow {
            0% {
              text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
            }
            100% {
              text-shadow: 0 0 30px rgba(102, 126, 234, 0.8), 0 0 40px rgba(102, 126, 234, 0.6);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
          }

          @keyframes floatIcon {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-10px) scale(1.05);
            }
          }

          @keyframes bounceRight {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(5px);
            }
          }

          @keyframes shimmer {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }

          /* Apply shimmer animation on button hover */
          button:hover div {
            animation: shimmer 0.75s ease;
          }

          /* Smooth scrolling for the whole page */
          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #1a1a2e;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #764ba2, #667eea);
          }
        `}
      </style>
    </div>
  );
};

export default Home;
