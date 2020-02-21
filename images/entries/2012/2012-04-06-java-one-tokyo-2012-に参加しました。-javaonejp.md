---
layout: post
title: "Java One Tokyo 2012 に参加しました。#JavaOneJp(Jugemより移植)"
slug: java-one-tokyo-2012-に参加しました。-javaonejp
author: johtani
date: 2012-04-06T16:51:00+09:00
comments: true
tags: [勉強会]
---
JavaOne Tokyo 2012に参加してきました。
4/4-4/5の2日間開催されていたのですが、子供が体調を崩してしまい、4/5のみの参加となりました。
4/4はTwitterのTLを眺めて、羨ましがってました。

7年ぶりに日本で開催されたJavaOneみたいです。
そういえば、7年前くらいに参加した記憶があるなぁと。

会場入りして最初の感想は年齢層が高いなぁと。
最近、勉強会によく顔を出すようになったのですが、勉強会とは年齢層が少し異なりました。
まぁ、私も年齢層を上げている一人ではあるのですが。。。
Javaも熟成してきてるなぁというのが最初の感想でした。
あと、思ったよりもスーツ率は低かったと思いました。（5割はいましたが）
一番違和感を感じたのは、会場の所々の色が「赤い」ことです。。。

以下は私が参加したセッションのカンタンな感想です。


**Java EE6 Modeling　JS2-01　#jt12_s201**
___

JavaEEから離れてはや数年。私が関わっていた頃はEJB2.0が出たくらいのタイミングだったので、
色々と変わってきているなぁというのが第一印象です。
CDI、Singleton EJBなど、知らない単語もちらほらと。
earではなく、warファイル1つで済む、jQueryをリソースjarとしてパッケージングしてwarファイルに入れられるなどは簡易になっていいなぁと。
web.xmlがアノテーションで記述できて要らなくなるという話は一長一短だと思いました。
一覧性があるからいいと思うこともあるので。
中国の方？の英語だったので少し特徴的でした。すこしは頑張ってみたものの、やはり同時通訳を聞いてしまって反省しています。。。


**マルチコアCPU時代のJavaプログラミング　JS2-14　#jt12_s214**
___

F社の方が実際に経験されてきた性能関連のプログラミングについての話でした。
現時点のJavaでマルチコアCPUで気をつけるべきプログラミングの観点をわかりやすく説明されたいいセッションでした。
詳細は下のメモを見ていただけるといいですが、色々とプログラミングで気をつけるべき点を説明されていました。
いいおさらいになりましたし、忘れていることや知らないこともあって勉強になりました。
TLでも見かけましたが、モダンJavaプログラミングみたいな、今のJavaでのプログラミングの気をつけるべき点を書いた書籍があるといいかもなぁと思いました。
あと、もうひとつ私が好印象だと思ったのは、F社の製品の紹介などがなかったからかもしれませんｗ



**サービス維持・発展を踏まえた楽天オークションのJava EEによる開発と運用　JS2-23　　#jt12_s223**
___

楽天オークションの開発をサれている方の立ち上げから現在に至るまでの開発メンバーの管理の仕方や
実際に利用している開発手法、気をつけている点のお話です。
スライドに書いてあること以外のことを発表者の方が話をされており、もう少し、喋る内容に関連した図などを入れてもらえるとわかりやすかったかもしれません。
あとは、WebLogicの管理画面が使いやすくていいという話のあとに、GlassFishに移行していますという話があったりと、少し「？」が浮かぶ部分がありました。。。

**JSR 353: Java API for JSON Processing　JS2-33　#jt12_s233**
___

最近、Twitterで遊んでもらっている（勝手に絡んでいるだけという話も。。。）@yusukeyさんの発表です。
結構な数の立ち見が出るほどの盛況ぶりで、発表者の@yusukeyさんもびっくりしていました。
JSRがどういった形で実際の仕様として公開されていくのかという話がわかりやすく紹介されていて勉強になりました。
所々で笑いが入るなど、さすがの安定感でした。立ち見が出るはずです。
ようやく、JavaもJSONに関する処理を仕様として取り入れようとしているのはいい傾向かと。
※残念ながら資料は公開されないようです。

**UI Controls and Charts: Drag-and-Drop, Filtering, Sorting, Table Hookup with Charts　JS2-42　#jt12_s242**
___

