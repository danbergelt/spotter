import React from 'react';
import { Link } from 'react-router-dom'

const BottomCta: React.FC = () => {
  return (
    <div className="bottomcta-container">
      <div className="bottomcta-title">Log your first workout</div>
      <div className="bottomcta-cta"><Link style={{color: "white", textDecoration: "none"}} to="/signup">Get Tracking</Link></div>
    </div>
  )
}

export default BottomCta