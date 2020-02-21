---
layout: post
title: "Python Developers Festa 2012.07に参加してしゃべってきました #pyfes(Jugemより移植)"
slug: python-developers-festa-2012-07に参加してしゃべってきました--pyfes
author: johtani
date: 2012-07-28T18:15:00+09:00
comments: true
tags: [勉強会]
---
ということで、[ステッカー](http://via.me/-3guon2i)欲しさ？に勉強中の話を恥ずかしげもなく偉そうにしゃべってきました。
#pyfesは以前から、気になっていたんですが、タイミングがあわず初の参加になりました。
TwitterのプロフィールにSenseiDBに興味あると書いていたら、@voluntusさんに声をかけていただけて、
さらになぜかelasticsearchの話をすることにして話をしてきました。
まだまだ、いろんな意味（プレゼン的にも内容的にも）で至らない所だらけだったので反省しまくりですが、
これでまた経験値が稼げたかなと。次回に活かしたいと思いますです。
やっぱり、しっかり勉強して、シナリオを練ってから発表しないとダメですね。。。

発表のスライドは一番最後にリンクを用意しておきましたので、興味があれば見てもらえればと思います。

___
ということで、いつものメモを残しておきます。

```

日時：日本オラクル青山センター
場所：2012/07/28 10:00 - 20:00
```

概要：[こちらにページあり](https://github.com/pyspa/pyfes/blob/develop/201207.rst)

前半（10時から15時）はハンズオンなどをやられてました。参加せずにスライドを微調整して、他の勉強会のスライドをいじったりしてました。
以下は、15時から行われたスライドのメモになります。


```

　◯PyConJP の宣伝　@shomah4a（LT）
　　9/15-17
　　PythonカンファレンスJapan
　　App Engine、Django、Sphinxなどのカンファレンスも併設
　　遠方参加者支援制度があるらしい。
```

```

　◯elasticsearch 入門　@johtani
　　わかりにくい話でしたかねぇ。。。
```

```

　◯たのしいうぇっぶくろーら　@tokoroten（LT）
　　index.htmlをクロールしまくってる社畜2.0の人らしい。
```
```

　◯Sphinxを使って翻訳してたら本が出てた話　@ymotongpoo（LT）
　　OSSでもドキュメント翻訳でお手伝いできるよ。
　　そしたら、いつのまにか書籍も出せたよ。
```
[スライド](http://www.slideshare.net/ymotongpoo/sphinx-13784014)


```

　◯iOS関連のお話　@Seasons
　　バイナリ解析をしてゴニョゴニョする話。
　　解析するのに何を使ったとか思考の遷移を説明してくれるのでわかりやすい。
　　スライドが大きなマインドマップを切り出した形。
```

```

　◯HBaseのお話　@shiumachi
　　HBase
　　　分散DB
　　　列ファミリ思考
　　HBaseなんで？
　　　RDB→シャーディング→だるい。。。
　　　シャーディング→スケールできねー
　　nandeHBase？
　　　書き込みスケールできるよ。
　　　KVS
　　HBaseのデータ構造
　　　キーがいろいろな情報を含んでる
　　　キーがソートされてる
　　HBaseのテーブル構造
　　　リージョンがシャーディングの情報もと？
　　リージョン見つけなど
```
[スライド](http://www.slideshare.net/shiumachi/20hbase)


```

　◯PythonではじめるGit　@mkouhei
　　GitPython
　　LXCホスト？
　　GitもPythonも初心者だわー
```

```

　◯勉強会を成長させる参加者になろう　@sawonya
　　イラストレーター（スタートアップRubyのイラスト書いた人。サインもらいましたｗ）。
　　参加者が増えるとなにがいいの？など。
　　勉強会参加に向けた勉強会の講師とかやられてるらしい。
```
[スライド](http://www.sawonya.com/ss.htm)

```

　◯IT 系勉強会ネタ(仮)　@tmmkr 
　　アジャイルサムライを読んだ情報を共有したくなって読書会を開催してみた！
　　ビアバッシュのケータリングとかは楽天デリバリーとか、カクヤスがいいよ。
　　かなり、いいスライドなので、あとで見返す。
　　今、読書会やったりしてるし、Solr勉強会の役にも立てそうだし。
```
[スライド](http://slidesha.re/Qt1Rpq)


```

　◯Do not invent your RNG...　@kenji_rikitake
　　Androidの乱数のコードがすごいらしい（ひどい）
　　Pythonの乱数ではos.urandomを使うのが安全です。
　　オレオレ乱数は作っちゃ駄目！
```

```

　◯分散ファイルシステム（LeoFS）　@yosukehara
　　LeoFSの開発者の方。
　　Erlangで98%書いてある。
　　Masterノードは存在しない。SPOFになるから。
　　分散システムとして元にした概念とか論文ってあるんだろうか？
```

```

　◯継続的デリバリー　@troter
　　CIとデリバリーの話。
　　いいこと書いてあるんだけど、実際のツールの話しがないのが辛いこともある
　　ということで、Python周りのツールをこうして見たよというお話。
　　Rubyの方がものがいろいろ揃ってるらしい
```

```

　◯クライアントサイドのみで作ったダッシュボード　@takufukushima 
　　RESTアクセス用のUIのフロントエンドの話？
　　JSのお話の？node.jsとかの話。
　　MVCにしたり、CSSフレームワーク使ったり。
　　backbone.jsつかってるらしい。
　　実際の画面がみたいなぁ。
　　現状の話なので、
```

```

　◯Meinheld　@mopemope
　　Python3対応とかLoggerとかやってから秋くらいに出るみたい。
　　このあたりは未知の領域です。。。
```

```

　◯3分間で開発環境構築 @tk0miya
　　Vagrant＋Chefみたい。
　　VeeWeeってのでIOSイメージからVMイメージを作ってくれる。
　　（githubから持ってこないといろいろ古いらしい）
　　これ、重要だと思う。
　　実践するようにしよう。
　　手順書がわりにChefのレシピを書こうよと。
　　環境マニア募集中！
　　継続的デリバリー座談会やってます
```

```

　◯筋トレ講座　@hiroki_niinuma
　　ジムに通い続けるのはキツイ。
　　成功率5%
　　以下の条件に
　　・10時間以下の仕事時間
　　・ジムが近い
　　・ジムという環境が好き
　　ベンチマークｗ先入観を捨てましょうとｗ
　　ジムで筋トレとかよりも歩くのが全然いいよと。
```


togetterがあったのでリンク。
[http://togetter.com/li/346242](http://togetter.com/li/346242)
[http://togetter.com/li/346270](http://togetter.com/li/346270)
___

スライドはこちら。


<iframe src="http://www.slideshare.net/slideshow/embed_code/13783936" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe> <div style="margin-bottom:5px"> ** [Elasticsearch入門 pyfes 201207](http://www.slideshare.net/JunOhtani/elasticsearch-pyfes-201207) ** from **[Jun Ohtani](http://www.slideshare.net/JunOhtani)** </div>

___

それにしても発表するといういい機会を与えてもらえて良かったです！。
継続的にelasticsearchも調べていきたいので、興味ある人は声をかけてくださいー


