---
layout: post
title: "Hadoop Conference Japan 2011 Fallに参加してきました。(Jugemより移植)"
slug: hadoop-conference-japan-2011-fallに参加してきました。
author: johtani
date: 2011-09-27T17:51:00+09:00
comments: true
tags: [hadoop]
---
Hadoop Conference Japan 2011 Fallに行ってきました。
まずは、ユーザ会の方々、運営の方々、発表された方々お疲れ様でした。こんな機会を用意していただき、ありがとうございます。
Hadoopは昨年触っていたのですが、最近は縁がなくなってしまいました。
ただ、触っていたときに面白かったので参加してきました。
ということで、今回も自分用にメモを取ったので。（今回は英語のヒアリングがあって、メモがひどい事になってます。。。）
いつものことながら、おかしいところとかあれば、ツッコミなどフィードバックをもらえると嬉しいです。


場所：ベルサール汐留
日時：2011/09/26 10:00～18:00＋懇親会：18:30～21:00

オープニングトーク：濱野、太田
　参加者：1100名超！（実際は800名弱？）
　Hadoopの経験：利用経験なしな方が580名
　カンファレンスの認知：Twitterよりも知人、その他が多かった。
　会場提供：リクルート様
　リクルート米谷様より一言。
　　Question VOTE！！サイトを用意。
　　http://mit.recruit.co.jpにて情報提供。
　※残念ながら地下だったため、E-mobileにつながらず、あと、電源確保が難しかったのでMBAをスタンドアロンにしてメモをとっていたので、
　　QAサイトにはアクセスしませんでした。もう少し活用したかったんですが、携帯でTwitterを追っかけるので精一杯。。。

**◎The role of the Distribution in the Apache Hadoop Ecosystem：Todd Lipcon（Cloudera）**
```

　1.Introduction
　　Todd Lipcon：Clouderaエンジニア
　　Hadoop とHBaseのコミッター
　2. Hadoop Overview
　　HDFS＋MapReduceの説明
　　Hadoopの生まれてきた経緯　
　　　様々な形式のデータが大量に存在し、データのハンドリングが難しくなってきたため。
　　　Flexible, Scalable Solutionが必要に。
　　Hadoop の2つのユースケース
　　　1.Advanced Analytics
　　　　SNS（Web）、Content Optimization（Media）、Network Analytics（Telco）、
　　　2.Data Processing
　　　　Clickstream SessionizationEngagement

　3.Cloudera Overview
　　ClouderaCustomers
　　　・Large National Bank
　　　・Web-Based Media
　　　　click-through dataや広告のログ
　　　・Wireless Telecom
　　　　大量のデータ
　　目標：大量データからビジネスを引き出すこと。
　　Cloudera Japan：トレーニング。NTTDと協業して開発支援も
　4.CDH Overview
　　100% pure Apache Hadoop
　　SCM Epress(Service &amp; Configuration Manager)
　　　Free 
　　なぜ、CDHを利用するの？
　　　Linuxを利用する場合にLinux.orgからはダウンロードしないように、Hadoopも同じように提供したい。
　　　　RedHat系を目指しているみたい。
　　　様々なパッケージの依存関係が混乱を招く。
　　　　CDHならテストが終わってるものが提供されてる。
　　※SolrはLWEがLucidWorksEnterpriseがこれを目指してるのか。
　5.Cloudera Enterprise
　　Activity Monitor：Jobのパフォーマンスをリアルタイムに監視
　　SCM：設定のvalidateや管理。
　　Resource Manager：。。。
　6.まとめ
　　CDH：簡単にHadopが使えるよ。
　　SCM Express：簡単にHadoopの設定ができてフリーだよ
　　Cloudera：Hadoopに関していろいろサポートしているよ。（Enterprise用ソフトやトレーニングなど）
```


