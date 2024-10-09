import React, { useState } from 'react';
import axios from 'axios';

const ContentGeneration = () => {
  const [attractionName, setAttractionName] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleGenerateContent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate-content', {
        attractionName,
      });

      const parsedContent = JSON.parse(response.data.generatedText);
      setGeneratedContent(parsedContent);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishContent = async () => {
    if (generatedContent) {
      setIsPublishing(true);
      try {
        await axios.post('http://localhost:5000/publish-content', generatedContent);
        console.log('Content published successfully');
      } catch (error) {
        console.error('Error publishing content:', error);
      } finally {
        setIsPublishing(false);
      }
    }
  };

  const handleContentChange = (field, value) => {
    setGeneratedContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  return (
    <div>
      <h2>Content Generation</h2>
      <div>
        <input
          type="text"
          value={attractionName}
          onChange={(e) => setAttractionName(e.target.value)}
          placeholder="Enter attraction name"
        />
        <button onClick={handleGenerateContent} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Content'}
        </button>
      </div>
      {generatedContent && (
        <div>
          <h3>Generated Content</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={generatedContent.name}
              onChange={(e) => handleContentChange('name', e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={generatedContent.description}
              onChange={(e) => handleContentChange('description', e.target.value)}
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="text"
              value={generatedContent.rating}
              onChange={(e) => handleContentChange('rating', e.target.value)}
            />
          </div>
          <button onClick={handlePublishContent} disabled={isPublishing}>
            {isPublishing ? 'Publishing...' : 'Publish Content'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentGeneration;