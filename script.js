/* ===== LANGUAGE TOGGLE ===== */
let currentLang = localStorage.getItem('ems_lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ems_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelector('.lang-text').textContent = lang === 'ar' ? 'English' : 'العربية';

  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
});

setLanguage(currentLang);

/* ===== PROGRESS BAR ===== */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById('progress-bar').style.width = progress + '%';
});

/* ===== SCENARIO TOGGLE ===== */
function toggleScenario(id) {
  const el = document.getElementById(id);
  el.classList.toggle('open');
}

/* ===== QUIZ ===== */
const quizData = [
  {
    question: { en: 'What does ISO 14001:2015 specify?', ar: 'ماذا تحدد الأيزو 14001:2015؟' },
    options: {
      en: ['Quality management requirements', 'Environmental management system requirements', 'Occupational health & safety requirements', 'Energy management requirements'],
      ar: ['متطلبات إدارة الجودة', 'متطلبات نظام الإدارة البيئية', 'متطلبات الصحة والسلامة المهنية', 'متطلبات إدارة الطاقة']
    },
    correct: 1,
    feedback: {
      en: 'ISO 14001:2015 specifies the requirements for an Environmental Management System (EMS).',
      ar: 'تحدد الأيزو 14001:2015 متطلبات نظام الإدارة البيئية (EMS).'
    }
  },
  {
    question: { en: 'What does PDCA stand for?', ar: 'ماذا تعني PDCA؟' },
    options: {
      en: ['Plan-Do-Check-Act', 'Prepare-Deliver-Control-Audit', 'Plan-Design-Check-Accept', 'Process-Data-Control-Analyze'],
      ar: ['خطط-نفذ-راجع-صحح', 'حضر-سلم-تحكم-راجع', 'خطط-صمم-تحقق-اقبل', 'عملية-بيانات-تحكم-تحليل']
    },
    correct: 0,
    feedback: {
      en: 'PDCA stands for Plan-Do-Check-Act — the continuous improvement cycle at the heart of ISO 14001.',
      ar: 'PDCA تعني خطط-نفذ-راجع-صحح — دورة التحسين المستمر في قلب الأيزو 14001.'
    }
  },
  {
    question: { en: 'Which of the following is an environmental aspect in a cable factory?', ar: 'أي مما يلي يعتبر جانبًا بيئيًا في مصنع الكابلات؟' },
    options: {
      en: ['Employee salaries', 'Copper scrap generation', 'Marketing budget', 'Office furniture'],
      ar: ['رواتب الموظفين', 'توليد مخلفات النحاس', 'ميزانية التسويق', 'أثاث المكتب']
    },
    correct: 1,
    feedback: {
      en: 'Copper scrap generation is an environmental aspect that can impact the environment through resource depletion and waste.',
      ar: 'توليد مخلفات النحاس هو جانب بيئي يمكن أن يؤثر على البيئة من خلال استنزاف الموارد والمخلفات.'
    }
  },
  {
    question: { en: 'What is the top priority in the waste hierarchy?', ar: 'ما هي الأولوية القصوى في التسلسل الهرمي للمخلفات؟' },
    options: {
      en: ['Recycle', 'Dispose', 'Prevent', 'Reuse'],
      ar: ['إعادة التدوير', 'التخلص', 'المنع', 'إعادة الاستخدام']
    },
    correct: 2,
    feedback: {
      en: 'Prevention is the most preferred option — avoiding waste creation in the first place.',
      ar: 'المنع هو الخيار الأكثر تفضيلاً — تجنب إنشاء المخلفات في المقام الأول.'
    }
  },
  {
    question: { en: 'What should you do FIRST in case of a chemical spill?', ar: 'ماذا يجب أن تفعل أولاً في حالة الانسكاب الكيميائي؟' },
    options: {
      en: ['Start cleaning immediately', 'Alert colleagues & supervisor', 'Find the spill kit', 'Call the fire department'],
      ar: ['ابدأ التنظيف فورًا', 'أبلغ الزملاء والمشرف', 'ابحث عن طقم الانسكاب', 'اتصل بقسم الإطفاء']
    },
    correct: 1,
    feedback: {
      en: 'First, alert nearby colleagues and your supervisor so that everyone is aware and can respond safely.',
      ar: 'أولاً، أبلغ الزملاء القريبين ومشرفك حتى يكون الجميع على علم ويمكنهم الاستجابة بأمان.'
    }
  },
  {
    question: { en: 'What does R.A.C.E. stand for in emergency response?', ar: 'ماذا تعني R.A.C.E. في الاستجابة للطوارئ؟' },
    options: {
      en: ['Run-Alert-Call-Escape', 'Remove-Alert-Contain-Evacuate', 'React-Act-Contain-Extinguish', 'Rescue-Alarm-Close-Exit'],
      ar: ['اركض-أنذر-اتصل-اهرب', 'أزل-أنذر-احتواء-إخلاء', 'تفاعل-تصرف-احتواء-إطفاء', 'أنقذ-إنذار-أغلق-اخرج']
    },
    correct: 1,
    feedback: {
      en: 'R.A.C.E. = Remove people from danger, Alert others, Contain the hazard if safe, Evacuate if necessary.',
      ar: 'R.A.C.E. = أزل الأشخاص من الخطر، أنذر الآخرين، احتواء الخطر إذا كان آمنًا، إخلاء إذا لزم الأمر.'
    }
  },
  {
    question: { en: 'Where should used chemical rags be disposed?', ar: 'أين يجب التخلص من الخرق الكيميائية المستعملة؟' },
    options: {
      en: ['General waste bin', 'Recycling bin', 'Hazardous waste container', 'Compost bin'],
      ar: ['حاوية المخلفات العامة', 'حاوية إعادة التدوير', 'حاوية المخلفات الخطرة', 'حاوية السماد']
    },
    correct: 2,
    feedback: {
      en: 'Chemical-contaminated rags are hazardous waste and must go in the designated hazardous waste container.',
      ar: 'الخرق الملوثة كيميائيًا هي مخلفات خطرة ويجب وضعها في حاوية المخلفات الخطرة المخصصة.'
    }
  },
  {
    question: { en: 'What is a nonconformity?', ar: 'ما هو عدم المطابقة؟' },
    options: {
      en: ['Meeting all requirements', 'Failing to meet a requirement', 'An emergency situation', 'A type of chemical'],
      ar: ['الوفاء بجميع المتطلبات', 'الفشل في تلبية متطلب', 'حالة طارئة', 'نوع من المواد الكيميائية']
    },
    correct: 1,
    feedback: {
      en: 'A nonconformity is a failure to meet a requirement — whether procedural, legal, or operational.',
      ar: 'عدم المطابقة هو الفشل في تلبية متطلب — سواء كان إجرائيًا أو قانونيًا أو تشغيليًا.'
    }
  },
  {
    question: { en: 'Who is responsible for following EMS procedures?', ar: 'من المسؤول عن اتباع إجراءات نظام الإدارة البيئية؟' },
    options: {
      en: ['Only the EHS manager', 'Only top management', 'Every employee', 'External auditors'],
      ar: ['مدير البيئة والصحة والسلامة فقط', 'الإدارة العليا فقط', 'كل موظف', 'المراجعون الخارجيون']
    },
    correct: 2,
    feedback: {
      en: 'Every employee at every level is responsible for following EMS procedures and contributing to environmental performance.',
      ar: 'كل موظف في كل مستوى مسؤول عن اتباع إجراءات نظام الإدارة البيئية والمساهمة في الأداء البيئي.'
    }
  },
  {
    question: { en: 'What should you do if you find an unlabeled chemical container?', ar: 'ماذا تفعل إذا وجدت حاوية كيميائية غير موسومة؟' },
    options: {
      en: ['Open it and smell to identify it', 'Pour it down the drain', 'Isolate it, label as unknown, and report it', 'Mix it with other chemicals to test'],
      ar: ['افتحها واشمها للتعرف عليها', 'اسكبها في المصرف', 'اعزلها، وسّمها كغير معروفة، وأبلغ عنها', 'امزجها مع مواد كيميائية أخرى للاختبار']
    },
    correct: 2,
    feedback: {
      en: 'Never open or smell unknown chemicals. Isolate the container, label it "UNKNOWN — DO NOT USE", and report to your supervisor and EHS team.',
      ar: 'لا تفتح أو تشم المواد الكيميائية غير المعروفة أبدًا. اعزل الحاوية، ووسمها بـ "غير معروفة — لا تستخدم"، وأبلغ مشرفك وفريق البيئة والسلامة.'
    }
  }
];

