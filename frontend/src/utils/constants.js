// Service Types
export const SERVICE_TYPES = {
  ELECTRICITY: 'electricity',
  WATER: 'water',
  GAS: 'gas',
  SANITATION: 'sanitation',
  SOLAR: 'solar',
}

// Application Types
export const APPLICATION_TYPES = {
  NEW_CONNECTION: 'new_connection',
  LOAD_CHANGE: 'load_change',
  CATEGORY_CHANGE: 'category_change',
  DISCONNECTION: 'disconnection',
  WATER_QUALITY_TEST: 'water_quality_test',
  LPG_REFILL: 'lpg_refill',
  TOILET_CONSTRUCTION: 'toilet_construction',
  SOLAR_INSTALLATION: 'solar_installation',
}

// Application Status
export const APPLICATION_STATUS = {
  SUBMITTED: 'submitted',
  UNDER_VERIFICATION: 'under_verification',
  DOCUMENTS_PENDING: 'documents_pending',
  SITE_INSPECTION: 'site_inspection',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  ON_HOLD: 'on_hold',
}

// Bill Status
export const BILL_STATUS = {
  PAID: 'paid',
  UNPAID: 'unpaid',
  OVERDUE: 'overdue',
  PARTIAL: 'partial',
}

// Grievance Priority
export const GRIEVANCE_PRIORITY = {
  CRITICAL: 'critical',
  MEDIUM: 'medium',
  LOW: 'low',
}

// Grievance Status
export const GRIEVANCE_STATUS = {
  REGISTERED: 'registered',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
}

// Connection Categories
export const CONNECTION_CATEGORIES = {
  DOMESTIC: 'domestic',
  COMMERCIAL: 'commercial',
  INDUSTRIAL: 'industrial',
}

// Load Units
export const LOAD_UNITS = {
  KW: 'kW',
  HP: 'HP',
}

// Payment Methods
export const PAYMENT_METHODS = {
  UPI: 'upi',
  CARD: 'card',
  NET_BANKING: 'net_banking',
  CASH: 'cash',
}

// Document Types
export const DOCUMENT_TYPES = {
  AADHAAR: 'aadhaar',
  ADDRESS_PROOF: 'address_proof',
  ELECTRICITY_BILL: 'electricity_bill',
  PROPERTY_PROOF: 'property_proof',
  TRADE_LICENSE: 'trade_license',
  PHOTO: 'photo',
}

// Solar Subsidy Rates (PM Surya Ghar)
export const SOLAR_SUBSIDY = {
  '1kw': 30000,
  '2kw': 60000,
  '3kw': 78000,
}

// Mock Phone Numbers
export const MOCK_NUMBERS = {
  CITIZEN: '6239036290',
  ADMIN: '7889249131',
}

// Colors
export const COLORS = {
  PRIMARY: '#0A3D62',
  SECONDARY: '#138808',
  ACCENT: '#FF9933',
  SUCCESS: '#4CAF50',
  WARNING: '#FFA726',
  DANGER: '#D32F2F',
}

// Languages
export const LANGUAGES = [
  { code: 'en', name: 'English', symbol: 'A', flag: '🇬🇧' },
  { code: 'hi', name: 'हिन्दी', symbol: 'अ', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', symbol: 'அ', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', symbol: 'అ', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', symbol: 'ਅ', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', symbol: 'অ', flag: '🇮🇳' },
]