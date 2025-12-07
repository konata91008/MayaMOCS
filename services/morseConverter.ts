
import { CHAR_TO_MORSE, MORSE_TO_CHAR } from '../constants/morseTable';

/**
 * Converts English text to Morse code.
 * Letters are separated by spaces, words by " / ".
 */
export const textToMorse = (text: string): string => {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char === ' ') return '/'; // Word separator
      return CHAR_TO_MORSE[char] || ''; // Unknown chars are ignored or empty
    })
    .filter(code => code !== '') // Remove empty results from unknown chars
    .join(' ');
};

/**
 * Converts Morse code back to English text.
 */
export const morseToText = (morse: string): string => {
  if (!morse) return '';
  
  // Normalize: split by "/" (word) or triple spaces
  // Then split by single spaces (char)
  
  // First, replace common visual word separators with a standard token
  const standardizedMorse = morse.trim().replace(/ {3,}/g, ' / ');
  
  const words = standardizedMorse.split('/').map(w => w.trim()).filter(w => w);
  
  return words.map(word => {
    const chars = word.split(/\s+/);
    return chars.map(c => MORSE_TO_CHAR[c] || '?').join('');
  }).join(' ');
};
