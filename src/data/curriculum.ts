// ============================================================
// My Portuguese Tutor — A1 Curriculum
// Aligned to: Referencial Camões PLE + CAPLE ACESSO (A1) exam
// All content: European Portuguese (pt-PT)
// ============================================================

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type CapleComponent = 'listening' | 'speaking' | 'reading' | 'writing'
export type ExerciseType = 'listen_repeat' | 'multiple_choice' | 'fill_blank' | 'match_pairs'

export interface VocabItem {
  id: string
  portuguese: string
  english: string
  phonetic?: string  // EP pronunciation hint for learners
  example?: string   // usage in a sentence
}

export interface DialogueLine {
  speaker: 'A' | 'B'
  portuguese: string
  english: string
}

export interface Exercise {
  id: string
  type: ExerciseType
  prompt: string
  promptAudio?: string       // text to speak aloud
  options?: string[]         // for multiple_choice
  answer: string
  explanation?: string
}

export interface Lesson {
  id: string
  module: number
  order: number
  title: string
  titlePt: string
  description: string
  cefrLevel: CefrLevel
  capleComponents: CapleComponent[]
  vocabulary: VocabItem[]
  dialogue?: DialogueLine[]
  exercises: Exercise[]
  xpReward: number
  culturalNote?: string
}

export interface Module {
  id: number
  title: string
  titlePt: string
  cefrLevel: CefrLevel
  lessons: Lesson[]
}

// ============================================================
// MODULE 0 — Pronunciation Essentials
// ============================================================
const module0: Module = {
  id: 0,
  title: 'Pronunciation Essentials',
  titlePt: 'Pronúncia Essencial',
  cefrLevel: 'A1',
  lessons: [
    {
      id: 'a1-0-1',
      module: 0,
      order: 1,
      title: 'EP Vowels',
      titlePt: 'Vogais do Português Europeu',
      description: 'European Portuguese vowels sound very different from Brazilian. Unstressed vowels are reduced or nearly silent — this is the key to sounding natural.',
      cefrLevel: 'A1',
      capleComponents: ['listening', 'speaking'],
      xpReward: 30,
      culturalNote: 'European Portuguese is often described as sounding "closed" and fast compared to Brazilian. Portuguese people swallow unstressed vowels — "professor" sounds like "prufeSOR", not "pro-fes-SOR".',
      vocabulary: [
        { id: 'v-a', portuguese: 'a', english: 'ah (stressed) / uh (unstressed)', phonetic: 'casa → KAH-zuh', example: 'casa' },
        { id: 'v-e', portuguese: 'e', english: 'eh (stressed) / silent (unstressed)', phonetic: 'mesa → MAY-zuh', example: 'mesa' },
        { id: 'v-o', portuguese: 'o', english: 'oh (stressed) / oo (unstressed)', phonetic: 'gosto → GOSHtoo', example: 'gosto' },
        { id: 'v-lh', portuguese: 'lh', english: 'like "lli" in "million"', phonetic: 'filho → FEElyoo', example: 'filho' },
        { id: 'v-nh', portuguese: 'nh', english: 'like "ny" in "canyon"', phonetic: 'vinho → VEEnyoo', example: 'vinho' },
        { id: 'v-nasal', portuguese: 'ão', english: 'nasal "ow" — unique to Portuguese', phonetic: 'não → nowNG', example: 'não' },
      ],
      exercises: [
        {
          id: 'ex-a1-0-1-1',
          type: 'listen_repeat',
          prompt: 'Listen and repeat: casa (house)',
          promptAudio: 'casa',
          answer: 'casa',
        },
        {
          id: 'ex-a1-0-1-2',
          type: 'listen_repeat',
          prompt: 'Listen and repeat: não (no)',
          promptAudio: 'não',
          answer: 'não',
        },
        {
          id: 'ex-a1-0-1-3',
          type: 'multiple_choice',
          prompt: 'In European Portuguese, unstressed vowels are:',
          answer: 'Reduced or nearly silent',
          options: ['Reduced or nearly silent', 'Pronounced fully like in Spanish', 'Always long and open', 'The same as in Brazilian Portuguese'],
        },
        {
          id: 'ex-a1-0-1-4',
          type: 'listen_repeat',
          prompt: 'Listen and repeat: vinho (wine)',
          promptAudio: 'vinho',
          answer: 'vinho',
        },
        {
          id: 'ex-a1-0-1-5',
          type: 'listen_repeat',
          prompt: 'Listen and repeat: filho (son)',
          promptAudio: 'filho',
          answer: 'filho',
        },
      ],
    },
  ],
}

