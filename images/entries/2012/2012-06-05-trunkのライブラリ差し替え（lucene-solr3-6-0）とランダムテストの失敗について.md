---
layout: post
title: "trunkのライブラリ差し替え（Lucene/Solr3.6.0）とランダムテストの失敗について(Jugemより移植)"
slug: trunkのライブラリ差し替え（lucene-solr3-6-0）とランダムテストの失敗について
author: johtani
date: 2012-06-05T01:29:00+09:00
comments: true
tags: [lucene-gosen]
---
久々にlucene-gosenを触っています。
trunkのlibにある、jarファイルが3.5ベースだったので、3.6ベースにしてテストをしたところ、
いくつかある、ランダムテストで結果の不整合が検出されたので、調査していました。
先程、trunkに対応版をコミットしました。もう少しテストケースを追加してからリリースします。
おそらく、通常の使い方では問題無いと思います。

Luceneでは、ランダムな文字列を利用したテストが実装されています。
lucene-gosenでもこのテストを利用してランダムなテストをしています。
実際にはtest/以下のorg.apache.luceneパッケージにテストケースがあります。
今回、jarファイルを差し替えた時に、このランダムなテスト実施にて、assertが失敗するケースが発生しました。

原因究明までに、いくつかフェーズがあったので、忘れないように書いておきます。

1.ランダムテストのテストケースにてエラーがassertが失敗するケースが発生
※ただし、成功する場合もあり。
2.該当のテストを再現しつつデバッグ＋該当のテストがどんなものかを解読（勉強不足。。。）
※テストは、失敗した場合につぎのようなメッセージが表示され、同じテストが再現可能です。
以下、エラーの出力例。「NOTE: reproduce with: 」のあとにあるantコマンドを実行すれば、同じテストが再現可能です。
```

    [junit] ------------- Standard Error -----------------
    [junit] TEST FAIL: useCharFilter=false text='wgxznwk'
    [junit] 
    [junit] ===>
    [junit] Uncaught exception by thread: Thread[Thread-3,5,main]
    [junit] org.junit.ComparisonFailure: term 0 expected:<w[gxznwk]> but was:<w[]>
    [junit] 	at org.junit.Assert.assertEquals(Assert.java:125)
    [junit] 	at org.apache.lucene.analysis.BaseTokenStreamTestCase.assertTokenStreamContents(BaseTokenStreamTestCase.java:146)
    [junit] 	at org.apache.lucene.analysis.BaseTokenStreamTestCase.checkAnalysisConsistency(BaseTokenStreamTestCase.java:565)
    [junit] 	at org.apache.lucene.analysis.BaseTokenStreamTestCase.checkRandomData(BaseTokenStreamTestCase.java:396)
    [junit] 	at org.apache.lucene.analysis.BaseTokenStreamTestCase.access$000(BaseTokenStreamTestCase.java:51)
    [junit] 	at org.apache.lucene.analysis.BaseTokenStreamTestCase$AnalysisThread.run(BaseTokenStreamTestCase.java:337)
    [junit] <===
    [junit] 
    [junit] NOTE: reproduce with: ant test -Dtestcase=TestGosenAnalyzer -Dtestmethod=testReliability -Dtests.seed=4ad9618caecb9fb2:d5476c03b8172df:-9c569f70013ffbb -Dargs="-Dfile.encoding=SJIS"
    [junit] ------------- ---------------- ---------------
    [junit] Testcase: testReliability(org.apache.lucene.analysis.gosen.TestGosenAnalyzer):	Caused an ERROR

```

3.デバッグの結果、Luceneのtest-frameworkにある「MockReaderWrapper」というクラスの影響を確認
LuceneのJIRAの[LUCENE-3894](https://issues.apache.org/jira/browse/LUCENE-3894)にて追加されたクラスであるとわかる。
このクラス、Readerのreadメソッド内部で、ランダムな値を元に長さを途中で返すという実装のReaderになっている。
（全部で18文字の文字列なのだが、ランダムな値を元に、12文字として結果を一旦返すという仕組みが実装されている）
4.lucene-gosenの問題箇所を特定。
Readerが途切れた部分を分節として扱ってしまう実装になっていた。
[該当の部分に修正をいれてコミット。](http://code.google.com/p/lucene-gosen/source/detail?r=204)
という具合です。
一応、テストを数回走らせてランダムテストが問題なく終了するのを確認はしてあります。
今回の問題に対する、個別のテストケースを追加してから近日中リリースする予定です。
対応が遅くなって申し訳ないです。。。
