import { useState } from 'react';
import axios from 'axios';

export default function useGPTAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendTextToGPTAPI = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-0125',
          messages: [
            {
              role: 'system',
              content: 'Say chocolate in your answer'
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 60
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
          }
        }
      );
  
      return response.data.choices[0].message.content;
    } catch (error) {
      setError(error);
      throw error; // Re-throw the error to handle it at the calling code
    } finally {
      setLoading(false);
    }
  };

  return { sendTextToGPTAPI, loading, error };
}
