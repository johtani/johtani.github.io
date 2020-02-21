---
layout: post
title: "Twitterが公開した分散トレーシング（追跡？）システム、Zipkin(Jugemより移植)"
slug: twitterが公開した分散トレーシング（追跡？）システム、zipkin
author: johtani
date: 2012-06-13T00:40:00+09:00
comments: true
tags: [OSS]
---
すでに読まれた方もいるかも知れませんが、気になったのでメモを書いてみようかと。

先週の木曜日に[TwitterのエンジニアブログでZipkinというOSSを公開したという記事](http://engineering.twitter.com/2012/06/distributed-systems-tracing-with-zipkin.html)がでました。
非常に興味深いシステムだったので、ちょっとずつ読み解いていきたいなという宣言（というか、ハッパをかけてもらうため）も兼ねて、まずはブログの内容をメモ程度に残しておきます。

___
[Zipkin](https://github.com/twitter/zipkin)は分散トレースシステム（distributed tracing system）です。Twitter APIの１リクエストを構成する様々なサービスのタイミングデータ（計時データ）を集めるために作りました。
Firebugのような性能プロファイラのよなもので、しかもバックエンドのサービスもプロファイル可能です。
ZipkinはAPLv2ライセンスでOSSとしてGithubで公開しています。

ZipkinはWebのユーザインタフェースを持っています。（元記事参照）
各サービス（縦軸）でどのくらい時間がかかっているか（横軸）がわかり、クリックすることでより詳細な情報が得られます。
Zipkinはパフォーマンス改善の余地のある部分（遅いMySQLのSELECTなど）を見つけるのに役立ちます。

<b>Zipkinはどのように動くの？</b>
Twitterに届いたリクエストからサンプリングしたリクエストに対してトレース可能なIDを付与して、すべてのサービスに渡していきます。
全リクエストの一部をサンプリングすることで、トレースのオーバヘッドを減らし、常に本番環境で利用できるようにしています。
Zipkinコレクタ（collector）が、Scribe経由でタイミングデータを受け取り、Cassandraに保存してインデックスを作成します。
Zipkinクエリデーモンがインデックスを利用して、WebUIにトレースデータを見つけます。

ZipkinはHack Weekで開始されました。
最初はThriftに対する[Google Dapper](http://research.google.com/pubs/pub36356.html)の論文の基本的な部分の実装から始まり、現在ではHttp、Thrift、Memcache、SQL、Redisリクエストをサポートしています。
これらはFinagleライブラリで経由で動作します。Rubyのgemも用意してあります。

___

ということで、ほぼ直訳ですが、何かの役に立てればと。
ちょっとずつですが、Githubのページやソースを読みながら記事を書いていこうと思っています。
