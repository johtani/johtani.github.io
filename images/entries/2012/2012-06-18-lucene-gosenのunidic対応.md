---
layout: post
title: "lucene-gosenのUniDic対応(Jugemより移植)"
slug: lucene-gosenのunidic対応
author: johtani
date: 2012-06-18T23:03:00+09:00
comments: true
tags: [lucene-gosen]
---
Issue 32で上がってきたlucee-gosenのUniDic対応の最初のパッチを書いたので、ブログに残しておきます。

###UniDicとは___
[UniDic](http://www.tokuteicorpus.jp/dist/)とは、日本語テキストを単語に分割し，形態論情報を付与するための電子化辞書です。
[UniDicの詳細や特長についてはHP](http://www.tokuteicorpus.jp/dist/)を御覧ください。

残念ながら、UniDicは利用者登録をして、利用規約に従うと利用が可能となります。
ですので、lucene-gosenでは、Ipadicやnaist-chasenの辞書とは異なり自動で辞書をダウンロードする機能はありません。


###利用手順___
以下が、Unidicの辞書を利用したjarファイルの作成方法となります。

<b>1. lucene-gosenをダウンロードし、パッチを当てる</b>
lucene-gosenのリポジトリからソースをエクスポートし、パッチをダウンロードし、パッチを適用します。
コマンドは以下のとおりです。

```

svn co . lucene-gosen-trunk-readonly
cd lucene-gosen-trunk-readonly
patch -p0 &gt; ...patch
```
（パッチに関しては今後正式版をリリースされたら手順からは必要なくなります。）

<b>2. Unidic辞書生成のためのディレクトリを作成「$GOSEN_HOME/dictionary/unidic」</b>
```

mkdir dictionary/unidic
```

<b>3. 対象となるUnidicの辞書のソースファイルをダウンロード</b>
利用者登録をし、利用規約に同意の上、以下のファイルをダウンロードします。
「/」に添ってダウンロードページから遷移してダウンロードしてください。
```

1.3.12個別ファイル/unidic-chasen/unidic-chasen1312src.tar.gz
```

<b>4. ダウンロードしたtar.gzファイルを「dictionary/unidic/」にコピー</b>
```

cp .. lucene-gosen-trunk-readonly/dictionary/unidic/
```

<b>5. Antを実行してjarファイルの作成</b>
```

ant -Ddictype=unidic
```
成功すれば、lucene-gosen-trunk-readonly/dist/lucene-gosen-2.1-dev-unidic.jarファイルが生成されます。
あとは、通常通り、SolrやLuceneで利用することが可能です。

以上がjarファイルの作成手順となります。

###制約事項（2012/06/18現在）___
現在（2012/06/18）時点で公開しているパッチは、以下の制約が存在します。
* COMPOUNDエントリー未対応
* 品詞情報（発音）の内容の制限


<b>COMPOUNDエントリー未対応</b>
Unidicの辞書のエントリーの中に1件だけ、COMPOUNDと呼ばれるエントリーが1件だけ存在します。
別々の単語を組み合わせて1単語として扱うことができるようになっているようです。
lucene-gosenでは、残念ながら、このような辞書の形式には対応していません。
1件しか存在しないデータでもあることを鑑みて、今回の辞書構築処理では、スキップするようにしました。

<b>品詞情報（発音）の内容の制限</b>
lucene-gosenの実装上、単語の読みのバリエーション数と発音のバリエーション数には以下の制限が存在します。
```

「読み」バリエーション数  ＜ 「発音」バリエーション数
```
「読み」に対応する形で、「発音」がlucene-gosenでは品詞情報としてデータ登録されています。
UniDicのデータには上記制約を満たさないデータが5件ほど存在します。
現在、これら5件のデータについて、「読み」に対応した「発音」データには空文字が表示されるようになっています。

まだ、簡単に動作確認をしただけです。UniDicを利用していて問題など有りましたら連絡、Issueへのアップをしていただけると助かります。
