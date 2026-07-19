export interface Song {
  id: string;
  titleMy: string;
  titleEn: string;
  url: string;
  category: 'myanmar' | 'english' | 'lullaby' | 'education';
  descriptionMy?: string;
  descriptionEn?: string;
  thumbnailColor?: string;
}

export type Language = 'my' | 'en';

export interface TranslationDict {
  appTitle: string;
  searchPlaceholder: string;
  allCategories: string;
  myanmarCategory: string;
  englishCategory: string;
  lullabyCategory: string;
  educationCategory: string;
  menuTitle: string;
  homeMenu: string;
  adminMenu: string;
  aboutMenu: string;
  themeToggle: string;
  languageToggle: string;
  enterPassword: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  unlockBtn: string;
  lockedTitle: string;
  incorrectPassword: string;
  adminPanelTitle: string;
  songTitleMyLabel: string;
  songTitleEnLabel: string;
  songUrlLabel: string;
  songCategoryLabel: string;
  addSongBtn: string;
  songListHeader: string;
  deleteBtn: string;
  editBtn: string;
  closeAdmin: string;
  driveLinkTips: string;
  playNow: string;
  noSongs: string;
  changePasswordBtn: string;
  newPasswordLabel: string;
  saveBtn: string;
  passwordChangedSuccess: string;
  howToUseTitle: string;
  howToUseStep1: string;
  howToUseStep2: string;
  howToUseStep3: string;
  howToUseStep4: string;
  cancelBtn: string;
  successAdded: string;
  successDeleted: string;
}

