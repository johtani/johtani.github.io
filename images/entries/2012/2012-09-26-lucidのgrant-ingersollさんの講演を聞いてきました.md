---
layout: post
title: "LucidのGrant Ingersollさんの講演を聞いてきました(Jugemより移植)"
slug: lucidのgrant-ingersollさんの講演を聞いてきました
author: johtani
date: 2012-09-26T18:08:12+09:00
comments: true
tags: [勉強会]
---
[このイベント](https://itmedia.smartseminar.jp/public/seminar/view/434)にウチダスペクトラムの枠でMahoutのコミッターである、Grant Ingersollさんが講演されるということで、興味があったので聞いて来ました。
（この枠だけ）

[LucidWorks社](http://www.lucidworks.com)が現在展開している、LucidWorks BigDataの概要とコンセプトといった話の内容でしょうか。
LucidWorks社（元Lucid Imagination）はLucene/Solrのコミッターの方々が多く在籍している会社です。
検索システムに関するノウハウを元に、発見や解析といった部分にニーズが広がってきているという話の
ざっくりした概要のはなしでした。
検索システムを中核にして、ログや検索で提供しているデータの解析などの重要そうなポイントが散りばめられて
いるお話でした。

もっと詳しい話を聞きたいなぁ。


講演では日本語の資料でしたが、サイトに英語の資料がアップされているとのことでした。
原文が読めるのは非常に助かります。他のイベントなどでもこのように英語の資料も見れるようになると嬉しいです。

以下は、いつものメモになります。

___


```

場所：富士ソフト　アキバプラザ5Fホール
日時：16:10-

◯サーチ技術による情報の可視化
　通常、検索と言うとWebサーチだけど、ウチダスペクトラムのやっている部分はエンタープライズ向け
　ナイスガイ＝Grant S. Ingersollという紹介
◯サーチからSDAへ
　LuceneやSolrのお陰で、検索自体は簡単になってきている。
◯サーチの進化
　ユーザとデータを結びつける意味での検索の進化が必要
　ユーザインタラクションや、アクセスの方法とか
◯SDA
　Search, Discovery and Analytics
　・ユーザからのニーズ
　　検索、優先順序付け、新たな気づき、フィードバックによる学習
　・ビジネスからのニーズ
　　ナレッジの有効活用
◯ユーザ事例
　保険会社での請求に関する不正利用分析を含んだクレーム処理と分析
◯事例：個人に最適化された医薬品
　DNAをベースに検索やファセットで医薬品を検索したり。
◯事例：通信会社における通話記録処理
　ログを元に検索して、不正通話などを解析
◯SDA基盤に必要な要素
　高速で拡張性のある、検索
　大規模でのコスト効率が高いストレージと処理
　NLPとMLにより解析などが向上
◯SDAのアーキテクチャ
　基盤
　　LucidWorks Search、Hadoop、HBase、ApachePig、Mahout、
　NLP、
　管理
　　Zookeeper
　インフラ
　　ZABBIX、AWS、Chef
　データの流し込み
　　Twitterからのデータとか
◯検索部分にフォーカス
　・LucidWorks Search
　　SolrCloudによる簡単なshard処理
　・Hadoop
　　ログ、生データ、中間ファイルの保存
　　WebHDFS
　　小さなファイルには向いていない
　・HBase
　　メトリック、ユーザ履歴などのストレージ
　課題
　　どこに正式に保存する？
　　リアルタイム処理 vs バッチ処理
　　分析はどこで行われるべきか？
◯検索の実装に関連すること
　3つのポイント
　　性能と拡張性
　　関連性
　　オペレーション（モニタリング、フェイルオーバーなど）
　ビジネス側では検索結果の適合性を重要視する
　開発側は性能を重視する傾向がある。
◯適合性に関して
　テストが重要。
　クエリ、クリック、表示したドキュメントなど、すべて保存すべき！
◯Discoveryにフォーカス
◯MahoutによるDiscovery
　3つのC
　・協調フィルタリング
　・クラシフィケーション
　・クラスタリング
　追加事項
　課題
　　収束を伴う計算コストの高い機械学習アルゴリズム
　　Mahout
◯余談：Experiment Management
◯Analyticsにフォーカス
　Rとか、うまく活用
　検索エンジン自体でもできることがある。ファセット、TF、DF/IDF
　SearchとDiscoveryの定量化
　　ログ、ナビゲーション分析
```
