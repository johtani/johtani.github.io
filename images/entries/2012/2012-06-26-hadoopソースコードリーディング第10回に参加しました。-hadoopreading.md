---
layout: post
title: "Hadoopソースコードリーディング第10回に参加しました。#hadoopreading(Jugemより移植)"
slug: hadoopソースコードリーディング第10回に参加しました。-hadoopreading
author: johtani
date: 2012-06-26T01:41:00+09:00
comments: true
tags: []
---
Hadoopからはちょっと離れているのに、面白そうなネタなので参加しました。
Data Science Summit、HBaseCon、Hadoop Summitのイベント参加レポートです。

最初の草薙さんの発表が実は一番興味を惹かれていたので、参加しました。
データの解析に関するサミットというのはなかなか聞いたことが無いのでどんな内容なのかなぁと。
ちょうどVisualizeなどに興味を持っていたり、データ解析、今後重要ですよねという話が出ていたりしていたので。
実際にデータ解析が今後重要で、どんなことに使えるのかなど、製品に偏らない内容のようで色々とためになりました。
この内容をずっと聞くのは私には無理ですw英語も数学もイマイチなので、ついていけない自信がありますｗ。
「データ分析の結果をビジネスに結び付けられる人とかが今後重要になります」という話が一番気になったキーワードでした。

