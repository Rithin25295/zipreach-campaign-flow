
import React from 'react';
import { Star, Users, Download, Eye } from 'lucide-react';

const MarketplaceTileGrid = ({ items, onAddToWorkspace }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                {item.category}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">{item.rating}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <Download className="w-4 h-4" />
                <span className="text-sm">{item.downloads.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">{item.price}</span>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onAddToWorkspace(item)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
                >
                  {item.price === 'Free' ? 'Add to Workspace' : 'Buy Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketplaceTileGrid;
