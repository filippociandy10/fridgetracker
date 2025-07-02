'use client';

export default function SettingToggle({ 
  id, 
  name, 
  label, 
  checked, 
  onChange, 
  disabled = false 
}) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
      <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`block w-12 h-6 rounded-full ${checked ? 'bg-blue-500' : 'bg-gray-300'} ${disabled ? 'opacity-50' : ''}`}></div>
        <div
          className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform duration-200 ease-in bg-white ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </div>
  );
}