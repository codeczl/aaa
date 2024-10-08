import React, { useState } from 'react';
import axios from 'axios';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      const encodedApiKey = encodeURIComponent(apiKey);
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: prompt,
          n: 1,
          size: "512x512"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${encodedApiKey}`
          }
        }
      );
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error('生成图像时出错:', error.response ? error.response.data : error.message);
      alert('生成图像时出错,请稍后再试。详细错误信息请查看控制台。');
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="输入图像描述"
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? '生成中...' : '生成图像'}
      </button>
      {imageUrl && <img src={imageUrl} alt="生成的图像" />}
    </div>
  );
}

export default ImageGenerator;