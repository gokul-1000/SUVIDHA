import React from 'react'
import { getStatusColor } from '../../utils/helpers'
import { useLanguage } from '../../context/LanguageContext'

const StatusBadge = ({ status }) => {
  const { t } = useLanguage()
  
  const statusColors = getStatusColor(status)
  
  // Convert status to translation key
  const statusKey = status.split('_').map((word, index) => 
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors}`}>
      {t(`status.${statusKey}`) || status}
    </span>
  )
}

export default StatusBadge