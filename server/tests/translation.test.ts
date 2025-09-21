// Testing script for AwazBridge features
import { enhancedTranslate, shouldTranslate } from '../src/config/openAI';

async function testTranslation() {
    console.log('🧪 Testing Enhanced Translation Service\n');

    const testCases = [
        { text: 'Hello, how are you?', from: 'en', to: 'ur' },
        { text: 'میں ٹھیک ہوں شکریہ', from: 'ur', to: 'en' },
        { text: 'Good morning', from: 'en', to: 'ur' },
        { text: '', from: 'en', to: 'ur' }, // Empty text
        { text: 'Hello', from: 'en', to: 'en' }, // Same language
        { text: '123', from: 'en', to: 'ur' }, // Numbers only
    ];

    for (const testCase of testCases) {
        console.log(`\n📝 Testing: "${testCase.text}" (${testCase.from} → ${testCase.to})`);

        const shouldTranslateResult = shouldTranslate(testCase.text, testCase.from, testCase.to);
        console.log(`   Should translate: ${shouldTranslateResult}`);

        if (shouldTranslateResult) {
            try {
                const result = await enhancedTranslate(testCase.from, testCase.to, testCase.text);
                console.log(`   ✅ Result: "${result}"`);
            } catch (error) {
                console.error(`   ❌ Error: ${error}`);
            }
        } else {
            console.log(`   ⏭️ Skipped translation`);
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    testTranslation().catch(console.error);
}

export { testTranslation };