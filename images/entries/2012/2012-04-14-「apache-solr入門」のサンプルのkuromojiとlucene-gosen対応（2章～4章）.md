---
layout: post
title: "「Apache Solr入門」のサンプルのKuromojiとlucene-gosen対応（2章～4章）(Jugemより移植)"
slug: 「apache-solr入門」のサンプルのkuromojiとlucene-gosen対応（2章～4章）
author: johtani
date: 2012-04-14T02:58:00+09:00
comments: true
tags: [solr]
---
先日の続きです。「Apache Solr入門」の2章から4章の説明について、Solr3.6.0で動作させる時の変更点を以下に書いていきます。
なお、前回も説明しましたが、3.6.0からKuromojiという形態素解析器がSolrに同梱されるようになりました。
これから説明する2章の変更点の手順ですが、Kuromojiとlucene-gosenそれぞれの利用方法について説明します。
添付のschema.xmlについては、基本的にKuromojiを利用する形に変更してあります。
それに加えて、lucene-gosen用のフィールドを別途追加で定義しました。
これらのフィールド名については、次の表の用になります。
適宜、書籍のフィールド名と置き換えながら読み進めたり、試したりしてください。

<table class="list_view">
  <thead>
    <tr>
      <th>Kuromojiフィールド</th>
      <th>lucene-gosenフィールド</th>
    </tr> 
  </thead>
<tbody>
<tr>
  <td>title</td>
  <td>title_gosen</td>
</tr>
<tr>
  <td>author</td>
  <td>auther_gosen</td>
</tr>
<tr>
  <td>summary</td>
  <td>summary_gosen</td>
</tr>
<tr>
  <td>intended_reader</td>
  <td>intended_reader_gosen</td>
</tr>
<tr>
  <td>from_author</td>
  <td>from_author_gosen</td>
</tr>
<tr>
  <td>toc</td>
  <td>toc_gosen</td>
</tr>
  
</tbody>
</table>


<span style="font-size:large;">2章

<span style="font-size:medium;">2.1.3 schema.xmlのバージョン（27ページ）
Solr3.xではschema.xmlのファイルの最新バージョンは**1.<span style="color:#FF0000">5**になっています。

<span style="font-size:medium;">2.2.3 代表的なトークナイザ（35ページ）
solrbook.analysis.SenTokenizerFactoryは必要ありません。
<span style="color:#FF0000">Solr 3.6.0からはKuromojiと呼ばれる形態素解析器が用意されています。
solr.JapaneseTokenizerFactoryがそれに該当します。

これとは別に、lucene-gosenを利用する場合、Solr向けのトークナイザが用意されています。
solr.<span style="color:#FF0000">GosenTokenizerFactoryがそれに該当します。

<span style="font-size:medium;">2.2.4 代表的なトークンフィルタ（37ページ）
以下の2つについては<span style="color:#FF0000">Kuromojiが同等のトークンフィルタを提供しています。
また、lucene-gosenを利用する場合は、lucene-gosenに同等のトークンフィルタが存在します。
* solrbook.analysis.KatakanaStemFilterFactory
* solrbook.analysis.POSFilterFactory

<span style="color:#FF0000">次のものがSolr 3.6.0に用意されているので、こちらを利用します。
* solr.JapaneseKatakanaStemFilterFactory
* solr.JapanesePartOfSpeechStopFilterFactory

それぞれ、次のものがlucene-gosenにあるので、こちらを利用します。
* solr.<span style="color:#FF0000">GosenKatakanaStemFilterFactory
* solr.<span style="color:#FF0000">GosenPartOfSpeechStopFilterFactory

2章向けの[schema.xmlはこちら](https://bitbucket.org/johtani/solrbook-lucene-gosen-3.x/raw/48834b2d0465/schema/schema.xml)です。その他のtxtファイルについては、特に変更はありません。

3,4章は特に変更はありません。Solrの起動の仕方にだけ注意してください。（-Dsen.homeは必要ありません）

以上が4章までの修正点になります。

昨日に引き続き、眠い目をこすりながら修正したので、おかしいかも。
動かない、意味がわからないなどあれば、コメントorツイートいただければと思います。



<span style="color:#FF0000">2012/06/14提供しているschema.xmlに関して修正を加えました。[こちらの記事](http://johtani.jugem.jp/?eid=92)で説明しているautoGeneratePhraseQueriesの値をtext_gosen、text_cjkのフィールドに対してtrueを設定する記述を追記しました。
