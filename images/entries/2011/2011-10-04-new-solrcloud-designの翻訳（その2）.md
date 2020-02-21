---
layout: post
title: "New SolrCloud Designの翻訳（その2）(Jugemより移植)"
slug: new-solrcloud-designの翻訳（その2）
author: johtani
date: 2011-10-04T18:32:00+09:00
comments: true
tags: [solr]
---
遅くなりましたが、続きです。
さらに英語力のなさを痛感して凹んでいるところですが、何かの役に立てばと恥を晒すところです。。。

一応、訳してみたのですが、訳すのに必死になってしまい、つながりがわかっていない点もちらほら。
このあと一旦見直しつつ、再度理解する「理解編」をアップしようかと思います。
できれば、シーケンス図とかも交えつつ。（そうしないと理解ができない可能性が。。。）
前回同様、原文は最後に付加しておきます。


**<span style="font-size:medium;">Boot Strapping**

**<span style="font-size:small;">Cluster Startup（クラスタの起動）**

ノードはZookeeperのホストとポートを指定することから始めます。
クラスタの最初のノードはクラスタのschema/configとクラスタの設定を指定するとこから開始します。
最初のノードはZookeeperに設定をアップロードしてクラスタをブートします。
クラスタは「ブートストラップ」状態です。
この状態ではノード-&gt;パーティションマッピングは計算されず、クラスタはクラスタ管理コマンド以外のどんなread/writeリクエストも受け付けません。

クラスタの最初のノード集合が起動した後、クラスタ管理コマンド（TBD記述？？？）が管理者によって発行されます。このコマンドは整数「partitions」パラメータを受け取り、次のステップを実行します。

1. Cluster Lockを取得
1. 「partitions」をパーティション数として割り当て
1. 各パーティションのためのノードを取得
1. ZooKeeperのノード-&gt;パーティションマッピングを更新
1. Cluster Lockをリリース
1. 全ノードに対して最新版のノード-&gt;パーティションマッピングをZooKeeper経由で更新させる


<span style="font-size:small;">**Node Startup**

ノードが起動すると、自分がすでに存在するシャードの一部かどうかZooKeeperでチェックします。
もし、ZooKeeperがノードのレコードを持っていない、またはどのシャードの一部でもないと判断したら、
ノードは後述の「New Node」のステップを実行します。すでに存在するノードの場合は後述の「Node Restart」のステップを実行します。

**New Node**

新しいノードはクラスタの一部ではなく、クラスタのキャパシティを増強するためのものです。

「auto_add_new_nodes」クラスタプロパティが「false」の場合、新しいノードはZooKeeperに「idle」として登録され、他のノードが参加してくれと言うまで待機します。
そうでない場合（auto_add_new_nods=true）は次のステップを実行します。

1. Cluster Lockを取得します。
1. 適切なnode-&gt;partitionエントリを選び出します。
1. 利用可能なパーティションのリストをスキャンして「replication_factor」のノード数以下のパーティションのエントリを探します。複数ある場合はノード数が最小のエントリを選びます。それも一緒ならランダムに選びます。
1. 全パーティションが「replication_factor」以上のノードを持っている場合、ノードはパーティションが最も多いものをスキャンします。複数ある場合はパーティション内のドキュメント数が最大のエントリを選びます。ドキュメント数が同一なら任意のエントリを選びます。
1. もし、選んだノード-&gt;パーティションエントリを現在のノードに移動させることでがクラスタのパーティション：ノード比率の最大値を小さくするなら、現在のエントリを返します。。それ以外の場合選ばれたエントリがないので、アルゴリズムは終了です。。
1. ZooKeeper内のノード-&gt;パーティションマッピングを更新します

</li>
<li>ZooKeeper内のノードステータスを「リカバリ」状態にします</li>
<li>Cluster Lockをリリースします</li>
<li>「リカバリ」はパーティションのリーダーから開始します。</li>
<li>リカバリが終了したら、再度、Cluster Lockを取得します。</li>
<li>元のエントリはZooKeeperのノード-&gt;パーティションマッピングから削除されます。</li>
<li>Cluster Lockをリリースします</li>
<li>元のノードはZooKeeperからノード-&gt;パーティションマッピングを更新させられます</li>
<li>ステップ1に戻ります。</li>
</ol>

<span style="font-size:small;">**Node Restart**

ノードの再起動とは次のいずれかを意味しています。

* JVMがクラッシュし、手動または自動でのリスタート
* ノードが一時的にネットワークから切り離された。もしくは、ZooKeeperに接続できなかった（死んでいると思われた）。または、ある一定期間、リーダーからの更新を受信できなかった。
* このシナリオが表す書き込み処理のライフサイクルの間にネットワークから分断された
* ハード故障もしくはメンテナンスウインドウによりクラスタからノードが分断され、ノードをクラスタにrejoinさせるために起動した。


ノードが各パーティションに対してメンバーであるパーティションのリストを読み、パーティションのリーダーがリカバリプロセスを実行する。その時、ノードは「auto_add_new_nods」プロパティをチェックして、「New Node」処理のステップを実行する。
これはクラスタが。。。（元の文章が切れてて意味が不明）

クライアントは標準的なSolrの更新形式を利用して書き込みできます。
書き込み処理はクラスタの任意のノードに送信されます。
ノードはハッシュ関数を利用して、どのパーティションに所属するか決めるためにrange-パーティションマッピングを使います。
ZooKeeperはシャードのリーダーを識別して、書き込み処理をそこに送ります。
SolrJはリーダーに対して書き込みを直接送信するための拡張がされています。

リーダーはPartitionバージョンの操作を割り当て、そのトランザクションログの操作を書き込み、シャードに属する他のノードにドキュメントバージョンハッシュを転送します。
ノードはインデックスにドキュメントハッシュを書き込み、トランザクションログに操作を記録します。
リーダーは、min_writesの最小数のノード以上のノードが「OK」とレスポンスを返したら「OK」とレスポンスを返します。
クラスタプロパティのmin_writesは書き込みリクエスト時に指定することで、異なる値を指定できます。

クラウドモードはコミット/ロールバック操作を明示的には行いません。
コミットは特定の間隔で（commit_within）リーダーによりオートコミットにより管理されます。
また、シャードの全メンバーのコミットはトリガーにより管理されます。
ノードが利用可能な最新バージョンはコミットの時点で記録されます。


<span style="font-size:medium;">**Transaction Log**

* トランザクションログは2つのコミットの間にインデックスに対して実行された操作全てを記録したもの
* コミットはそれ以前に実行された操作の耐久性を保証するために、新しいトランザクションログを開始します。
* 同期は調整が可能です。例えば、flush vs fsynです。fsyncがデフォルトで、JVMクラッシュに対して保証できるが、電源異常の場合には保証できないが、速度的には早いです。


**<span style="font-size:medium;">Recovery**

次のトリガーにより復旧が可能です。
* Bootstrap
* パーティション分割
* クラスタの再構築


ノードは自身に「recovering」というステータスを設定して復旧を開始します。
このフェーズの間、ノードは読み込みリクエストを受けることができませんが、トランザくkションログに書きこまれるすべての新しい書き込みリクエストを受け取ります。
ノードは自身が持つインデックスのバージョンを調べて、パーティションの最新バージョンのリーダーに問い合わせます。
リーダーはシャード内の残りのノードと同期する前に実行されるべき操作の集合を返します（？？？）。

最初にインデックスをコピーし、最新のノードにあるトランザクションログをリプレイします。
もし、インデックスのコピーが必要ならば、インデックスファイルをローカルにまずコピーし、その後トランザクションログをリプレイします。
トランザクションログのリプレイは通常の書き込みリクエストの流れと同じです。
この時、ノードは新しい書き込みを受け付けるかもしれません。その書き込みはインデックスに再生されるべきです。
ある時点でノードは最新のコミットポイントに追いつき、自身のステータスを「ready」にします。
この時点で、このノードは読み込みリクエストを処理できます。

**<span style="font-size:small;">Handling Node Failures**

一時的にネットワークが分断され、幾つかのノードとZooKeeperの間の通信が遮断されるかもしれません。
クラスタはデータの再構築（リバランシング）の前にしばらく待ちが発生します。

**Leader failure**

ノードが故障し、もしそれがシャードのリーダだった場合、他のメンバーがリーダー選出のプロセスを開始します。
新しいリーダーが選出されるまで、このパーティションへの書き込みは受け付けられません。
この時、これはリーダー以外の故障ステップを処理します。（？？？）

