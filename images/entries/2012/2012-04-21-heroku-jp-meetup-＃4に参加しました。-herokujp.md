---
layout: post
title: "Heroku JP Meetup ＃4に参加しました。#herokujp(Jugemより移植)"
slug: heroku-jp-meetup-＃4に参加しました。-herokujp
author: johtani
date: 2012-04-21T00:23:00+09:00
comments: true
tags: [勉強会]
---
WebSolrの話があるらしいというのを嗅ぎつけて、初めて[Heroku JP Meetup](http://atnd.org/events/27370)に参加しました。
herokuもWebSolrも知りつつ、手を出していなかったので、いい機会でした。
（SignUpだけ、勉強会直前に済ませましたｗ）

[Heroku](http://www.heroku.com/)はAWS上に構築されたアプリケーションプラットフォームで、簡単にアプリをデプロイして動作させることができるようです。
Ruby on Railsを使うのが多いみたいですが、他の言語も利用できると。
で、herokuの面白いところは、アドオンとして、開発が簡単にできるようなしくみが用意されていることみたいです。
今回発表のあった、IronMQ、WebSolr、PaperTrailもアドオンとして用意されており、簡単に利用することが可能です。
[IronMQ](http://www.iron.io/products/mq)はメッセージキューとして利用できます。

[Websolr](http://websolr.com/)はSolrを簡単に利用できる形で提供しているものになります。
今、利用できるのは3.5.0のようで、最新版（3.6.0）になるのはまだ未定のようです。
今回の発表はWebSolrの話しもありましたが、基本は全文検索の仕組みとKuromojiの説明でした。
ただ、残念ながら、Kuromojiは3.6.0からの提供となるので、現時点では利用できないようです。
あとで、聞いた話だと、schema.xmlを自分で変更できるようです。
ただ、jarファイルを置いたりはできないようなので、lucene-gosenを利用するとかはできないみたいですが。。。
ほかにも、[bonsai.io](http://bonsai.io/home)として、ElasticSearchの提供も行うようです。
まだ、利用はできないようですが。

最後が[Papertrail](https://papertrailapp.com/)です。
こちらは、ログを保存して、検索、グラフ化（視覚化）してくれるアドオンです。
まだ、ベータのようですが、ログを保存してくれるようです。無料版もあるようです。
アドオンとしての機能もそうですが、[利用しているグラフ化のツール](https://metrics.librato.com/)など、面白そうなものが利用されていました。

LTはRuby使いの方が多かったです。

Ruby使いではないのですが、いろいろなアドオンが用意されており、サービスを簡単に提供することができそうだという印象をうけ、ちょっと使ってみたいなぁと思いました。
普段参加していない勉強会だったので、普段では知りえない興味ある話が聞けて面白かったです。

余談ですがPapertrailの人が利用していた、slideshareのようなサービスの[Speaker Deck](http://speakerdeck.com/)もよさそうなので登録してみました。
次に何か発表があった時には資料はこっちにアップしてみようかなぁと


以下は、いつものように自分用のメモです。

___

```

日時2012/04/20 19:00 to 21:00
会場：パソナグループ本部　呉服橋
◎オープニング – Ayumu AIZAWA (Heroku Evangelist）
```
```

◎新入社員からの挨拶 – Koichi SASADA (Ruby Developer）
　前職：大学教員
　仕事：CRuby開発
　Heroku使った事無いですｗRailsもよく知らないですｗ
　RUby2.0のリリースがゴール。2013/Feb
　性能アップのことやってます。
```

◎[IronMQ](http://www.iron.io/products/mq) – Chad Arimura (Iron.IO)

```

　「メッセージキューは涼しいです。」
　（Google翻訳による日本語訳付きのスライド）
　Aggregation、Distribution。。。
　IronMQ
　　Elastic、RESTful
　　heroku addon ironmq:rust
　簡単にheroku上にキューが用意できるアドオンです。
　Q：メッセージがキューに到達したのを確認する方法か？
　A：ステータスコードが帰ってくる。
　Q：データのサイズのリミットは？
　A：postのリミットはある。S3とかに巨大データをおいて、ポインタを渡すとかしてほしい。
　Q：キューへの到達の成功の保証は？
　A：アプリケーション側で判断してください？
```

◎Search & Indexing on Heroku – Nick Zadrozny ([Websolr](http://websolr.com/))
[スライドはこちら。](http://www.slideshare.net/nzadrozny/fulltext-search-with-emphasis-on-japanese)
```
　
　※ツイートしてて、メモとってなかったので、ツイートをコピペ。
　次はWebsolrのお話
　Bonsai.io？
　Bonsai by onemorecloud - http://bit.ly/JjCuaE
　SQLのLIKE検索はO(n)でおそいねぇと。
　クエリのパースについての話。
　今度は転置インデックスのお話。
　Termへの分割ってどーすんの？というお話。Tokenizeのお話。
　その１：N-GramというTokenizeの方法。N文字ずつ先頭からTermを切り出す。開始位置は1文字ずつずらしていくと。
　N-Gramはノイズがのるし、多くのTermがでてきちゃうよと。
　その２：そこで、次は形態素解析ですね。
　先週、Lucene/Solr 3.6.0がリリースされて、Kuromojiという日本語向けの形態素解析器がでましたよ。
　Kuromojiはこちら。（Lucene版とは少し違うけど。）http://atilika.org/
　Kuromojiのサーチモードのお話。
　通常は、「関西国際空港」という単語になってしまうのを、Kuromojiでは「関西」「国際」　「空港」という切り方の単語も出してくれると。
　ちなみに、lucene-gosenでは、サーチモードはないんですねぇ。。。
　「の」はどこに消えたんだ？？そこの説明は？
　ElasticSearchやSolrのコアの部分でLuceneを使ってるよ。
　ElasticSearch　http://bit.ly/qjjvWp
　Kuromojiはユーザ辞書をサポートしてるよ。

　Q：まだ、3.5.0では？
　A：もうすぐやります
```

◎log analysis for your Heroku app – Eric Lindvall ([Papertrail](https://papertrailapp.com/))
　
　heroku上にログを貯めて、検索したりグラフ化したりできるようになりそうなもの。
　[スライドはこちら](http://speakerdeck.com/u/lindvall/p/log-analysis-for-your-heroku-app)
　ログを貯めて、検索や可視化できるようにするサービスみたいです。
　まだ、アイデアレベルのものも発表資料には含まれていました。
　内部で利用しているツールなど、資料の最後に出てきますが、色々と面白そうなものがありました。

```

◎Lightning Talks
　◯Receibo ( @shu_0115 )
　　デザイナーｘエンジニアハッカソンでの成果らしい。
　　Webベースの家計簿アプリ。
　　買ったものの名称と料金を入れるだけ。

　◯Heroku + Pusherで作る！リアルタイムアプリケーション ( @satococoa )
　　WebSocketみたいなことが、Pusherでできるらしい。
　　http://www.slideshare.net/satococoa/heroku-pusher　　

　◯Herokuアドオンを作ってみてわかったこと ( @takkam )

　◯heroku client のちょっと進んだ使い方 ( @hsbt )

　◯love heroku? – we love herokuのご紹介 ( @ppworks ）
```
