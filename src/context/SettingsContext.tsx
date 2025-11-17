import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings } from '../types';
import { defaultSettings } from '../utils/defaultSettings';
import {
  loadGlobalSettings,
  saveGlobalSettings,
  saveLocalSettings,
  loadLocalSettings,
  subscribeToGlobalSettings,
  hasLocalSettings,
  clearLocalSettings,
} from '../services/settingsService';

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: AppSettings) => void;
  resetSettings: () => void;
  saveForEveryone: (newSettings: AppSettings) => Promise<void>;
  saveForMe: (newSettings: AppSettings) => void;
  revertToGlobal: () => void;
  isUsingPersonalSettings: boolean;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isUsingPersonalSettings, setIsUsingPersonalSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize settings from Firebase or local storage
  useEffect(() => {
    const initSettings = async () => {
      try {
        // Check if user has personal settings first
        const personalSettings = loadLocalSettings();
        if (personalSettings) {
          console.log('📱 Using personal settings');
          setSettings(personalSettings);
          setIsUsingPersonalSettings(true);
          setIsLoading(false);
          return;
        }

        // Otherwise, load global settings from Firebase
        const globalSettings = await loadGlobalSettings();
        if (globalSettings) {
          console.log('🌍 Using global settings from Firebase');
          setSettings(globalSettings);
        } else {
          console.log('⚙️ Using default settings');
          setSettings(defaultSettings);
          // Initialize Firebase with default settings
          await saveGlobalSettings(defaultSettings);
        }
      } catch (error) {
        console.error('❌ Error initializing settings:', error);
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    };

    initSettings();
  }, []);

  // Subscribe to real-time Firebase updates (only if not using personal settings)
  useEffect(() => {
    if (isUsingPersonalSettings || isLoading) {
      return;
    }

    console.log('👂 Subscribing to real-time settings updates');
    const unsubscribe = subscribeToGlobalSettings((updatedSettings) => {
      if (updatedSettings && !hasLocalSettings()) {
        console.log('🔄 Settings auto-synced from Firebase');
        setSettings(updatedSettings);
      }
    });

    return () => {
      console.log('🔇 Unsubscribed from settings updates');
      unsubscribe();
    };
  }, [isUsingPersonalSettings, isLoading]);

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const saveForEveryone = async (newSettings: AppSettings) => {
    try {
      await saveGlobalSettings(newSettings);
      
      // If user was using personal settings, clear them to use global
      if (isUsingPersonalSettings) {
        clearLocalSettings();
        setIsUsingPersonalSettings(false);
      }
      
      setSettings(newSettings);
    } catch (error) {
      console.error('❌ Error saving for everyone:', error);
      throw error;
    }
  };

  const saveForMe = (newSettings: AppSettings) => {
    saveLocalSettings(newSettings);
    setSettings(newSettings);
    setIsUsingPersonalSettings(true);
  };

  const revertToGlobal = async () => {
    clearLocalSettings();
    setIsUsingPersonalSettings(false);
    
    // Reload global settings
    const globalSettings = await loadGlobalSettings();
    if (globalSettings) {
      setSettings(globalSettings);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        saveForEveryone,
        saveForMe,
        revertToGlobal,
        isUsingPersonalSettings,
        isLoading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

