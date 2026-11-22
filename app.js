/**
 * LearnVerse - Next-Gen AI Learning Platform
 * Core Application Engine & Interactions
 */

// Initialize Lucide Icons
function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLucide();
  initCosmicCanvas();
  initLanguage();
  initSearch();
  initTopicsAndFeatures();
  initModelSelector();
  initNotes();
  initFamilyModal();
  initDeviceSimulator();
  initThemeToggle();
});

/* ================= 1. COSMIC PARTICLES CANVAS ================= */
function initCosmicCanvas() {
  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 12000), 120);

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.3;
      this.speed = Math.random() * 0.15 + 0.03;
      this.opacity = Math.random() * 0.8 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.color = Math.random() > 0.4 ? 'rgba(168, 85, 247, ' : 'rgba(56, 189, 248, ';
    }
    update() {
      this.y -= this.speed;
      this.opacity += Math.sin(Date.now() * this.pulseSpeed) * 0.01;
      if (this.opacity < 0.1) this.opacity = 0.1;
      if (this.opacity > 0.9) this.opacity = 0.9;
      if (this.y < 0) {
        this.y = height;
        this.x = Math.random() * width;
      }
    }
    draw() {
      ctx.fillStyle = this.color + this.opacity + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Star());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ================= 2. BILINGUAL SUPPORT (বাংলা ও ENGLISH) ================= */
let currentLang = 'bn'; // Default to Bengali since user requested "banglay bol"

const translations = {
  en: {
    heroBadge: 'Next-Gen AI Learning Platform',
    heroTitle1: 'Learn Anything,',
    heroTitle2: 'Understand Everything.',
    heroSubtext: 'Your AI-powered learning companion — anytime, anywhere.',
    exploreTopics: 'Explore Popular Topics',
    powerfulFeatures: 'Powerful Learning Features',
    ctaTitle: 'Join LearnVerse Family',
    ctaSubtext: 'Be a part of our growing community of learners worldwide!',
    ctaBtn: 'Join Now',
    searchPlaceholder: 'Search anything... e.g. Photosynthesis, Black holes',
    langBtn: 'EN / বাংলা',
  },
  bn: {
    heroBadge: 'নেক্সট-জেন এআই লার্নিং প্ল্যাটফর্ম',
    heroTitle1: 'যেকোনো কিছু শিখুন,',
    heroTitle2: 'সবকিছু সহজভাবে বুঝুন।',
    heroSubtext: 'আপনার কৃত্রিম বুদ্ধিমত্তা চালিত বিশ্বস্ত শিক্ষার সাথী — যে কোনো সময়ে, যেকোনো জায়গায়।',
    exploreTopics: 'জনপ্রিয় বিষয়সমূহ অন্বেষণ করুন',
    powerfulFeatures: 'অত্যাধুনিক শিক্ষণ সুবিধাসমূহ',
    ctaTitle: 'লার্নভার্স পরিবারে যুক্ত হোন',
    ctaSubtext: 'বিশ্বব্যাপী হাজারো শিক্ষার্থীর সমৃদ্ধ কমিউনিটিতে আজই যুক্ত হোন!',
    ctaBtn: 'এখনই যুক্ত হোন',
    searchPlaceholder: 'যেকোনো বিষয় খুঁজুন... যেমন: সালোকসংশ্লেষণ, ব্ল্যাক হোল',
    langBtn: 'বাংলা / EN',
  }
};

function initLanguage() {
  const toggleBtn = document.getElementById('lang-quick-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'bn' : 'en';
      applyTranslations();
      showToast(currentLang === 'bn' ? 'ভাষা বাংলায় পরিবর্তিত হয়েছে!' : 'Language changed to English!');
    });
  }
  applyTranslations();
}

