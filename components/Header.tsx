
import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="relative text-center mb-10 md:mb-14">
      <div className="absolute top-0 right-0 z-20">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-white/10 backdrop-blur-md text-brand-text border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-brand-highlight hover:bg-white/20 transition-all cursor-pointer"
        >
          <option value="zh-TW" className="bg-brand-primary">繁體中文</option>
          <option value="en" className="bg-brand-primary">English</option>
          <option value="ja" className="bg-brand-primary">日本語</option>
          <option value="ko" className="bg-brand-primary">한국어</option>
        </select>
      </div>
      
      <div className="pt-10 md:pt-4 mb-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 relative">
          <span className="text-brand-highlight font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,209,0.4)]">
            {t.titleMain}
          </span>
          <span className="text-2xl sm:text-4xl md:text-5xl font-light text-brand-text/90 border-t sm:border-t-0 sm:border-l border-brand-accent/50 pt-2 sm:pt-0 pl-0 sm:pl-4 mt-2 sm:mt-0 flex flex-col sm:flex-row items-center">
            {t.titleSub}
            <span className="text-xs text-brand-light/40 font-mono tracking-widest mt-2 sm:mt-0 sm:ml-3 sm:self-end sm:mb-1">ver1.0</span>
          </span>
        </h1>
      </div>
      
      <p className="text-base md:text-lg text-brand-light/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
        {t.description}
      </p>
    </header>
  );
};

export default Header;
