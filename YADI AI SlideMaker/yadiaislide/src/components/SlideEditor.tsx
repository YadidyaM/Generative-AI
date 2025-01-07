import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Layout, Image, Type, Send, Loader2 } from 'lucide-react';
import { generateSlideContent } from '../lib/api';

interface Slide {
  title: string;
  text: string;
  bulletPoints: string[];
  imageUrl: string;
}

const SlideEditor = forwardRef((props, ref) => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Expose getSlides method to parent via ref
  useImperativeHandle(ref, () => ({
    getSlides: () => slides,
  }));

  const generateSlide = async () => {
    if (!currentText.trim() || !currentTitle.trim()) return;

    try {
      setIsLoading(true);
      const newSlide = await generateSlideContent(currentText); // Modify API to include bullet points
      setSlides([
        ...slides,
        {
          title: currentTitle,
          text: newSlide.text,
          bulletPoints: newSlide.bulletPoints || [],
          imageUrl: newSlide.imageUrl,
        },
      ]);
      setCurrentText('');
      setCurrentTitle('');
    } catch (error) {
      console.error('Error generating slide:', error);
      alert('Failed to generate slide. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
        {/* Input Section */}
        <div className="mb-6">
          {/* Title Input */}
          <div className="flex items-center space-x-2 mb-2">
            <Type className="text-purple-500" />
            <label className="text-white">Slide Title</label>
          </div>
          <input
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            className="w-full bg-black/50 text-white rounded-lg p-3 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            placeholder="Enter slide title..."
            disabled={isLoading}
          />

          {/* Content Input */}
          <div className="flex items-center space-x-2 mb-2">
            <Layout className="text-purple-500" />
            <label className="text-white">Slide Content</label>
          </div>
          <textarea
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            className="w-full h-32 bg-black/50 text-white rounded-lg p-3 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your slide content..."
            disabled={isLoading}
          />

          {/* Generate Button */}
          <button
            onClick={generateSlide}
            disabled={isLoading || !currentText.trim() || !currentTitle.trim()}
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Generating...' : 'Generate Slide'}</span>
          </button>
        </div>

        {/* Display Generated Slides */}
        <div className="space-y-6">
          {slides.map((slide, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-4">
              {/* Title */}
              <h2 className="text-white text-2xl font-bold mb-4 text-center">
                {slide.title}
              </h2>

              {/* Background Image */}
              <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                <img
                  src={slide.imageUrl}
                  alt="Slide background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                  <p className="text-white text-xl font-semibold text-center">
                    {slide.text}
                  </p>
                </div>
              </div>

              {/* Bullet Points */}
              {slide.bulletPoints && slide.bulletPoints.length > 0 && (
                <ul className="list-disc pl-6 space-y-2 text-white">
                  {slide.bulletPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SlideEditor;
