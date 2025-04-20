import { useState } from 'react'

const templates = [
  { id: '1', name: 'Simple Card', thumbnail: '/simple-card.png' },
  { id: '2', name: 'Detailed View', thumbnail: '/detailed-view.png' },
]

function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-card">
      <h2 className="text-lg font-medium mb-4">Select a template</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`
              relative aspect-[3/4] border-2 rounded cursor-pointer transition-all
              ${selectedTemplate === template.id 
                ? 'border-primary' 
                : 'border-border-gray hover:border-gray-400'}
            `}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="w-full h-full flex items-center justify-center">
                {template.id === '1' ? (
                  <div className="w-16 h-24 border border-gray-300 rounded"></div>
                ) : (
                  <div className="w-16 h-24 border border-gray-300 rounded flex flex-col p-1">
                    <div className="w-full h-1/3 bg-gray-200 mb-1 rounded-sm"></div>
                    <div className="w-full h-2/3 bg-gray-100 rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector