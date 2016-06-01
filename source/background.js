// console.log("load background.js");

//有効無効フラグ
var enable = true;

//ポップアップウィンドウ
var popup = null;


//設定値を復元
var defaultValues = {enable : true}; //デフォルト値
chrome.storage.sync.get(defaultValues,function(values){
	//有効・無効の復元
	enable = values.enable;
	changeIconEnable();
});


//この機能のアイコンをクリックされたときのイベント
chrome.browserAction.onClicked.addListener(
	function(tab){
		
		enable = !enable; // on/off切り替え
		
		//アイコン切り替え
		changeIconEnable();

		//storageに保存
		var values = { enable : enable };
		chrome.storage.sync.set(values, function(){});

		// //送信する
		// chrome.tabs.sendRequest(tab.id, 
		// 	{ 
		// 		//送信データ
		// 		enable: enable
		// 	},
		// 	function(response) {
		// 		//受信側からレスポンスが返ってきた時にする処理を記述
		// 	}
		// );

	}
);

//有効無効のアイコン切り替え
function changeIconEnable() {
	if (enable) {
	  chrome.browserAction.setIcon({"path":"icon48.png"});
	} else {
	  chrome.browserAction.setIcon({"path":"icon48off.png"});
	}
}

//script.jsからメッセージを受け取る
chrome.runtime.onMessage.addListener(function( message, sender, sendResponse ) {
	if( message.seltext ){
		if (enable) {
			openSearchWindow(message.seltext);
		}
	}
});


chrome.tabs.onRemoved.addListener(function(tabId,removeInfo){
	// console.log("chrome.tabs.onRemoved");
	if (tabId == popup.tabs[0].id) {
		popup = null;
	}
});


//ポップアップを開く
function openSearchWindow(seltext) {
	// console.log(seltext,popup);

	var url = "https://www.google.co.jp/search?tbm=isch&q="+encodeURIComponent(seltext);

	//タブ有効チェック
	if (popup) {
		chrome.tabs.get(popup.tabs[0].id,function(tab){
			// 開いているタブを更新
			chrome.tabs.update(popup.tabs[0].id,{url:url});
		});
	} else {
		chrome.windows.create({
			url: url,
			width:1200,
			height:600,
		}, function(window){
			popup = window;
		});
	}

}