function applyTranslations() {
  const t = translations[currentLang];
  document.getElementById('hero-badge-text').innerText = t.heroBadge;
  document.getElementById('hero-title-1').innerText = t.heroTitle1;
  document.getElementById('hero-title-2').innerHTML = `<span class="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(217,70,239,0.35)]">${t.heroTitle2}</span>`;
  document.getElementById('hero-subtext').innerText = t.heroSubtext;
  document.getElementById('section-topics-title').innerText = t.exploreTopics;
  document.getElementById('section-features-title').innerText = t.powerfulFeatures;
  document.getElementById('cta-title').innerText = t.ctaTitle;
  document.getElementById('cta-subtext').innerText = t.ctaSubtext;
  document.getElementById('cta-btn-text').innerText = t.ctaBtn;
  document.getElementById('search-input').placeholder = t.searchPlaceholder;
  document.getElementById('lang-btn-text').innerText = t.langBtn;
}

/* ================= 3. AI KNOWLEDGE BASE & SEARCH ENGINE ================= */
const knowledgeBase = {
  photosynthesis: {
    icon: '🌱',
    tag: 'Biology & Botany',
    title: { en: 'Photosynthesis', bn: 'সালোকসংশ্লেষণ (Photosynthesis)' },
    explanation: {
      en: `Photosynthesis is the process by which green plants and certain organisms transform light energy into chemical energy. During photosynthesis in green plants, light energy is captured and used to convert water, carbon dioxide, and minerals into oxygen and energy-rich organic compounds (glucose).<br><br>
      <strong>Chemical Equation:</strong><br>
      <code class="text-xs text-purple-300 bg-purple-950/80 px-2 py-1 rounded">6CO₂ + 6H₂O + Light Energy ➔ C₆H₁₂O₆ + 6O₂</code><br><br>
      This fundamental process is the primary source of all organic matter and oxygen on Earth.`,
      bn: `সালোকসংশ্লেষণ (Photosynthesis) হলো এমন একটি জৈবরাসায়নিক প্রক্রিয়া যার মাধ্যমে সবুজ উদ্ভিদ সূর্যালোকের শক্তি কাজে লাগিয়ে পানি ও কার্বন ডাই-অক্সাইড থেকে শর্করা (গ্লুকোজ) তৈরি করে এবং উপজাত হিসেবে অক্সিজেন নির্গত করে।<br><br>
      <strong>রাসায়নিক সমীকরণ:</strong><br>
      <code class="text-xs text-purple-300 bg-purple-950/80 px-2 py-1 rounded">৬CO₂ + ৬H₂O + সূর্যালোক ➔ C₆H₁₂O₆ + ৬O₂</code><br><br>
      এই প্রক্রিয়ার কারণেই পৃথিবীর বায়ুমণ্ডলে জীবনধারণের জন্য প্রয়োজনীয় অক্সিজেন বজায় থাকে।`
    },
    quiz: {
      question: {
        en: 'What is the main byproduct released into the atmosphere during photosynthesis?',
        bn: 'সালোকসংশ্লেষণ প্রক্রিয়ায় উপজাত হিসেবে বায়ুমণ্ডলে কী নির্গত হয়?'
      },
      options: [
        { text: 'Oxygen (O₂)', correct: true },
        { text: 'Carbon Dioxide (CO₂)', correct: false },
        { text: 'Nitrogen (N₂)', correct: false },
        { text: 'Methane (CH₄)', correct: false }
      ],
      explanation: {
        en: 'Correct! Plants release Oxygen (O₂) as a vital byproduct.',
        bn: 'সঠিক! উদ্ভিদ প্রক্রিয়ার শেষে বায়ুমণ্ডলে প্রয়োজনীয় অক্সিজেন (O₂) ছাড়ে।'
      }
    }
  },
  science: {
    icon: '🪐',
    tag: 'Astrophysics & Cosmos',
    title: { en: 'Science: Exploring the Universe', bn: 'বিজ্ঞান: মহাবিশ্বের রহস্য অন্বেষণ' },
    explanation: {
      en: `The universe spans over 93 billion light-years in observable diameter, containing over two trillion galaxies! From gravitational waves to quantum mechanics, modern science uses telescopes like James Webb and particle colliders to understand cosmic origins.`,
      bn: `দৃশ্যমান মহাবিশ্ব ৯৩ বিলিয়ন আলোকবর্ষেরও বেশি বিস্তৃত এবং এতে আনুমানিক দুই ট্রিলিয়নেরও বেশি গ্যালাক্সি রয়েছে! আধুনিক বিজ্ঞান জেমস ওয়েব টেলিস্কোপ ও পার্টিকেল কোলাইডারের সাহায্যে মহাবিশ্বের সৃষ্টি ও রহস্য উন্মোচন করছে।`
    },
    quiz: {
      question: {
        en: 'Which planet in our solar system is known for its prominent rings?',
        bn: 'আমাদের সৌরজগতের কোন গ্রহটি তার চোখজুড়ানো বলয়ের জন্য সবচেয়ে বিখ্যাত?'
      },
      options: [
        { text: 'Saturn (শনি)', correct: true },
        { text: 'Mars (মঙ্গল)', correct: false },
        { text: 'Venus (শুক্র)', correct: false },
        { text: 'Mercury (বুধ)', correct: false }
      ],
      explanation: {
        en: 'Saturn has the most extensive and visible planetary ring system.',
        bn: 'শনি গ্রহের বলয় বরফ ও পাথরের টুকরো দিয়ে তৈরি এবং সৌরজগতের সবচেয়ে আকর্ষণীয়।'
      }
    }
  },
  history: {
    icon: '🏛️',
    tag: 'World History',
    title: { en: 'History: The Roman Colosseum', bn: 'ইতিহাস: রোমান কলোসিয়াম' },
    explanation: {
      en: `Constructed under the Flavian emperors in 70–80 AD, the Colosseum held up to 80,000 spectators for gladiatorial games, dramas, and public spectacles. It remains a marvel of ancient Roman architecture and hydraulic engineering.`,
      bn: `রোমান কলোসিয়াম খ্রিস্টীয় ৭০-৮০ অব্দে নির্মিত এক ঐতিহাসিক স্থাপত্য। এতে ৫০,০০০ থেকে ৮০,০০০ দর্শক একসাথে মল্লযুদ্ধ ও নাটক দেখতে পারত। এটি প্রাচীন রোমের স্থাপত্যবিদ্যার শ্রেষ্ঠ নিদর্শন।`
    },
    quiz: {
      question: {
        en: 'In which ancient city is the Colosseum located?',
        bn: 'বিখ্যাত কলোসিয়াম কোন প্রাচীন শহরে অবস্থিত?'
      },
      options: [
        { text: 'Rome (রোম)', correct: true },
        { text: 'Athens (এথেন্স)', correct: false },
        { text: 'Cairo (কায়রো)', correct: false },
        { text: 'Paris (প্যারিস)', correct: false }
      ],
      explanation: {
        en: 'The Colosseum stands in the heart of Rome, Italy.',
        bn: 'সঠিক! কলোসিয়াম ইতালির রোম শহরে অবস্থিত।'
      }
    }
  },
  geography: {
    icon: '🌍',
    tag: 'Earth & Planetary Science',
    title: { en: 'Geography: Planet Earth', bn: 'ভূগোল: আমাদের প্রিয় পৃথিবী' },
    explanation: {
      en: `Earth is the third planet from the Sun and the only astronomical object known to harbor life. Over 71% of its surface is covered by water, primarily oceans, maintaining the climate stability required for diverse ecosystems.`,
      bn: `সূর্য থেকে দূরত্বের হিসেবে পৃথিবী তৃতীয় গ্রহ এবং একমাত্র গ্রহ যেখানে প্রাণের অস্তিত্ব আবিষ্কৃত হয়েছে। ভূপৃষ্ঠের প্রায় ৭১% পানি দিয়ে আবৃত, যা জলবায়ু স্থিতিশীল রাখে।`
    },
    quiz: {
      question: {
        en: 'What percentage of Earth\'s surface is covered by water?',
        bn: 'পৃথিবীপৃষ্ঠের প্রায় কত শতাংশ জলভাগ?'
      },
      options: [
        { text: '~71%', correct: true },
        { text: '~50%', correct: false },
        { text: '~30%', correct: false },
        { text: '~90%', correct: false }
      ],
      explanation: {
        en: 'Approximately 71% of Earth is ocean and water bodies.',
        bn: 'সঠিক! পৃথিবীর প্রায় ৭১% পানি।'
      }
    }
  },
  mathematics: {
    icon: '📐',
    tag: 'Pure Mathematics',
    title: { en: 'Mathematics: The Language of the Universe', bn: 'গণিত: মহাবিশ্বের সার্বজনীন ভাষা' },
    explanation: {
      en: `Mathematics provides the logical structure underlying physics, computer science, and cryptography. From the golden ratio (φ) to Euler's identity (e^(iπ) + 1 = 0), math reveals harmony in nature and data.`,
      bn: `গণিত হলো যুক্তি ও বিজ্ঞানের ভিত্তি। পিথাগোরাসের সূত্র থেকে শুরু করে জটিল অ্যালগরিদম ও কোয়ান্টাম কম্পিউটিং—সবকিছুই গণিতের উপর প্রতিষ্ঠিত।`
    },
    quiz: {
      question: {
        en: 'What is the value of Pi (π) to two decimal places?',
        bn: 'পাই (π)-এর মান দুই দশমিক স্থান পর্যন্ত কত?'
      },
      options: [
        { text: '3.14', correct: true },
        { text: '2.71', correct: false },
        { text: '1.61', correct: false },
        { text: '3.41', correct: false }
      ],
      explanation: {
        en: 'Pi (π) is approximately 3.14159...',
        bn: 'সঠিক! পাই-এর মান প্রায় ৩.১৪।'
      }
    }
  },
  technology: {
    icon: '⚡',
    tag: 'Artificial Intelligence & Chips',
    title: { en: 'Technology: Neural Silicon & AI', bn: 'প্রযুক্তি: কৃত্রিম বুদ্ধিমত্তা ও নিউরাল চিপ' },
    explanation: {
      en: `Modern AI accelerators feature billions of transistors capable of quadrillions of tensor operations per second (TOPS), training large multimodal language models that can reason, code, and generate creative content.`,
      bn: `আধুনিক কৃত্রিম বুদ্ধিমত্তা চিপ ও জিপিইউ প্রতি সেকেন্ডে ট্রিলিয়ন গণনার মাধ্যমে লার্জ ল্যাঙ্গুয়েজ মডেল (LLM) ও নিউরাল নেটওয়ার্ক পরিচালনা করে প্রযুক্তি বিপ্লব ঘটাচ্ছে।`
    },
    quiz: {
      question: {
        en: 'What does "AI" stand for?',
        bn: 'AI এর পূর্ণরূপ কী?'
      },
      options: [
        { text: 'Artificial Intelligence', correct: true },
        { text: 'Automated Internet', correct: false },
        { text: 'Advanced Integration', correct: false },
        { text: 'Augmented Input', correct: false }
      ],
      explanation: {
        en: 'AI stands for Artificial Intelligence.',
        bn: 'সঠিক! AI মানে Artificial Intelligence বা কৃত্রিম বুদ্ধিমত্তা।'
      }
    }
  }
};