最近、Chartに興味を持っていたので、登録したセッションです。
内容としてはJavaFXのコンポーネントをリストアップして紹介していくというお話でした。
グラフ（Chart）周りも数種類が用意されるようです。
JavaFXをあまり知らないのですが、Swingをすこしやっていたのでなんとかついていくことが出来ました。
発表者の方が、実際にJavaFX内部の実装を行われている方だったようで、QAでいくつかこんなコンポーネントはないのか？という質問に、「私のPCでは動いているのですが、ドキュメントなどの整備が追いついていないので公開できていないです」という回答が出て、なかなか大変なのだなぁとｗ
Chartに関しては、グラフの重ね合わせなどがまだできないということで、JFreeChartを触ったことがある身としてはすこし物足りなさそうだなぁというのが印象です。

**Learn how the JVM is fundamental to our architecture.　BoF2-03  #jt12_b203**
___

今回JavaOneに参加した一番の理由がこのセッションです。
Twitterのアーキテクチャに関するセッションでした。
思った以上に濃い内容で、ツイートしたデータがどんな流れで登録されるのか、登録されたデータを各ユーザのTimelineにどのようにアクセスして表示しているのかが説明されました。
今回は主に[Finagle](http://twitter.gthub.com/finagle/)についての話でしたが、非同期処理をどのように活用しているかというお話でした。
負荷分散を行なっているポイントやキャッシュについての考え方などです。
メモを取るのに夢中になってしまい、英語をヒアリングするという目的を見失ってしまいましたが。。。
期待以上の話が聞けて満足しています。

**パネルディスカッション**
___

最後はJavaに関連するコミュニティを運営されている方々のコミュニティ運営に関するディスカッションです。
コミュニティの運営の苦労している点や、心がけている点など、運営も大変そうだなぁと。
どうしても長くやっているとメンバーが固定化してしまうという話なども出ていました。
これは難しいですよね。会社も同じことが言えますし。
一番印象に残ったのは桜庭さんの「動くものが作れるのが楽しい」という一言でした。
エンジニアをやってるのは確かにそこが面白いからだなぁと。最近忘れかけているので、もっと色々と作っていきたいですね。

___

以上がカンタンな感想です。
少し残念なのですが、事前に参加登録していたセッションについては、マイページと呼ばれるところから資料がダウンロードできるものもあるみたいですが、参加登録してないものについてはダウンロードが出来ない様でした。（4/6現在）
参加できなかったセッションの資料こそ見たいと思うのが普通だと思うのですが、どうでしょう？そのうちどこかに公開されるのかなぁ。


以下は、いつもの通り個人のメモです。

___

```

場所：六本木ヒルズ　アカデミーヒルズ49F
日時：2012/04/05 

○Java EE6 Modeling　JS2-01　#jt12_s201
　スーツ禁止。Eva好き？
　・特徴
　　Web Profile Pruing
　　POJO、Annotation、Less XML
　　Java EE6の半分のAPIは変更なし。新規が11%
　・JavaEE6 Web Profile
　　CDI、Interceptors、JSR 250
　　Singleton EJB
　　JPAはEntityBeanの代わりかな？
　・パッケージングがearではなく、war一つで済むように。
　　war（ウォーファイル）
　　web.xmlはアノテーションで行えるようになり、要らなくなる。
　　
◯マルチコアCPU時代のJavaプログラミング　JS2-14　#jt12_s214
　HotSpotVM依存のお話ですよ。
　・GCとか
　・java.util.concurrent.ForkJoinPool
　　デフォルト並列数は論理CPU数
　・メモリアロケーション
　　TLABが非効率に。先にある程度大きめにスレッドに割り当てを行うため、
　　スレッド数が上がるとTLABが非効率になる->Eden全体では未使用領域があるんだけどGC発生とか
　・JNIでの問題
　　GetStringCriticalとReleaseStringCritical間はGCが抑止されるため。

　・無意識のロック
　　HashTableやStringBufferなど。
　　String#getBytes()も。
　　InetAddress#getAllByName()が内部でキャッシュを持ってる＝ロック
　　File#renameTo()も内部でキャッシュ（ExpiringCache）持ってる。
　　　Javaでは時間がかかる処理にはキャッシュを利用するという仕組みなので。スレッド数を増加させる場合は注意が必要
　・フェアネスロック
　　lock = new Object();
　　for (int i=0;i<100;i++0{
　　　synchronized(lock){
　　　　System.out.println("i="+i+"tid="+Thread.currentThread().getId());
　　　}
　　}
　　上記を実行してもかたよることがあるよ。＝フェアじゃない
　　モニターによるスレッド割り当ての説明。
　　RentrantLockでフェアネスになるよ。
　・性能分析
　　println()で区間分析。複数スレッドで実行したら実行時間にずれが。
　　println内部でもsynchronizedを利用している。＝ロックのせいで処理時間が遅くなるスレッドが出てきたりする。
　　JVMTIで性能分析する場合RawMonitorEnter,RawMonitorExitでロックとりあいなるのでもマルチスレッッドだと正しい値がでない。GetThreadLocalStrage使え。
　・まとめ：
　　ハードウェア更改時にプログラムの変更が必要になることもあるよ。
　　わずかのロックが命取りに（ロックをあんまり使わない、無意識なロックを見極めなさい）
　　ロックポリシーの選択（レスポンス重視なのか、スループット重視なのか） 

　QA
　　Q：事例が合ったという話でしたが、コードの修正しかないんですか？
　　A：はい。やっぱり治すのがいいです。あとは、チューニングですが。。。
　　Q：ReentrantLockが昔はスレッドダンプにでなかったのですが、今は？
　　A：今は出ます。
　　Q：各世代とJavaのバージョンのマッピングは？
　　A：第3世代が1.5くらいから。第2世代が1.3とか1.4？
　　
◯サービス維持・発展を踏まえた楽天オークションのJava EEによる開発と運用　JS2-23　#jt12_s223
　・短期で人材が参加できるようにしているというお話
　・楽天オークションの成り立ち（郵政とdocomoと楽天）
　・商品、コミュニティ系（出品とか検索とか）と流通系（入出金、配送など）の2軸
　・メンバー30人くらい
　　ミドルエンジニア
　　エンジニア
　　プロデューサー
　・楽天市場をベースとして機能追加
　・巨大でリリースが大変に。
　・この5年で機能分解して機能ごとのリリースをめざして改善している
　・JavaEEを使う理由
　　WebLogic上にバッチが動いているなどの仕組みをしている？
　　管理機能が充実している（WebLogic）
　・GlassFishへ移行中
　　あれ？Weblogicの管理機能がいいんじゃなかったっけ？
　　EJB実装はWebLogicに依存してるのでWebLogicもバージョンアップしてる。
　※メモはここまで。電池の持ちを気にして

◯ JSR 353: Java API for JSON Processing　JS2-33　#jt12_s233
　・JSONとは
　　JavaScript Object Notation
　　「軽量な」データ交換フォーマット
　・JSON仕様のグラフ
　・XMLもあるのになんで？
　　シンプルで可読性が高い
　　属性がなく、複雑なスキーマ仕様がない。
　・コンパクト
　・Twitter、GoogleMaps、YahooWebServicesなど
　・JCP、JSRのお話
　　JSRの役割とか。
　　リファレンス実装の話。
　・JSR-353 http://jcp.org/en/jsr/detail?id=353 
　　StAXやDOMに対応するよ。
　・ゴールではないもの
　　JSONをJavaのドメインオブジェクトにバインドするとかもどすとか。
　・メンバー
　　@yusukeyも一人
　・参加になったきっかけ
　　2011/10にTwitterがJCPに参加
　　2012/12/6にJSON JSR提出
　　年越しに採択
　　@yusukey「これTwitterで重要じゃない？」
　　@cra　「やりましょう」
　・JSRのコミュニケーション
　　世界各地の人なので、基本メールベース（今は自己紹介したくらい。。）
　・既存のJSONライブラリ
　　json.org、jackson、google-gson
　・なんで、いろいろあるのにJSR？
　　標準化、クラスパスにデフォ、シンプル、ライセンスで悩まないとか。
　・ロードマップ
　　エキスパートグループ作成→アーリードラフト→パブリックレビュー→ファイナルリリース
　　いま、アーリードラフト
　・最新仕様
　　javax.json.*
　　javax.json.spi.*
　　javax.json.stream.*
　　javax.json.tree.*
　　メソッドチェインできるみたい。
　　JsonObject.create(reader);みたい
　　JsonObject obj = …;
　　JsonWriter writer = obj.accept(writer.)
　・改善案
　　JSON***にしたいな。
　　spiはらないんじゃないかな？（いま、一個しか無い）
　　treeもいらないんじゃないかな？（そんなに増えないし）
　　parseじゃないかな？
　　メソッド追加（asStringで文字列化とか、create(String)とか）
　QA
　　Q：JSONのスキーマ決めないの？バリデータとか
　　A：JSONスキーマはあんまりもてはやされてない。一応あるのはある。

　さすがの安定感。適宜笑いが入ってて楽しかったです。

◯UI Controls and Charts: Drag-and-Drop, Filtering, Sorting, Table Hookup with Charts　JS2-42　#jt12_s242
　◯JavaFX 2.0のControls
　◯Label、Button、ToggleButton、RadioButton、Hyperlink、CheckBox
　◯Slider、ScrollBar、ScrollPane、ProgressIndicator、ProgressBar
　◯TextField、PasswordField、TextArea
　◯新しい機能
　　TitledPaneとAccordion
　　TabPaneとSplitPane
　◯Charts
　　XYChartとPieChart
　　XYChartにはLineChart、AreaChart、BarChart、ScatterChart、BubbleChartがある。 
　◯Menu
　　MenuItemの下に色々ある。
　　CheckMenuItem、RadioMenuItem、CustomMenuItem（SeparatorMenuItemとか)
　◯ChoiceBox、ContextMenu、ToolTip
　◯ListView
　◯2.1の新機能
　　ComboBox、http://fxexperience.com/2012/03/new-in-javafx-2-1-combobox/
　　StackedBarChart、
　　StackedAreaChart
　　MenuBarのMac OSへの対応（窓の中じゃなく、画面上部にちゃんと出る。）
　　LCD Text
　QA：
　　Q：テキストエリアの日本語入力とかは？
　　A：JavaFX3.0で対応
　　Q：FXML（Scene Builder）を使ってコードが生成されるのか？
　　A：ドラッグ・アンド・ドロップでやる場合はScene Builderでもできるでしょう。私はNetBeansとかでやりますけどね。
　　Q：Dialogはいつ対応されるんでしょうか？
　　A：私は使ってるんですけど、JavaFXに入れてもらえませんｗコードは出来てますｗ
　　Q：Chartがありますが、pngやsvgでの出力は可能？
　　A：できません。そのうちできるかも。
　　Q：Chartの結合はできる？Axisの時間を便利に使うツールはありますか？
　　A：できないです。ありません。
　　Q：FX2.0でカスタムコントロール作るの大変？
　　A：私のマシンでは動いてるんですがｗ
　　Q：ChartにCSSを適用することは可能？
　　A：可能です。データはJavaから出力されたものだけですけどね。
　　Q：JavaFX2.0の起動速度が上がったけど、どういう仕組？
　　A：私は上の方のエンジニアなのでよくわからないですが、GPUをうまく使ってるみたいです。

◯Learn how the JVM is fundamental to our architecture.　BoF2-03  #jt12_b203
　Java、Scala、Linuxのカーネルまで担当してます。
　・Twitterのアーキテクチャ
　・スパイクが急にあがる場合にも対応できるスケールの話。
　　なでしこ、#バルス、大震災など
　・Twitterはプラットフォーム

　・最上位層：HTTP Proxy（Routing）
　・中層：Twitter App（Models/Biz Objects、Composition）
　　UserService、TweetService、TimelineServiceに分解（Models/Biz Objects）
　　API（Composition）
　・最下層：TimelineStorage、TweetStorage、SocialGraph、UserStorage（Storage/Retrieval）
　
　・NEEDS
　　　サーバ負荷をハンドルできる必要がある。
　　　言語のフレキシビリティ（JavaとかScalaとか）
　　　成熟したコンカレンシーモデル
　・Java が提供してるもの
　　開発者のエコシステムが素晴らしい。例：Nettyを使っている。Non-blocking I/O
　　world class JITとコンカレンシーモデル
　　メモリ管理
　　　利点：メモリ管理を意識しなくていい
　　　課題：GC。OpenJDKのコミュニティで参加してる。
　　複数の言語が実行可能な環境
　・OpenJDKについて
　・Finagleのお話。
　　Netty上に作られた非同期なRPCサーバクライアントのライブラリ
　　http://twitter.gthub.com/finagle/
　・TimelineServiceのお話
　　340M/day
　　10K/sec（イベント時）
　・ツイートが入ってくる仕組み
　　HTTP Proxy → tweet API → queue → tweet daemon → fanout （social graph）→ delivery → timeline cache → redis
　・fanout
　　4000フォロワーごとにdeliveryにツイートが渡される。
　・Timelineを見る仕組み
　　HTTP Proxy → timeline API（user service、） →timeline service →timeline cache
　・timeline、tweets、users
　・timeline serviceとtimeline cacheの関係
　　Finagleで負荷分散している
　・timeline serviceからtimeline cacheへのリクエストを監視して、
　　高頻度のリクエストについては、timeline serviceのin-process cacheに入れる仕組み
　・Service[Request, Response]
　　Scalaの記述
　　service(request).onSuccess {response => println("got response! " + response) } 
　・Finagleのコンポーネント
　　コネクション管理
　　プロトコルデコード　ThriftでService以降がつながってる。
　　分散トレース　オーバーヘッドを抑えて全体を監視（RPCトレース（呼び出しと処理時間のタイムラインチャート））
　　サービスディスカバリ　
　　observability

◯パネルディスカッション
　・JGGUG、JRuby、Scala、Groovyのコミュニティ運営に関係している方々によるディスカッション。
　　
```





　　
