---
layout: post
title: "Hadoopソースコードリーディング第8回に参加しました。#hadoopreading(Jugemより移植)"
slug: hadoopソースコードリーディング第8回に参加しました。-hadoopreading
author: johtani
date: 2012-02-09T01:03:00+09:00
comments: true
tags: [勉強会]
---
また、勉強会ログです、すみません。。。
直接業務とは関係ないのですが、今回はリクルートの中野さんが話しをされるというので顔を出してきました。
もちろん、内容も気になりましたというのもありますが。
実際には中野さんは2分くらいしか喋らなかったんですけどね。。。

今回は、最初のセッションはちゃんとしたソースコードリーディングでした。
Hadoopの入力としてデータをHDFSじゃなくて、MongoDBから取得するときに利用するMultipleInputの実装をしてみたというお話でした。
MongoDBやHadoopを知らないと（私はあんまり知らない。。。）少しきつかったかもしれないです。
幸い、HadoopのMultipleInputについては以前、すこしだけ見たことがあったので、かろうじてついていけました。
最初の部分を聞きのがしてしまったので合っているか自信がないのですが、10genから出ている[mongo-hadoop](https://github.com/mongodb/mongo-hadoop)の使い勝手、効率の悪そうなところに手を入れた話しがベースになっているんでしょうか？（ツッコミあるとうれしいです）
気になったのは、MongoDBのデータをHadoopから直接取りに行くというユースケースがどういう場合に出てくるのかという点です。
ネットワークやMongoDBの負荷がHadoop処理へのボトルネックになるんじゃないかしらという懸念がありそうだなと。
発表を聞いていて感じたのは、やっぱりソース書いて動かさないとダメだよねぇ、自分も手を動かそうというところです。
リクルートさんの発表は波乱万丈（？）でした。
最後まで話しを聴いたあとに思った感想は「こんなに話して大丈夫なのかな？」「いろんな人を敵に回してない？」というものです。
実際に昨年の夏くらいからEMCの草薙さんも検証メンバーに入って、リクルート社内での活用シーンをベースにMapRの検証をいろんな項目でやられたようです。（ある程度の詳細は以下のメモ参照）
で、最終的な結論はまだ出ていないのですが、最後に出てきた検討中の比較対象が某C社のCDH。
どちらかというとCDHの方に傾いてる感じに取れる終わり方で心配になりました。。。
会場が会場だからというのもあったのかなぁ？
mesosというキーワードが出てきたのが気になりました。単語だけは以前Twitterで流れてきたのを目にしてたのですが、どんなものかという概要がわかったのは収穫でした。
リクルートさんの資料はどこまで公開されるかわからないですが、もう一度見たい気がします。（mesosの部分だけでも公開して欲しい）


ということで、以下はいつもの自分用メモです。



___
日時： 2012年2月8日（水） 19:00～21:30 （受付開始 18:40）
場所： 豊洲センタービルアネックス（NTTデータ、豊洲駅直通）

◎日本OSS貢献者賞・奨励賞のご案内　@hamaken
　[日本OSS貢献者賞・奨励賞](http://ossforum.jp/ossaward7th)


◎『オレオレMultipleInputを作る方法（仮）』@muddydixon さん
[http://www.slideshare.net/muddydixon/multipleinput](http://www.slideshare.net/muddydixon/multipleinput)
```

　hadoopからMongoDBを利用する方法を紹介
　CDH3u2かu3で試しました。
　10genからも出てるけど使いにくい？から作った？
　MongoMultipleInputs.addInputPath
　　で色々簡単に使えるようにしたかった。
　　絞り込みしてデータをMapperにとり込みたかったため。
　　　＝絞り込みできないと必要なデータ以外も取得できてしまいJSONのパース処理がオーバヘッドになるから。
　com.mongodb.hadoop.input.DelegatingInputFormat
　　mongodbの環境にあわせて多くのsplitを生成する。
　mongosへのアクセスはメタ情報の取り出しだけ。
　あとは、個々のサーバにアクセスしてるのでデータ取り出しが高速？
```


◎『MapRってどうよ？ - 実際に使ってみた感触を紹介します』
　 - リクルート 中野さん、高林さん、大坪さん
```

　MapRの説明資料がなかったので、EMCの草薙さんが出てきて説明を開始。

　Greenplum MRはMapRテクノロジが開発した実装のOEM版。
　EMCは特に手を加えず。
　※MapRについては前回のMapR勉強会の記事を御覧くださいな。
　Q：JavaのAPI互換と言われている部分はHadoopのどのバージョン？
　A：CDH3u2に近いパッチが当たってるらしい。
　Q：DFSIO性能の比較対象のHadoopはどのバージョン？
　A：手元に資料は残念ながらないです。

　ここからリクルートさん。
　検証内容：性能検証
　　中古車サイトで利用されている3つのHiveに置き換えてみた。
　結果（パーティション圧縮）
　　MapRのほうが約1.3倍高速に（そこまで速くならなかった？）
　結果（非パーティション圧縮）
　　MapRのほうが約1.7倍高速に（そこまで速くならなかった？）
　　ビルドイン圧縮はGzip圧縮と比較して高速
　※チューニング次第では結果変わるかもね。

　機能検証：マルチテナント検証
　　目的：
　　　複数ユーザに対して1つのクラスタを提供する
　　　セキュリティの担保（）
　　　余剰リソースの有効活用
　　　複数ユーザのJobの並列実行？
　　結果１（ユーザ権限まわり）
　　　MapRのユーザはLinuxユーザに準拠。
　　　同じmaprユーザでもUIDがずれてるとエラーが起きる。
　　　MapR内のPermissionは内部のクラスタ、ボリュームの権限定義が可能
　　　※Volumeは管理者に付加的な情報を与えるような存在
　　　Job実行はHadoopと一緒のアクセス権。
　　　
　　結果２（FairScheduler）
　　　MapRではデフォルトとなっている。
　　　複数テナントからの同時ジョブ実行の動作を確認。
　　　poolをベースにタスクを割り当ててく。
　　　min/max値にあわせてslotが利用される模様
　　結果３（Load処理（Hive）、Job実行（HiveのSelect））
　　　じゃらんPVデータ１ヶ月分をロード。
　　　NFS→MFS
　　結果４（フェイルオーバー）
　　　HA機能
　　　ノード切り替え時間、タスクの復旧までの時間とか。
　　結果５（DirectNFSでの転送）
　　　NFSGatewayをクライアント側にした場合との違いなど。
　　　クライアント側に載せた場合、通信量が減るから速度が出てる。
　Mesos概要
　　Apache IncubatorのOSS。C++により実装
　　効率的なリソース分離、リソース共有機能を提供するクラスタマネージャ。
　Mesosでの検証
　　マルチテナント（ユーザ権限）硬い。
　　リソース制限ができない。などなど。
　MapRとMesosの比較
　　資料期待！
　リクルートとしてのMapRの評価
　　保守/サポート/教育が充実してるのが重要。速度だけじゃない。
　　けど、まだ検討中です。
　Q：クラスタに対するパーミッションの権限情報はどこで管理されてるの？
　　　どこが落ちたときにそのパーミッションの情報がとれなくなる？
　A：CLDBで管理されてます。
　Q：CLDB内部でのデータはバイナリ？DBを別途持ってる？
　A：HDFS上にボリュームが作られてそこに吐き出されてる。
　Q：Jobのスケジュールの情報とかはどこに？
　A：Job管理データはJobTracker用のボリュームに保存されてる。
　　　それを別の人が引き継ぐ。
　Q：ボリュームが壊れたら？
　A：さすがに壊れたら引き継げない。
　　　けど、壊れにくくしてあるのが売り？
　Q：MapRのチューニングのポイントはどんなものがあるの？
　A：チューニングに関しては256Mのchunkサイズを64Mに減らした場合の化粧しかしてない。Apache Hadoopの方は若干チューニングした。
　Q：DFSのシリアライズは？ボンディングとかでもできるんじゃないの？
　A：そこはやってないのでやってみます。
　Q：MapRでの8台構成で全部のせてみた場合、CLDBのリソースはどのくらいもっていってるの？
　A：結構使ってる。CLDBを3台以上にしたらサポート対象外。
　Q：CLDBを3台に制限してる理由は？
　A：わからない。
　Q：本番MapR、検証CDHというのはあり？
　A：M3を開発環境で利用して欲しいですね。（ステマ？）開発目的だとM5を無償提供してほしいなー（EMCへのお願い？）
　Q：Pigの検証は？
　A：リクルートではHiveを利用してたので検証してない。


次回は3月ころかなぁ？だそうです。
```

