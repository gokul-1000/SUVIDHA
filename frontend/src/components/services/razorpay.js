// Razorpay Payment Integration

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID

// Load Razorpay script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Initialize Razorpay payment
export const initiatePayment = async ({
  amount,
  orderId,
  currency = 'INR',
  name,
  description,
  prefill = {},
  onSuccess,
  onFailure,
}) => {
  // Load Razorpay script if not already loaded
  const scriptLoaded = await loadRazorpayScript()

  if (!scriptLoaded) {
    onFailure?.({ error: 'Failed to load Razorpay SDK' })
    return
  }

  // Razorpay options
  const options = {
    key: RAZORPAY_KEY,
    amount: amount * 100, // Amount in paise
    currency,
    name: name || 'SUVIDHA',
    description: description || 'Payment for civic services',
    order_id: orderId,
    prefill: {
      name: prefill.name || '',
      email: prefill.email || '',
      contact: prefill.contact || '',
    },
    theme: {
      color: '#0A3D62', // Primary color
    },
    handler: function (response) {
      // Payment successful
      onSuccess?.({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      })
    },
    modal: {
      ondismiss: function () {
        // User closed the payment modal
        onFailure?.({ error: 'Payment cancelled by user' })
      },
    },
  }

  // Create Razorpay instance and open checkout
  const razorpay = new window.Razorpay(options)
  
  razorpay.on('payment.failed', function (response) {
    onFailure?.({
      error: response.error.description,
      code: response.error.code,
      metadata: response.error.metadata,
    })
  })

  razorpay.open()
}

// Mock payment for demo (when Razorpay key is not configured)
export const mockPayment = async ({
  amount,
  billIds,
  onSuccess,
  onFailure,
}) => {
  console.log('🎭 Mock Payment Initiated')
  console.log('Amount:', amount)
  console.log('Bills:', billIds)

  // Simulate payment processing
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate for demo

      if (success) {
        const mockResponse = {
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_order_id: `order_mock_${Date.now()}`,
          razorpay_signature: 'mock_signature',
        }
        console.log('✅ Mock Payment Successful:', mockResponse)
        onSuccess?.(mockResponse)
        resolve(mockResponse)
      } else {
        const error = { error: 'Mock payment failed (random)' }
        console.log('❌ Mock Payment Failed:', error)
        onFailure?.(error)
        resolve(error)
      }
    }, 2000) // 2 second delay
  })
}

// Unified payment function (uses mock if Razorpay key not configured)
export const processPayment = async (paymentData) => {
  if (!RAZORPAY_KEY || RAZORPAY_KEY === 'rzp_test_demo123456') {
    // Use mock payment
    return mockPayment(paymentData)
  } else {
    // Use real Razorpay
    return initiatePayment(paymentData)
  }
}

export default {
  loadRazorpayScript,
  initiatePayment,
  mockPayment,
  processPayment,
}