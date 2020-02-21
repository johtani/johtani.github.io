---
layout: post
title: "lucene-gosen4.3.0をリリースしました。（Lucene/Solr4.3.0以上での利用が可能です）(Jugemより移植)"
slug: lucene-gosen4-3-0をリリースしました。（lucene-solr4-3-0以上での利用が可能です）
author: johtani
date: 2013-05-06T23:25:24+09:00
comments: true
tags: [lucene-gosen]
---
Lucene/Solr 4.3.0がリリースされた（[LuceneのChanges](http://lucene.apache.org/core/4_3_0/changes/Changes.html)、[SolrのChanges](http://lucene.apache.org/solr/4_3_0/changes/Changes.html)）ので、lucene-gosen 4.3.0をリリースしました。（[ダウンロードはこちら](http://code.google.com/p/lucene-gosen/downloads/list?PHPSESSID=ab5edaac2154a82b90c0d9865454c0c9)）
なお、lucene-gosen 4.3.0ですが、<span style="color:#FF0000">Lucene/Solr 4.2.1以下のバージョンのLucene/Solrでは利用<span style="color:#FF0000">できません。
注意してください。
また、lucene-gosen 4.2.1もLucene/Solr 4.3.0では動作しませんので注意が必要です。

現時点（2013/05/06）では、lucene-gosen 4.3.0はLucene/Solr 4.3.0でのみ利用できます。
これは、[先日のエントリ](http://johtani.jugem.jp/?eid=129)にも書きましたが、LuceneにてAPIの変更が行われたためとなります。
いくつかのクラスおよびメソッドが廃止されたため、下位互換が保てない変更が入っているためです。

独自のTokenizerやTokenizerFactory、TokenFilterFactory、CharFilterFactoryを作成されている方は、Lucene/Solrのバージョンアップを行う際は注意が必要です。


