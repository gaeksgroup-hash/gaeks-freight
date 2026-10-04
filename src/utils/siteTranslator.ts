import { Language } from '../types/freight';

const LANGUAGE_STORAGE_KEY = 'gaeks-language';
const TRANSLATE_ELEMENT_ID = 'google_translate_element';
const TRANSLATE_SCRIPT_ID = 'gaeks-google-translate-script';

const googleLanguage: Record<Language, string> = {
  id: 'id',
  en: 'en',
  zh: 'zh-CN'
};

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

let translateReady: Promise<HTMLSelectElement> | null = null;

const findTranslateSelect = () => document.querySelector<HTMLSelectElement>('.goog-te-combo');

const waitForTranslateSelect = (timeout = 12000) => new Promise<HTMLSelectElement>((resolve, reject) => {
  const existing = findTranslateSelect();
  if (existing) {
    resolve(existing);
    return;
  }

  const startedAt = Date.now();
  const timer = window.setInterval(() => {
    const select = findTranslateSelect();
    if (select) {
      window.clearInterval(timer);
      resolve(select);
      return;
    }
    if (Date.now() - startedAt >= timeout) {
      window.clearInterval(timer);
      reject(new Error('Google Translate tidak siap.'));
    }
  }, 100);
});

const mountTranslateElement = () => {
  let mount = document.getElementById(TRANSLATE_ELEMENT_ID);
  if (!mount) {
    mount = document.createElement('div');
    mount.id = TRANSLATE_ELEMENT_ID;
    mount.setAttribute('aria-hidden', 'true');
    document.body.appendChild(mount);
  }
};

const initialiseTranslateElement = () => {
  mountTranslateElement();
  if (findTranslateSelect()) return;

  const TranslateElement = window.google?.translate?.TranslateElement;
  if (TranslateElement) {
    new TranslateElement({
      pageLanguage: 'id',
      includedLanguages: 'id,en,zh-CN',
      autoDisplay: false
    }, TRANSLATE_ELEMENT_ID);
  }
};

export const loadTranslationEngine = (): Promise<HTMLSelectElement> => {
  const existing = findTranslateSelect();
  if (existing) return Promise.resolve(existing);
  if (translateReady) return translateReady;

  translateReady = new Promise<HTMLSelectElement>((resolve, reject) => {
    mountTranslateElement();

    const finish = () => {
      initialiseTranslateElement();
      waitForTranslateSelect().then(resolve).catch(reject);
    };

    window.googleTranslateElementInit = finish;

    if (window.google?.translate?.TranslateElement) {
      finish();
      return;
    }

    const existingScript = document.getElementById(TRANSLATE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', finish, { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Google Translate gagal dimuat.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TRANSLATE_SCRIPT_ID;
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Google Translate gagal dimuat.'));
    document.head.appendChild(script);
  }).catch((error) => {
    translateReady = null;
    throw error;
  });

  return translateReady;
};

const readLanguageCookie = (): Language | null => {
  const cookie = document.cookie.split('; ').find((item) => item.startsWith('googtrans='));
  const target = cookie?.split('/').pop();
  if (target === 'en') return 'en';
  if (target === 'zh-CN' || target === 'zh') return 'zh';
  if (target === 'id') return 'id';
  return null;
};

export const getPreferredLanguage = (): Language => {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'id' || stored === 'en' || stored === 'zh') return stored;
  } catch {
    // Storage can be unavailable in strict privacy modes; the language cookie remains usable.
  }
  return readLanguageCookie() || 'id';
};

const persistLanguage = (language: Language) => {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The live selection still works when persistent storage is unavailable.
  }

  const target = googleLanguage[language];
  document.cookie = `googtrans=/id/${target}; path=/; max-age=31536000; SameSite=Lax`;
  if (window.location.hostname.includes('.')) {
    document.cookie = `googtrans=/id/${target}; path=/; domain=${window.location.hostname}; max-age=31536000; SameSite=Lax`;
  }
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
};

export const applySiteLanguage = async (language: Language): Promise<boolean> => {
  persistLanguage(language);

  try {
    const select = await loadTranslationEngine();
    const target = googleLanguage[language];
    const optionExists = Array.from(select.options).some((option) => option.value === target);
    select.value = optionExists ? target : language === 'id' ? '' : target;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  } catch {
    return false;
  }
};

export const preloadTranslationEngine = () => {
  void loadTranslationEngine().catch(() => undefined);
};
