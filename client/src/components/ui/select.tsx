import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

export interface SelectOption {
    value: string;
    label: string;
    flag?: string;
}

interface SelectProps {
    value?: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
    value,
    onValueChange,
    options,
    placeholder = "Select an option",
    className,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState<SelectOption | null>(
        options.find(option => option.value === value) || null
    );

    const handleSelect = (option: SelectOption) => {
        setSelectedOption(option);
        onValueChange(option.value);
        setIsOpen(false);
    };

    React.useEffect(() => {
        const foundOption = options.find(option => option.value === value);
        setSelectedOption(foundOption || null);
    }, [value, options]);

    return (
        <div className={cn("relative", className)}>
            <Button
                type="button"
                variant="outline"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={cn(
                    "w-full justify-between",
                    !selectedOption && "text-muted-foreground"
                )}
            >
                <span className="flex items-center gap-2">
                    {selectedOption?.flag && (
                        <span className="text-lg">{selectedOption.flag}</span>
                    )}
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "rotate-180"
                )} />
            </Button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover p-1 shadow-md">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className={cn(
                                    "flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground",
                                    selectedOption?.value === option.value && "bg-accent text-accent-foreground"
                                )}
                            >
                                {option.flag && (
                                    <span className="text-lg">{option.flag}</span>
                                )}
                                <span className="flex-1">{option.label}</span>
                                {selectedOption?.value === option.value && (
                                    <Check className="h-4 w-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export { Select };