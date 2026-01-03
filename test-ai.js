const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = 'AIzaSyAi4_IwQcI_LOZQBlvFKJBftjmqnRHTLSE';
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent('Dame 3 animales con 3 pistas cada uno en formato JSON: [{"word": "nombre", "hints": ["pista1", "pista2", "pista3"]}]');
    const response = result.response;
    console.log(response.text());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
