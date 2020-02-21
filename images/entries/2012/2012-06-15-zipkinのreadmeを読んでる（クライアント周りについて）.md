---
layout: post
title: "ZipkinのReadmeを読んでる（クライアント周りについて）(Jugemより移植)"
slug: zipkinのreadmeを読んでる（クライアント周りについて）
author: johtani
date: 2012-06-15T09:57:00+09:00
comments: true
tags: [Zipkin]
---
ZipkinのGithubにあるReadmeを読んでます。
せっかくというか、頭が悪いので読みながら内容をメモ。
まずは、アーキテクチャとトレースデータ送信のためのクライアント側あたりです。
（誤訳とかおかしいだろというツッコミ大歓迎です。）
あとで、リンク貼ったり絵を入れたりするかもしれませんが、とりあえず。


<b>◯アーキテクチャ（[図はこちら](https://github.com/twitter/zipkin/raw/master/doc/architecture-0.png)）</b>
```

　・対象とするサービスからScribeでデータを収集し、ZipkinのCollectorに投げる
　・CollectorはCassandraにデータを格納
　・WebUIからはQueryでCassandraに問い合わせを行なってデータ取得
　・Scripe、CollectorはZookeeperと連携している（妄想）

```
<b>◯計測用ライブラリ（[図はこちら。](https://github.com/twitter/zipkin/raw/master/doc/architecture-1.png)図のSと書かれた青い箱）</b>
```

　・各ホストの計測用ライブラリがトレースデータを集めてZipkinに送信する。
　・ホストは他のサービスへリクエストを飛ばすときに、リクエストにトレース用のIDを付与してます
　　こうすることで、データをあとで、束ねることが可能となります。

```

<b>◯計測ライブラリの利用方法</b>
<b>　・[Finagle](https://github.com/twitter/finagle)</b>
```

　　JVMのための非同期ネットワークスタックである。
　　それは、JVMベース言語（JavaやScalaなど）で非同期RPCのクライアント・サーバを構築するのに利用できる。
　
　FinagleはTwitterの内部ですごく利用されていて、トレースサポートを実現するのに当然のポイントです。
　現時点で（Finagleは）ThriftやHTTP、Memcache、Redisのクライアント・サーバサポートも持っています。

　ScalaでFinagleサーバをセットアップするのはつぎのようなコードになります。```
　トレースを追加するには、[finagle-zipkin](https://github.com/twitter/finagle/tree/master/finagle-zipkin)を追加して、ServerBuilderのtraceFactory関数を呼ぶだけです。

```

ServerBuilder()
  .codec(ThriftServerFramedCodec())
  .bindTo(serverAddr)
  .name("servicename")
  .tracerFactory(ZipkinTracer())
  .build(new SomeService.FinagledService(queryService, new TBinaryProtocol.Factory()))
```
```

　クライアント側も同様です。
　上記のようにサンプリングしたリクエストにZipkinトレーサーを指定することで
　自動的にトレースできるようになります。
　サービスやホストでのリクエストの開始と終了を記録できます。

　さらに付加的な情報を記録したい場合は、つぎのようなコードを追加します。
```
```

Trace.record("starting that extremely expensive computation")
```
```


　上記コードは、上記コードが実行された時間に文字列を付加できます。
　キーバリュー情報を付加したい場合は次のようになります。
```
```

Trace.recordBinary("http.response.code", "500")
```

<b>　Ruby Thrift</b>
```

　リクエストのトレースに利用できるgemもあります。
　リクエストに対してトレースIDを生成し、リクエストに付与し、トレーサーにプッシュするのにRackHandlerのgemを利用できます。
```
　トレーサをトレースするサンプルは[zipkin-web](https://github.com/twitter/zipkin/blob/master/zipkin-web/config/application.rb)を参照。

　Rubyからトレースクライアントをコールするのに、[Twitter Ruby Thrift client](https://github.com/twitter/thrift_client)を使います。
　つぎのようなコードを書きます。
```

client = ThriftClient.new(SomeService::Client, '127.0.0.1:1234')
client_id = FinagleThrift::ClientId.new(:name => "service_example.sample_environment")
FinagleThrift.enable_tracing!(client, client_id), "service_name")
```

<b>　[Querulous](https://github.com/twitter/querulous?PHPSESSID=2fb5ece17b7c5b72b57b7aed4a21ae1f)</b>
```

　QuerulousはScala用のSQLデータベースのインタフェースライブラリです。
　SQLクエリの実行のタイミング情報をトレースに追加できます。
```

<b>　[Cassie](https://github.com/twitter/cassie?PHPSESSID=2fb5ece17b7c5b72b57b7aed4a21ae1f)</b>
```

　CassieはFinagleベースのCassandraクライアントライブラリです。
　CassieのトレーサーはFinagleの例とほぼ一緒ですが、
　CassieではKeyspaceBuilderに設定します。
```
```

cluster.keyspace(keyspace).tracerFactory(ZipkinTracer())
```

とりあえず、ここまで。___
<span style="color:#FF0000">2012/06/22 リンクを貼って体裁を修正
