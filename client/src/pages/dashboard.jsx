import React, { useState, useEffect } from "react";

export default function Dashboard({user}) {
  const [todayCalories, setTodayCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  useEffect(() => {
    // Animate numbers on component mount
    const animateValue = (setter, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateValue(setTodayCalories, 2038);
    animateValue(setProtein, 45);
    animateValue(setCarbs, 120);
    animateValue(setFats, 32);
  }, []);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🍎</div>
          <h2 style={styles.logo}>Nutrition AI</h2>
        </div>

        <nav style={styles.nav}>
          <div style={styles.menuItemActive}>
            <span style={styles.menuIcon}>📊</span>
            Dashboard
            <div style={styles.activeIndicator}></div>
          </div>
          <div style={styles.menuItem}>
            <span style={styles.menuIcon}>📜</span>
            Meal History
          </div>
          <div style={styles.menuItem}>
            <span style={styles.menuIcon}>🥗</span>
            Nutrition 
          </div>
          <div style={styles.menuItem}>
            <span style={styles.menuIcon}>⚙️</span>
            Settings
          </div>
          <div style={styles.menuItem}>
            <span style={styles.menuIcon}>🔔</span>
            Notifications
          </div>
        </nav>

        <div style={styles.upgradeCard}>
          <div style={styles.upgradeIcon}>🚀</div>
          <h4 style={styles.upgradeTitle}>Upgrade to Pro</h4>
          <p style={styles.upgradeText}>Get advanced analytics</p>
          <button style={styles.upgradeButton}>Upgrade Now</button>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>Dashboard</h1>
            <p style={styles.headerSubtitle}>Welcome back! Here's your nutrition overview</p>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Search meals..." 
                style={styles.searchInput}
              />
            </div>
            <div style={styles.notificationBell}>🔔</div>
            <div style={styles.profileBox}>
              <div style={styles.profilePic}></div>
              <div style={styles.profileInfo}>
                <span style={styles.profileName}>{user?.name || "unkown"}</span>
                <span style={styles.profileRole}>Premium User</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🔥</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statNumber}>{todayCalories}</h3>
              <p style={styles.statLabel}>Calories Today</p>
            </div>
            <div style={styles.statProgress}></div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'rgba(76, 175, 80, 0.2)'}}>💪</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statNumber}>{protein}g</h3>
              <p style={styles.statLabel}>Protein</p>
            </div>
            <div style={styles.statProgress}></div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'rgba(255, 193, 7, 0.2)'}}>🍞</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statNumber}>{carbs}g</h3>
              <p style={styles.statLabel}>Carbs</p>
            </div>
            <div style={styles.statProgress}></div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'rgba(244, 67, 54, 0.2)'}}>🥑</div>
            <div style={styles.statInfo}>
              <h3 style={styles.statNumber}>{fats}g</h3>
              <p style={styles.statLabel}>Fats</p>
            </div>
            <div style={styles.statProgress}></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={styles.contentGrid}>
          {/* Today's Intake Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Today's Nutrition Intake</h3>
              <span style={styles.cardDate}>Nov 15, 2024</span>
            </div>
            
            <div style={styles.intakeContainer}>
              <div style={styles.circularProgress}>
                <div style={styles.circle}>
                  <h1 style={styles.calorieNumber}>{todayCalories}</h1>
                  <p style={styles.calorieLabel}>kcal</p>
                </div>
                <div style={styles.progressRing}></div>
              </div>

              <div style={styles.macroDetails}>
                <div style={styles.macroItem}>
                  <div style={styles.macroHeader}>
                    <span style={styles.macroDot}></span>
                    <span>Protein</span>
                  </div>
                  <div style={styles.macroValue}>{protein}g</div>
                  <div style={styles.macroBar}>
                    <div style={{...styles.macroFill, width: '45%', background: '#4CAF50'}}></div>
                  </div>
                </div>
                
                <div style={styles.macroItem}>
                  <div style={styles.macroHeader}>
                    <span style={{...styles.macroDot, background: '#FFC107'}}></span>
                    <span>Carbohydrates</span>
                  </div>
                  <div style={styles.macroValue}>{carbs}g</div>
                  <div style={styles.macroBar}>
                    <div style={{...styles.macroFill, width: '68%', background: '#FFC107'}}></div>
                  </div>
                </div>
                
                <div style={styles.macroItem}>
                  <div style={styles.macroHeader}>
                    <span style={{...styles.macroDot, background: '#F44336'}}></span>
                    <span>Fats</span>
                  </div>
                  <div style={styles.macroValue}>{fats}g</div>
                  <div style={styles.macroBar}>
                    <div style={{...styles.macroFill, width: '32%', background: '#F44336'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Progress Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Weekly Progress</h3>
              <span style={styles.cardAction}>View All</span>
            </div>
            <div style={styles.chartContainer}>
              <div style={styles.chartBars}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} style={styles.chartBarContainer}>
                    <div 
                      style={{
                        ...styles.chartBar,
                        height: `${40 + (index * 15)}%`,
                        background: index === 2 ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(102, 126, 234, 0.3)'
                      }}
                    ></div>
                    <span style={styles.chartLabel}>{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Meals Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Recent Meals</h3>
              <span style={styles.cardAction}>See All</span>
            </div>
            <div style={styles.mealList}>
              {[
                { name: 'Grilled Chicken Salad', time: '12:30 PM', calories: 420 },
                { name: 'Protein Smoothie', time: '10:00 AM', calories: 280 },
                { name: 'Oatmeal with Fruits', time: '8:15 AM', calories: 350 },
                { name: 'Greek Yogurt', time: '4:30 PM', calories: 150 }
              ].map((meal, index) => (
                <div key={index} style={styles.mealItem}>
                  <div style={styles.mealIcon}>🍽️</div>
                  <div style={styles.mealInfo}>
                    <span style={styles.mealName}>{meal.name}</span>
                    <span style={styles.mealTime}>{meal.time}</span>
                  </div>
                  <div style={styles.mealCalories}>{meal.calories} kcal</div>
                </div>
              ))}
            </div>
          </div>

          {/* Water Intake Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Water Intake</h3>
              <span style={styles.cardAction}>2.1L / 3L</span>
            </div>
            <div style={styles.waterContainer}>
              <div style={styles.waterBottle}>
                <div style={styles.waterFill}></div>
              </div>
              <div style={styles.waterStats}>
                <div style={styles.waterStat}>
                  <span style={styles.waterAmount}>2.1L</span>
                  <span style={styles.waterLabel}>Consumed</span>
                </div>
                <div style={styles.waterStat}>
                  <span style={styles.waterAmount}>0.9L</span>
                  <span style={styles.waterLabel}>Remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Advanced CSS Styles ------------------ */
const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
    color: "#ffffff",
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
  },

  /* Sidebar Styles */
  sidebar: {
    width: "280px",
    background: "rgba(20, 15, 35, 0.9)",
    backdropFilter: "blur(20px)",
    borderRight: "1px solid rgba(102, 126, 234, 0.2)",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "5px 0 25px rgba(0, 0, 0, 0.3)"
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
  },

  logoIcon: {
    fontSize: "28px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "12px",
    padding: "8px",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  logo: {
    fontSize: "20px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0
  },

  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "15px",
    fontWeight: "500"
  },

  menuItemActive: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600"
  },

  menuIcon: {
    fontSize: "18px",
    width: "24px",
    textAlign: "center"
  },

  activeIndicator: {
    position: "absolute",
    right: "15px",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    animation: "pulse 2s infinite"
  },

  upgradeCard: {
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    marginTop: "auto"
  },

  upgradeIcon: {
    fontSize: "32px",
    marginBottom: "10px"
  },

  upgradeTitle: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    fontWeight: "600"
  },

  upgradeText: {
    margin: "0 0 15px 0",
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.6)"
  },

  upgradeButton: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "25px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%"
  },

  /* Main Content Styles */
  main: {
    flex: 1,
    padding: "30px",
    overflowY: "auto"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  headerTitle: {
    fontSize: "32px",
    fontWeight: "700",
    margin: 0,
    background: "linear-gradient(135deg, #ffffff, #b0b0b0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },

  headerSubtitle: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.6)",
    margin: 0
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "25px",
    padding: "8px 15px",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },

  searchIcon: {
    marginRight: "8px",
    opacity: 0.6
  },

  searchInput: {
    background: "transparent",
    border: "none",
    color: "white",
    outline: "none",
    fontSize: "14px",
    width: "200px"
  },

  notificationBell: {
    fontSize: "20px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.05)",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    padding: "8px 15px 8px 8px",
    borderRadius: "25px",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },

  profilePic: {
    width: "40px",
    height: "40px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "50%"
  },

  profileInfo: {
    display: "flex",
    flexDirection: "column"
  },

  profileName: {
    fontSize: "14px",
    fontWeight: "600"
  },

  profileRole: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.5)"
  },

  /* Stats Grid */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "30px"
  },

  statCard: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden"
  },

  statIcon: {
    width: "50px",
    height: "50px",
    background: "rgba(255, 107, 107, 0.2)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px"
  },

  statInfo: {
    flex: 1
  },

  statNumber: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 5px 0"
  },

  statLabel: {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.6)",
    margin: 0
  },

  statProgress: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "0 0 15px 15px"
  },

  /* Content Grid */
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto",
    gap: "25px"
  },

  card: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "25px",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease"
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0
  },

  cardDate: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.5)"
  },

  cardAction: {
    fontSize: "14px",
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "500"
  },

  /* Today's Intake Styles */
  intakeContainer: {
    display: "flex",
    gap: "40px",
    alignItems: "center"
  },

  circularProgress: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  circle: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "8px solid rgba(102, 126, 234, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    zIndex: 2
  },

  progressRing: {
    position: "absolute",
    width: "156px",
    height: "156px",
    borderRadius: "50%",
    border: "8px solid transparent",
    borderTop: "8px solid #667eea",
    borderRight: "8px solid #764ba2",
    animation: "rotate 3s linear infinite"
  },

  calorieNumber: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 5px 0",
    background: "linear-gradient(135deg, #ffffff, #b0b0b0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },

  calorieLabel: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.6)",
    margin: 0
  },

  macroDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  macroItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  macroHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: "500"
  },

  macroDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#4CAF50"
  },

  macroValue: {
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "right"
  },

  macroBar: {
    width: "100%",
    height: "6px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "3px",
    overflow: "hidden"
  },

  macroFill: {
    height: "100%",
    borderRadius: "3px",
    transition: "width 1s ease"
  },

  /* Chart Styles */
  chartContainer: {
    padding: "10px 0"
  },

  chartBars: {
    display: "flex",
    alignItems: "end",
    gap: "15px",
    height: "150px",
    padding: "20px 0"
  },

  chartBarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    flex: 1
  },

  chartBar: {
    width: "100%",
    borderRadius: "5px 5px 0 0",
    transition: "all 0.3s ease",
    minHeight: "20px"
  },

  chartLabel: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.6)"
  },

  /* Meal List Styles */
  mealList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  mealItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.05)"
  },

  mealIcon: {
    fontSize: "20px",
    width: "40px",
    height: "40px",
    background: "rgba(102, 126, 234, 0.1)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  mealInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },

  mealName: {
    fontSize: "14px",
    fontWeight: "500"
  },

  mealTime: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.5)"
  },

  mealCalories: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#667eea"
  },

  /* Water Intake Styles */
  waterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    padding: "10px 0"
  },

  waterBottle: {
    width: "80px",
    height: "120px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px 10px 30px 30px",
    position: "relative",
    overflow: "hidden"
  },

  waterFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
    background: "linear-gradient(180deg, #667eea, #764ba2)",
    borderRadius: "0 0 28px 28px",
    animation: "waterRipple 3s ease-in-out infinite"
  },

  waterStats: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flex: 1
  },

  waterStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px"
  },

  waterAmount: {
    fontSize: "24px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },

  waterLabel: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.6)"
  }
};

// Add CSS animations
const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes waterRipple {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.02); }
  }
`;

const style = document.createElement('style');
style.textContent = keyframes;
document.head.append(style);