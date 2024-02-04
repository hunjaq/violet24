import { useState } from 'react';
import axios from 'axios';

export default function useGPTAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendTextToGPTAPI = async (userText, MongoDBText) => {
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
              content: `You are an interviewer asking basic behavioral questions 
              from a curated list. The person you are interviewing is using
              your feedback to improve at the interviewing process. Your job
              is to provide useful critiques and criticism to the user in the
              following format: What's Good, followed by a small list (3 maximum)
              of what was good about the user's response, and Areas for Improvement
              followed by a small ist (3 maximum) of what the user could improve 
              in their response. Always include both what's good and area for improvement.` + MongoDBText
            },
            {
              role: 'user',
              content: userText
            }
          ],
          max_tokens: 1000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '

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
