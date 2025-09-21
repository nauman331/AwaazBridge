import React from 'react';
import { Select } from './select';
import type { SelectOption } from './select';

export const languageOptions: SelectOption[] = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ur', label: 'Urdu', flag: '🇵🇰' },
    { value: 'ar', label: 'Arabic', flag: '🇸🇦' },
    { value: 'hi', label: 'Hindi', flag: '🇮🇳' },
    { value: 'es', label: 'Spanish', flag: '🇪🇸' },
    { value: 'fr', label: 'French', flag: '🇫🇷' },
    { value: 'de', label: 'German', flag: '🇩🇪' },
    { value: 'zh', label: 'Chinese', flag: '🇨🇳' },
    { value: 'ja', label: 'Japanese', flag: '🇯🇵' },
    { value: 'ko', label: 'Korean', flag: '🇰🇷' },
    { value: 'ru', label: 'Russian', flag: '🇷🇺' },
    { value: 'pt', label: 'Portuguese', flag: '🇧🇷' },
    { value: 'it', label: 'Italian', flag: '🇮🇹' },
    { value: 'tr', label: 'Turkish', flag: '🇹🇷' },
    { value: 'nl', label: 'Dutch', flag: '🇳🇱' },
];

interface LanguageSelectorProps {
    value: string;
    onValueChange: (value: string) => void;
    label: string;
    className?: string;
    disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    value,
    onValueChange,
    label,
    className,
    disabled = false
}) => {
    return (
        <div className={className}>
            <label className="block text-sm font-medium mb-2">
                {label}
            </label>
            <Select
                value={value}
                onValueChange={onValueChange}
                options={languageOptions}
                placeholder="Select language"
                disabled={disabled}
            />
        </div>
    );
};

export { LanguageSelector };