---
layout: post
title: "Twitter 勉強会 #twtr_hack に参加しました。(Jugemより移植)"
slug: twitter-勉強会--twtr_hack-に参加しました。
author: johtani
date: 2012-08-02T11:50:00+09:00
comments: true
tags: [勉強会]
---
またまた~~飲みに行って~~参加してきました。
今回は、Rails、iOSでのTwitter連携の話から、ツイート分析、クライアントアプリの開発の苦労？楽しい話と、
幅広い話題でこれまた面白かったです。

Railsはあとで、もう一回資料＋ビデオがみたいかも。あと、発表者の方が言ってたけど他の言語の似たようなサンプルがあると面白いかも。（[Solr入門](http://www.amazon.co.jp/exec/obidos/ASIN/4774141755/johtani-22/ref=nosim/?PHPSESSID=4c20b4d061334d9a7c44ab7afec36007)みたいに同じ題材で違う言語のサンプルとか）

ツイート分析は、私の使い方とは異なる分析結果がちょっと意外でした。土日はあんまりツイートしないからなぁ。
利用時間帯とかは、他のSNS（Facebookとかmixiとか）の分析と比較してみると面白いのかも。
まぁ、深夜帯はそれほど利用は無いだろうけど。

Attaccaは自社や自宅でコーディングするときに利用させてもらってます。
どうしても自分のお気に入りのリストを作ってそれを聞くので満足しちゃうんで、
他の人のお気に入りも一緒にシャッフルして再生とかできると面白いかもなぁ。
もう少し、他にも曲を発見したいんだけど、その導線がもう少しうまく行くと嬉しいかも。

チャーハン諸島の話は開発者の原点みたいな話で面白かった。やっぱり、自分で作るの大事だよなぁと。
作りたいと思うものがあるのはいいことだし、実際作ってみないとわからないこともいっぱいありますよねぇ。
ただ、何か作ろうかなぁと思うものがあるのはちょっとうらやましいとも思いました。
なかなかサービスとか、ほしいものを作ろうと思うところまで行かないからなぁ。年取ったのかなぁ。

懇親会では、いつものように@twtrfkさんと喋って、あと [Lytro](http://www.lytro.com)を触らせてもらいました！
思ったよりも大きいのが第一印象。
ぱっと見で、何の変哲もないところがズームするところだったりと、インタフェースがちょっとおもしろかったです。
ピントが後から合わせられるということで、どうしても同じ構図になっちゃうのがなぁという話も聞けましたｗ
けど、ちょっと欲しいかもなぁ。動くものを撮るとどんな感じなのかも聞くんだった。

次回は9月中旬！らしいので、余力がありそうだったらまた遊びに行きます。


___
日時：2012/08/01 19:00  ～  21:00
場所：デジタルハリウッド東京本校 1Fセミナールーム

いつもの自己紹介タイム

@i7a16k(@_gifteeの中の人)　[スライドはこちら](http://www.slideshare.net/i7a/rails-and-twitter-twtrhack)
```

 「RailsでTwitter連携アプリをサクっと作る」
　・まずは、Railsの紹介
　　MVC+routes.rbの紹介
　・Dev Twitterの登録する必要なとことか。
　・Railsのインストールから起動まで。
　・実際にログイン画面を作成するまでの紹介
　　コーディングするコマンドの紹介。動画付き
　 　omniauth_twitter
　　ってのを使うみたい。
　・サインイン、サインアウトまで。
　　ツイートは次回！
　　録画がよくできてて、それに合わせてしゃべるのもうまいなぁ。
```

@teapipin([ツイッター分析シリーズ ](http://teapipin.blog10.fc2.com/blog-entry-298.html)の方)　[スライドはこちら](http://www.slideshare.net/teapipin/173twitter-twtrhack-13837615)
```

 「約173万ツイートを調査して分かったTwitterの利用動向」
　・ハンドル名は午後の紅茶からきてる？＋ピピン＠
　・ブログで色々公開してます。
　・サービス作るのに、下調べをしてみましたというお話
　　情報が無かったから、自分で調べてみたよと。（すばらしい）
　・Streaming APIで取得
　　タイムゾーンとか言語設定の取得でもうまく取れない。。。
　　ということで、UnicodeBlockで判定してみたけど、、、
　　最後は手作業で不要データを除去（すごい！）
　・4日間で172万ツイート
　　（金環日食とかスカイツリーのイベントがあったので、4日間で我慢）
　・上位5個で50%を占めるクライアントみたい
　・日曜日が多いらしい
　・携帯が60%くらい
　・位置情報（Geoタグつき）
　　日本が多い。4sqが40%占めてる。
　　店舗情報や天気情報などもあるらしい。
　　人口と関係した相関が散布図でわかった。
　　そこで、ツイート内容との関係を分析
　　　あとで資料みたいなー
```

@i2key(#attacca の関係者)　[スライドはこちら](http://www.slideshare.net/i2key/iostwitterframework)
```

 「iOSのTwitterFrameworkを使ってみたら・・・・」
　・Twitter4Jのほうが楽だったよー
　　デモがいいね！
　・アーキテクチャ
　　play!をバックエンド。Amazonとか。
　　iOS Twitter framework
　・Reverse Authの使い方とか。
　　申請してから、20日間かかった。
```

@Mocel([チャーハン諸島](http://archive.guma.jp/rice-islands.html) 開発者)　[スライドはこちら](http://www.slideshare.net/Mocel77/twitter-twtrhack)
```

 「(仮)Twitter クライアントの開発とかについて」

　・趣味プログラマー
　・「ラーメン大陸」のクローン：「チャーハン諸島」を開発
　　Excel溶けこむGUI
　　Javaで実装
　　コマンドライン風のTL画面もある（自分では使ってないけど）
　　「電力会社の電力使用量モニター」もクライアント初搭載！
　　ラーメン大陸のバージョンチェックも可能ｗ
　・開発したことで
　　自分のニーズにジャストフィット
　　優しい気持ちになれる（苦労がわかる）
　　Twitter APIのテストとかもすぐ試せる
　・GUIアプリ開発のノウハウも手に入るからオススメ
　・API利用規約は読んどこうね
　・自動アップデート機能がいるよ。→バージョンごとのサポートがなくなるよ。
　・通信エラー前提で作りましょう
　・鍵付きの非公式RTはやめなさい。
　・Twitterクライアントの作成はおもしろいよ！
　　反応がプレッシャーになることもあるけど。
　　おもしろ機能をつけるのがいいよーと
　話が上手で聞きやすかった。
```
