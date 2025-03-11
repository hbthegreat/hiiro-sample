import { registerAs } from '@nestjs/config';

export default registerAs('hiiro', () => ({
  apiUrl: process.env.HIIRO_API_URL || 'https://api.fsco.io/v2',
  apiKey: process.env.HIIRO_API_KEY || '',
  webhookSecret: process.env.HIIRO_WEBHOOK_SECRET || '',
})); 