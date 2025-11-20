// ================================================
// Affinia 診断ロジック & データ定義
// ・index.html / result.html / compatibility.html / about.html 共通
// ・テキスト差し替えは基本ここだけ触ればOK
// ================================================

// --------------------------------
// ストレージキーなどの共通定数
// --------------------------------
const AFFINIA_STORAGE_KEYS = {
  RESULT_TYPE: "affiniaResultType",    // 診断タイプ
  ANSWERS: "affiniaAnswers"           // 必要なら回答も保存（今は未使用）
};

// --------------------------------
// 16タイプ定義
// --------------------------------
// NOTE: 「labelShort」「aboutText」は about ページや相性ページで使い回せるよう設計
const AFFINIA_TYPES = {
  tsun_nyanko: {
    id: "tsun_nyanko",
    name: "ツンデレニャンコ",
    imagePath: "/img/types/ツンデレニャンコ.png",
    labelShort: "素直になりきれない優しさの人",
    copy: "表向きはちょっとツンとして見えるけれど、内側はかなり情に厚いタイプ。相手との距離感を大事にしつつ、自分なりのやり方でちゃんと支える。頼られると弱い。",
    tagline: "「別に心配なんかしてないし」って言いながら一番気にしてる人。",
    aboutText: "距離感と本音のバランスを大事にする、甘辛ミックスなバランサー。"
  },
  passion_hero: {
    id: "passion_hero",
    name: "情熱ヒーロー",
    imagePath: "/img/types/情熱ヒーロー.png",
    labelShort: "ノリと熱量で進む行動派",
    copy: "考える前にまず一歩踏み出すエンジンタイプ。熱量があるからこそ人を巻き込み、空気を変えていく。ただし、やりたいことが多すぎて燃え尽き注意。",
    tagline: "動きながら考えるからこそ、見える景色がある。",
    aboutText: "情熱と行動力で、周りのテンションを底上げしていくフロントランナー。"
  },
  cool_brain: {
    id: "cool_brain",
    name: "クールブレイン",
    imagePath: "/img/types/クールブレイン.png",
    labelShort: "一歩引いて全体を見る思考派",
    copy: "まずは情報を集めて整理してから動く慎重設計タイプ。感情に流されすぎない代わりに、心の揺れを外にはあまり出さない。冷静さの裏側にはちゃんと優しさがある。",
    tagline: "静かな場所で一番頼りにされがちな参謀ポジション。",
    aboutText: "ロジックと俯瞰視点で、みんなの暴走をやんわり整える頭脳担当。"
  },
  happy_bunny: {
    id: "happy_bunny",
    name: "ハッピーバニー",
    imagePath: "/img/types/ハッピーバニー.png",
    labelShort: "場の空気をふわっと明るくする人",
    copy: "その場にいるだけでなんとなく空気がやわらかくなるムードメーカー。難しい話よりも、心地よさや楽しさを重視。ちょっと抜けてるところも含めて愛されキャラ。",
    tagline: "「とりあえず一緒に笑っとこ」が世界をちょっと平和にする。",
    aboutText: "安心感とゆるさを届ける、空気改善系マスコット。"
  },
  iyashi_angel: {
    id: "iyashi_angel",
    name: "癒し天使",
    imagePath: "/img/types/癒し天使.png",
    labelShort: "そっと寄り添うケアの人",
    copy: "相手の小さな変化や違和感にすぐ気づく繊細センサー持ち。無理に励ますより、相手のペースに合わせてそばにいることを大事にする。自分のしんどさは後回しにしがち。",
    tagline: "「大丈夫？」の一言に、本気で心を込めるタイプ。",
    aboutText: "静かな優しさで、まわりのHPをじわっと回復させるヒーラー。"
  },
  playful_fox: {
    id: "playful_fox",
    name: "おちゃめキツネ",
    imagePath: "/img/types/おちゃめキツネ.png",
    labelShort: "ひねりと遊び心のトリックスター",
    copy: "ちょっとひねった発想やイタズラ心で場を動かすアイデアマン。空気を読みつつ、あえて予想外なことをして笑いを取りにいくタイプ。真面目すぎる空間が苦手。",
    tagline: "退屈なルールには、少しだけイタズラを。",
    aboutText: "場をほぐしつつ、本質だけは外さないスパイス担当。"
  },
  wise_owl: {
    id: "wise_owl",
    name: "博識フクロウ",
    imagePath: "/img/types/博識フクロウ.png",
    labelShort: "知識と分析で戦うインテリ枠",
    copy: "情報を集めて整理し、構造的に理解していくのが好きなタイプ。雑談より深いテーマが好きで、丁寧に説明してくれる先生ポジションになりがち。",
    tagline: "知識マニアだけど、ちゃんと人の役にも立てたい。",
    aboutText: "データとロジックで、世界を少しだけわかりやすくするナビゲーター。"
  },
  gorgeous_princess: {
    id: "gorgeous_princess",
    name: "ゴージャスプリンセス",
    imagePath: "/img/types/ゴージャスプリンセス.png",
    labelShort: "自分なりの美学を持つ主役気質",
    copy: "好きなものやこだわりがはっきりしていて、「どう見られるか」も含めてセルフプロデュースするタイプ。見た目だけじゃなく、内側の努力もちゃんと積み上げている。",
    tagline: "キラキラの裏で、誰にも見せない作業時間を積んでいる人。",
    aboutText: "世界観ごと自分をデザインする、セルフプロデューサー。"
  },
  dream_unicorn: {
    id: "dream_unicorn",
    name: "夢見るユニコーン",
    imagePath: "/img/types/夢見るユニコーン.png",
    labelShort: "理想と物語を大事にする人",
    copy: "現実の数字だけでは語れない「物語」や「意味」を探したくなるタイプ。ふとした妄想や空想から、新しいアイデアが生まれやすい。",
    tagline: "「だったら面白くない？」から世界を広げていく。",
    aboutText: "理想とロマンで、景色に彩りを足していくドリーマー。"
  },
  hardworker_bee: {
    id: "hardworker_bee",
    name: "頑張りミツバチ",
    imagePath: "/img/types/頑張りミツバチ.png",
    labelShort: "黙々コツコツ積み上げる努力家",
    copy: "任されたことをきっちりやり切りたい、責任感強めのタイプ。評価されるかどうかより、自分の中で「ちゃんとやった」と言えるかが大事。",
    tagline: "一気にじゃなくても、毎日の一歩でちゃんと進んでる。",
    aboutText: "小さなタスクを真面目に積み上げていく、現場の背骨。"
  },
  shy_sheep: {
    id: "shy_sheep",
    name: "もじもじヒツジ",
    imagePath: "/img/types/もじもじヒツジ.png",
    labelShort: "静かだけど、ちゃんと見てる人",
    copy: "自分から前に出るのはちょっと苦手だけど、人の気持ちや空気をよく観察しているタイプ。慎重だからこそ、言葉を選んで話す。",
    tagline: "声は小さめでも、思考はちゃんと深い。",
    aboutText: "目立たないところで世界をよく見ている、慎重観察タイプ。"
  },
  clumsy_squirrel: {
    id: "clumsy_squirrel",
    name: "ドジっ子リス",
    imagePath: "/img/types/ドジっ子リス.png",
    labelShort: "ちょっと抜けてる愛されポジ",
    copy: "忘れ物やミスも多いけれど、どこか憎めない空気をまとっているタイプ。完璧じゃないからこそ、人を安心させる不思議な存在。",
    tagline: "「またやっちゃった」が、場を少しだけ和ませている。",
    aboutText: "うっかりと笑いで、張り詰めた空気をほどくムードメーカー。"
  },
  punk_hedgehog: {
    id: "punk_hedgehog",
    name: "パンクハリネズミ",
    imagePath: "/img/types/パンクハリネズミ.png",
    labelShort: "違和感に噛みつく反骨スピリット",
    copy: "みんながスルーしがちな「それおかしくない？」を見逃さないタイプ。表現はちょっとトゲトゲしてても、根っこには筋の通った正義感がある。",
    tagline: "とがってるようで、本当はかなり真面目。",
    aboutText: "空気よりも「自分の正しさ」を優先するチェック役。"
  },
  lazy_sloth: {
    id: "lazy_sloth",
    name: "マイペースナマケモノ",
    imagePath: "/img/types/マイペースナマケモノ.png",
    labelShort: "自分のペースは死守したい",
    copy: "必要以上に急がず、できるだけエネルギー消費を少なく生きたいタイプ。サボりたいわけではなく、ムダを減らしたい効率厨でもある。",
    tagline: "ちゃんとやるところと、力を抜くところを見極めたい。",
    aboutText: "自分らしいペースを守りながら、長期戦に強いサバイバー。"
  },
  loyal_dog: {
    id: "loyal_dog",
    name: "健気ワンコ",
    imagePath: "/img/types/健気ワンコ.png",
    labelShort: "信じた人にはとことん尽くす",
    copy: "一度「この人」と決めた相手には、本気で尽くしてしまうタイプ。期待に応えたい気持ちが強くて、自分のことを後回しにしがち。",
    tagline: "不器用なくらい、まっすぐでいたい。",
    aboutText: "信頼と引き換えに、全力で支える献身系サポーター。"
  },
  glitter_idol: {
    id: "glitter_idol",
    name: "キラキラアイドル",
    imagePath: "/img/types/キラキラアイドル.png",
    labelShort: "みんなの視線を集める発信者",
    copy: "人前に立つことや、発信することに抵抗が少ないタイプ。応援されることに喜びを感じる一方で、期待に応えなきゃとプレッシャーも抱えやすい。",
    tagline: "拍手の裏で、ちゃんと自分も守りたい。",
    aboutText: "「見られること」を味方にして、自分と世界を盛り上げる担当。"
  }
};

