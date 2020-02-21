---
layout: post
title: "elasticsearch-analysis-kuromojiでユーザ辞書の利用方法(Jugemより移植)"
slug: elasticsearch-analysis-kuromojiでユーザ辞書の利用方法
author: johtani
date: 2013-03-20T16:43:00+09:00
comments: true
tags: [elasticsearch]
---
なんか、とても久しぶりにイベント参加メモ以外の投稿です。
elastic searchのMLを見てたら、KuromojiのAnalyzerを使うときにユーザ辞書使うのどうするの？という[投稿](https://groups.google.com/forum/?fromgroups=#!topic/elasticsearch/7oGNCM7QH4s)を見かけました。

Kuromojiのユーザ辞書にもちょうど興味があったり、elasticsearchもちょっとずつ触りたかったのでちょっと試してみました。（返信もしてみましたが、テキトーな英語です。。。）

elasticsearch-kuromoji-pluginのインストールなどは[ElasticSearch で kuromoji を使う (ES 0.90.Beta1 + kuromoji 1.2.0篇)](http://qiita.com/items/134b049a59fe396c9475)を参考にしてください。
私もこちらに記述のある組み合わせ（elasticsearch-0.90.0Beta1 + elasticsearch-analysis-kuromoji/1.2.0）を利用しました。
KuromojiのAnalyzerはデフォルトで「kuromoji」として登録済みですが、こちらはユーザ辞書の指定がありません。
ということで、「kuromoji_user_dict」というユーザ辞書指定をしたtokenizerと、それと使う「my_analyzer」というanalyzerを登録したIndexを作成します。
定義する前に、「userdict_ja.txt」を用意して、elasticsearch-0.90.0Beta1/config/ディレクトリに配置しておきます。
（以下のサンプルでは、SOLE_HOME/example/solr/collection1/conf/lang/userdict_ja.txtをコピーして使いました）
```

$ curl -XPUT 'http://localhost:9200/kuromoji_sample/' -d'
{
    "index":{
        "analysis":{
            "tokenizer" : {
                "kuromoji_user_dict" : {
                   "type":"kuromoji_tokenizer",
                   "user_dictionary":"userdict_ja.txt"
                }
            },
            "analyzer" : {
                "my_analyzer" : {
                    "type" : "custom",
                    "tokenizer" : "kuromoji_user_dict"
                }
            }
            
        }
    }
}
'
```
「user_dictionary」というのがユーザ辞書の定義ファイルになります。
注意点としては、6行目で指定した名前「kuromoji_user_dict」を14行目の「tokenizer」に指定しないとちゃんと動かないという点でしょうか。

上記で指定したAnalyzerを利用して「朝青龍」という単語をを解析してみます。
```

$ curl -XGET 'http://localhost:9200/kuromoji_sample/_analyze?analyzer=my_analyzer&pretty' -d '朝青龍'
{
 "tokens" : [ {
   "token" : "朝青龍",
   "start_offset" : 0,
   "end_offset" : 3,
   "type" : "word",
   "position" : 1
 } ]
```
「朝青龍」という単語がユーザ辞書に登録されているので、1単語として出力されます。
ちなみに、デフォルトの「kuromoji」のanalyzerを指定すると以下の様な出力です。
```

$ curl -XGET 'http://localhost:9200/kuromoji_sample/_analyze?analyzer=kuromoji&pretty' -d '朝青龍'
{
 "tokens" : [ {
   "token" : "朝",
   "start_offset" : 0,
   "end_offset" : 1,
   "type" : "word",
   "position" : 1
 }, {
   "token" : "青龍",
   "start_offset" : 1,
   "end_offset" : 3,
   "type" : "word",
   "position" : 2
 } ]
```
とまぁ、こんなかんじです。
ユーザ辞書を書き換えたあとは「close/open」しないと読み込めないのかなぁ？そのへんはまたあとで調べようかな。
___
ちなみ、以下のページを参考にさせてもらいました。
[elasticsearch kuromoji plugin - natural days](http://www.hirotakaster.com/archives/2012/11/elasticsearch-kuromoji-plugin.php)
[ElasticSearch で kuromoji を使う (ES 0.90.Beta1 + kuromoji 1.2.0篇)](http://qiita.com/items/134b049a59fe396c9475)
