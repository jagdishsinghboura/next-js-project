
// InputBox Component
import React from 'react';

export default function InputBox({ phrase, setPhrase }) {
  return (
    <div>
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for products"
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
      />
    </div>
  );
}