let currentModalLesson = null;

function initSearch() {
  const form = document.getElementById('global-search-form');
  const input = document.getElementById('search-input');
  const suggestionsBox = document.getElementById('search-suggestions');
  const suggestionsList = document.getElementById('suggestions-list');

  const mobileForm = document.getElementById('mobile-search-form');
  const mobileInput = document.getElementById('mobile-search-input');

  const sampleKeywords = ['Photosynthesis', 'Science', 'History', 'Geography', 'Mathematics', 'Technology', 'Quantum Computing'];

  function handleQuery(query) {
    if (!query) return;
    const clean = query.trim().toLowerCase();
    
    // Find closest match or default to photosynthesis
    let matchKey = 'photosynthesis';
    for (const key of Object.keys(knowledgeBase)) {
      if (clean.includes(key) || key.includes(clean)) {
        matchKey = key;
        break;
      }
    }
    openStudyLesson(matchKey);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleQuery(input.value);
      suggestionsBox.classList.add('hidden');
    });

    input.addEventListener('input', () => {
      const val = input.value.trim().toLowerCase();
      if (!val) {
        suggestionsBox.classList.add('hidden');
        return;
      }
      const matches = sampleKeywords.filter((k) => k.toLowerCase().includes(val));
      if (matches.length > 0) {
        suggestionsList.innerHTML = matches
          .map(
            (m) =>
              `<button class="w-full text-left px-3 py-1.5 text-xs text-purple-200 hover:bg-purple-600/30 rounded-lg flex items-center justify-between">
                <span>${m}</span>
                <span class="text-[10px] text-purple-400 font-mono">AI Lesson ➔</span>
              </button>`
          )
          .join('');
        suggestionsBox.classList.remove('hidden');

        suggestionsList.querySelectorAll('button').forEach((b) => {
          b.addEventListener('click', () => {
            const topic = b.querySelector('span').innerText;
            input.value = topic;
            handleQuery(topic);
            suggestionsBox.classList.add('hidden');
          });
        });
      } else {
        suggestionsBox.classList.add('hidden');
      }
    });

    // Close suggestion on outside click
    document.addEventListener('click', (e) => {
      if (!form.contains(e.target)) {
        suggestionsBox.classList.add('hidden');
      }
    });
  }

  if (mobileForm) {
    mobileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleQuery(mobileInput.value);
    });
  }
}

