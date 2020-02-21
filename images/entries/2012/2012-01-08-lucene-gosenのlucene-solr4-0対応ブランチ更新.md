---
layout: post
title: "lucene-gosenのLucene/Solr4.0対応ブランチ更新(Jugemより移植)"
slug: lucene-gosenのlucene-solr4-0対応ブランチ更新
author: johtani
date: 2012-01-08T23:41:00+09:00
comments: true
tags: [lucene-gosen]
---
先日のSolr勉強会でLucene/Solr4.x系のlucene-gosenについて質問を受けていたのを忘れないように（年越しちゃいました、すみません。）先週金曜日（1/6）に[issueに登録](http://code.google.com/p/lucene-gosen/issues/detail?id=22)しました。
まずは忘れないようにと思って、登録だけして3連休に突入したのですが、Robertさんが1/7に対応してくれました。
Lucene/Solr 4.x系では3.x系とはパッケージやメソッドが変更されるなど少し異なる部分があります。
lucene-gosenでは、プロジェクトのページにもあるとおり、4.x系にも対応しています。
ただ、[この4x系に対応したブランチ](http://code.google.com/p/lucene-gosen/source/browse/#svn%2Fbranches%2F4x)が、2011年5月から放置されていました。

ということで、Lucene/Solr 4.0系でlucene-gosenを利用されている方、これから利用される方は、[この4x系に対応したブランチ](http://code.google.com/p/lucene-gosen/source/browse/#svn%2Fbranches%2F4x)を利用してください。
なお、このブランチにはLucene/Solrのtrunk (r1228509)のSNAPSHOT版のjarファイルが利用されています。

今後はlucene-gosen側でバグ修正や機能追加を行った場合にも4xブランチを更新していく予定です。
※ただし、Lucene/Solr 4.0が正式リリースされていないため、頻繁にSNAPSHOTのjarファイルを入れ替えることはこなわないと思います。