**Leader failure**

シャードの一部に新しいノードが割り当てられる前にリーダーはmin_reaction_timeの間待ちます。
リーダーはCluster Lockを取得し、シャードの新規メンバーとしてノードを割り当てるためのノード-シャード割り当てアルゴリズムを使用します。
ZooKeeperのノード-&gt;パーティションマッピングが更新され、Cluster Lockがリリースされます。
新しいノードはZooKeeperからノード-&gt;パーティションマッピングを強制的にリロードされます。


**<span style="font-size:medium;">Splitting partitions**

明示的なクラスタ管理コマンドもしくはSolrによる自動的な分割戦略（ストラテジ）はパーティションを分割することができます。
明示的な分割コマンド（split command）は対象となるパーティションを分割するために実行されます。

パーティションXが100から199のハッシュの範囲を持つものとし、X（100から149）、Y（150～199）に分割するとします。
Xのリーダーは、XとYの新しい値の範囲をZooKeeperに分割アクションを記録します。
ノードはこの分割アクションもしくは新しいパーティションの存在については通知を受けません。（？？？）

1. XのリーダはCluster Lockを取得し、パーティションY（アルゴリズムはto be determined）を割り当てるノードを決定し、新しいパーティションを知らせ、パーティション-&gt;ノードマッピングを更新します。Xのリーダはノードのレスポンスを街、新しいパーティションがコマンドを受付可能な状態になったら次の処理を実行します。
1. Xのリーダーは分割が完了するまですべてのコミットを停止します。
1. Xのリーダーは最新のコミットポイント（バージョンVとする）のIndexReaderをオープンし、同じバージョンのIndexReaderもオープンするように命じます
1. XのリーダーはYのリーダーに対してバージョンV以降のトランザクションログのうちハッシュ値の範囲が150から199のものを流します。
1. Yのリーダーはトランザクションログの#2（#3の間違い？）で送られたリクエストだけを記録します？？？
1. Xのリーダーはステップ#2で開いたIndexReaderに対してインデックスの分割を開始します。
1. #5で作成されたインデックスはYのリーダーに送られ、登録されます。
1. Yのリーダーは「recovery」プロセスを開始するように（シャードの）他のノード命令し、インデックスのトランザクションログを再生し始めます。
1. パーティションYのすべてのノードがバージョンVに到達したならば
1. YのリーダーはXのリーダーに#2で作成されたReaderの上に、ハッシュの範囲が100から149だけに属しているドキュメントを抽出するようにするFilteredIndexReaderを準備するように頼みます。
1. Xのリーダーは#8aのリクエストが完了したのを検知したら、YのリーダーがCluster Lockを取得し、クラスタ全体の検索/登録リクエストの受信を開始するためにレンジ-&gt;パーティションマッピングを変更します。
1. YのリーダーはXのリーダーに検索リクエストのために#8aで作成されたFilteredIndexReaderの利用開始を頼みます
1. YのリーダーはXのリーダーに、ZooKeeperからレンジ-&gt;パーティションマッピングを矯正リフレッシュするように頼みます。この時点で#3で開始されたトランザクションログの流しこみが停止されるのが保証されます。

</li>
<li>Xのリーダーは自身のパーティションに存在するべきでないハッシュ値をもつドキュメントを削除し、最新のコミットポイントのsearcherを再度開きます。</li>
<li>この時点で分割は完全に終了し、Xのリーダーはcommit_withinパラメータによるコミットをレジュームします（？？？）</li>
</ol>

Notes:

* 分割操作が完了するまで、commit_withinパラメータによるパーティションの分割は実行されない
* #8b開始から#8c終了までの間の分散検索は一貫しない検索結果を帰す場合がある（例えば：検索結果が異なる）


**<span style="font-size:medium;">Cluster Re-balancing**

クラスタは明示的なクラスタ管理コマンドにより再構築（リバランシング）できる。

TBD
（to be determined）

**<span style="font-size:medium;">Cluster Re-balancing**

TBD
（to be determined）


**<span style="font-size:medium;">Configuration**

<span style="font-size:small;">**solr_cluster.properties**

これはクラスタ内の全ノードにわたって適用される一般的なSolr設定ファイルとは別のプロパティファイルの集合である。