/* ================= 4. STUDY MODAL & LESSON RENDERER ================= */
function openStudyLesson(key) {
  const lesson = knowledgeBase[key] || knowledgeBase['photosynthesis'];
  currentModalLesson = { key, lesson };

  const modal = document.getElementById('study-modal');
  const iconContainer = document.getElementById('modal-icon-container');
  const tag = document.getElementById('modal-tag');
  const title = document.getElementById('modal-title');
  const explanation = document.getElementById('modal-explanation');

  iconContainer.innerText = lesson.icon;
  tag.innerText = lesson.tag;
  title.innerText = lesson.title[currentLang] || lesson.title.en;
  explanation.innerHTML = lesson.explanation[currentLang] || lesson.explanation.en;

  // Setup Quiz
  const qBox = document.getElementById('quiz-question');
  const optBox = document.getElementById('quiz-options');
  const feedback = document.getElementById('quiz-feedback');

  feedback.classList.add('hidden');
  qBox.innerText = lesson.quiz.question[currentLang] || lesson.quiz.question.en;

  optBox.innerHTML = lesson.quiz.options
    .map(
      (opt, idx) =>
        `<button class="quiz-opt-btn p-2.5 rounded-xl border border-purple-500/25 bg-[#170e3c] hover:bg-[#25155c] text-left transition flex items-center justify-between" data-correct="${opt.correct}">
          <span>${opt.text}</span>
          <span class="w-4 h-4 rounded-full border border-purple-400/40 flex items-center justify-center text-[10px]"></span>
        </button>`
    )
    .join('');

  optBox.querySelectorAll('.quiz-opt-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      optBox.querySelectorAll('.quiz-opt-btn').forEach((b) => {
        b.disabled = true;
        if (b.getAttribute('data-correct') === 'true') {
          b.classList.add('bg-emerald-900/60', 'border-emerald-400', 'text-emerald-200');
        } else {
          b.classList.add('opacity-40');
        }
      });

      feedback.classList.remove('hidden');
      if (isCorrect) {
        btn.classList.add('bg-emerald-900/80', 'border-emerald-400');
        feedback.className = 'text-xs p-2.5 rounded-xl font-medium bg-emerald-950/70 text-emerald-300 border border-emerald-500/30';
        feedback.innerText = lesson.quiz.explanation[currentLang] || lesson.quiz.explanation.en;
        triggerCelebration();
      } else {
        btn.classList.add('bg-rose-950/80', 'border-rose-400');
        feedback.className = 'text-xs p-2.5 rounded-xl font-medium bg-rose-950/70 text-rose-300 border border-rose-500/30';
        feedback.innerText = currentLang === 'bn' ? 'ভুল উত্তর! সঠিক উত্তরটি সবুজ চিহ্নে নির্দেশ করা হয়েছে।' : 'Incorrect! The right answer is highlighted in green.';
      }
    });
  });

  modal.classList.remove('hidden');
  initLucide();
}

