---
layout: post
title: "【メモ】Amazon CloudSearchが出てきましたよ(Jugemより移植)"
slug: 【メモ】amazon-cloudsearchが出てきましたよ
author: johtani
date: 2012-04-12T23:31:09+09:00
comments: true
tags: [備忘録]
---
Twitterで[このブログ](http://aws.typepad.com/aws/2012/04/amazon-cloudsearch-start-searching-in-one-hour.html/?PHPSESSID=fdfe9b1cde84fd75f396f6121de595d6)流れてきて、気になったので、流し読みして簡単にメモ。
Amazonのサービスでスケールする検索サービスみたい。

主に、機能面です。価格とかはみてないです。

* データと検索トラフィックに対して自動でスケール（※automaticってのがどういう感じかは調べてないです）
* [CloudSearch APIs](http://aws.amazon.com/jp/documentation/cloudsearch/)でアクセス可能。AWS管理コンソールからオペレーションできる。コマンドツールもある
* データ登録にHTTPSも使えますよ。データ形式はJSON、XML、SDF（Search Document Format）と呼ばれるものに準拠したもの
* near real-timeで検索可能になる。RAMにインデックスを保持して更新処理が早くなる（Lucene/Solrと一緒か？）</lI>
* ステミングとかストップワードの設定変えたらre-index</lI>
* ファセット、フィールド指定検索が可能。（ファセットはファセットクエリみたいなのもできるのかな？）
* データ量が増えたら、サーチインスタンスを追加するか、インスタンスタイプを大きくしてスケールする？
* トラフィックが増えたら新しいインスタンスにデータをレプリケートしてインスタンスを追加する
* 簡単に実現できるよ。ファセット検索、全文検索、And/OR検索式、ランキングのカスタマイズ、フィールド指定ソート、フィールド指定検索、テキスト処理オプション（ストップワード、類義語、ステミングのような）


[ここ](http://aws.amazon.com/jp/documentation/cloudsearch/)から詳細のドキュメントが見れるみたいなので、また、見てみます。

あと、WikipediaをCloudSearchで動かしてる[デモ](http://wikipedia.searchtechnologies.com/)と[それに関する記事](http://www.searchtechnologies.com/wikipedia-cloudsearch.html)もあるみたいです。これも暇を見つけて眺めてみます。
