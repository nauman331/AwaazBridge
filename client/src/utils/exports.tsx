import {
    Video,
    Bell,
    User,
    Home,
    Users,
    BarChart3,
    Settings,
    Languages,
    MessageSquare
} from 'lucide-react'

// export const backendUrl = "https://awaazbridge.onrender.com/api/v1/";
export const backendUrl = "http://localhost:5000/api/v1/";
export const socketUrl = "http://localhost:5000";
// export const socketUrl = "https://awaazbridge.onrender.com";


export const googleClientId = "268486767053-den8fcjmuhauvah75hp80a01rr0i6580.apps.googleusercontent.com";

export const userNavigationItems = [
    { icon: MessageSquare, label: 'Messages', path: '/user/chats' },
    { icon: Video, label: 'Start Call', path: '/user/video-call' },
]

export const adminnavigationItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: User, label: 'Profile', path: '/admin/profile' },
    { icon: Users, label: 'Manage Users', path: '/admin/users' },
    { icon: Video, label: 'Call Analytics', path: '/admin/calls' },
    { icon: Languages, label: 'Translation Stats', path: '/admin/translation' },
    { icon: BarChart3, label: 'System Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Platform Settings', path: '/admin/settings' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
]

export const moderatorNavigationItems = [
    { icon: Home, label: 'Dashboard', path: '/moderator' },
    { icon: User, label: 'Profile', path: '/moderator/profile' },
    { icon: Video, label: 'Monitor Calls', path: '/moderator/monitor' },
    { icon: Users, label: 'User Support', path: '/moderator/support' },
    { icon: Languages, label: 'Translation Quality', path: '/moderator/quality' },
    { icon: BarChart3, label: 'Reports', path: '/moderator/reports' },
    { icon: Bell, label: 'Notifications', path: '/moderator/notifications' },
]

