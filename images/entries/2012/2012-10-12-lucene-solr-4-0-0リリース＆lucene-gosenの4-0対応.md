---
layout: post
title: "Lucene/Solr 4.0.0リリース＆lucene-gosenの4.0対応(Jugemより移植)"
slug: lucene-solr-4-0-0リリース＆lucene-gosenの4-0対応
author: johtani
date: 2012-10-12T17:45:00+09:00
comments: true
tags: [lucene-gosen]
---
##Lucene/Solr 4.0.0リリース
ついに、Lucene/Solr4.0.0がリリースされました。
MLで流れていましたが、3年越しのリリースだったようです。
コミッターの方々、JIRAにバグ報告をした方々、お疲れ様でした。

ということで、ちょっと忙しくなりそうです。。。
4.0の機能を調べたりもしたいですし、すこしずつ紹介もしたいです。

本家サイトのニュースは[こちら](http://lucene.apache.org/solr/solrnews.html)
___

##lucene-gosenの4.0対応版について
lucene-gosenも4.0正式版のjarを利用したバージョンを公開する予定です。
branches/4xでは、すでに作業を行なっており、jarファイルの差し替えは終了しています。
お急ぎの方は、branches/4xをエクスポートして、ビルドしていただくと利用可能となっています。
なお、Lucene/Solrのバージョンが上がっているため、lucene-gosenのメジャーバージョンも変更し、lucene-gosen-4.0.0としてリリース~~する予定です~~しました。。（順当に行けば、3.0.0ですが、Luceneのメジャーバージョンに合わせたほうがわかりやすいかと思いまして。）
また、現在、trunkが3.6.x対応のソースになっていますが、このあと、現在のbranches/4xのソースをtrunkにする予定です。
3.6.x対応のlucene-gosenについては、branches/lucene-gosen-rel2.0にて作業を行うこととなります。
今後は注意してチェックアウトするようにお願いいたします。


ということで、[ダウンロードできるようにしました。](http://code.google.com/p/lucene-gosen/downloads/list)
lcuene-gosen-4.0.0*.jarとついているものがLucene/Solr 4.0.0に対応したライブラリになります。
