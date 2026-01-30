import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Star } from 'lucide-react'

const ServiceCard = ({ title, icon: Icon, description, onClick, isSpecial = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative gov-card cursor-pointer hover:shadow-xl transition-all duration-300 ${
        isSpecial ? 'border-2 border-accent' : ''
      }`}
    >
      {/* Special Badge */}
      {isSpecial && (
        <div className="absolute -top-2 -right-2 bg-accent text-white rounded-full p-2">
          <Star className="w-4 h-4 fill-current" />
        </div>
      )}

      {/* Icon */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
        isSpecial ? 'bg-accent/10' : 'bg-primary/10'
      }`}>
        <Icon className={`w-8 h-8 ${isSpecial ? 'text-accent' : 'text-primary'}`} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {/* Arrow */}
      <div className="flex items-center text-primary font-semibold">
        <span>Access Service</span>
        <ChevronRight className="w-5 h-5 ml-2" />
      </div>
    </motion.div>
  )
}

export default ServiceCard