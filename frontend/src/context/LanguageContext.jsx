import React, { createContext, useState, useContext, useEffect } from 'react'

// Import all translations
import en from '../translations/en.json'
import hi from '../translations/hi.json'
import ta from '../translations/ta.json'
import te from '../translations/te.json'
import pa from '../translations/pa.json'
import bn from '../translations/bn.json'

const translations = { en, hi, ta, te, pa, bn }

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to English
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language)
  }, [language])

  const t = (key) => {
    // Get translation for current language
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
    }
  }

  const value = {
    language,
    changeLanguage,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}