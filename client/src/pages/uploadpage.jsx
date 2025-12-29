import React, { useState, useRef, useEffect } from "react";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const fileRef = useRef();

  // Mock data
  const mockResult = {
    calories: 387,
    protein: "10.7g",
    carbs: "61.6g",
    fat: "15.1g",
    fiber: "5.2g",
    sugar: "19.4g",
    score: 8.2,
    healthScore: 85,
    mealType: "Breakfast",
    foods: [
      { name: "Apple", calories: 95, protein: "0.5g", carbs: "25g", fat: "0.3g", confidence: 92 },
      { name: "Banana", calories: 105, protein: "1.3g", carbs: "27g", fat: "0.4g", confidence: 87 },
      { name: "Spinach", calories: 23, protein: "2.9g", carbs: "3.6g", fat: "0.4g", confidence: 85 },
      { name: "Almonds", calories: 164, protein: "6g", carbs: "6g", fat: "14g", confidence: 78 }
    ],
    recommendations: [
      "Good source of fiber",
      "High in healthy fats",
      "Consider adding protein",
      "Low sodium content"
    ]
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      simulateUpload();
    };
    reader.readAsDataURL(file);
  };

  const simulateUpload = () => {
    setProgress(0);
    setResult(null);
    setShowResults(false);

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          simulateAnalysis();
          return 100;
        }
        return p + 4;
      });
    }, 40);
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(mockResult);
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }, 2000);
  };

  const resetAll = () => {
    setImage(null);
    setProgress(0);
    setAnalyzing(false);
    setResult(null);
    setShowResults(false);
  };

  // Drag & drop
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div style={styles.page}>
      {/* Main Container */}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.titleIcon}>🍽️</span> AI Meal Analyzer
          </h1>
          <p style={styles.subtitle}>
            Upload your meal photo and get instant nutritional analysis powered by AI
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={styles.columns}>
          {/* LEFT COLUMN - Upload Section */}
          <div style={styles.leftColumn}>
            <div style={styles.uploadCard}>
              {!image ? (
                <div
                  style={{
                    ...styles.uploadArea,
                    borderColor: dragging ? "#3b82f6" : "#374151",
                    background: dragging ? "rgba(59, 130, 246, 0.1)" : "transparent"
                  }}
                  onClick={() => fileRef.current.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div style={styles.uploadIconContainer}>
                    <div style={styles.uploadIcon}>📸</div>
                    <div style={styles.uploadGlow}></div>
                  </div>
                  
                  <h3 style={styles.uploadTitle}>
                    {dragging ? "Drop Image Here" : "Upload Meal Photo"}
                  </h3>
                  
                  <p style={styles.uploadText}>
                    Drag & drop or click to upload
                  </p>
                  
                  <div style={styles.supportedFormats}>
                    <span style={styles.formatTag}>JPG</span>
                    <span style={styles.formatTag}>PNG</span>
                    <span style={styles.formatTag}>WEBP</span>
                  </div>
                  
                  <input
                    ref={fileRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />
                </div>
              ) : (
                <div style={styles.imageSection}>
                  {/* Image Preview */}
                  <div style={styles.imageContainer}>
                    <img 
                      src={image} 
                      alt="Meal" 
                      style={styles.previewImage}
                    />
                    <div style={styles.imageOverlay}></div>
                  </div>

                  {/* Upload Progress */}
                  {progress > 0 && progress < 100 && (
                    <div style={styles.progressSection}>
                      <div style={styles.progressHeader}>
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                      </div>
                      <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {/* Analyzing Animation */}
                  {analyzing && (
                    <div style={styles.analyzingSection}>
                      <div style={styles.spinnerContainer}>
                        <div style={styles.spinner}></div>
                        <div style={styles.spinnerIcon}>🤖</div>
                      </div>
                      <h4 style={styles.analyzingTitle}>AI Analysis in Progress</h4>
                      <p style={styles.analyzingText}>
                        Identifying food items and calculating nutrition...
                      </p>
                    </div>
                  )}

                  {/* Reset Button */}
                  <button
                    onClick={resetAll}
                    style={styles.resetButton}
                  >
                    <span style={styles.resetIcon}>🔄</span>
                    Analyze Another Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - Results Section */}
          <div 
            style={{
              ...styles.rightColumn,
              opacity: showResults ? 1 : 0.7,
              transform: showResults ? 'translateX(0)' : 'translateX(20px)'
            }}
          >
            <div style={styles.resultsCard}>
              {result ? (
                <div style={styles.resultsContent}>
                  {/* Results Header */}
                  <div style={styles.resultsHeader}>
                    <h2 style={styles.resultsTitle}>
                      <span style={styles.resultsIcon}>📊</span>
                      Nutrition Analysis
                    </h2>
                    <div style={styles.scoreBadge}>
                      <span style={styles.scoreNumber}>{result.score}</span>
                      <span style={styles.scoreLabel}>/10</span>
                    </div>
                  </div>

                  {/* Nutrition Summary */}
                  <div style={styles.summarySection}>
                    <h3 style={styles.sectionTitle}>Nutrition Summary</h3>
                    <div style={styles.summaryGrid}>
                      <div style={styles.summaryItem}>
                        <div style={styles.itemIcon}>🔥</div>
                        <div>
                          <p style={styles.itemLabel}>Calories</p>
                          <p style={styles.itemValue}>{result.calories} kcal</p>
                        </div>
                      </div>
                      <div style={styles.summaryItem}>
                        <div style={styles.itemIcon}>💪</div>
                        <div>
                          <p style={styles.itemLabel}>Protein</p>
                          <p style={styles.itemValue}>{result.protein}</p>
                        </div>
                      </div>
                      <div style={styles.summaryItem}>
                        <div style={styles.itemIcon}>🍞</div>
                        <div>
                          <p style={styles.itemLabel}>Carbs</p>
                          <p style={styles.itemValue}>{result.carbs}</p>
                        </div>
                      </div>
                      <div style={styles.summaryItem}>
                        <div style={styles.itemIcon}>🥑</div>
                        <div>
                          <p style={styles.itemLabel}>Fat</p>
                          <p style={styles.itemValue}>{result.fat}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detected Foods */}
                  <div style={styles.foodsSection}>
                    <h3 style={styles.sectionTitle}>
                      <span style={styles.sectionIcon}>🍽️</span>
                      Detected Foods
                    </h3>
                    <div style={styles.foodsList}>
                      {result.foods.map((food, index) => (
                        <div key={index} style={styles.foodItem}>
                          <div style={styles.foodInfo}>
                            <h4 style={styles.foodName}>{food.name}</h4>
                            <div style={styles.confidenceContainer}>
                              <div style={styles.confidenceBar}>
                                <div 
                                  style={{
                                    ...styles.confidenceFill,
                                    width: `${food.confidence}%`
                                  }}
                                ></div>
                              </div>
                              <span style={styles.confidenceText}>{food.confidence}%</span>
                            </div>
                          </div>
                          <div style={styles.foodStats}>
                            <span style={styles.foodStat}>{food.calories} kcal</span>
                            <span style={styles.foodStat}>{food.protein}</span>
                            <span style={styles.foodStat}>{food.carbs}</span>
                            <span style={styles.foodStat}>{food.fat}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div style={styles.recommendationsSection}>
                    <h3 style={styles.sectionTitle}>
                      <span style={styles.sectionIcon}>💡</span>
                      Recommendations
                    </h3>
                    <div style={styles.recommendationsList}>
                      {result.recommendations.map((rec, index) => (
                        <div key={index} style={styles.recommendation}>
                          <span style={styles.checkIcon}>✓</span>
                          <span style={styles.recommendationText}>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Health Score */}
                  <div style={styles.healthScoreSection}>
                    <div style={styles.healthScoreCard}>
                      <div style={styles.scoreCircle}>
                        <div style={styles.scoreValue}>{result.healthScore}%</div>
                        <div style={styles.scoreLabel}>Health Score</div>
                      </div>
                      <div style={styles.healthInfo}>
                        <p style={styles.healthText}>
                          Your meal has a good balance of nutrients. 
                          Consider adding more protein for better muscle recovery.
                        </p>
                        <div style={styles.tags}>
                          <span style={styles.tag}>Balanced</span>
                          <span style={styles.tag}>High Fiber</span>
                          <span style={styles.tag}>Natural Sugars</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📸</div>
                  <h3 style={styles.emptyTitle}>No Image Uploaded</h3>
                  <p style={styles.emptyText}>
                    Upload a meal photo on the left to see detailed nutritional analysis here.
                  </p>
                  <div style={styles.steps}>
                    <div style={styles.step}>
                      <div style={styles.stepNumber}>1</div>
                      <span>Upload Image</span>
                    </div>
                    <div style={styles.stepArrow}>→</div>
                    <div style={styles.step}>
                      <div style={styles.stepNumber}>2</div>
                      <span>AI Analysis</span>
                    </div>
                    <div style={styles.stepArrow}>→</div>
                    <div style={styles.step}>
                      <div style={styles.stepNumber}>3</div>
                      <span>Get Results</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add some CSS animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .food-item {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }
        
        .food-item:nth-child(1) { animation-delay: 0.1s; }
        .food-item:nth-child(2) { animation-delay: 0.2s; }
        .food-item:nth-child(3) { animation-delay: 0.3s; }
        .food-item:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

// Styles Object
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
    padding: "20px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#fff"
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3b82f6, #22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  titleIcon: {
    fontSize: "3rem"
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6"
  },
  columns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    minHeight: "700px"
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column"
  },
  rightColumn: {
    transition: "all 0.4s ease"
  },
  uploadCard: {
    background: "rgba(30, 41, 59, 0.7)",
    borderRadius: "20px",
    padding: "30px",
    height: "100%",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },
  uploadArea: {
    border: "2px dashed #374151",
    borderRadius: "16px",
    padding: "60px 40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  uploadIconContainer: {
    position: "relative",
    marginBottom: "25px"
  },
  uploadIcon: {
    fontSize: "4rem",
    color: "#3b82f6",
    position: "relative",
    zIndex: 2
  },
  uploadGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80px",
    height: "80px",
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
    borderRadius: "50%"
  },
  uploadTitle: {
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "10px"
  },
  uploadText: {
    color: "#94a3b8",
    marginBottom: "25px"
  },
  supportedFormats: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },
  formatTag: {
    padding: "6px 15px",
    background: "rgba(59, 130, 246, 0.1)",
    color: "#3b82f6",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "500"
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },
  imageContainer: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
  },
  previewImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    display: "block"
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3))"
  },
  progressSection: {
    background: "rgba(30, 41, 59, 0.8)",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    color: "#94a3b8",
    fontSize: "0.95rem"
  },
  progressBar: {
    width: "100%",
    height: "8px",
    background: "#1e293b",
    borderRadius: "10px",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #3b82f6, #22c55e)",
    borderRadius: "10px",
    transition: "width 0.3s ease"
  },
  analyzingSection: {
    textAlign: "center",
    padding: "30px",
    background: "rgba(30, 41, 59, 0.8)",
    borderRadius: "12px",
    border: "1px solid rgba(59, 130, 246, 0.3)"
  },
  spinnerContainer: {
    position: "relative",
    width: "80px",
    height: "80px",
    margin: "0 auto 20px"
  },
  spinner: {
    width: "100%",
    height: "100%",
    border: "4px solid rgba(59, 130, 246, 0.2)",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  spinnerIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2rem"
  },
  analyzingTitle: {
    color: "#fff",
    marginBottom: "10px",
    fontSize: "1.3rem"
  },
  analyzingText: {
    color: "#94a3b8",
    fontSize: "0.95rem"
  },
  resetButton: {
    width: "100%",
    padding: "15px",
    background: "transparent",
    color: "#3b82f6",
    border: "2px solid #3b82f6",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease"
  },
  resetIcon: {
    fontSize: "1.2rem"
  },
  resultsCard: {
    background: "rgba(30, 41, 59, 0.7)",
    borderRadius: "20px",
    padding: "30px",
    height: "100%",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    overflowY: "auto",
    maxHeight: "700px"
  },
  resultsContent: {
    opacity: 1,
    transition: "opacity 0.3s ease"
  },
  resultsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
  },
  resultsTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  resultsIcon: {
    fontSize: "2rem"
  },
  scoreBadge: {
    background: "linear-gradient(135deg, #3b82f6, #22c55e)",
    padding: "12px 20px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "baseline",
    gap: "5px",
    color: "#fff"
  },
  scoreNumber: {
    fontSize: "2rem",
    fontWeight: "700"
  },
  scoreLabel: {
    fontSize: "1rem",
    opacity: 0.9
  },
  summarySection: {
    marginBottom: "30px"
  },
  sectionTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  sectionIcon: {
    fontSize: "1.5rem"
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px"
  },
  summaryItem: {
    background: "rgba(15, 23, 42, 0.7)",
    padding: "15px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  itemIcon: {
    fontSize: "1.8rem",
    width: "50px",
    height: "50px",
    background: "rgba(59, 130, 246, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  itemLabel: {
    color: "#94a3b8",
    fontSize: "0.9rem",
    marginBottom: "5px"
  },
  itemValue: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#fff"
  },
  foodsSection: {
    marginBottom: "30px"
  },
  foodsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  foodItem: {
    background: "rgba(15, 23, 42, 0.7)",
    padding: "15px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeft: "4px solid #3b82f6"
  },
  foodInfo: {
    flex: 1
  },
  foodName: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "8px"
  },
  confidenceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  confidenceBar: {
    width: "100px",
    height: "6px",
    background: "#1e293b",
    borderRadius: "3px",
    overflow: "hidden"
  },
  confidenceFill: {
    height: "100%",
    background: "linear-gradient(90deg, #3b82f6, #22c55e)",
    borderRadius: "3px",
    transition: "width 0.5s ease"
  },
  confidenceText: {
    color: "#94a3b8",
    fontSize: "0.85rem",
    minWidth: "40px"
  },
  foodStats: {
    display: "flex",
    gap: "15px",
    fontSize: "0.9rem",
    color: "#94a3b8"
  },
  foodStat: {
    textAlign: "center",
    minWidth: "60px"
  },
  recommendationsSection: {
    marginBottom: "30px"
  },
  recommendationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  recommendation: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    background: "rgba(59, 130, 246, 0.1)",
    borderRadius: "10px",
    borderLeft: "4px solid #22c55e"
  },
  checkIcon: {
    color: "#22c55e",
    fontSize: "1.2rem",
    fontWeight: "bold"
  },
  recommendationText: {
    color: "#e2e8f0"
  },
  healthScoreSection: {
    marginTop: "30px"
  },
  healthScoreCard: {
    background: "rgba(15, 23, 42, 0.7)",
    padding: "25px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    border: "1px solid rgba(59, 130, 246, 0.3)"
  },
  scoreCircle: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "conic-gradient(#22c55e 0% 85%, #1e293b 85% 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  scoreValue: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#fff"
  },
  scoreLabel: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginTop: "5px"
  },
  healthInfo: {
    flex: 1
  },
  healthText: {
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "15px"
  },
  tags: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  tag: {
    padding: "6px 15px",
    background: "rgba(59, 130, 246, 0.2)",
    color: "#3b82f6",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "500"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    padding: "60px 30px"
  },
  emptyIcon: {
    fontSize: "4rem",
    color: "#3b82f6",
    marginBottom: "20px",
    opacity: 0.5
  },
  emptyTitle: {
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "10px"
  },
  emptyText: {
    color: "#94a3b8",
    marginBottom: "30px",
    lineHeight: "1.6",
    maxWidth: "400px"
  },
  steps: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  step: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px"
  },
  stepNumber: {
    width: "40px",
    height: "40px",
    background: "#3b82f6",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600"
  },
  stepArrow: {
    color: "#3b82f6",
    fontSize: "1.5rem",
    fontWeight: "bold"
  }
};

export default UploadImage;