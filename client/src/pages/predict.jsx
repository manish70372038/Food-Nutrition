import React, { useState, useRef, useEffect } from 'react';

const Predict = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('nutrition');
  const [animatedValues, setAnimatedValues] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const mockAnalysis = {
    foodItems: [
      { 
        name: 'Grilled Chicken', 
        confidence: 94, 
        calories: 165, 
        protein: 31, 
        carbs: 0, 
        fat: 3.6,
        vitamins: ['B6', 'B12', 'Niacin'],
        minerals: ['Iron', 'Zinc', 'Selenium']
      },
      { 
        name: 'Steamed Broccoli', 
        confidence: 89, 
        calories: 55, 
        protein: 3.7, 
        carbs: 11, 
        fat: 0.6,
        vitamins: ['C', 'K', 'A'],
        minerals: ['Potassium', 'Iron', 'Calcium']
      },
      { 
        name: 'Brown Rice', 
        confidence: 82, 
        calories: 112, 
        protein: 2.6, 
        carbs: 23, 
        fat: 0.8,
        vitamins: ['B1', 'B3', 'B6'],
        minerals: ['Magnesium', 'Phosphorus', 'Manganese']
      }
    ],
    totalNutrition: {
      calories: 332,
      protein: 37.3,
      carbs: 34,
      fat: 5,
      fiber: 4.2,
      sugar: 2.1
    },
    healthScore: 8.7,
    recommendations: [
      'Excellent protein source for muscle maintenance',
      'Consider adding healthy fats like avocado',
      'Well-balanced meal with good fiber content'
    ],
    mealType: 'Lunch',
    estimatedPrepTime: '25 mins'
  };

  useEffect(() => {
    if (analysisResult) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      Object.keys(animatedValues).forEach(key => {
        let start = 0;
        const end = mockAnalysis.totalNutrition[key];
        const range = end - start;
        let currentStep = 0;
        
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const value = start + (range * (1 - Math.pow(1 - progress, 3)));
          
          setAnimatedValues(prev => ({
            ...prev,
            [key]: Math.round(value)
          }));
          
          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [analysisResult]);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setUploadProgress(0);
    setAnalysisResult(null);
    setIsAnalyzing(true);
    
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          startAnalysis();
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const startAnalysis = () => {
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(mockAnalysis);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setUploadProgress(0);
    setAnimatedValues({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
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

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
    color: '#ffffff',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  };

  const canvasStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '60px'
  };

  const titleStyle = {
    fontSize: '4rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
    animation: 'glow 3s ease-in-out infinite alternate'
  };

  const subtitleStyle = {
    fontSize: '1.4rem',
    color: '#b0b0b0',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
    marginBottom: '30px'
  };

  const uploadAreaStyle = {
    border: '2px dashed rgba(102, 126, 234, 0.5)',
    borderRadius: '20px',
    padding: '80px 40px',
    textAlign: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '30px'
  };

  const uploadIconStyle = {
    fontSize: '5rem',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '30px',
    animation: 'bounce 2s infinite'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '18px 45px',
    borderRadius: '50px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const progressBarStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    margin: '40px 0',
    overflow: 'hidden'
  };

  const progressFillStyle = {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
    borderRadius: '10px',
    transition: 'width 0.3s ease',
    width: `${uploadProgress}%`,
    backgroundSize: '200px 100%',
    animation: 'shimmer 2s infinite'
  };

  const imagePreviewStyle = {
    maxWidth: '100%',
    maxHeight: '400px',
    borderRadius: '15px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    margin: '30px auto',
    display: 'block',
    border: '2px solid rgba(102, 126, 234, 0.3)'
  };

  const loadingContainerStyle = {
    textAlign: 'center',
    padding: '60px 20px'
  };

  const scannerStyle = {
    width: '200px',
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    borderRadius: '2px',
    margin: '40px auto',
    position: 'relative',
    animation: 'scan 2s ease-in-out infinite'
  };

  const tabContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '20px'
  };

  const tabStyle = (isActive) => ({
    padding: '15px 30px',
    borderRadius: '25px',
    background: isActive ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
    color: isActive ? 'white' : '#b0b0b0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  });

  const statGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  };

  const statCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '15px',
    padding: '30px 20px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease'
  };

  const foodItemStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
  };

  const confidenceMeterStyle = {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
    marginTop: '10px',
    overflow: 'hidden'
  };

  const confidenceFillStyle = (confidence) => ({
    height: '100%',
    background: `linear-gradient(90deg, ${confidence > 90 ? '#4CAF50' : confidence > 80 ? '#8BC34A' : confidence > 70 ? '#FFC107' : '#FF5722'})`,
    borderRadius: '3px',
    width: `${confidence}%`,
    transition: 'width 1s ease'
  });

  const nutrientTagStyle = (type) => ({
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    margin: '5px',
    background: 
      type === 'calories' ? 'linear-gradient(135deg, #FF6B6B, #FF8E8E)' :
      type === 'protein' ? 'linear-gradient(135deg, #4ECDC4, #88D9D4)' :
      type === 'carbs' ? 'linear-gradient(135deg, #45B7D1, #7ACDE1)' :
      'linear-gradient(135deg, #FFA07A, #FFB899)'
  });

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>AI PREDICT</h1>
          <p style={subtitleStyle}>
            Advanced meal analysis powered by artificial intelligence. 
            Get instant nutritional insights from any food image.
          </p>
        </div>

        <div style={cardStyle}>
          {!selectedImage ? (
            <div
              style={uploadAreaStyle}
              onClick={() => fileInputRef.current?.click()}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.8)';
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={uploadIconStyle}>🔮</div>
              <h3 style={{ marginBottom: '20px', fontSize: '2rem', color: '#ffffff' }}>
                Upload Your Meal
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '40px', fontSize: '1.1rem' }}>
                Drop your food image here or click to browse. Our AI will analyze it instantly.
              </p>
              <button
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                }}
              >
                Select Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </div>
          ) : (
            <div>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={selectedImage}
                  alt="Uploaded meal"
                  style={imagePreviewStyle}
                />
                
                {uploadProgress < 100 && (
                  <div>
                    <div style={progressBarStyle}>
                      <div style={progressFillStyle}></div>
                    </div>
                    <p style={{ color: '#b0b0b0', fontSize: '1.1rem' }}>
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

                {isAnalyzing && (
                  <div style={loadingContainerStyle}>
                    <div style={scannerStyle}></div>
                    <h3 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '2rem' }}>
                      Analyzing Your Meal
                    </h3>
                    <p style={{ color: '#b0b0b0', fontSize: '1.1rem' }}>
                      AI is detecting food items and calculating nutritional values...
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: '10px',
                      marginTop: '30px'
                    }}>
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            animation: `pulse 1.5s infinite ${i * 0.2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}

                {!isAnalyzing && analysisResult && (
                  <button
                    onClick={resetAnalysis}
                    style={{
                      ...buttonStyle,
                      background: 'transparent',
                      border: '2px solid #667eea',
                      marginTop: '30px'
                    }}
                  >
                    Analyze New Image
                  </button>
                )}
              </div>

              {analysisResult && (
                <div style={{ marginTop: '50px' }}>
                  <div style={tabContainerStyle}>
                    <div 
                      style={tabStyle(activeTab === 'nutrition')}
                      onClick={() => setActiveTab('nutrition')}
                    >
                      Nutrition Overview
                    </div>
                    <div 
                      style={tabStyle(activeTab === 'foods')}
                      onClick={() => setActiveTab('foods')}
                    >
                      Detected Foods
                    </div>
                    <div 
                      style={tabStyle(activeTab === 'insights')}
                      onClick={() => setActiveTab('insights')}
                    >
                      AI Insights
                    </div>
                  </div>

                  {activeTab === 'nutrition' && (
                    <div>
                      <div style={statGridStyle}>
                        <div style={statCardStyle}>
                          <h4 style={{ color: '#b0b0b0', marginBottom: '15px' }}>Calories</h4>
                          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FF6B6B' }}>
                            {animatedValues.calories}
                          </div>
                          <p style={{ color: '#b0b0b0' }}>kcal</p>
                        </div>
                        <div style={statCardStyle}>
                          <h4 style={{ color: '#b0b0b0', marginBottom: '15px' }}>Protein</h4>
                          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4ECDC4' }}>
                            {animatedValues.protein}g
                          </div>
                          <p style={{ color: '#b0b0b0' }}>Muscle Fuel</p>
                        </div>
                        <div style={statCardStyle}>
                          <h4 style={{ color: '#b0b0b0', marginBottom: '15px' }}>Carbs</h4>
                          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#45B7D1' }}>
                            {animatedValues.carbs}g
                          </div>
                          <p style={{ color: '#b0b0b0' }}>Energy Source</p>
                        </div>
                        <div style={statCardStyle}>
                          <h4 style={{ color: '#b0b0b0', marginBottom: '15px' }}>Fat</h4>
                          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFA07A' }}>
                            {animatedValues.fat}g
                          </div>
                          <p style={{ color: '#b0b0b0' }}>Healthy Fats</p>
                        </div>
                      </div>

                      <div style={{
                        ...statCardStyle,
                        textAlign: 'center',
                        marginBottom: '40px'
                      }}>
                        <h3 style={{ marginBottom: '20px', color: '#ffffff' }}>AI Health Score</h3>
                        <div style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          background: 'conic-gradient(#4CAF50 0% 87%, #e9ecef 87% 100%)',
                          margin: '0 auto 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          border: '3px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          {analysisResult.healthScore}/10
                        </div>
                        <p style={{ color: '#b0b0b0' }}>
                          {analysisResult.healthScore > 8 ? 'Excellent Meal Choice!' : 
                           analysisResult.healthScore > 6 ? 'Good Nutritional Balance' : 
                           'Consider Nutritional Improvements'}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'foods' && (
                    <div>
                      {analysisResult.foodItems.map((food, index) => (
                        <div
                          key={index}
                          style={foodItemStyle}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h4 style={{ color: '#ffffff', fontSize: '1.4rem', margin: 0 }}>
                              {food.name}
                            </h4>
                            <span style={{ color: '#b0b0b0' }}>{food.confidence}% match</span>
                          </div>
                          
                          <div style={confidenceMeterStyle}>
                            <div style={confidenceFillStyle(food.confidence)}></div>
                          </div>

                          <div style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
                            <span style={nutrientTagStyle('calories')}>{food.calories} kcal</span>
                            <span style={nutrientTagStyle('protein')}>{food.protein}g protein</span>
                            <span style={nutrientTagStyle('carbs')}>{food.carbs}g carbs</span>
                            <span style={nutrientTagStyle('fat')}>{food.fat}g fat</span>
                          </div>

                          <div style={{ display: 'flex', gap: '20px', color: '#b0b0b0', fontSize: '0.9rem' }}>
                            <div>
                              <strong>Vitamins:</strong> {food.vitamins.join(', ')}
                            </div>
                            <div>
                              <strong>Minerals:</strong> {food.minerals.join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'insights' && (
                    <div>
                      <div style={foodItemStyle}>
                        <h4 style={{ color: '#ffffff', marginBottom: '20px' }}>💡 AI Recommendations</h4>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          {analysisResult.recommendations.map((rec, index) => (
                            <li key={index} style={{ marginBottom: '15px', color: '#b0b0b0', lineHeight: '1.5' }}>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
                        <div style={statCardStyle}>
                          <h4 style={{ color: '#b0b0b0', marginBottom: '10px' }}>Meal Type</h4>
                          <p style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '600' }}>{analysisResult.mealType}</p>
                        </div>
                        <div style={statCardStyle}>
                          <h4 style={{ color: '#b0b0b0', marginBottom: '10px' }}>Prep Time</h4>
                          <p style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '600' }}>{analysisResult.estimatedPrepTime}</p>
                        </div>
                        <div style={statCardStyle}>
                          <h4 style={{ color: '#b0b0b0', marginBottom: '10px' }}>Fiber Content</h4>
                          <p style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '600' }}>{analysisResult.totalNutrition.fiber}g</p>
                        </div>
                        <div style={statCardStyle}>
                          <h4 style={{ color: '#b0b0b0', marginBottom: '10px' }}>Sugar Content</h4>
                          <p style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '600' }}>{analysisResult.totalNutrition.sugar}g</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Predict;