HBaseConもかなり濃い内容だったようです。
私は残念ながら、HBaseの概要の概要くらいしか知らないので、内容にはついていけてないですが。。。
Facebookがかなり活用しているようですが、残念ながらスライドが上がっていないようです。
Solrに関連する話もあったようです。HBaseとSolrを組み合わせた[Lilyプロジェクト](http://www.lilyproject.org/lily/index.html)に関連する話のようでした。
[スライド](http://www.hbasecon.com/sessions/lightning-session-getting-real-about-interactive-big-data-management-with-lily-hbase/)は登録しないと見れないみたいです。

最後はHadoop Summitの参加レポートです。
まずは、ユーザ寄りの内容を@muddydixonさんから。個人的に、Twitterの話が多いのかなぁと。
ここでも、Visualizeの話が出ていたとか。
Lucidの話もあったようです。[LucidWorks BigDataの話かな？](http://www.lucidimagination.com/products/lucidworks-search-platform/lucidworks-big-data)

最後は@shiumachiさんのHadoopのプロダクト寄りのお話。
YARN（Map/Reduce2.0？）やHBaseの今後の展望など。YARNはキーワードだけ知っていたので、わかりやすい解説で、やっと理解できました。
全体を通して、HBaseが今後もっといろんな局面で使われそうだなぁと。日本語の本も7/24に出るし。（まだページが無いみたいなので、[英語のほうを。](http://shop.oreilly.com/product/0636920014348.do)）

いつものごとく、途中でビールが入ったので後半はメモが適当ですが、楽しかったです。皆さんお疲れ様でした。

帰り着いたら、さっそくスライドが上がってました。すごい！
スライドはこちら（2012/06/26 0時現在）
* [Data Science Summit / EMC Worldレポート](http://www.slideshare.net/nagix/data-science-summit-2012-13444399) 
* [HBaseCon 2012 参加レポート』の発表スライドをアップしました。（NTTデータ 猿田 @raspberry1123 ／岩崎）](http://www.slideshare.net/hadoopxnttdata/hbasecon-2012)
* [@muddydixonさんのHadoopSummit2012参加レポート](https://docs.google.com/presentation/d/1I4UTI-ylJc9iLWa0fHkPbIT4icjC4xnabBMX2c-6sHE/present#slide=id.p)
* [@shiumachiさんのHadoopSummit2012参加レポート](http://www.slideshare.net/shiumachi/hadoop-summit-2012-report)
* [@muddydixonさんのブログ](http://d.hatena.ne.jp/muddydixon/20120617/1339919125)


いろんなキーワード、特に、データサイエンス寄りの話が面白かったです。
次回はJenkins関連のようで、7/30開催みたいです。


以下はいつものメモです。
___
```

日　時： 2012年6月25日（月） 19:00～21:00 （受付開始 18:40）
場　所： 豊洲センタービルアネックス（NTTデータ、豊洲駅直通）

◯ Data Science Summit / EMC World レポート （EMC Japan 草薙）
　・Data Science Summitのレポート
　　揃ってるようで揃ってないスロットの写真ｗ
　　EMC World2012と併設
　　今回2回目。
　・OpeningKeynote: What We Can Predict About Prediction by Nate Silver
　　研究者は不確実性やリスクを包含した、現実的な予測モデルを開発すべき
　　　いろいろ
　・Roundtable: Economic, Political, & Societal Roles of Social Data
　　ユーザの「query-like intent」を自然言語解析と機械学習で捉える
　　属性だけじゃなく、活動を
　　コンテンツからコンテキストへ、コンバージョンからカンバセーション
　・Big Data Transformation - HealthMap
　　ウィルスのアウトブレイクの検知（160日→20日）に。
　　ウィルス＝コンピュータじゃない方
　・Big Data Transformation - Intuit
　　int.com？
　　データがあるから、こういうことが知りたいなどの新しいプロセスが
　　「https://www.mint.com/」
　・Big Data Transformation - InfoMotion Sports Technologies
　　バスケのボールにセンサーつけて、試合や選手の解析に利用して、
　　チームが強くなったりしてるらしい。
　・Big Data Transformation - Decide.com
　　アメリカ？の価格比較サイト
　　ソーシャルデータを元に、買い時、売り時を予測して教えてくれる。
　　もうすぐ新しいモデル出るかもよ？などの噂を利用してる。
　・Analytics Maturity: Master or Novice?
　　2010年のアメリカの教育事情のレポート
　　データサイエンス系の統計とかがもっと必要なんじゃないか。
　・Keynote: Navigating the Road from Business Intelligence to Data science
　　Piyanka Jain
　　BIの限界とか、データサイエンスの恩恵を受け入れるのに必要なもの？など
　　システムじゃなくて、人やスキルに投資しましょう。
　　データ分析の結果をビジネスに結び付けられる人とか。
　Panel: From Raw Data とValue Data
　　プライバシー問題
　　データ品質の問題
　　　異常値を除外するなと。最も興味深いデータになることもある。
　　"Data exhaust"の問題
　　　個人が日々インターネット上で行う様々なインタラクションに関するデータの集合
　　　相関と因果関係の区別が大変難しい。
　Panel: Tapping Into the Pulse of the Data Science movement
　　ストーリを持ってデータを語れるのが重要。
　Keynote: Data Visualizeation at the Point of Influence by Adam Bly
　Closing Keynote: The Promise and Peril in the Human / Technology Relationship by Jonathan Harris
　　TEDで有名な人
　まとめ
　　アメリカはこの分野での投資は回り始めている.
　　http://www.greenplum.com/datasciencesummit/


◯ HBaseCon レポート （NTTデータ 猿田／岩崎）
　・GeneralSession
　　HBaseの開発に参加してね。
　　・レプリケーション、セキュリティ、セカンダリインデックス、スナップショット、バックアップなど特に貢献して欲しいと。
　　・HBaseによりカバーできるアプリケーション領域
　　　メッセージング、位置ベースアプリケーション、リアルタイムレコメンデーション、広告最適化
　　・開発者への要望
　　　メッセージをちゃんとして
　　　解析用メトリクス
　　　管理ツール
　　・M/Rジョブとの連携の改善
　　・自動チューニングなど
　・Applications
　　・GAPの事例
　　　色々試してHBaseにした。
　　　クラスタ構成、16Slave、3Master、NN Failover via NFS
　　　※ZKはスレーブに置くと、アウト。
　　・Tumblr
　　　最初は失敗した。
　　　OpenTSDBを経験して、Motherboy V1に。
　　　　テストフェーズまでが目的
　　　　→幾つかの知見が得られたよーと。
　　　Motherboy V2を構築中。
　　・Facebook
　　　ひと月250TBペースで増加中。。。
　　　なんで、HBaseにしたの？
　　　　低レイテンシ、水平スケール、一貫性重視の設計、M/Rとの親和性とか
　　　Schema V1＝Snapshot Schema
　　　Schema V2＝Split Snapshot Schema
　　　Schema V3＝Hybrid Schema
　　　　HBaseのデータにさらにインデックス作ったりとか。
　　　Schema Vertion Current＝Finer grained schema and Indexer
　　　　読み書きの単位を分析して、スキーマを分割して細かくして行っていた。
　・Operations
　　・HBaseで困ったよ at Facebook
　　　・リージョンサーバに特定データ入れると連鎖的に死亡
　　　・サーバが死に切らないとか。
　　　・HBaseは落ちるときは落ちるので、しぶとく生き残れるアプリを作ってねと。
　　　※Facebook関連のスライドなどがあがってませんと。
　　・HBaseバックアップについて Clouderaの人とFacebookの人
　　　・選択肢
　　　　DistCP
　　　　　/hbaseディレクトリまるごとコピー。一貫性が保証されない
　　　　exportツール
　　　　　MRジョブ。1度に1つのテーブルのみ
　　　　copytableツール
　　　　　データを別クラスタに保存
　　　　　exportツールに似てる。
　　　　レプリケーション
　　　　　。。。
　　　　アプリケーションから複数クラスタへの書き込み
　　　　　。。。
　　　・ユースケース
　　　　・HBASE-5509を利用したバックアップ
　　　　　・開発中バックアップ
　　　　　　HBASE-6055スナップショット、HBASE-4618など

　・Development
　　・HBase Schema Design　Salesforce.comの人
　　　非正規化でやりなさいと。Joinはおすすめしないと
　　　最後にデザインパターンが載ってると。
　　　0.行キーの設計がすべて
　　　1.Design for the questions, not the answers.
　　　2.データサイズは2種類しかない。大きすぎるか、そうじゃないか。
　　　3.コンパクトに詰め込め
　　　4.行単位の原子性を活用する。
　　　5.属性は行キー内に移動することができる。（Lars Georgeがfoldingと読んでいる手法）
　　　6.エンティティをネストさせると、データを事前に集計できる。

　　・HBase Performance Tuning And Organizations　Facebookの中の人
　　　テーブルの事前スプリット
　　　オフピーク時間を設定する。（0.94で入った）
　　　コンパクション設定が効いてくるよ
　　・SolrのバックエンドにHBase？？？


◯ Hadoop Summit レポート (@muddydixonさん)
　・オープニングビデオは必見
　・ショーケース
　　・Datameerを注目した。Visualizationの専任チームがいる。
　　　UIじゃなくて、解析部隊だけで60名
　　　お値打価格。$2900/年
　　・Azure Big Data
　　　JavaScriptで
　　・ショーケースLucid
　　　Solr、HBaseとかいろいろ組み合わせて。
　・Session Hadoop...
　　2015までにApache Hadoopに世界のデータの半分が乗るらしいと。 
　・Session Realtime analytics with Storm and Hadoop
　　フォロワのフォロワをunique処理したり。
　・Session Scalding Twitter's new DSL for Hadoop
　　※Zipkinにも出てきたな、名前。
　・Hadoop Plugin for MongoDB
　・Hadoop and Vertica The Data Analytics Platform at Twitter
　　Twitter社でのHadoop周りのデータフローとか。
　　Verticaは速度がいるものの処理に利用
　　80-100TB/dayとか。。。
　・Keynotes
　　・Big data analyzing system is censor of company.
　　・It is difficult in blind and deaf.
　・Session Large Scale Search, Discovery and Analytics with Hadoop, Mahout and Solr
　※@muddydixonさんのブログにセッションに対応するスライドのリンクを公開中。http://d.hatena.ne.jp/muddydixon/20120617/1339919125

◯Hadoop Summit レポート (@shiumachiさん)
　・Hadoop1.x MapReduce
　　非常に安定
　　・課題。。。
　・YARN（Yet Another Resource Negociator）
　　ターゲット：6000～10000ノード
　　　　　　　　100,000以上のタスクの同時実行
　　　　　　　　10,000ジョブの同時実行
　　性能は倍以上
　　　Q：これは同じプログラムを動かして？
　　　A：。。。倍以上です！（わかんないっす。）
　　今後の予定
　　　幾つかのJIRAの紹介
　　　MAPREDUCE-4327とかHBASE-4329とか
　まとめ
　　YARNは「汎用」分散処理基盤に向けて一歩踏み出したもの！
　　更なる進化に注目と
　・HBaseの可用性とリペア
　　ダウンタイムを短くしよう。
　　　障害停止7割くらい。
　　　　設定ミスが44%
　　不安定な機能は使うな、推奨構成を推奨！
　　HBase 0.92＋Hadoop 2.0
　　　HDFS HAによる高可用性とか
　　将来：HBase 0.96＋Hadoop 2.x
　　　計画停止時間削減：オンラインスキーマ変更（HBASE-1730）
　　　ローリングアップデート：バージョン間互換性が必須
　　HBase本読みなさい。
　　金があれば、サポート買ってください。
　　日本語HBaseトレーニング開催予定（来月）
　・HBase NameNode HighAvailability
```　　
