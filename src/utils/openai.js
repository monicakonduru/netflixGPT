import OpenAI from 'openai';
import { OPENAI_API_KEY } from './constants';

// Shared OpenAI client used by the GPT search feature.
// `dangerouslyAllowBrowser` is required because this runs client-side; in
// production the key should live behind a backend proxy rather than in the bundle.
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;