* replication_factor：クラスタによって管理されるドキュメントのレプリカの数
* min_writes：書き込み操作が成功になる前の最小の書き込み？？？？。これは書き込みごとに上書き設定可能
* commit_within：検索に現れるまでの書き込み操作の最大回数
* hash_function：ドキュメントのハッシュ値を計算するための関数の実装
* max_hash_value：ハッシュ関数が出力することができる最大値。理論的には、この値はクラスタが保持できるパーティションの最大数でもある
* min_reaction_time：起動、停止の後に再配分/分割にかかる時間（？？）
* min_replica_for_reaction：レプリカノード数がこの値以下になったら、min_reaction_timeにならなくても分割が実行される。
* auto_add_new_nodes：booleanフラグ。もしtrueなら新しいノードは自動的にパーティションからレプリカを読み込む。そうでない場合は新しいノードはクラスタに「idle」状態で登録される


<span style="font-size:medium;">**Cluster Admin Commands**

すべてのクラスタ管理コマンドはすべてのノードでパス（/cluster_admin）を与えることで実行できます。
全ノードは同じコマンドを受け付けることができ、振る舞いも同じものになるでしょう。
以下のコマンドはユーザが利用できるパブリックなコマンドです。

* init_cluster：（パラメータ：パーティション）このコマンドはノードの集合の初期化後に実施されます。このコマンドが実行されるまで、クラスタは読み込み/書き込みコマンドを受け付けません。
* split_partition：（パラメータ：パーティション（任意））パーティションを2つに分割します。もしパーティションパラメータが指定されない場合は、ドキュメント数が最大の
* add_idle_nodes：このコマンドはauto_add_new_nodes=falseの場合に利用できます。このコマンドはクラスタに対して「idle」状態のすべてのノードを追加するトリガーとなります。
* move_partition：（パラメータ：パーティション、from、to）fromのノードからtoの別のノードに引数で指定されたパーティションを移動します。
* command_status：（パラメータ：completion_id（任意））上記コマンドはすべて非同期で実行され、completion_idを返します。このコマンドは特定の実行中のコマンドもしくは全ての実行中のコマンドの状態を表示するために利用できます。
* status：（パラメータ：パーティション（任意））パーティションのリストを表示し各パーティションの次の情報を表示します。
* リーダーノード
* ノードのリスト
* ドキュメント数
* 平均読み込み回数（reads/sec）
* 平均書き込み回数（writes/sec）
* 平均読み込み時間（time/read）
* 平均書き込み時間（time/write）

</li>
</ul>


**<span style="font-size:medium;">Migrating from Solr to SolrCloud**

クラウドに移行するときに幾つかの特徴は不要かもしれないし、サポートされないかもしれません。
既存の（クラウドでない）バージョンでのすべての特徴をSolrCloudでサポートし続けなければなりません。

* レプリケーション：これは必要ありません。
* CoreAdminコマンド：明示的なコアの操作は許可されません。内部にコアがあるかもしれないが、暗黙的に管理されるでしょう
* 複数スキーマのサポート？：単純化のため、ver1.0ではサポートしないかもしれない
* solr.xml：SolrCloudでほんとに必要？


**<span style="font-size:medium;">Alternative to a Cluster Lock**

リーダーを選出する常設の調停ノード（masterはインデックスレプリケーションで利用している用語なので、「調停」とする）を持つほうが単純かもしれません。
「truth」状態をZookeeperの状態としてみなすような次のパターンでは、将来の柔軟性（クラスタを制御するためのZookeeperの状態を直接変更するような外部管理ツールのような）を考慮に入れることができます。
（毎回ロックを取得するよりも）調停ノードを持つことにより、よりスケーラブルになるかもしれません。
特定条件下でのみCluster Lockを利用するハイブリッドも意味があるでしょう。

**<span style="font-size:medium;">Single Node Simplest Use Case**

単一ノードでスタートして、ドキュメントをインデックス登録できないといけません。
また、あとで、クラスタに2番目のノードを追加できないと行けません。

* 1つのノードから開始し、最初にZookeeperに設定ファイルをアップロードし、shard1にノードを作成＋登録します。
* 他の情報がない状態で設定が作成され、1つのシャードのシステムとなります。

