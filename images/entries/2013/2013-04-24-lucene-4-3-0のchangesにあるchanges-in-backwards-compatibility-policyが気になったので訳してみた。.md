---
layout: post
title: "Lucene 4.3.0のChangesにあるChanges in backwards compatibility policyが気になったので訳してみた。(Jugemより移植)"
slug: lucene-4-3-0のchangesにあるchanges-in-backwards-compatibility-policyが気になったので訳してみた。
author: johtani
date: 2013-04-24T16:00:00+09:00
comments: true
tags: [solr]
---
<span style="color:#FF0000">現在、RC3のVoteをやっている最中（2013/04/24　16:00時点）で、まだリリースされていない、4.3.0についてです。
開発者MLでChangesの書き方を考えないとね、みたいなエントリーが流れてて気になっていたので、訳してみた。
lucene-gosenの実装を変更しないといけないっぽいなぁ。Lucene/Solr 4.2.1以前と4.3.0でI/Fとかが変わることになりそうです。（3.とか8.とか）
（ここで力尽きて、それより下はまだ読んでないです。。。）

___
○Changes in backwards compatibility policy
　　1.[LUCENE-4810](http://issues.apache.org/jira/browse/LUCENE-4810)：EdgeNGramTokenFilterが同じ入力tokenから複数のngramを生成した時にpositionを増加させていないのを修正
　　2.[LUCENE-4822](http://issues.apache.org/jira/browse/LUCENE-4822)：KeywordMarkerFilterがabstractクラスで、サブクラスがisKeyword()メソッドを実装する必要がある。新しく、SetKeywordTokenFilterというクラスにすでにある機能を分解した。
　　3.[LUCENE-4642](http://issues.apache.org/jira/browse/LUCENE-4642)：TokenizerとサブクラスのAttributeSourceのコンストラクタを削除。代わりにAttributeFactoryをもつコンストラクタを追加。
　　4.[LUCENE-4833](http://issues.apache.org/jira/browse/LUCENE-4833)：IndexWriterConfigがsetMergePolicy(null)の時にLogByteSizeMergePolicyを使っているのをデフォルトmerge policyをTieredMergePolicyに。また、nullが引数に渡されたらExceptionを返す。
　　5.[LUCENE-4849](http://issues.apache.org/jira/browse/LUCENE-4849)：ParallelTaxonomyArraysをDirectoryTaxonomyWriter/Readerのためのabstractとして作成。あと、o.a.l.facet.taxonomyに移動。
　　6.[LUCENE-4876](http://issues.apache.org/jira/browse/LUCENE-4876)：IndexDeletionPolicyをInterfaceではなく、abstractクラスに。IndexDeletionPolicy、MergeScheduler、InfoStreamでCloneableをimplement。
　　7.[LUCENE-4874](http://issues.apache.org/jira/browse/LUCENE-4874)：FilterAtomicReaderと関連するクラス（FilterTerms、FilterDocsEnumなど）でフィルタされたインスタンスをforwardしないように。メソッドが他のabstractメソッドを実装している場合に。（？）
　　8.[LUCENE-4642](http://issues.apache.org/jira/browse/LUCENE-4642), [LUCENE-4877](http://issues.apache.org/jira/browse/LUCENE-4877)：TokenizerFactory、TokenFilterFactory、CharFilterFactoryの実装者は、少なくともMap<String,String>（SPIフレームワーク（Solrとか）によってロードされる）を引数にするコンストラクタを提供する必要がある。さらに、TokenizerFactoryはcreate(AttributeFactory,Reader)メソッドを実装する必要もある。