**◎About Hortonworks：Owen O'Malley（Hortonworks）**
```

　1.About Hortonworks
　　2011/2月に設立
　　22人のYahooからのアーキテクトとコミッタにより設立
　2.Credentials
　　Yahooのクラスタの経験者がいますよ。
　　OSSに長けた人達によるチームです。
　3.What is Apache Hadoop
　　Hadoopの説明（別の側面が幾つかあり。）
　　Commodity Hardwareで動く
　　簡単にプログラムできる
　　典型的なアプリケーションのタグクラウド（あとでちゃんと見る）
　　HadoopのほとんどのソースコードはYahooで作られてるよ。
　　Clouderaとか目じゃないよ
　4.Hadoop @ Yahoo!
　　各種サーバや規模など
　　Science Hadoop Cluster &lt;-&gt; Production Hadoop Cluster &lt;-&gt; Serving Systems
　　　という構成で、いろいろやってます。
　5.Hadoop Market
　　ビジネス：ビッグデータを扱って色々やろうね
　　金融系：IT系のコストをOSSとHadoopで削減
　　技術系：
　6.Hortonworks Strategy
　　Hadoopを利用、管理しやすくするためのいろんなことをコミュニティに還元しますよ。
　　性能などについても同様。
　　トレーニングやテクニカルサポートやりますよ。
　QA：
　　Q：42Kのノードの管理ツールはなに？
　　A：手で管理してます。
　　Q：社名の由来は？
　　A：童話でHortonという名前の象の話がある。
　　Q：CDHはおすすめ？それともほかのものがいい？
　　A：※聞き取れず。。。
　　Q：500万Query/月はアドホックQueryもあるの？
　　A：幾つかのクラスタに分けて使ってる。アドホックは不明
```


**◎How Hadoop needs to evolve and integrate into the enterprise：Ted Dunning（MapR）**
```

　・Quick History
　・英語わからない身には辛い。。。
　Zookeeperの人らしい。
　Narrow Foundations
　　HDFSとNASの間には大きな壁があり、大きなデータを移動するのはコストが掛かる。
　Broad Foundation
　　HDFSの代わりにNAS、RDBMSの下に位置するMapRを用意
　　ど、どんな仕組み？-&gt;テクニカルセッションで。
　QA：
　　Q：MapRはOSSにしないのか？
　　A：MapRで開発したものはApacheに還元はしますが、OSSにはしないよ。フリー版は提供するかも
```


ここで昼食。午前中からいた人にはランチボックスが提供されました。
午後からはコミュニティトラックとテクニカルトラックの2トラックがありましたが、LTが聞きたかった（それよりも英語が辛かった？）のでコミュニティトラックのど真ん中、最前列に入り浸りました。
**★コミュニティトラック**
**◎Elastic MapReduce Amazonが提供するHadoop：大谷晋平（Amazon）**
```

　・Amazonとは
　　Eコマース
　　流通
　　AWS
　　の3つのサービス
　・AWS
　　Low-level、High-level、Cross Service、Tools to access services、アプリケーション
　　色々あるなー
　・Bigデータが大変な理由
　　ケタ違いのデータ量、異なる形式データ、即時性
　　現状システムはスケールしない
　　ビジネスとして成立する？
　　　成立するならすぐスケールだめならすぐ縮小
　・Hadoopとは？
　　これまでのお話。
　　スケーラブル、低価格なハード
　　誰でも入手可能で、実績多数。
　・Amazon EMR
　　AWS上でスケーラブルなインフラ上に構築が可能
　　オンプレミスからMapReduceアプリを移行可能なため、分析、解析に集中可能
　　S3からデータIN/OUTするので、データ欠損がない。
　　Hadoopそのままではチューニングやクラスタサイズ見積もりも難しい
　　　＝＞クラスタサイズを動的に拡張伸縮可能。パフォーマンス最適化もできるよ。
　　0.18、0.20が利用可能。
　　EMRはHDFSとジョブ（タスク）トラッカーを別構成にしている。
　　EC2上にMaster、Core、タスクノードを展開
　　S3にデータを格納
　　SimpleDB（KVS）を利用
　・EMR注目機能
　　ジョブフローの高速化
　　　ジョブの再起動無しにコスト/パフォーマンス比を変更可能。
　　　タスクノードを動的に増やせる
　　柔軟なデータウェアハウスクラスタ
　　　タスクノードをバッチ実行時にのみ増やせる。
　　※増減できるのはタスクノード
　　　Coreノードは増加のみ
　　EMR＋Spotインスタンスの活用
　　　コスト削減効果が非常に高い
　　　AWSの余剰リソースをリーズナブルに提供（Amazon的にもウハハだ）
　・その他の機能
　　東海岸だけだけど、スパコンレベルのインスタンスも利用可能
　　AWS上での最適化設計など
　　※ちょっと時間足りなくなってきたｗ
　・EMRの事例
　　1.Razorfish
　　　ROAS（広告費用対効果）を500%改善（すげー）
　　2.So-net
　・EMR都市伝説
　　物理vs仮想
　　　そりゃ、物理が速いよ
　　EMRの柔軟性・拡張性がセールスポイント
　　　ビッグデータは成功/失敗が読めないのもあるので、
　　　インフラに投資する部分を少なくできるよ。
　　オンプレミスが安い？
　　　いやいや、HWの購入から設定など時間かかる。
　・Beyond Hadoop
　　HadoopのIn/Out含めてスケーラブル、フレキシビリティが重要
　　運用管理の仕組みも重要
　　まだまだやってくよ。
　QA
　　Q：EMRは複数サービスから構築してるけど、一部がダウンするとどーなる？（例：SimpleDBが落ちてるとか）
　　A：ジョブはReRunしてもらうか、SimpleDBの状態をみてリカバリをしてもらう。
　　Q：上記にともない、SLAの計算は？
　　A：SLAはEMRについては定義できてない。S3などはリージョン跨いで
　　Q：S3のセキュリティが心配だが、どう考えてるか？
　　A：いままで脆弱性を晒してデータをロストしてない。
　　　　ユーザコントロールなどもできる。基本的には問題ない
　　Q：EMRでS3を使う＝Hadoopのローカリティの利点が失われるのでは？
　　A：オーバヘッドはあるが、実際のデータはS3で守られているので、HDFSが飛んでも大丈夫。
　　Q：S3からのコピーオーバヘッドはどーなるか？
　　A：Single5で少しずつor分割して全部送るも可能
　　Q：EMRはマルチテナントだけど他のユーザのネットワークの影響を受けないの？
　　A：マルチテナントだと起こる可能性がある。
　　　　M1（？）だと内部ネットワークは専有可能らしい。
```


**◎LT**
```

　・Hadoop and Subsystems in livedoor @tagomoris
　　ピーク時に15Gbps。
　　10ノード（36コア）
　　CDH3b2を利用
　　データマイニングではなく、ログからレポーティングをするのに利用している。
　　hadoop streaming + Hiveで実施
　　580G/dayが96サーバから来る
　　ScribeにてHadoop Streaming（Perl）でper hourでHiveにload
　　scribelineをWebサーバに入れててログ配送してくれる。
```


**　・Lightweight　@stanaka（はてなCTO：田中慎司さん）**
```

　　EMR以前
　　　自前20台クラスタ
　　　ジョブがあふれてきた
　　　ナマMapReduceを利用
　　　PerlでMapper/Reducerを記述（Hadoop Streaming）
　　EMR導入
　　　リソース増やせて便利！
　　　必要な台数に伸縮可能
　　　問題点：
　　　　S3にアップしないとダメ
　　　　　＝＞ログデータをS3に展開するlog2s3.plを作成。毎時実行。
　　　　起動、ジョブキック、結果改修どーする？
　　　　　＝＞Net::Amazon::EMR::Wrapperを作成した。
　　　　　　クラスタ起動、ジョブキック、クラスタ停止などできる
　　　　　作ってみて思ったこと
　　　　　　よかったところ：
　　　　　　　Perlでかける。Cronで実行可能。HiveQL便利。
　　　　　　悪かったところ。
　　　　　　　途中で失敗してクラスタ起動しっぱなしとかがある。S3にデータを展開が大変。複雑な計算がきつい。
　　　　慣れてないエンジニアにも触れるようにしたい
　　　　　＝＞Perlで書けるようにした？。
```


**　・HBaseでグラフ構造を扱う（開発中）：アメーバ鈴木**
```

　　自己紹介@brfrnl69
　　アメーバのソーシャルグラフ
　　　基本はMySQL
　　　マスタ分散が難しい、シャーディング管理が面倒
　　　　＝＞HBaseでやってみるか。
　　目的　
　　　グラフデータに対して高速に更新追加したい。
　　　隣接ノードが取れればいい（これを高速化したい）
　　　オンライン処理したい
　　　運用コストの削減したい。
　　Not目的
　　　マルチホップはどうでもいい。
　　アーキテクチャ
　　　JavaでGatewayつくってみる。
　・Large-Scale Graph Processing：井上さん（@doryokujin）さん
　　Map/Reduceではグラフ計算だめ？
　　　Vertex基本だとShuffleに問題ががが。
　　BSPの紹介
　　　Bulk Synchronous Processing
　　Google Pregel 
　　SSSP：MapReduce Model
　　　すごい計算時間が掛かりそう。MRの組み合わせが何回回ることやら。
　　　枝が少ないとこっちのほうがいいのか？
　　SSSP：PregelModel
　　　シンプルなアルゴリズム
　　Pregel使えるのあるの？
　　　Hama
　　　GoldenOrb
　　　Giraph
　　　　YERN？YARN？
```


**◎リクルート式Hadoopの使い方：石川（リクルート）**
```

　@ground_beetle
　・導入の課題点
　　バッチ処理時間対策のため。
　　　＝＞実は入れたかっただけｗ
　・導入の障壁
　　現行システムへの影響＋開発工数
　　　＝＞これへの対処がこのあとの話
　・課題の克服と活用シーン
　　Azkaban知らなかった。ジョブスケジューリングツール
　　Hadoop単体ではなく、エコシステム（関連ツール）が魅力
　・活用シーン：Hive
　　SQLゆーがざ多く、HiveQLがSQLライクのため導入が簡単に！
　　既存機能のリプレイス系案件に活躍（低工数＋簡単に高速化）
　　とりあえず、Hive実装
　　　＝＞性能アップのためにMapReduceで書きなおし
　　Hotpepperなどのアトリビューション分析に利用
　・活用シーン：Sqoop＋Hive
　　RDBとHadoop連携のツール：Sqoop
　　現行システムの横にHadoopを配置でき、RDBMSの利点も利用しつつHiveも利用できるようになる。
　　　（※気を付けないといけないけどねぇ。）
　　ゼクシィで活用しようとしてるところ。
　・活用シーン：Mahout
　　マイニング用ツール
　　カーセンサーのレコメンド（同時に閲覧される車種）
　　アソシエーション分析＋クラスタリング
　・活用シーン：BIツールの導入
　　何度か導入しようとして失敗してます。。。
　　BIツールの前処理（クレンジングなど）にHadoopを活用
　・インフラリソースは？
　　全部で118台。
　　最小のクラスタ構成はサーバ6台で構成してる
　・Hadoopで複数処理を回す方法
　　ここまで紹介したものを入れてますよ。Hive、Sqoop、Solr。。。
　・Azkaban
　　TomcatにWar配置で利用可能。
　　LinedInのチームにより作成
　※若干マシントラブルで中断
　・今後のHadoop導入
　　ログ基盤
　　分析エンジン・レコメンドエンジンとして
　　バッチ処理短縮＝トライアンドエラーが簡単にできるようになる。＝色々な気づきが出てくる。
　　アジャイル的な解析が可能に。
　・開発サイクルの短縮ができるエコシステムでビジネスが回りだす。
　・今後の展開
　　MapRが気になってる。
　　　マルチテナント対応ができてうはうはできそう。
　　　EMCと共同して検証中

　QA：
　　Q：性能監視ツールの選別の理由は？
　　A：Zabbix、Cactiです。今から利用しようと思っている段階。
　　Q：CDH、GreenPlum、Apacheをそれぞれ利用してるけど、使い分けのシーンは？比較は？
　　A：CDH3u0です。GreenPlumは使ってないです。理由は言うとクビが飛ぶ可能性ががが。
　　Q：高度なデータ分析ができる技術者はどこからヘッドハントしてるの？
　　A：MITに別途分析チームが存在し、高度な分析をしてくれる。
　　Q：NameNodeの冗長化はどーやってんの？
　　A：象本と一緒DRBD＋HeartBeat
　　Q：EMRの導入を検討してる？
　　A：今後、サーバ数が多くなると導入の検討をしていくと思う。
　　　　現時点は、運用ノウハウも入手するために社内で使ってる。
　　　　EMRになるかRCloud（リクルート社内クラウド）になるかは不明。
　　Q：HBaseを利用してる？
　　A：してないです。スペック的にサーバが買ってもらえないと厳しいです。
```


**◎The history and the future of Hadoop use case at Rakuten：Tarje Marthinussen（楽天）**
```

　・Introduction（self、rakuten）
　　NextGeneration Search Group
　　Norwayから来ましたよ。
　・RakutenのBigDataとは
　・Hadoop at rakuten　
　　Recommendation（2009）
　　ProductRanking、GenreRanking、Log解析、（2010）
　　Enhance Search。。。（2011）
　・PigやHiveのようなものが簡単に利用できるようになってきた
　・新しい検索プラットフォームを構築中
　　index 10k docs/sec
　　search 400qps
　・What's Next Generation Search
　　20%はインデックスとQuery評価の
　　50%がデータの前処理（データとQuery）
　　30%がアナライズ
　・Collecting Data？
　　ログの取得はバッチ処理だった。これをStreamingに（Flume）
　・Flume
　　Zookeeperを利用してFlumeを管理してる？？？
　・気になる部分があったので、改善のコーディングしてるよ。
　　・セキュリティ
　　　マスタで管理できるように
　　・Pools
　　　Agentが送信先がコケてると他のPoolにスイッチ可能に。
　　・MasterlessACKs
　QA
　　Q：パッチ作成は何人でやってるの？
　　A：50人が働いていてOSSコミッターが何人いるかはわからんです。
　　Q：ログはテキストだけど、パース処理はどこで？（古橋さん）
　　A：Flumeは各ノードでうまい構成になっていて
　　　　Decorator
　　　性能問題は？
　　　HiveはJSONデータをうまく活用できてるよ。
　　Q：Masterlessとそうじゃないバージョンの性能比は？
　　A：ノード数が増えると
　　Q：HBaseじゃなくてCassandraなの？
　　A：（※英語きつい。。。聞き取れず）
```


**◎マーケティング向け大規模ログ解析事例紹介：原謙治（NTTコミュニケーション）**
```

　・自己紹介
　・BizCITYというクラウドサービスを展開中
　　まずは、宣伝。
　　Bizストレージ、Bizマーケティングとして大規模データ、分散処理を実施してる。
　・Hadoop in Bizマーケティング
　　CGMデータを解析して口コミ情報抽出
　　アクセスログから行動情報抽出
　・Hadoop in BuzzFinder
　　CGM DBからHDFSにインポートして解析開始。DBはPostgreSQL
　　処理フローは資料参照。
　　リッチインデクシング技術（NTT研究所が開発した日本語解析技術）
　　※検索インデックスってどんなものなんだろう？
　　ポジネガ分析気になる。
　・Fast Map-Reduce for PaaS Services
　　アクセス解析やマーケティング解析を行う上でShuffleコストが大きくなるため大量マシンが必要
　　　＝＞マシン数を減らすことが目的？
　　Map Multi-Reduce、PJoinはNTT研究所が開発した技術！？（子象本にないっけ？？）
　　　＝＞Multi-Reduce。同一ノード上のMap出力をReduceすることで、shuffleフェーズに渡るデータを削減している。
　　　　＝＞PJoin　
　QA
　　Q：Map multi-reduce、PJoinはどう実現してるのか？公開するのか？
　　A：Hadoopの0.19に改造をしてる。
　　　　公開できるかどうかはわかりません。NTT研究所が研究しているものを試しに実装してみてるから。
　　　　なのでパッチにはなりませんかね（研究所に聞いてみないとわからないっす）
　　Q：性能が向上したパターンはあったが、悪化する場合などはあるのか？
　　A：不明
　　Q：Map-side Joinとの違いは？
　　A：。。。
※この辺で少し集中力が途切れてしまいました、すみません。（次に集中したかったので。。。）
```


