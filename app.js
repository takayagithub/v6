// Affinia v6 core script
(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ==== 共通: 年表示 ====
  function initYear() {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  // ==== ナビゲーション ====
  function initNav() {
    const toggle = $("#navToggle");
    const drawer = $("#navDrawer");
    const scrim = $("#navScrim");
    const closeBtn = $("#navClose");
    if (!toggle || !drawer || !scrim || !closeBtn) return;

    const open = () => {
      drawer.classList.add("open");
      scrim.classList.add("visible");
      toggle.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
    };
    const close = () => {
      drawer.classList.remove("open");
      scrim.classList.remove("visible");
      toggle.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
    };

    toggle.addEventListener("click", () => {
      if (drawer.classList.contains("open")) {
        close();
      } else {
        open();
      }
    });
    closeBtn.addEventListener("click", close);
    scrim.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    drawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", close);
    });
  }

  // ==== Affiniaタイプ定義 ====
  const AFFINIA_TYPES = [
    { code: "A1", name: "情熱ヒーロー", catch: "勢いと前向きさで動き出せるタイプ。", desc: "みんなを巻き込みながら、新しいことに飛び込んでいきやすい傾向があります。" },
    { code: "A2", name: "クールブレイン", catch: "静かにコツコツ、頭で整理してから動くタイプ。", desc: "いきなり動くより、よく考えてから行動するほうが安心しやすいスタイルです。" },
    { code: "A3", name: "ハッピーバニー", catch: "その場の空気をふわっと明るくするタイプ。", desc: "場の雰囲気を読むのが得意で、みんなが話しやすい空気をつくりやすい傾向があります。" },
    { code: "A4", name: "癒し天使", catch: "やさしさと気配りで場をととのえるタイプ。", desc: "人の表情や空気の変化に気づきやすく、さりげなくフォローに回ることが多いスタイルです。" },
    { code: "B1", name: "おちゃめキツネ", catch: "ひらめきと遊び心で動くタイプ。", desc: "直感でおもしろそうと思ったことにすぐ手を伸ばしやすい傾向があります。" },
    { code: "B2", name: "博識フクロウ", catch: "情報を集めて深く考えるタイプ。", desc: "まずは調べて理解してから、静かに動き出すことが多いスタイルです。" },
    { code: "B3", name: "ゴージャスプリンセス", catch: "こだわりと世界観で周りを巻き込むタイプ。", desc: "見せ方や雰囲気づくりに力を入れることで、周りを引きつけやすい傾向があります。" },
    { code: "B4", name: "夢見るユニコーン", catch: "理想やイメージを少しずつ形にしていくタイプ。", desc: "「こうなったらいいな」を大事にしながら、マイペースに行動を重ねていくスタイルです。" },
    { code: "C1", name: "頑張りミツバチ", catch: "小さな積み重ねを大事にするタイプ。", desc: "派手さよりも、毎日少しずつ続けることで結果を出しやすい傾向があります。" },
    { code: "C2", name: "もじもじヒツジ", catch: "静かな安心感をくれるタイプ。", desc: "目立つよりも、落ち着いた環境でじっくり取り組むほうが力を発揮しやすいスタイルです。" },
    { code: "C3", name: "ドジっ子リス", catch: "明るく親しみやすいムードメーカータイプ。", desc: "ちょっとしたミスも含めて、人から「話しかけやすい」と思われやすい傾向があります。" },
    { code: "C4", name: "パンクハリネズミ", catch: "やさしい線引きができるタイプ。", desc: "無理しすぎない距離感を保ちつつ、自分と相手の両方を大事にしようとするスタイルです。" },
    { code: "D1", name: "マイペースナマケモノ", catch: "自分のペースを守ることで力が出るタイプ。", desc: "一気に頑張るより、休みながら長く続けるほうが合いやすい傾向があります。" },
    { code: "D2", name: "健気ワンコ", catch: "誰かの役に立つことでやる気が出るタイプ。", desc: "「あの人のため」があると、普段よりもぐっと頑張れるスタイルです。" },
    { code: "D3", name: "キラキラアイドル", catch: "人前で自分らしく輝きやすいタイプ。", desc: "見られているほうがスイッチが入りやすく、表現することでエネルギーがわく傾向があります。" },
    { code: "D4", name: "ツンデレニャンコ", catch: "素直じゃないところも含めて魅力なタイプ。", desc: "最初は距離を取るけれど、信頼した相手にはしっかり心を開きやすいスタイルです。" },
  ];

  // ==== 質問定義（5段階×9問） ====
  // axis: "X"=エネルギー/動き方, "Y"=感じ方/考え方
  const QUESTIONS = [
    {
      axis: "X",
      text: "予定のない休日、朝のスタートは？",
      left: "ゆっくり整えてから動きたい",
      right: "早めに外に出て動きたい",
    },
    {
      axis: "X",
      text: "急に予定がキャンセルになったときは？",
      left: "一人時間が増えて少しほっとする",
      right: "誰かを誘って別の予定を入れたくなる",
    },
    {
      axis: "X",
      text: "大人数の集まりに誘われたときは？",
      left: "様子を見てから参加を決めたい",
      right: "まずは行ってみて考えたい",
    },
    {
      axis: "Y",
      text: "決めごとをするとき、どちらを優先しがち？",
      left: "気持ち・雰囲気を大事にする",
      right: "理由・しくみを大事にする",
    },
    {
      axis: "Y",
      text: "友だちに相談されたときのスタイルは？",
      left: "話をじっくり聞いて共感する",
      right: "解決策や選択肢を一緒に考える",
    },
    {
      axis: "Y",
      text: "新しいことを始めるときに不安になるのは？",
      left: "人間関係や雰囲気に合えるかどうか",
      right: "スキルや結果をちゃんと出せるかどうか",
    },
    {
      axis: "X",
      text: "締め切りやテスト前の取り組み方は？",
      left: "少しずつ前倒しで進めたい",
      right: "ギリギリの集中力を使いがち",
    },
    {
      axis: "Y",
      text: "楽しいと感じやすい時間は？",
      left: "安心できる人と、ゆっくり話している時間",
      right: "新しい場所や人と、刺激をもらっている時間",
    },
    {
      axis: "X",
      text: "予定が詰まってきたときの反応は？",
      left: "早めに間引いて余白をつくる",
      right: "とりあえずこなしてから考える",
    },
  ];

  // ==== 診断ロジック ====
  function initQuiz() {
    const root = $("#quizRoot");
    if (!root) return;

    const bar = $("#quizBar");
    const percentText = $("#quizPercent");
    const qText = $("#quizQuestion");
    const leftLabel = $("#quizLeftLabel");
    const rightLabel = $("#quizRightLabel");
    const choicesWrap = $("#quizChoices");
    const prevBtn = $("#quizPrev");
    const nextBtn = $("#quizNext");

    if (!bar || !percentText || !qText || !leftLabel || !rightLabel || !choicesWrap || !prevBtn || !nextBtn) {
      return;
    }

    const total = QUESTIONS.length;
    let index = 0;
    const answers = new Array(total).fill(3); // 1〜5の中央

    function updateProgress() {
      const p = Math.round(((index + 1) / total) * 100);
      bar.style.width = `${p}%`;
      percentText.textContent = String(p);
    }

    function renderQuestion() {
      const q = QUESTIONS[index];
      qText.textContent = q.text;
      leftLabel.textContent = q.left;
      rightLabel.textContent = q.right;

      // バブル生成
      choicesWrap.innerHTML = "";
      for (let i = 1; i <= 5; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-bubble level-" + i + (answers[index] === i ? " active" : "");
        btn.setAttribute("aria-label", `選択 ${i} / 5`);
        btn.addEventListener("click", () => {
          answers[index] = i;
          renderQuestion();
        });
        choicesWrap.appendChild(btn);
      }

      prevBtn.disabled = index === 0;
      nextBtn.textContent = index === total - 1 ? "結果を見る" : "次へ";
      updateProgress();
    }

    function computeResult() {
      // 1〜5 → -2〜+2 に変換
      const mapped = answers.map((v) => v - 3);
      let sumX = 0, cntX = 0;
      let sumY = 0, cntY = 0;

      mapped.forEach((val, i) => {
        const axis = QUESTIONS[i].axis;
        if (axis === "X") {
          sumX += val;
          cntX++;
        } else {
          sumY += val;
          cntY++;
        }
      });

      const avgX = cntX ? sumX / cntX : 0;
      const avgY = cntY ? sumY / cntY : 0;

      // -2〜+2 → 0〜1 に正規化
      const nx = (avgX + 2) / 4;
      const ny = (avgY + 2) / 4;

      const levelFromNorm = (v) => {
        if (v < 0.25) return 1;
        if (v < 0.5) return 2;
        if (v < 0.75) return 3;
        return 4;
      };

      const gIndex = levelFromNorm(nx); // 1〜4 → A〜D
      const sIndex = levelFromNorm(ny); // 1〜4
      const groupLetter = ["A", "B", "C", "D"][gIndex - 1];
      const code = `${groupLetter}${sIndex}`;

      const type = AFFINIA_TYPES.find((t) => t.code === code) || AFFINIA_TYPES[0];

      const isMix =
        Math.abs(nx - 0.5) < 0.08 ||
        Math.abs(ny - 0.5) < 0.08;

      const payload = {
        code,
        type,
        mix: isMix,
        axes: { x: nx, y: ny },
        answers,
      };

      try {
        sessionStorage.setItem("affinia_result", JSON.stringify(payload));
      } catch (e) {
        // 収納失敗しても診断自体は進める
      }

      const url = new URL("result.html", location.href);
      url.searchParams.set("code", code);
      location.href = url.toString();
    }

    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index--;
        renderQuestion();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (index < total - 1) {
        index++;
        renderQuestion();
      } else {
        computeResult();
      }
    });

    // 初期描画
    renderQuestion();
  }

  // ==== 結果ページ ====
  function initResult() {
    const root = $("#resultRoot");
    if (!root) return;

    const url = new URL(location.href);
    const codeParam = url.searchParams.get("code");

    let stored = null;
    try {
      const raw = sessionStorage.getItem("affinia_result");
      if (raw) stored = JSON.parse(raw);
    } catch (e) {}

    let code = codeParam || (stored && stored.code);
    if (!code) {
      code = "A1";
    }
    const type = AFFINIA_TYPES.find((t) => t.code === code) || AFFINIA_TYPES[0];

    const group = type.code.charAt(0);

    const groupSummary = getGroupSummary(group);

    const codeExplain = `
Affiniaコードの見方：
A〜Dはエネルギーの向きや動き方の違い、
1〜4はそのスタイルの細かいニュアンスを表しています。
`;

    const mixText =
      stored && stored.mix
        ? '<span class="result-badge">境目にいる「ミックス寄り」な結果です。</span>'
        : "";

    root.innerHTML = `
      <h1>${type.name}</h1>
      <p class="result-code">Affiniaタイプ ／ <strong>${type.name}</strong>　｜　Affiniaコード ／ <strong>${type.code}</strong></p>
      ${mixText}
      <p><strong>${type.catch}</strong></p>
      <p>${type.desc}</p>

      <h2 class="result-subtitle">よく出やすいパターン</h2>
      <ul class="result-list">
        <li>このタイプらしい行動や考え方が日常に出やすいモードです。</li>
        <li>得意な場面では、まわりから「そのままでいてほしい」と思われやすい傾向があります。</li>
        <li>疲れているときほど、このタイプのクセが少し強めに出ることがあります。</li>
      </ul>

      <h2 class="result-subtitle">少しだけ意識すると良いポイント</h2>
      <ul class="result-list">
        <li>自分のペースを大事にしつつ、相手のリズムも一度だけ想像してみる。</li>
        <li>「全部このタイプだから」ではなく、「今日はたまたまこうだった」と軽く受け止める。</li>
      </ul>

      <h2 class="result-subtitle">明日からの一歩</h2>
      <ul class="result-list">
        <li>今日のうちに「明日やりたいこと」を1つだけメモに書いておく。</li>
        <li>そのメモを見ながら、できたら小さく自分をほめる。</li>
      </ul>

      <h2 class="result-subtitle">Affiniaタイプ同士の相性（サマリ）</h2>
      <p>${groupSummary}</p>

      <h2 class="result-subtitle">Affiniaコードとは？</h2>
      <p>${codeExplain.replace(/\n/g, "<br />")}</p>

      <div class="result-footer-links">
        <a href="relation.html?me=${encodeURIComponent(type.code)}" class="btn ghost">タイプ相性を見てみる</a>
        <a href="types.html" class="btn ghost">ほかのAffiniaタイプを見る</a>
        <a href="index.html#quiz-section" class="btn primary">もう一度診断する</a>
      </div>
    `;

    initShare(type);
  }

  function getGroupSummary(groupLetter) {
    switch (groupLetter) {
      case "A":
        return "Aグループ同士とはテンポが合いやすく、Cグループからは落ち着きを、Dグループからは安心感をもらいやすいタイプです。";
      case "B":
        return "Bグループは「アイデア・こだわり」が強め。Aグループから行動力、Dグループから現実感のヒントをもらうとバランスがとりやすくなります。";
      case "C":
        return "Cグループ同士は安定感のあるペースで付き合いやすい相性です。AやBグループと組むと、新しい刺激やチャレンジをもらいやすくなります。";
      case "D":
        return "Dグループは人とのつながりや「心地よさ」を大事にしがち。Cグループとは安心、AやBグループとは視野を広げ合う関係になりやすいです。";
      default:
        return "似たAffiniaタイプ同士とは安心感が生まれやすく、違うグループとは役割分担を意識すると関係が安定しやすくなります。";
    }
  }

  // ==== シェア ====
  function initShare(type) {
    const xBtn = $("#shareX");
    const lineBtn = $("#shareLine");
    const instaBtn = $("#shareInsta");
    const qrBtn = $("#shareQr");
    const qrWrap = $("#qrWrapper");

    if (!xBtn || !lineBtn || !instaBtn || !qrBtn || !qrWrap) return;

    const url = location.href;
    const title = `Affiniaタイプ診断「${type.name}（${type.code}）」`;

    const tweetText = `${title} に近いと診断されました。`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(url)}`;
    xBtn.href = tweetUrl;

    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      url
    )}`;
    lineBtn.href = lineUrl;

    // Instagram は直接シェアできないため、公式アカウントなどに誘導する想定
    instaBtn.href = "https://www.instagram.com/";
    instaBtn.addEventListener("click", () => {
      // 後からAffinia公式アカウントURLに差し替え想定
    });

    qrBtn.addEventListener("click", () => {
      qrWrap.classList.toggle("visible");
    });
  }

  // ==== タイプ一覧 ====
  function initTypes() {
    const grid = $("#typeGrid");
    if (!grid) return;

    grid.innerHTML = "";

    AFFINIA_TYPES.forEach((t) => {
      const card = document.createElement("article");
      card.className = "type-card";
      card.innerHTML = `
        <div class="type-code">Affiniaコード：${t.code}</div>
        <div class="type-name">${t.name}</div>
        <div class="type-desc">${t.catch}</div>
        <div class="type-actions">
          <a href="result.html?code=${encodeURIComponent(t.code)}" class="btn ghost">このタイプを見る</a>
          <a href="relation.html?me=${encodeURIComponent(t.code)}" class="btn ghost">相性を見る</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // ==== 相性ページ（枠＋JSON連携の土台） ====
  let relationsData = null;

  function loadRelationsJson() {
    // relations.json があれば読み込み、なくてもエラーにはしない
    fetch("relations.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        relationsData = data || null;
      })
      .catch(() => {
        relationsData = null;
      });
  }

  function initRelation() {
    const form = $("#relationForm");
    const meSelect = $("#meType");
    const otherSelect = $("#otherType");
    const resultBox = $("#relationResult");
    if (!form || !meSelect || !otherSelect || !resultBox) return;

    // セレクトにタイプ一覧をセット
    const defaultOpt1 = document.createElement("option");
    defaultOpt1.value = "";
    defaultOpt1.textContent = "選択してください";
    meSelect.appendChild(defaultOpt1.cloneNode(true));

    const defaultOpt2 = document.createElement("option");
    defaultOpt2.value = "";
    defaultOpt2.textContent = "選択してください";
    otherSelect.appendChild(defaultOpt2.cloneNode(true));

    AFFINIA_TYPES.forEach((t) => {
      const opt1 = document.createElement("option");
      opt1.value = t.code;
      opt1.textContent = `${t.code} ｜ ${t.name}`;
      meSelect.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = t.code;
      opt2.textContent = `${t.code} ｜ ${t.name}`;
      otherSelect.appendChild(opt2.cloneNode(true));
    });

    // URLパラメータから自分のタイプを初期選択
    try {
      const url = new URL(location.href);
      const meCode = url.searchParams.get("me");
      if (meCode && AFFINIA_TYPES.some((t) => t.code === meCode)) {
        meSelect.value = meCode;
      }
    } catch (e) {}

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const me = meSelect.value;
      const other = otherSelect.value;
      if (!me || !other) {
        resultBox.innerHTML =
          "<p>あなたと相手のAffiniaタイプを選んでから、相性を見るボタンを押してください。</p>";
        return;
      }
      renderRelation(me, other, resultBox);
    });

    loadRelationsJson();
  }

  function renderRelation(me, other, box) {
    const meType = AFFINIA_TYPES.find((t) => t.code === me);
    const otherType = AFFINIA_TYPES.find((t) => t.code === other);

    if (!meType || !otherType) {
      box.innerHTML = "<p>タイプの選択内容を確認してください。</p>";
      return;
    }

    let html = `
      <h2 class="sub-title">${meType.name} × ${otherType.name}</h2>
      <p>ふたりのAffiniaタイプの組み合わせです。</p>
    `;

    const key = `${me}-${other}`;
    const reverseKey = `${other}-${me}`;

    if (relationsData && (relationsData[key] || relationsData[reverseKey])) {
      const data = relationsData[key] || relationsData[reverseKey];
      html += `
        <h3 class="result-subtitle">相性の雰囲気</h3>
        <p>${data.summary || ""}</p>
        ${Array.isArray(data.good) ? `<h3 class="result-subtitle">うまくいきやすいポイント</h3>
          <ul class="result-list">${data.good.map((v) => `<li>${v}</li>`).join("")}</ul>` : ""}
        ${Array.isArray(data.caution) ? `<h3 class="result-subtitle">少し注意したいポイント</h3>
          <ul class="result-list">${data.caution.map((v) => `<li>${v}</li>`).join("")}</ul>` : ""}
      `;
    } else {
      html += `
        <p>この組み合わせの詳しい相性データは、まだ登録されていません。</p>
        <p>グループごとのサマリを参考に、ふたりの違いを「役割分担」として楽しんでみてください。</p>
      `;
    }

    box.innerHTML = html;
  }

  // ==== 初期化 ====
  document.addEventListener("DOMContentLoaded", () => {
    initYear();
    initNav();
    initQuiz();
    initResult();
    initTypes();
    initRelation();
  });
})();