</li>
<li>いくつかのドキュメントをインデックスします</li>
<li>他のノードが起動し、「まだ割り当てられていない場合、レプリカの最小の数をもつshardに割り当てられ、「recovery」プロセスを開始します」というパラメータを受け取ります。
* 出来れば、同一ホスト上に同じシャードはコピーしない
* この時点の後で、ノードが停止したら、再起動し、同じ役割が再開されるべきです。（Zookeeperでそれ自身であると判別されれば）

</li>
</ol>













原文はこちらからです。




**<span style="font-size:medium;">Boot Strapping**

**<span style="font-size:small;">Cluster Startup**

A node is started pointing to a Zookeeper host and port. The first node in the cluster may be started with cluster configuration properties and the schema/config files for the cluster. The first node would upload the configuration into zookeeper and bootstrap the cluster. The cluster is deemed to be in the “bootstrap” state. In this state, the node -&gt; partition mapping is not computed and the cluster does not accept any read/write requests except for clusteradmin commands.

After the initial set of nodes in the cluster have started up, a clusteradmin command (TBD description) is issued by the administrator. This command accepts an integer “partitions” parameter and it performs the following steps:

1. Acquire the Cluster Lock
1. Allocate the “partitions” number of partitions
1. Acquires nodes for each partition
1. Updates the node -&gt; partition mapping in ZooKeeper
1. Release the Cluster Lock
1. Informs all nodes to force update their own node -&gt; partition mapping from ZooKeeper
1. The Cluster Lock is acquired
1. A suitable source (node, partition) tuple is chosen:
1. The list of available partitions are scanned to find partitions which has less then “replication_factor” number of nodes. In case of tie, the partition with the least number of nodes is selected. In case of another tie, a random partition is chosen.
1. If all partitions have enough replicas, the nodes are scanned to find one which has most number of partitions. In case of tie, of all the partitions in such nodes, the one which has the most number of documents is chosen. In case of tie, a random partition on a random node is chosen.
1. If moving the chosen (node, partition) tuple to the current node will decrease the maximum number of partition:node ratio of the cluster, the chosen tuple is returned.Otherwise, no (node, partition) is chosen and the algorithm terminates
1. The node -&gt; partition mapping is updated in ZooKeeper

<li>The node status in ZooKeeper is updated to “recovery” state</li>
<li>The Cluster Lock is released</li>
<li>A “recovery” is initiated against the leader of the chosen partition</li>
<li>After the recovery is complete, the Cluster Lock is acquired again</li>
<li>The source (node, partition) is removed from the node -&gt; partition map in ZooKeeper</li>
<li>The Cluster Lock is released</li>
<li>The source node is instructed to force refresh the node -&gt; partition map from ZooKeeper</li>
<li>Goto step #1</li>
</ol>

<span style="font-size:small;">**Node Restart**

A node restart can mean one of the following things:

* The JVM crashed and was manually or automatically restarted
* The node was in a temporary network partition and either could not reach ZooKeeper (and was supposed to be dead) or could not receive updates from the leader for a period of time. A node restart ine node failure.
* Lifecycle of a Write Operation this scenario signifies the removal of the network partition.
* A hardware failure or maintenance window caused the removal of the node from the cluster and the node has been started again to rejoin the cluster.


The node reads the list of partitions for which it is a member and for each partition, starts a recovery process from each partition’s leader respectively. Then, the node follows the steps in the New Node section without checking for the auto_add_new_nodes property. This ensures that the cluster recovers from the imbalance created by th

Writes are performed by clients using the standard Solr update formats. A write operation can be sent to any node in the cluster. The node uses the hash_function , and the Range-Partition mapping to identify the partition where the doc belongs to. A zookeeper lookup is performed to identify the leader of the shard and the operation is forwarded there. A SolrJ enhancement may enable it to send the write directly to the leader

The leader assigns the operation a Partition Version and writes the operation to its transaction log and forwards the document + version + hash to other nodes belonging to the shard. The nodes write the document + hash to the index and record the operation in the transaction log. The leader responds with an ‘OK’ if at least min_writes number of nodes respond with ‘OK’. The min_writes in the cluster properties can be overridden by specifying it in the write request.

