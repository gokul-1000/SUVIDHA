// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// Format date with time
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Generate application number
export const generateApplicationNumber = (serviceType) => {
  const prefix = serviceType.substring(0, 3).toUpperCase()
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${timestamp}-${random}`
}

// Generate complaint ID
export const generateComplaintId = (department) => {
  const prefix = `GRV-${department.substring(0, 3).toUpperCase()}`
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  return `${prefix}-${year}-${random}`
}

// Validate phone number
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone)
}

// Validate Aadhaar
export const validateAadhaar = (aadhaar) => {
  const aadhaarRegex = /^\d{12}$/
  return aadhaarRegex.test(aadhaar.replace(/\s/g, ''))
}

// Format Aadhaar with spaces
export const formatAadhaar = (aadhaar) => {
  const cleaned = aadhaar.replace(/\s/g, '')
  return cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')
}

// Calculate bill due status
export const getBillStatus = (dueDate, isPaid) => {
  if (isPaid) return 'paid'
  const today = new Date()
  const due = new Date(dueDate)
  if (today > due) return 'overdue'
  if (today.toDateString() === due.toDateString()) return 'due_today'
  return 'unpaid'
}

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    submitted: 'bg-blue-100 text-blue-800',
    under_verification: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    paid: 'bg-green-100 text-green-800',
    unpaid: 'bg-gray-100 text-gray-800',
    overdue: 'bg-red-100 text-red-800',
    due_today: 'bg-orange-100 text-orange-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

// Download file
export const downloadFile = (data, filename) => {
  const blob = new Blob([data], { type: 'application/pdf' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Generate OTP (for mock)
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Sleep function
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))