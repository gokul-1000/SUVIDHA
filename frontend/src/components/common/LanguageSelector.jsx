import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { LANGUAGES } from '../../utils/constants'
import { motion } from 'framer-motion'

const LanguageSelector = ({ variant = 'dropdown' }) => {
  const { language, changeLanguage } = useLanguage()

  if (variant === 'dropdown') {
    return (
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 font-semibold text-gray-700 focus:outline-none focus:border-primary"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    )
  }

  // Grid variant for language selection page
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {LANGUAGES.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => changeLanguage(lang.code)}
          className={`p-6 rounded-xl border-4 transition-all ${
            language === lang.code
              ? 'border-primary bg-primary/10'
              : 'border-gray-300 bg-white hover:border-primary/50'
          }`}
        >
          <div className="text-6xl font-bold text-primary mb-3">{lang.symbol}</div>
          <p className="text-xl font-semibold text-gray-800">{lang.name}</p>
          <p className="text-sm text-gray-500 mt-1">{lang.flag}</p>
        </motion.button>
      ))}
    </div>
  )
}

export default LanguageSelector