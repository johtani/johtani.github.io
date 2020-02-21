---
layout: post
title: "「Apache Solr入門」のサンプルのlucene-gosen対応（1章から4章）(Jugemより移植)"
slug: 「apache-solr入門」のサンプルのlucene-gosen対応（1章から4章）
author: johtani
date: 2011-11-26T03:00:00+09:00
comments: true
tags: [lucene-gosen]
---
先週末から勤労感謝の日まで風邪で寝こんでました。。。
みなさん、朝晩、冷え込みが激しいので風邪には気をつけてください。

季節の言葉も入れたので本題です。
つい最近、「Apache Solr入門」のサンプルをlucene-gosenでどうやって動かすんですかー？という質問を受けました。
確かに、「Apache Solr入門」を書いたのはSolrのバージョンが1.4が出る直前でしたし、lucene-gosenは存在せず、
当時はSenを元にした日本語の形態素解析のサンプルとなっていました。
そのSenも入手しづらくなってきており、私もlucene-gosenのプロジェクトに携わるようになってきてある程度時間が
経ちました。
せっかくなので、サンプルのschema.xmlだけでも最新版（Solr 3.4 + lucene-gosen-1.2.0-ipadic）のものを用意しました。
なお、あくまでも、3.xでlucene-gosenを利用する場合の「Apache Solr入門」のサンプルプログラムの変更点（とりあえず、4章まで）の違いについて記述します。
申し訳ございませんが、1.4と3.xの違いについての説明はここでは行いません。

以下では、各章でschema.xmlに関連する記載のある部分を抜粋して、変更点と変更したschema.xmlのリンクを用意しました。参考にしてもらえればと思います。

<span style="font-size:large;">1章

<span style="font-size:medium;">1.6.1 N-gram（17ページ）
1.6.1の手順に変更はありません。
サンプルプログラムが入っているZip「solrbook.zip」のintroduction/ngram/schema.xmlファイルの代わりに
[こちらのschema.xml](https://bitbucket.org/johtani/solrbook-lucene-gosen-3.x/raw/b51b74e8c573/introduction/ngram/schema.xml)を利用してください。

<span style="font-size:medium;">1.6.2 形態素解析（18ページ～20ページ中盤まで）
手順が大きく変わります。
Senを利用する場合、Senの辞書のビルド、Senのjarファイルの配置、Senを利用するためのTokenizerクラスを含んだサンプルjarの配置という作業があります。
lucene-gosenではコンパイル済みの辞書がjarファイルに含まれています。
また、Solr向けのTokenizerもlucene-gosenのjarファイルに含まれています。
lucene-gosenを利用して形態素解析を体験するための手順は次の流れになります。
なお、schema.xmlについては上記N-gramでダウンロードしたschema.xmlに形態素解析の設定もあわせて記載してあります。

jarファイル（[lucene-gosen-1.2.0-ipadic.jar](http://lucene-gosen.googlecode.com/files/lucene-gosen-1.2.0-ipadic.jar)）をダウンロードして、$SOLR/example/solr/lib（libディレクトリがない場合は作成）にコピーします。
コピーが終わりましたら、次のように$SOLR/exampleディレクトリでSolrを起動します。
（-Dsen.homeは必要なし）

```

$ java -jar start.jar
```

あとは、書籍の記述にしたがって管理画面のAnalysis画面で動作を確認します。
ほぼ、図1-6と同じ結果になっていると思います。
（lucene-gosenで出力される情報には本書のサンプルよりも多くの情報が含まれています。また、サンプルでは、形態素解析の後の単語に基本形を採用しているため、「な」が「だ」として出力されています。基本形を出力する場合は後述するこちらで紹介したTokenFilterを利用すれば可能です。）

<span style="font-size:large;">2章

<span style="font-size:medium;">2.1.3 schema.xmlのバージョン（27ページ）
Solr3.xではschema.xmlのファイルの最新バージョンは**1.4**になっています。

<span style="font-size:medium;">2.2.3 代表的なトークナイザ（35ページ）
solrbook.analysis.SenTokenizerFactoryは必要ありません。
先ほども説明しましたが、lucene-gosenにはSolr向けのトークナイザが用意されています。
solr.JapaneseTokenizerFactoryがそれに該当します。

<span style="font-size:medium;">2.2.4 代表的なトークンフィルタ（37ページ）
以下の2つについてはlucene-gosenに同等のトークンフィルタが存在します。
* solrbook.analysis.KatakanaStemFilterFactory
* solrbook.analysis.POSFilterFactory

それぞれ、次のものがlucene-gosenにあるので、こちらを利用します。
* solr.JapaneseKatakanaStemFilterFactory
* solr.JapanesePartOfSpeechStopFilterFactory

2章向けの[schema.xmlはこちら](https://bitbucket.org/johtani/solrbook-lucene-gosen-3.x/raw/b51b74e8c573/schema/schema.xml)です。その他のtxtファイルについては、特に変更はありません。

3,4章は特に変更はありません。Solrの起動の仕方にだけ注意してください。（-Dsen.homeは必要ありません）

以上が4章までの修正点になります。
動作しないなどあれば、コメントください。
サンプルアプリについてはまた後日余裕があれば。。。



