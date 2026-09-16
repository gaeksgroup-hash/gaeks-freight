import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen, CheckCircle2, Mail, Send, ShieldCheck, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { addSubscriber, getStoredArticles } from '../utils/newsStorage';
import { ArticleItem, Language } from '../types/freight';
import { sectionReveal, viewportOnce } from '../utils/motionVariants';

interface HomeEditorialProps {
  currentLang?: Language;
  onNavigate: (page: string) => void;
  onSelectArticle: (articleId: string) => void;
}

const COPY = {
  id: {
    processEyebrow: 'Cara kerja GAEKS',
    processTitle: 'Dari dokumen pertama sampai cargo tiba dengan alur yang jelas.',
    processDescription: 'Satu tim operasional untuk mengurangi jeda koordinasi antara shipper, carrier, customs, dan delivery lokal.',
    process: [
      ['01', 'Pahami kebutuhan', 'Kami petakan komoditas, volume, Incoterms, origin, dan tujuan sebelum memilih moda.'],
      ['02', 'Siapkan kepatuhan', 'Dokumen, HS code, Lartas, dan kebutuhan PPJK ditinjau sebelum pengapalan.'],
      ['03', 'Atur pergerakan', 'Booking, konsolidasi, trucking, dan update milestone dikelola dalam satu alur.'],
      ['04', 'Serah terima', 'Cargo tiba di tujuan dengan status, dokumen, dan next action yang mudah dilacak.']
    ],
    insightEyebrow: 'Logistics intelligence',
    insightTitle: 'Insight yang membantu keputusan procurement.',
    insightDescription: 'Baca ringkasan regulasi, rute, dan risiko operasional sebelum membuat keputusan pengiriman.',
    readMore: 'Baca semua insight',
    newsletterEyebrow: 'Briefing operasional',
    newsletterTitle: 'Dapatkan ringkasan regulasi dan pergerakan freight.',
    newsletterDescription: 'Satu email ringkas berisi perubahan kepabeanan, rute, dan catatan operasional yang relevan untuk bisnis Anda.',
    emailPlaceholder: 'email perusahaan Anda',
    subscribe: 'Daftar briefing',
    subscribed: 'Email tercatat',
    consult: 'Mulai konsultasi'
  },
  en: {
    processEyebrow: 'How GAEKS works',
    processTitle: 'From the first document to delivery, with a clear operating path.',
    processDescription: 'One operational team connecting shipper, carrier, customs, and local delivery.',
    process: [
      ['01', 'Understand the brief', 'We map commodity, volume, Incoterms, origin, and destination before choosing a mode.'],
      ['02', 'Prepare compliance', 'Documents, HS codes, restrictions, and customs needs are reviewed before sailing.'],
      ['03', 'Move the cargo', 'Booking, consolidation, trucking, and milestones stay in one operating flow.'],
      ['04', 'Close the handover', 'Cargo arrives with status, documents, and next actions easy to follow.']
    ],
    insightEyebrow: 'Logistics intelligence',
    insightTitle: 'Insight for better procurement decisions.',
    insightDescription: 'Read concise notes on regulation, routes, and operating risks before you ship.',
    readMore: 'Read all insights',
    newsletterEyebrow: 'Operational briefing',
    newsletterTitle: 'Get concise freight and customs updates.',
    newsletterDescription: 'One useful email with regulatory changes, route movements, and practical operating notes.',
    emailPlaceholder: 'your company email',
    subscribe: 'Join the briefing',
    subscribed: 'Email recorded',
    consult: 'Start a consultation'
  },
  zh: {
    processEyebrow: 'GAEKS 服务流程',
    processTitle: '从单据到交付，每一步都有清晰的执行路径。',
    processDescription: '由一个运营团队连接货主、船东、海关与本地派送。',
    process: [
      ['01', '了解需求', '确认货物、体积、贸易条款、起运地与目的地。'],
      ['02', '准备合规', '装运前审核单据、HS 编码、进口限制与报关要求。'],
      ['03', '安排运输', '订舱、拼箱、卡车与节点更新统一管理。'],
      ['04', '完成交付', '交付状态、单据与下一步行动清晰可追踪。']
    ],
    insightEyebrow: '物流情报',
    insightTitle: '帮助采购团队做出更好的物流决策。',
    insightDescription: '阅读法规、航线与运营风险的实用摘要。',
    readMore: '查看全部资讯',
    newsletterEyebrow: '运营简报',
    newsletterTitle: '获取海关法规与货运动态摘要。',
    newsletterDescription: '每封邮件提供与企业物流相关的法规、航线与运营重点。',
    emailPlaceholder: '企业邮箱',
    subscribe: '订阅简报',
    subscribed: '邮箱已记录',
    consult: '开始咨询'
  }
} as const;