let qIndex = 0;
let qScore = 0;
let qAnswered = false;

const qContainer = document.getElementById('quiz-container');
const qResult = document.getElementById('quiz-result');
const qNum = document.getElementById('q-num');
const qScoreEl = document.getElementById('q-score');
const qQuestion = document.getElementById('quiz-question');
const qOptions = document.getElementById('quiz-options');
const qFeedback = document.getElementById('quiz-feedback');
const qNext = document.getElementById('quiz-next');
const qRestart = document.getElementById('quiz-restart');
const resultText = document.getElementById('result-text');

function loadQuestion() {
  qAnswered = false;
  qNext.style.display = 'none';
  qFeedback.className = 'quiz-feedback';
  qFeedback.style.display = 'none';

  const q = quizData[qIndex];
  qNum.textContent = qIndex + 1;
  qScoreEl.textContent = qScore;
  qQuestion.textContent = q.question[currentLang];

  qOptions.innerHTML = '';
  q.options[currentLang].forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i));
    qOptions.appendChild(btn);
  });
}

function selectAnswer(selected) {
  if (qAnswered) return;
  qAnswered = true;

  const q = quizData[qIndex];
  const options = qOptions.querySelectorAll('.quiz-option');

  options.forEach((opt, i) => {
    opt.classList.add('disabled');
    if (i === q.correct) opt.classList.add('correct');
    if (i === selected && i !== q.correct) opt.classList.add('wrong');
  });

  const isCorrect = selected === q.correct;
  if (isCorrect) qScore++;

  qFeedback.textContent = q.feedback[currentLang];
  qFeedback.className = 'quiz-feedback show ' + (isCorrect ? 'fb-correct' : 'fb-wrong');
  qFeedback.style.display = 'block';
  qScoreEl.textContent = qScore;

  if (qIndex < quizData.length - 1) {
    qNext.style.display = 'block';
  } else {
    setTimeout(showResult, 1500);
  }
}

