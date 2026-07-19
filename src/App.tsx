import { useState, useEffect } from 'react';
import { Song, Language, translations } from './types';
import { defaultSongs } from './data/defaultSongs';
import { Sidebar } from './components/Sidebar';
import { VideoPlayer } from './components/VideoPlayer';
import { AdminPanel } from './components/AdminPanel';
import { Search, Globe, Sun, Moon, Sparkles, Music, Star, ArrowRight, Play, Heart, Trash2 } from 'lucide-react';

export default function App() {
  // Load settings from localStorage or defaults
  const [songs, setSongs] = useState<Song[]>([]);
  const [language, setLanguage] = useState<Language>('my');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'admin' | 'about'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'myanmar' | 'english' | 'lullaby' | 'education'>('all');

  // Load and merge initial list of songs
  useEffect(() => {
    // 1. Language preference
    const savedLang = localStorage.getItem('kids_songs_lang');
    if (savedLang === 'my' || savedLang === 'en') {
      setLanguage(savedLang);
    }

    // 2. Theme preference
    const savedTheme = localStorage.getItem('kids_songs_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else {
      // Default to light
      setTheme('light');
    }

    // 3. Custom songs
    const savedCustomSongs = localStorage.getItem('kids_songs_custom_list');
    let customList: Song[] = [];
    if (savedCustomSongs) {
      try {
        customList = JSON.parse(savedCustomSongs);
      } catch (e) {
        console.error("Error parsing custom songs", e);
      }
    }

    const fullPlaylist = [...defaultSongs, ...customList];
    setSongs(fullPlaylist);

    // Default active song to the first one so they see something playable immediately
    if (fullPlaylist.length > 0) {
      setActiveSong(fullPlaylist[0]);
    }
  }, []);

  // Set dark theme class on document element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('kids_songs_theme', theme);
  }, [theme]);

  const toggleLanguage = () => {
    const nextLang = language === 'my' ? 'en' : 'my';
    setLanguage(nextLang);
    localStorage.setItem('kids_songs_lang', nextLang);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleAddSong = (newSong: Song) => {
    // Save to custom list in localStorage
    const savedCustomSongs = localStorage.getItem('kids_songs_custom_list');
    let customList: Song[] = [];
    if (savedCustomSongs) {
      try {
        customList = JSON.parse(savedCustomSongs);
      } catch (e) {
        console.error(e);
      }
    }

    const updatedCustom = [...customList, newSong];
    localStorage.setItem('kids_songs_custom_list', JSON.stringify(updatedCustom));
    
    // Update local state
    const newPlaylist = [...defaultSongs, ...updatedCustom];
    setSongs(newPlaylist);
  };

  const handleEditSong = (editedSong: Song) => {
    // Save to custom list in localStorage
    const savedCustomSongs = localStorage.getItem('kids_songs_custom_list');
    let customList: Song[] = [];
    if (savedCustomSongs) {
      try {
        customList = JSON.parse(savedCustomSongs);
      } catch (e) {
        console.error(e);
      }
    }

    // Update in custom list
    const updatedCustom = customList.map(s => s.id === editedSong.id ? editedSong : s);
    localStorage.setItem('kids_songs_custom_list', JSON.stringify(updatedCustom));

    // Update local state
    const newPlaylist = songs.map(s => s.id === editedSong.id ? editedSong : s);
    setSongs(newPlaylist);

    if (activeSong && activeSong.id === editedSong.id) {
      setActiveSong(editedSong);
    }
  };

  const handleDeleteSong = (id: string) => {
    // 1. Remove from custom list in localStorage (if it's there)
    const savedCustomSongs = localStorage.getItem('kids_songs_custom_list');
    let customList: Song[] = [];
    if (savedCustomSongs) {
      try {
        customList = JSON.parse(savedCustomSongs);
      } catch (e) {
        console.error(e);
      }
    }

    const updatedCustom = customList.filter(s => s.id !== id);
    localStorage.setItem('kids_songs_custom_list', JSON.stringify(updatedCustom));

    // 2. Remove from overall list
    const newPlaylist = songs.filter(s => s.id !== id);
    setSongs(newPlaylist);

    // 3. Clear active song if it got deleted
    if (activeSong && activeSong.id === id) {
      setActiveSong(newPlaylist.length > 0 ? newPlaylist[0] : null);
    }
  };

  const handleSelectSong = (song: Song) => {
    setActiveSong(song);
    // Smoothly scroll to the player section (highly recommended on mobile/phone screens)
    setTimeout(() => {
      const playerElement = document.getElementById('kids-video-player-section');
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const t = translations[language];

  // Filtering songs
  const filteredSongs = songs.filter(song => {
    const matchesCategory = selectedCategory === 'all' || song.category === selectedCategory;
    const matchesSearch = 
      song.titleMy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (song.descriptionMy && song.descriptionMy.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (song.descriptionEn && song.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FDFBF7] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 relative pb-20">
      {/* Dynamic Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100/40 dark:bg-pink-950/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-purple-100/30 dark:bg-purple-950/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        toggleLanguage={toggleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Top Header Navigation Panel */}
      <header className="max-w-7xl mx-auto px-4 pt-4 pb-2 md:py-6 flex items-center justify-between gap-4 border-b border-purple-100/50 dark:border-slate-800/50">
        {/* Menu Spacer */}
        <div className="w-14 h-14 hidden md:block"></div>

        {/* Cute Colorful Brand Name Title */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none mx-auto md:mx-0 group"
          id="app-branding"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-md transform group-hover:rotate-6 transition duration-300">
            <span className="text-2xl">🎵</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-sans tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-300 dark:to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              {t.appTitle}
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-sans tracking-wider font-semibold uppercase">
              {language === 'my' ? 'သားသားမီးမီးတို့အတွက် သီချင်းကမ္ဘာ' : 'Play & Sing Along Playground'}
            </p>
          </div>
        </div>

        {/* Fast Action Buttons (Flag / Theme) on Top Right */}
        <div className="flex items-center gap-2">
          {/* Fast Language switch */}
          <button
            onClick={toggleLanguage}
            className="p-3 bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 border-2 border-purple-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow transition text-purple-700 dark:text-purple-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold"
            title="Switch Language"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline font-sans">{language === 'my' ? 'EN' : 'မြန်မာ'}</span>
          </button>

          {/* Fast Theme switch */}
          <button
            onClick={toggleTheme}
            className="p-3 bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 border-2 border-purple-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow transition text-slate-700 dark:text-slate-300 flex items-center cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-purple-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 pt-6 md:pt-10">
        
        {/* TAB 1: HOME (PLAYER & COLLECTION GRID) */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            
            {/* Bento Layout Grid for Active Player and Song Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: Active Kids Video Player (Spans 7 columns on desktop) */}
              <div id="kids-video-player-section" className="lg:col-span-7 space-y-4 scroll-mt-24">
                <VideoPlayer song={activeSong} language={language} />
              </div>

              {/* Right Side: Playlist Collection list & Search Filter (Spans 5 columns on desktop) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Search Box Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border-2 border-purple-100 dark:border-slate-900 transition flex items-center gap-3">
                  <Search className="w-5 h-5 text-purple-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent border-none text-slate-800 dark:text-white font-sans placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-sm"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-xs bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-2 py-1 rounded-full text-gray-500 font-sans cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Chips Container */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', emoji: '🌟', label: t.allCategories },
                    { id: 'myanmar', emoji: '🇲🇲', label: t.myanmarCategory },
                    { id: 'english', emoji: '🇬🇧', label: t.englishCategory },
                    { id: 'lullaby', emoji: '🌙', label: t.lullabyCategory },
                    { id: 'education', emoji: '🎓', label: t.educationCategory }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as any)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-sm ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white scale-105 shadow-md'
                          : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border border-purple-50 dark:border-slate-800 hover:bg-purple-50/50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* Vertical Scrollable Kids Play list */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2" id="kids-songs-scroll-panel">
                  {filteredSongs.length > 0 ? (
                    filteredSongs.map((song) => {
                      const isActive = activeSong && activeSong.id === song.id;
                      return (
                        <div
                          key={song.id}
                          onClick={() => handleSelectSong(song)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer hover:shadow-md ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-500 dark:border-purple-800 scale-[1.01]'
                              : 'bg-white dark:bg-slate-900 border-purple-50/80 dark:border-slate-900/60 hover:border-purple-200 dark:hover:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Decorative Colored Circle */}
                            <div className={`w-11 h-11 bg-gradient-to-br ${song.thumbnailColor || 'from-purple-400 to-indigo-500'} rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm relative overflow-hidden`}>
                              <Play className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                            </div>

                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white font-sans text-sm line-clamp-1">
                                {language === 'my' ? song.titleMy : song.titleEn}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-sans line-clamp-1">
                                {language === 'my' ? song.titleEn : song.titleMy}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Category Label */}
                            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
                              {song.category}
                            </span>
                            {/* Cute Indicator icon */}
                            {isActive && (
                              <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 font-sans text-gray-500 dark:text-gray-400">
                      ☕ {t.noSongs}
                    </div>
                  )}
                </div>

                {/* Floating Shortcut card to add your own song */}
                <div 
                  onClick={() => setActiveTab('admin')}
                  className="bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-900 dark:to-indigo-950 rounded-3xl p-5 text-white shadow-xl flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.02] active:scale-95 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎈</span>
                    <div>
                      <h4 className="font-bold text-sm font-sans">
                        {language === 'my' ? 'သီချင်းသစ် ကိုယ်တိုင်ထည့်မလား?' : 'Add your custom Kids Songs!'}
                      </h4>
                      <p className="text-[11px] text-purple-100 font-sans">
                        {language === 'my' ? 'Google Drive ဗီဒီယိုလင့်ခ်များ ထည့်သွင်းသိမ်းဆည်းပါ' : 'Upload and watch Google Drive file clips.'}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PASSWORD PROTECTED ADMIN PANEL */}
        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <AdminPanel
              songs={songs}
              language={language}
              onAddSong={handleAddSong}
              onEditSong={handleEditSong}
              onDeleteSong={handleDeleteSong}
            />
          </div>
        )}

        {/* TAB 3: HOW TO USE / ABOUT */}
        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-purple-200 dark:border-purple-950 transition animate-fade-in">
            <div className="text-center mb-8">
              <span className="text-5xl">🧸</span>
              <h2 className="text-2xl md:text-3xl font-extrabold font-sans text-purple-800 dark:text-purple-300 mt-4">
                {t.howToUseTitle}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-sans mt-2">
                {language === 'my' ? 'လုံခြုံစိတ်ချရသော ကလေးသီချင်းရုပ်ရှင်ပြစက်' : 'A safe, fun, and educational player platform.'}
              </p>
            </div>

            <div className="space-y-6">
              {[
                { emoji: '🎨', text: t.howToUseStep1 },
                { emoji: '🔐', text: t.howToUseStep2 },
                { emoji: '🔗', text: t.howToUseStep3 },
                { emoji: '⭐', text: t.howToUseStep4 },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-purple-50/40 dark:bg-slate-950/40 border border-purple-100/30 dark:border-slate-800/60">
                  <span className="text-2xl shrink-0">{step.emoji}</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Back button to music player */}
            <div className="mt-10 text-center">
              <button
                onClick={() => setActiveTab('home')}
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 cursor-pointer text-sm font-sans"
              >
                {language === 'my' ? 'သီချင်းများ ပြန်ဖွင့်မည်' : 'Back to Song Player'}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
