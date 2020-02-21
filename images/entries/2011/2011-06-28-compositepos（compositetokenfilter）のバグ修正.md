---
layout: post
title: "compositePOS（CompositeTokenFilter）のバグ修正(Jugemより移植)"
slug: compositepos（compositetokenfilter）のバグ修正
author: johtani
date: 2011-06-28T12:36:00+09:00
comments: true
tags: [lucene-gosen]
---
以前、[こちら](http://blog.livedoor.jp/haruyama_seigo/archives/51801386.html#comments)で話題に上がっていた「未知語」に関するcompositePOSのエラーの件を調査しました。（Twitterでも流れてました。）
次のような条件の場合にエラーが発生するようです。

* compositePOSの設定に構成品詞として「未知語」が指定されたエントリが存在する。
* 未知語が連続して出現する文字列をanalyzeする。（例：ニンテンドーDSi）



ということで、trunkに修正版をコミットしました。
Issueは[こちら。](https://code.google.com/p/lucene-gosen/issues/detail?id=11)


※お茶をにごす感じの日記になってしまいました。次回はマシな記事を書く予定です。。。


<span style="color:#FF0000">6/29追記：恥ずかしいバグをいれこんでしましました。。。
ということで、trunkに再度修正版をコミットしました。
