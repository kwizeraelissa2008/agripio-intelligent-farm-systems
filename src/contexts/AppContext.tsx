import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, TranslationKey } from '@/lib/translations';

export type UserRole = 'farmer' | 'buyer' | 'investor' | 'supplier' | 'cooperative' | 'admin';
export type FarmerMode = 'smart' | 'manual' | 'market' | 'production';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  farmSize?: number;
  location?: { lat: number; lng: number };
  farmerMode?: FarmerMode;
  verified: boolean;
}

interface Notification {
  id: string;
  type: 'weather' | 'irrigation' | 'disease' | 'market' | 'investment' | 'system';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  severity: 'info' | 'warning' | 'critical';
}

export type ThemeMode = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  farmerMode: FarmerMode;
  setFarmerMode: (mode: FarmerMode) => void;
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  addNotification: (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'weather',
    title: 'Heavy Rain Alert',
    message: 'Heavy rainfall expected in your region tomorrow. Consider adjusting irrigation.',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    severity: 'warning',
  },
  {
    id: '2',
    type: 'disease',
    title: 'Disease Risk: Late Blight',
    message: 'Conditions are favorable for late blight on tomatoes. Inspect crops.',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    severity: 'critical',
  },
  {
    id: '3',
    type: 'market',
    title: 'Market Opportunity',
    message: 'Maize prices up 18% in Kigali. Best time to sell.',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    severity: 'info',
  },
  {
    id: '4',
    type: 'investment',
    title: 'New Investor Match',
    message: 'An investor is interested in your avocado project. Check matching.',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    severity: 'info',
  },
  {
    id: '5',
    type: 'irrigation',
    title: 'Irrigation Reminder',
    message: 'North field Zone A scheduled irrigation in 2 hours.',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    severity: 'info',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [farmerMode, setFarmerMode] = useState<FarmerMode>('smart');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('agripio-theme') as ThemeMode) || 'light';
    }
    return 'light';
  });

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('agripio-theme', t);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
      farmerMode,
      setFarmerMode,
      notifications,
      unreadCount,
      markAllRead,
      addNotification,
      sidebarOpen,
      setSidebarOpen,
      theme,
      setTheme,
      toggleTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
