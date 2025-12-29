import React from "react";

export default function MealList() {
  const styles = {
    container: { padding: "20px", fontFamily: "Arial" },
    item: {
      background: "white",
      padding: "15px",
      margin: "10px 0",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Saved Meals</h2>

      <div style={styles.item}>🍛 Dal Chawal - 350 cal</div>
      <div style={styles.item}>🍕 Pizza Slice - 290 cal</div>
      <div style={styles.item}>🥗 Salad - 150 cal</div>
    </div>
  );
}

