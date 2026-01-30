// Firebase Configuration (Using Mock for now)
// In production, replace with actual Firebase config

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Mock Firebase Auth for demo purposes
class MockFirebaseAuth {
  constructor() {
    this.currentUser = null
  }

  async signInWithPhoneNumber(phoneNumber) {
    console.log(`📱 Mock: Sending OTP to ${phoneNumber}`)
    
    return {
      confirm: async (code) => {
        console.log(`✅ Mock: Verifying OTP ${code}`)
        if (code === '123456') {
          this.currentUser = {
            phoneNumber,
            uid: `user_${phoneNumber}`,
          }
          return { user: this.currentUser }
        }
        throw new Error('Invalid OTP')
      },
    }
  }

  async signOut() {
    this.currentUser = null
    console.log('👋 Mock: User signed out')
  }

  onAuthStateChanged(callback) {
    // Simulate auth state change
    setTimeout(() => callback(this.currentUser), 100)
    return () => {} // Unsubscribe function
  }
}

// Mock Firebase Storage
class MockFirebaseStorage {
  async uploadFile(file, path) {
    console.log(`📤 Mock: Uploading file to ${path}`)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      url: `https://mock-storage.com/${path}/${file.name}`,
      path,
      filename: file.name,
      size: file.size,
    }
  }

  async deleteFile(path) {
    console.log(`🗑️ Mock: Deleting file from ${path}`)
    return true
  }

  async getDownloadURL(path) {
    return `https://mock-storage.com/${path}`
  }
}

// Export mock instances
export const auth = new MockFirebaseAuth()
export const storage = new MockFirebaseStorage()

// Helper functions
export const uploadDocument = async (file, userId, documentType) => {
  try {
    const path = `documents/${userId}/${documentType}`
    const result = await storage.uploadFile(file, path)
    return result
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export const deleteDocument = async (path) => {
  try {
    await storage.deleteFile(path)
    return true
  } catch (error) {
    console.error('Delete error:', error)
    throw error
  }
}

// Phone authentication helpers
export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber)
    return confirmationResult
  } catch (error) {
    console.error('OTP send error:', error)
    throw error
  }
}

export const verifyPhoneOTP = async (confirmationResult, code) => {
  try {
    const result = await confirmationResult.confirm(code)
    return result
  } catch (error) {
    console.error('OTP verify error:', error)
    throw error
  }
}

export default {
  auth,
  storage,
  uploadDocument,
  deleteDocument,
  sendPhoneOTP,
  verifyPhoneOTP,
}