The cloud mode would not offer any explicit commit/rollback operations. The commits are managed by auto-commits at intervals (commit_within) by the leader and triggers a commit on all members on the shard. The latest version available to a node is recorded with the commit point.

<span style="font-size:medium;">**Transaction Log**

* A transaction log records all operations performed on an Index between two commits
* Each commit starts a new transaction log because a commit guarantees durability of operations performed before it
* The sync can be tunable e.g. flush vs fsync by default can protect against JVM crashes but not against power failure and can be much faster


**<span style="font-size:medium;">Recovery**

A recovery can be triggered during:

* Bootstrap
* Partition splits
* Cluster re-balancing


The node starts by setting its status as ‘recovering’. During this phase, the node will not receive any read requests but it will receive all new write requests which shall be written to a separate transaction log. The node looks up the version of index it has and queries the ‘leader’ for the latest version of the partition. The leader responds with the set of operations to be performed before the node can be in sync with the rest of the nodes in the shard.

This may involve copying the index first and replaying the transaction log depending on where the node is w.r.t the state of the art. If an index copy is required, the index files are replicated first to the local index and then the transaction logs are replayed. The replay of transaction log is nothing but a stream of regular write requests. During this time, the node may have accumulated new writes, which should then be played back on the index. The moment the node catches up with the latest commit point, it marks itself as “ready”. At this point, read requests can be handled by the node.

**<span style="font-size:small;">Handling Node Failures**

There may be temporary network partitions between some nodes or between a node and ZooKeeper. The cluster should wait for some time before re-balancing data.

**Leader failure**

If node fails and if it is a leader of any of the shards, the other members will initiate a leader election process. Writes to this partition are not accepted until the new leader is elected. Then it follows the steps in non-leader failure

**Non-Leader failure**

The leader would wait for the min_reaction_time before identifying a new node to be a part of the shard. The leader acquires the Cluster Lock and uses the node-shard assignment algorithm to identify a node as the new member of the shard. The node -&gt; partition mapping is updated in ZooKeeper and the cluster lock is released. The new node is then instructed to force reload the node -&gt; partition mapping from ZooKeeper.

**<span style="font-size:medium;">Splitting partitions**

A partition can be split either by an explicit cluster admin command or automatically by splitting strategies provided by Solr. An explicit split command may give specify target partition(s) for split.

Assume the partition ‘X’ with hash range 100 - 199 is identified to be split into X (100 - 149) and a new partition Y (150 - 199). The leader of X records the split action in ZooKeeper with the new desired range values of X as well as Y. No nodes are notified of this split action or the existence of the new partition.

1. The leader of X, acquires the Cluster Lock and identifies nodes which can be assigned to partition Y (algorithm TBD) and informs them of the new partition and updates the partition -&gt; node mapping. The leader of X waits for the nodes to respond and once it determines that the new partition is ready to accept commands, it proceeds as follows:
1. The leader of X suspends all commits until the split is complete.
1. The leader of X opens an IndexReader on the latest commit point (say version V) and instructs its peers to do the same.
1. The leader of X starts streaming the transaction log after version V for the hash range 150 - 199 to the leader of Y.
1. The leader of Y records the requests sent in #2 in its transaction log only i.e. it is not played on the index.
1. The leader of X initiates an index split on the IndexReader opened in step #2.
1. The index created in #5 is sent to the leader of Y and is installed.
1. The leader of Y instructs its peers to start recovery process. At the same time, it starts playing its transaction log on the index.
1. Once all peers of partition Y have reached at least version V:
1. The leader of Y asks the leader of X to prepare a FilteredIndexReader on top of the reader created in step #2 which will have documents belonging to hash range 100 - 149 only.
1. Once the leader of X acknowledges the completion of request in #8a, the leader of Y acquires the Cluster Lock and modifies the range -&gt; partition mapping to start receiving regular search/write requests from the whole cluster.
1. The leader of Y asks leader of X to start using the FilteredIndexReader created in #8a for search requests.
1. The leader of Y asks leader of X to force refresh the range -&gt; partition mapping from ZooKeeper. At this point, it is guaranteed that the transaction log streaming which started in #3 will be stopped.

</li>
<li>The leader of X will delete all documents with hash values not belonging to its partitions, commits and re-opens the searcher on the latest commit point.</li>
<li>At this point, the split is considered complete and leader of X resumes commits according to the commit_within parameters.</li>
</ol>

