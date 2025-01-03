import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              YADI
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/generate"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              <span>Generate Data</span>
            </Link>
            <Link
              to="/visualize"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Visualize Data</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}