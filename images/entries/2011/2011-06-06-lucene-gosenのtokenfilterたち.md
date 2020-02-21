---
layout: post
title: "lucene-gosenのTokenFilterたち(Jugemより移植)"
slug: lucene-gosenのtokenfilterたち
author: johtani
date: 2011-06-06T16:23:00+09:00
comments: true
tags: [lucene-gosen]
---
lucene-gosenをSolr/Luceneで利用する場合、TokenFilterを利用してTokenizerが出力したToken対してさまざまな処理（Tokenに対する正規化や展開など）を追加することが可能です。

今回は現在（ver. 1.0.1）用意されているTokenFilterについて説明します。
以下はTokenFilterの一覧です。
「フィルタ名」にはSolrのschema.xmlで記述するクラス名を書いてあります。

<table class="list_view">
<thead>
<tr>
<th>フィルタ名(Factory名)</th>
<th>概要</th>
</tr>
</thead>
<tbody>
<tr class="spec">
<td>solr.JapaneseWidthFilterFactory</td>
<td>全角のASCII文字を半角に、半角カタカナを全角にするフィルタ。例：「Ｃｏｍｐｕｔｅｒ」-&gt;「Computer」</td>
</tr>
<tr class="specalt">
<td class="alt">solr.JapanesePunctuationFilterFactory</td>
<td class="alt">区切り文字、記号などを除外するフィルタ。[※1](#token_filter_kome_1)</td>
</tr>

<tr class="spec">
<td>solr.JapanesePartOfSpeechStopFilterFactory</td>
<td>設定ファイルに記載した品詞に該当するTokenを除外するフィルタ。ファイルは「tags="ファイル名"」とfilterに記載。なお、ここで記述する品詞とはanalysis画面に表示される「partOfSpeech」の完全一致となります。</td>
</tr>
<tr class="specalt">
<td class="alt">solr.JapanesePartOfSpeechKeepFilterFactory</td>
<td class="alt">設定ファイルに記載した品詞に該当するToken<span style="color:#ff0000">"以外"を除去フィルタ。ファイルは「tags="ファイル名"」とfilterに記載。なお、ここで記述する品詞とはanalysis画面に表示される「partOfSpeech」の完全一致となります。</td>
</tr>

<tr class="spec">
<td>solr.JapaneseBasicFormFilterFactory</td>
<td>Tokenを基本形に変換するフィルタ。例：「悲しき」-&gt;「悲しい」</td>
</tr>
<tr class="specalt">
<td class="alt">solr.JapaneseKatakanaStemFilterFactory</td>
<td class="alt">カタカナの長音（ー）の正規化フィルタ。4文字以上のカタカナのみの文字列の最後の長音（ー）を除去した文字列に変換します。例：「コンピューター」-&gt;「コンピュータ」、「コピー」-&gt;「コピー」</td>
</tr>

</tbody>
</table>



上記のTokenFilterをJapanizeTokenizerを利用するフィールドタイプに設定することで
各フィルタによる機能が有効になります。
schema.xmlの記載に関する詳細については[こちら](http://lucene-gosen.googlecode.com/svn/trunk/example/schema.xml.snippet)を参考にしてください。


<span style="font-size:x-small;" id="token_filter_kome_1">※1　Characterクラスの以下の定数に相当する文字が。SPACE_SEPARATOR、LINE_SEPARATOR、PARAGRAPH_SEPARATOR、CONTROL、FORMAT、DASH_PUNCTUATION、START_PUNCTUATION、END_PUNCTUATION、CONNECTOR_PUNCTUATION、OTHER_PUNCTUATION、MATH_SYMBOL、CURRENCY_SYMBOL、MODIFIER_SYMBOL、OTHER_SYMBOL、INITIAL_QUOTE_PUNCTUATION、FINAL_QUOTE_PUNCTUATION
