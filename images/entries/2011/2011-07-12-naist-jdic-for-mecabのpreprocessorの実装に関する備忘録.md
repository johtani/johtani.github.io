---
layout: post
title: "NAIST-JDic for MeCabのPreprocessorの実装に関する備忘録(Jugemより移植)"
slug: naist-jdic-for-mecabのpreprocessorの実装に関する備忘録
author: johtani
date: 2011-07-12T10:06:00+09:00
comments: true
tags: [lucene-gosen]
---
忘れてしまうので、備忘録を残しておきます。
一応、ソースには少しずつコメントをいれてはいるのですが。
私は残念ながら、自然言語処理は初心者に毛が生えた程度（現在、鋭意勉強中）で、対応方法に問題があるかもしれません。気づいた方はコメントをいただけると助かります。

<span style="font-size:medium;">辞書ファイルについて

NAIST-JDic for MeCabの辞書ファイルは以下の構成になっています。

<table class="list_view">
<thead>
<tr>
<th>ファイル名</th>
<th>メモ</th>
</tr>
</thead>
<tbody>
<tr class="spec">
<td>char.def</td>
<td>文字種の設定</td>
</tr>
<tr class="specalt">
<td class="alt">feature.def</td>
<td class="alt">辞書学習用の設定？</td>
</tr>
<tr class="spec">
<td>left-id.def</td><td>左文脈IDのマスタ（左文脈ID、品詞情報）</td>
</tr>
<tr class="specalt">
<td class="alt">matrix.def</td>
<td class="alt">連接コスト表（前件文脈ID,後件文脈ID,連接コスト）</td>
</tr>
<tr class="spec">
<td>pos-id.def</td>
<td>品詞IDのマスタ（品詞情報、ID）</td>
</tr>
<tr class="specalt">
<td class="alt">rewrite.def</td>
<td class="alt">rewrite情報（左右文脈に出現した場合のそれぞれの品詞情報のrewriteルール。辞書学習で主に利用）</td>
</tr>
<tr class="spec">
<td>right-id.def</td>
<td>右文脈IDのマスタ（右文脈ID、品詞情報）</td>
</tr>
<tr class="specalt">
<td class="alt">unk.def</td>
<td class="alt">未知語の品詞情報（文字種ごとに未知語のコスト、左右文脈ID、品詞情報が記載されている）</td>
</tr>
<tr class="spec">
<td>naist-jdic.csv</td>
<td>単語辞書（単語、左右文脈ID、単語コスト、品詞情報、読みなど記載）</td>
</tr>
</tbody>
</table>

現時点では、MeCabDicPreprocessorでは以下のファイルを利用しています。
* left-id.def
* matrix.def
* right-id.def
* naist-jdic.csv


上記以外のファイルは現時点では利用しない実装になっています。
ただし、rewrite.def、unk.def、char.defについては利用したほうがよりMeCabに近い結果が得られるような気がしています。（特に文字種ごとのコストを利用することは有効と思われます。）


<span style="font-size:medium;">Preprocessorでの処理について

lucene-gosenはSenの後継であり、MeCabの昔のバージョンを移植したものがベースとなっています。
lucene-gosenとMeCabの現時点での実装の大きな違いとして、連接コスト表の違いがあります。
ここからは憶測になってしまいますので、注意してください。（論文を探せばどこかにこの実装の変化の過程が記載してあるかもしれないですが、まだ探していません、すみません。）
過去のMeCabではChaSen向けの辞書を利用していました。
ChaSenでは連接コスト表が3つの項（前の前、前、後）から構成されていました。（n項まで定義可能らしい）
ですので、lucene-gosenのViterbiアルゴリズムの引数も3つのノードが引数となっています。
lucene-gosen向けの連接コスト辞書も同様の作りになっています。
一方、現在のMeCabは先ほど書いたとおり、matrix.defでは2項の連接コスト表（前、後）となっています。この違いを保管するために、Preprocessorでは、matrix.defを3項にするために一番左（前の前）については任意の品詞を採用できるように「*,*,*,*,*,*,*」のみを設定しています。

現時点では、Preprocessorの出力である中間ファイルを共通の形式に出力することで、DictinaryBuilder以降の処理に変更を加えることなくNAIST-JDic for MeCabへの対応を行う形を取りました。まずは使えるようにするのが先かと思いまして。
ただ、MeCabの辞書の構成から考えると中間ファイルに落とし込む処理に無駄があると感じています。
matrix.defでせっかく、IDによる連接コスト表を構成しているのに、IDを品詞情報の文字列に戻したconnection.csvを生成していますので。

ということで、備忘録でした。
あとは、テストをどうするか（正解をどう考えるか）なども考える必要があります。現時点での悩みの種です。。。アイデア募集中です。