Notes:

* The partition being split does not honor commit_within parameter until the split operation completes
* Any distributed search operation performed starting at the time of #8b and till the end of #8c can return inconsistent results i.e. the number of search results may be wrong.


**<span style="font-size:medium;">Cluster Re-balancing**

The cluster can be rebalanced by an explicit cluster admin command.

TBD

**<span style="font-size:medium;">Monitoring**

TBD

**<span style="font-size:medium;">Configuration**

<span style="font-size:small;">**solr_cluster.properties**

This are the set of properties which are outside of the regular Solr configuration and is applicable across all nodes in the cluster:

* **replication_factor** : The number of replicas of a doc maintained by the cluster
* **min_writes** : Minimum no:of successful writes before the write operation is signaled as successful . This may me overridden on a per write basis
* **commit_within** : This is the max time within which write operation is visible in a search
* **hash_function** : The implementation which computes the hash of a given doc
* **max_hash_value** : The maximum value that a hash_function can output. Theoretically, this is also the maximum number of partitions the cluster can ever have
* min_reaction_time : The time before any reallocation/splitting is done after a node comes up or goes down (in secs)
* **min_replica_for_reaction** : If the number of replica nodes go below this threshold the splitting is triggered even if the min_reaction_time is not met
* **auto_add_new_nodes** : A Boolean flag. If true, new nodes are automatically used as read replicas to existing partitions, otherwise, new nodes sit idle until the cluster needs them.


<span style="font-size:medium;">**Cluster Admin Commands**

All cluster admin commands run on all nodes at a given path (say /cluster_admin). All nodes are capable of accepting the same commands and the behavior would be same. These are the public commands which a user can use to manage a cluster:

* **init_cluster** : (params : partition) This command is issued after the initial set of nodes are started. Till this command is issued, the cluster would not accept any read/write commands
* **split_partition** : (params : partitionoptional). The partition is split into two halves. If the partition parameter is not supplied, the partition with the largest number of documents is identified as the candidate.
* **add_idle_nodes** : This can be used if auto_add_new_nodes=false. This command triggers the addition of all ‘idle’ nodes to the cluster.
* **move_partition** : (params : partition, from, to). Move the given partition from a given node from to another node
* **command_status** :(params : completion_idoptional) . All the above commands are asynchronous and returns with a completion_id . This command can be used to know the status of a particular running command or all the current running commands
* **status** : (params : partitionoptional) Shows the list of partitions and for each partition, the following info is provided
* leader node
* nodes list
* doc count
* average reads/sec
* average writes/sec
* average time/read
* average time/write

</li>
</ul>

**<span style="font-size:medium;">Migrating from Solr to SolrCloud**

A few features may be redundant or not supported when we move to cloud such as. We should continue to support the non cloud version which supports all the existing features

* Replication. This feature is not required anymore
* CoreAdmin commands. Explicit manipulation of cores will not be allowed. Though cores may exist internally and they meay be managed implicitly
* Multiple schema support ? Should we just remove it from ver 1.0 for simplicity?
* solr.xml . Is there a need at all for this in the cloud mode?


**<span style="font-size:medium;">Alternative to a Cluster Lock**

It may be simpler to have a coordinator node (we avoid the term master since that is associated with traditional index replication) that is established via leader election. Following a pattern of treating the zookeeper state as the "truth" and having nodes react to changes in that state allow for more future flexibility (such as allowing an external management tool directly change the zookeeper state to control the cluster). Having a coordinator (as opposed to grabbing a lock every time) can be more scalable too. A hybrid model where a cluster lock is used only in certain circumstances can also make sense.

**<span style="font-size:medium;">Single Node Simplest Use Case**

We should be able to easily start up a single node and start indexing documents. At a later point in time, we should be able to start up a second node and have it join the cluster.

start up a single node, upload it's configuration (the first time) to zookeeper, and create+assign the node to shard1.
in the absence of other information when the config is created, a single shard system is assumed
index some documents
start up another node and pass it a parameter that says "if you are not already assigned, assign yourself to any shard that has the lowest number of replicas and start recovery process"
avoid replicating a shard on the same host if possible
after this point, one should be able to kill the node and start it up again and have it resume the same role (since it should see itself in zookeeper)
