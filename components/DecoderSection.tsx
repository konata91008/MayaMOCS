
import React from 'react';
import Loader from './Loader';
import LabeledTextarea from './LabeledTextarea';
import { useLanguage } from '../contexts/LanguageContext';

interface DecoderSectionProps {
  decodeInput: string;
  setDecodeInput: (value: string) => void;
  handleDecode: () => void;
  englishOutput: string;
  chineseOutput: string;
  isLoading: boolean;
}

const DecoderSection: React.FC<DecoderSectionProps> = ({
  decodeInput,
  setDecodeInput,
  handleDecode,
  englishOutput,
  chineseOutput,
  isLoading,
}) => {
  const { t } = useLanguage();
    
  const clearInput = () => {
    setDecodeInput('');
  }

  return (
    <div className="flex flex-col h-full space-y-8">
        <div className="flex items-center space-x-3 mb-4 border-b border-white/10 pb-4">
          <div className="h-2 w-2 bg-brand-highlight rounded-full shadow-[0_0_8px_rgba(0,255,209,0.8)]"></div>
          <h2 className="text-lg font-bold text-white tracking-widest uppercase">{t.modeDecode}</h2>
        </div>
        
        <LabeledTextarea
          id="decode-input"
          label={t.decodeInputLabel}
          placeholder={t.decodeInputPlaceholder}
          value={decodeInput}
          onChange={(e) => setDecodeInput(e.target.value)}
          isMorse
          onClear={clearInput}
        />
        
        <button
          onClick={handleDecode}
          disabled={isLoading || !decodeInput}
          className="w-full bg-brand-highlight text-brand-primary font-bold py-4 px-6 rounded-xl hover:bg-[#00e6bc] hover:shadow-[0_0_20px_rgba(0,255,209,0.4)] transition-all duration-300 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center transform active:scale-[0.99] tracking-widest uppercase text-sm shadow-lg shadow-brand-highlight/10"
        >
          {isLoading ? <Loader /> : t.decodeBtn}
        </button>
        
        <div className="grid grid-cols-1 gap-8 mt-4">
           <LabeledTextarea
            id="decode-english"
            label={t.decodeEnglishLabel}
            placeholder={t.decodeEnglishPlaceholder}
            value={englishOutput}
            readOnly
            isLoading={isLoading && !englishOutput && !!chineseOutput} 
          />
          <LabeledTextarea
            id="decode-chinese"
            label={t.decodeResultLabel}
            placeholder={t.decodeResultPlaceholder}
            value={chineseOutput}
            readOnly
            isLoading={isLoading && !chineseOutput}
          />
        </div>
    </div>
  );
};

export default DecoderSection;