/* ================= 5. TOPICS & FEATURES CARDS ================= */
function initTopicsAndFeatures() {
  // Topic Cards Click
  document.querySelectorAll('.topic-card').forEach((card) => {
    card.addEventListener('click', () => {
      const topic = card.getAttribute('data-topic').toLowerCase();
      openStudyLesson(topic);
    });
  });

  // Hero Robot Click
  const heroRobot = document.querySelector('.hero-floating-box');
  if (heroRobot) {
    heroRobot.addEventListener('click', () => {
      openStudyLesson('technology');
    });
  }

  // Feature Cards Click
  document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('click', () => {
      const feature = card.getAttribute('data-feature');
      if (feature === 'notes') {
        openNotesModal();
      } else if (feature === 'quiz') {
        openStudyLesson('photosynthesis');
      } else if (feature === 'lang') {
        currentLang = currentLang === 'en' ? 'bn' : 'en';
        applyTranslations();
        showToast(currentLang === 'bn' ? 'ভাষা বাংলায় পরিবর্তিত হয়েছে!' : 'Switched to English!');
      } else if (feature === 'ai-exp' || feature === 'visual' || feature === 'personalized') {
        openStudyLesson('science');
      }
    });
  });

  // Mode Pills
  document.querySelectorAll('.mode-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.mode-pill').forEach((p) => {
        p.classList.remove('active', 'bg-gradient-to-r', 'from-purple-600', 'to-indigo-600', 'text-white', 'shadow-glow-sm', 'border-purple-400/40');
        p.classList.add('bg-[#1a113f]/80', 'text-purple-200', 'border-purple-500/20');
      });
      pill.classList.add('active', 'bg-gradient-to-r', 'from-purple-600', 'to-indigo-600', 'text-white', 'shadow-glow-sm', 'border-purple-400/40');
      pill.classList.remove('bg-[#1a113f]/80', 'text-purple-200', 'border-purple-500/20');

      const name = pill.querySelector('.mode-name').innerText;
      showToast(`${name} activated ✨`);
    });
  });

  // Close Modals handler
  document.querySelectorAll('.modal-close-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('study-modal').classList.add('hidden');
      document.getElementById('notes-modal').classList.add('hidden');
      document.getElementById('family-modal').classList.add('hidden');
    });
  });

  // See all topics button
  const seeAll = document.getElementById('see-all-topics-btn');
  if (seeAll) {
    seeAll.addEventListener('click', () => {
      openStudyLesson('photosynthesis');
    });
  }
}

