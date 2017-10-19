$(document).ready(function(){
		var sMinCache,sSecCache,bMinCache,bSecCache;
		var sMin=Number($('.sessionTime span').html()),bMin=Number($('.breakTime span').html());//字符串要转化为数字
		//注意，在计时开始后，再点击start是否会产生计时紊乱。
		var timerId=null;
		var sminTime=sMin,ssecTime=0,bminTime=bMin,bsecTime=0;

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
			}else if(ssecTime!=0){
				ssecTime--;
			}else if(ssecTime==0 && sminTime==0){
				//stop
				clearInterval(timerId);//停止时，显示为00:00
				sminTime=sMin,ssecTime=0;
				//执行break的倒计时
				breakCount();
			}
			//console.log('session定时器里面timerId='+timerId);
			$('.timeDisplay span').html(dbNum(sminTime)+":"+dbNum(ssecTime));
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
				}else if(bsecTime!=0){
					bsecTime--;
				}else if(bsecTime==0 && bminTime==0){
					clearInterval(timerId);
					bminTime=bMin,bsecTime=0;
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
});