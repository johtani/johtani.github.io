---
layout: post
title: "ZipkinのReadme読んでる（その２、残り）(Jugemより移植)"
slug: zipkinのreadme読んでる（その２、残り）
author: johtani
date: 2012-06-16T00:02:00+09:00
comments: true
tags: [Zipkin]
---
「鉄は熱いうちに打て」ということで、残りも勢いでメモ。
まだ、見直しとかしてない状態なのでおかしいところとかありますが。。。
図とか入れるのはまた今度。


<b>　Transport（転送）</b>
```

　ZipkinとHadoopに異なるサービスからのトレースを送信するのにScribeを利用します。
　ScribeはFacebookにより開発されました。
　システムの各サーバで実行できるデーモンとして作成されています。
　ログメッセージをListenし、カテゴリごとのcorrectレシーバーに配送します。

```
<b>　Zipkin collector daemon</b>
```

　トレースデータがZipkinコレクターデーモンに配送されたらvalidかどうかをチェックしてから保管し、インデックスを作成します。

```
<b>　Storage</b>
```

　ストレージにはCassandraを選びました。
　スケーラブルで、柔軟なスキーマをもっており、Twitter内部で大変使われています。
　このコンポーネントをプラガブルにしようと試みましたが、困難なため、ここでは公開しません。

```
<b>　Zipkin query daemon</b>
```

　保存、インデックスされたデータを探す方法が必要です。
```
　クエリーデーモンはユーザに対して簡単なThriftAPIを公開しており、トレースを探すことが可能です。[Thrift file](https://github.com/twitter/zipkin/blob/master/zipkin-thrift/src/main/thrift/zipkinQuery.thrift)を見て下さい。

<b>　UI</b>
```

　多くのユーザはUI経由でデータにアクセスします。
```
　Visualizeに[D3](http://d3js.org/)を利用したRailsアプリケーションです。
　UIの認証は実装していないことに注意してください。

<b>モジュール</b>
　[Zipkin内部のモジュール関連図](https://github.com/twitter/zipkin/raw/master/doc/modules.png)


##インストール___
<b>　[Cassandra](http://cassandra.apache.org/)</b>
```

　ZipkinはCassandraをストレージにしています。Cassandraクラスタが必要になります。
　1. Cassandraサイトを参考にしてクラスタを構築してください。
　2. Zipkin Cassandraスキーマを利用します。つぎのコマンドでスキーマが作成できます。
```
```

bin/cassandra-cli -host localhost -port 9160 -f zipkin-server/src/schema/cassandra-schema.txt
```

<b>　[Zookeeper](http://zookeeper.apache.org/)</b>
```

　Zipkinは協調のためにZooKeeperを利用します。
　これは、保存すべきサーバをサンプルレートで決定し、サーバを登録します。？
　1. ZooKeeperのサイトを参考にインストールしてください。
```

<b>　[Scribe](https://github.com/facebook/scribe)</b>
```

　Scribeはトレースデータを配送するのに利用するロギングフレームワークです。
　ネットワーク保存先としてZipkinコレクターデーモンを指定する必要があります。

　Scribeの設定は次のようにします。
```
```

&lt;store&gt;
  category=zipkin
  type=network
  remote_host=zk://zookeeper-hostname:2181/scribe/zipkin
  remote_port=9410
  use_conn_pool=yes
  default_max_msg_before_reconnect=50000
  allowable_delta_before_reconnect=12500
  must_succeed=no
&lt;/store&gt;
```
```

　注意：上記設定は、カテゴリーにより送信ホストを見つけるためにZooKeeperを利用するサポートのScribeのTwitterバージョンを使用する方法です。
　コレクターのためのDNSエントリーを利用したりもできます。
```

<b>　Zipkinサーバ</b>
　Zipkinサーバは[Scala 2.9.1](http://www.scala-lang.org/downloads)、[SBT 0.11.2](http://www.scala-sbt.org/download.html)そしてJDK6で開発しました。
<div style=" margin-left: 2em;">```

 1. git clone https://github.com/twitter/zipkin.git
 2. cd zipkin
 3. cp zipkin-scribe/config/collector-dev.scala zipkin-scribe/config/collector-prod.scala
 4. cp zipkin-server/config/query-dev.scala zipkin-server/config/query-prod.scala
 5. Modify the configs above as needed. Pay particular attention to ZooKeeper and Cassandra server entries.
 6. bin/sbt update package-dist (This downloads SBT 0.11.2 if it doesn't already exist)
 7. scp dist/zipkin*.zip [server]
 8. ssh [server]
 9. unzip zipkin*.zip
10. mkdir -p /var/log/zipkin
11. zipkin-scribe/scripts/collector.sh -f zipkin-scribe/config/collector-prod.scala
12. zipkin-server/scripts/query.sh -f zipkin-server/config/query-prod.scala
```</div>
```

　SBTでコレクターとクエリサービスを起動します。
　Scribeコレクターサービスの起動方法は次の通り。
```
```

bin/sbt 'project zipkin-scribe' 'run -f zipkin-scribe/config/collector-dev.scala'
```
```

　クエリサービスは次の通り
```
```

bin/sbt 'project zipkin-server' 'run -f zipkin-server/config/query-dev.scala'
```

<b>　Zipkin UI</b>
```

　UIはRails3アプリです。
　1. 設定をZooKeeperサーバでアップデートします。これはクエリデーモンを見つけるのに利用します。
　2. Rails3アプリケーションサーバにデプロイします。テストの場合は次のようにすることもできます。
```
```

bundle install &amp;&amp; bundle exec rails server.
```

<b>　zipkin-tracer gem</b>
```

　zipkin-tracer gemをトレースしたいRailsアプリケーションにRack Handlerで追加します。
　config.ruにつぎの記載をします。
```
```

  use ZipkinTracer::RackHandler
  run <YOUR_APPLICATION>
```
```

　もし、アプリケーションのstatic assetsがRailsで提供されれば、リクエストがトレースされます。

```
##　Running a Hadoop job<hr>
```

　ScribeからHadoopにログを保存する設定をすることも可能です。
　これをすると、Zipkin自身でオンザフライで簡単に作れないデータから様々なレポートが作成可能です。
```

　ScalaでHadoopのジョブをかける[Scalding](https://github.com/twitter/scalding)というライブラリを利用します。
<div style=" margin-left: 2em;">```

　1. Hadoopジョブを実行するためのfatなjarを作成します。
　2. scald.rbをjarをコピーしたいホスト名とjobを実行するホスト名に書き換えます。
　3. 必要なら、scald.rbのjarファイルのバージョンを更新します。
　4. scald.rbスクリプトを利用してジョブを実行できます。
```</div>
```

./scald.rb --hdfs com.twitter.zipkin.hadoop.[classname] --date yyyy-mm-ddThh:mm yyyy-mm-ddThh:mm --output [dir]
```

##計測ライブラリの利用方法<hr>
```

　計測のためのライブラリとプロトコルがちょっとだけあります。
　しかし、もっと計測するための役に立つものを望んでいます。
　開始する前にトレースデータがどんな構造なのかを知る必要があります。

　　・Annotation - 値、タイムスタンプ、ホストを含みます。
　　・Span - 特定のRPCに相当するAnnotationの集合
　　・Trace - あるルートSpanにぶら下がるSpanの集合

　Zipkinに送信するトレースデータです。
```
　これらの詳細な記述は[こちら](https://github.com/twitter/zipkin/blob/master/zipkin-thrift/src/main/thrift/zipkinCore.thrift)を見て下さい。
```


　その他にトレースデータの重要なものは、トレースされたサービス間でやり取りされる情報である、軽量なヘッダーです。
　トレースヘッダは次のものから構成されます。

　・Trace Id - トレース全体のID
　・Span Id - 個々のリクエストのID
　・Optional Parent Span Id - このリクエストが他のリクエストの一部として生成されたら付与される
　・Sampled boolean - トレースすべきかどうかを表すフラグ

　データタイプについて、理解したので、どのように計測が行われるかを順をおってみてみましょう
　例はFinagleのHTTPがどのようにトレースされるかを示しています。
　他のライブラリやプロトコルはもちろん、異なりますが、基本的な部分は一緒です。
```
<b>　サーバサイド</b>
　1. 到達したリクエストのトレースヘッダー存在するかどうかを調べます。存在すれば、なら、このリクエストに対して関連するIDとします。トレースヘッダーがなければ、サンプリング対象かどうかを決めて、新しいTrace Id、Span Idを生成します。参考には[HttpSererTracingFilter](https://github.com/twitter/finagle/blob/master/finagle-http/src/main/scala/com/twitter/finagle/http/Codec.scala)を見て下さい。

　2. もし、現在のリクエストがサンプリングされる場合、サービス名、ホスト名、スパン名（例えば、http get/put）、その他のAnnotationのような情報を集めます。
　　リクエスト受信時には「server received」というAnnotationを生成し、処理が終了して結果を返すときに「server send」というAnnotationを生成します。
　　参考には[HttpServerTracingFilter](https://github.com/twitter/finagle/blob/master/finagle-http/src/main/scala/com/twitter/finagle/http/Codec.scala)を見てください。

　3. 生成されたトレースデータはServerBuilderにより設定されたトレーサーに渡されます。
　　デバッグのためのConsoleTracerが例としてありますが、ZipkinTracerになります。
　　トレースデータを[ZipkinTracer](https://github.com/twitter/finagle/tree/master/finagle-zipkin)が受け取った時、Span Idにより集約されます。

　4. ZipkinTracerが"end of span"イベント（"server received"アノテーションやタイムアウトのような）を受け取ると、Thrift構造としてデータを集約してScribeに送ります。もし、そのようなイベントが発生しない場合、ZipkinTracerはいつかそのデータを送信します？？？おかしい？。データ送信のための他の方法も追加します。
　ThriftやScribeのようなものですが、JSONやHttpかもしれません？

<b>　クライアントサイド</b>
　1. リクエストを送る前にそれがトレースの一部かどうかをチェックします。
　　サーバで利用されているとします。　
　　サーバは、リクエストを処理してすでに付与されているトレースIDを割り当てます。
　　トレースIDを再利用しますが、この新しいリクエストには新しいスパンIDを生成します。
　　また、親のスパンIDが存在すれば、前のスパンIDに設定します。
　　[ここ(TracingFilter)](https://github.com/twitter/finagle/blob/master/finagle-core/src/main/scala/com/twitter/finagle/tracing/TracingFilter.scala)や[ここ(Trace)](https://github.com/twitter/finagle/blob/master/finagle-core/src/main/scala/com/twitter/finagle/tracing/Trace.scala)が参考になります。

　2. サーバサイドと同様に、送信されるHttpリクエストにトレースヘッダーを追加するための[HttpClientTracingFilter](https://github.com/twitter/finagle/blob/master/finagle-http/src/main/scala/com/twitter/finagle/http/Codec.scala)があります。

　3. リクエスト送信前の「client send」やサーバからの返信を受信した「client receive」のようなアノテーションを生成します。

　4. サーバサイドと同様に、データがZipkinにデータを送るZipkinTracerに到達します。