const getLocalizedArticle = (article: ArticleItem, language: Language) => ({
  title: language === 'en' ? article.title_en || article.title : language === 'zh' ? article.title_zh || article.title : article.title,
  excerpt: language === 'en' ? article.excerpt_en || article.excerpt : language === 'zh' ? article.excerpt_zh || article.excerpt : article.excerpt,
  category: language === 'en' ? article.category_en || article.category : language === 'zh' ? article.category_zh || article.category : article.category
});

export const HomeEditorial: React.FC<HomeEditorialProps> = ({ currentLang = 'id', onNavigate, onSelectArticle }) => {
  const copy = COPY[currentLang];
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const articles = getStoredArticles()
    .sort((first, second) => new Date(second.publishedDate).getTime() - new Date(first.publishedDate).getTime())
    .slice(0, 3);

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !normalizedEmail.includes('@')) return;

    if (addSubscriber(normalizedEmail)) {
      setSubmitted(true);
      setEmail('');
      toast.success('Email berhasil dicatat', { description: 'Briefing logistik akan dikirim ke alamat Anda.' });
    } else {
      toast.info('Email sudah terdaftar', { description: 'Alamat ini sudah ada dalam daftar briefing.' });
    }
  };

  return (
    <motion.section data-motion-section aria-labelledby="editorial-title" variants={sectionReveal} initial={shouldReduceMotion ? 'visible' : 'hidden'} animate={shouldReduceMotion ? 'visible' : undefined} whileInView={shouldReduceMotion ? undefined : 'visible'} transition={shouldReduceMotion ? { duration: 0 } : undefined} viewport={viewportOnce} className="bg-slate-50 text-slate-900 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-20 items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.processEyebrow}</span>
            <h2 id="editorial-title" className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mt-3">{copy.processTitle}</h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl">{copy.processDescription}</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 border-y border-slate-200 mt-12">
          {copy.process.map(([number, title, description]) => (
            <article key={number} className="p-6 sm:p-7 border-b md:border-r xl:border-b-0 border-slate-200 last:border-r-0">
              <span className="font-mono text-xs font-bold text-cyan-700">{number}</span>
              <h3 className="font-display text-lg font-extrabold text-slate-950 mt-8">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">{description}</p>
              <CheckCircle2 className="w-5 h-5 text-cyan-700 mt-7" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 pt-20">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.insightEyebrow}</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-950 mt-3">{copy.insightTitle}</h2>
            <p className="text-sm text-slate-600 leading-relaxed mt-4 max-w-lg">{copy.insightDescription}</p>
            <button type="button" onClick={() => onNavigate('news')} className="inline-flex items-center gap-2 text-sm font-bold text-[#012E34] hover:text-cyan-700 mt-7">
              {copy.readMore}<ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid gap-4">
            {articles.map((article, index) => {
              const localized = getLocalizedArticle(article, currentLang);
              return (
                <article key={article.id} className="group grid grid-cols-[104px_1fr] sm:grid-cols-[140px_1fr] gap-4 border-b border-slate-200 pb-4 last:border-b-0">
                  <div className="h-24 sm:h-28 overflow-hidden bg-slate-200">
                    <img src={article.imageUrl} alt={localized.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-cyan-700"><span>{String(index + 1).padStart(2, '0')}</span><span className="text-slate-400">{localized.category}</span></div>
                    <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-950 leading-tight mt-2 line-clamp-2">{localized.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-2">{localized.excerpt}</p>
                    <button type="button" onClick={() => onSelectArticle(article.id)} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#012E34] mt-2">Baca insight <ArrowRight className="w-3.5 h-3.5" /></button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] items-center gap-8 mt-20 bg-[#012E34] p-7 sm:p-10 text-white">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-11 h-11 items-center justify-center bg-cyan-400/10 text-cyan-300"><Mail className="w-5 h-5" /></div>
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">{copy.newsletterEyebrow}</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-2">{copy.newsletterTitle}</h2>
              <p className="text-sm leading-relaxed text-slate-300 mt-3 max-w-2xl">{copy.newsletterDescription}</p>
            </div>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 min-w-0 lg:min-w-[390px]">
            <label className="sr-only" htmlFor="home-newsletter-email">Email perusahaan</label>
            <input id="home-newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={submitted ? copy.subscribed : copy.emailPlaceholder} className="min-w-0 flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#011417] px-5 py-3 font-bold text-sm transition-colors"><Send className="w-4 h-4" />{copy.subscribe}</button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="w-4 h-4 text-cyan-700" />Editorial berbasis sumber dan konteks operasional</div>
          <button type="button" onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 text-sm font-bold text-[#012E34] hover:text-cyan-700">{copy.consult}<Truck className="w-4 h-4" /></button>
        </div>
      </div>
    </motion.section>
  );
};