**◎ミクシィにおけるHadoopの利用：伊藤敬彦（mixi）**
```

　LSH-Based Recommendation engine powered by hadoop
　・実はmixiの話はすくないよ。
　・利用している環境。5or6台/クラスタ
　・Hadoopの活用
　　ログデータをHDFSに保存
　　DBコンテンツをHDFSに入れることで、DBに負荷をかけずに解析する。
　・マイニングも検証中
　　検索クエリログをベースにデータマイニング
　では、本題。
　・LSHを利用した推薦
　・推薦とは？
　　mixiにはいろいろ推薦（レコメンド）を付加できるサービスがある。
　・推薦するには？
　　類似インスタンス集合を抽出する。
　　インスタンスは文書だったりユーザだったり
　・類似インスタンスとは？
　　同じ特徴を持つ集合
　　例：同一商品購入したユーザとか同一単語を持つ文書とか
　・抽出するには？
　　全ユーザごとに全ユーザとの類似性をチェックすると時間がかかりすぎる！
　　＝＞LSHを利用しよう！
　・LSHについて
　　特徴：
　　・速い！
　　・精度はそれほどではない
　　事例：
　　・Google Newsのレコメンド（USロケール）
　・LSHの処理ステップ
　　2つだけ。
　　1.インスタンスベクトルを計算（似ているデータは同じ値が返りやすい関数）
　　2.同一値が帰ってきたデータが類似インスタンス
　・インスタンスベクトル例（あとでスライド見ようね）
　・Likelikeがいち実装。Hadoopでうごくよ
　・実験について
　　トップページに表示されていない記事を知ってもらうために推薦してみるぞ！
　・実験１
　　性能を測ってみた
　・実験２
　　精度を調べてみた。
　　精度はほんとにひどいな。。。
　　＝＞同一カテゴリの遷移を元に計算したらそれなりになってきた。
　・今後
　　データソースを増やしたい。
　　他のアルゴリズムも実装したい
　・CM
　　以下も作ってますよ。
　　Oluolu
　　Anuenue

　QA
　　Q：Mahoutは使わないんですか？
　　A：Likelikeを作った頃にMahoutになかったので作った。
　　　　性能比較したいと思ってる。
　　Q：ログサーバのデータ転送はどーやってる？
　　A：伊藤さんのところにはどういう仕組みかは上がって来てない。

　　Q：ベクトルの次元数はどのくらいまで耐えられる？
　　A：高次元のデータに対して耐えられるように作られてる。
　　　　次元数が低くて良い制度が欲しければ他のアルゴリズムがいいかも。
　　Q：ユーザのベクトルを作るテクニックは？
　　A：画像などであれば大変だけど、ユーザであれば、単語とかキーワードとかで

　　Q：ニュース以外のデータは？
　　A：まだまだ実験中。まだやってない。

　　Q：推薦される記事数のばらつきはどういった理由が考えられる？
　　A：後ほど考察してQAサイトに入れます。

　　Q：LSHをMapReduceに載せたということだけど、関数の計算をさせてる？
　　A：Iterationはしてない。
　　　Map側でLSH関数計算してる。Reduceにて類似インスタンスを導出してる。

　　Q：今後の予定の空間木とは？R-Treeだと高次元できついのでは？
　　A：低次元にて利用できるように用意したい。
　　　
　　Q：HamaとかGiraphで高速化させてみるのはどう？
　　A：イテレーションがいらないからあまり利用用途がないかなぁ。
```
**◎懇親会**
```

　AWSを採用しない企業がいくつかあったのでそのあたりを質問してみた。
　AWSは通常運用に利用すると結構なコストがかかる場合があるので、ノウハウがある企業や
　データ量が多い場合は、オンプレミスの場合を選択しているらしい。
　やはりスポットで利用する方がお得感があるみたいだった。
　Twitter上だけの知り合いだった方々と面識が持てたのが一番の収穫でした。
```