qNext.addEventListener('click', () => {
  qIndex++;
  if (qIndex < quizData.length) loadQuestion();
});

function showResult() {
  qContainer.style.display = 'none';
  qResult.style.display = 'block';
  const pct = Math.round((qScore / quizData.length) * 100);
  const passed = pct >= 60;
  const iconEl = document.getElementById('result-icon');
  if (passed) {
    iconEl.className = 'result-icon pass';
    iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>';
  } else {
    iconEl.className = 'result-icon fail';
    iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>';
  }
  const enText = passed
    ? `Congratulations! You scored ${qScore}/${quizData.length} (${pct}%). You have successfully completed the OXA EMS ISO 14001 awareness training.`
    : `You scored ${qScore}/${quizData.length} (${pct}%). You need 60% to pass. Please review the material and try again.`;
  const arText = passed
    ? `تهانينا! لقد حصلت على ${qScore}/${quizData.length} (${pct}%). لقد أكملت بنجاح التدريب التوعوي لأوكسا لإدارة البيئة ISO 14001.`
    : `لقد حصلت على ${qScore}/${quizData.length} (${pct}%). تحتاج 60% للنجاح. يرجى مراجعة المواد والمحاولة مرة أخرى.`;
  resultText.textContent = currentLang === 'en' ? enText : arText;
}

qRestart.addEventListener('click', () => {
  qIndex = 0;
  qScore = 0;
  qContainer.style.display = 'block';
  qResult.style.display = 'none';
  loadQuestion();
});

loadQuestion();

/* ===== RE-LOAD QUIZ ON LANG CHANGE ===== */
const origSetLang = setLanguage;
setLanguage = function(lang) {
  origSetLang(lang);
  const q = quizData[qIndex];
  if (q) {
    qQuestion.textContent = q.question[currentLang];
    const options = qOptions.querySelectorAll('.quiz-option');
    q.options[currentLang].forEach((text, i) => {
      if (options[i]) options[i].textContent = text;
    });
    if (qFeedback.textContent) {
      qFeedback.textContent = q.feedback[currentLang];
    }
    if (qResult.style.display === 'block') {
      showResult();
    }
  }
};