/* ================= 6. MODEL SELECTOR ================= */
function initModelSelector() {
  const btn = document.getElementById('model-select-btn');
  const dropdown = document.getElementById('model-dropdown');
  const nameSpan = document.getElementById('current-model-name');

  if (btn && dropdown) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    });

    document.querySelectorAll('.model-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const model = opt.getAttribute('data-model');
        nameSpan.innerText = model;
        dropdown.classList.add('hidden');
        showToast(`AI Model changed to ${model}`);
      });
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }
}

/* ================= 7. SMART NOTES SYSTEM ================= */
let savedNotes = [
  'Photosynthesis produces Glucose (C6H12O6) & Oxygen (O2)',
  'Colosseum in Rome held up to 80,000 spectators',
  'Earth surface is 71% water'
];

function initNotes() {
  const saveBtn = document.getElementById('save-note-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (currentModalLesson) {
        const title = currentModalLesson.lesson.title[currentLang] || currentModalLesson.lesson.title.en;
        const noteText = `[Lesson] ${title}: ${currentModalLesson.lesson.tag}`;
        savedNotes.unshift(noteText);
        showToast(currentLang === 'bn' ? 'নোটটি সফলভাবে সংরক্ষিত হয়েছে!' : 'Saved to Smart Notes!');
      }
    });
  }

  const addBtn = document.getElementById('add-note-btn');
  const input = document.getElementById('custom-note-input');
  if (addBtn && input) {
    addBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val) {
        savedNotes.unshift(val);
        input.value = '';
        renderNotes();
        showToast(currentLang === 'bn' ? 'নতুন নোট যোগ হয়েছে!' : 'Note added!');
      }
    });
  }
}

