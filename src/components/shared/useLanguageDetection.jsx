import { useState, useEffect } from 'react';

// Simple i18n system — zero data harvesting, browser language first
const TRANSLATIONS = {
  en: {
    heal: 'HEAL',
    speak: 'TAP TO SPEAK',
    stop: 'TAP TO STOP',
    type: 'type here — voice or text, your choice',
    thinking: 'thinking...',
    listening: 'listening...',
    speaking: 'speaking...',
    goLiveIt: "You've got this. Go live it.",
    willBeHere: "I'll be here when you need me.",
    stayABitLonger: 'stay a bit longer',
    clearData: 'clear my data from this device',
    offline: 'OFFLINE MODE ACTIVE',
    offlineStillWorks: 'These still work ✓',
  },
  es: {
    heal: 'SANAR',
    speak: 'TAP PARA HABLAR',
    stop: 'TAP PARA PARAR',
    type: 'escribe aquí — voz o texto, tu elección',
    thinking: 'pensando...',
    listening: 'escuchando...',
    speaking: 'hablando...',
    goLiveIt: 'Lo tienes. Vive.',
    willBeHere: 'Estaré aquí cuando me necesites.',
    stayABitLonger: 'quédate un poco más',
    clearData: 'borrar mis datos de este dispositivo',
    offline: 'MODO OFFLINE ACTIVO',
    offlineStillWorks: 'Estos todavía funcionan ✓',
  },
  fr: {
    heal: 'GUÉRIR',
    speak: 'APPUYER POUR PARLER',
    stop: 'APPUYER POUR ARRÊTER',
    type: 'écrivez ici — voix ou texte, votre choix',
    thinking: 'réflexion...',
    listening: 'écoute...',
    speaking: 'parlant...',
    goLiveIt: 'Tu peux le faire. Vis-le.',
    willBeHere: 'Je serai là quand tu m\'auras besoin.',
    stayABitLonger: 'reste un peu plus longtemps',
    clearData: 'effacer mes données de cet appareil',
    offline: 'MODE HORS LIGNE ACTIF',
    offlineStillWorks: 'Ceux-ci fonctionnent toujours ✓',
  },
  de: {
    heal: 'HEILEN',
    speak: 'ZUM SPRECHEN TIPPEN',
    stop: 'ZUM STOPPEN TIPPEN',
    type: 'Geben Sie hier ein — Sprache oder Text, Ihre Wahl',
    thinking: 'denken...',
    listening: 'zuhören...',
    speaking: 'sprechend...',
    goLiveIt: 'Du schaffst das. Lebe es.',
    willBeHere: 'Ich bin da, wenn du mich brauchst.',
    stayABitLonger: 'bleib noch ein bisschen',
    clearData: 'meine Daten von diesem Gerät löschen',
    offline: 'OFFLINE-MODUS AKTIV',
    offlineStillWorks: 'Diese funktionieren immer noch ✓',
  },
  ja: {
    heal: '癒す',
    speak: 'タップして話す',
    stop: 'タップして停止',
    type: 'ここに入力してください — 音声またはテキスト、お好みで',
    thinking: '考え中...',
    listening: '聴いています...',
    speaking: '話しています...',
    goLiveIt: 'あなたはこれができます。生きてください。',
    willBeHere: '必要な時はいつでもここにいます。',
    stayABitLonger: 'もう少し留まって',
    clearData: 'このデバイスから私のデータを削除',
    offline: 'オフラインモード有効',
    offlineStillWorks: 'これらはまだ機能します ✓',
  },
  zh: {
    heal: '愈合',
    speak: '点击说话',
    stop: '点击停止',
    type: '在此输入 — 语音或文字，您的选择',
    thinking: '思考中...',
    listening: '正在倾听...',
    speaking: '正在说话...',
    goLiveIt: '你能做到的。去活吧。',
    willBeHere: '当你需要我时，我会在这里。',
    stayABitLonger: '再留一会儿',
    clearData: '从此设备清除我的数据',
    offline: '离线模式激活',
    offlineStillWorks: '这些仍然有效 ✓',
  },
  pt: {
    heal: 'CURAR',
    speak: 'TOQUE PARA FALAR',
    stop: 'TOQUE PARA PARAR',
    type: 'digite aqui — voz ou texto, sua escolha',
    thinking: 'pensando...',
    listening: 'ouvindo...',
    speaking: 'falando...',
    goLiveIt: 'Você consegue. Viva.',
    willBeHere: 'Estarei aqui quando você precisar.',
    stayABitLonger: 'fique um pouco mais',
    clearData: 'limpar meus dados deste dispositivo',
    offline: 'MODO OFFLINE ATIVO',
    offlineStillWorks: 'Estes ainda funcionam ✓',
  },
  ru: {
    heal: 'ИСЦЕЛИТЬ',
    speak: 'НАЖМИТЕ, ЧТОБЫ ГОВОРИТЬ',
    stop: 'НАЖМИТЕ, ЧТОБЫ ОСТАНОВИТЬСЯ',
    type: 'введите здесь — голос или текст, ваш выбор',
    thinking: 'размышление...',
    listening: 'слушаю...',
    speaking: 'говорю...',
    goLiveIt: 'Ты можешь это сделать. Живи.',
    willBeHere: 'Я буду здесь, когда ты меня понадобишься.',
    stayABitLonger: 'останься еще немного',
    clearData: 'очистить мои данные с этого устройства',
    offline: 'РЕЖИМ АВТОНОМНОЙ РАБОТЫ АКТИВЕН',
    offlineStillWorks: 'Они все еще работают ✓',
  },
  ar: {
    heal: 'شفاء',
    speak: 'اضغط للتحدث',
    stop: 'اضغط للإيقاف',
    type: 'اكتب هنا — صوت أو نص، اختيارك',
    thinking: 'التفكير...',
    listening: 'الاستماع...',
    speaking: 'يتحدث...',
    goLiveIt: 'أنت تستطيع. عش.',
    willBeHere: 'سأكون هنا عندما تحتاجني.',
    stayABitLonger: 'ابق قليلاً أطول',
    clearData: 'حذف بيانات الجهاز الخاص بي',
    offline: 'وضع عدم الاتصال نشط',
    offlineStillWorks: 'هذه لا تزال تعمل ✓',
  },
};

export function useLanguageDetection() {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(TRANSLATIONS.en);

  useEffect(() => {
    // Zero harvesting: use browser language preference only
    const browserLang = (navigator.language || 'en').split('-')[0].toLowerCase();
    const supportedLangs = Object.keys(TRANSLATIONS);
    const detected = supportedLangs.includes(browserLang) ? browserLang : 'en';
    
    setLanguage(detected);
    setT(TRANSLATIONS[detected] || TRANSLATIONS.en);
  }, []);

  return { language, t };
}

// Export translations object for advanced usage
export { TRANSLATIONS };