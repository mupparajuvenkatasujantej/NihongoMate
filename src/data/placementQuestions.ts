import type { PresentLevel, PlacementQuestion } from "../types";

export const placementQuestions: Record<PresentLevel, PlacementQuestion[]> = {
  "0": [],

  N5: [
    {
      category: "Vocabulary",
      question: "What is the meaning of ねこ (neko)?",
      options: ["Dog", "Cat", "Bird", "Fish"],
      correctAnswer: 1,
      explanation: "ねこ (neko) means cat."
    },
    {
      category: "Vocabulary",
      question: "What is the reading of 山?",
      options: ["かわ", "やま", "そら", "うみ"],
      correctAnswer: 1,
      explanation: "山 is read as やま (yama), meaning mountain."
    },
    {
      category: "Vocabulary",
      question: "What does あした mean?",
      options: ["Yesterday", "Today", "Tomorrow", "Morning"],
      correctAnswer: 2,
      explanation: "あした (ashita) means tomorrow."
    },
    {
      category: "Grammar",
      question: "わたし ___ がくせいです。",
      options: ["は", "を", "に", "で"],
      correctAnswer: 0,
      explanation: "は marks the topic of the sentence."
    },
    {
      category: "Grammar",
      question: "これは ___ ですか。",
      options: ["だれ", "なん", "どこ", "いつ"],
      correctAnswer: 1,
      explanation: "なん means what. The sentence asks what this is."
    },
    {
      category: "Grammar",
      question: "きのう、学校へ ___。",
      options: ["いきます", "いきました", "いきません", "いきませんか"],
      correctAnswer: 1,
      explanation: "いきました is the past polite form of いきます."
    },
    {
      category: "Reading",
      question: "わたしは たなかです。学生です。 What is Tanaka?",
      options: ["A teacher", "A student", "A doctor", "A shopkeeper"],
      correctAnswer: 1,
      explanation: "学生です means I am a student."
    },
    {
      category: "Reading",
      question: "これは わたしの ほんです。 Whose book is it?",
      options: ["Your book", "Tanaka's book", "My book", "The teacher's book"],
      correctAnswer: 2,
      explanation: "わたしの means my."
    },
    {
      category: "Reading",
      question: "まいあさ 7じに おきます。 What time does the person wake up?",
      options: ["6 o'clock", "7 o'clock", "8 o'clock", "9 o'clock"],
      correctAnswer: 1,
      explanation: "7じ means 7 o'clock."
    },
    {
      category: "Reading",
      question: "日曜日に ともだちと えいがを みます。 What does the person do on Sunday?",
      options: [
        "Reads a book",
        "Watches a movie with a friend",
        "Studies Japanese",
        "Plays football"
      ],
      correctAnswer: 1,
      explanation: "えいがをみます means watches a movie."
    }
  ],

  N4: [
    {
      category: "Vocabulary",
      question: "What does 準備 (じゅんび) mean?",
      options: ["Preparation", "Exercise", "Promise", "Journey"],
      correctAnswer: 0,
      explanation: "準備 (じゅんび) means preparation."
    },
    {
      category: "Vocabulary",
      question: "What is the meaning of 必要 (ひつよう)?",
      options: ["Difficult", "Necessary", "Convenient", "Dangerous"],
      correctAnswer: 1,
      explanation: "必要 (ひつよう) means necessary or needed."
    },
    {
      category: "Vocabulary",
      question: "What does 運転 (うんてん) mean?",
      options: ["Driving", "Cooking", "Cleaning", "Shopping"],
      correctAnswer: 0,
      explanation: "運転 (うんてん) means driving or operating a vehicle."
    },
    {
      category: "Grammar",
      question: "雨が降っている ___、出かけません。",
      options: ["ので", "まで", "しか", "ながら"],
      correctAnswer: 0,
      explanation: "ので expresses a reason: Because it is raining, I won't go out."
    },
    {
      category: "Grammar",
      question: "日本語を話せる ___ なりました。",
      options: ["ことに", "ように", "ために", "そうに"],
      correctAnswer: 1,
      explanation: "ようになりました expresses a change or new ability."
    },
    {
      category: "Grammar",
      question: "ここで写真を ___ もいいですか。",
      options: ["撮って", "撮る", "撮った", "撮り"],
      correctAnswer: 0,
      explanation: "The pattern ～てもいいですか asks permission."
    },
    {
      category: "Reading",
      question: "田中さんは毎朝6時に起きて、7時に朝ご飯を食べます。何時に朝ご飯を食べますか。",
      options: ["6時", "7時", "8時", "9時"],
      correctAnswer: 1,
      explanation: "The passage says 7時に朝ご飯を食べます."
    },
    {
      category: "Reading",
      question: "昨日は忙しかったので、友達に電話できませんでした。なぜ電話できませんでしたか。",
      options: [
        "友達がいなかったから",
        "電話が壊れていたから",
        "忙しかったから",
        "寝ていたから"
      ],
      correctAnswer: 2,
      explanation: "忙しかったので means because I was busy."
    },
    {
      category: "Reading",
      question: "この店は月曜日から金曜日まで開いています。土曜日と日曜日は休みです。いつ休みですか。",
      options: [
        "Monday and Tuesday",
        "Wednesday and Thursday",
        "Friday and Saturday",
        "Saturday and Sunday"
      ],
      correctAnswer: 3,
      explanation: "The shop is closed on Saturday and Sunday."
    },
    {
      category: "Reading",
      question: "ミラーさんは日本に来てから3年になります。今、日本の会社で働いています。ミラーさんは今どこで働いていますか。",
      options: [
        "アメリカの学校",
        "日本の会社",
        "自分の店",
        "大学"
      ],
      correctAnswer: 1,
      explanation: "日本の会社で働いています means works at a company in Japan."
    }
  ],
  N3: [
    {
      category: "Vocabulary",
      question: "What does 環境 (かんきょう) mean?",
      options: ["Economy", "Environment", "Education", "Technology"],
      correctAnswer: 1,
      explanation: "環境 (かんきょう) means environment."
    },
    {
      category: "Vocabulary",
      question: "What does 影響 (えいきょう) mean?",
      options: ["Influence or effect", "Experience", "Opportunity", "Responsibility"],
      correctAnswer: 0,
      explanation: "影響 means influence or effect."
    },
    {
      category: "Vocabulary",
      question: "What does 確認 (かくにん) mean?",
      options: ["Comparison", "Confirmation", "Competition", "Communication"],
      correctAnswer: 1,
      explanation: "確認 means confirmation or checking."
    },
    {
      category: "Grammar",
      question: "毎日練習した ___、日本語が上手になりました。",
      options: ["おかげで", "かわりに", "ところで", "ばかりで"],
      correctAnswer: 0,
      explanation: "おかげで expresses a positive result caused by something."
    },
    {
      category: "Grammar",
      question: "この薬を飲めば、すぐに治る ___ ありません。",
      options: ["ことでは", "わけでは", "ものでは", "はずでは"],
      correctAnswer: 1,
      explanation: "わけではありません means it does not necessarily mean that."
    },
    {
      category: "Grammar",
      question: "電車に乗っている ___、友達に会いました。",
      options: ["うちに", "ために", "ように", "かわりに"],
      correctAnswer: 0,
      explanation: "うちに describes something happening while another situation continues."
    },
    {
      category: "Reading",
      question: "最近、健康のために毎朝30分歩くことにしました。雨の日は家で運動しています。この人は雨の日に何をしますか。",
      options: [
        "散歩します",
        "何もしません",
        "家で運動します",
        "仕事に行きます"
      ],
      correctAnswer: 2,
      explanation: "雨の日は家で運動しています means exercising at home on rainy days."
    },
    {
      category: "Reading",
      question: "新しい図書館は駅の近くにできました。以前の図書館より広く、夜9時まで利用できます。新しい図書館について正しいものはどれですか。",
      options: [
        "駅から遠い",
        "以前より狭い",
        "夜9時まで利用できる",
        "日曜日は利用できない"
      ],
      correctAnswer: 2,
      explanation: "The passage says the library can be used until 9 p.m."
    },
    {
      category: "Reading",
      question: "山田さんは大学を卒業した後、外国で働きたいと思っています。そのため、今英語を勉強しています。山田さんが英語を勉強している理由は何ですか。",
      options: [
        "大学に入りたいから",
        "外国で働きたいから",
        "旅行したくないから",
        "先生になりたいから"
      ],
      correctAnswer: 1,
      explanation: "そのため connects studying English with the goal of working abroad."
    },
    {
      category: "Reading",
      question: "この会社では、社員が自由に働く時間を選べます。しかし、毎週金曜日には全員が会社に来なければなりません。金曜日について正しいものはどれですか。",
      options: [
        "誰も会社に来なくていい",
        "全員が会社に来る必要がある",
        "会社が休みになる",
        "社員は家で働かなければならない"
      ],
      correctAnswer: 1,
      explanation: "全員が会社に来なければなりません means everyone must come to the office."
    }
  ],
  N2: [
    {
      category: "Vocabulary",
      question: "What does 促進 (そくしん) mean?",
      options: ["Prevention", "Promotion or acceleration", "Cancellation", "Investigation"],
      correctAnswer: 1,
      explanation: "促進 means promoting or accelerating progress."
    },
    {
      category: "Vocabulary",
      question: "What does 著しい (いちじるしい) mean?",
      options: ["Remarkable", "Ordinary", "Uncertain", "Temporary"],
      correctAnswer: 0,
      explanation: "著しい means remarkable or significant."
    },
    {
      category: "Vocabulary",
      question: "What does 把握 (はあく) mean?",
      options: ["To forget", "To grasp or understand", "To refuse", "To compare"],
      correctAnswer: 1,
      explanation: "把握 means to grasp, understand, or comprehend something."
    },
    {
      category: "Grammar",
      question: "彼は忙しい ___、毎日日本語を勉強している。",
      options: ["にもかかわらず", "にしたがって", "にとって", "に限って"],
      correctAnswer: 0,
      explanation: "にもかかわらず means despite or in spite of."
    },
    {
      category: "Grammar",
      question: "この問題は、専門家 ___ 解決できないほど難しい。",
      options: ["にしても", "でさえ", "に対して", "として"],
      correctAnswer: 1,
      explanation: "でさえ means even, emphasizing an unexpected example."
    },
    {
      category: "Grammar",
      question: "努力した ___、必ず成功するとは限らない。",
      options: ["からといって", "にしたら", "ところで", "に応じて"],
      correctAnswer: 0,
      explanation: "からといって means just because something is true, it does not necessarily mean another thing."
    },
    {
      category: "Reading",
      question: "最近、多くの企業が在宅勤務を導入している。通勤時間がなくなるという利点がある一方、社員同士のコミュニケーションが減るという問題もある。この文章で述べられている在宅勤務の問題は何ですか。",
      options: [
        "仕事の量が増えること",
        "通勤時間が長くなること",
        "社員同士の交流が減ること",
        "給料が下がること"
      ],
      correctAnswer: 2,
      explanation: "社員同士のコミュニケーションが減る means communication between employees decreases."
    },
    {
      category: "Reading",
      question: "この地域では、観光客の増加によって経済が活発になった。しかし、ごみの増加や交通渋滞など、住民の生活に影響を与える問題も起きている。文章の内容に合うものはどれですか。",
      options: [
        "観光客の増加には良い影響しかない",
        "観光客の増加は地域経済を活発にしたが、問題も生んだ",
        "住民は観光客を歓迎していない",
        "交通渋滞は完全になくなった"
      ],
      correctAnswer: 1,
      explanation: "The passage describes both economic benefits and problems caused by increased tourism."
    },
    {
      category: "Reading",
      question: "新しい制度は、社員の意見を取り入れて作られた。そのため、多くの社員が制度に満足している。ただし、実際に運用してみると、いくつか改善すべき点も見つかった。この文章から分かることは何ですか。",
      options: [
        "制度は社員の意見を無視して作られた",
        "全員が制度に不満を持っている",
        "制度には改善の余地がある",
        "制度はすぐに廃止される"
      ],
      correctAnswer: 2,
      explanation: "改善すべき点 means points that should be improved."
    },
    {
      category: "Reading",
      question: "最近、環境への関心が高まり、使い捨ての商品を減らそうとする動きが広がっている。企業も再利用できる容器を導入するなど、さまざまな取り組みを進めている。企業が行っている取り組みは何ですか。",
      options: [
        "商品の値段を上げる",
        "再利用できる容器を導入する",
        "使い捨て商品を増やす",
        "商品の販売をやめる"
      ],
      correctAnswer: 1,
      explanation: "再利用できる容器を導入する means introducing reusable containers."
    }
  ],
  N1: [
    {
      category: "Vocabulary",
      question: "What does 踏襲 (とうしゅう) mean?",
      options: [
        "To reject a tradition",
        "To follow an existing method or precedent",
        "To create something new",
        "To investigate a problem"
      ],
      correctAnswer: 1,
      explanation: "踏襲 means following an established method, policy, or precedent."
    },
    {
      category: "Vocabulary",
      question: "What does 懸念 (けねん) mean?",
      options: ["Concern or apprehension", "Confidence", "Achievement", "Permission"],
      correctAnswer: 0,
      explanation: "懸念 means concern or apprehension about something."
    },
    {
      category: "Vocabulary",
      question: "What does 余儀なくされる mean?",
      options: [
        "To be strongly encouraged",
        "To be given permission",
        "To be forced to do something",
        "To be completely forgotten"
      ],
      correctAnswer: 2,
      explanation: "余儀なくされる means being compelled or forced to do something."
    },
    {
      category: "Grammar",
      question: "彼の説明は、事実に基づいている ___、説得力がある。",
      options: ["だけあって", "にしては", "どころか", "ものなら"],
      correctAnswer: 0,
      explanation: "だけあって expresses that something is as expected because of a particular reason."
    },
    {
      category: "Grammar",
      question: "この計画は、十分な検討 ___ 実施された。",
      options: ["を経て", "に反して", "を問わず", "に先立って"],
      correctAnswer: 0,
      explanation: "を経て means after going through a process or stage."
    },
    {
      category: "Grammar",
      question: "彼は困難な状況 ___、冷静さを失わなかった。",
      options: ["にあっても", "といえども", "をもって", "に至って"],
      correctAnswer: 0,
      explanation: "にあっても means even in a particular difficult situation."
    },
    {
      category: "Reading",
      question: "近年、人工知能の発展により、さまざまな業務が自動化されつつある。作業の効率が向上する一方で、人間にしかできない判断や創造性の重要性も改めて注目されている。この文章の主な内容は何ですか。",
      options: [
        "人工知能はすべての仕事をなくす",
        "自動化によって効率が上がる一方、人間独自の能力も重要である",
        "人間の判断力は必要なくなった",
        "人工知能の発展は止まっている"
      ],
      correctAnswer: 1,
      explanation: "The passage discusses both the efficiency of AI and the continuing importance of human judgment and creativity."
    },
    {
      category: "Reading",
      question: "ある調査によると、読書を習慣にしている人は、情報を多角的に捉える傾向があるという。ただし、読書量が多ければ必ずしも理解力が高まるわけではなく、内容について考えながら読むことが重要だと指摘されている。この文章で筆者が最も伝えたいことは何ですか。",
      options: [
        "本はできるだけ速く読むべきだ",
        "読書量だけが理解力を決める",
        "内容を考えながら読むことが重要である",
        "読書をする必要はない"
      ],
      correctAnswer: 2,
      explanation: "The passage emphasizes thoughtful reading rather than simply reading many books."
    },
    {
      category: "Reading",
      question: "企業が新しい商品を開発する際には、消費者の需要を把握することが欠かせない。しかし、現在の需要だけに注目すると、将来の変化に対応できない可能性がある。そのため、長期的な視点から市場の動向を分析する必要がある。この文章の内容に合うものはどれですか。",
      options: [
        "現在の需要だけを調べれば十分である",
        "市場の分析は商品開発には必要ない",
        "将来の変化も考慮して市場を分析する必要がある",
        "消費者の意見は無視するべきである"
      ],
      correctAnswer: 2,
      explanation: "The passage stresses analyzing market trends from a long-term perspective."
    },
    {
      category: "Reading",
      question: "技術の進歩によって、私たちの生活は便利になった。しかし、便利さを追求するあまり、環境への負担が増えてしまう場合もある。今後は、技術の発展と環境保護を両立させる取り組みが求められる。この文章で述べられている課題は何ですか。",
      options: [
        "技術の発展をすべて止めること",
        "便利さと環境保護を両立させること",
        "環境問題を無視すること",
        "昔の生活に完全に戻ること"
      ],
      correctAnswer: 1,
      explanation: "The passage identifies balancing technological progress with environmental protection as an important challenge."
    }
  ],
};
