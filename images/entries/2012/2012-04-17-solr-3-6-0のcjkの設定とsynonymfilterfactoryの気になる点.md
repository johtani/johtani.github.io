---
layout: post
title: "Solr 3.6.0のCJKの設定とSynonymFilterFactoryの気になる点(Jugemより移植)"
slug: solr-3-6-0のcjkの設定とsynonymfilterfactoryの気になる点
author: johtani
date: 2012-04-17T01:16:11+09:00
comments: true
tags: [solr]
---
先日、Solr入門のサンプルschema.xmlの3.6.0対応版の作成をしていて、気になったことがあったので、
メモとして残しておきます。

SynonymFilterFactoryの属性「<span style="color:#FF0000">tokenizerFactory」に関連する話です。
（[「Apache Solr入門」](http://www.amazon.co.jp/exec/obidos/ASIN/4774141755/johtani-22/ref=nosim/)の36-37ページに記載があります。）


SynonymFilterFactoryでは、類義語設定ファイルを読み込む際に利用するTokenizerFactoryを「tokenizerFactory」という属性で指定できます。（以下は書籍の記述を抜粋）
```

  &lt;filter class="sold.SynonymFilterFactory" synonyms="synonyms.txt" ... tokenizerFactory="solrbook.analysis.SenTokenizerFactory"/>
```
このように、TokenizerFactoryが指定できます。

ただ、[こちらの記事](http://johtani.jugem.jp/?eid=76)で書いたように、
Solr 3.6.0のexampleのschema.xmlではCJKのフィールドは次のように設定されています。
```

    &lt;!-- CJK bigram (see text_ja for a Japanese configuration using morphological analysis) -->
    &lt;fieldType name="text_cjk" class="solr.TextField" positionIncrementGap="100">
      &lt;analyzer>
        &lt;tokenizer class="solr.StandardTokenizerFactory"/>
        &lt;!-- normalize width before bigram, as e.g. half-width dakuten combine  -->
        &lt;filter class="solr.CJKWidthFilterFactory"/>
        &lt;!-- for any non-CJK -->
        &lt;filter class="solr.LowerCaseFilterFactory"/>
        &lt;filter class="solr.CJKBigramFilterFactory"/>
      &lt;/analyzer>
    &lt;/fieldType>
```

3.6.0以前は、solr.CJKTokenizerFactoryを利用していましたが、3.6.0からはCJKTokenizerFactoryがdeprecatedになってしまい、代わりにStandardTokenizerFactory＋CJKBigramFilterFactoryの組み合わせになっています。
exampleのCJKのフィールドタイプ設定を利用して、かつ、そのフィールドにSynonymFilterを利用する場合に、
StandardTokenizerFactoryを指定してしまうと、類義語が展開できなくなってしまうので注意が必要です。

CJKのフィールドでSynonymFilterを利用する場合は、類義語の設定ファイル内の記述を自力でCJKTokenizerが分割する形で記述する（まぁ、やらないでしょうが）か、deprecatedですが、CJKTokenizerFactoryを利用するのが現時点での対応でしょうか。

なお、これに絡んで、[このようなチケット](https://issues.apache.org/jira/browse/SOLR-3359)もできています。


<span style="font-size:x-small;">SyntaxHighlighterを導入してみました。
<span style="font-size:x-small;">ちょっとはみやすくなってますかね？
<span style="font-size:x-small;">まだ、SyntaxHighlighterの設定を調べながら使っているので、コロコロ変わるかもしれないですが、気にしないでください。