// --------------------------------
// 質問データ（9問）
// --------------------------------
const AFFINIA_TEXT = {
  introTitle: "性格にとらわれすぎず、\nいまの自分をゆるく言語化。",
  introLead: "9つの質問に答えるだけで、いまのあなたに近い Affinia タイプと、その雰囲気がわかります。",
  introNote:
    "直感で「これかな」と思うものを選べばOK。\n正解・不正解はないので、テストというより自分の取扱説明書づくりくらいの気持ちでどうぞ。",
  startButton: "1分で診断スタート"
};

const AFFINIA_QUESTIONS = [
  {
    id: 1,
    text: "予定のない休日、朝のスタートは？",
    options: [
      { text: "ゆっくり整えてから動きたい", typeKey: "cool_brain" },
      { text: "とりあえず外に出てから考える", typeKey: "passion_hero" },
      { text: "好きな動画や漫画を見ながらまったり", typeKey: "happy_bunny" },
      { text: "その日の気分で柔軟に決める", typeKey: "tsun_nyanko" }
    ]
  },
  {
    id: 2,
    text: "新しいことを始めるとき、いちばん近いのは？",
    options: [
      { text: "まず情報集めて、やるか慎重に決める", typeKey: "wise_owl" },
      { text: "とりあえずやってみてから調整する", typeKey: "passion_hero" },
      { text: "友だちや周りを巻き込んでスタートしたい", typeKey: "happy_bunny" },
      { text: "こっそり1人で始めて、うまくいったら話す", typeKey: "tsun_nyanko" }
    ]
  },
  {
    id: 3,
    text: "人から何か頼まれたときのスタンスは？",
    options: [
      { text: "内容を整理してから、引き受けるか判断する", typeKey: "cool_brain" },
      { text: "必要なら自分から前のめりに引き受ける", typeKey: "passion_hero" },
      { text: "みんなが助かりそうならできるだけ動きたい", typeKey: "iyashi_angel" },
      { text: "表向きはクールだけど、裏でちゃんとやる", typeKey: "tsun_nyanko" }
    ]
  },
  {
    id: 4,
    text: "ちょっと落ち込んだとき、どう立て直す？",
    options: [
      { text: "原因を紙に書き出して整理する", typeKey: "cool_brain" },
      { text: "身体を動かして強制的にテンション上げる", typeKey: "passion_hero" },
      { text: "誰かと話したり、好きなものに甘える", typeKey: "iyashi_angel" },
      { text: "平気なふりしつつ、1人の時間でこっそり回復", typeKey: "tsun_nyanko" }
    ]
  },
  {
    id: 5,
    text: "仕事や勉強で、うれしい褒め言葉は？",
    options: [
      { text: "「考え方がすごく整理されてるね」", typeKey: "cool_brain" },
      { text: "「行動力あるよね、本当尊敬する」", typeKey: "passion_hero" },
      { text: "「いるだけで空気がやわらぐ」", typeKey: "happy_bunny" },
      { text: "「さりげない気づかいがありがたい」", typeKey: "iyashi_angel" }
    ]
  },
  {
    id: 6,
    text: "グループで動くとき、気づいたらどのポジション？",
    options: [
      { text: "全体の段取りやタスクを整理してる", typeKey: "wise_owl" },
      { text: "グイグイ引っ張る前線ポジ", typeKey: "passion_hero" },
      { text: "場を明るくして、みんなの様子を見てる", typeKey: "happy_bunny" },
      { text: "何気なくフォロー役に回ってる", typeKey: "loyal_dog" }
    ]
  },
  {
    id: 7,
    text: "直感とロジックならどっち寄り？",
    options: [
      { text: "まずロジック。感情はあとで確認する", typeKey: "cool_brain" },
      { text: "直感8割、ロジック2割くらい", typeKey: "passion_hero" },
      { text: "雰囲気・空気感もかなり大事", typeKey: "happy_bunny" },
      { text: "状況によって使い分けるのが好き", typeKey: "tsun_nyanko" }
    ]
  },
  {
    id: 8,
    text: "「自分らしい時間」ってどんなとき？",
    options: [
      { text: "静かな場所で、1人で考えごとしているとき", typeKey: "cool_brain" },
      { text: "新しいことに挑戦して、ちょっとワクワクしてるとき", typeKey: "passion_hero" },
      { text: "好きな人たちとまったり過ごしているとき", typeKey: "happy_bunny" },
      { text: "ダラダラしつつも、頭の中ではちゃんと動いてるとき", typeKey: "lazy_sloth" }
    ]
  },
  {
    id: 9,
    text: "この診断を受けてる理由に近いのは？",
    options: [
      { text: "自分の思考パターンを整理したい", typeKey: "wise_owl" },
      { text: "新しい一歩のきっかけにしたい", typeKey: "passion_hero" },
      { text: "自分をもう少し好きになりたい", typeKey: "happy_bunny" },
      { text: "自分の扱い方を、こっそり知りたい", typeKey: "tsun_nyanko" }
    ]
  }
];

