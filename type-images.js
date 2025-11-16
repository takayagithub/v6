// Affinia タイプごとの画像パス定義
// 画像はリポジトリの「img/types/」フォルダに置いている前提。
// 例: /img/types/ツンデレニャンコ.png

const AFFINIA_TYPE_IMAGES = {
  "ツンデレニャンコ": "img/types/ツンデレニャンコ.png",
  "情熱ヒーロー": "img/types/情熱ヒーロー.png",
  "クールブレイン": "img/types/クールブレイン.png",
  "ハッピーバニー": "img/types/ハッピーバニー.png",
  "癒し天使": "img/types/癒し天使.png",
  "おちゃめキツネ": "img/types/おちゃめキツネ.png",
  "博識フクロウ": "img/types/博識フクロウ.png",
  "ゴージャスプリンス": "img/types/ゴージャスプリンス.png",
  "夢見るユニコーン": "img/types/夢見るユニコーン.png",
  "頑張りミツバチ": "img/types/頑張りミツバチ.png",
  "もじもじヒツジ": "img/types/もじもじヒツジ.png",
  "ドジっ子リス": "img/types/ドジっ子リス.png",
  "パンクハリネズミ": "img/types/パンクハリネズミ.png",
  "マイペースナマケモノ": "img/types/マイペースナマケモノ.png",
  "健気ワンコ": "img/types/健気ワンコ.png",
  "キラキラアイドル": "img/types/キラキラアイドル.png"
};

/**
 * タイプ名から画像パスを返すヘルパー
 * @param {string} typeName - 例: "ツンデレニャンコ"
 * @returns {string|null}   - 例: "img/types/ツンデレニャンコ.png"
 */
function getTypeImagePath(typeName) {
  return AFFINIA_TYPE_IMAGES[typeName] || null;
}
