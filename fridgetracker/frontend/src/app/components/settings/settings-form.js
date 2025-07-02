'use client';
import { useState, useEffect } from 'react';
import { settingsAPI } from '@/app/lib/api';

export default function SettingsForm() {
  // Initialize with defined values for all fields to avoid uncontrolled to controlled warnings
  const [settings, setSettings] = useState({
    notificationEnabled: false, // Start with a defined boolean value
    notificationDays: 3,
    defaultView: 'list',
    defaultSortBy: 'expiryDate',
    theme: 'light',
    language: 'en',
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await settingsAPI.get();
        // Ensure all boolean values are explicitly set to prevent uncontrolled/controlled issues
        setSettings({
          ...data,
          notificationEnabled: !!data.notificationEnabled,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading settings:', error);
        setError('Failed to load settings. Using defaults.');
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For checkbox inputs, ensure we explicitly set boolean values
    const newValue = type === 'checkbox' ? Boolean(checked) : 
                    type === 'number' ? parseInt(value, 10) : value;
    
    console.log(`Changing ${name} to:`, newValue, `(type: ${typeof newValue})`);
    
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      await settingsAPI.update(settings);
      setSuccessMessage('Settings saved successfully!');
      setSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-10 bg-slate-200 rounded w-full mb-4"></div>
      <div className="h-32 bg-slate-200 rounded"></div>
    </div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-4 border-b pb-2">Notification Settings</h2>
            
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="notificationEnabled"
                name="notificationEnabled"
                checked={settings.notificationEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500 mr-2"
              />
              <label htmlFor="notificationEnabled" className="text-sm font-medium text-gray-700">
                Enable expiration notifications
              </label>
            </div>
            
            <div className="mb-4">
              <label htmlFor="notificationDays" className="block text-sm font-medium text-gray-700 mb-1">
                Notify me when items are expiring within
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  id="notificationDays"
                  name="notificationDays"
                  value={settings.notificationDays}
                  onChange={handleChange}
                  min="1"
                  max="30"
                  className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 mr-2"
                  disabled={!settings.notificationEnabled}
                />
                <span className="text-gray-700">days</span>
              </div>
            </div>
            
            <h2 className="text-lg font-medium mb-4 mt-6 border-b pb-2">Display Settings</h2>
            
            <div className="mb-4">
              <label htmlFor="defaultView" className="block text-sm font-medium text-gray-700 mb-1">
                Default View
              </label>
              <select
                id="defaultView"
                name="defaultView"
                value={settings.defaultView}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="list">List View</option>
                <option value="grid">Grid View</option>
                <option value="calendar">Calendar View</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="defaultSortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Default Sort Order
              </label>
              <select
                id="defaultSortBy"
                name="defaultSortBy"
                value={settings.defaultSortBy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="expiryDate">Expiration Date</option>
                <option value="dateAdded">Date Added</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4 border-b pb-2">Appearance</h2>
            
            <div className="mb-4">
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">Use System Preference</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ja">Japanese</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            
            <h2 className="text-lg font-medium mb-4 mt-6 border-b pb-2">Data Management</h2>
            
            <div className="mt-6 space-y-3">
              <button 
                type="button" 
                className="px-4 py-2 bg-yellow-500 text-white rounded font-medium hover:bg-yellow-600 w-full"
                onClick={() => {
                  if (confirm('Are you sure you want to export your data? This will download all your fridge items and categories.')) {
                    // Implement export logic here
                    alert('Export feature coming soon!');
                  }
                }}
              >
                Export Data
              </button>
              
              <button 
                type="button" 
                className="px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600 w-full"
                onClick={() => {
                  if (confirm('WARNING: This will delete all your data. This action cannot be undone. Are you sure?')) {
                    // Implement clear data logic here
                    alert('Clear data feature coming soon!');
                  }
                }}
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}