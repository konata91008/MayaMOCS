
import React from 'react';
import Loader from './Loader';
import CopyButton from './CopyButton';
import { useLanguage } from '../contexts/LanguageContext';

interface LabeledTextareaProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  isMorse?: boolean;
  isLoading?: boolean;
  onClear?: () => void;
}

const LabeledTextarea: React.FC<LabeledTextareaProps> = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  readOnly = false,
  isMorse = false,
  isLoading = false,
  onClear,
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative group/input">
      <div className="flex justify-between items-end mb-2 px-1">
         <label htmlFor={id} className="block text-xs font-bold text-brand-light/80 tracking-wide uppercase">
            {label}
         </label>
         {onClear && value && !readOnly && (
            <button
              onClick={onClear}
              className="text-xs text-brand-light/60 hover:text-brand-highlight transition-colors tracking-wider"
            >
              {t.clear}
            </button>
         )}
      </div>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full h-32 p-4 rounded-xl bg-black/20 border ${readOnly ? 'border-white/5' : 'border-white/10 focus:border-brand-highlight/50 focus:bg-black/30'} text-brand-text placeholder-brand-light/30 transition-all duration-300 resize-y outline-none focus:ring-0 ${isMorse ? 'font-mono text-lg tracking-widest leading-loose' : 'font-sans'}`}
          style={{ minHeight: '8rem' }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-brand-primary/10 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
            <Loader />
          </div>
        )}
        {readOnly && value && <CopyButton textToCopy={value} />}
      </div>
    </div>
  );
};

export default LabeledTextarea;
