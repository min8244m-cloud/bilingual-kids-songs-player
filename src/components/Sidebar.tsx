import React from 'react';
import { Language, translations } from '../types';
import { Menu, X, Music, Lock, Info, Sun, Moon, Globe, Sparkles } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  activeTab: 'home' | 'admin' | 'about';
  setActiveTab: (tab: 'home' | 'admin' | 'about') => void;
  language: Language;
  toggleLanguage: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onOpen,
  activeTab,
  setActiveTab,
  language,
  toggleLanguage,
  theme,
  toggleTheme,
}) => {
  const t = translations[language];

  return (
    <>
      {/* Top Left Circular Trigger Button */}
      <button
        onClick={onOpen}
        className="fixed top-4 left-4 z-40 p-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-950 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center border-2 border-white dark:border-purple-900 cursor-pointer"
        id="menu-trigger-btn"
        title={t.menuTitle}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-45 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
          id="sidebar-backdrop"
        />
      )}

      {/* Sliding Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-slate-950 shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col border-r-4 border-purple-400 dark:border-purple-900/60 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="sidebar-panel"
      >
        {/* Sidebar Header */}
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-950/20 dark:to-indigo-950/20 border-b border-purple-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🧸</span>
            <div>
              <h3 className="font-bold font-sans text-purple-700 dark:text-purple-300 leading-none mb-1">
                {language === 'my' ? 'သားသားမီးမီး' : 'Play & Learn'}
              </h3>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {language === 'my' ? 'မီနူးဘား' : 'Menu Navigation'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/30 text-slate-500 hover:text-rose-600 dark:text-slate-400 rounded-xl transition"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Content Links */}
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {/* Menu item 1: Playlist/Home */}
          <button
            onClick={() => {
              setActiveTab('home');
              onClose();
            }}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold font-sans text-sm text-left transition ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-100 dark:shadow-none'
                : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-slate-900'
            }`}
          >
            <Music className="w-5 h-5" />
            <span>{t.homeMenu}</span>
          </button>

          {/* Menu item 2: Manage (Admin Panel) */}
          <button
            onClick={() => {
              setActiveTab('admin');
              onClose();
            }}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold font-sans text-sm text-left transition ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-100 dark:shadow-none'
                : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-slate-900'
            }`}
          >
            <Lock className="w-5 h-5" />
            <span>{t.adminMenu}</span>
          </button>

          {/* Menu item 3: About / Instructions */}
          <button
            onClick={() => {
              setActiveTab('about');
              onClose();
            }}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold font-sans text-sm text-left transition ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-100 dark:shadow-none'
                : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-slate-900'
            }`}
          >
            <Info className="w-5 h-5" />
            <span>{t.aboutMenu}</span>
          </button>
        </div>

        {/* Sidebar Footer Controls (Bilingual + Theme Toggles) */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-purple-100 dark:border-slate-800 space-y-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-850 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-slate-800 rounded-xl font-bold font-sans text-xs transition shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              {t.languageToggle}
            </span>
            <span className="bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider">
              {language === 'my' ? 'EN' : 'မြန်မာ'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 border border-purple-100 dark:border-slate-800 rounded-xl font-bold font-sans text-xs transition shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {theme === 'light' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>{t.themeToggle} (Light)</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span>{t.themeToggle} (Dark)</span>
                </>
              )}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {theme}
            </span>
          </button>

          {/* Cute copyright or brand credits */}
          <div className="text-center pt-2">
            <p className="text-[10px] text-gray-400 font-sans flex items-center justify-center gap-1.5">
              <span>🧸 Bilingual Kids Songs</span>
              <span className="text-pink-500 animate-pulse">❤️</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
