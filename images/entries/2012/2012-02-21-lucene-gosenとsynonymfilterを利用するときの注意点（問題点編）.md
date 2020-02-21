---
layout: post
title: "lucene-gosenとSynonymFilterを利用するときの注意点（問題点編）(Jugemより移植)"
slug: lucene-gosenとsynonymfilterを利用するときの注意点（問題点編）
author: johtani
date: 2012-02-21T01:41:00+09:00
comments: true
tags: [lucene-gosen]
---
久々にlucene-gosenの話です。
しかも、あんまり嬉しくない話しです。

すでに[issueをアップ](http://code.google.com/p/lucene-gosen/issues/detail?id=23)していますが、lucene-gosenとSynonymFilterを併用する場合に、特定の条件下でNullPointerExceptionが発生してしまいます。

条件は以下の組み合わせになります。
* Solr 3.5.0以前
* lucene-gosen1.2.0 - 1.2.1の辞書なしjar
* SynonymFilterFactoryにてtokenizerFactoryを指定


根本的にはSolr側の問題のようです。[SOLR-2909](https://issues.apache.org/jira/browse/SOLR-2909)としてissueが上がっています。

SynonymFilterFactoryでは、類義語の設定ファイルの単語を読み込むときにtokenizerFactoryを指定できます。
このとき、SynonymFilterFactory内部でtokenizerFactoryに指定されたFactoryのクラスが読み込まれ、
インスタンス化されて、Tokenizerが作成されます。
この、Tokenizerのインスタンス化の処理シーケンスに問題があります。
schema.xmlの&lt;tokenizer&gt;タグで指定されたTokenizerFactoryでは、ResourceLoaderAwareインタフェースのinform(ResourceLoader loader)メソッドが実行されます。
このinform()メソッドがSynonymFilterFactoryのToeknizerのインスタンス化の場合に実行されません。
lucene-gosenのJapaneseTokenizerFactoryではこのinform()メソッドでdictionaryDirのパスの読み込みを行なっています。（[このへん](http://code.google.com/p/lucene-gosen/source/browse/branches/rel-1.2/src/java/org/apache/solr/analysis/JapaneseTokenizerFactory.java#73)）

上記の条件では、NullPointerExceptionが発生すると書きました。
辞書を内包したjarファイルを利用している場合、NullPointerExceptionが発生しなくても次のような問題点があります。こちらの問題は見た目は動いているように見えてしまうので注意が必要です。
すべて、SynonymFilterを利用する時点でも問題点になります。
* compositePOS設定が類義語辞書読み込み時に無効
* dictionaryDir設定が類義語辞書読み込み時に無効（＝jarに内包されている辞書で動作する）


一見動いているように見えるかもしれませんが、望んでいてる動作になっていない可能性があるので注意が必要です。
___

<span style="font-size:medium;">解決策（まだ途中）

先程書きましたが、基本的にはSolr側の修正をするのが妥当です。
[SolrのJIRAにパッチもアップされました。](https://issues.apache.org/jira/browse/SOLR-2909?PHPSESSID=15f554bea5726faaad9185880c7e6a15)
こちらのパッチをSolrに適用し、SynonymFilterFactoryを次のように指定することで問題を回避することが可能になります。
```


　&lt;tokenizer class="solr.JapaneseTokenizerFactory" compositePOS="compositePOS.txt"
　 dictionaryDir="dictionary/naist-chasen"/&gt;
　...
　　&lt;filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" 
　　  expand="true" tokenizerFactory="solr.JapaneseTokenizerFactory" 
　　  **compositePOS="compositePOS.txt" dictionaryDir="dictionary/naist-chasen"**/&gt;
　...
```
SynonymFilterFactoryの設定にcompositePOS、dictionaryDirを追加します。
ここの設定は&lt;tokenizer&gt;タグで指定された設定と同じ物を指定します。以上で問題なく動作することになります。

ただし、この方法はSolrにパッチを当てなければいけません。
Solrにパッチを当てるのもなかなかな作業だと思います。
ということで、どうにかlucene-gosen側だけでも対応出来る形にしたいなぁと考えているところです。
残念ながら、まだ考えているだけですので、もう少し提供できるのは先になってしまいますが。。。
現時点では、次の方法を考え中です。
1. informメソッドを呼ぶフラグを追加して、どうにかしてinformメソッドを呼び出す
1. SynonymFilterの修正版をlucene-gosenに内包して提供する

できれば、a.にて対応できればと思っています。
最悪、b.の方法かと。
悩んでいる間にSolrの次のバージョンが出てしまわないように出来るだけ早く対応しようと思っています。
他にも問題点や気になる点があれば、日本語、英語を問わないので、気兼ねなくissueに上げてもらうか、Twitterで私宛にメンションしてもらえればと。
（あ、issue23へのパッチでもいいですよ！）


追記：
まだ、SOLR-2909のパッチを適用してからの確認はできていません。（ソース見て大丈夫だと思ってるレベル）
あと、現時点での対応方法としては、「lucene-gosenとは別のjarにSynonymFilterFactoryなどを入れて提供」が妥当かなぁと考えているところです。（無理やりinformメソッド呼び出すのは骨が折れそう＋パッチが思いの外早く出て、導入されたのでlucene-gosen本体に特殊処理を入れるのはあまりメリットを感じない。）