export const translations: Record<Language, TranslationDict> = {
  my: {
    appTitle: "ကလေးသီချင်းများနှင့် ကဗျာများ",
    searchPlaceholder: "သီချင်းရှာဖွေရန်...",
    allCategories: "သီချင်းအားလုံး",
    myanmarCategory: "မြန်မာကလေးကဗျာများ",
    englishCategory: "အင်္ဂလိပ်ကလေးသီချင်းများ",
    lullabyCategory: "သိပ်သီချင်းများ",
    educationCategory: "ပညာပေးသင်ခန်းစာများ",
    menuTitle: "မီနူးရွေးချယ်စရာ",
    homeMenu: "သီချင်းများကြည့်ရန်",
    adminMenu: "သီချင်းအသစ်ထည့်ရန် (အက်ဒမင်)",
    aboutMenu: "အသုံးပြုပုံလမ်းညွှန်",
    themeToggle: "Theme ပြောင်းရန်",
    languageToggle: "အင်္ဂလိပ်ဘာသာပြောင်းရန်",
    enterPassword: "အက်ဒမင်စကားဝှက် တောင်းဆိုနေပါသည်",
    passwordLabel: "စကားဝှက် (မူလစကားဝှက် - 12345)",
    passwordPlaceholder: "စကားဝှက် ရိုက်ထည့်ပါ...",
    unlockBtn: "အက်ဒမင်ဖွင့်မည်",
    lockedTitle: "အက်ဒမင်စနစ် သော့ခတ်ထားသည်",
    incorrectPassword: "စကားဝှက် မှားယွင်းနေပါသည်။ '12345' ဖြင့် ပြန်လည်ကြိုးစားကြည့်ပါ။",
    adminPanelTitle: "ကလေးသီချင်းများ စီမံခန့်ခွဲရန်",
    songTitleMyLabel: "သီချင်းခေါင်းစဉ် (မြန်မာဘာသာ)",
    songTitleEnLabel: "သီချင်းခေါင်းစဉ် (အင်္ဂလိပ်ဘာသာ)",
    songUrlLabel: "Google Drive သို့မဟုတ် YouTube လင့်ခ်",
    songCategoryLabel: "အမျိုးအစား သတ်မှတ်ရန်",
    addSongBtn: "သီချင်းအသစ် သိမ်းဆည်းမည်",
    songListHeader: "လက်ရှိသီချင်းများစာရင်း",
    deleteBtn: "ဖျက်မည်",
    editBtn: "ပြင်မည်",
    closeAdmin: "စီမံခန့်ခွဲသူစနစ် ပိတ်မည်",
    driveLinkTips: "အကြံပြုချက် - Google Drive လင့်ခ်များကို မျှဝေရာတွင် 'Anyone with the link can view' (လင့်ခ်ရှိသူတိုင်း ကြည့်ရှုနိုင်သည်) ဟု ပြင်ဆင်ပြီးမှ ထည့်သွင်းပေးပါ။",
    playNow: "ယခု ဖွင့်ပြနေသည့် သီချင်း",
    noSongs: "ရှာဖွေနေသည့် သီချင်းများ မတွေ့ရှိပါ။",
    changePasswordBtn: "အက်ဒမင်စကားဝှက် ပြောင်းရန်",
    newPasswordLabel: "စကားဝှက်အသစ်",
    saveBtn: "သိမ်းမည်",
    passwordChangedSuccess: "အက်ဒမင်စကားဝှက် ပြောင်းလဲခြင်း အောင်မြင်ပါသည်။",
    howToUseTitle: "သားသားမီးမီး ကလေးသီချင်းများမှ ကြိုဆိုပါတယ်!",
    howToUseStep1: "🎨 ဘယ်ဘက်အပေါ်ထောင့်ရှိ Menu Bar ကိုအသုံးပြု၍ Theme (အလင်း/အမှောင်) နှင့် ဘာသာစကား (မြန်မာ/အင်္ဂလိပ်) ကို အချိန်မရွေး ပြောင်းလဲနိုင်ပါသည်။",
    howToUseStep2: "🔓 သီချင်းအသစ်များ စီမံခန့်ခွဲရန်အတွက် Menu မှ 'သီချင်းအသစ်ထည့်ရန်' ကိုနှိပ်ပြီး မူလအက်ဒမင်စကားဝှက် '12345' ကို အသုံးပြု၍ ဝင်ရောက်နိုင်ပါသည်။",
    howToUseStep3: "🔗 မိမိနှစ်သက်ရာ Google Drive ဗီဒီယိုလင့်ခ် သို့မဟုတ် YouTube ဗီဒီယိုလင့်ခ်များကို ကူးယူပြီး အလွယ်တကူ ထည့်သွင်းသိမ်းဆည်း ဖွင့်ပြနိုင်ပါသည်။",
    howToUseStep4: "⭐ ကလေးငယ်များအတွက် သီချင်းလှလှလေးများဖြင့် ပျော်ရွှင်စွာ သင်ယူလေ့လာနိုင်သော လုံခြုံစိတ်ချရသည့် နေရာတစ်ခုဖြစ်ပါသည်။",
    cancelBtn: "မလုပ်တော့ပါ",
    successAdded: "သီချင်းအသစ်ကို အောင်မြင်စွာ ပေါင်းထည့်ပြီးပါပြီ!",
    successDeleted: "သီချင်းကို ဖျက်သိမ်းပြီးပါပြီ။"
  },
  en: {
    appTitle: "Kids Songs & Nursery Rhymes",
    searchPlaceholder: "Search kids songs...",
    allCategories: "All Songs",
    myanmarCategory: "Myanmar Nursery Rhymes",
    englishCategory: "English Nursery Rhymes",
    lullabyCategory: "Lullabies",
    educationCategory: "Educational Lessons",
    menuTitle: "Menu Navigation",
    homeMenu: "Song Player",
    adminMenu: "Upload & Manage (Admin)",
    aboutMenu: "How to Use & Guide",
    themeToggle: "Toggle Theme Mode",
    languageToggle: "Switch to Myanmar",
    enterPassword: "Enter Admin Password",
    passwordLabel: "Password (Default: 12345)",
    passwordPlaceholder: "Enter password here...",
    unlockBtn: "Unlock Admin",
    lockedTitle: "Admin Panel is Locked",
    incorrectPassword: "Incorrect password! Please try using '12345'.",
    adminPanelTitle: "Kids Songs Administrator",
    songTitleMyLabel: "Song Title (Myanmar Text)",
    songTitleEnLabel: "Song Title (English Text)",
    songUrlLabel: "Google Drive Video or YouTube Link",
    songCategoryLabel: "Select Category",
    addSongBtn: "Add Song to Play List",
    songListHeader: "Song Collection Database",
    deleteBtn: "Delete",
    editBtn: "Edit",
    closeAdmin: "Exit Admin Mode",
    driveLinkTips: "Tip: For Google Drive links, make sure to set sharing setting to 'Anyone with the link can view' before uploading.",
    playNow: "Now Playing Video",
    noSongs: "No kids songs matched your search.",
    changePasswordBtn: "Change Admin Password",
    newPasswordLabel: "New Password",
    saveBtn: "Save New Password",
    passwordChangedSuccess: "Admin password successfully updated!",
    howToUseTitle: "Welcome to Bilingual Kids Songs Portal!",
    howToUseStep1: "🎨 Toggle Light/Dark Theme and Language (Myanmar/English) any time via the top-left menu bar drawer.",
    howToUseStep2: "🔓 Click 'Upload & Manage' in the menu and enter the default passcode '12345' to manage songs.",
    howToUseStep3: "🔗 Copy any shared Google Drive video URL or YouTube video link, paste it in, and stream instantly!",
    howToUseStep4: "⭐ Keep your kids entertained with fun, wholesome, educational contents in a secure offline-saving layout.",
    cancelBtn: "Cancel",
    successAdded: "New song successfully added to the collection!",
    successDeleted: "Song successfully removed."
  }
};
