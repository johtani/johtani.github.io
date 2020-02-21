---
layout: post
title: "Partial UpdateとcopyFieldのバグ【Solr 4.0 ALPHA】(Jugemより移植)"
slug: partial-updateとcopyfieldのバグ【solr-4-0-alpha】
author: johtani
date: 2012-07-13T20:02:00+09:00
comments: true
tags: [solr]
---
今日はSolr 4.0 ALPHAの興味深い機能があったので紹介です。
数日前に[「Solr 4.0: Partial documents update」](http://solr.pl/en/2012/07/09/solr-4-0-partial-documents-update/)という記事を見つけました。

Solrには、ドキュメント（RDBで言うレコード）のデータを更新したい場合には、特定のフィールドだけを更新するという機能がありませんでした。
ですので、特定の項目（例えば、priceなど）を更新したい場合、ドキュメントの全データをSolrに再度上書き登録するという処理をしなければなりませんでした。
RDBを触っていた方が、Solrを始めた場合に必ず使いづらいと思われる点だと思います。

で、4.0でその機能がありますという、[「Solr 4.0: Partial documents update」](http://solr.pl/en/2012/07/09/solr-4-0-partial-documents-update/)の記事を見つけました。
ただ、SolrのWikiや4.0 ALPHAの紹介のページには「partial update」という記述が見当たりません。
（あれ、これかな？[Update semantics](http://wiki.apache.org/solr/Per%20Steffensen/Update%20semantics)）
あと、まだ完成していないので、載っていないのかもしれないです。（この[チケットSOLR-139](https://issues.apache.org/jira/browse/SOLR-139)が部分更新に関するもののはず。チケット番号をみても古くから望まれている機能だということがわかります。）

ということで、調べてみました。

###機能概要
___
Solrの機能として、特定のフィールドのみを更新するという機能です。
あくまでも、Solrレベルでの機能となり、Luceneの機能を利用したものではありません。
つぎのような流れになっています。

1. Solrに対して特定フィールドを更新したいという形のドキュメントを投げる
1. Solrはドキュメントを受け取ると、内部のインデックスに保存してあるデータを取り出す
1. 取り出したドキュメントオブジェクトに対して、更新対象フィールドの値だけデータを更新する
1. ドキュメントオブジェクトをインデックスに保存する


このような流れです。
まぁ、言われてみれば当たり前な処理です。
ただし、この機能を使う場合はいくつかの前提条件があります。

###前提条件
___
前提条件はつぎのとおりです。

* すべてのフィールドをstored="true"にする
* 「_version_」という特殊なフィールドを用意する


1点目は、データの保存方法についてです。
先ほど流れに書きましたが、Solrが内部に保存してあるデータを取り出して、更新対象以外のデータを保存しなおしてくれます。
このため、stored="true"にしておかないと、元のデータがSolr内部で取得できません。

2点目の「_version_」というフィールドは4.0から導入されたフィールドです。
SolrCloudに必要な機能としてドキュメントのバージョン管理を行うために導入されたフィールドだと思います。（あまり詳しく調べていない。。。）
SolrCloud内でレプリカの更新などに使ってるのかなぁと（そのうち調べます。）
以上の2点が前提条件です。すべてのデータをstored="true"としなければならない点は、インデックスのサイズや性能に関わってくるので考えて利用するほうがいいかと思います。

###利用方法
___
Solrのサンプルデータ（exampledocs/mem.xml）を例として利用します。
部分更新を行うにはつぎのような形のデータを投げると部分更新が可能です。
（JSONでの更新のサンプルについては、[こちらの記事](http://solr.pl/en/2012/07/09/solr-4-0-partial-documents-update/)を参考にしてください。）
####XMLのサンプル（partial_update.xmlというファイルで保存する）
```
&lt;add&gt;
&lt;doc&gt;
  &lt;field name="id"&gt;VS1GB400C3&lt;/field&gt;
  &lt;field name="_version_"&gt;バージョン番号&lt;/field&gt;
  &lt;field name="cat" update="add"&gt;cats_and_dogs&lt;/field&gt;
  &lt;field name="popularity" update="inc"&gt;10&lt;/field&gt;
  &lt;!-- set empty for SOLR-3502 bug --&gt;
  &lt;field name="price_c" update="set"&gt;0.0,USD&lt;/field&gt;
&lt;/doc&gt;
&lt;/add&gt;
```
上記サンプルのうち、<b>バージョン番号</b>の部分は、現在Solrに登録してある値を指定します。（Solrの管理画面で検索すれば表示されます。）
上記ファイルを「SOLR_HOME/example/exampledocs」に保存し、同フォルダにてつぎのコマンドを実行すると、部分更新されるのがわかります。
Solrに更新であるというフィールドがわかるように、fieldタグにupdateという属性を指定してあります。

```

java -Durl=http://localhost:8983/solr/update?versions=on -Dout=yes -jar post.jar partial_update.xml
```

ちなみに、上記post.jarのオプションで、「-Durl」「-Dout」を追加してあります。
「-Durl」はverions=onというパラメータを追加したいためです。
「-Dout」はPOSTした結果をターミナルに表示するために追加しています。
これらのオプションを指定すると、データ更新後のバージョンが取得できるようになります。

####更新に利用できるコマンド？
部分更新にはつぎの3つのコマンド？（正式名は不明）が用意されています。fieldタグのupdate属性に指定します。
<table class="list_view">
  <thead>
    <tr>
      <th>コマンド？</th>
      <th>説明</th>
    </tr> 
  </thead>
<tbody>
<tr>
  <td>add</td>
  <td>値を追加します。multiValuedのフィールドでない場合はエラーが出ます。</td>
</tr>
<tr>
  <td>set</td>
  <td>値を新規に登録しなおします。現在入っているデータは無くなります</td>
</tr>
<tr>
<td>inc</td>
<td>指定された数値を加算（数値形式のみ）</td>
</tr>
</tbody>
</table>
以上が、部分更新の機能になります。
ちなみに、登録されているバージョンと更新データに入っているバージョンが異なる場合はエラーが発生する仕組みになっているようです。

それとは別に、この機能を調べていて、copyFieldのバグにぶつかってしまいました。。。
multiValuedでない、copyFieldを利用しているしている場合には注意が必要です。

###copyFieldのバグ（SOLR-3502）
___
4.0-ALPHA（3.6.0でも再現しました。）のexampleのデータで部分更新の機能を確認できると言いました。
ただし、「price_c」というフィールドのせいで、2回部分更新を行うと2回目にエラーが発生します。
根本的な問題は、部分更新ではなく[copyFieldのバグ](https://issues.apache.org/jira/browse/SOLR-3502)のようです。（部分更新の処理にも問題は有るような気がしますが。。。）

バグの内容はつぎのとおりです。

* multiValued="false"のフィールドをdestに指定
* srcに指定されたフィールドに値を設定（exampleのpriceフィールドに「1」を指定）
* destに指定されたフィールドに値を設定（exampleのprice_cフィールドに「2,USD」を指定）


上記のように設定した場合、「price_c」フィールドに、指定された値＋「price」の値がcopyにより追加されます。
通常は「price_c」フィールドはmultiValued="false"なのでエラーが出るはずなのですが、エラーが発生せず2つの値が登録されてしまいます。

このバグのため、exampleのデータを利用して部分更新を行うとつぎのような状態が発生します。
更新を行う対象のデータはprice、price_cフィールド以外のフィールドとします。

* 1回目の登録後：priceフィールド「"185.0"」、price_cフィールド「"185.0,USD"」
* 2回目の登録後：priceフィールド「"185.0"」、price_cフィールド「["185.0,USD","185.0,USD"]」
* 3回目の登録：エラーが発生


部分更新の処理で、すでに登録済みのデータをSolrが自動で取り出すため、2回目の登録処理にて「price_c」の登録済みの値がSolrから取り出され、さらにcopyField設定により、「price」の値が追加されます。
本当は2回目の登録でエラーが発生すべきなのですが、バグのためエラーが発生せずに登録できてしまいます。
部分更新の処理としては、copyフィールドのdestに指定されているフィールドの値を取り出さないほうがいいような気もしますが、きちんと考えてないのでなんとも言えないです。（制約事項とする形のほうがいいかもしれません）







 
