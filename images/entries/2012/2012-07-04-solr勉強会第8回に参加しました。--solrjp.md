---
layout: post
title: "Solr勉強会第8回に参加しました。 #SolrJP(Jugemより移植)"
slug: solr勉強会第8回に参加しました。--solrjp
author: johtani
date: 2012-07-04T20:40:00+09:00
comments: true
tags: [勉強会]
---
またまた参加しました。いまだ皆勤賞です。
~~感想などはあとで。とりあえず、メモとったので第一弾です。~~

ということで、感想です。
まずは、参加人数。
今回は今までで一番、ATND登録した人が多かったんじゃないかなぁと。
埋まるのも早かったですし。やっとSolrというキーワードが多くの方に触れられるようになってきたんですかねぇ。

mixiの事例はやはり、SSDを使った11億文書のインデックスが圧巻です。
実際にマイニングに利用していて、ネガポジ分析なども行われているようで楽しそう。
TLにもありましたが、「ヤバイ」はネガ？ポジ？など、そのへんの分析方法をもう少し詳しく聞いてみたい感じもしました。
あとは、Luceneソースコードリーディングの開催が楽しみです！（候補日知らせないと。。。）

Lucene Revolution 2012の参加レポートは、自己紹介がおもしろかったですｗ
ずっと検索をやらてているのもあり、色々と理論ではなく、実践的なノウハウを持っていそうで、つぎはそのあたりの話を聞いてみるのも面白そうです（発表してくれないかなーｗ）
残念ながら、私はまだスライドを見ていないので、事例を中心にピックアップして見てみようかなぁと（時間がトレない。。。）

最後は阿部さんの4.0の紹介です。タイムリーに、前日に4.0-ALPHAがリリースされたので、
資料がすごく参考になりそうです。
SolrCloudについても詳しく書かれてたし。（ちゃんと動くのかなぁ？）

最後は懇親会です。最近知り合った方から、発表者、昔からの勉強会の参加者といろいろな方と今回も話ができて楽しかったです。
TL上で知り合った方にもお会いできたし。
次回もしゃべってもらえそうな人を捕まえつつあるので、また企画してもらうようにつついてみようかな。

※そういえば、毎度のことながら4.0ベースで、書籍は出さないのかって言われましたｗ


※ちなみに、4.0-ALPHAが出たので、lucene-gosenも4xブランチの更新作業をしています。
終わったらまたブログに書くと思います。

___

