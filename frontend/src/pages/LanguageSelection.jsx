import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSelector from '../components/common/LanguageSelector'

const LanguageSelection = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral to-white flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            {t('selectLanguage')}
          </h1>
          <p className="text-xl text-gray-600">Choose your preferred language</p>
        </div>

        {/* Language Grid */}
        <LanguageSelector variant="grid" />

        {/* Continue Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/login')}
          className="w-full mt-8 gov-button-primary text-xl py-4"
        >
          {t('continue')} →
        </motion.button>
      </motion.div>
    </div>
  )
}

export default LanguageSelection