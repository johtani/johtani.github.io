---
layout: post
title: "Lucene Eurocon 2011 Barcelona のスライド読みました(Jugemより移植)"
slug: lucene-eurocon-2011-barcelona-のスライド読みました
author: johtani
date: 2011-11-08T13:02:00+09:00
comments: true
tags: [solr]
---
最近忘れやすいので、記録しておこうかと。
読んだスライドの簡単な内容と感想です。
ちなみに、スライドの一覧はこちらです。
<span style="color:#FF0000">※スライドへのリンクはすべてPDFへのリンクになっていますので、注意が必要です。

<hr>

[<em>**Solr 4 Highlights（PDF）**</em>](http://www.lucidimagination.com/sites/default/files/file/Eurocon2011/miller_solr4highlights2_eurocon2011.pdf)

Solrの次期バージョン4.0で採用される機能の紹介でした。
紹介されているのは次の機能。各機能について、JIRAの番号も記載があるので便利ですね。
* DirectSolrSpellChecker 
* NRT ([Near RealTime search](http://wiki.apache.org/solr/NearRealtimeSearch))
* Realtime Get
* SolrCloud - search side
* SolrCloud - indexing side (WIP)

これまでと異なるSpellChecker、Commit前のデータが検索できるNRT（なんでNRSじゃないんだろう？）、Commit前の登録済みデータを取得することが出来るRealtime Getなどの簡単な紹介です。
あと、個人的に興味のあるSolrCloud周りが絵付きで紹介されてます。ZooKeeperもちょっと出てきます。
まだ、ちゃんとまとめてないですが、NewSolrCloudDesignの翻訳したものも参考までに。（[その１](http://johtani.jugem.jp/?eid=31)、[その２](http://johtani.jugem.jp/?eid=32)）
<hr>

**<em>[Archive-It: Scaling Beyond a Billion Archival Web-pages](http://www.lucidimagination.com/sites/default/files/file/Eurocon2011/Binns_archiveit_eurocon2011.pdf)</em>**

InternetArchiveの事例紹介。1996年からWebページのアーカイブを行なっているサイトですね。
その一部でSolrが利用されています。
「1,375,473,187 unique documents」との記述もあり、データ量が巨大です。
データ量が多いのに、ここでFieldCollapsing/Groupingも利用しているようで、インデックス作成、検索両方に対してカスタマイズしたものをgithubで公開している模様です。
<hr>
[<em>**Scaling search at Trovit with Solr and Hadoop**</em>](http://www.lucidimagination.com/sites/default/files/file/Eurocon2011/MarcSturlese_scalingsearchTrovit_eurocon2011.pdf)

次は、Trovitという会社のSolr＋Hadoopの事例紹介です。
最初はLuceneをベースに検索サーバ作ってたけど、Solrが出てきたので、Solrを使うようになったようで。
データ保存先として最初はMySQLを利用してDataImportHandlerでSolrにデータ登録してたけど、
データ量が増加するが、MySQLのShardingが面倒なので、Hadoop（Hive）でデータをパイプライン処理してSolrのインデックスを作成しましょうという流れになったようです。
私が以前、[Solr勉強会で紹介したSOLR-1301](http://www.slideshare.net/nabeta/ss-8118052)のパッチをベースにMap/Reduceの処理を2段階にして性能をアップさせたという話が記載されてました。
ただ、これで早くなるのかはよくわからないんですが。。。
一応、資料では、いきなり大きなSolrのインデックスを作らずに、最初のM/Rで小さなインデックスを作成し（TaskTrackerの数＞＞Solrのshardサーバ数だから小さくしたほうが速い？）、
2段目のM/Rでインデックスをマージしてshardサーバ数のインデックスに集約する？という形みたいです。
（英語力のなさが。。。）
あとは、テキスト処理を幾つかHadoopでやってますよという紹介でした。
SOLR-1301の利用者が他にもいて、違うアプローチをとっていたのが印象的。
毎回全データインデックス生成するときは、SOLR-1301を利用してshard数が増えてもすぐに対応が可能になるので、
かなり便利ですよ。
<hr>

[<em>**Solr @ Etsy**</em>](http://www.lucidimagination.com/sites/default/files/file/Eurocon2011/Gio_Kincade-Solr_Etsy_eurocon2011.pdf)

Etsyは個人の作家（編み物とかシールとか）の方が出店するためのショッピングモールのようなサイトです。
実は、最近、MacBookAirのステッカーを購入したのがここでした。
で、検索にSolrを使っています。
面白いのが、検索サーバとWebアプリ（PHPで書かれている）の間のデータのやり取りにThriftを利用していること。
Solrの前にThriftを話すサーバを別途用意しているようです。ネットワークのデータ量を減らすことが目的らしいです。
そのあとは、少しThriftのサーバでのLoadBalancingの話が続きます。
次にレプリケーションの性能問題のはなし。定期的にレプリケーションに異様に時間がかかるのが問題になったようで、
Multicast-Rsyncを試してみたけどダメでしたというはなし。
Bit Torrent + Solrという組み合わせで回避したらしいのですが、いまいち仕組みがわからなかったです。。。
こちらもgithubに公開されている模様。
あとは、QParser、Stemmerをカスタマイズしたものの話です。
<hr>

[**<em>Architecting the Future of Big Data and Search</em>**](http://www.lucidimagination.com/sites/default/files/file/Eurocon2011/Baldeschwieler_HortonWorks_LuceneEurocon20111018.pdf)

LuceneのカンファレンスにHortonworksが出てきてびっくりしました。
まぁ、Luceneの生みの親＝Hadoopの生みの親ですから、問題ないのかもしれないですが。
大半が予想通り、Hadoopに関する話でした。
知らないApacheのプロジェクト「[Ambari](http://incubator.apache.org/ambari/)」というのが出てきました。これは、HadoopConferenceJapan2011 Fallでの発表にもチラッと出てきたようです。
「Ambari is a monitoring, administration and lifecycle management project for Apache Hadoop clusters.」ということで、Hadoopクラスタの統合管理のツールになるんでしょうか？
最後の2枚くらいにLuceneが出てきます。絡めてみたって感じですかね。
<hr>

[<em>**Configuring mahout Clustering Jobs**</em>](http://www.lucidimagination.com/sites/default/files/file/Eurocon2011/scholten_Configuring_Mahout_Clustering_Jobs_Eurocon2011.pdf)

今度はMahoutが出てきました。はやりのものが満載です。
まぁ、MahoutもLuceneのインデックスを利用するという話もありますので。
スライドはクラスタリングとはどういうものか、Mahoutの説明とテキストクラスタリング処理のお話、最後はstuckoverflowでのMahoutとSolrの活用の仕方について。
<hr>

ということで、英語力がない中、かなり流し読みな感じですが、あとで思い出すために書きだして見ました。
何かの役に立てれば幸いです。

他に、こんなスライドが面白かったとか、このスライドについても書いてほしいなどあれば、コメントください。