// --------------------------------
// 相性テキスト生成ロジック
// ※256パターンをガチ手書きすると運用がしんどいので、
//   タイプの組み合わせから雰囲気を組み立てる方式にしている。
//   こだわりたくなったらここだけ差し替えればOK。
// --------------------------------

/**
 * タイプ同士の関係カテゴリをざっくり分ける
 * - "same": 同タイプ
 * - "similar": 似た方向性（行動派同士・思考派同士など）
 * - "balance": 役割補完ペア
 * - "conflict": 世界観がぶつかりやすいペア
 */
function getRelationCategory(selfId, otherId) {
  if (selfId === otherId) return "same";

  const actionTypes = ["passion_hero", "playful_fox", "glitter_idol", "punk_hedgehog"];
  const logicTypes = ["cool_brain", "wise_owl"];
  const careTypes = ["iyashi_angel", "loyal_dog", "happy_bunny"];
  const slowTypes = ["lazy_sloth", "shy_sheep"];
  const fantasyTypes = ["dream_unicorn", "gorgeous_princess"];
  const clumsyTypes = ["clumsy_squirrel", "hardworker_bee"];
  const tsunTypes = ["tsun_nyanko"];

  function inGroup(id, group) {
    return group.indexOf(id) !== -1;
  }

  const groups = [actionTypes, logicTypes, careTypes, slowTypes, fantasyTypes, clumsyTypes, tsunTypes];
  const sameGroup = groups.some((g) => inGroup(selfId, g) && inGroup(otherId, g));
  if (sameGroup) return "similar";

  // 補完し合うパターンをいくつかざっくり定義
  const balancePairs = [
    ["cool_brain", "passion_hero"],
    ["wise_owl", "glitter_idol"],
    ["lazy_sloth", "hardworker_bee"],
    ["punk_hedgehog", "iyashi_angel"],
    ["tsun_nyanko", "happy_bunny"],
    ["loyal_dog", "gorgeous_princess"]
  ];

  for (const [a, b] of balancePairs) {
    if ((selfId === a && otherId === b) || (selfId === b && otherId === a)) {
      return "balance";
    }
  }

  // 衝突しやすそうな組み合わせをざっくり
  const conflictPairs = [
    ["lazy_sloth", "hardworker_bee"],
    ["punk_hedgehog", "glitter_idol"],
    ["passion_hero", "shy_sheep"]
  ];
  for (const [a, b] of conflictPairs) {
    if ((selfId === a && otherId === b) || (selfId === b && otherId === a)) {
      return "conflict";
    }
  }

  return "balance";
}

