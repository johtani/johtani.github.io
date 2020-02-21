---
layout: post
title: "NAIST-JDic for MeCab対応版（仮実装）(Jugemより移植)"
slug: naist-jdic-for-mecab対応版（仮実装）
author: johtani
date: 2011-06-21T07:38:00+09:00
comments: true
tags: [lucene-gosen]
---
lucene-gosenの~~trunk~~branches/impl-mecab-dicにNAIST-JDic for MeCabの辞書を利用出来るPreprocessorをコミットしました。<br />
<br />
ビルド方法は次のとおりです。<br />
<div class="run_sample">
```

$ cd lucene-gosen-trunk
$ ant -Ddictype=naist-mecab
```
</div><br />
現在のstable版で利用できる辞書は「ipadic」「naist-chasen」の2種類でした。<br />
[以前の記事](http://johtani.jugem.jp/?eid=4)に書きましたが、naist-chasenの辞書でも2008年の更新となっています。<br />
今回コミットしたPreprocessorでは[NAIST-JDicのサイト](http://sourceforge.jp/projects/naist-jdic/)で公開されているMeCab向けの辞書である「mecab-naist-jdic-0.6.3-20100801」を利用出来るようになります。<br />
<br />
ただし、lucene-gosenは昔のMeCabから派生したSenをもとにしていますので、最新のMeCabが持っている機能は<br />
利用できません。<br />
MeCab向けの辞書のうち一部のもの（matrix.def、naist-jdic.csvなど）を利用してlucene-gosen向けの辞書の中間ファイルを生成する仕組みになっています。<br />
<br />
まだ、仮実装版ということで、とりあえず動作するバージョンとなっています。<br />
まだテストが不十分ですが。。。<br />
利用してみて問題などあれば、lucene-gosenの[issue](http://code.google.com/p/lucene-gosen/issues/list)に登録していただくか、コメントを頂ければと思います。<br />
<br />
※更新が週1回に落ちてきてるので、もう少し頑張らねば。<br />
<br />
<span style="color:#FF0000">※2011/07/04追記
trunkにコミットしていましたが、branchに一旦移動しました。
仮実装として一旦コミットしたので、trunkとは別でテストする必要があるかと思った次第です。
ということで、試してみたい方は、[branches/impl-mecab-dic](http://code.google.com/p/lucene-gosen/source/browse/#svn%2Fbranches%2Fimpl-mecab-dic)にありますので、触ってみてください。
