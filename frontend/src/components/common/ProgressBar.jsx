import React from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary"
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isPending = stepNumber > currentStep

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              {/* Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  isCompleted
                    ? 'bg-primary text-white'
                    : isCurrent
                    ? 'bg-primary text-white ring-4 ring-primary/30'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </motion.div>

              {/* Label */}
              <p
                className={`mt-2 text-sm font-medium text-center ${
                  isCurrent ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {step}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressBar