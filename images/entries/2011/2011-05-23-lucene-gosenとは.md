---
layout: post
title: "lucene-gosenとは(Jugemより移植)"
slug: lucene-gosenとは
author: johtani
date: 2011-05-23T15:00:00+09:00
comments: true
tags: [lucene-gosen]
---
<p>概要：
　Lucene/SolrのコミッターであるRobert Muirさんが始めたプロジェクト
　
</p>

<p>
歴史：
　MeCabのJava移植版としてスタートしたSenがベースになります。
　その後、辞書の構築部分をPerlからJavaに置き換えたGoSenが登場しました。
　が、どちらもメンテナンスされなくなってきたので、Robertさんが引き継いでメンテナンスとLucene/Solr対応をはじめました。そして、現在にいたります。
</p>


<p>
ライセンス：
　LGPLライセンス（ベースになったMeCabのライセンスにならって）
</p>


<p>
特徴：
　以下のような特徴があります。
　・Lucene/Solrですぐに利用可能（3.1、4.0に対応済み）
　・jarファイル1つで利用可能（辞書をjarファイルに内包）
　・LuceneのAttributeをベースにしたTokenの解析
　・その他（パフォーマンス改善、テスト改善など）

</p>

<p>
プロジェクトのサイト：
　http://code.google.com/p/lucene-gosen/
</p>


<p>
ダウンロード：
　http://code.google.com/p/lucene-gosen/downloads/list
　現時点では2つの辞書を内包したjarファイルが用意されています。

　Naist-jdic 0.4.3（for ChaSen） 参考サイト：http://sourceforge.jp/projects/naist-jdic/
　IpaDic 2.6.0　参考サイト：http://sourceforge.jp/projects/ipadic/ 
　 
</p>
