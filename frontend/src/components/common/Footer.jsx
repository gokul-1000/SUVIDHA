import React from 'react'
import { useLanguage } from '../../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold text-lg">SUVIDHA</p>
            <p className="text-sm text-white/70">Smart City Civic Services</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-white/80">
              © 2026 SUVIDHA. All rights reserved.
            </p>
            <p className="text-xs text-white/60 mt-1">
              Powered by Digital India Initiative
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-accent transition-colors">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer