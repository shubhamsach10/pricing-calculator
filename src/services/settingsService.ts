import { ref, set, get, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';
import { AppSettings } from '../types';

const GLOBAL_SETTINGS_PATH = 'settings/global';

/**
 * Save settings for everyone (global settings)
 */
export const saveGlobalSettings = async (settings: AppSettings): Promise<void> => {
  try {
    const settingsRef = ref(database, GLOBAL_SETTINGS_PATH);
    await set(settingsRef, settings);
    console.log('✅ Settings saved globally');
  } catch (error) {
    console.error('❌ Error saving global settings:', error);
    throw error;
  }
};

/**
 * Load global settings
 */
export const loadGlobalSettings = async (): Promise<AppSettings | null> => {
  try {
    const settingsRef = ref(database, GLOBAL_SETTINGS_PATH);
    const snapshot = await get(settingsRef);
    
    if (snapshot.exists()) {
      console.log('✅ Global settings loaded from Firebase');
      return snapshot.val() as AppSettings;
    } else {
      console.log('ℹ️ No global settings found in Firebase');
      return null;
    }
  } catch (error) {
    console.error('❌ Error loading global settings:', error);
    return null;
  }
};

/**
 * Subscribe to real-time global settings updates
 */
export const subscribeToGlobalSettings = (
  callback: (settings: AppSettings | null) => void
): (() => void) => {
  const settingsRef = ref(database, GLOBAL_SETTINGS_PATH);
  
  onValue(settingsRef, (snapshot) => {
    if (snapshot.exists()) {
      console.log('🔄 Settings updated from Firebase');
      callback(snapshot.val() as AppSettings);
    } else {
      callback(null);
    }
  });

  // Return unsubscribe function
  return () => {
    off(settingsRef);
  };
};

/**
 * Save settings to local storage (personal override)
 */
export const saveLocalSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem('pricing-settings-personal', JSON.stringify(settings));
    console.log('✅ Personal settings saved locally');
  } catch (error) {
    console.error('❌ Error saving personal settings:', error);
  }
};

/**
 * Load settings from local storage
 */
export const loadLocalSettings = (): AppSettings | null => {
  try {
    const stored = localStorage.getItem('pricing-settings-personal');
    if (stored) {
      console.log('✅ Personal settings loaded from local storage');
      return JSON.parse(stored) as AppSettings;
    }
    return null;
  } catch (error) {
    console.error('❌ Error loading personal settings:', error);
    return null;
  }
};

/**
 * Clear personal settings (revert to global)
 */
export const clearLocalSettings = (): void => {
  try {
    localStorage.removeItem('pricing-settings-personal');
    console.log('✅ Personal settings cleared');
  } catch (error) {
    console.error('❌ Error clearing personal settings:', error);
  }
};

/**
 * Check if using personal settings
 */
export const hasLocalSettings = (): boolean => {
  return localStorage.getItem('pricing-settings-personal') !== null;
};

