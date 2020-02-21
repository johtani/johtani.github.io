---
layout: post
title: "Solrの新しい管理画面（Solr4.x trunk系）(Jugemより移植)"
slug: solrの新しい管理画面（solr4-x-trunk系）
author: johtani
date: 2011-10-05T19:43:00+09:00
comments: true
tags: [solr]
---
Lucene/SolrのMLでSolrの管理画面を新しくするというチケットが流れていたのでちょっと触って見ました。
ほんとにちょっと触っただけですが、いくつかキャプチャ撮ってみたので、アップしときます。
※以下ではサムネイル画像に元画像（100Kくらいの画像）へのリンクが設定されています。携帯などでは見づらいかもしれませんが、ご容赦を。

URLは旧管理画面とことなり、http://localhost:8983/solr/になります。
<hr>
{{< figure src="/images/entries/20111005/20111005_2075207.jpg" alt="新管理画面：トップ画面" >}}まずはトップ画面
ダッシュボードと呼ばれるトップ画面。メモリの利用率や起動してからの時間、Luceneなどのバージョンが表示されます。<br style="clear:both" />
<br style="clear">
<hr>
{{< figure src="/images/entries/20111005/20111005_2075141.png" alt="新管理画面：クエリ実行結果" >}}次は検索画面すっきりしてます。facetが指定できるようになったのは大きいかな。ただし、facet.fieldを複数指定などができないが。結果についてはとくに指定がなければXMLで帰ってきます。ただ、パラメータの追加ができなくなってる気がするなぁ<br style="clear:both" />
<br style="clear"/>
<hr>
{{< figure src="/images/entries/20111005/20111005_2075230.png" alt="新管理画面：クエリ接続エラー" >}}ちなみに、Solrを止めて検索したらこんな感じの画面になりました。クエリの実行ならこのようにエラーがわかったのですが、停止後に左のメニューにあるSchemaなどをクリックしても白い画面が出るだけで、エラーかどうかがわかりにくいです。<br style="clear:both" />
<br style="clear"/>
<hr>
{{< figure src="/images/entries/20111005/20111005_2075122.png" alt="新管理画面：Analysisのサンプル（lucene-gosen）" >}}Analysis画面。入力画面がシンプルになりました。フィールド名はリストで表示されるので選択するだけです。あとは、これまでどおり。サンプルはlucene-gosenの解析結果です。ハイライトもきちんと表示されます。ただし、長い文章の場合は結果部分だけがスクロールできる形になり、ちょっとわかりにくかったです。<br style="clear:both" />
<br style="clear"/>
<hr>
{{< figure src="/images/entries/20111005/20111005_2075142.png" alt="新管理画面：Analysis失敗" >}}Analysisの入力画面を表示したあとにSolrを停止して解析してみたらこんなエラー画面が出ました。ちなみに、その後、画面を切り替えずにSolrを起動して解析したら、赤い帯のエラーは出たままでした。一度別画面にすれば、元に戻りますが。<br style="clear:both" />
<br style="clear"/>
<hr>
{{< figure src="/images/entries/20111005/20111005_2075140.png" alt="新管理画面：キャッシュの状態確認" >}}Pluginsの画面（旧管理画面のstatisticsに相当）。
キャッシュの状態が確認できます。今まであった画面と情報的には一緒かと。一段カテゴリ（CACHEとかCOREとか）の選択ができるようになり、見やすくなりました。
<br style="clear:both" />
<br style="clear"/>
<hr>
{{< figure src="/images/entries/20111005/20111005_2075143.png" alt="新管理画面：updatehandlerの状態。ドキュメント数とか" >}}同じくPluginsの画面。
こちらはupdateHandlerについての情報です。commit数やoptimizeの回数、updateして、commitする前の状態のドキュメント数などが表示されます。前より表示される項目が多くなってるかな？<br style="clear:both" />
<br style="clear"/>
<hr>
{{< figure src="/images/entries/20111005/20111005_2075208.jpg" alt="新管理画面：スキーマブラウザ" >}}最後はスキーマブラウザこの画面が一番良くなっています。旧管理画面では、フィールド名がすべて大文字で表示され、しかもソートがされていない状態だったため、ダイナミックフィールドを利用しているとフィールドを探すのが一苦労でした。
今回は、プルダウンでフィールドやフィールドタイプのリストが表示され、辞書順で並んでいます。Filterなどもわかりやすい表示になっているかと。
<br style="clear:both" />
<br style="clear"/>
<hr>
おまけ
{{< figure src="/images/entries/20111005/20111005_2075181.png" alt="Solritasと呼ばれるサンプル画面" >}}Solritasと呼ばれるVelocityを使った、3.x系で入ってきた新しいサンプル画面です。URLはhttp://localhost:8983/solr/browseです。ファセットなどを使った簡単なサンプル画面なので、検索結果画面でこんなことができるというデモにも使えるかと。ただ、これも旧管理画面よりはましですが、デザインが。。。<br style="clear:both" />

とまぁ、簡単ですが、4.x系の管理画面をいくつか触ってみて、キャプチャをとって見ました。
デザインは前よりもすっきりしています。ただ、クエリについてはパラメータの追加ができなくなっているので、もう少し改良されるといいかなぁ（自分でやれよと言われそうですが。。。）