function openNotesModal() {
  renderNotes();
  document.getElementById('notes-modal').classList.remove('hidden');
  initLucide();
}

function renderNotes() {
  const list = document.getElementById('notes-list');
  if (!list) return;
  if (savedNotes.length === 0) {
    list.innerHTML = `<div class="text-center py-6 text-purple-300/40 text-xs">No notes saved yet. Search any topic and click "Save to Smart Notes".</div>`;
    return;
  }
  list.innerHTML = savedNotes
    .map(
      (n, i) =>
        `<div class="p-3 bg-[#180e3c] border border-purple-500/20 rounded-xl text-xs text-purple-100 flex items-start justify-between gap-3 group">
          <span class="flex-1">${n}</span>
          <button onclick="deleteNote(${i})" class="text-purple-400/50 hover:text-rose-400 transition" title="Delete">
            ✕
          </button>
        </div>`
    )
    .join('');
}

window.deleteNote = function (index) {
  savedNotes.splice(index, 1);
  renderNotes();
};

/* ================= 8. JOIN FAMILY MODAL & CONFETTI ================= */
function initFamilyModal() {
  const btn = document.getElementById('join-family-btn');
  const form = document.getElementById('family-form');

  if (btn) {
    btn.addEventListener('click', openFamilyModal);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('family-modal').classList.add('hidden');
      triggerCelebration();
      showToast(currentLang === 'bn' ? '🎉 লার্নভার্স পরিবারে স্বাগতম!' : '🎉 Welcome to LearnVerse Family!');
      form.reset();
    });
  }
}

function openFamilyModal() {
  document.getElementById('family-modal').classList.remove('hidden');
  initLucide();
}

function triggerCelebration() {
  if (window.confetti) {
    window.confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#a855f7', '#ec4899', '#38bdf8', '#facc15']
    });
  }
}

/* ================= 9. DEVICE / MOBILE PREVIEW SIMULATOR ================= */
function initDeviceSimulator() {
  const toggle = document.getElementById('device-toggle');
  const modal = document.getElementById('phone-simulator-modal');
  const close = document.getElementById('close-phone-btn');

  if (toggle && modal) {
    toggle.addEventListener('click', () => {
      modal.classList.remove('hidden');
      initLucide();
    });
  }
  if (close && modal) {
    close.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }
}

/* ================= 10. THEME & TOAST ================= */
function initThemeToggle() {
  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      showToast('Cyber Cosmic Mode (Optimized)');
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;
  msgEl.innerText = msg;
  toast.classList.remove('hidden');
  toast.classList.remove('translate-y-2');
  toast.classList.add('translate-y-0');

  setTimeout(() => {
    toast.classList.add('translate-y-2');
    toast.classList.add('hidden');
  }, 3200);
}
