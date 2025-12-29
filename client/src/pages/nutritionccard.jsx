import React, { useState } from 'react';

const Nutrition = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock nutrition data
  const nutritionData = [
    {
      id: 1,
      name: 'Apple',
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
      sugar: 10,
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200'
    },
    {
      id: 2,
      name: 'Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200'
    },
    {
      id: 3,
      name: 'Brown Rice',
      calories: 112,
      protein: 2.6,
      carbs: 23,
      fat: 0.8,
      fiber: 1.8,
      sugar: 0.4,
      image: 'https://images.unsplash.com/photo-1598866592122-6e25f5fbe2e8?w=200'
    },
    {
      id: 4,
      name: 'Avocado',
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      fiber: 7,
      sugar: 0.7,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200'
    },
    {
      id: 5,
      name: 'Salmon',
      calories: 206,
      protein: 22,
      carbs: 0,
      fat: 13,
      fiber: 0,
      sugar: 0,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200'
    },
    {
      id: 6,
      name: 'Broccoli',
      calories: 34,
      protein: 2.8,
      carbs: 7,
      fat: 0.4,
      fiber: 2.6,
      sugar: 1.7,
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200'
    }
  ];

  const filteredFoods = nutritionData.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#434547ff',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  };

  const searchContainerStyle = {
    maxWidth: '600px',
    margin: '0 auto 40px',
    position: 'relative'
  };

  const searchInputStyle = {
    width: '100%',
    padding: '15px 20px',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '50px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  };

  const cardImageStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: '4px solid #667eea'
  };

  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333'
  };

  const caloriesStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#667eea',
    marginBottom: '15px'
  };

  const macroGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginTop: '15px'
  };

  const macroItemStyle = {
    textAlign: 'center',
    padding: '8px'
  };

  const macroValueStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333'
  };

  const macroLabelStyle = {
    fontSize: '0.8rem',
    color: '#666',
    textTransform: 'uppercase'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    textAlign: 'center',
    position: 'relative'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#666'
  };

  const detailGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginTop: '20px'
  };

  const detailItemStyle = {
    backgroundColor: '#3d4e5cff',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'center'
  };

  const progressBarStyle = {
    height: '8px',
    backgroundColor: '#161717ff',
    borderRadius: '10px',
    marginTop: '10px',
    overflow: 'hidden'
  };

  const progressFillStyle = (value, max = 100) => ({
    height: '100%',
    backgroundColor: '#667eea',
    width: `${(value / max) * 100}%`,
    borderRadius: '10px',
    transition: 'width 0.3s ease'
  });

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Nutrition Database</h1>
        <p style={subtitleStyle}>
          Explore comprehensive nutritional information for various foods. 
          Click on any food item to view detailed analysis.
        </p>
      </div>

      {/* Search Bar */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search for foods... (e.g., apple, chicken, broccoli)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 5px 25px rgba(102, 126, 234, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
          }}
        />
      </div>

      {/* Food Grid */}
      <div style={gridStyle}>
        {filteredFoods.map(food => (
          <div
            key={food.id}
            style={cardStyle}
            onClick={() => setSelectedFood(food)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src={food.image}
              alt={food.name}
              style={cardImageStyle}
            />
            <h3 style={cardTitleStyle}>{food.name}</h3>
            <div style={caloriesStyle}>{food.calories} kcal</div>
            
            <div style={macroGridStyle}>
              <div style={macroItemStyle}>
                <div style={macroValueStyle}>{food.protein}g</div>
                <div style={macroLabelStyle}>Protein</div>
              </div>
              <div style={macroItemStyle}>
                <div style={macroValueStyle}>{food.carbs}g</div>
                <div style={macroLabelStyle}>Carbs</div>
              </div>
              <div style={macroItemStyle}>
                <div style={macroValueStyle}>{food.fat}g</div>
                <div style={macroLabelStyle}>Fat</div>
              </div>
              <div style={macroItemStyle}>
                <div style={macroValueStyle}>{food.fiber}g</div>
                <div style={macroLabelStyle}>Fiber</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Detailed View */}
      {selectedFood && (
        <div style={modalOverlayStyle} onClick={() => setSelectedFood(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button
              style={closeButtonStyle}
              onClick={() => setSelectedFood(null)}
            >
              ×
            </button>
            
            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              style={{...cardImageStyle, width: '150px', height: '150px'}}
            />
            
            <h2 style={cardTitleStyle}>{selectedFood.name}</h2>
            <div style={{...caloriesStyle, fontSize: '2.5rem'}}>
              {selectedFood.calories} kcal
            </div>

            <div style={detailGridStyle}>
              <div style={detailItemStyle}>
                <div style={macroValueStyle}>{selectedFood.protein}g</div>
                <div style={macroLabelStyle}>Protein</div>
                <div style={progressBarStyle}>
                  <div style={progressFillStyle(selectedFood.protein, 50)}></div>
                </div>
              </div>
              <div style={detailItemStyle}>
                <div style={macroValueStyle}>{selectedFood.carbs}g</div>
                <div style={macroLabelStyle}>Carbohydrates</div>
                <div style={progressBarStyle}>
                  <div style={progressFillStyle(selectedFood.carbs, 100)}></div>
                </div>
              </div>
              <div style={detailItemStyle}>
                <div style={macroValueStyle}>{selectedFood.fat}g</div>
                <div style={macroLabelStyle}>Fat</div>
                <div style={progressBarStyle}>
                  <div style={progressFillStyle(selectedFood.fat, 70)}></div>
                </div>
              </div>
              <div style={detailItemStyle}>
                <div style={macroValueStyle}>{selectedFood.fiber}g</div>
                <div style={macroLabelStyle}>Fiber</div>
                <div style={progressBarStyle}>
                  <div style={progressFillStyle(selectedFood.fiber, 25)}></div>
                </div>
              </div>
              <div style={detailItemStyle}>
                <div style={macroValueStyle}>{selectedFood.sugar}g</div>
                <div style={macroLabelStyle}>Sugar</div>
                <div style={progressBarStyle}>
                  <div style={progressFillStyle(selectedFood.sugar, 50)}></div>
                </div>
              </div>
              <div style={detailItemStyle}>
                <div style={macroValueStyle}>
                  {((selectedFood.protein * 4 + selectedFood.carbs * 4 + selectedFood.fat * 9) / selectedFood.calories * 100).toFixed(1)}%
                </div>
                <div style={macroLabelStyle}>Macro Ratio</div>
                <div style={progressBarStyle}>
                  <div style={progressFillStyle(100, 100)}></div>
                </div>
              </div>
            </div>

            <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px'}}>
              <h4 style={{marginBottom: '15px', color: '#333'}}>Nutritional Summary</h4>
              <p style={{color: '#666', lineHeight: '1.6'}}>
                {selectedFood.name} provides {selectedFood.calories} calories per serving, 
                with {selectedFood.protein}g of protein, {selectedFood.carbs}g of carbohydrates, 
                and {selectedFood.fat}g of fat. It contains {selectedFood.fiber}g of dietary fiber 
                and {selectedFood.sugar}g of natural sugars.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {filteredFoods.length === 0 && (
        <div style={{textAlign: 'center', padding: '60px 20px', color: '#666'}}>
          <h3 style={{marginBottom: '10px'}}>No foods found</h3>
          <p>Try searching for something else</p>
        </div>
      )}
    </div>
  );
};

export default Nutrition;
