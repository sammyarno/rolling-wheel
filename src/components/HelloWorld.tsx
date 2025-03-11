import React from 'react';

interface HelloWorldProps {
  name?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name = 'World' }) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-700">Hello, {name}!</h1>
      <p className="mt-2 text-gray-600">Welcome to the Rolling Wheel component library.</p>
    </div>
  );
};

export default HelloWorld;