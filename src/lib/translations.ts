export type Language = 'en' | 'rw';

export const translations = {
  en: {
    // Landing
    tagline: 'Intelligent Agriculture from Soil to Market',
    heroTitle: 'Transform Your Farm with AI Intelligence',
    heroSubtitle: 'Real-time soil analysis, AI crop guidance, smart market matching, and IoT-powered insights — all in one platform.',
    getStarted: 'Get Started Free',
    learnMore: 'Learn More',
    
    // Onboarding
    selectLanguage: 'Select Your Language',
    selectRole: 'What is your role?',
    createAccount: 'Create Your Account',
    farmer: 'Farmer',
    buyer: 'Buyer',
    investor: 'Investor',
    supplier: 'Supplier',
    cooperative: 'Cooperative',
    admin: 'Administrator',
    farmerDesc: 'Manage crops, soil analysis, and production',
    buyerDesc: 'Find fresh produce and build supply chains',
    investorDesc: 'Discover agricultural investment opportunities',
    supplierDesc: 'Connect with farmers and cooperatives',
    cooperativeDesc: 'Manage farmer groups and collective sales',
    
    // Form
    fullName: 'Full Name',
    nationalId: 'National ID',
    phone: 'Phone Number',
    email: 'Email Address',
    password: 'Password',
    farmSize: 'Farm Size (hectares)',
    location: 'GPS Location',
    detectLocation: 'Detect Location',
    continueBtn: 'Continue',
    back: 'Back',
    
    // Permissions
    cameraAccess: 'Camera Access',
    cameraDesc: 'For disease detection and crop photos',
    micAccess: 'Microphone Access',
    micDesc: 'For voice assistant commands',
    locationAccess: 'Location Access',
    locationDesc: 'For weather and nearby market data',
    notifAccess: 'Notifications',
    notifDesc: 'For weather alerts and market updates',
    
    // Dashboard
    dashboard: 'Dashboard',
    farmOverview: 'Farm Overview',
    aiInsights: 'AI Insights',
    marketplace: 'Marketplace',
    myProjects: 'My Projects',
    devices: 'IoT Devices',
    visionAI: 'Vision AI',
    marketIntel: 'Market Intel',
    analytics: 'Analytics',
    news: 'Agri News',
    notifications: 'Notifications',
    settings: 'Settings',
    
    // Mode switcher
    mode: 'Mode',
    aiSmartMode: 'AI Smart Mode',
    manualMode: 'Manual Mode',
    marketFocus: 'Market Focus',
    productionFocus: 'Production Focus',
    
    // Metrics
    soilPH: 'Soil pH',
    nitrogen: 'Nitrogen',
    phosphorus: 'Phosphorus',
    potassium: 'Potassium',
    moisture: 'Moisture',
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    
    // AI Guidance
    startProject: 'Start New Project',
    cropRecommendation: 'Crop Recommendation',
    plantingSchedule: 'Planting Schedule',
    irrigationPlan: 'Irrigation Plan',
    fertilizerPlan: 'Fertilizer Plan',
    expectedYield: 'Expected Yield',
    estimatedRevenue: 'Estimated Revenue',
    profitability: 'Profitability Score',
    
    // Market
    marketPrice: 'Market Price',
    demand: 'Demand',
    supply: 'Supply',
    trending: 'Trending',
    
    // Devices
    addDevice: 'Add Device',
    virtualMode: 'Virtual Simulation Mode',
    deviceId: 'Device ID',
    lastSync: 'Last Sync',
    
    // Vision
    uploadImage: 'Upload Image',
    detectDisease: 'Detect Disease/Pest',
    analysisResult: 'Analysis Result',
    severity: 'Severity',
    
    // Voice
    voiceAssistant: 'Voice Assistant',
    speakNow: 'Speak now...',
    listening: 'Listening...',
    
    // Status
    online: 'Online',
    offline: 'Offline',
    active: 'Active',
    
    // General
    viewAll: 'View All',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    noData: 'No data available',
    score: 'Score',
    verified: 'Verified',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  },
  rw: {
    // Landing
    tagline: 'Ubuhinzi Bw\'Ubukorikori kuva mu Butaka kugera ku Isoko',
    heroTitle: 'Hindura Ubworozi Bwawe Ukoresheje Ubwenge bwa AI',
    heroSubtitle: 'Isesengura ry\'ubutaka mu gihe nyacyo, inama za AI, isoko ryihuse, n\'ubushobozi bwa IoT — byose mu rubuga rumwe.',
    getStarted: 'Tangira Ubuntu',
    learnMore: 'Menya Byinshi',
    
    // Onboarding
    selectLanguage: 'Hitamo Ururimi Rwawe',
    selectRole: 'Ni iki ukora?',
    createAccount: 'Fungura Konti Yawe',
    farmer: 'Umuhinzi',
    buyer: 'Umuguzi',
    investor: 'Umusoreshwa',
    supplier: 'Uhana Ibicuruzwa',
    cooperative: 'Koperative',
    admin: 'Umuyobozi',
    farmerDesc: 'Gucunga imyaka, isesengura ry\'ubutaka, no gukora',
    buyerDesc: 'Shaka imyaka mishya no kubaka imiyoboro',
    investorDesc: 'Shakisha amahirwe yo gushora mu buhinzi',
    supplierDesc: 'Huza abahinzi n\'amakoperative',
    cooperativeDesc: 'Gucunga amatsinda y\'abahinzi n\'ibikorwa bya bose',
    
    // Form
    fullName: 'Amazina Yombi',
    nationalId: 'Indangamuntu',
    phone: 'Nimero ya Telefoni',
    email: 'Imeli',
    password: 'Ijambobanga',
    farmSize: 'Ingano y\'Ubutaka (hectare)',
    location: 'Aho uri (GPS)',
    detectLocation: 'Shakisha Ahantu',
    continueBtn: 'Komeza',
    back: 'Garuka',
    
    // Permissions
    cameraAccess: 'Uburenganzira bwa Kamera',
    cameraDesc: 'Kugira ngo ushobore gutora indwara z\'imyaka',
    micAccess: 'Uburenganzira bw\'Mikrofoni',
    micDesc: 'Gukoresha umufasha wa ijwi',
    locationAccess: 'Uburenganzira bw\'Aho uri',
    locationDesc: 'Kugira ngo ubone amakuru y\'ikirere n\'isoko riri hafi',
    notifAccess: 'Ubutumwa',
    notifDesc: 'Kugira ngo ubone umenyesha w\'ikirere n\'isoko',
    
    // Dashboard
    dashboard: 'Ikirangaminsi',
    farmOverview: 'Incamake y\'Ubutaka',
    aiInsights: 'Inama za AI',
    marketplace: 'Isoko',
    myProjects: 'Imishinga Yanjye',
    devices: 'Ibikoresho bya IoT',
    visionAI: 'AI yo Kureba',
    marketIntel: 'Ubushakashatsi bw\'Isoko',
    analytics: 'Isesengura',
    news: 'Amakuru y\'Ubuhinzi',
    notifications: 'Imenyesha',
    settings: 'Igenamiterere',
    
    // Mode switcher
    mode: 'Uburyo',
    aiSmartMode: 'Uburyo bwa AI',
    manualMode: 'Uburyo bwa Gukora',
    marketFocus: 'Gutekereza Isoko',
    productionFocus: 'Gutekereza Gukora',
    
    // Metrics
    soilPH: 'pH y\'Ubutaka',
    nitrogen: 'Azote',
    phosphorus: 'Fositeri',
    potassium: 'Potasiyo',
    moisture: 'Ubuhehere',
    temperature: 'Ubushyuhe',
    humidity: 'Ubuhehere bw\'Ikirere',
    rainfall: 'Imvura',
    
    // AI Guidance
    startProject: 'Tangira Umushinga Mushya',
    cropRecommendation: 'Inama y\'Igihingwa',
    plantingSchedule: 'Gahunda yo Gutera',
    irrigationPlan: 'Gahunda yo Gusukira',
    fertilizerPlan: 'Gahunda y\'Ifumbire',
    expectedYield: 'Umusaruro Utegerejwe',
    estimatedRevenue: 'Inyungu Zitegerejwa',
    profitability: 'Amanota yo Gukora Inyungu',
    
    // Market
    marketPrice: 'Igiciro cy\'Isoko',
    demand: 'Inyota',
    supply: 'Itangwa',
    trending: 'Birazinguka',
    
    // Devices
    addDevice: 'Ongeraho Ikigereranyo',
    virtualMode: 'Uburyo bwa Ibishimizi',
    deviceId: 'ID y\'Ikigereranyo',
    lastSync: 'Guhuza Guheruka',
    
    // Vision
    uploadImage: 'Shyira Ifoto',
    detectDisease: 'Shakisha Indwara/Ibyonnyi',
    analysisResult: 'Ibisubizo by\'Isesengura',
    severity: 'Akamero',
    
    // Voice
    voiceAssistant: 'Umufasha w\'Ijwi',
    speakNow: 'Vuga ubu...',
    listening: 'Njyeho...',
    
    // Status
    online: 'Online',
    offline: 'Offline',
    active: 'Akora',
    
    // General
    viewAll: 'Reba Byose',
    save: 'Bika',
    cancel: 'Reka',
    loading: 'Gutegereza...',
    noData: 'Nta makuru',
    score: 'Amanota',
    verified: 'Yemejwe',
    pending: 'Bitegereje',
    approved: 'Byemejwe',
    rejected: 'Byanzwe',
  }
};

export type TranslationKey = keyof typeof translations.en;
