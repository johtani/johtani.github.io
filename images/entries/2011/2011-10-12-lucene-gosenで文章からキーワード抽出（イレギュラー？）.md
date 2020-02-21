---
layout: post
title: "lucene-gosenで文章からキーワード抽出（イレギュラー？）(Jugemより移植)"
slug: lucene-gosenで文章からキーワード抽出（イレギュラー？）
author: johtani
date: 2011-10-12T12:17:00+09:00
comments: true
tags: [lucene-gosen]
---
昨日、文章から特定の単語（リストあり）を探したいという話を聞き、lucene-gosenでもできるねぇという話になりました。
まぁ、考えてみればごくごく当たり前なのですが。。。（その筋の方たちにしてみれば常識なのかもしれないですが。。。）
一応やってみたので、こんなこともできるなという一例ですということで、記録を残しておきます。

今回の例文として[野田首相の所信表明演説の一部](http://www.kantei.go.jp/jp/noda/statement/201109/13syosin.html)を活用させてもらいます。
単語のリストは次のようにします。
* 内閣総理大臣
* 正心誠意
* 東日本
* 日本


今回も結果をわかりやすくするためにSolrのanalysis画面を利用します。
作業手順は以下のとおり。
1. dictionary.csvの編集
1. 辞書のコンパイル
1. fieldTypeの定義（Solrのschema.xmlの設定）
1. 文章からキーワード抽出（Solrのanalysis画面）


<div>
<span style="font-size:medium;">**1.dictionary.csvの編集**
今回はnaist-chasenディレクトリで作業します。
なお、今回利用するlucene-gosenは[ここ](http://johtani.jugem.jp/?eid=21)で紹介した辞書分離バージョンです。（はやくtrunkにコミットせねば。。。）
dictionary.csvを先ほど上げた単語だけのエントリに変更します。
キーワードだけを抽出したいので、他の単語は必要ないからです。
```

"内閣総理大臣",1,名詞,一般,*,*,*,*,"内閣総理大臣","ナイカクソウリダイジン","ナイカクソウリダイジン"
"正心誠意",1,名詞,一般,*,*,*,*,"正心誠意","セイシンセイイ","セイシンセイイ"
"東日本",1,名詞,一般,*,*,*,*,"東日本","ヒガシニホン","ヒガシニホン"
"日本",1,名詞,一般,*,*,*,*,"日本","ニホン","ニホン"
```
</div>

<div>
<span style="font-size:medium;">**2.辞書のコンパイル**
先ほど作成した辞書をコンパイルし、lucene-gosen用バイナリ辞書を作成します。
```

 $ cd $LUCENE_GOSEN_HOME&yen;dictionary
 $ ant -Ddictype=naist-chasen clean-sen compile 
```
</div>

<div>
<span style="font-size:medium;">**3.fieldTypeの定義（Solrのschema.xmlの設定）**
Solrのschema.xmlにlucene-gosenを利用するフィールドタイプを定義します。
追加するのは次の通り
```

    &lt;fieldType name="text_ja" class="solr.TextField" positionIncrementGap="100" autoGeneratePhraseQueries="false"&gt;
      &lt;analyzer&gt;
        &lt;tokenizer class="solr.JapaneseTokenizerFactory" compositePOS="compositePOS.txt" dictionaryDir="keyword-dic"/&gt;
        &lt;filter class="solr.JapanesePartOfSpeechKeepFilterFactory" tags="keeptags_ja.txt" enablePositionIncrements="true"/&gt;
      &lt;/analyzer&gt;
    &lt;/fieldType&gt;
```

また、ここで定義しているcompositePOS.txt、keeptags_ja.txtは次のようになります。


compositePOS.txt
```

未知語
```

keeptags_ja.txt
```

名詞-一般
```

未知語がバラバラに出現しないようにして見やすくするためと、必要な単語（今回は「名詞-一般」しか利用しないため。）だけを抽出したいための設定です。

</div>

<div>
**<span style="font-size:medium;">4.文章からキーワード抽出（Solrのanalysis画面）**
あとは、analysis画面で解析して見るだけになります。
{{< figure src="/images/entries/20111012/20111012_2085981.png" alt="キーワード抽出結果" >}}

ということで、辞書に登録された単語だけが抽出されてますね。
この例ではインデックスに登録となりますが。
ただし、「東日本」「日本」のような一部を含む単語の場合、「東日本」が見つかった場合は「日本」は抽出されません。
あくまでも、ベストな解が見つかるのみという形です。
すべての単語を出したい場合はもう少しやり方を考えたほうがいいかもしれません。
（まぁ、このやり方でキーワードを抽出するかも考えたほうがいいかもしれませんが。。。）

</div>
最近、頭が硬くなってきてるなぁと実感してしまいました。まぁ、こんな使い方もあるかなぁと。
もっと頭を柔らかくして問題を解けるけるようになりたいなぁと。


