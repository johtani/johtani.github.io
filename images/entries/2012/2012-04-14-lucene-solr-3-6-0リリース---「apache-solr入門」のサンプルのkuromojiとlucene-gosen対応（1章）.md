---
layout: post
title: "Lucene/Solr 3.6.0リリース / 「Apache Solr入門」のサンプルのKuromojiとlucene-gosen対応（1章）(Jugemより移植)"
slug: lucene-solr-3-6-0リリース---「apache-solr入門」のサンプルのkuromojiとlucene-gosen対応（1章）
author: johtani
date: 2012-04-14T02:45:00+09:00
comments: true
tags: [solr]
---
以前より、アナウンスしていた、Kuromojiという日本語形態素解析が含まれるLucene/Solr 3.6.0がリリースされました。

以下、各リリース内容について簡単に説明されているページへのリンクです。

[Solrリリースのお知らせ](http://lucene.apache.org/solr/solrnews.html)

[Luceneリリースのお知らせ](http://lucene.apache.org/core/corenews.html)

Solr 3.6.0の変更の目玉は各言語のAnalyzer/Tokenizerの設定がexampleのschema.xmlに含まれるようになったことです。
Kuromojiという日本語用の形態素解析器もexampleを起動すればすぐに利用できる形になっています。
Kuromojiを利用する場合は、exampleのschema.xmlが参考になるでしょう。

あと、大きな変更は、Ivyに対応した点です。ソースをダウンロードするとわかりますが、依存するjarファイルが含まれない形に変更されています。
SVNからチェックアウトした場合も同様です。ビルドにはネットワークに接続している環境が必要になりました。



また、このリリースに合わせて、以前書いた「Apache Solr入門」のサンプルについての記事も変更が必要かと思い、
前回の記事をベースに以下に変更した記事を書いたので、参考にしてください。
今回は、Kuromojiという日本語形態素解析がデフォルトで含まれるようになったので、
Kuromojiの利用方法とあわせて、lucene-gosenの利用方法も記載します。
サンプルのschema.xmlについては、Kuromoji、lucene-gosenが同時に利用できる形のものを用意しました。

___
サンプルのschema.xmlを最新版（Solr 3.6 + lucene-gosen-2.0.0-ipadic）のものを用意しました。
なお、あくまでも、3.xでlucene-gosenを利用する場合の「Apache Solr入門」のサンプルプログラムの変更点（とりあえず、4章まで）の違いについて記述します。
申し訳ございませんが、1.4と3.xの違いについての説明はここでは行いません。

以下では、各章でschema.xmlに関連する記載のある部分を抜粋して、変更点と変更したschema.xmlのリンクを用意しました。参考にしてもらえればと思います。

<span style="font-size:large;">1章

<span style="font-size:medium;">1.6.1 N-gram（17ページ）
1.6.1の手順に変更はありません。
サンプルプログラムが入っているZip「solrbook.zip」のintroduction/ngram/schema.xmlファイルの代わりに
[こちらのschema.xml](https://bitbucket.org/johtani/solrbook-lucene-gosen-3.x/raw/48834b2d0465/introduction/ngram/schema.xml)を利用してください。
<span style="color:#FF0000">※なお、Solr 3.6.0から、SOLR_HOME/example/solr/conf/schema.xmlにデフォルトでN-gramで利用しているCJKTokenizerの設定が入るようになっています。
（実際にはCJKTokenizerではなく、CJKBigramFilterとCJKWidthFilterに変更されています。）


<span style="font-size:medium;">1.6.2 形態素解析（18ページ～20ページ中盤まで）
<span style="color:#FF0000">CJKと同様、exampleにKuromojiを利用した設定がすでに記述されています。text_jaというフィールドタイプになります。書籍の21ページ1行目に記載のある、
「Field」のテキストボックスに入力する文字列を「text_ja」とすると、Kuromojiを利用した形態素解析結果が表示されます。exampleですでに幾つかのフィルタも設定されているため、書籍の出力結果とは異なる表示となるはずです。

lucene-gosenを利用する場合は手順が大きく変わります。
Senを利用する場合、Senの辞書のビルド、Senのjarファイルの配置、Senを利用するためのTokenizerクラスを含んだサンプルjarの配置という作業があります。
lucene-gosenではコンパイル済みの辞書がjarファイルに含まれています。
また、Solr向けのTokenizerもlucene-gosenのjarファイルに含まれています。
lucene-gosenを利用して形態素解析を体験するための手順は次の流れになります。
なお、schema.xmlについては上記N-gramでダウンロードしたschema.xmlに形態素解析の設定もあわせて記載してあります。

jarファイル（[lucene-gosen-2.0.0-ipadic.jar](http://lucene-gosen.googlecode.com/files/lucene-gosen-2.0.0-ipadic.jar)）をダウンロードして、$SOLR/example/solr/lib（libディレクトリがない場合は作成）にコピーします。
コピーが終わりましたら、次のように$SOLR/exampleディレクトリでSolrを起動します。
（-Dsen.homeは必要なし）

```

$ java -jar start.jar
```

あとは、書籍の記述にしたがって管理画面のAnalysis画面で動作を確認します。
ほぼ、図1-6と同じ結果になっていると思います。
（lucene-gosenで出力される情報には本書のサンプルよりも多くの情報が含まれています。また、サンプルでは、形態素解析の後の単語に基本形を採用しているため、「な」が「だ」として出力されています。基本形を出力する場合は後述するこちらで紹介したTokenFilterを利用すれば可能です。）

2章については後日説明することにします（眠くなってきた。。。）

動作しないなどあれば、コメントください。



<span style="color:#FF0000">2012/06/14追記提供しているschema.xmlに関して修正を加えました。[こちらの記事](http://johtani.jugem.jp/?eid=92)で説明しているautoGeneratePhraseQueriesの値をtext_gosen、text_cjkのフィールドに対してtrueを設定する記述を追記しました。
