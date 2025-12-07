
import React, { useState, useEffect, useCallback } from 'react';
import { translateToEnglish, translateToTargetLanguage } from './services/geminiService';
import { textToMorse, morseToText } from './services/morseConverter';
import Header from './components/Header';
import LabeledTextarea from './components/LabeledTextarea';
import DecoderSection from './components/DecoderSection';
import { useLanguage, Language } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t, language } = useLanguage();

  // Encoder States
  const [inputText, setInputText] = useState<string>('你好 世界');
  const [englishText, setEnglishText] = useState<string>('');
  const [morseCode, setMorseCode] = useState<string>('');
  
  // Decoder States
  const [decodeInput, setDecodeInput] = useState<string>('');
  const [decodedEnglish, setDecodedEnglish] = useState<string>('');
  const [decodedChinese, setDecodedChinese] = useState<string>('');
  
  // UI States
  const [isEncoding, setIsEncoding] = useState<boolean>(false);
  const [isDecoding, setIsDecoding] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Map language codes to natural language names for the AI prompt
  const TARGET_LANGUAGES: Record<Language, string> = {
    'zh-TW': 'Traditional Chinese (Taiwan)',
    'en': 'English',
    'ja': 'Japanese',
    'ko': 'Korean'
  };

  const debounce = <F extends (...args: any[]) => any,>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
      return new Promise((resolve) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(async () => {
          const result = await func(...args);
          resolve(result);
        }, delay);
      });
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedProcessInput = useCallback(
    debounce(async (text: string) => {
      if (!text.trim()) {
        setEnglishText('');
        setMorseCode('');
        setIsEncoding(false);
        return;
      }
      setIsEncoding(true);
      setError(null);
      try {
        // Step 1: Translate to English (Gemini)
        const translated = await translateToEnglish(text);
        setEnglishText(translated);
        
        // Step 2: Convert English to Morse (Local)
        const morse = textToMorse(translated);
        setMorseCode(morse);
      } catch (e) {
        setError('errorTranslate'); 
        console.error(e);
      } finally {
        setIsEncoding(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedProcessInput(inputText);
  }, [inputText, debouncedProcessInput]);

  const handleDecode = async () => {
    if (!decodeInput.trim()) {
      setDecodedEnglish('');
      setDecodedChinese('');
      return;
    }
    setIsDecoding(true);
    setError(null);
    setDecodedEnglish('');
    setDecodedChinese('');
    
    try {
      // Step 1: Morse to English (Local)
      const english = morseToText(decodeInput);
      setDecodedEnglish(english);

      // Step 2: English to Target Language (Gemini)
      // If target is English, we don't need to translate again, but let's consistency use the AI for phrasing or just copy.
      // Optimally: If target is English, we might just display the parsed English or ask AI to polish it.
      // But for simplicity and consistency with the request, we will ask AI to translate/polish.
      
      if (english.trim()) {
         const targetLangName = TARGET_LANGUAGES[language];
         const translated = await translateToTargetLanguage(english, targetLangName);
         setDecodedChinese(translated);
      } else {
         setError('errorEmpty');
      }
    } catch (e) {
      setError('errorDecode');
      console.error(e);
    } finally {
      setIsDecoding(false);
    }
  };

  const clearInput = () => {
    setInputText('');
    setEnglishText('');
    setMorseCode('');
  };

  // Helper to get error message text
  const getErrorMessage = (errKey: string | null) => {
      if (!errKey) return null;
      if (errKey === 'errorTranslate') return t.errorTranslate;
      if (errKey === 'errorDecode') return t.errorDecode;
      if (errKey === 'errorEmpty') return t.errorEmpty;
      return errKey; // Fallback for raw strings
  };

  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-brand-text selection:bg-brand-highlight selection:text-brand-primary">
      <div className="max-w-7xl mx-auto pb-10">
        <Header />
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl relative mb-8 backdrop-blur-md shadow-lg" role="alert">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <span className="font-medium tracking-wide">{getErrorMessage(error)}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Encoder Column */}
          <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300 space-y-8 group">
             <div className="flex items-center space-x-3 mb-4 border-b border-white/10 pb-4">
                <div className="h-2 w-2 bg-brand-highlight rounded-full shadow-[0_0_8px_rgba(0,255,209,0.8)]"></div>
                <h2 className="text-lg font-bold text-white tracking-widest uppercase">{t.modeEncode}</h2>
             </div>

            <LabeledTextarea
              id="input-text"
              label={t.inputLabel}
              placeholder={t.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onClear={clearInput}
              isLoading={isEncoding && !englishText}
            />
            
            <LabeledTextarea
              id="english-text"
              label={t.englishLabel}
              placeholder={t.englishPlaceholder}
              value={englishText}
              readOnly
              isLoading={isEncoding && !englishText}
            />

            <LabeledTextarea
              id="morse-code"
              label={t.morseLabel}
              placeholder={t.morsePlaceholder}
              value={morseCode}
              readOnly
              isMorse
              isLoading={isEncoding && !morseCode}
            />
          </div>

          {/* Decoder Column */}
          <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
             <DecoderSection
               decodeInput={decodeInput}
               setDecodeInput={setDecodeInput}
               handleDecode={handleDecode}
               englishOutput={decodedEnglish}
               chineseOutput={decodedChinese}
               isLoading={isDecoding}
             />
          </div>
        </div>

        {/* Model Indicator Footer */}
        <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/5 text-xs text-brand-light/60 tracking-wider">
                <svg className="w-3 h-3 text-brand-highlight" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                <span>{t.modelLabel}: <span className="text-brand-light font-semibold">gemini-2.5-flash</span></span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default App;
