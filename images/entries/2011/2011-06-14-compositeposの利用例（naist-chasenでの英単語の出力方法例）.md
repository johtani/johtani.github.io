---
layout: post
title: "compositePOSの利用例（naist-chasenでの英単語の出力方法例）(Jugemより移植)"
slug: compositeposの利用例（naist-chasenでの英単語の出力方法例）
author: johtani
date: 2011-06-14T00:00:00+09:00
comments: true
tags: [lucene-gosen]
---
前回、naist-chasenではアルファベットが別々の単語としてanalyzeされてしまうという話をしました。

ただ、これだと、英単語が含まれた文章を形態素解析すると、英単語がアルファベット単位に区切られてしまい、
単語の意味をなさなくなってしまいます。

lucene-gosenでは、この問題に対応するための方法が提供されています。
CompositeTokenFilter（compositePOS）という機能です。

文字通り「トークン」を「合成」するための機能になります。

利用するためには以下の作業が必要です。（※Solrでのの利用方法を説明します。）

1. compositePOS設定ファイル（composite_pos_ja_naist-chasen.txt）の用意
1. schema.xmlのtokenizerにcompositePOS設定を追加


まずは、compositePOS設定ファイルの記述方法について説明します。
compositePOS設定ファイルには１行につき１つのcompositeの設定を記述していきます。
記述方法は次のようになります。品詞名を半角スペース区切りで記述します。
```

連結品詞名 構成品詞名1 構成品詞名2 ... 構成品詞名n
```
それぞれは次のような意味を持ちます。
* 連結品詞名：合成したあとのトークンの品詞として出力する品詞名
* 構成品詞名：合成したい品詞名（スペース区切りで複数指定可能）


TokenizerのcompositePOS機能は、構成品詞に定義されたトークンが連続して出力された場合に、
結合（合成）して１つのトークン（連結品詞名）として出力します。
また、以下のように構成品詞名が１種類で連続品詞名としても利用する場合は次のように省略した記述も可能です。

以下にcompositePOSファイルの設定例を上げます。
※なお、現時点では#によるコメント機能はありません。ので、記述した内容がそのまま利用されます。
```

名詞-数 
未知語 記号-アルファベット
```

１行目は連続した数字を1つのトークン（名詞-数）として出力する設定です。（連続品詞名＝構成品詞名として省略して記述した例になります。）
2行目は連続したアルファベットを１つのトークン（未知語）として出力する設定です。

次にSolrのschema.xmlにlucene-gosenのtokenizerを利用するフィールドタイプの設定を記述します。
$SOLR_HOME/conf/schema.xmlに以下を追加します。&lt;types&gt;～&lt;/types&gt;タグの間に記載します。
```

...
 &lt;types&gt;
 ...

    &lt;fieldType name=&quot;text_ja&quot; class=&quot;solr.TextField&quot; positionIncrementGap=&quot;100&quot;&gt;
    &lt;analyzer&gt;
        &lt;tokenizer class=&quot;solr.JapaneseTokenizerFactory&quot; compositePOS=&quot;composite_pos_ja_naist-chasen.txt&quot;/&gt;
    &lt;/analyzer&gt;
    &lt;/fieldType&gt;
 &lt;/types&gt;
...

```
重要なのはtokenizerタグのcompositePOS属性になります。ここに1.で記載したファイルを指定します。指定したファイルはschema.xmlと同じディレクトリに配置します。
以上が利用するための設定です。



前回同様、「このComputerは、10回に1回の割合で起動中に青い画面が表示されます。」という文章をanalyze画面で解析した結果を示します。

{{< figure src="/images/entries/20110614/20110614_1890705.png" alt="compositePOS設定済み" >}}
<br clear="all">
とまぁ、記事を書きましたが、すでに[こちら](http://wiki.livedoor.jp/haruyama_seigo/d/Solr/Tokenizer%C9%BE%B2%C1201105/JapaneseTokenizer)で出ている話ですね。。。

みなさん手が早くて困ってますｗ

ちなみに、上記の設定の場合、「100,000」や「3.14」といった文字列は「100」「,」「000」という形で出力されてしまいます。これらも数字とみなしたい場合は「名詞-数 名詞-数 記号-句点 記号-読点」という設定で１つのトークンとして出力されます。ただし、「。」も「記号-句点」なので注意が必要です。

<span style="font-size:small;">※なお、今回はlucene-gosen-1.1.0、Solr3.2を利用した例になっています。


 