/**
 * 相性コメント生成
 * @param {string} selfId - 自分のタイプID
 * @param {string} otherId - 相手のタイプID
 * @returns {{title: string, body: string}}
 */
function buildCompatibilityText(selfId, otherId) {
  const self = AFFINIA_TYPES[selfId];
  const other = AFFINIA_TYPES[otherId];

  if (!self || !other) {
    return {
      title: "タイプ情報が見つかりません",
      body: "一度診断をやり直してから、もう一度相性ページを開いてみてください。"
    };
  }

  const category = getRelationCategory(selfId, otherId);

  if (category === "same") {
    return {
      title: `${self.name} × ${other.name}｜似た者同士のシンクロ相性`,
      body:
        "価値観やテンションの上がりどころが近いコンビ。お互いの「あるある」を共有できて安心感は高めです。" +
        "その一方で、弱点も似ているので、暴走したり落ち込みすぎたりすると止める人がいなくなる可能性も。" +
        "ちょっとだけ意識的に「現実チェック役」を外から招くと、楽しさと安定感のバランスが取りやすくなります。"
    };
  }

  if (category === "similar") {
    return {
      title: `${self.name} × ${other.name}｜波長が近くて居心地いいペア`,
      body:
        "基本的なテンポや価値観が近く、無理に合わせなくても自然に一緒にいられる相性です。" +
        "ただ、似ているからこそ「相手もこれくらい分かってくれるはず」と期待しすぎると、" +
        "小さなすれ違いがモヤモヤに育ちやすい一面も。ときどき言葉に出して確認し合うだけで、安心度がかなり変わります。"
    };
  }

  if (category === "balance") {
    return {
      title: `${self.name} × ${other.name}｜違いが武器になる補完バランス`,
      body:
        "得意なことと苦手なことがうまく噛み合う、補完関係になりやすい組み合わせです。" +
        "片方が突っ走りがちなとき、もう片方がブレーキ役になれたり、" +
        "相手にはない視点を自然と差し込めたりするので、2人セットでの成果が出やすいペアと言えます。" +
        "大事なのは「自分と同じ動き方を求めすぎないこと」。お互いのスタイルを認め合えたとき、一気に相性が化けます。"
    };
  }

  // conflict
  return {
    title: `${self.name} × ${other.name}｜ぶつかりやすいからこそ伸びる相性`,
    body:
      "物事の見方や大事にしているポイントがけっこう違うコンビ。最初は「なんでそうなるの？」と、" +
      "相手の行動や考え方が理解しづらく感じるかもしれません。" +
      "ただ、そのギャップこそが新しい視点を連れてきてくれる種でもあります。" +
      "感情的なジャッジよりも「この人は何を守ろうとしてこうしてるんだろう？」と一歩引いて見られたとき、" +
      "相手の強みを自分の世界に取り入れられるようになります。"
  };
}

