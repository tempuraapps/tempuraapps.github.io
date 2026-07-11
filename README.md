# KM Apps — プライバシーポリシー

KM Apps が公開する各アプリのプライバシーポリシーを配信するための公開リポジトリです。GitHub Pages で静的ホスティングします。

> ⚠️ **このリポジトリは public です。** 秘密情報（APIキー・`.env`・認証情報等）は絶対に置かないでください。アプリのソースコードは別の private リポジトリで管理します。

## 構成

```
kmapps/
├── index.html              … ポリシー一覧（トップ）
├── style.css               … 共通スタイル
├── oshimachi/privacy.html  … 推し街
├── pitawari/privacy.html   … ピタワリ
└── reeddiary/privacy.html  … リード日記
```

## 公開URL（GitHub Pages 有効化後）

| ページ | URL |
|---|---|
| 一覧 | `https://kohei321.github.io/kmapps/` |
| 推し街 | `https://kohei321.github.io/kmapps/oshimachi/privacy.html` |
| ピタワリ | `https://kohei321.github.io/kmapps/pitawari/privacy.html` |
| リード日記 | `https://kohei321.github.io/kmapps/reeddiary/privacy.html` |

各アプリの App Store Connect 「プライバシーポリシーURL」欄に、対応するURLを登録します。

## GitHub Pages の有効化

1. リポジトリの **Settings → Pages**
2. **Source** =「Deploy from a branch」
3. **Branch** = `main` / `(root)` を選択して Save
4. 数分後に上記URLで公開されます

## メンテナンス方針（重要）

- 各ポリシーは**現状（2026-07-11 時点）＝データ収集なし・完全ローカル**を前提に記載しています。
- **PostHog（利用状況の計測）や RevenueCat（アプリ内課金）を導入したら、該当アプリのポリシーを必ず更新**してください（「解析」「購入情報の取り扱い」等を追記）。App Store Connect の App Privacy 申告とも内容を一致させます。
- 連絡先は `kmapps.support@gmail.com`（アプリ内の問い合わせ窓口と統一済み）。
- 文面は雛形です。公開前に内容をご確認のうえ、必要に応じて調整してください。

## 更新の運用

初期構成のみ `main` へ直接コミットしています。以降の変更は**ブランチ → Pull Request → main** の順で行ってください（`main` はブランチ保護を設定済み）。
