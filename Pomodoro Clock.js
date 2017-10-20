$(document).ready(function(){
		var sMinCache,sSecCache,bMinCache,bSecCache;
		var sMin=Number($('.sessionTime span').html()),bMin=Number($('.breakTime span').html());//字符串要转化为数字
		//注意，在计时开始后，再点击start是否会产生计时紊乱。
		var timerId=null;
		var sminTime=sMin,ssecTime=0,bminTime=bMin,bsecTime=0;
		var audio1=new Audio("https://github.com/riversword/audio/raw/master/Button48.wav");

	$('.controls button:eq(0)').click(function(){
		$('.controls button:eq(0)').css('display','none');
		$('.controls button:eq(1)').css('display','inline-block');
		if($('.timeDisplay h2').html()=="session"){
			sessionCount();
		}else{breakCount();}
	});
	$('.controls button:eq(1)').click(function(){
		$('.controls button:eq(1)').css('display','none');
		$('.controls button:eq(0)').css('display','inline-block');
		clearInterval(timerId);
		sminTime=sMin,ssecTime=0,bminTime=bMin,bsecTime=0;
		$('.timeDisplay h2').html("session");
		$('.timeDisplay span').html(dbNum(sMin)+":"+'00');
		$('.timeDisplay').css('background','none');//背景颜色初始化
	});
	//注意，在计时开始后，点击改变session或break的时长是否会对当前正在进行中的倒计时造成影响。计时开始后，再点击改变时长，不会影响当前计时，在下一次计时才会产生影响。
	$('.sessionTime button:eq(0)').click(function(){
		if(sMin!=0){
			clearInterval(timerId);
			sMin--;
			$('.sessionTime span').html(dbNum(sMin));
			$('.controls button:eq(1)').css('display','none');
			$('.controls button:eq(0)').css('display','inline-block');
			sminTime=sMin,ssecTime=0;
			//若当前是session/break时间
			if($('.timeDisplay h2').html()=='session'){
				$('.timeDisplay span').html(dbNum(sMin)+":00");
				$('.timeDisplay').css('background','none');//背景颜色初始化
			}
		}
	});
	$('.sessionTime button:eq(1)').click(function(){
		clearInterval(timerId);
		sMin++;
		$('.sessionTime span').html(dbNum(sMin));
		$('.controls button:eq(1)').css('display','none');
		$('.controls button:eq(0)').css('display','inline-block');
		sminTime=sMin,ssecTime=0;
		if($('.timeDisplay h2').html()=='session'){
				$('.timeDisplay span').html(dbNum(sMin)+":00");
				$('.timeDisplay').css('background','none');//背景颜色初始化
			}
	});
	$('.breakTime button:eq(0)').click(function(){
		if(bMin!=0){
			clearInterval(timerId);
			bMin--;
			$('.breakTime span').html(dbNum(bMin));
			$('.controls button:eq(1)').css('display','none');
			$('.controls button:eq(0)').css('display','inline-block');
			bminTime=bMin,bsecTime=0;
			if($('.timeDisplay h2').html()=='break'){
				$('.timeDisplay span').html(dbNum(bMin)+":00");
				$('.timeDisplay').css('background','none');//背景颜色初始化
			}
		}
	});
	$('.breakTime button:eq(1)').click(function(){
		clearInterval(timerId);
		bMin++;
		$('.breakTime span').html(dbNum(bMin));
		$('.controls button:eq(1)').css('display','none');
		$('.controls button:eq(0)').css('display','inline-block');
		bminTime=bMin,bsecTime=0;
		if($('.timeDisplay h2').html()=='break'){
				$('.timeDisplay span').html(dbNum(bMin)+":00");
				$('.timeDisplay').css('background','none');//背景颜色初始化
			}
	});
	//session倒计时
	function sessionCount(){
		//var sminTime=sMin,ssecTime=0;
		$('.timeDisplay h2').html("session");
		$('.timeDisplay span').html(dbNum(sminTime)+":"+dbNum(ssecTime));
		timerId=setInterval(function(){
			if(ssecTime==0 && sminTime!=0){
				ssecTime=59;
				sminTime--;
				sessionAnimate();
			}else if(ssecTime!=0){
				ssecTime--;
				sessionAnimate();
			}else if(ssecTime==0 && sminTime==0){//显示为00:00 停止
				//stop
				clearInterval(timerId);
				sminTime=sMin,ssecTime=0;//要先执行时间进度动画，再初始化
				a1play();
				setTimeout(function(){a1stop();},500);
				//执行break的倒计时
				breakCount();
			}
			$('.timeDisplay span').html(dbNum(sminTime)+":"+dbNum(ssecTime));
			//console.log('session定时器里面timerId='+timerId);
		},1000);
		//console.log('session定时器外面timerId='+timerId);
		//console.log('session结束后timerId='+timerId);
	}
	//break倒计时
	function breakCount(){
		//var bminTime=bMin,bsecTime=0;
		$('.timeDisplay h2').html("break");
		$('.timeDisplay span').html(dbNum(bMin)+":"+dbNum(bsecTime));
		timerId=setInterval(function(){
				if(bsecTime==0 && bminTime!=0){
					bsecTime=59;
					bminTime--;
					breakAnimate();
				}else if(bsecTime!=0){
					bsecTime--;
					breakAnimate();
				}else if(bsecTime==0 && bminTime==0){
					clearInterval(timerId);
					breakAnimate();
					bminTime=bMin,bsecTime=0;
					a1play();
					setTimeout(function(){a1stop();},500);
					sessionCount();//执行session倒计时
				}
				//console.log('break定时器里面timerId='+timerId);
				$('.timeDisplay span').html(dbNum(bminTime)+":"+dbNum(bsecTime));
			},1000);
		//console.log('break结束后timerId='+timerId);
	}
	//转换为2位数
	function dbNum(a){
		if(a<10){
			return "0"+a;
		}else return a;
	}
	//播放音效
	function a1play(){
		audio1.play();
	}
	//停止音效
	function a1stop(){
		audio1.currentTime=0;
		audio1.pause();
	}
	//设置session时间进度动画
	function sessionAnimate(){
		var a=sminTime*60+ssecTime;
		var percent=100*(1-a/sMin/60);
		/*$('.timeDisplay').css({
				'background':'-webkit-linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(255,255,255,1) '+percent+'% )',
				'background':'-o-linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(255,255,255,1) '+percent+'% )',
				'background':'-moz-linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(255,255,255,1) '+percent+'% )',
				'background':'linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(255,255,255,1) '+percent+'% )'
			});*/
		$('.timeDisplay').css('background','-webkit-linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(0,0,0,0.8) '+percent+'% )');
	}
	//设置break时间进度动画
	function breakAnimate(){
		var a=bminTime*60+bsecTime;
		var percent=100*(1-a/bMin/60);
		$('.timeDisplay').css('background','-webkit-linear-gradient(top,rgba(0,0,0,0.8) 0%,'+'rgba(0,0,0,0.8) '+percent+'%,rgba(0,255,200,0.5) '+percent+'% )');
	}
});