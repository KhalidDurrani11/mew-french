import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Film, Sparkles, Upload, Play, AlertCircle, Loader2, Download, Check } from 'lucide-react';
import { IMAGES } from '../data/restaurantData';
import { useLanguage } from '../context/LanguageContext';

interface AnimateVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PHOTOS = [
  { id: 'burrata-pizza', name: 'Pizza Burrata & Truffe', src: IMAGES.burrataPizza },
  { id: 'pasta', name: 'Tagliatelle al Tartufo', src: IMAGES.freshPasta },
  { id: 'hero-pizza', name: 'Pizza au Feu de Bois', src: IMAGES.heroPizza },
  { id: 'tiramisu', name: 'Tiramisù Artisanal', src: IMAGES.tiramisu },
];

export default function AnimateVideoModal({ isOpen, onClose }: AnimateVideoModalProps) {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<string>(PRESET_PHOTOS[0].src);
  const [customPhotoBase64, setCustomPhotoBase64] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState(
    'Gentle rising steam, bubbling cheese, flickering wood fire light and cinematic slow motion depth of field.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomPhotoBase64(reader.result);
        setSelectedPhoto('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedVideoUrl(null);

    try {
      let imageBase64ToSend = customPhotoBase64;

      // If preset photo selected, fetch and convert to base64
      if (selectedPhoto !== 'custom' || !imageBase64ToSend) {
        const response = await fetch(selectedPhoto);
        const blob = await response.blob();
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
          reader.onloadend = () => {
            imageBase64ToSend = reader.result as string;
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }

      const res = await fetch('/api/animate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageBase64ToSend,
          prompt,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la génération vidéo.');
      }

      if (data.videoBase64) {
        const videoDataUrl = `data:${data.mimeType || 'video/mp4'};base64,${data.videoBase64}`;
        setGeneratedVideoUrl(videoDataUrl);
      } else {
        throw new Error('Aucune donnée vidéo reçue du modèle.');
      }
    } catch (err: any) {
      setError(err?.message || 'Échec de la génération vidéo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F3E9] text-[#291C17] w-full max-w-2xl p-6 sm:p-8 rounded-sm shadow-2xl border border-[#291C17]/15 relative my-8"
          >
            {/* Close */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-5 right-5 p-2 text-[#291C17]/60 hover:text-[#C83B28] transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C83B28] font-bold mb-1">
                <Film className="w-3.5 h-3.5" />
                <span>{t('Studio Vidéo Cinématographique', 'Cinematic Video Studio')}</span>
              </div>
              <h3 className="font-display text-3xl font-bold text-[#291C17]">
                {t('Animer une Photo en Vidéo', 'Animate Photo into Video')}
              </h3>
              <p className="text-xs sm:text-sm text-[#291C17]/70 font-light mt-1">
                {t(
                  'Transformez une photographie de plat italien en vidéo vivante (vapeur, braises, fonte du fromage) grâce au modèle gemini-omni-1.1-flash.',
                  'Transform an Italian food photograph into a living video (rising steam, glowing embers, melting cheese) using the gemini-omni-1.1-flash model.'
                )}
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 bg-red-100 text-red-900 text-xs rounded-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold block">{t('Erreur', 'Error')}</span>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Generated Video Player Stage */}
            {generatedVideoUrl ? (
              <div className="space-y-4 mb-6">
                <div className="relative rounded-sm overflow-hidden bg-black shadow-xl aspect-16/9 flex items-center justify-center">
                  <video
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-[#343A25] font-medium flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#C83B28]" />
                    {t('Vidéo cinématographique générée avec succès !', 'Cinematic video successfully generated!')}
                  </span>
                  <a
                    href={generatedVideoUrl}
                    download="la-felicita-cinematic.mp4"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#C83B28] rounded-xs hover:bg-[#b53220] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t('Télécharger MP4', 'Download MP4')}
                  </a>
                </div>
              </div>
            ) : null}

            {/* Select Image */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#291C17]/80 mb-2">
                  {t('1. Choisissez une photo ou téléversez la vôtre', '1. Select a photo or upload your own')}
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {PRESET_PHOTOS.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => {
                        setSelectedPhoto(photo.src);
                        setCustomPhotoBase64(null);
                      }}
                      className={`relative aspect-4/3 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedPhoto === photo.src
                          ? 'border-[#C83B28] scale-102 shadow-md'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.src} alt={photo.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="mt-2.5">
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-[#291C17]/80 bg-white border border-[#291C17]/20 rounded-xs hover:border-[#C83B28] cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#C83B28]" />
                    <span>{t('Téléverser une photo personnelle...', 'Upload custom photo...')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {customPhotoBase64 && (
                    <span className="ml-2 text-xs text-[#343A25] font-medium">✓ {t('Photo importée', 'Custom photo loaded')}</span>
                  )}
                </div>
              </div>

              {/* Aspect Ratio & Motion Prompt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1.5">
                    {t('2. Format / Ratio', '2. Aspect Ratio')}
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAspectRatio('16:9')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xs border cursor-pointer transition-colors ${
                        aspectRatio === '16:9'
                          ? 'bg-[#291C17] text-white border-[#291C17]'
                          : 'bg-white text-[#291C17]/80 border-[#291C17]/20 hover:border-[#291C17]'
                      }`}
                    >
                      16:9 {t('(Paysage)', '(Landscape)')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAspectRatio('9:16')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xs border cursor-pointer transition-colors ${
                        aspectRatio === '9:16'
                          ? 'bg-[#291C17] text-white border-[#291C17]'
                          : 'bg-white text-[#291C17]/80 border-[#291C17]/20 hover:border-[#291C17]'
                      }`}
                    >
                      9:16 {t('(Portrait / Réel)', '(Portrait / Reel)')}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#291C17]/80 mb-1.5">
                    {t('3. Direction du Mouvement', '3. Motion Prompt')}
                  </label>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Vapeur, flammes, zoom lent..."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#291C17]/20 rounded-xs focus:outline-none focus:border-[#C83B28]"
                  />
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3.5 text-xs uppercase tracking-widest font-semibold text-[#F8F3E9] bg-[#C83B28] hover:bg-[#a92c1b] rounded-xs transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('Génération vidéo en cours (~1-2 min)...', 'Generating video (~1-2 min)...')}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t('Générer la Vidéo avec Omni Flash', 'Generate Video with Omni Flash')}</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-[#291C17]/60 mt-2">
                  {t(
                    'Propulsé par Google Gemini Interactions API · Modèle multimodal gemini-omni-1.1-flash',
                    'Powered by Google Gemini Interactions API · Multimodal model gemini-omni-1.1-flash'
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