// --------------------------------
// 共通ユーティリティ
// --------------------------------

/**
 * 選択された typeKey の配列から、最頻値タイプを出す
 */
function calcResultType(selectedTypeKeys) {
  const counter = {};
  selectedTypeKeys.forEach((key) => {
    if (!key) return;
    counter[key] = (counter[key] || 0) + 1;
  });

  let bestKey = null;
  let bestCount = -1;
  Object.keys(counter).forEach((key) => {
    if (counter[key] > bestCount) {
      bestCount = counter[key];
      bestKey = key;
    }
  });

  // どれも選ばれていないなどの想定外時はツンデレニャンコに逃がす
  return bestKey || "tsun_nyanko";
}

// --------------------------------
// 診断ページ初期化（index.html）
// --------------------------------
function initQuizPage() {
  const root = document.getElementById("quiz-root");
  if (!root) return;

  let currentIndex = -1; // -1: イントロ / 0〜: 質問
  const answers = new Array(AFFINIA_QUESTIONS.length).fill(null);

  function renderIntro() {
    root.innerHTML = `
      <section class="card">
        <h1 class="title">${AFFINIA_TEXT.introTitle.replace(/\n/g, "<br>")}</h1>
        <p class="lead">${AFFINIA_TEXT.introLead}</p>
        <p class="note">${AFFINIA_TEXT.introNote.replace(/\n/g, "<br>")}</p>
        <div class="btn-row">
          <button class="btn-primary" id="start-btn">${AFFINIA_TEXT.startButton}</button>
        </div>
      </section>
    `;

    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        currentIndex = 0;
        renderQuestion();
      });
    }
  }

  function renderQuestion() {
    const q = AFFINIA_QUESTIONS[currentIndex];
    const total = AFFINIA_QUESTIONS.length;
    const progress = Math.round(((currentIndex + 1) / total) * 100);
    const selected = answers[currentIndex];

    const optionsHtml = q.options
      .map(
        (opt, idx) => `
        <button class="option-btn ${selected === idx ? "selected" : ""}" data-index="${idx}">
          ${opt.text}
        </button>
      `
      )
      .join("");

    root.innerHTML = `
      <section class="card">
        <div class="progress-wrapper">
          <div class="progress-label">診断の進行度 ${progress}% 完了</div>
          <div class="progress-bar">
            <div class="progress-inner" style="width:${progress}%;"></div>
          </div>
        </div>

        <h2 class="question-title">Q${currentIndex + 1}. ${q.text}</h2>

        <div class="option-list">
          ${optionsHtml}
        </div>

        <div class="nav-row">
          <button class="btn-secondary" id="prev-btn"${currentIndex === 0 ? " disabled" : ""}>戻る</button>
          <button class="btn-next" id="next-btn">${
            currentIndex === total - 1 ? "結果を見る" : "次へ"
          }</button>
        </div>
      </section>
    `;

    // 選択肢クリック
    root.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-index"));
        answers[currentIndex] = idx;
        renderQuestion();
      });
    });

    // 戻る
    const prevBtn = document.getElementById("prev-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex === 0) return;
        currentIndex -= 1;
        renderQuestion();
      });
    }

    // 次へ / 結果
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (answers[currentIndex] == null) {
          window.alert("どれか1つ選んでから進んで。");
          return;
        }

        if (currentIndex === total - 1) {
          // 結果計算
          const typeKeys = answers.map(
            (idx, qIndex) => AFFINIA_QUESTIONS[qIndex].options[idx].typeKey
          );
          const resultType = calcResultType(typeKeys);
          sessionStorage.setItem(AFFINIA_STORAGE_KEYS.RESULT_TYPE, resultType);
          // 必要なら回答も保存しておける
          // sessionStorage.setItem(AFFINIA_STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
          window.location.href = "result.html";
        } else {
          currentIndex += 1;
          renderQuestion();
        }
      });
    }
  }

  // 初期表示
  renderIntro();
}

