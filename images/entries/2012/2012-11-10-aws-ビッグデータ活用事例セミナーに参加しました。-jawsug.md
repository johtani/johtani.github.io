---
layout: post
title: "AWS ビッグデータ活用事例セミナーに参加しました。#jawsug(Jugemより移植)"
slug: aws-ビッグデータ活用事例セミナーに参加しました。-jawsug
author: johtani
date: 2012-11-10T01:07:00+09:00
comments: true
tags: [勉強会]
---
初目黒（たぶん）で、初Amazonな感じで、流行りの[「ビッグデータ」のセミナー](http://peatix.com/event/7497)に参加してきました。

とりあえず、いつもの自分用のメモを残しておきます。
感想はまた後日。。。（たぶん、頑張れ私。。。）

___

```

AWS ビッグデータ活用事例セミナー
日時：2012/11/09 [ 金 ] 9:30 - 12:00
場所：アマゾンデータサービスジャパン目黒オフィス

★AWSビッグデータ概要 @understeer　
　○Amazonの紹介
　○Amazon Web Serviceの紹介
　　・オンプレミスと比べ、初期費投資が不要
　　・コストダウンを促進
　　　過去6年で21回の値下げを実施
　　・IaaSだけじゃなく、PaaSもやってますよ。
　　・OSより上の層は好きに選べるよ。
　○AWSのサービスだけで20ある。
　○3つのV
　　Volume　　2012年で1.2ZB。95%が非構造データ。今後も非構造データが増加
　　Velocity　　デバイスの増加、パーソナライゼーション系の増加
　　Variaty
　　　素粒子のデータの解析とか、地質学、気象予報とかいろいろやってるみたい。
　○BIG DATAの4つのプロセス。
　　収集、保存、分析、共有を繰り返しやりましょう。
　そこで！AWS使いましょう。

　○収集
　　AWSへのデータアップロード
　　オンプレにあるデータをAWS（S3）にアップロード
　　・インターネット経由
　　・専用線サービス（AWS Direct Connect、1/10Gbps）も可能
　　・AWS Import/Export（HDDを送りつけてS3にアップロードしてくれる。Tokyoリージョンにはだない）
　　・インターネットVPN経由も可能
　　・EC2上のデータももちろんできる。
　　※WAN高速化ソリューションも利用可能。
　○保存
　　・AmazonS3
　　　99.999999999%の耐久性。
　　　同一リージョン内の3箇所以上のDCに自動複製
　　　容量無制限で低コスト（1G 約10円/月）
　　　
　　・Amazon Glacier

　　　データの利用準備に3.5～4.5時間かかる。
　　　S3の約1/10という低コスト
　
　○分析　
　　オンプレミスだと運用が大変。
　　・Amazon EC2
　　　スケールアップ/ダウン、アウト/インが即座に可能。ライセンス持ち込みや従量課金に対応
　　　スペックの種類が豊富（SSDとかもあるよと）
　　・Elastic MapReduce
　　　Hadoopをサポートしたの仮想サーバが簡単に用意可能。
　　　S3、Dynamoとの連携も可能
　　　ディストリビューションも選択可能（Apache、MapR）
　　　追加のアプリ（Hive、Pig、HBase）なども利用可能。
　　　ジョブの大きさに合わせてクラスタサイズを適切にすることでコスパがよくなる。
　　　→HadoopのMRのデータのローカリティとかはどうなってるんだろう？
　○共有
　　・AWS RDS
　　　MySQL、Oracle、SQLServerをサポート（PostgreSQLはないのかな？）
　　　自動バックアップ、フェイルオーバー、パッチ適用機能があるよ
　　・Amazon DynamoDB
　　　AmazonオリジナルなNoSQLデータベース。論文有るよ。
　　　運用管理は気にしなくていい。
　　　性能については客指定の性能が出せるようになる。しかも変えられるよと。
　　※データサイズに応じて以下を選択しましょう
　　　RDS、HBase on EMR、DynamoDB、S3
　　　他にもEC2上で、CassandraやmongoDB、GlusterFSを使ってる事例もありますよ。
　○以上を繰り返すのが意味があります。そこで！
　　・Simple Queue Service
　　　マネージド分散キューサービス
　　　最低1度のメッセージ到達の保証。複数DC間で複製保存
　　・Simple Workflow Service
　　　進捗などの管理も可能
　　　NASAのCURIOSITYの制御に利用？10m前進するのに10時間のバッチ処理がある。。。
　データがなくて試せない！そんなあなたに！
　○AWS Public Data Sets
　　すぐ使えるPublic Dataが用意されてるよ。
　　http://aws.amazon.com/jp/publicdatasets/

★AWSのビッグデータ事例紹介　@shot6
　○NETFLIX
　　・どんな会社？
　　　2500万人以上のストリーミング会員
　　　500億以上のイベント
　　・AWSの利用は？（保存）
　　　8TB/日のイベントデータを収集しS3に。
　　　Cassandra上の顧客データもS3に。

　　　1PB以上のデータがS3に保存。
　　・AWSの利用は？（解析）
　　　EMRでレコメンデーション、アドホック分析、パーソナライゼーションなど。
　　　本番クラスタ（ずっと動かしている）
　　　アドホック分析用クラスタ（必要に応じて構築）
　　　解析用のアルゴリズムをAPIで叩けて、ジョブとして定義されてるらしい
　　・Cassandraを使ってるよ。
　　　Cassandraのクラスタをマルチリージョンで対応したりもしてる。
　　　CassandraのBackupもやってる。OSSで公開されてる？
　　　※HBaseのものもあるよ。
　　　※AWS上のCassandra事例もいくつか広告系で出てるみたい。
　　・High I/O Instances for EC2（SSDのインスタンスまだ東京に無いらしい。）
　　・AWSスケールアウトだけでなく、スケールアップも徐々に増えています。
　○yelp

　　・どんな会社？
　　　口コミサイト。
　　　スペルミスの自動修正、検索ワード自動補完、
　　・AWSの利用は？
　　　WebサイトのログをS3に保存。
　　　EMRを利用してHadoopClusterで解析してS3に保存している。
　　　EMRは処理終了後にシャットダウンしてる。
　　・データ解析が日常になった
　○SHAZAM
　　・どんな会社？
　　　広告配信、モバイル系の配信をやってる会社。
　　　Super Bowlの広告配信でAWS、DynamoDBを利用。
　　※マイネット・ジャパンでもDynamoDBを利用している
　○CLIMATE Corporation
　　・どんな会社？
　　　天候保険の会社
　　・AWSの利用は？
　　　200TBの地質、天候データを解析して
　○THOMSON REUTERS
　　・どんな会社？
　　　情報提供の会社。データの提供が元だけど、解析した結果の情報も提供してるみたい。
　　・AWSの利用は？
　　　MarketScanという18年分の個人の医療データ（個人情報自体はないみたい）を販売する、販促ールとして利用。
　　　1500万人分の患者データを提供。

　　　マーケットの分析に使えるデータの提供。
　　　KARMASPHEREとEMRの組み合わせで、ソリューションを提供していますよと。
　　・事例
　　　1.MarketScanをS3にアップロード。
　　　2.分析官が、KARMASPHERE経由でEMRにアクセス。
　　　3.EMRにS3からデータロードされ、結果がRDS（Oracle）に保存
　　　4.RDSに他の人達もアクセスして使ってるよと。
　○RANGESPAN
　　・どんな会社？
　　　ECサイト向けのPaaSサービスを提供してるロンドンの会社。
　　・AWSの利用は？
　　　NLP、機械学習にEMRを利用？
　　　mongoDBのクラスタを構築してる。
　　※mongoDBの日本の事例としてCAがあるらしい。

★Huahin Framework活用事例 on AWS @ryu_kobayashi
　○Cassandra本とかもやられてるみたい。
　○EMRとは
　　PaaSなんだけど、中身を自分でいじれるらしい。
　　Management Consoleでは3つのバージョンが使えるが、コマンドラインからだと他にも使えるみい。
　　・HBaseはAmazonのDistributionのものだけ。
　　・EMRのメリットは？
　　　インフラの面倒を見なくていい。
　　　クラスタの立ち上げも複数あげられるので簡単。本番実行と同じ環境
　　・EMRのデメリット
　　　オンプレミスにすでにデータがあるとアップロードが大変。実際に物理HDDを送ったこともある（2,3日でAWS上にアップロードされた）
　　　外に出せないデータがあると。。。
　○EMRのTips（EMRの連載に載ってますよ！http://gihyo.jp/dev/serial/01/emr）
　　・Bootstrapを設定
　　　EMRのクラスタの起動前にメモリ設定とかHadoopの設定が可能にできる。
　　・ファイルサイズを適切に
　　　Map数=splitを決めるコード
　　　　を指定することで、処理が早くできるのかな？
　○EMRの起動には
　　いろいろあるけど、HuahinEManagerを使うと使いやすいよ？

　○Huahin Frameworkの構成
　　・Huahinの名前の由来は？
　　　社内のコードはワインの産地にするという決まり。
　　　タイの観光地Hua Hinがワインの産地。
　　・他のHadoop関連のマスコットより可愛いでしょ！？
　　・Huahin Core
　　　MRのプログラムを簡易化
　　　WritableとかSecondary Sortとか書かなくていい
　　　考え方がSQL寄り
　　　素のMRも書ける。Pig、Hiveだとパフォーマンスが難しい
　　　Huahin UnitというMRUnitをラップしたものもある
　　・Huahin Tools
　　　汎用的な処理を集めたツール群だけど、Apache Logの成形のみ。
　　　オンプレミスHadoop、スタンドアロン環境でも動かせるようになってる。
　　・Huahin Manager
　　　Jobを管理するマネージャ
　　　　Jobの実行

　　　　　キューを持ってるので、複数の実行が可能だよ。
　　　EMR対応してる。bootstrapに設定するとできるらしい。
　　・Huahin EManager
　　　　EMRのいろいろが管理できるみたい。
　　　　初期設定20までしかインスタンスが挙げられない上限があるらしいので気をつけましょうと。
　　　　キュー登録のPOST機能は便利そうだ。（EMR触る機会まだまだないけど。。。）
　　　EMRにはJobのkillがない→Job FlowをターミネートすればOK→実際にはEMRのマスタノードにSSHすればできるよ。→めんどくさいよね。。。
　　　EManagerなら可能ですよと。これは必須だよなぁ。
```
　　　
