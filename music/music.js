$(document).ready(function(){
//这里就是一些初始化的数据
var playlist = {
    "result": {
        "tracks": [
            {
                "name": "20岁的某一天",
                "artists": [
                    {
                        "name": "花粥",
                    }
                ],
                "album": {
                    "name": "20岁的你我",
                    "picUrl":"http://p3.music.126.net/SR9eFEjRB0NsscxN7-fHMw==/3344714372906000.jpg",
                    "duration":226000,
                    "mp3Url": "‪1.mp3"
                 }
            },
            {
                "name": "那个女孩",
                "artists": [
                    {
                        "name": "陶喆",
                    }
                ],
                "album": {
                    "name": "为爱而生",
                    "picUrl":"http://p3.music.126.net/SR9eFEjRB0NsscxN7-fHMw==/3344714372906000.jpg",
                    "duration":267000,
                    "mp3Url": "‪陶喆 - 那个女孩.mp3"
                   }
            },
            {
                "name": "像中枪了一样",
                "artists": [
                    {
                        "name": "辉灿",
                    }
                ],
                "album": {
                    "name": "小猪猪",
                    "picUrl":"http://p3.music.126.net/SR9eFEjRB0NsscxN7-fHMw==/3344714372906000.jpg",
                    "duration":235000,
                    "mp3Url": "aaa.mp3"
            }

            }
        ]
    }
};
		//当前播放器的状态
		//length:歌单里面的总的歌曲数目，index表示的是播放的第几首
		//time：当前播放的世间，Totaltime:总的播放时间
		//playstatus:表示的是其中的播放状态
		var playStatus ={
			length: playlist.result.tracks.length,
			index:0,
			time:0,
			Totaltime:0,
			playstatus:true
		};



		//这里就是一个时间转换的函数
		var timeChange = function(totaltime) {
			var minute = Math.floor(totaltime/60000);
			var second = Math.floor((totaltime-minute*60000)/1000);
			if(second<10){
				second="0"+second;
			}
		    totaltime=minute+":"+second;
		    return totaltime;
		};




		//这里是控制播放器的
		var playControls = {
			baseMessage:function(){
				var obj = playlist.result.tracks[playStatus.index];
				$(".player .trackInfo .name").text(obj.name);
				$(".player .trackInfo .artist").text(obj.artists[0].name);
				$(".player .trackInfo .album").text(obj.album.name);
				//$(".player .albumPic").css("background",'url'+args.albumPic+')');
				$(".time .current").text(timeChange(playStatus.time));
				$(".time .total").text(timeChange(obj.album.duration));
				console.log(obj.album.mp3Url);
				console.log(playStatus.index);
				console.log(obj);
				$("#audio source").attr('src',"aaa.mp3");
			},

			//这里需要注意的就是其中的play()和pause()方法就是直接控制播放暂停的
			playStatus:function(){
		        if(playStatus.playstatus){
		        	$('#audio')[0].play();
		        	//play()方法属于DOM对象方法，$('#audio')为jquery对象
		        	//两种转换方式将一个jQuery对象转换成DOM对象：[index]和.get(index); 
		        }
		        else{
		        	$('#audio')[0].pause();
		        }

			},


			//控制的是当前的进度和时间处理
			playTime:function(){
				$('.player .time .current').text(timeChange(playStatus.time));
				$('.play .progress').css('width',playStatus.time/playStatus.Totaltime*100+"%"); //同步进度条

			}

		};


		//这里进行的就是其中的一些初始化
		(function(){
			playControls.baseMessage();
			playControls.playStatus();
			$('.player .controls .play').click(function(){
				//修改其中播放状态
		         playStatus.playstatus=!playStatus.playstatus;
		         playControls.playStatus();
			});


			$('.player .controls .previous').click(function(){
				if(playStatus.index-1<0){
					// alert('没有上一首了！');
					return;
				}
				else{
					playStatus.index--;
				}
		        //我觉得里面的index的值已经修改了，这里只需要将其中音乐播放器的信息重置就可以了
		        $('#audio').remove();
                $('.player').append('<audio id="audio"><source src=""></audio>');  
		        playControls.baseMessage();
			    playControls.playStatus();

			});



			$('.player .controls .next').click(function(){
				if(playStatus.index+1>playStatus.length-1){
					// alert('这已经是最后一首');
					return ;
				}
				else{
					playStatus.index++;
				}

				$('#audio').remove();
                $('.player').append('<audio id="audio"><source src=""></audio>');     
				playControls.baseMessage();
			    playControls.playStatus();
			});




			//这里就是自动进行到下一曲
		   setInterval(function(){

		   	//这里利用current获取的时间是秒不是毫秒，这里必须进行转化
	        playStatus.time = $('#audio')[0].currentTime*1000;           
	        playControls.playTime();

	        if(playStatus.time >= playStatus.TotalTime){
	            $('.player .controls .next').click();
	        }
    }, 300);
	    })();
			
			
});