// --------------------------------
// 結果ページ初期化（result.html）
// --------------------------------
function initResultPage() {
  const root = document.getElementById("result-root");
  if (!root) return;

  const typeKey = sessionStorage.getItem(AFFINIA_STORAGE_KEYS.RESULT_TYPE);
  const type = typeKey ? AFFINIA_TYPES[typeKey] : null;

  if (!type) {
    root.innerHTML = `
      <section class="card">
        <h1 class="title">診断結果が見つかりませんでした</h1>
        <p class="message">
          直接アクセスされたか、ブラウザの履歴から開かれた可能性があります。<br>
          もう一度、診断の最初からやりなおしてみてください。
        </p>
        <div class="btn-row">
          <button class="btn-primary" id="back-to-top">診断ページに戻る</button>
        </div>
      </section>
    `;
    const backBtn = document.getElementById("back-to-top");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }
    return;
  }

  // 自タイプをセッションに保持（相性ページで利用）
  sessionStorage.setItem(AFFINIA_STORAGE_KEYS.RESULT_TYPE, type.id);

  root.innerHTML = `
    <section class="card">
      <div class="result-visual">
        <img src="${type.imagePath}" alt="${type.name}" class="result-image">
      </div>
      <div class="result-type-label">あなたの Affinia タイプ</div>
      <div class="result-type-name">${type.name}</div>
      <div class="result-copy">${type.copy}</div>
      <div class="result-tagline">${type.tagline}</div>

      <div class="share-row">
        <div class="share-label">シェア</div>
        <div class="share-icons">
          <div class="share-icon">X</div>
          <div class="share-icon">LINE</div>
          <div class="share-icon">IG</div>
        </div>
        <div class="share-count">4.9M+</div>
      </div>

      <div class="btn-row" style="margin-top:18px;">
        <button class="btn-ghost" id="to-compat">このタイプとの相性を見る</button>
      </div>
      <div class="btn-row">
        <button class="btn-secondary" id="again-btn">もう一度診断する</button>
      </div>
    </section>
  `;

  const againBtn = document.getElementById("again-btn");
  if (againBtn) {
    againBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  const compatBtn = document.getElementById("to-compat");
  if (compatBtn) {
    compatBtn.addEventListener("click", () => {
      window.location.href = "compatibility.html";
    });
  }
}

