import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import { useLanguage } from '../../../context/LanguageContext'
import { 
  Sun, 
  Calculator, 
  CheckCircle, 
  Users,
  FileText,
  Info,
  Star,
  TrendingDown,
  Leaf
} from 'lucide-react'
import { SOLAR_SUBSIDY } from '../../../utils/constants'
import { formatCurrency } from '../../../utils/helpers'

const SolarHub = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [monthlyUnits, setMonthlyUnits] = useState(300)
  const [rooftopArea, setRooftopArea] = useState(100)

  // Calculate recommended capacity
  const calculateCapacity = () => {
    if (monthlyUnits <= 150) return '1kw'
    if (monthlyUnits <= 300) return '2kw'
    return '3kw'
  }

  const capacity = calculateCapacity()
  const subsidy = SOLAR_SUBSIDY[capacity]
  const estimatedCost = capacity === '1kw' ? 60000 : capacity === '2kw' ? 120000 : 180000
  const finalCost = estimatedCost - subsidy
  const monthlySavings = monthlyUnits * 6 // ₹6 per unit average
  const paybackYears = (finalCost / (monthlySavings * 12)).toFixed(1)

  const services = [
    {
      title: 'Scheme Overview',
      description: 'Learn about PM Surya Ghar Yojana',
      icon: Info,
      path: '/solar/scheme',
    },
    {
      title: 'Subsidy Calculator',
      description: 'Calculate your solar subsidy',
      icon: Calculator,
      path: '/solar/calculator',
    },
    {
      title: 'Eligibility Check',
      description: 'Check if you qualify for subsidy',
      icon: CheckCircle,
      path: '/solar/eligibility',
    },
    {
      title: 'Approved Vendors',
      description: 'Find MNRE empanelled vendors',
      icon: Users,
      path: '/solar/vendors',
    },
    {
      title: 'Apply Now',
      description: 'Submit solar installation application',
      icon: FileText,
      path: '/solar/apply',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Special Header with Star */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 text-white rounded-2xl p-8 mb-8 overflow-hidden"
        >
          {/* Star Badge */}
          <div className="absolute top-4 right-4 bg-white text-orange-600 rounded-full p-3 shadow-lg">
            <Star className="w-6 h-6 fill-current" />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Sun className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                {t('solar')} 
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">X-FACTOR</span>
              </h1>
              <p className="text-white/90 text-lg">PM Surya Ghar - Free Electricity Scheme</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-orange-600" />
            Quick Subsidy Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Electricity Units
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-center font-bold text-primary text-2xl mt-2">{monthlyUnits} units</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rooftop Area (sq ft)
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={rooftopArea}
                onChange={(e) => setRooftopArea(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-center font-bold text-primary text-2xl mt-2">{rooftopArea} sq ft</p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Recommended</p>
              <p className="text-2xl font-bold text-orange-600">{capacity.toUpperCase()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1 flex items-center justify-center gap-1">
                <TrendingDown className="w-4 h-4" /> Subsidy
              </p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(subsidy)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(monthlySavings)}/mo</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1 flex items-center justify-center gap-1">
                <Leaf className="w-4 h-4" /> Payback
              </p>
              <p className="text-2xl font-bold text-purple-600">{paybackYears} years</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Total Cost: <span className="line-through">{formatCurrency(estimatedCost)}</span> 
            <span className="text-green-600 font-bold ml-2">{formatCurrency(finalCost)}</span> (After Subsidy)
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(service.path)}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-300"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <service.icon className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-6"
        >
          <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
            <Sun className="w-5 h-5" />
            PM Surya Ghar - Muft Bijli Yojana Benefits
          </h3>
          <ul className="space-y-2 text-orange-800">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Up to <strong>300 units free electricity</strong> per month</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Central subsidy: <strong>₹30,000 (1kW), ₹60,000 (2kW), ₹78,000 (3kW+)</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Net-metering enabled - sell excess power back to grid</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>25-year panel warranty from MNRE approved vendors</span>
            </li>
          </ul>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

export default SolarHub