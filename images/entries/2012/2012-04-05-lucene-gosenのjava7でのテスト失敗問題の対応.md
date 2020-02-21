---
layout: post
title: "lucene-gosenのJava7でのテスト失敗問題の対応(Jugemより移植)"
slug: lucene-gosenのjava7でのテスト失敗問題の対応
author: johtani
date: 2012-04-05T00:20:00+09:00
comments: true
tags: [lucene-gosen]
---
先日、[2.0.0リリースの記事](http://johtani.jugem.jp/?eid=72)にも記載しましたが、[Java7でテストケースが失敗する問題](http://code.google.com/p/lucene-gosen/issues/detail?id=28)がありました。

@haruyamaさんと@hideaki_tさんの協力により問題を解消し、trunkと4xブランチにコミットしました。

issueにも記載しましたが、Java6からJava7にバージョンアップするタイミングで変更されたUnicodeのバージョンが原因でした。
Java6ではUnicodeのバージョンが4.0です。Java7ではUnicodeのバージョンが6.0に変更されています。
今回の問題は「・」（0x30FB）の文字列のCharacter.getType()がCONNECTOR_PUNCTUATIONからOTHER_PUNCTUATIONに変更されたのが原因です。（この変更自体はUnicode 4.1で変更されたみたい）
カタカナ文字種の判別をlucene-gosenのnet.java.sen.tokenizers.ja.JapaneseTokenizerのgetCharClass(char c)メソッドで行なっています。
修正前は、ここで、charの範囲が0x30A0～0x30FFにある文字でかつ、Character.getType()がCONNECTOR_PUNCTUATIONでないものがカタカナとして判別されていました。
issueの添付ファイルにJava6とJava7で上記範囲の文字のCharacter.getType()のリストを生成して、該当する文字を探した所、「・」（0x30FB）のみであることがわかりました。
ということで、このコードの意図としては、「・」はカタカナではないと判別したかったのだと。
上記の確認を行えたので、ソースコードを修正してコミットしました。
2.0.1としてリリースするかは、[Issue29](http://code.google.com/p/lucene-gosen/issues/detail?id=29)のボリュームを見て考えますので、もう少しお待ちください。



___
参考にしたサイト：
[JavaSE 7でメソッド名に使えなくなった文字](http://www.hos.co.jp/blog/20111004/)
<a href="http://www.unicode.org/reports/tr44/tr44-4.html#Change_History">UNICODE CHARACTER DATABASE<a/>のHistory


