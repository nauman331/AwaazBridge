import express from 'express';
import { enhancedTranslate } from '../config/openAI';

const router = express.Router();

router.post('/translate', async (req, res) => {
    try {
        const { text, fromLang, toLang } = req.body;

        if (!text || !fromLang || !toLang) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: text, fromLang, toLang'
            });
        }

        console.log('🌐 Direct translation request:', {
            text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
            fromLang,
            toLang
        });

        const translatedText = await enhancedTranslate(fromLang, toLang, text);

        res.json({
            success: true,
            original: text,
            translated: translatedText,
            fromLang,
            toLang,
            timestamp: new Date()
        });

    } catch (error) {
        console.error('❌ Direct translation error:', error);
        res.status(500).json({
            success: false,
            message: 'Translation failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;
