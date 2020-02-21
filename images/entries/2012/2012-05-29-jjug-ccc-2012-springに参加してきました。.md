---
layout: post
title: "JJUG CCC 2012 Springに参加してきました。(Jugemより移植)"
slug: jjug-ccc-2012-springに参加してきました。
author: johtani
date: 2012-05-29T11:45:00+09:00
comments: true
tags: [勉強会]
---
JJUG CCC 2012 Springに参加してきました。
昨年のFallに続き、2回目です。
[概要や、タイムテーブルはこちらを御覧ください。](http://www.java-users.jp/contents/events/ccc2012spring/)
今回は、午後一から参加しました。
色々と迷いましたが、つぎのを聞いて来ました。
* HotSpot vs JRockit ～ HotRockit到来の前に予習しよう！
* Play! Framework - モダンで高速なWeb開発
* Grails/Groovyの開発活用術
* Scala 最新状況報告
* From Swing to JavaFX SwingからJavaFXへのマイグレーションガイド


JRockitは使ったことがなく（たぶん）、新鮮でした。いろいろなコマンドが用意されているなぁと。
あと、jvisualvmの使い方も知らないこともあったのでいい話が聞けました。
プレゼンに慣れているようで、プレゼン中に、コマンドラインの拡大＋コマンドのオプションに赤い下線を入れるなど、どうやってやっているのか、プレゼンの内容よりも気になってしまったのが本音です

Playは今回の目玉の一つでした。まだ、手元でPlayを触り始めたばかりだったので、概観がつかめたのが良かったです。
あとで[スライドを](http://www.slideshare.net/ikeike443/play-jjug2012spring-13100524)見なおさないと。
頭がどうしてもServlet、JSPのため、未だにPlayに切り替えができてないので、もっと触ってみないとなぁと。
ちなみに、紆余曲折してまして、Play 1.2.4→Play 2.0（Javaアプリ）→Play 2.0（Scalaアプリ）と心変わりしまくりで、まだ完全に作ってないのに、ふらふらしてます。。。

GrailsはGrailsを現場にどのように投入していくのがいいかという、技術よりは、政治的な話でしたが面白かったです。
実際に、あまり有名でないプロダクトを現場に導入するのに、Javaだからと無理やり説得してみたりｗ、開発コストがこれくらい下がりますという話をしてみたりと、いろいろやられているようでした。
あと、PlayのあとにGrailsということもあり、すこしPlayを意識した話もされていました。


ScalaはScalaDaysの話＋Scalaの最近の動向ということで、ある程度Scalaを知っている人がターゲットのようでした。
少し触っただけなので、何となく分かる部分もありましたが、最後の方はついていけてないです、すみません。。。
一番感じたのは、発表者の水島さんのScalaに対する愛情でしょうか。

最後は桜庭さんのJavaFXのお話です。
一応、昔、JFreeChart＋Swingでちょっとしたものを作ったことがあるので面白かったです。
プレゼン自体もJavaFXで作成されていたり、オープニングがStarWars風だったりと凝ったプレゼンでした。
JavaFXとしては、JavaOneでも聞いたのですが、グラフやHTMLがリッチに書けるようになったことがびっくりです。

実際のSwingアプリからJavaFXへの移行に関して、注意する点などがわかりやすく聞けました。
FXMLは確かに便利ですよねぇ。レイアウトをJavaで組むのがすごくめんどくさかったもんなぁ。


さて、簡単ですが、感想でした。
今回一番残念だったのは、長丁場の割に電源の確保が難しかったことでしょうか。
ツイートしたり、メモ取ったりしたかったのですが、電源が乏しいので、Wi-fiオフにしてメモ取るのが限度でした。。。

<hr>

```

場所：オリンピック記念青少年総合センター
日時：2012/05/28 10:00 - 19:00

◎13:10 - 14:00 C-1 HotSpot vs JRockit ～ HotRockit到来の前に予習しよう！ 谷本 心 @cero_t
　◯HotSpot from Sun
　◯JRockit from BEA
　　今は、どちらもOracle
　◯違いは？
　1.歴史
　2.プラットフォーム
　　JRockitはMacではNG。Solarisは一部。
　　2.1Oracleさん曰く
　　　Solaris/Mac → HotSpot
　　　Windows/Linuxのサーバ → JRockit
　　　Windows/Linuxのクライアント → HotSpot
　　2.2谷本さんは？
　　　WebLogic → JRockit
　　　1.4、5の時の開発環境はJRockit
　　　当時はJRockitの解析ツールがカッコ良かった
　3.解析ツール
　　3.1コマンドラインツール
　　　プロセス
　　　HotSpot ： jps
　　　JRockit ： jrcmd
　　　スレッドダンプ
　　　HotSpot ：jstack 
　　　JRockit ： jjrcmd <pid> print_threads
　　　ヒープ解析
　　　HotSpot：jmap -histo <pid>
　　　JRocket：jrcmd <pid> heap_diagnostics
　　　HotSpot：
　　　JRockit：jrcmd <pid> 
　　他にもJRockitは色いろある。
　　　print_utf8poolとか（内部の文字列が出てくる）
　　3.2GUIツール
　　　HotSpot：jvisualvm　NetBeansベース
　　　JRockit：Mission Control　Eclipseベース
　　メモリリークの解消をツールを使ってみてみましょうデモ。
　　・hprofファイルを吐き出して、jvisualvmで読みこむのが楽な方法
　　・jrmcはヒープダンプファイルを読み込む機能がない。
　　　memleakというツールがある。アプリを起動してから、プロセスを右クリックして選択可能。
　　　　タイプグラフや割当てトレースみたいなものが使えるよ。
　　　　フライトレコーダーというのもあるよ。
　4.HotRockitの紹介
　　まだいつ出るのかなぁという状態だけど、HotSpotにJRockitのツールも使えるようになるVMが出る模様。（2013？）

　※デモ中に画面拡大した時に、赤線でラインを引いているのがすごく気になった。（便利なツールなのかな？そこだけ？）

◎14:15 - 15:05 C-2 Play! Framework - モダンで高速なWeb開発 池田尚史 @ikeike443
　◯自己紹介
　　Play!Frameworkコミッター
　　日本Playframeworkユーザ会
　◯アンケート
　　メイン言語は？Java多数
　　触ったことある？半分くらい？
　　Play1？Play2？半々くらい
　　プロダクションで使ってる人？3人
　◯Playframeworkって？
　　JEEではないよ。
　　Webだよ。
　　ServletとかXML使ってないよ。
　◯JEEは難しいよね。RailsとかDjangoから流れてくると。
　◯Webフレームワーク
　　なので、Webアプリが作れればいいよね。
　　開発すべきものに注力して、抽象化とかを頑張らないようにと。
　◯ライブコーディング！
　　Play2.0のScalaアプリみたい。
　　プロジェクト作成～編集して起動まで。
　　エラーを起こして、エラーがどのように表示されるか。
　　エラーのリンクをクリックして、エディタを起動するということも可能みたい。
　　TODOとかで、まだ終わってないのも記述可能。
　　パラメータとControllerの関数の引数が勝手にひもづけられますよと。
　◯歴史
　　Servletとかもあった。
　　1.2からNetty、Websocket、Scalaサポート
　　2.0.1：Scalaで書き直し。Netty+Akkaで非同期
　◯１と２のちがいは？
　　・Play1
　　　Javaで書かれたJavaのフレームワーク。Scalaはプラグインサポート
　　・Play2
　　　Scalaで書かれたScala/Javaのフレームワーク
　◯Playの特徴
　　ステートレスとかノンブロッキングとかリアクティブとか
　　・高生産性
　　　XMLがないし、unzipするとすぐ使えるよ。
　　　ホットスワップできるよ。
　　　CoffeeScript、LESSサポートも。assetsに入れとくとコンパイルしてくれて静的コンテンツにしてくれる。（Railsにも似たようなのあったっけか？）
　　・ステートレス
　　　HttpSessionがない→必要ならMemcachedとかで管理してね。
　　　「デプロイ→ニーズ・状況に応じて即時スケールアウトという時代じゃないか？」という主張
　　　Playはステートレス養成ギブスであり、時代の要請にマッチ
　　・広範囲な型安全
　　　コンパイルしてエラー検知
　　・ノンブロッキングI/O
　　　非同期処理が手軽に書けるように考えられている。
　　　→リアルタイムWebの時代
　　　　NettyやAkkaにより実現されてるのがいい
　　　Akkaを使ったアプリを書くと、長い処理のActorを別サーバにするなども設定で変更が可能。
　◯テスタビリティ
　　BDDフレームワーク（Specs2？）
　　Viewもテストできるぞと。
　◯事例
　　Klout：ソーシャルスコアリング
　　イギリスのガーディアン：コンテンツAPIの実装がPlay2
　　MinecraftのWebサイト

◎15:20 - 16:10 C-3 Grails/Groovyの開発活用術 ～Java EE資産を活かして開発を加速する～(仮) 上原潤二 山本剛
　◯充電中のためお休み

◎16:25 - 17:15 C-4 Scala 最新状況報告 ～或いはScala Days 2012リポート～ 水島宏太
　◯自己紹介
　　言語を作るのが夢みたい。
　◯Scala最新状況報告
　　ScalaDaysの雰囲気を伝えるよと。（どっちかというと、旅行記かも）
　◯Scala？
　　・オブジェクト指向関数型言語
　　　ハイブリッドじゃなくて、統合したもの
　　・強力な静的型付け
　　　NullPointerExceptionなども起きにくい
　　・超強力なコレクションフレームワーク
　　・Javaと同等の実行速度
　　・コードが簡潔（1/4くらい）
　◯Scala採用企業
　　Twitter、Amazon.com（どこに使ってるかは不明）、Foursquare、LinkedIn、VMWare、Klout、Tumblrなど
　◯Scalaのバージョンは？
　　2.10が開発版。2.9.2がステーブル版。
　◯開発体制
　　Typesafe＋世界のContributor
　　Typesafeメンバの議決でいろいろ決定
　　githubでオープンに開発
　◯ScalaDays2012の目玉
　　豪華ゲスト（私は、わからなかった）
　　Scala2.10の新機能紹介
　　今後のScala、多数の応用例
　◯ScalaDays2012を見ての方向性
　　・All-in-oneパッケージの提供
　　　Typesafe Stackの提供
　　　重要なツール
　　　　sbt（Simple Build Tool）
　　　　gitter8（プロジェクトテンプレート生成ツール。githubを元に色々取ってくる？）
　　　　Akka
　　　　Play 2.0 Framework
　　・学習コストの削減
　　　言語機能のモジュール化
　　　高度な開発者が使う昨日はデフォルトOff
　　・バイナリ互換性問題への対処
　　　・Minor Release間での互換性を維持
　　　　MIMAでジドウテキに非互換性を検出
　　　・Major Release間では互換性は保証しない。
　　　　No more java.util.Date
　　　　ソース互換性は「概ね」保証される
　　　　deprecatedは次期メジャーバージョン時に削除される。
　　・Scala IDEへの注力
　　　インクリメンタルにコンパイルしてくれるから、遅いのも気にならなくなるかも。
　　　デバッガとか、できるよと。
　　・さらなるパフォーマンス改善
　　　Value classes
　　　AnyValを継承したクラスが作成可能
　　　　該クラスのオブジェクトがインライン化
　　　　Pimp my libraryによるヒープ使用料が0に！
　◯2.10最新機能紹介
　　"1+2=#{1+2}"ができない
　　s"1+2=${1+2}"ができるように String = 1 + 2 = 3
　　f"1=${1}%03d"もできるようにSring = 1 = 001
　　自分でStringコンテキストにメソッド追加できるらしい（聞き取った日本語が合ってるか？）
　　とか。（かなり不安。。。まだまだわかってない。。。）

◎17:30 - 18:30 BOF-B-1 From Swing to JavaFX SwingからJavaFXへのマイグレーションガイド 櫻庭 祐一
　◯JavaFX
　　次世代のJava GUI Library
　　Swing+Java2D+α
　　JavaSE8から標準（JavaFX3.0）
　◯サンプル
　　クラス名がいろいろ変わってる。
　◯はまりそうなところ
　　コンテナへの追加がちょっと違う
　　イベントリスナは1種類のみになった。（Genericsを使うようになったよと。）
　◯Bind
　　値が変わるとModelが勝手に検知して変わるみたい。
　　双方向もあり。これだとEventを書かなくても良くなりつつ有るよと。
　◯シナリオベースでマイグレーション考えましょう
　　1.JavaFX in Swing
　　　JavaFXにSwingを埋め込むことはできないぞと。
　　　SwingでできないことをJavaFXでやりますよと。
　　　おー、グラフが動く。JavaDocのHTMLも綺麗に出てる。
　　　使い方：JFXPanelを使う
　　　　シーングラフを記述可能
　　　　データのやり取りが大変。Threadが違うから。
　　　　パフォーマンスが落ちます。Java2Dで画像を書くので遅いですよと。
　　　　新規のものはJavaFXで書きましょうと。
　　2.Swing to JavaFX w/o FXML
　　　SwingをJavaFXに置き換える。
　　　使い方が違うものはTableViewなど、◯Viewとついてるもの。
　　　ちょっと考えるのはLayout
　　　　Swing：コンテナ＋レイアウトマネージャー
　　　　JavaFX：コンテナがレイアウトを含む
　　　　　BorderPaneクラスとか。
　　　問題はTableとか
　　　　Swing：TableModel
　　　　JavaFX：BeanをColumnにバインド
　　3.Swing to JavaFX w/ FXML
　　　・FXML
　　　　GUIの構造をXMLで表す。
　　　　シーングラフを表現。
　　　　スキーマレス
　　　　　クラス：要素
　　　　　プロパティ：属性 or 要素
　　　アノテーションバリバリです。これで、FXMLとJavaのバインディングができるよと。
　　ツール
　　　Java ：NetBeans
　　　　e(fx)clipseってのがあるかも。
　　　FXML：Scene Builder
　　
```
