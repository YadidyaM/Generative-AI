import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DataGeneration from './pages/DataGeneration';
import DataVisualization from './pages/DataVisualization';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<DataGeneration />} />
            <Route path="/visualize" element={<DataVisualization />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;