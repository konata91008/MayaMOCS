
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'zh-TW' | 'en' | 'ja' | 'ko';

interface Translations {
  titleMain: string;
  titleSub: string;
  description: string;
  modeEncode: string;
  modeDecode: string;
  inputLabel: string;
  inputPlaceholder: string;
  englishLabel: string;
  englishPlaceholder: string;
  morseLabel: string;
  morsePlaceholder: string;
  decodeInputLabel: string;
  decodeInputPlaceholder: string;
  decodeBtn: string;
  decodeEnglishLabel: string;
  decodeEnglishPlaceholder: string;
  decodeResultLabel: string;
  decodeResultPlaceholder: string;
  clear: string;
  loading: string;
  errorTranslate: string;
  errorDecode: string;
  errorEmpty: string;
  modelLabel: string;
}

const translations: Record<Language, Translations> = {
  'zh-TW': {
    titleMain: 'Maya',
    titleSub: '摩斯轉譯',
    description: '輸入任何語言，Gemini AI 自動翻譯成英文並編碼為摩斯密碼。支援反向解碼：輸入摩斯密碼，自動還原成您的語言。',
    modeEncode: '編碼模式 (任意語言 ➔ 摩斯)',
    modeDecode: '解碼模式 (摩斯 ➔ 翻譯結果)',
    inputLabel: 'STEP 1｜輸入訊息 (自動偵測)',
    inputPlaceholder: '輸入中文、日文、數字...',
    englishLabel: 'STEP 2｜英文中繼翻譯',
    englishPlaceholder: 'AI 將先翻譯成英文...',
    morseLabel: 'STEP 3｜摩斯密碼產出',
    morsePlaceholder: '生成結果...',
    decodeInputLabel: 'STEP 1｜輸入摩斯密碼',
    decodeInputPlaceholder: '例如: .... . .-.. .-.. --- / .-- --- .-. .-.. -..',
    decodeBtn: '開始解碼與翻譯',
    decodeEnglishLabel: 'STEP 2｜還原英文',
    decodeEnglishPlaceholder: '解碼出的英文...',
    decodeResultLabel: 'STEP 3｜翻譯結果',
    decodeResultPlaceholder: '繁體中文翻譯...',
    clear: '清空',
    loading: '處理中...',
    errorTranslate: '翻譯失敗。請檢查網路連線或稍後再試。',
    errorDecode: '無法解碼。請檢查摩斯密碼格式。',
    errorEmpty: '無效的摩斯密碼格式',
    modelLabel: '目前模型',
  },
  'en': {
    titleMain: 'Maya',
    titleSub: 'Morse Translator',
    description: 'Input any language, Gemini AI translates it to English and converts to Morse code. Supports reverse decoding: Morse to your language.',
    modeEncode: 'Encode (Any Language ➔ Morse)',
    modeDecode: 'Decode (Morse ➔ Translation)',
    inputLabel: 'STEP 1｜Input Content',
    inputPlaceholder: 'Type Chinese, Japanese, numbers...',
    englishLabel: 'STEP 2｜Intermediate English',
    englishPlaceholder: 'AI will translate to English first...',
    morseLabel: 'STEP 3｜Final Morse Code',
    morsePlaceholder: 'Result generated here...',
    decodeInputLabel: 'STEP 1｜Input Morse Code',
    decodeInputPlaceholder: 'Ex: .... . .-.. .-.. --- / .-- --- .-. .-.. -..',
    decodeBtn: 'Start Decode & Translate',
    decodeEnglishLabel: 'STEP 2｜Restored English',
    decodeEnglishPlaceholder: 'Parsed English...',
    decodeResultLabel: 'STEP 3｜Translation Result',
    decodeResultPlaceholder: 'Final translation...',
    clear: 'Clear',
    loading: 'Processing...',
    errorTranslate: 'Translation failed. Check connection.',
    errorDecode: 'Decode failed. Check Morse format.',
    errorEmpty: 'Invalid Morse code format',
    modelLabel: 'Current Model',
  },
  'ja': {
    titleMain: 'Maya',
    titleSub: 'モールス翻訳ラボ',
    description: '任意の言語を入力すると、Gemini AI が英語に翻訳し、モールス信号に変換します。逆変換も対応：モールス信号をあなたの言語に復元します。',
    modeEncode: 'エンコード (任意の言語 ➔ モールス)',
    modeDecode: 'デコード (モールス ➔ 翻訳結果)',
    inputLabel: 'STEP 1｜内容を入力',
    inputPlaceholder: '日本語、英語、数字などを入力...',
    englishLabel: 'STEP 2｜中間英語翻訳',
    englishPlaceholder: 'AI が先に英語へ翻訳します...',
    morseLabel: 'STEP 3｜最終モールス信号',
    morsePlaceholder: '結果がここに表示されます...',
    decodeInputLabel: 'STEP 1｜モールス信号を入力',
    decodeInputPlaceholder: '例: .... . .-.. .-.. --- / .-- --- .-. .-.. -..',
    decodeBtn: '翻訳と解析を開始',
    decodeEnglishLabel: 'STEP 2｜復元された英語',
    decodeEnglishPlaceholder: '解析された英語...',
    decodeResultLabel: 'STEP 3｜翻訳結果',
    decodeResultPlaceholder: '日本語への翻訳...',
    clear: 'クリア',
    loading: '処理中...',
    errorTranslate: '翻訳に失敗しました。接続を確認してください。',
    errorDecode: '解析できませんでした。形式を確認してください。',
    errorEmpty: '無効なモールス信号形式です',
    modelLabel: '使用モデル',
  },
  'ko': {
    titleMain: 'Maya',
    titleSub: '모스 번역기',
    description: '모든 언어를 입력하면 Gemini AI가 영어로 번역한 후 모스 부호로 변환합니다. 역방향 해석 지원: 모스 부호를 당신의 언어로 복원.',
    modeEncode: '인코딩 (모든 언어 ➔ 모스 부호)',
    modeDecode: '디코딩 (모스 부호 ➔ 번역 결과)',
    inputLabel: 'STEP 1｜내용 입력',
    inputPlaceholder: '한국어, 중국어, 숫자 입력...',
    englishLabel: 'STEP 2｜중간 영어 번역',
    englishPlaceholder: 'AI가 먼저 영어로 번역합니다...',
    morseLabel: 'STEP 3｜최종 모스 부호',
    morsePlaceholder: '결과가 여기에 표시됩니다...',
    decodeInputLabel: 'STEP 1｜모스 부호 입력',
    decodeInputPlaceholder: '예: .... . .-.. .-.. --- / .-- --- .-. .-.. -..',
    decodeBtn: '번역 및 해석 시작',
    decodeEnglishLabel: 'STEP 2｜복원된 영어',
    decodeEnglishPlaceholder: '분석된 영어...',
    decodeResultLabel: 'STEP 3｜번역 결과',
    decodeResultPlaceholder: '한국어 번역...',
    clear: '지우기',
    loading: '처리 중...',
    errorTranslate: '번역 실패. 네트워크 연결을 확인하세요.',
    errorDecode: '해석할 수 없습니다. 형식을 확인하세요.',
    errorEmpty: '유효하지 않은 모스 부호 형식',
    modelLabel: '현재 모델',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh-TW');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
