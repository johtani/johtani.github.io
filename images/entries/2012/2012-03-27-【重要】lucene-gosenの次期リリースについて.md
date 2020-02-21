---
layout: post
title: "【重要】lucene-gosenの次期リリースについて(Jugemより移植)"
slug: 【重要】lucene-gosenの次期リリースについて
author: johtani
date: 2012-03-27T02:39:00+09:00
comments: true
tags: [lucene-gosen]
---
lucene-gosenを利用して頂いてる皆様に連絡があります。

<span style="font-size:medium;">連絡事項
___

**次期lucene-gosenのリリース（2.0を予定）にて、org.apache系のパッケージ名および、クラス名の変更を行います。**
Lucene/Solrの次期リリース版である3.6.0以降では、lucene-gosen 2.0（予定）を利用するようにしてください。

<span style="font-size:medium;">経緯
___

Twitterでは少しずつツイートしていますが、Lucene/Solr 3.6から日本語の形態素解析器がLucene/Solrにて用意されることになりました。
ベースとなっているのは、Atilika社が開発した[Kuromoji](http://atilika.org/)という形態素解析器です。
Lucene/SolrにコントリビュートされたタイミングではKuromojiAnalyzerなど、Kuromojiという名称が残った形で取り込みが行われました。
その後、[LUCENE-3909](https://issues.apache.org/jira/browse/LUCENE-3909)にて、Kuromojiではなく、一般的な名称（Japanese*）に変更する提案が行われました。
この提案で、luene-gosenが利用しているクラス名、パッケージ名と大半のクラスが衝突してしまうこととなりましす。
今後も、lucene-gosenを利用していただけるように、lucene-gosenの[Issue](http://code.google.com/p/lucene-gosen/issues/detail?id=27)を発行し、
現在、lucene-gosenのtrunkにてパッケージ名の変更及びクラス名の変更作業を行なっています。
正式にリリースするタイミングになりましたら、再度連絡いたします。

<span style="font-size:medium;">ブランチなどについて
___

現時点ではパッケージ名、クラス名の変更はリポジトリの以下のものについてのみ作業を行う予定です。
* trunk
* branches/4x

現時点でのリリース版（1.2系）のソースについてはbranches/rel-1.2にて、これまで同様のクラス名、パッケージ名のまま変更を行いません。
1.2系についてはこちらをご覧下さい。

また、当ブログにて、提供しているSolr入門のサンプルに利用可能なschema.xmlなどの[記事](http://johtani.jugem.jp/?eid=44)についてもLucene/Solr3.6がリリースされた際には再度修正して掲載いたします。
Kuromojiの利用方法もあわせて記載したいです。

___
参考：
lucene-gosenとKuromojiの機能などの比較については[こちら](http://www.rondhuit.com/solrの日本語対応.html)を参考にしてください。



