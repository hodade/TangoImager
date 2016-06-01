$(function(){
	// console.log('load my extension');

	// //拡張機能のアイコンがクリックされたときの、有効・無効を受信する
	// chrome.extension.onRequest.addListener(
	//  	function(request, sender, sendResponse) {
	//     	enable = request.enable; //有効・無効の取得
	//     	sendResponse({}); //空でも返事を返す
	//     }
	// );

	//マウスのボタンを離した時のイベントを取得する
	window.addEventListener("mouseup", function(event) {
		if (event.button == 0) {
			//選択されているテキストを取得する
			var selobj = window.getSelection();
			if (selobj.anchorNode) {
				var seltext = selobj.toString();
				if (seltext != '') {
					//バックグラウンドにテキストを送る
					chrome.runtime.sendMessage({
						seltext: seltext
					});
				}
			}
		}
	});

});


