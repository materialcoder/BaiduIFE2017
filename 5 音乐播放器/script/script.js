var musics = [
	{
		name: "成都",
		singer: "赵雷",
		pic:"img/bg2.jpg",
		path:"source/赵雷 - 成都.mp3"
	},
	{
		name: "理想",
		singer: "赵雷",
		pic:"img/bg.jpg",
		path:"source/赵雷 - 理想.mp3"
	},
	{
		name: "七月上",
		singer: "Jam",
		pic:"img/bg2.jpg",
		path:"source/Jam - 七月上.mp3"
	},
	{
		name: "童话镇",
		singer: "陈一发儿",
		pic:"img/bg.jpg",
		path:"source/陈一发儿 - 童话镇.mp3"
	}
];
var index=0, len = musics.length, $myMusic = $("#myMusic").get(0);

// 初始化播放器
change();

// 暂停和播放
$(".play").click(function() {
	$myMusic.play();
	$(this).hide();
	$('.pause').show();
	$('.bg').addClass('rotate');
});
$(".pause").click(function() {
	$myMusic.pause();
	$(this).hide();
	$('.play').show();
	$('.bg').removeClass('rotate');
});


//显示进度条
$myMusic.addEventListener("timeupdate",function(){
	var currentTime = this.currentTime; //当前播放时间
	var duration = this.duration; //歌曲总时间
	var w = $('.progress').width();
	var scale = currentTime/duration;
	var x = scale*w;
	var m = Math.floor(currentTime/60);
	var s = Math.floor(currentTime%60);
	if(s<10){
		s="0"+s;
	}
	if(m<10){
		m="0"+m;
	}
	$('.bar').css("width",x+"px");
	$('.time').text(m+":"+s);
	// 自动循环播放
	if(currentTime == duration) {
		index++;
		if(index>=len) {
			index=0;
		}
		change();
	}
});

// 拖拽进度条,快进操作
$('.progress').click(function(e){
	var scale = barChange(this,e,'.bar');
	$myMusic.currentTime = scale * $myMusic.duration;
});

// 音量控制 $myMusic.get(0).volume 从0到1
$('.v-progress').click(function(e){
	var scale = barChange(this,e,'.v-bar');
	$myMusic.muted = false;
	$myMusic.volume = scale;
});
$('.volume').click(function(){
	$myMusic.muted = true;
	$('.v-bar').css("width","0px");
})

//下一曲、下一曲
$('.next').click(function(){
	index++;
	if(index>=len) {
		index=0;
	}
	change();
});
$('.prev').click(function(){
	index--;
	if(index<0){
		index = len-1;
	}
	change();
});

// 进度条变化
function barChange(that,event,bar) {
	var w = $(that).width();
	var x = event.pageX;
	var l = $(that).offset().left;
	var left = x - l;
	var scale = left/w;
	$(bar).css('width',left+"px");
	return scale;
}

// 切换歌曲
function change() {
	$myMusic.src = musics[index].path;
	$('.name').text(musics[index].name);
	$('.singer').text(musics[index].singer);
	$('.pic').attr('src',musics[index].pic);
	$myMusic.currentTime=0;
	$('.bar').css('width','0px');
	if($('.play').css("display") == 'none') {
		$myMusic.play();
	}
}