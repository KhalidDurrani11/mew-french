import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TestimonialsSection() {
  const { language, t } = useLanguage();

  const reviews = [
    {
      name: 'Thomas D.',
      location: 'Grenoble',
      rating: 5,
      date: 'Novembre 2026',
      dateEn: 'November 2026',
      title: 'La meilleure pizza au feu de bois de Grenoble',
      titleEn: 'The best wood-fired pizza in Grenoble',
      comment:
        'Pâte incroyable, alvéolée et croustillante, cuite sous nos yeux au feu de bois. La pizza à la burrata et le tiramisù maison sont tout simplement à tomber. Service chaleureux et vue magnifique sur les quais.',
      commentEn:
        'Incredible airy and blistered sourdough crust baked before your eyes. The burrata pizza and homemade tiramisù are simply unforgettable. Warm service and stunning river view.',
    },
    {
      name: 'Giulia M.',
      location: 'Italie / Voyageuse',
      rating: 5,
      date: 'Octobre 2026',
      dateEn: 'October 2026',
      title: 'Comme en Italie au pied de la Bastille',
      titleEn: 'Just like home in Italy',
      comment:
        'En tant qu\'Italienne, je suis très exigeante sur la mozzarella et la sauce tomate. Ici, les produits sont authentiques DOP, les tagliatelles sont fraîches et le café gourmand est royal. Une adresse précieuse.',
      commentEn:
        'As an Italian, I am very particular about mozzarella and tomato sauce. Here, every product is authentic DOP, the pasta is freshly handmade and the coffee is divine.',
    },
    {
      name: 'Alexandre & Sophie B.',
      location: 'Isère',
      rating: 5,
      date: 'Septembre 2026',
      dateEn: 'September 2026',
      title: 'Un dîner parfait au bord de l\'Isère',
      titleEn: 'A perfect dinner by the river',
      comment:
        'Cadre intime avec les murs en pierre du Quai Perrière. La pizza aux ravioles et le gratin d\'aubergines au four sont des pépites locales. Nous y revenons tous les mois avec le même plaisir.',
      commentEn:
        'Intimate romantic atmosphere with exposed stone walls on Quai Perrière. The local ravioles pizza and wood-baked aubergine gratin are regional gems. We return every month.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#1C1411] text-[#F8F3E9] relative overflow-hidden border-t border-b border-white/10">
      {/* Decorative subtle glows & vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-[#C83B28]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C83B28]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          {/* Star aggregate badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#261A16] border border-white/15 text-xs font-bold tracking-wider mb-4 shadow-lg shadow-black/30">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[#F8F3E9]">4.8 / 5</span>
            <span className="text-white/20">·</span>
            <span className="text-[#F8F3E9]/75 font-normal">450+ {t('avis vérifiés', 'verified reviews')}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F3E9] leading-tight">
            {t('Ce que disent nos hôtes', 'What Our Guests Say')}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#F8F3E9]/75 font-light">
            {t(
              'L\'amour de la cuisine italienne partagé chaque soir au 34 Quai Perrière.',
              'The passion for Italian cuisine shared every evening at 34 Quai Perrière.'
            )}
          </p>
        </motion.div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#261A16] to-[#1E1410] border border-white/10 hover:border-[#C83B28]/50 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle watermark quote icon in top corner */}
              <Quote className="absolute -top-3 -right-3 w-20 h-20 text-white/[0.03] group-hover:text-[#C83B28]/10 transition-colors pointer-events-none" />

              <div className="relative z-10">
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="w-7 h-7 text-[#E8927C] fill-[#E8927C]/20" />
                </div>

                {/* Stars + date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#F8F3E9]/50 font-mono">
                    {language === 'en' ? r.dateEn : r.date}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-[#F8F3E9] mb-3 leading-snug group-hover:text-[#E8927C] transition-colors">
                  « {language === 'en' ? r.titleEn : r.title} »
                </h3>

                <p className="text-xs sm:text-sm text-[#F8F3E9]/80 font-light leading-relaxed">
                  {language === 'en' ? r.commentEn : r.comment}
                </p>
              </div>

              {/* Reviewer */}
              <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs sm:text-sm text-[#F8F3E9] block">{r.name}</span>
                  <span className="text-[11px] text-[#F8F3E9]/50">{r.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{t('Vérifié', 'Verified')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-12 text-xs text-[#F8F3E9]/60 uppercase tracking-widest font-semibold"
        >
          <span className="flex items-center gap-2">
            <span className="text-amber-400">★★★★★</span>
            Google Maps
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/15" />
          <span className="flex items-center gap-2">
            <span className="text-amber-400">★★★★★</span>
            TripAdvisor
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/15" />
          <span className="flex items-center gap-2">
            <span className="text-amber-400">★★★★★</span>
            Avis Vérifiés
          </span>
        </motion.div>

      </div>
    </section>
  );
}
