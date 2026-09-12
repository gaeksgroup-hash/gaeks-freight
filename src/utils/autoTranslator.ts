// filepath: /src/utils/autoTranslator.ts

const DICT_EN: Record<string, string> = {
  'jasa import': 'import forwarding services',
  'jasa ppjk': 'customs clearance brokerage (PPJK)',
  'lcl murah': 'economical LCL ocean consolidation',
  'project cargo': 'project cargo & heavy lift',
  'alat berat': 'heavy industrial machinery',
  'tanjung priok': 'Tanjung Priok Port, Jakarta',
  'tanjung perak': 'Tanjung Perak Port, Surabaya',
  'tanjung emas': 'Tanjung Emas Port, Semarang',
  'jalur hijau': 'green lane clearance',
  'jalur merah': 'red lane physical inspection',
  'bongkar muat': 'berth stevedoring & cargo handling',
  'pergudangan': 'port transit warehousing',
  'truk kontainer': 'inland container trucking fleet',
  'kargo udara': 'priority air cargo express',
  'baterai lithium': 'lithium battery compliance transport',
  'bebas denda': 'zero penalty compliance'
};

const DICT_ZH: Record<string, string> = {
  'jasa import': '专业进出口物流服务',
  'jasa ppjk': '印尼海关清关与报关代理',
  'lcl murah': '高性价比海运散货拼箱',
  'project cargo': '重大件与特种工程物流',
  'alat berat': '矿山重型设备与工程机械',
  'tanjung priok': '雅加达丹戎不碌港',
  'tanjung perak': '泗水丹戎佩拉港',
  'tanjung emas': '三宝垄丹戎埃玛斯港',
  'jalur hijau': '海关绿色通道放行',
  'jalur merah': '海关红道物理开箱查验',
  'bongkar muat': '码头装卸驳运',
  'pergudangan': '一线保税监管仓储',
  'truk kontainer': '内陆公路集装箱运输',
  'kargo udara': '时效级航空货运快线',
  'baterai lithium': '锂电池合规空运',
  'bebas denda': '零罚款免滞港通关'
};

export async function translateText(text: string, targetLang: 'en' | 'zh'): Promise<string> {
  if (!text || text.trim() === '') return '';

  // 1. Coba penerjemahan online MyMemory API
  try {
    const pair = targetLang === 'en' ? 'id|en' : 'id|zh-CN';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 400))}&langpair=${pair}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (e) {}

  // 2. Fallback Kamus Logistik Cerdas
  let result = text;
  const dict = targetLang === 'en' ? DICT_EN : DICT_ZH;
  for (const [key, val] of Object.entries(dict)) {
    const regex = new RegExp(key, 'gi');
    result = result.replace(regex, val);
  }
  return result;
}
