---
layout: post
title: "Heroku Meetup #8 TreasureData + Waza Report!! に参加しました。#herokujp(Jugemより移植)"
slug: heroku-meetup--8-treasuredata-+-waza-report!!-に参加しました。-herokujp
author: johtani
date: 2013-04-05T11:20:43+09:00
comments: true
tags: [勉強会]
---
{{< amazon "4797371838" >}}
heroku気になってるのに使ってなくて、TDのアカウント作ってデータアップしてない軟弱者ですが、参加して来ました。。。
とりあえず、大事なことです。まずは、上記の書籍を買ってください（って中の人が言ってました。）
[イベントページはこちら](http://herokujp.doorkeeper.jp/events/3405)。

総じて、herokuの中のエンジニアの方たちがすごく情熱があって、ユーザと会話をしたがっているという感想だったようで、まだまだ、よくなりそうだなぁと。
私は、ベースがJavaなので、JavaやScala、Playで使ってる方の感想とか聞きたいかなぁ。
あと、herokuとS3の組み合わせだと思うんですが、料金とかはAmazonとheroku両方に別々に払うのかな？とかはちょっと気になりました。
AWSのアカウントも作ってS3にバックアップあげるの作ろうと思って手をつけてない軟弱者ですが。。。
今月は余裕がありそうなので、TDとか触ってみようと思います。。。

懇親会ではTDのmuga-sanとお話できて、いくつか気になってた話ができたのでスッキリしました。
あと、株式会社サムライズムの名刺頂きました。写真載せろって言われたけど、また今度ｗ

最後に、大事なことです。まずは、上記の書籍を買ってください（って中の人が言ってました。）

以下は、いつものようなメモです。最後の方はちょっとくたばってたのでメモがおざなりになってます、すみません。
___

```

日時：2013年04月04日(木) 18時30分 - 21時00分
場所：日本創生ビレッジ 事業開発支援オフィス 東京21cクラブ コラボレーションスペース


◯Ayumu Aizawa（Heroku, Inc.）
　・■
　　PostgreSQLが9.2になりました。
　・◆
　　メモリが2倍。βテスタ向けにスケールアップ。
　　JavaとかJavaとかJavaとかデプロイしてもいいよね。
　　けど、メモリ2xは価格も2x！
　・●
　　Heroku OAuthを提供。Experimentalだけど。
　　heroku-bouncer使うとOAuthが楽になる。

◯Treasure Data and heroku
　Masahiro Nakagawa（TreasureData）
　・会社紹介
　・フロントエンド部分の担当（fluentd）
　・1500億レコード！？
　・投資家の中にHerokuの方がいる。
　・ターゲットは？
　　Cloud + Big Dataが対象
　　Hadoopは立ち上げるのはいいんだけどメンテナンスコストが。
　　Hadoopの処理基板を提供
　・Hadoop生ではなく、Plazmaを使っていたりする。
　・Viki
　　herokuにtd-agent入れて、TDにデータ送って、Postgresに書き出して使ってる。
　・TDはどうやってheroku使ってるの？
　　Webコンソール。
　　　http://console.treasure-data.com
　　Webサイトは大体heroku
　　　fluentdとかも
　・herokuのaddonとしてtd-agentを提供してる。
　・STDOUTからTDにデータ送るのもできるよと。


◯Waza Report
　◯吉田雄哉さん（co-meeting）
　　・まずは、co-meetingの紹介。
　　　1文字ずつ送信してるよと
　　・Chief Talk Officerらしいｗ
　　・MongoDB使ってるって言ったら、herokuのPostgreSQLの人と話して、鼻で笑われたｗ
　　・すごく熱意のある人達がエンジニアとして働いてる
　　・ユーザの声をきちんと聞いてくれる体制ができてるミーティングだった。
　　・「クラウド」って単語を聞いてない。勉強会のレベルもすごい。

　◯山本裕介さん（株式会社サムライズム）
　　・ニッチなブログ書いてます。
　　・Java屋が見るWaza
　　　Tシャツプレゼント！
　　・OSS好きが多い。
　　　Java/Scala系の話が少なかった。Scala界隈では人気みたい

　◯岡村純一さん（株式会社シャノン）
　　・スライド1枚も作らずに喋る人とかいました。
　　　（すごい。。。）
　　・Django

　　　Playに似てて面白いかもと
　　・Ruby2.0
　　　Matzが喋ってたとか
　　・クロージングはビールが出てきてた。
　　　交流パーティみたいになってた。CROSSがそれに似てますね。日本でやってるイベント

　◯小西俊司さん（株式会社フレクト）
　　・バックエンドの性能とかを収集して見ることができるツールがあるらしい。
　　・クエリを登録しておくと監視ができるツールとか。（TDとかぶってる？）
　　・やっぱり、情熱的だし、OSS好きでオープンな感じのエンジニアが多い。


◯Heroku LT
　無慈悲なLTです。3分たったらケーブル引っこ抜きます。
　（最後はくたばっててあまり聞けてない。。。）

　◯山本 裕介（株式会社サムライズム）
　　・herokuでJava7！
　　　Java6終わってますからherokuも移行してね！
　◯竹野 淳（Grow!）
　　・BoxTo？
　　・コラボレーター募集！
　◯小西 俊司（株式会社フレクト）
　　・ExcelのテンプレートをアップロードしてGETでパラメータわたせばいいよみたいなの作ってる。
　◯大久保英樹（Job-Hub）
　　・CarrierWaveとかの注意点