// --------------------------------
// 相性ページ初期化（compatibility.html）
// --------------------------------
function initCompatibilityPage() {
  const root = document.getElementById("compat-root");
  if (!root) return;

  const selfTypeKey = sessionStorage.getItem(AFFINIA_STORAGE_KEYS.RESULT_TYPE);
  const selfType = selfTypeKey ? AFFINIA_TYPES[selfTypeKey] : null;

  const typeEntries = Object.values(AFFINIA_TYPES);

  function render(selectedOtherId) {
    const otherType =
      selectedOtherId && AFFINIA_TYPES[selectedOtherId]
        ? AFFINIA_TYPES[selectedOtherId]
        : typeEntries[0];

    const compatText =
      selfType && otherType
        ? buildCompatibilityText(selfType.id, otherType.id)
        : {
            title: "まずは自分のタイプを診断しよう",
            body:
              "相性診断は「自分の Affinia タイプ」が決まっていると、より具体的なコメントになります。まだ診断をしていない場合は、先にトップページから診断を受けてみてください。"
          };

    const optionsHtml = typeEntries
      .map(
        (t) => `
        <option value="${t.id}" ${otherType && otherType.id === t.id ? "selected" : ""}>
          ${t.name}
        </option>
      `
      )
      .join("");

    root.innerHTML = `
      <section class="card">
        <div class="compat-header">
          ${
            selfType
              ? `<div class="compat-self-type">
                   あなたのタイプ：<span class="compat-type-name">${selfType.name}</span>
                 </div>`
              : `<div class="compat-self-type">
                   あなたのタイプ：<span class="compat-type-name">未診断</span>
                 </div>`
          }
        </div>

        <div class="compat-select-row">
          <label for="compat-select" class="text-body" style="font-size:13px;">
            相性を見たい相手のタイプ
          </label>
          <select id="compat-select" class="select">
            ${optionsHtml}
          </select>
        </div>

        <h2 class="section-title" style="margin-top:4px;">${compatText.title}</h2>
        <p class="text-body">
          ${compatText.body}
        </p>

        <div class="btn-row" style="margin-top:18px;">
          <button class="btn-secondary" id="back-to-result">診断結果ページに戻る</button>
        </div>
      </section>
    `;

    const selectEl = document.getElementById("compat-select");
    if (selectEl) {
      selectEl.addEventListener("change", (e) => {
        const nextId = e.target.value;
        render(nextId);
      });
    }

    const backBtn = document.getElementById("back-to-result");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.location.href = "result.html";
      });
    }
  }

  render(selfType ? selfType.id : null);
}

// --------------------------------
// about ページ初期化（about.html）
// --------------------------------
function initAboutPage() {
  const root = document.getElementById("about-root");
  if (!root) return;

  const typeListHtml = Object.values(AFFINIA_TYPES)
    .map(
      (t) => `
      <li class="type-item">
        <div class="type-item-name">${t.name}</div>
        <div class="type-item-text">${t.aboutText}</div>
      </li>
    `
    )
    .join("");

  root.innerHTML = `
    <section class="section">
      <h1 class="section-title">Affiniaとは？</h1>
      <p class="section-lead">
        Affinia（アフィニア）は、16体のキャラクターをベースに、<br>
        「いまの自分の雰囲気」をゆるく言語化してみるタイプ診断です。
      </p>
      <p class="text-body">
        いわゆる性格テストのように、あなたを固定の枠にはめこむためのものではなく、<br>
        「最近の自分ってこんな感じかも」「こういう面もあったな」と、<br>
        自分との付き合い方を一緒に確認していくためのツールとして設計されています。
      </p>
    </section>

    <section class="section">
      <h2 class="section-title">16タイプのキャラクターたち</h2>
      <p class="section-lead">
        ここにいる16タイプは、どれが良くてどれが悪いという優劣はありません。<br>
        単純に「今こういうモードだな」を表すための、ゆるいラベルです。
      </p>
      <ul class="type-list">
        ${typeListHtml}
      </ul>
    </section>
  `;
}

// --------------------------------
// ページ判定して初期化
// --------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initQuizPage();
  initResultPage();
  initCompatibilityPage();
  initAboutPage();
});