**感想＋調べること**

**感想**
```

　会場規模とかQAサイトとかオープニングムービーとかすごかったです。しかも無料。さすがリクルートさん。
　ランチボックスとか出てきたし。装飾もとても無料のカンファレンスと思えない出来でした。
　午前中はHadoopをもとにした各社の戦略とCMという感じが色濃かったです。少しずつ各社の立ち位置が違いそれはそれで面白かったです。

　AWSの説明を聞いてやはりAWSを扱える技術は必要だと再認識。
　お金かけないで触ってみれるレベルでまずは触ってみるかなぁ。
　洗脳されてるのかもしれないけど、自社or自前でHadoop運用するのは厳しそうです。（懇親会ですこし認識が変わった）

　カフェコーナーでは、リクルートのMITの冊子が配られていたり、映像や案内に使われていたHadoopマスコットのシールが配られていたりと小技も聞いてました。
　あと、オライリーの販売コーナーも用意されていて、思わず子象本を買ってしまう罠にはまったりもしましたが。。。

　mixiの伊藤さんの話は最後で疲れていたのですが、ストーリーが上手くできていて、実験や事例もあったのでわかりやすかったです。
　Hadoopはエコシステムと呼ばれるHadoopを活用するツール群（Hiveの話が多かった？）、Hadoopの今後、Hadoopを活用したログ解析の話など、
　話題が豊富でそれぞれの話が面白くて困ってしいまうくらいです。
　いくつかのセッションで出てきたのですが、アクセスログなどをHDFS上に集めるための仕組みがまだ乱立（定番がまだない）している感じを受けました。
　Flume、Scribe、MapR。。。などなど

　あとは、テクニカルセッションのビデオがアップされたらまた目を通さないと。。。
　残念ながらHadoopから少し縁遠くなっていますが、これからもネタや参考になりそうな話には事欠かなそうなのでかじりついていこうと思います。
　※一番やらないといけないのは英語の勉強かもしれないです。。。
```

**調べること**
一応Solrの人なので、Solrに関連しそうな話に興味がいってしまいます。
* NTT研究所のリッチインデクシング技術
* やっぱりAWS触ってみる。EMRまでとは言わないが。（herokuもちょっと興味あるが。）
* Mesos、GreenPlum、Scribe、Storm、Flume、Giraphこれらの概要


**関連サイト**
　[公式QAサイト](http://mit.recruit.co.jp/hadoop/conference2011fall/SES000000001?pno=1)。後日録画していたセッションがアップされるそうです
　[Hadoop Conferene Japan Fall 2011 - 急がば回れ、選ぶなら近道](http://d.hatena.ne.jp/okachimachiorz/touch/20110927/1317076207)
　[Hadoopカンファレンスが開催、本格普及を見据えた支援サービスや先進事例が充実 - ニュース：ITpro](http://itpro.nikkeibp.co.jp/article/NEWS/20110926/369421/?ST=cloud&P=1)
　[Hadoop Conference Japan 2011 fallで使用された資料 #hcj11f | インフラエンジニアのつぶやき](http://infra-engineer.com/hadoop/hadoop-conference-japan-2011-fall%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%95%E3%82%8C%E3%81%9F%E8%B3%87%E6%96%99%E3%82%84%E3%81%A4%E3%81%B6%E3%82%84%E3%81%8D-hcj11f/)（スライドをまとめてくれてます。）

