import React, { useState, useEffect } from 'react';
import { Song, Language, translations } from '../types';
import { Lock, Unlock, Plus, Trash, Edit3, X, Eye, EyeOff, Save, KeyRound, Sparkles } from 'lucide-react';

interface AdminPanelProps {
  songs: Song[];
  language: Language;
  onAddSong: (song: Song) => void;
  onEditSong: (song: Song) => void;
  onDeleteSong: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  songs,
  language,
  onAddSong,
  onEditSong,
  onDeleteSong,
}) => {
  const t = translations[language];

  // Passcode states
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [storedPassword, setStoredPassword] = useState('12345');

  // Change Password states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Song Form states
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [titleMy, setTitleMy] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<'myanmar' | 'english' | 'lullaby' | 'education'>('myanmar');
  const [descriptionMy, setDescriptionMy] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');

  // Toast message
  const [toast, setToast] = useState('');

  // Load password from localStorage
  useEffect(() => {
    const savedPass = localStorage.getItem('kids_songs_admin_password');
    if (savedPass) {
      setStoredPassword(savedPass);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === storedPassword) {
      setIsUnlocked(true);
      setErrorMsg('');
      setPassword('');
    } else {
      setErrorMsg(t.incorrectPassword);
    }
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      localStorage.setItem('kids_songs_admin_password', newPassword.trim());
      setStoredPassword(newPassword.trim());
      setNewPassword('');
      setIsChangingPassword(false);
      setPasswordSuccess(t.passwordChangedSuccess);
      setTimeout(() => setPasswordSuccess(''), 4000);
    }
  };

  const handleSubmitSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleMy.trim() || !titleEn.trim() || !url.trim()) {
      alert(language === 'my' ? 'ခေါင်းစဉ်များနှင့် လင့်ခ်များကို ဖြည့်သွင်းပေးပါရန်!' : 'Please fill in titles and video URL!');
      return;
    }

    // Determine some playful gradient colors based on category
    const colors = {
      myanmar: 'from-pink-400 to-rose-500',
      english: 'from-blue-400 to-cyan-500',
      lullaby: 'from-amber-400 to-orange-500',
      education: 'from-indigo-400 to-purple-500',
    };

    const songData: Song = {
      id: editingSongId || `custom-${Date.now()}`,
      titleMy: titleMy.trim(),
      titleEn: titleEn.trim(),
      url: url.trim(),
      category,
      descriptionMy: descriptionMy.trim(),
      descriptionEn: descriptionEn.trim(),
      thumbnailColor: colors[category],
    };

    if (editingSongId) {
      onEditSong(songData);
      triggerToast(language === 'my' ? 'သီချင်းကို ပြင်ဆင်ပြီးပါပြီ!' : 'Song updated successfully!');
      setEditingSongId(null);
    } else {
      onAddSong(songData);
      triggerToast(t.successAdded);
    }

    // Reset Form
    setTitleMy('');
    setTitleEn('');
    setUrl('');
    setCategory('myanmar');
    setDescriptionMy('');
    setDescriptionEn('');
  };

  const startEdit = (song: Song) => {
    setEditingSongId(song.id);
    setTitleMy(song.titleMy);
    setTitleEn(song.titleEn);
    setUrl(song.url);
    setCategory(song.category);
    setDescriptionMy(song.descriptionMy || '');
    setDescriptionEn(song.descriptionEn || '');
    // Scroll to form
    const formElement = document.getElementById('song-form-anchor');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cancelEdit = () => {
    setEditingSongId(null);
    setTitleMy('');
    setTitleEn('');
    setUrl('');
    setCategory('myanmar');
    setDescriptionMy('');
    setDescriptionEn('');
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      language === 'my' 
        ? 'ဤသီချင်းကို စာရင်းမှ ဖျက်ပစ်ရန် သေချာပါသလား?' 
        : 'Are you sure you want to delete this song?'
    );
    if (confirmDelete) {
      onDeleteSong(id);
      triggerToast(t.successDeleted);
      if (editingSongId === id) {
        cancelEdit();
      }
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-purple-400 animate-slide-in font-sans">
          <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" />
          <span>{toast}</span>
        </div>
      )}

      {/* Lock Screen */}
      {!isUnlocked ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-purple-300 dark:border-purple-900/60 transition-colors duration-300 flex flex-col items-center">
          <div className="w-20 h-20 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center mb-6 border-2 border-purple-300">
            <Lock className="w-10 h-10 text-purple-600 dark:text-purple-300 animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-sans text-purple-800 dark:text-purple-300 text-center mb-2">
            {t.lockedTitle}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-sm mb-8 font-sans">
            {language === 'my' 
              ? 'သီချင်းသစ်များထည့်ရန် သို့မဟုတ် စာရင်းကို ပြုပြင်ရန်အတွက် အက်ဒမင်စကားဝှက်ကို ထည့်သွင်းပေးပါ။' 
              : 'Authorized parents/admin can log in here to add new music and modify current playlist.'}
          </p>

          <form onSubmit={handleUnlock} className="w-full max-w-md space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/80 border-2 border-gray-200 dark:border-slate-700 rounded-2xl text-gray-950 dark:text-white font-sans focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs font-semibold font-sans mt-2 flex items-center gap-1.5">
                ❌ {errorMsg}
              </p>
            )}

            {passwordSuccess && (
              <p className="text-emerald-500 text-xs font-semibold font-sans mt-2 flex items-center gap-1.5">
                🎉 {passwordSuccess}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-200 dark:shadow-none hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <Unlock className="w-5 h-5" />
              {t.unlockBtn}
            </button>
          </form>
        </div>
      ) : (
        /* Active Admin View */
        <div className="space-y-8 animate-fade-in">
          {/* Header Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border-2 border-purple-200 dark:border-purple-950 flex flex-col md:flex-row items-center justify-between gap-4 transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-300">
                <Unlock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-900 dark:text-white">
                  {t.adminPanelTitle}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans">
                  {language === 'my' ? 'သီချင်းများ စီမံရန်စနစ်ကို ဖွင့်ထားသည်' : 'You are currently logged in as administrator'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
              >
                <KeyRound className="w-4 h-4" />
                {t.changePasswordBtn}
              </button>

              <button
                onClick={() => setIsUnlocked(false)}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
              >
                <X className="w-4 h-4" />
                {t.closeAdmin}
              </button>
            </div>
          </div>

          {/* Change Password Dialog Inline */}
          {isChangingPassword && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 max-w-md animate-slide-in">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-purple-600" />
                {t.changePasswordBtn}
              </h3>
              <form onSubmit={handleSavePassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t.newPasswordLabel}
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password..."
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl text-sm font-sans"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-500 shadow"
                  >
                    {t.saveBtn}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Anchor to scroll to when editing */}
          <div id="song-form-anchor" />

          {/* Add / Edit Song Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-purple-200 dark:border-purple-950 transition">
            <h3 className="text-lg font-bold font-sans text-purple-800 dark:text-purple-300 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {editingSongId ? (language === 'my' ? 'သီချင်း အချက်အလက်များ ပြင်ဆင်ရန်' : 'Edit Song details') : (language === 'my' ? 'ကလေးသီချင်းအသစ် ထည့်သွင်းရန်' : 'Add New Kids Song')}
            </h3>

            <form onSubmit={handleSubmitSong} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">
                    {t.songTitleMyLabel} *
                  </label>
                  <input
                    type="text"
                    value={titleMy}
                    onChange={(e) => setTitleMy(e.target.value)}
                    placeholder="ဥပမာ - ဆင်ကလေး သီချင်း"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-950 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">
                    {t.songTitleEnLabel} *
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Baby Elephant Song"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-950 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">
                  {t.songUrlLabel} *
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/... သို့မဟုတ် https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-950 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                  required
                />
                <p className="mt-1.5 text-xs text-purple-600 dark:text-purple-400 font-sans leading-relaxed">
                  {t.driveLinkTips}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">
                    {t.songCategoryLabel}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-950 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                  >
                    <option value="myanmar">{t.myanmarCategory}</option>
                    <option value="english">{t.englishCategory}</option>
                    <option value="lullaby">{t.lullabyCategory}</option>
                    <option value="education">{t.educationCategory}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">
                    သီချင်းရှင်းလင်းချက် (မြန်မာဘာသာ)
                  </label>
                  <textarea
                    rows={2}
                    value={descriptionMy}
                    onChange={(e) => setDescriptionMy(e.target.value)}
                    placeholder="ဥပမာ - ဆင်ကလေးများ၏ ချစ်စရာသီချင်းလေး"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-950 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">
                    Description (English)
                  </label>
                  <textarea
                    rows={2}
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="e.g. A cute song about baby elephants..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-950 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                {editingSongId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition"
                  >
                    {t.cancelBtn}
                  </button>
                )}
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md transition transform active:scale-95"
                >
                  {editingSongId ? (language === 'my' ? 'ပြုပြင်မှုကို သိမ်းဆည်းမည်' : 'Save Changes') : t.addSongBtn}
                </button>
              </div>
            </form>
          </div>

          {/* Current Database Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-purple-200 dark:border-purple-950 transition overflow-hidden">
            <h3 className="text-lg font-bold font-sans text-purple-800 dark:text-purple-300 mb-6 flex items-center gap-2">
              <span>🎵</span>
              {t.songListHeader}
              <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-mono">
                {songs.length}
              </span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4">{language === 'my' ? 'သီချင်းအမည်' : 'Song Name'}</th>
                    <th className="py-3 px-4 hidden md:table-cell">{language === 'my' ? 'အမျိုးအစား' : 'Category'}</th>
                    <th className="py-3 px-4 hidden sm:table-cell">{language === 'my' ? 'လင့်ခ်လိပ်စာ' : 'Video Link'}</th>
                    <th className="py-3 px-4 text-center">{language === 'my' ? 'ပြင်ဆင်မှုများ' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-sm">
                  {songs.map((song) => (
                    <tr key={song.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-sans">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {language === 'my' ? song.titleMy : song.titleEn}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {language === 'my' ? song.titleEn : song.titleMy}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <span className="px-2.5 py-1 text-xs rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-sans border border-indigo-100 dark:border-indigo-900/30">
                          {song.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 hidden sm:table-cell text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate font-mono">
                        {song.url}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => startEdit(song)}
                            className="p-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 rounded-xl transition"
                            title={t.editBtn}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(song.id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/80 text-rose-600 dark:text-rose-400 rounded-xl transition"
                            title={t.deleteBtn}
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