export const languageMap: Record<string, string> = {
    'ab': 'ab',      // Abkhazian
    'aa': 'aa',      // Afar
    'af': 'af-ZA',   // Afrikaans
    'ak': 'ak',      // Akan
    'sq': 'sq-AL',   // Albanian
    'am': 'am-ET',   // Amharic
    'ar': 'ar-SA',   // Arabic
    'an': 'an',      // Aragonese
    'hy': 'hy-AM',   // Armenian
    'as': 'as-IN',   // Assamese
    'av': 'av',      // Avaric
    'ae': 'ae',      // Avestan
    'ay': 'ay',      // Aymara
    'az': 'az-AZ',   // Azerbaijani
    'bm': 'bm',      // Bambara
    'ba': 'ba',      // Bashkir
    'eu': 'eu-ES',   // Basque
    'be': 'be-BY',   // Belarusian
    'bn': 'bn-BD',   // Bengali
    'bh': 'bh',      // Bihari
    'bi': 'bi',      // Bislama
    'bs': 'bs-BA',   // Bosnian
    'br': 'br',      // Breton
    'bg': 'bg-BG',   // Bulgarian
    'my': 'my-MM',   // Burmese
    'ca': 'ca-ES',   // Catalan
    'ch': 'ch',      // Chamorro
    'ce': 'ce',      // Chechen
    'ny': 'ny',      // Chichewa
    'zh': 'zh-CN',   // Chinese
    'cv': 'cv',      // Chuvash
    'kw': 'kw',      // Cornish
    'co': 'co',      // Corsican
    'cr': 'cr',      // Cree
    'hr': 'hr-HR',   // Croatian
    'cs': 'cs-CZ',   // Czech
    'da': 'da-DK',   // Danish
    'dv': 'dv',      // Divehi
    'nl': 'nl-NL',   // Dutch
    'dz': 'dz',      // Dzongkha
    'en': 'en-US',   // English
    'eo': 'eo',      // Esperanto
    'et': 'et-EE',   // Estonian
    'ee': 'ee',      // Ewe
    'fo': 'fo',      // Faroese
    'fj': 'fj',      // Fijian
    'fi': 'fi-FI',   // Finnish
    'fr': 'fr-FR',   // French
    'ff': 'ff',      // Fulah
    'gl': 'gl-ES',   // Galician
    'ka': 'ka-GE',   // Georgian
    'de': 'de-DE',   // German
    'el': 'el-GR',   // Greek
    'gn': 'gn',      // Guaraní
    'gu': 'gu-IN',   // Gujarati
    'ht': 'ht',      // Haitian
    'ha': 'ha',      // Hausa
    'he': 'he-IL',   // Hebrew
    'hz': 'hz',      // Herero
    'hi': 'hi-IN',   // Hindi
    'ho': 'ho',      // Hiri Motu
    'hu': 'hu-HU',   // Hungarian
    'ia': 'ia',      // Interlingua
    'id': 'id-ID',   // Indonesian
    'ie': 'ie',      // Interlingue
    'ga': 'ga-IE',   // Irish
    'ig': 'ig',      // Igbo
    'ik': 'ik',      // Inupiaq
    'io': 'io',      // Ido
    'is': 'is-IS',   // Icelandic
    'it': 'it-IT',   // Italian
    'iu': 'iu',      // Inuktitut
    'ja': 'ja-JP',   // Japanese
    'jv': 'jv',      // Javanese
    'kl': 'kl',      // Kalaallisut
    'kn': 'kn-IN',   // Kannada
    'kr': 'kr',      // Kanuri
    'ks': 'ks',      // Kashmiri
    'kk': 'kk-KZ',   // Kazakh
    'km': 'km-KH',   // Khmer
    'ki': 'ki',      // Kikuyu
    'rw': 'rw',      // Kinyarwanda
    'ky': 'ky-KG',   // Kyrgyz
    'kv': 'kv',      // Komi
    'kg': 'kg',      // Kongo
    'ko': 'ko-KR',   // Korean
    'ku': 'ku',      // Kurdish
    'kj': 'kj',      // Kwanyama
    'la': 'la',      // Latin
    'lb': 'lb',      // Luxembourgish
    'lg': 'lg',      // Luganda
    'li': 'li',      // Limburgish
    'ln': 'ln',      // Lingala
    'lo': 'lo-LA',   // Lao
    'lt': 'lt-LT',   // Lithuanian
    'lu': 'lu',      // Luba-Katanga
    'lv': 'lv-LV',   // Latvian
    'gv': 'gv',      // Manx
    'mk': 'mk-MK',   // Macedonian
    'mg': 'mg',      // Malagasy
    'ms': 'ms-MY',   // Malay
    'ml': 'ml-IN',   // Malayalam
    'mt': 'mt-MT',   // Maltese
    'mi': 'mi',      // Māori
    'mr': 'mr-IN',   // Marathi
    'mh': 'mh',      // Marshallese
    'mn': 'mn-MN',   // Mongolian
    'na': 'na',      // Nauru
    'nv': 'nv',      // Navajo
    'nd': 'nd',      // North Ndebele
    'ne': 'ne-NP',   // Nepali
    'ng': 'ng',      // Ndonga
    'nb': 'nb-NO',   // Norwegian Bokmål
    'nn': 'nn-NO',   // Norwegian Nynorsk
    'no': 'no-NO',   // Norwegian
    'ii': 'ii',      // Nuosu
    'nr': 'nr',      // South Ndebele
    'oc': 'oc',      // Occitan
    'oj': 'oj',      // Ojibwe
    'cu': 'cu',      // Old Church Slavonic
    'om': 'om',      // Oromo
    'or': 'or-IN',   // Oriya
    'os': 'os',      // Ossetian
    'pa': 'pa-IN',   // Panjabi
    'pi': 'pi',      // Pāli
    'fa': 'fa-IR',   // Persian
    'pl': 'pl-PL',   // Polish
    'ps': 'ps',      // Pashto
    'pt': 'pt-PT',   // Portuguese
    'qu': 'qu',      // Quechua
    'rm': 'rm',      // Romansh
    'rn': 'rn',      // Kirundi
    'ro': 'ro-RO',   // Romanian
    'ru': 'ru-RU',   // Russian
    'sa': 'sa',      // Sanskrit
    'sc': 'sc',      // Sardinian
    'sd': 'sd',      // Sindhi
    'se': 'se',      // Northern Sami
    'sm': 'sm',      // Samoan
    'sg': 'sg',      // Sango
    'sr': 'sr-RS',   // Serbian
    'gd': 'gd',      // Gaelic
    'sn': 'sn',      // Shona
    'si': 'si-LK',   // Sinhala
    'sk': 'sk-SK',   // Slovak
    'sl': 'sl-SI',   // Slovenian
    'so': 'so-SO',   // Somali
    'st': 'st',      // Southern Sotho
    'es': 'es-ES',   // Spanish
    'su': 'su',      // Sundanese
    'sw': 'sw-KE',   // Swahili
    'ss': 'ss',      // Swati
    'sv': 'sv-SE',   // Swedish
    'ta': 'ta-IN',   // Tamil
    'te': 'te-IN',   // Telugu
    'tg': 'tg-TJ',   // Tajik
    'th': 'th-TH',   // Thai
    'ti': 'ti',      // Tigrinya
    'bo': 'bo',      // Tibetan
    'tk': 'tk-TM',   // Turkmen
    'tl': 'tl-PH',   // Tagalog
    'tn': 'tn',      // Tswana
    'to': 'to',      // Tonga
    'tr': 'tr-TR',   // Turkish
    'ts': 'ts',      // Tsonga
    'tt': 'tt',      // Tatar
    'tw': 'tw',      // Twi
    'ty': 'ty',      // Tahitian
    'ug': 'ug',      // Uighur
    'uk': 'uk-UA',   // Ukrainian
    'ur': 'ur-PK',   // Urdu
    'uz': 'uz-UZ',   // Uzbek
    've': 've',      // Venda
    'vi': 'vi-VN',   // Vietnamese
    'vo': 'vo',      // Volapük
    'wa': 'wa',      // Walloon
    'cy': 'cy-GB',   // Welsh
    'wo': 'wo',      // Wolof
    'fy': 'fy',      // Western Frisian
    'xh': 'xh',      // Xhosa
    'yi': 'yi',      // Yiddish
    'yo': 'yo',      // Yoruba
    'za': 'za',      // Zhuang
    'zu': 'zu-ZA'    // Zulu
};