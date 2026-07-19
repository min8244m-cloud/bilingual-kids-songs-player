import React from 'react';
import { Song, Language, translations } from '../types';
import { getEmbedUrl, getLinkSourceType } from '../utils/urlHelper';
import { Tv, Sparkles, Youtube, HardDrive, Music, Maximize, Minimize, X } from 'lucide-react';

interface VideoPlayerProps {
  song: Song | null;
  language: Language;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ song, language }) => {
  const t = translations[language];
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      const elem = containerRef.current as any;
      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitFullscreenElement) {
        (document as any).webkitExitFullscreen?.();
      } else if ((document as any).mozFullScreenElement) {
        (document as any).mozCancelFullScreen?.();
      } else if ((document as any).msFullscreenElement) {
        (document as any).msExitFullscreen?.();
      }
    }
  };

  React.useEffect(() => {
    const handleNativeChange = () => {
      const isNativeFull = !!(
        document.fullscreenElement || 
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      if (!isNativeFull && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleNativeChange);
    document.addEventListener('webkitfullscreenchange', handleNativeChange);
    document.addEventListener('mozfullscreenchange', handleNativeChange);
    document.addEventListener('MSFullscreenChange', handleNativeChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleNativeChange);
      document.removeEventListener('webkitfullscreenchange', handleNativeChange);
      document.removeEventListener('mozfullscreenchange', handleNativeChange);
      document.removeEventListener('MSFullscreenChange', handleNativeChange);
    };
  }, [isFullscreen]);

  if (!song) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-slate-900/80 dark:to-indigo-950/40 rounded-3xl p-8 text-center border-4 border-dashed border-purple-300 dark:border-purple-900/50 flex flex-col items-center justify-center min-h-[400px] shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] dark:bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-md">
          <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/60 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <Music className="w-10 h-10 text-purple-600 dark:text-purple-300" />
          </div>
          <h3 className="text-2xl font-bold font-sans text-purple-700 dark:text-purple-300 mb-3 tracking-tight">
            {language === 'my' ? 'ဘယ်သီချင်း နားထောင်မလဲကွတ်တီ?' : 'Ready to Sing and Dance?'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-sans text-sm leading-relaxed mb-6">
            {language === 'my' 
              ? 'အောက်ပါ သီချင်းစာရင်းထဲမှ သင်နှစ်သက်သော သီချင်းတစ်ပုဒ်ကို ရွေးချယ်ပြီး အတူတူ သီဆိုကခုန်လိုက်ပါ!' 
              : 'Choose a wonderful song from the playlist below to start having fun with your family!'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 rounded-full text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Fun
            </span>
            <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Music
            </span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Learning
            </span>
          </div>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(song.url);
  const sourceType = getLinkSourceType(song.url);

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border-4 border-purple-400 dark:border-purple-800 transition-colors duration-300 overflow-hidden">
      {/* Decorative stars and sparkles */}
      <div className="absolute top-2 right-4 text-amber-400 animate-pulse">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-2 left-4 text-pink-400 animate-pulse delay-75">
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Screen Frame Container */}
      <div className="relative group">
        {/* Actual Video Frame */}
        <div 
          ref={containerRef}
          className={`relative bg-black transition-all duration-300 ${
            isFullscreen 
              ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none border-0' 
              : 'aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner border-4 border-slate-100 dark:border-slate-800'
          }`}
        >
          {embedUrl ? (
            <iframe
              id="kids-video-iframe"
              src={embedUrl}
              title={language === 'my' ? song.titleMy : song.titleEn}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-950 p-6 text-center">
              <Tv className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
              <p className="text-lg font-medium">Invalid or missing video link</p>
            </div>
          )}

          {/* Floating Fullscreen / Minimize Controls */}
          {isFullscreen ? (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-[10000] flex items-center justify-center w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md border border-white/20"
              title={language === 'my' ? 'ပြန်ထွက်မည်' : 'Exit Fullscreen'}
            >
              <X className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/90 hover:bg-purple-700/90 text-white text-[11px] font-bold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm border border-purple-500"
              title={language === 'my' ? 'မျက်နှာပြင်အပြည့်ကြည့်မည်' : 'View Fullscreen'}
            >
              <Maximize className="w-3.5 h-3.5" />
              <span>{language === 'my' ? 'အပြည့်ချဲ့မည်' : 'Fullscreen'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Video Details Card */}
      <div className="mt-5 px-1 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-extrabold text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-950/80 rounded-md">
                {t.playNow}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                #{song.category.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-900 dark:text-white leading-tight">
              {language === 'my' ? song.titleMy : song.titleEn}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-sans">
              {language === 'my' 
                ? song.descriptionMy || 'ကလေးများအတွက် အထူးသင့်လျော်သော ချစ်စရာဗီဒီယိုသီချင်းလေး ဖြစ်ပါသည်။'
                : song.descriptionEn || 'A beautiful and educational children video song.'}
            </p>
          </div>
        </div>

        {/* Action / Warning for Google Drive files */}
        {sourceType === 'drive' && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-700 dark:text-amber-400 flex items-start gap-2">
            <span className="text-base leading-none">💡</span>
            <div>
              <p className="font-semibold font-sans">{t.driveLinkTips}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