```

第8回Solr勉強会
場所：VOYAGE GROUP 会議室
日時：7/4(水)　19:00 ～
1. ＠haruyamaさん
　　mixi での Solr の利用
　・mixiの全文検索
　　2011年以前：Hyper Etraier、Tokyo Dystopia、Senna
　　2011年以降：Solrを利用して新規案件の検索システムの構築、入れ替えを行なっている。
　・Anuenueの論理構成など。
　・物理構成
　　1マスター、2スレーブ
　　インデックスが小さい、QPSが100以下
　　インデックスサイズが大きいものは今後構築予定
　・今後やりたいこと
　　・ログ分析
　　・パーソナライズ
　　・外部ストレージ参照のカスタム関数
　・外部ストレージをファンクションカスタム関数クエリ
　　FunctionQueryを活用したい。
　・上記のデモ（検討中のもの？）
　　現在はjar内部のファイルを読んでるよと。
　　速度的な面がどうなるかがきになるところ。
　・テキストマイニング
　　mixiボイス
　　　haruyamaさん入社前：ダンプして解析してた
　　　haruyamaさん入社後：Solrに載せちゃえば

　　600GのSSD　　　
　　　約11億文書
　　　約450GB
　　利用してるもの：Solr 4.0（2012/01）
　　lucene-gosen 1.2.1
　　自作フィルタ
　　　haruyama/solr-filter - GitHub
　
　・利用統計の説明。
　　女性が多い。
　　「AKB」だと20代前半が多い。男性はおっさんも頑張ってる。
　・mergeindex機能を利用して、過去データとマージしてる。
　　1日分だけ集計したいこともあるかもしれないから。
　　updateじゃなくて、mergeindexなのは、ソッチのほうが早かったから。
　・拡張してる分析
　　・ポジネガ分析
　　　形容詞＞絵文字＞顔文字でスコアが効く
　　　機械学習して辞書を調整してる
　・Luceneソースコードリーディングまたやりますよ！

2. 楽天株式会社 大須賀 稔さん
　　Lucene Revolution 2012 in Boston参加レポート(仮)
　・まずは自己紹介。
　　infoseekに転職→楽天→Ask.com→楽天（そして英語）
　・Lucene Revolutionってなに？
　・トレーニング
　　Scaling Search with Big Data & Solr
　　　Hadoopの紹介
　　　SolrとHadoopのMapReduceを利用したインデキシングのハンズオン
　　　Solrのスケーリング（Sharding、Replication）、マルチテナント
　　　※http://www.lucidimagination.com/services/training/big-data-training-scaling-solr
　　　日本ではやってない、残念。

　・カンファレンス
　　スライドとかはlucidimaginationのサイトで見れるよと。
　　　http://www.lucidimagination.com/devzone/events/conferences/lucene-revolution-2012
　　・Lucidworks Big Dataの紹介
　　　Hadoopとかいろいろ組み合わせて使えるよと
　　・Microsoftの人がAzureでSolrの紹介
　　　IEとかWindows8の話ばっかり。
　　・Kuromojiの紹介
　　　やはり、マイノリティ。
　　　内容は日本語勉強会ｗ
　　　中国語とかは対応するの？日本語しか知らないです。。。
　　・ErickさんのSolrCloudの話
　　　4.0は2012年にリリースする予定
　　　スコアリングをプラガブルに。
　　　管理系画面がリッチだよと。
　・一番重要だなぁと思ったのは。。。
　　「英語」！（会社的な感想ではありません。。。）
　Q：これはみとけ的なスライドは？
　A：Hadoop上でインデキシングして、ビットトレントとかで連携してるという例が面白かった。
　Q：FASTとかと比べてSolrってどーなの？
　A：ESPは洗練されてる。クローラーとか、ベイシスのトークナイザーを内包してるとか。
　　　Solrは言語処理系が弱かったとかあるけど、そろってきてるのでは。
　　　4.0は互角になるんじゃないかなぁ。
　　　ESPがWindowsオンリーになるので、LinuxユーザがSolrに行きつつある。

3. 株式会社 ロンウイット　阿部さん
　　Solr 4.0の紹介
　・Solr 4.0の主な機能の紹介
　　　3.xは3.6が最後4.0-ALPHAが7/3に出た
　　・プラガブルなスコアリング
　　　BM25、Language Models、Divergence from Randomness、Information-based Models
　　　関口さんがスライド作ってる
　　・FST対応
　　　Finite State Automata/Transducer
　　　オートマトン理論を活用したもの。
　　　TokenStreamはFSAで実装
　　　SynonymFilterがFSTになると、オフセットが変わってくるらしいと。
　　・Codecプラグイン
　　　Luceneレベルのお話。
　　　ドキュメントをファイルに保存するときの形式をプラガブルに変更可能。
　　　SimpleTextなどもあるらしい。テストに利用できそう。
　　　APIレベルで、マイグレーションの必要があるかも。
　　・NRT
　　　Near Real Time Search
　　　　softCommitのお話
　　　　Realtime-get：IDを入れたらGETできるよと。
　　　　KVSとしても活用できるぞ～と。
　　・PivotFacet
　　　Facetが階層的（？）な感じで取れる
　　・JOIN、pseudo-join
　　　ローカルパラメータでできるよーと。
　　・SolrCloud
　　　インデックスの分散配置をやってくれる（3.6まではやってくれない）
　　　shardがダウンしたらフェイルオーバーしてくれそう
　　　Master/Slave環境
　　　リアルタイムインデクシングとリアルタイム検索とか
　　　・ZooKeeperIntegration実装
　　　　リーダー選出、コンフィグの管理などなど

　・ManifoldCFの近況
　　5月にトップレベルに昇格！
　　http://manifoldcf.apache.org/ja_JP/index.html
　　0.6は7月に出そう。日本語にもなってる。すげー
　　Alfresco Connector、ElasticSearch Connectorなども
　　Solr Plugin for Enterprise Searchとか
```
