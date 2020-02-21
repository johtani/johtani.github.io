---
layout: post
title: "Fluentd Meetup Japanに参加しました。(Jugemより移植)"
slug: fluentd-meetup-japanに参加しました。
author: johtani
date: 2012-02-05T00:03:00+09:00
comments: true
tags: [勉強会]
---
[Fluentd meetup in Japan](http://www.zusaar.com/event/193104)に参加しました。いつも面白そうな話を聞いてばっかりなので、役に立つためにスタッフとしても参加してみました。
まずは、会場が綺麗でびっくりしました。しかも電源タップまで用意されていてかなり充実してました。Ustはまだ見ていないのですが、Ustも録画までされていて素晴らしい運営メンバーでした。

開発者の古橋さんほか、Treasure Data Inc.の方たち（太田さんはいなかった）が集まり、
Fluentdの仕組みから、プラグイン開発の方法、実際にプラグイン開発してしかも本番で利用してる実例まで
「パーフェクトFluentd」という本ががそのまま書けてしまうのではというくらい密度の濃い話が聞けました。
私個人は、いつものごとく興味を持ってるんだけど、仕事、私用では触っていないという腰抜けなので話についていくのが大変でしたが。。。
各セッションごとに、しっかりとしたQA時間が取られていて、質問者も質が高く、中の人や発表者の方も誠実に回答されている感じがすごく良かったです。
（残念ながらLTの時は懇親会の準備を手伝っていたので聞けてないです）
基本はログの中継サーバとして利用するという話でした。
個人的には性能系のデータやログ（遅いクエリのログに関するプラグインの話などもあった）をストレージに保存して、時間を軸にログとグラフを表示するとかいう仕組みに使うと面白いかもなぁと感じました。
今回はFluentdがメインなので、ログを集める部分の話が主だったところでしたが、懇親会直前の@doryokujinさんのスライドでも上がっていた集計後のビジュアライゼーションに関する部分のはなしも聞いてみたいなぁと思ってるところです。

あとは、いくつか知りたかったことが。
Treasure Data Serviceというサービスをやってるみたいで、SQLライクな問い合わせやビジュアライゼーションされた画面があるみたいな話があがっていたんですが、画面が見てみたかったです。
また、@just_do_neetさんの構想図のその後を聞いてみたいですねぇ。

それにしても実例も構成から性能値まで上がっていたので、実際に利用する場合に参考になる資料だらけで普及にはずみがつきそうです。
Ust録画が上がっているようなので復習したいと思います。
（あ、内容とは関係ないけど、Ust録画にハッシュタグつきのツイートを時間軸で重ねて表示するサービスとか機能ってないのかな？）


ということで、以下はいつものメモ書きです。
___

2012/02/04 12:30  ～  19:00

フューチャーアーキテクト セミナールーム 

参考URL：[http://fluentd.org](http://fluentd.org)


◎13:00～14:00     「What's Fluentd? - The missing log collector」
[http://www.slideshare.net/treasure-data/fluentd-meetup-in-japan-11410514](http://www.slideshare.net/treasure-data/fluentd-meetup-in-japan-11410514)
　Treasure Data, Inc.　古橋 貞之 (@frsyuki)
```

　まずは、Fluentdの概要。syslogdみたいなもの
　Fileのtailで流すことが基本。
　Clientライブラリから流すことも可能。
　他との比較
　　ScribeとFluentd
　　　構造化されたデータを扱う
　　　gemとかapt-get，yumでインストールあg可能
　　　Rubyで書かれてるからカスタマイズもプラグインの追加も簡単。
　　FluentdとFlume
　　　FlumeはZKやマスタノードが必要＝セットアップが面倒
　　　JVMだから面倒、設定も簡単。
　Fluentdのアーキテクチャ
　　Bufferプラグイン：スレッドセーフ、バッファ処理など
　　Outputプラグイン：出力だけ
　　out_forwardプラグイン：Cassandraと同じアルゴリズムでHeartBeatしてる
　　out_copyプラグイン：同じ出力を別の出力先にコピー
　　bof_fileプラグイン：バッファ先をファイルにする。Fluentdがこけても大丈夫
　　out_exec_filterプラグイン：外部プログラムからの入出力を使える
　　in_tailプラグイン：ログのパーサーが内蔵されてるみたい。
　開発者用API
　　Unitテストフレームワーク（MRUnitに似てる）
　　TailInput（パーサカスタマイズも簡単）
　ドキュメントとか
　　http://fluentd.org
　　にあります。
　会社紹介！
　　Treasure Data Service
　　Fluentdでは出力先がいろいろできるけど、自分で解析しないといけない
　　！ここで、Treasure Data Service（クラウド）に保存すると。。。
　　データのVisualizationとかがリアルタイムで出来る。


　QA：
　　Q：ログ転送にUDP使ってますか？
　　A：TCPです。UDPはハートビートに利用してます。
　　Q：文字コードはどういう扱い？
　　A：バイナリ形式であつかってます。
　　　　文字列で扱う場合はプラグインで対応しましょう。
　　Q：性能大丈夫？
　　A：Twitterで議論があがって、いろいろ対応しました。
　　Q：TreasureDataServiceはクラウド対応だけなの？
　　A：データはクラウド上で管理してるので上げても大丈夫なものだけが現在は対応。暗号化などは行なっている。
　　Q：TreasureDataServiceはどこで動いてる？
　　A：AWS上（S3にデータ保存）
　　Q：解析プラットフォームを提供している？SQLだけ？
　　A：HiveのSQLで解析可能。Visualizationのツールもある。
　　Q：コンサルタントもあるの？ログ出力系とか。
　　A：あとから解析できるように。
　　Q：in_tailでログローテート（iノードが変わって）も大丈夫？　　A：大丈夫。動かなかったら連絡ください。
　　Q：ファイルバッファリングされるデータの順序は保証される？
　　A：キュー形式なので、保証される。けど、S3とかだと出力先が遅いので、
　　　　パラレルモードで対応が可能。だけど、パラレルだと順序は保証されない。
　　Q：実際のシステムが投げるときにFluentd側で認証とかできる？
　　A：認証はないです。推奨は同一アプリサーバでFluentdを起動。
　　Q：Fluentd間のデータ通信のセキュリティ対応は？
　　A：今はない。プラグインとか作ればOK。
　　Q：中間層のFluentdを置くのは推奨？なしで直接ストレージ保存も可能？
　　A：柔軟な対応（送信先、バッファリングとか）が可能にできるように中間層を置くほうがいい。直接出すことも可能。
　　Q：TDAgentでのセットアップが推奨？gemは？
　　A：gemはOSS版でtrunkに近い。TDAgentはテストとかしっかりやってる。
　　　　バージョンの対応表はリリースノート見ないとわからない。
　　Q：Flumeのほうが優れているのは？
　　A：設定ファイルが一元管理ができる。大規模はFlumeのほうがいいかも
　　　　ただし、includeでHTTPサーバ経由で設定ファイルを取得可能な機能あり。
　　Q：バッファサイズは指定可能？
　　A：可能。
　　Q：ストレージがずっと停止している場合にログがあふれるのを防ぎたい場合の対処法は？
　　A：セカンダリという機能がある。（ただし、対応できてないプラグインもある）
　　Q：フェイルオーバーでローカルファイル出力とかはできる？
　　A：out_forwardは対応してる？
　　Q：Fluentdからのbuf_fileに出力してる部分で遅延、書き込み不可が発生したら？
　　A：入力と出力がスレッドで分かれてる。
　　　　入力スレッドでのエラーはinput_plugin側にException上がる
```
◎14:15～15:00     「Dive into Fluent Plugin」
　[http://www.slideshare.net/repeatedly/fluentd-meetup-dive-into-fluent-plugin](http://www.slideshare.net/repeatedly/fluentd-meetup-dive-into-fluent-plugin)
　Preferred Infrastructure, Inc.　Masahiro Nakagawa (@repeatedly)```

　好きなプラグインとか言いましょう（発表者さん）
　MongoDBのプラグインをベースにプラグイン開発の説明
　http://bit.ly/fluentd-with-mongo
　プラグイン名はfluent-plugin-xxxで統一されてます。
　fluent-plugin-mongoがダウンロード数が1位に！
　（scribeのプラグインがデイリーでテストが走ってダウンロード数が増えるという卑怯なカウント稼ぎしてたらしいｗ）
　
　fluentd.confの説明
　fluentdの起動は以下のとおり。開発中は-vつけるといいよ
　　fluentd -c fluentd.conf
　プラグインをどう作る？
　Fluentdの構成図による説明
　　Cool.io、MessagePack、Rubyなど。
　それぞれの説明を簡単に。
　Cool.ioがファイル監視とかをやってくれるみたい。
　プラグイン開発に関する詳細な説明
　　テスト、gem構成などを書いてくれてる。
　QA：
　　Q：複数行のログを扱うのはどこを作ればいい？tailプラグインの正規表現だとうまく行かなかった。
　　A：tailをoverrideしてparserLineを実装する。複数行のparserは難しいけどね
　　Q：ログのアグリゲーションをやってみたいのだが、どう？CPU利用率とかを1分間バッファしてからアグリゲーションして平均出すとか。
　　A；fluent-plugin-aggregateってのがあって、forward-pluginを書き換えて作ってる。
　　　　TimeSlicedOutputでやると時間の期間指定とかが可能。
　　管理画面つくろうと思ってるので手伝ってください！@repeatedly
　　Q：fluentd自体が処理した統計データの出力とかある？
　　A：古橋さんが頑張ります！協力して！=>@tagomoris先生が書いてる！
```

◎15:15～16:00     「fluent を使った大規模ウェブサービスのロギング」
　<a href="
http://www.slideshare.net/hotchpotch/20120204fluent-logging">http://www.slideshare.net/hotchpotch/20120204fluent-logging</a>
　COOKPAD, Inc.　舘野 祐一 (id:secondlife, @hotchpotch)
```

　COOKPADでの基盤全般を見てる部署の人　PVログ＋MySQL
　　1日分はオンメモリにのるから高速。けど、1週間前とかになると遅くなる
　blackholeエンジン（MySQLの一部？）だと速い（ときどきおそくなる）
　データ保存でも問題
　　直近データしか保存できない。大きすぎて。
　　今後スケールしないときつくなる（1日分もメモリに載らなくなる可能性も出てくる）
　他のログはMySQLへJSONでシリアライズして出力とかもしてた。
　　アプリでDBにログ出力はinsertのコストが厳しい。PVとかなら、1リクエスト＝1insertだけど、1リクエストで多数ログ出力とかが厳しい。
　そこにFluentd登場！！！
　　出力先が色々使える。（MySQL以外もOK）
　パフォーマンス
　　バッファリング＋転送をやってくれるし、非同期で処理可能なのでレスポンスタイムへの影響が最小限にできてる。
　安定性
　　プラグインはちょっと注意が必要。
　　バッファリングしてくれてるので、一時的に停止もできるのがうれしい。
　　6時間止めてもOKだったよ（テヘッｗ）
　今後
　　PV系のログをMySQLから移行検討中
　具体例！！
　　td-agentをrpmで入れてるし、Rubyまで入ってくれる。
　　構成管理はpuppetを利用してる。
　　td-agentの設定の注意点
　　　「retry_limit 9」に変更してる。標準だと17なんだけど、2の16乗＝大体1日かかる。9だと大体10分くらい
　　中央転送用サーバ
　　　gitで設定ファイル管理してる。
　　　　よく変更するため。　　　gemfileで各種fluentd/pluginを利用してる。
　　　　自分たちで手を入れたソースを利用できるようにもしたいため。
　　テスト時にテストが書けるのが嬉しい（Rubyで出来てるアプリからもいじりやすいし、アプリのテストでも簡単に使える）
　　ロガーへの実装追加もできる。
　　Tips
　　　バッファからすぐ処理させたい場合とかの説明
　こんなのあったら嬉しいな。
　　設定ファイルの柔軟な設定記述方式
　　DSLにならないかなぁ（けど、やり過ぎも厳しいし。。。）
　ログの重要性
　　統計を考えられるエンジニアが重要。
　　どのデータにどんな価値があってそれを仕事（お金）に結び付けられるか？
　QA：
　　Q：障害対応のノウハウとか？
　　A：nagios、muninでサーバとか監視してる。
　　　　アラートチェックもしてる。
　　　　Fluentdの安定性は2ヶ月実際に導入してみて特に問題は出てない。
　　Q：MongoDBの構成は？
　　A：master/slave構成。PVログはS3に保存してEMRで処理。
　　Q：パフォーマンスの測定は？
　　A：40Mbit/sが処理できてたのは見てる。あとは、後ろの発表ですごいのがある！
　　Q：設定ミスの防止とかをどうやった？
　　A：今回はpuppetの設定後のリロードをチェックするような仕組みを入れた。
　　　　本来なら、データが流れてるかどうかのチェックを入れるプラグインを書いて欲しいｗ
　　Q：データマイニングエンジニアの定義は？
　　A：データの価値を見いだせるエンジニア。あとは、きちんと統計学を学んできてるエンジニア。両方募集中！！
　　Q：DynamoDBは検討は？
　　A：西海岸でしか動かないのでデータ転送の時間がかかってしまった＋RESTで１件ずつ登録なので今回は見送った。スキーマレスなのでうまく使えそう。
　　A２（古橋さん）：バルクインポートがないので使いにくい。
　　Q：ログ出力の形式をFluentdにあわせて変更したとかありますか？
　　A：もともとアプリで出力してたから特に変更なかった。
```


◎16:15～17:00　「fluentをサービスで使ってみた」
　[http://www.slideshare.net/naverjapan/20120204fluent-public](http://www.slideshare.net/naverjapan/20120204fluent-public)
　NHN Japan株式会社　Tetsuya Ohira (@just_do_neet)```

　自己紹介が面白かったｗ
　実例の話。
　事例１：
　　社内向けのログ解析に利用　
　　Fluentd＋Hadoop
　　データノードにFluentdで出力して、データノードからHDFSに書き込んでる。
　事例２：
　　NAVERまとめのまとめ作成者へのデータ解析
　　Fluentd＋Hadopo＋Azkaban
　　Azkaban（個人的にはオススメできないｗ）
　　flutendの負荷は全然上がってない。
　監視
　　tcp portの監視
　　転送されたデータサイズのチェック。HDFS側のデータ量でチェックしてる。
　　なぜか半死半生の状態になった（よくわからない。）
　プラグインを自分で直せるので対応が楽。（Ruby力は必要だけど。）
　demo
　　準リアルタイム解析基盤の構成案（おもろそう）
　　　fluentd、MongoDB、Hadoop、Jubatus、node.js
　　地図にアクセス解析結果をのっけて見せる。（maptail.js？）
　提案or相談：
　　動的に設定ファイルの内容を変更できるようにしたい
　　　log rotateのタイミングでshell実行でfluentd再起動
　　必要な情報だけrelayしたい
　　　フィルタープラグインみたいなものが書きたい。
　　fluentd自体のメトリクスを出して欲しい
　　jubatusプラグインはー？
　QA：　　Q：log rotateへの対応はどーしてる？
　　A：今はログローテートのタイミングでfluentd再起動してる
　　Q：Apps側のFluentdがコケたときにaccess_logをcopyしてるらしいけど、重複しないの？
　　A：失敗した対象のログをストレージから一旦廃棄して、再送してる。
　　Q：Rubyがそこまで得意じゃないのにFluentdを選んだ理由は？
　　A：他のモノが使いにくかった＋既存システムに手を入れなくて済む＋タイムリーだったという理由。
　　Q：構成案のデータの流れは？
　　A：MongoDB、Hadoopへは同一ログを流して、リアルタイムが重要な場合はMongoDB、大量データ回すのはHadoop？
```


◎17:15～18:00     「Distributed message stream processing on fluentd」
　[http://www.slideshare.net/tagomoris/distributed-stream-processing-on-fluentd-fluentd](http://www.slideshare.net/tagomoris/distributed-stream-processing-on-fluentd-fluentd)
　NHN Japan株式会社 ウェブサービス本部　Tagomori Satoshi (@tagomoris)
```

　sed | grep | wc がメイン。
　Hiveで集計してます。
　なんでFluentd？（not Storm、Kafka or Flume?）
　　Rubyが好き（ライブドアはJavaが入ってない環境もあるし）
　　プラグインやTimeSlicedOutputがあるのも採用理由
　ログ収集の構成図
　　ブログに別の勉強会の資料があるので見てください。
　まだ１０日間しか動いてないので実績は少ない？
　　127サーバからのログを流してる。
　　7万行/sec、ピーク120Mbpsが流れてる。
　　89 fluentd インスタンスが12ノード（4コアHT）で動いてる。
　1行のログを1行のタブ区切りで出力する（Hiveでインポートしやすいから）
　Apacheのログに幾つか追加したデータなどが出力されてて、それをタブ区切りにするため設定一発では変換できない。
　TimeSlicedOutputが重要
　　時刻単位でログ出力できないとキツイ（ログの流量が半端ないから）
　　ログローテートでは時刻単位できちんと出力されてない。
　ログから解析までの流れ図
　　以前は生ログをHadoopに書き出してたので25分くらいのタイムラグが出てしまっていた。（ノード数が少ないという理由もあるけど、お金的に増やしたくない）＋Hadoopで他のジョブが実行されてるとさらに遅くなる。。。
　　fluentd でログを流しながらコンバートもかけられ、Hadoopでのデータコンバートの処理遅延が少なくなってハッピーに！
　ストリーミング処理の重要な点
　　バッチでもストリーミング処理でも同じことが可能。（out_exec_filterとHadoop Streaming）
　　SPOFがないこと
　トポロジ、Fluentdの構成　　
　　ログエージェント（scribeline：お手製）
　　　pythonで書かれたscribelineというものを利用してる。
　　　フェイルオーバーの処理（primary、secondary構成）が可能
　　　fluentdは入れてない。（ログを拾い上げて流すだけには重い）
　　workerノード
　　serializerノードが必要なのは出力先の競合を減らす必要があるため。

　　　出力先が大量のアクセスに向いてない場合があるから。
　　　あと、ログの流れを元に監視したい項目にもここで対応可能。
　　watcherノード
　　　deliver、serializerからのデータを見ながら監視、統計処理を行える。
　設定は自動生成してる。800行くらいになっちゃうから。
　　workerへの分散具合をよしなにしたいから。
　 remove_prefix 、add_prefixでデータの流れ先の交通整理してるのか。 
　GrowthForecastでグラフを出力してる。
　　https://github.com/kazeburo/GrowthForecast
　

　QA
　　Q：大規模環境での移行はどうやったの？
　　A：もともと流すような仕組みはあって、流し先を変えたので
　　　　それほど大変ではなかった。ただ、アプリ側で動いてた部分に手を入れたときは配備が大変だった。
　　Q：workerが1サーバ8の理由は？
　　A：4コアHT＝8というので8としている。
　　Q：deliverのカーネルパラメータをいじってたりしない？
　　A：ライブドア標準の設定がされてる。CentOSのデフォルトでもそれほどきびしくないかな？
　　Q：deliverノードでラウンドロビン＋out_forwardになってる理由は？out_forwardだけじゃだめ？
　　A：バッファのタイミングでの切り替えだと溢れてしまうので、最大でも1秒でラウンドロビンしてworkerを切り替える必要がある。
```

※懇親会設営の手伝いのためあんまり聞けず。
◎18:15～19:00(Plugin紹介LT)(各10分)　@shun0102: 「fluent-plugin-dstatを使ったリアルタイムクラスタモニタリング」
　[http://www.slideshare.net/shun0102/fluent-plugindstat](http://www.slideshare.net/shun0102/fluent-plugindstat)
```

```
　@ixixi: 「fluent-plugin-couch」
　[http://www.slideshare.net/ixixi/fluent-plugins-for-couchdbamazon-sqssns](http://www.slideshare.net/ixixi/fluent-plugins-for-couchdbamazon-sqssns)```

```
　@chobi_e: 「Fluentd & PHP」
　<a href="http://www.slideshare.net/shuheitanuma/fluentd-and-php">
http://www.slideshare.net/shuheitanuma/fluentd-and-php</a>
```

```
　@railute:「Fluent Output Plugin for Cassandra」
　[https://skydrive.live.com/view.aspx?cid=D105615A0F594518&resid=D105615A0F594518%21333](https://skydrive.live.com/view.aspx?cid=D105615A0F594518&resid=D105615A0F594518%21333)



