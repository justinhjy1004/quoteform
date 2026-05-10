import React, { useState } from 'react';
import { defaultValues } from '../Default';

async function hashString(message) {
  // Encode the string into bytes
  const msgUint8 = new TextEncoder().encode(message);                           
  // Hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           
  // Convert buffer to byte array
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     
  // Convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
  return hashHex;
}

const PasswordModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = await hashString(password);    

    if (hashedPassword === defaultValues.password_hash) {
      setError(false);
      setPassword('');
      onConfirm();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Security Check</h2>
          <button 
            onClick={() => { setPassword(''); setError(false); onClose(); }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">Please enter the passkey to generate the quotation.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              autoFocus
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter passkey"
              className={`w-full p-4 border rounded-lg outline-none transition-all ${
                error ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-2 font-medium">Incorrect passkey. Please try again.</p>}
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setPassword(''); setError(false); onClose(); }}
              className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 shadow-md hover:shadow-emerald-200/50 transition-all"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
