import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillCircles = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredSkills = skills.filter(skill => 
    activeCategory === 'all' || skill.categoria === activeCategory
  );

  return (
    <div className="relative w-96 h-96 mx-auto">
      <img 
        src="/foto-profesional.jpg" 
        alt="Tu Nombre"
        className="w-48 h-48 rounded-full object-cover mx-auto absolute inset-0 m-auto z-10 border-4 border-white shadow-xl"
      />
      
      {filteredSkills.map((skill, index) => {
        const angle = (index / filteredSkills.length) * 360;
        const radius = 150;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        
        return (
          <motion.div
            key={skill.id}
            className="absolute bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold shadow-lg cursor-pointer"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
          >
            <div className="text-center">
              <div>{skill.nombre}</div>
              <div className="text-xs">{skill.nivel}%</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};