// ============================================================
// MODULE 1 — Greetings & Courtesy
// ============================================================
const module1: Module = {
  id: 1,
  title: 'Greetings & Courtesy',
  titlePt: 'Cumprimentos e Cortesia',
  cefrLevel: 'A1',
  lessons: [
    {
      id: 'a1-1-1',
      module: 1,
      order: 1,
      title: 'Hello & Goodbye',
      titlePt: 'Olá e Adeus',
      description: 'The most essential phrases in any language. Master these and every interaction in Portugal starts well.',
      cefrLevel: 'A1',
      capleComponents: ['listening', 'speaking'],
      xpReward: 50,
      culturalNote: 'In Portugal, it\'s normal to greet strangers — shopkeepers, people in lifts, neighbours. "Bom dia" (morning), "Boa tarde" (afternoon) and "Boa noite" (evening/night) are used constantly. "Olá" is informal; use "Bom dia/Boa tarde" in formal contexts.',
      vocabulary: [
        { id: 'v-ola', portuguese: 'Olá', english: 'Hello (informal)', phonetic: 'oh-LAH' },
        { id: 'v-bom-dia', portuguese: 'Bom dia', english: 'Good morning', phonetic: 'bom-JEE-uh' },
        { id: 'v-boa-tarde', portuguese: 'Boa tarde', english: 'Good afternoon', phonetic: 'BOH-uh TAR-duh' },
        { id: 'v-boa-noite', portuguese: 'Boa noite', english: 'Good evening / Good night', phonetic: 'BOH-uh NOY-tuh' },
        { id: 'v-adeus', portuguese: 'Adeus', english: 'Goodbye (formal)', phonetic: 'uh-DAY-oosh' },
        { id: 'v-ate-logo', portuguese: 'Até logo', english: 'See you later', phonetic: 'uh-TAY LOH-goo' },
        { id: 'v-ate-amanha', portuguese: 'Até amanhã', english: 'See you tomorrow', phonetic: 'uh-TAY uh-muh-NYAH' },
        { id: 'v-tchau', portuguese: 'Tchau', english: 'Bye (very informal)', phonetic: 'chow' },
      ],
      dialogue: [
        { speaker: 'A', portuguese: 'Bom dia!', english: 'Good morning!' },
        { speaker: 'B', portuguese: 'Bom dia! Tudo bem?', english: 'Good morning! All good?' },
        { speaker: 'A', portuguese: 'Tudo bem, obrigada. E você?', english: 'All good, thank you. And you?' },
        { speaker: 'B', portuguese: 'Também, obrigado. Até logo!', english: 'Also good, thank you. See you later!' },
        { speaker: 'A', portuguese: 'Até logo!', english: 'See you later!' },
      ],
      exercises: [
        { id: 'ex-a1-1-1-1', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Bom dia', answer: 'Bom dia' },
        { id: 'ex-a1-1-1-2', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Boa tarde', answer: 'Boa tarde' },
        { id: 'ex-a1-1-1-3', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Boa noite', answer: 'Boa noite' },
        {
          id: 'ex-a1-1-1-4',
          type: 'multiple_choice',
          prompt: 'It\'s 3pm. What do you say when entering a shop?',
          promptAudio: 'Boa tarde',
          answer: 'Boa tarde',
          options: ['Bom dia', 'Boa tarde', 'Boa noite', 'Adeus'],
          explanation: 'Boa tarde = Good afternoon, used roughly 12pm–7pm.',
        },
        {
          id: 'ex-a1-1-1-5',
          type: 'multiple_choice',
          prompt: 'How do you say "See you tomorrow"?',
          answer: 'Até amanhã',
          options: ['Até logo', 'Adeus', 'Até amanhã', 'Tchau'],
        },
        { id: 'ex-a1-1-1-6', type: 'listen_repeat', prompt: 'Listen and repeat the full greeting', promptAudio: 'Bom dia! Tudo bem?', answer: 'Bom dia! Tudo bem?' },
      ],
    },
    {
      id: 'a1-1-2',
      module: 1,
      order: 2,
      title: 'Courtesy Phrases',
      titlePt: 'Frases de Cortesia',
      description: 'Please, thank you, sorry — the phrases that make every interaction polite.',
      cefrLevel: 'A1',
      capleComponents: ['listening', 'speaking'],
      xpReward: 50,
      culturalNote: 'In Portugal, "se faz favor" is more common than "por favor" in spoken requests — e.g. calling a waiter: "Se faz favor!" Portuguese people also say "obrigado" (male speaker) or "obrigada" (female speaker) — the gender matches the speaker, not the thing received.',
      vocabulary: [
        { id: 'v-pfavor', portuguese: 'Por favor', english: 'Please', phonetic: 'por fuh-VOR' },
        { id: 'v-sfavor', portuguese: 'Se faz favor', english: 'Please (more common in EP)', phonetic: 'suh fash fuh-VOR' },
        { id: 'v-obrigado', portuguese: 'Obrigado', english: 'Thank you (said by males)', phonetic: 'oh-bree-GAH-doo' },
        { id: 'v-obrigada', portuguese: 'Obrigada', english: 'Thank you (said by females)', phonetic: 'oh-bree-GAH-duh' },
        { id: 'v-denada', portuguese: 'De nada', english: 'You\'re welcome', phonetic: 'duh NAH-duh' },
        { id: 'v-desculpe', portuguese: 'Desculpe', english: 'Sorry / Excuse me', phonetic: 'desh-KUL-puh' },
        { id: 'v-comlicenca', portuguese: 'Com licença', english: 'Excuse me (to pass)', phonetic: 'kom lee-SEN-suh' },
        { id: 'v-sim', portuguese: 'Sim', english: 'Yes', phonetic: 'seem' },
        { id: 'v-nao', portuguese: 'Não', english: 'No', phonetic: 'nowNG' },
      ],
      dialogue: [
        { speaker: 'A', portuguese: 'Com licença, pode ajudar-me?', english: 'Excuse me, can you help me?' },
        { speaker: 'B', portuguese: 'Claro! Com prazer.', english: 'Of course! With pleasure.' },
        { speaker: 'A', portuguese: 'Obrigada!', english: 'Thank you!' },
        { speaker: 'B', portuguese: 'De nada!', english: 'You\'re welcome!' },
      ],
      exercises: [
        { id: 'ex-a1-1-2-1', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Obrigado', answer: 'Obrigado' },
        { id: 'ex-a1-1-2-2', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Obrigada', answer: 'Obrigada' },
        { id: 'ex-a1-1-2-3', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Se faz favor', answer: 'Se faz favor' },
        {
          id: 'ex-a1-1-2-4',
          type: 'multiple_choice',
          prompt: 'A woman wants to say "thank you." Which form does she use?',
          answer: 'Obrigada',
          options: ['Obrigado', 'Obrigada', 'De nada', 'Por favor'],
          explanation: 'The ending agrees with the speaker\'s gender: obrigado (male), obrigada (female).',
        },
        {
          id: 'ex-a1-1-2-5',
          type: 'multiple_choice',
          prompt: 'How do you call a waiter\'s attention in Portugal?',
          answer: 'Se faz favor!',
          options: ['Por favor!', 'Se faz favor!', 'Com licença!', 'Desculpe!'],
          explanation: '"Se faz favor" is the standard way to call someone in a café or restaurant in Portugal.',
        },
        { id: 'ex-a1-1-2-6', type: 'listen_repeat', prompt: 'Listen and repeat: Não', promptAudio: 'Não', answer: 'Não' },
      ],
    },
  ],
}

// ============================================================
// MODULE 2 — Introductions
// ============================================================
const module2: Module = {
  id: 2,
  title: 'Introductions',
  titlePt: 'Apresentações',
  cefrLevel: 'A1',
  lessons: [
    {
      id: 'a1-2-1',
      module: 2,
      order: 1,
      title: 'What\'s Your Name?',
      titlePt: 'Como se chama?',
      description: 'Introduce yourself and ask others their name. Essential for the ACESSO speaking component.',
      cefrLevel: 'A1',
      capleComponents: ['speaking', 'listening'],
      xpReward: 50,
      culturalNote: 'Portuguese people typically greet with a handshake in formal contexts. Between friends, women exchange kisses on both cheeks (right cheek first). Men often pat each other on the back. You\'ll hear "Muito prazer!" (Very pleased to meet you) in any introduction.',
      vocabulary: [
        { id: 'v-nome', portuguese: 'O nome', english: 'The name', phonetic: 'oo NOH-muh' },
        { id: 'v-chamo', portuguese: 'Chamo-me...', english: 'My name is... (lit: I call myself)', phonetic: 'SHAH-moo muh' },
        { id: 'v-eunome', portuguese: 'O meu nome é...', english: 'My name is...', phonetic: 'oo may NOH-muh eh' },
        { id: 'v-comosc', portuguese: 'Como se chama?', english: 'What is your name? (formal)', phonetic: 'KOH-moo suh SHAH-muh' },
        { id: 'v-comote', portuguese: 'Como te chamas?', english: 'What is your name? (informal)', phonetic: 'KOH-moo tuh SHAH-mush' },
        { id: 'v-prazer', portuguese: 'Muito prazer!', english: 'Very pleased to meet you!', phonetic: 'MWEE-too pruh-ZER' },
        { id: 'v-igualmente', portuguese: 'Igualmente!', english: 'Likewise!', phonetic: 'ee-gwal-MEN-tuh' },
      ],
      dialogue: [
        { speaker: 'A', portuguese: 'Olá! Como se chama?', english: 'Hello! What\'s your name?' },
        { speaker: 'B', portuguese: 'Chamo-me Carla. E você?', english: 'My name is Carla. And you?' },
        { speaker: 'A', portuguese: 'O meu nome é João. Muito prazer!', english: 'My name is João. Very pleased to meet you!' },
        { speaker: 'B', portuguese: 'Igualmente!', english: 'Likewise!' },
      ],
      exercises: [
        { id: 'ex-a1-2-1-1', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Chamo-me', answer: 'Chamo-me' },
        { id: 'ex-a1-2-1-2', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Como se chama?', answer: 'Como se chama?' },
        { id: 'ex-a1-2-1-3', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Muito prazer!', answer: 'Muito prazer!' },
        {
          id: 'ex-a1-2-1-4',
          type: 'multiple_choice',
          prompt: 'How do you say "My name is..."?',
          answer: 'Chamo-me...',
          options: ['Chamo-me...', 'Como se chama?', 'Muito prazer!', 'Igualmente!'],
        },
        {
          id: 'ex-a1-2-1-5',
          type: 'multiple_choice',
          prompt: 'Someone says "Muito prazer!" to you. What do you reply?',
          answer: 'Igualmente!',
          options: ['Igualmente!', 'De nada!', 'Até logo!', 'Tudo bem?'],
          explanation: '"Igualmente" = "Likewise" — the natural response to "Muito prazer".',
        },
        { id: 'ex-a1-2-1-6', type: 'listen_repeat', prompt: 'Listen and repeat the full exchange', promptAudio: 'Olá! Chamo-me João. Muito prazer!', answer: 'Olá! Chamo-me João. Muito prazer!' },
      ],
    },
    {
      id: 'a1-2-2',
      module: 2,
      order: 2,
      title: 'Where Are You From?',
      titlePt: 'De onde é?',
      description: 'Talk about nationality and where you\'re from. High-frequency topic in the ACESSO speaking exam.',
      cefrLevel: 'A1',
      capleComponents: ['speaking', 'listening'],
      xpReward: 50,
      culturalNote: 'Portugal is a small country but very international — you\'ll find people from many countries. Saying where you\'re from in Portuguese is always appreciated and opens conversations.',
      vocabulary: [
        { id: 'v-deonde', portuguese: 'De onde é?', english: 'Where are you from?', phonetic: 'duh ON-duh eh' },
        { id: 'v-soudeX', portuguese: 'Sou de...', english: 'I\'m from...', phonetic: 'soh duh' },
        { id: 'v-portugal', portuguese: 'Portugal', english: 'Portugal', phonetic: 'por-too-GAL' },
        { id: 'v-reino', portuguese: 'O Reino Unido', english: 'The United Kingdom', phonetic: 'oo RAY-noo oo-NEE-doo' },
        { id: 'v-franca', portuguese: 'A França', english: 'France', phonetic: 'uh FRAN-suh' },
        { id: 'v-italia', portuguese: 'A Itália', english: 'Italy', phonetic: 'uh ee-TAH-lyuh' },
        { id: 'v-alemanha', portuguese: 'A Alemanha', english: 'Germany', phonetic: 'uh uh-luh-MAH-nyuh' },
        { id: 'v-eua', portuguese: 'Os Estados Unidos', english: 'The United States', phonetic: 'oosh esh-TAH-doosh oo-NEE-doosh' },
        { id: 'v-nacionalidade', portuguese: 'A nacionalidade', english: 'Nationality', phonetic: 'uh nuh-syoh-nuh-lee-DAH-duh' },
        { id: 'v-sou', portuguese: 'Sou...', english: 'I am...', phonetic: 'soh' },
        { id: 'v-portugues', portuguese: 'português / portuguesa', english: 'Portuguese (m/f)', phonetic: 'por-too-GAYSH / por-too-GAY-zuh' },
        { id: 'v-ingles', portuguese: 'inglês / inglesa', english: 'English (m/f)', phonetic: 'een-GLAYSH / een-GLAY-zuh' },
      ],
      dialogue: [
        { speaker: 'A', portuguese: 'De onde é?', english: 'Where are you from?' },
        { speaker: 'B', portuguese: 'Sou de Inglaterra. E você?', english: 'I\'m from England. And you?' },
        { speaker: 'A', portuguese: 'Sou português, sou de Lisboa.', english: 'I\'m Portuguese, I\'m from Lisbon.' },
        { speaker: 'B', portuguese: 'Que cidade bonita!', english: 'What a beautiful city!' },
      ],
      exercises: [
        { id: 'ex-a1-2-2-1', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'De onde é?', answer: 'De onde é?' },
        { id: 'ex-a1-2-2-2', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Sou de Portugal', answer: 'Sou de Portugal' },
        {
          id: 'ex-a1-2-2-3',
          type: 'multiple_choice',
          prompt: 'How do you say "I am from France"?',
          answer: 'Sou de França',
          options: ['Sou de França', 'Estou de França', 'Venho França', 'De onde França'],
        },
        {
          id: 'ex-a1-2-2-4',
          type: 'multiple_choice',
          prompt: 'A woman from Portugal says she is...',
          answer: 'portuguesa',
          options: ['português', 'portuguesa', 'portugais', 'portugesa'],
          explanation: 'Nationality adjectives agree with gender: português (male), portuguesa (female).',
        },
        { id: 'ex-a1-2-2-5', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Sou inglês, sou de Londres', answer: 'Sou inglês, sou de Londres' },
      ],
    },
  ],
}

// ============================================================
// MODULE 3 — Survival Phrases
// ============================================================
const module3: Module = {
  id: 3,
  title: 'Survival Phrases',
  titlePt: 'Frases de Sobrevivência',
  cefrLevel: 'A1',
  lessons: [
    {
      id: 'a1-3-1',
      module: 3,
      order: 1,
      title: 'I Don\'t Understand',
      titlePt: 'Não Entendo',
      description: 'When you\'re lost in a conversation — the phrases that buy you time and keep things going.',
      cefrLevel: 'A1',
      capleComponents: ['speaking', 'listening'],
      xpReward: 50,
      culturalNote: 'Don\'t be afraid to say you\'re learning! Portuguese people are generally very warm towards people learning their language. "Estou a aprender português" will almost always get you a smile and encouragement.',
      vocabulary: [
        { id: 'v-naoentendo', portuguese: 'Não entendo', english: 'I don\'t understand', phonetic: 'nowNG en-TEN-doo' },
        { id: 'v-repetem', portuguese: 'Pode repetir?', english: 'Can you repeat?', phonetic: 'POH-duh ruh-puh-TEER' },
        { id: 'v-devagar', portuguese: 'Fale mais devagar, por favor', english: 'Please speak more slowly', phonetic: 'FAH-luh mysh duh-vuh-GAR' },
        { id: 'v-oquequer', portuguese: 'O que quer dizer...?', english: 'What does ... mean?', phonetic: 'oo kuh KEHR dee-ZER' },
        { id: 'v-comodiz', portuguese: 'Como se diz... em português?', english: 'How do you say ... in Portuguese?', phonetic: 'KOH-moo suh deesh' },
        { id: 'v-falaingles', portuguese: 'Fala inglês?', english: 'Do you speak English?', phonetic: 'FAH-luh een-GLAYSH' },
        { id: 'v-aprender', portuguese: 'Estou a aprender português', english: 'I\'m learning Portuguese', phonetic: 'esh-TOH uh uh-pren-DER' },
        { id: 'v-percebo', portuguese: 'Percebo', english: 'I understand / I get it', phonetic: 'per-SAY-boo' },
      ],
      exercises: [
        { id: 'ex-a1-3-1-1', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Não entendo', answer: 'Não entendo' },
        { id: 'ex-a1-3-1-2', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Pode repetir?', answer: 'Pode repetir?' },
        { id: 'ex-a1-3-1-3', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Fale mais devagar, por favor', answer: 'Fale mais devagar, por favor' },
        {
          id: 'ex-a1-3-1-4',
          type: 'multiple_choice',
          prompt: 'Someone is speaking too fast. What do you say?',
          answer: 'Fale mais devagar, por favor',
          options: ['Não entendo', 'Fale mais devagar, por favor', 'Pode repetir?', 'Fala inglês?'],
        },
        { id: 'ex-a1-3-1-5', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Estou a aprender português', answer: 'Estou a aprender português' },
      ],
    },
  ],
}

// ============================================================
// MODULE 4 — Numbers & Time
// ============================================================
const module4: Module = {
  id: 4,
  title: 'Numbers & Time',
  titlePt: 'Números e Horas',
  cefrLevel: 'A1',
  lessons: [
    {
      id: 'a1-4-1',
      module: 4,
      order: 1,
      title: 'Numbers 0–20',
      titlePt: 'Números 0–20',
      description: 'Numbers are essential for prices, addresses, phone numbers, and telling the time.',
      cefrLevel: 'A1',
      capleComponents: ['listening', 'speaking'],
      xpReward: 50,
      vocabulary: [
        { id: 'v-zero', portuguese: 'zero', english: '0', phonetic: 'ZEH-roo' },
        { id: 'v-um', portuguese: 'um / uma', english: '1 (m/f)', phonetic: 'oom / OO-muh' },
        { id: 'v-dois', portuguese: 'dois / duas', english: '2 (m/f)', phonetic: 'doysh / DOO-ush' },
        { id: 'v-tres', portuguese: 'três', english: '3', phonetic: 'traysh' },
        { id: 'v-quatro', portuguese: 'quatro', english: '4', phonetic: 'KWAH-troo' },
        { id: 'v-cinco', portuguese: 'cinco', english: '5', phonetic: 'SEEN-koo' },
        { id: 'v-seis', portuguese: 'seis', english: '6', phonetic: 'saysh' },
        { id: 'v-sete', portuguese: 'sete', english: '7', phonetic: 'SEH-tuh' },
        { id: 'v-oito', portuguese: 'oito', english: '8', phonetic: 'OY-too' },
        { id: 'v-nove', portuguese: 'nove', english: '9', phonetic: 'NOH-vuh' },
        { id: 'v-dez', portuguese: 'dez', english: '10', phonetic: 'desh' },
        { id: 'v-onze', portuguese: 'onze', english: '11', phonetic: 'ON-zuh' },
        { id: 'v-doze', portuguese: 'doze', english: '12', phonetic: 'DOH-zuh' },
        { id: 'v-treze', portuguese: 'treze', english: '13', phonetic: 'TREH-zuh' },
        { id: 'v-catorze', portuguese: 'catorze', english: '14', phonetic: 'kuh-TOR-zuh' },
        { id: 'v-quinze', portuguese: 'quinze', english: '15', phonetic: 'KEEN-zuh' },
        { id: 'v-dezasseis', portuguese: 'dezasseis', english: '16', phonetic: 'duh-zuh-SAYSH' },
        { id: 'v-dezassete', portuguese: 'dezassete', english: '17', phonetic: 'duh-zuh-SEH-tuh' },
        { id: 'v-dezoito', portuguese: 'dezoito', english: '18', phonetic: 'duh-ZOY-too' },
        { id: 'v-dezanove', portuguese: 'dezanove', english: '19', phonetic: 'duh-zuh-NOH-vuh' },
        { id: 'v-vinte', portuguese: 'vinte', english: '20', phonetic: 'VEEN-tuh' },
      ],
      exercises: [
        { id: 'ex-a1-4-1-1', type: 'listen_repeat', prompt: 'Listen and repeat: 1 to 5', promptAudio: 'um, dois, três, quatro, cinco', answer: 'um dois três quatro cinco' },
        { id: 'ex-a1-4-1-2', type: 'listen_repeat', prompt: 'Listen and repeat: 6 to 10', promptAudio: 'seis, sete, oito, nove, dez', answer: 'seis sete oito nove dez' },
        {
          id: 'ex-a1-4-1-3',
          type: 'multiple_choice',
          prompt: 'How do you say 15 in Portuguese?',
          promptAudio: 'quinze',
          answer: 'quinze',
          options: ['catorze', 'quinze', 'dezasseis', 'doze'],
        },
        {
          id: 'ex-a1-4-1-4',
          type: 'multiple_choice',
          prompt: 'You hear "dezassete". What number is that?',
          promptAudio: 'dezassete',
          answer: '17',
          options: ['16', '17', '18', '19'],
        },
        { id: 'ex-a1-4-1-5', type: 'listen_repeat', prompt: 'Listen and repeat: 11 to 15', promptAudio: 'onze, doze, treze, catorze, quinze', answer: 'onze doze treze catorze quinze' },
      ],
    },
    {
      id: 'a1-4-2',
      module: 4,
      order: 2,
      title: 'What Time Is It?',
      titlePt: 'Que horas são?',
      description: 'Tell and ask for the time. Key for daily life and the ACESSO listening component.',
      cefrLevel: 'A1',
      capleComponents: ['listening', 'speaking'],
      xpReward: 50,
      culturalNote: 'Portugal uses the 24-hour clock in official contexts (trains, appointments) but the 12-hour clock in casual speech. "São duas da tarde" (it\'s 2 in the afternoon) is more natural than "São catorze horas" in conversation.',
      vocabulary: [
        { id: 'v-quehorassao', portuguese: 'Que horas são?', english: 'What time is it?', phonetic: 'kuh OH-rush sowNG' },
        { id: 'v-saox', portuguese: 'São... horas', english: 'It\'s ... o\'clock', phonetic: 'sowNG OH-rush' },
        { id: 'v-e1hora', portuguese: 'É uma hora', english: 'It\'s one o\'clock', phonetic: 'eh OO-muh OH-ruh' },
        { id: 'v-emeia', portuguese: 'e meia', english: 'half past', phonetic: 'ee MAY-uh' },
        { id: 'v-equarto', portuguese: 'e um quarto', english: 'quarter past', phonetic: 'ee oom KWAR-too' },
        { id: 'v-menquarto', portuguese: 'menos um quarto', english: 'quarter to', phonetic: 'MAY-noosh oom KWAR-too' },
        { id: 'v-manha', portuguese: 'da manhã', english: 'in the morning', phonetic: 'duh muh-NYAH' },
        { id: 'v-tarde2', portuguese: 'da tarde', english: 'in the afternoon', phonetic: 'duh TAR-duh' },
        { id: 'v-noite2', portuguese: 'da noite', english: 'at night', phonetic: 'duh NOY-tuh' },
      ],
      exercises: [
        { id: 'ex-a1-4-2-1', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Que horas são?', answer: 'Que horas são?' },
        { id: 'ex-a1-4-2-2', type: 'listen_repeat', prompt: 'Listen and repeat: it\'s 3 o\'clock', promptAudio: 'São três horas', answer: 'São três horas' },
        {
          id: 'ex-a1-4-2-3',
          type: 'multiple_choice',
          prompt: 'How do you say "It\'s half past two"?',
          answer: 'São duas e meia',
          options: ['São duas e meia', 'São duas horas', 'É duas e meia', 'São dois e meio'],
        },
        { id: 'ex-a1-4-2-4', type: 'listen_repeat', prompt: 'Listen and repeat: it\'s quarter past ten', promptAudio: 'São dez e um quarto', answer: 'São dez e um quarto' },
        {
          id: 'ex-a1-4-2-5',
          type: 'multiple_choice',
          prompt: 'You hear "São oito da manhã". What time is it?',
          promptAudio: 'São oito da manhã',
          answer: '8:00am',
          options: ['8:00am', '8:00pm', '18:00', '20:00'],
        },
      ],
    },
  ],
}

// ============================================================
// MODULE 5 — Ser vs. Estar
// ============================================================
const module5: Module = {
  id: 5,
  title: 'Ser vs. Estar',
  titlePt: 'Ser vs. Estar',
  cefrLevel: 'A1',
  lessons: [
    {
      id: 'a1-5-1',
      module: 5,
      order: 1,
      title: 'To Be (Permanent)',
      titlePt: 'Ser — características permanentes',
      description: '"Ser" is used for permanent or defining characteristics: identity, origin, nationality, relationships.',
      cefrLevel: 'A1',
      capleComponents: ['speaking', 'reading', 'writing'],
      xpReward: 60,
      culturalNote: 'This distinction doesn\'t exist in English — both "ser" and "estar" translate as "to be". It\'s the most important early grammar concept for English speakers learning Portuguese.',
      vocabulary: [
        { id: 'v-ser-eu', portuguese: 'eu sou', english: 'I am', phonetic: 'ay-oo soh' },
        { id: 'v-ser-tu', portuguese: 'tu és', english: 'you are (informal)', phonetic: 'too esh' },
        { id: 'v-ser-voce', portuguese: 'você é', english: 'you are (formal)', phonetic: 'voh-SAY eh' },
        { id: 'v-ser-ele', portuguese: 'ele/ela é', english: 'he/she is', phonetic: 'EH-luh eh' },
        { id: 'v-ser-nos', portuguese: 'nós somos', english: 'we are', phonetic: 'nosh SOH-moosh' },
        { id: 'v-ser-voces', portuguese: 'vocês são', english: 'you all are', phonetic: 'voh-SESH sowNG' },
        { id: 'v-ser-eles', portuguese: 'eles/elas são', english: 'they are', phonetic: 'EH-lush sowNG' },
      ],
      dialogue: [
        { speaker: 'A', portuguese: 'Você é professor?', english: 'Are you a teacher?' },
        { speaker: 'B', portuguese: 'Não, sou médico. E você?', english: 'No, I\'m a doctor. And you?' },
        { speaker: 'A', portuguese: 'Sou estudante. Sou de Espanha.', english: 'I\'m a student. I\'m from Spain.' },
        { speaker: 'B', portuguese: 'Ah, és espanhol?', english: 'Ah, you\'re Spanish?' },
        { speaker: 'A', portuguese: 'Sim, sou espanhol.', english: 'Yes, I\'m Spanish.' },
      ],
      exercises: [
        { id: 'ex-a1-5-1-1', type: 'listen_repeat', prompt: 'Listen and repeat the full conjugation of ser', promptAudio: 'eu sou, tu és, você é, ele é, nós somos, vocês são, eles são', answer: 'eu sou tu és você é ele é nós somos vocês são eles são' },
        {
          id: 'ex-a1-5-1-2',
          type: 'multiple_choice',
          prompt: 'Which verb describes nationality? "I am Portuguese."',
          answer: 'Sou português (ser)',
          options: ['Sou português (ser)', 'Estou português (estar)', 'Tenho português (ter)', 'Vou português (ir)'],
          explanation: 'Nationality is permanent → use ser: Sou português/portuguesa.',
        },
        {
          id: 'ex-a1-5-1-3',
          type: 'multiple_choice',
          prompt: 'Complete: "Nós ___ estudantes."',
          answer: 'somos',
          options: ['somos', 'são', 'é', 'sou'],
        },
        { id: 'ex-a1-5-1-4', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Sou médico. Sou de Portugal.', answer: 'Sou médico. Sou de Portugal.' },
        {
          id: 'ex-a1-5-1-5',
          type: 'multiple_choice',
          prompt: '"Eles ___ professores." What goes in the blank?',
          answer: 'são',
          options: ['são', 'somos', 'é', 'sou'],
        },
      ],
    },
    {
      id: 'a1-5-2',
      module: 5,
      order: 2,
      title: 'To Be (Temporary)',
      titlePt: 'Estar — estados temporários',
      description: '"Estar" is used for temporary states: how you feel, where you are right now.',
      cefrLevel: 'A1',
      capleComponents: ['speaking', 'reading', 'writing'],
      xpReward: 60,
      vocabulary: [
        { id: 'v-estar-eu', portuguese: 'eu estou', english: 'I am (temporary)', phonetic: 'ay-oo esh-TOH' },
        { id: 'v-estar-tu', portuguese: 'tu estás', english: 'you are (temporary, informal)', phonetic: 'too esh-TASH' },
        { id: 'v-estar-voce', portuguese: 'você está', english: 'you are (temporary, formal)', phonetic: 'voh-SAY esh-TAH' },
        { id: 'v-estar-nos', portuguese: 'nós estamos', english: 'we are (temporary)', phonetic: 'nosh esh-TAH-moosh' },
        { id: 'v-estar-eles', portuguese: 'eles estão', english: 'they are (temporary)', phonetic: 'EH-lush esh-TOWNG' },
        { id: 'v-bem', portuguese: 'bem', english: 'well / fine', phonetic: 'baNG' },
        { id: 'v-cansado', portuguese: 'cansado/a', english: 'tired', phonetic: 'kan-SAH-doo' },
        { id: 'v-doente', portuguese: 'doente', english: 'ill / sick', phonetic: 'DWEN-tuh' },
        { id: 'v-feliz', portuguese: 'feliz', english: 'happy', phonetic: 'fuh-LEESH' },
        { id: 'v-aqui', portuguese: 'aqui', english: 'here', phonetic: 'uh-KEE' },
        { id: 'v-emcasa', portuguese: 'em casa', english: 'at home', phonetic: 'aNG KAH-zuh' },
      ],
      dialogue: [
        { speaker: 'A', portuguese: 'Tudo bem? Como está?', english: 'All good? How are you?' },
        { speaker: 'B', portuguese: 'Estou bem, obrigado. E você?', english: 'I\'m fine, thank you. And you?' },
        { speaker: 'A', portuguese: 'Estou um pouco cansado. Onde está o João?', english: 'I\'m a little tired. Where is João?' },
        { speaker: 'B', portuguese: 'Está em casa. Está doente.', english: 'He\'s at home. He\'s ill.' },
      ],
      exercises: [
        { id: 'ex-a1-5-2-1', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Estou bem, obrigado', answer: 'Estou bem, obrigado' },
        {
          id: 'ex-a1-5-2-2',
          type: 'multiple_choice',
          prompt: 'Which sentence uses the correct verb?',
          answer: 'Estou cansado (I am tired)',
          options: ['Sou cansado (I am tired)', 'Estou cansado (I am tired)', 'Tenho cansado (I am tired)', 'Vou cansado (I am tired)'],
          explanation: 'Tiredness is a temporary state → use estar.',
        },
        {
          id: 'ex-a1-5-2-3',
          type: 'multiple_choice',
          prompt: '"Ela ___ em Lisboa." (She is in Lisbon right now)',
          answer: 'está',
          options: ['é', 'está', 'estou', 'são'],
          explanation: 'Location (temporary) → estar: ela está em Lisboa.',
        },
        { id: 'ex-a1-5-2-4', type: 'listen_repeat', prompt: 'Listen and repeat', promptAudio: 'Estamos em casa', answer: 'Estamos em casa' },
        {
          id: 'ex-a1-5-2-5',
          type: 'multiple_choice',
          prompt: '"Sou de Lisboa" vs. "Estou em Lisboa" — what\'s the difference?',
          answer: 'Sou de Lisboa = I\'m from Lisbon (permanent). Estou em Lisboa = I\'m in Lisbon now (temporary).',
          options: [
            'Sou de Lisboa = I\'m from Lisbon (permanent). Estou em Lisboa = I\'m in Lisbon now (temporary).',
            'They mean the same thing.',
            'Sou is more polite than Estou.',
            'Estou is used only for places.',
          ],
          explanation: 'This is the core ser/estar distinction: ser for permanent origins, estar for current location.',
        },
      ],
    },
  ],
}

// ============================================================
// FULL CURRICULUM EXPORT
// ============================================================
export const curriculum: Module[] = [module0, module1, module2, module3, module4, module5]

export const allLessons: Lesson[] = curriculum.flatMap(m => m.lessons)

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find(l => l.id === id)
}

export function getLessonIndex(id: string): number {
  return allLessons.findIndex(l => l.id === id)
}

export function getNextLesson(id: string): Lesson | undefined {
  const idx = getLessonIndex(id)
  return idx >= 0 ? allLessons[idx + 1] : undefined
}

// CEFR exam milestones
export const cefrExams = [
  {
    level: 'A1' as CefrLevel,
    exam: 'ACESSO',
    fullName: 'Certificado de Acesso ao Português',
    description: 'Your first official milestone. Proves basic communication in everyday situations.',
    url: 'https://caple.letras.ulisboa.pt/exame/1/acesso',
    fee: '~€60',
  },
  {
    level: 'A2' as CefrLevel,
    exam: 'CIPLE',
    fullName: 'Certificado Inicial de Português Língua Estrangeira',
    description: 'Required for Portuguese citizenship and permanent residency.',
    url: 'https://caple.letras.ulisboa.pt/exame/2/ciple',
    fee: '~€80',
  },
  {
    level: 'B1' as CefrLevel,
    exam: 'DEPLE',
    fullName: 'Diploma Elementar de Português Língua Estrangeira',
    description: 'Independent user. Handle most everyday situations.',
    url: 'https://caple.letras.ulisboa.pt/exames',
    fee: '~€90',
  },
  {
    level: 'B2' as CefrLevel,
    exam: 'DIPLE',
    fullName: 'Diploma Intermédio de Português Língua Estrangeira',
    description: 'Required for university admission in Portugal.',
    url: 'https://caple.letras.ulisboa.pt/exames',
    fee: '~€110',
  },
  {
    level: 'C1' as CefrLevel,
    exam: 'DAPLE',
    fullName: 'Diploma Avançado de Português Língua Estrangeira',
    description: 'Academic and professional fluency.',
    url: 'https://caple.letras.ulisboa.pt/exames',
    fee: '~€130',
  },
  {
    level: 'C2' as CefrLevel,
    exam: 'DUPLE',
    fullName: 'Diploma Universitário de Português Língua Estrangeira',
    description: 'Near-native mastery. The highest level.',
    url: 'https://caple.letras.ulisboa.pt/exames',
    fee: '~€140',
  },
]
