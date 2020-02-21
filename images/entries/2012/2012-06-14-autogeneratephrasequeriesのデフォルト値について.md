---
layout: post
title: "autoGeneratePhraseQueriesのデフォルト値について(Jugemより移植)"
slug: autogeneratephrasequeriesのデフォルト値について
author: johtani
date: 2012-06-14T01:09:00+09:00
comments: true
tags: [solr]
---
久々にSolrの話です。
といっても、結構前からの話でして。。。

schema.xmlのfieldTypeの設定に「autoGeneratePhraseQueries」という属性があります。
Solr3.1で導入されました。動作に関しては[関口さんのブログ](http://lucene.jugem.jp/?eid=403)で説明されています。
Solr 1.4までは、Analyzerがトークンを複数返してくる場合（例：lucene-gosenで「Solr入門」という文字列を入れた場合など）にフレーズクエリとして処理していました。
Lucene 3.1.0から、この処理がデフォルトfalse（つまり、フレーズクエリにならない）という挙動になりました。（詳しくは[関口さんのブログ](http://lucene.jugem.jp/?eid=403)で。）
ただ、Solr 3.1.0では、下位互換性を考慮して、autoGeneratePhraseQueriesの設定値はデフォルトが「true」でした。

このデフォルト値がSolr 3.3以降で提供されているschemaのバージョン（1.4以上）からデフォルト値が「false」に変更されています。
schemaのバージョンを1.3以前のものから1.4以上に移行する場合は注意が必要です。

とまぁ、偉そうに書きましたが、私もちゃんと追えてませんでした。
Solr勉強会第６回で、[関口さんの発表](http://www.slideshare.net/KojiSekiguchi/lu-solr32-3420110912)できちんと説明されていて、参加してたのに聞けてなかったですし。（[メモ取ってるのに、書いてない。](http://johtani.jugem.jp/?eid=26)）

ということで、Solr入門のサンプルschemaも少し修正しました。
[こちら](http://johtani.jugem.jp/?eid=76)と[こちら](http://johtani.jugem.jp/?eid=76)の記事に追記してありますので、参考にしてください。
