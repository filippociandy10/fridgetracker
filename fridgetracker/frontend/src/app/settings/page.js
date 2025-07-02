import SettingsForm from '@/app/components/settings/settings-form';

export const metadata = {
  title: 'Settings - FridgeTracker',
};

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <p className="text-gray-600 mb-6">
        Customize your FridgeTracker experience with the settings below.
      </p>
      
      <SettingsForm />
    </div>
  );
}