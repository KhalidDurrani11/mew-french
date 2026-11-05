import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Video Animation endpoint using Gemini Omni Flash (gemini-omni-1.1-flash)
app.post('/api/animate-video', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt, aspectRatio = '16:9' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image base64 data is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: 'GEMINI_API_KEY is not configured in the environment. Please configure your key in AI Studio Secrets.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Clean base64 string if it contains data URI prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const videoPrompt = prompt || 'Artisan Italian dish comes to life with gentle rising steam, sparkling olive oil glaze and soft cinematic amber candlelight.';

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        {
          type: 'image',
          mime_type: mimeType,
          data: cleanBase64,
        },
        {
          type: 'text',
          text: videoPrompt,
        }
      ],
      background: false,
      store: false,
      stream: false,
      response_format: {
        type: 'video',
        aspect_ratio: aspectRatio === '9:16' ? '9:16' : '16:9',
      }
    }, { timeout: 300000 });

    const videoPart = interaction.output_video;
    if (videoPart && videoPart.data) {
      return res.json({
        videoBase64: videoPart.data,
        mimeType: videoPart.mime_type || 'video/mp4',
      });
    }

    // Fallback: check through steps for video output
    for (const step of (interaction.steps || []) as any[]) {
      if (step.type === 'model_output' && Array.isArray(step.content)) {
        const vid = step.content.find((c: any) => c.type === 'video');
        if (vid && (vid as any).data) {
          return res.json({
            videoBase64: (vid as any).data,
            mimeType: (vid as any).mime_type || 'video/mp4',
          });
        }
      }
    }

    return res.status(500).json({
      error: 'The video model did not return video bytes. Please try with another prompt or image.'
    });
  } catch (error: any) {
    console.error('Video generation error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate video with gemini-omni-1.1-flash.'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
