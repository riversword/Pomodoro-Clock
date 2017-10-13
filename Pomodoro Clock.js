$(document).ready(function(){
		var j=0,sMinCache,sSecCache,bMinCache,bSecCache;//j用来标记定时器的个数
		var sMin=Number($('.sessionTime span').html()),bMin=Number($('.breakTime span').html());//字符串要转化为数字
		//注意，在计时开始后，再点击start是否会产生计时紊乱。
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
		clearInterval(j);
		sminTime=sMin,ssecTime=0,bminTime=bMin,bsecTime=0;
		$('.timeDisplay h2').html("session");
		$('.timeDisplay span').html(dbNum(sMin)+":"+'00');
	});
	//注意，在计时开始后，点击改变session或break的时长是否会对当前正在进行中的倒计时造成影响。计时开始后，再点击改变时长，不会影响当前计时，在下一次计时才会产生影响。
	$('.sessionTime button:eq(0)').click(function(){
		if(sMin!=0){
			clearInterval(j);
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
		clearInterval(j);
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
			clearInterval(j);
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
		clearInterval(j);
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
		var sessionIn=setInterval(function(){
			if(ssecTime==0 && sminTime!=0){
				ssecTime=59;
				sminTime--;
			}else if(ssecTime!=0){
				ssecTime--;
			}else if(ssecTime==0 && sminTime==0){
				//stop
				clearInterval(sessionIn);//停止时，显示为00:00
				sminTime=sMin,ssecTime=0;
				//执行break的倒计时
				breakCount();
			}
			console.log('定时器里面sessionIn='+sessionIn);
			$('.timeDisplay span').html(dbNum(sminTime)+":"+dbNum(ssecTime));
		},1000);
		//console.log('定时器外面sessionIn='+sessionIn);
		j++;
		console.log('session结束后sessionIn='+sessionIn);
    	console.log("session结束后j="+j);
	}
	//break倒计时
	function breakCount(){
		//var bminTime=bMin,bsecTime=0;
		$('.timeDisplay h2').html("break");
		$('.timeDisplay span').html(dbNum(bMin)+":"+dbNum(bsecTime));
		var breakIn=setInterval(function(){
				if(bsecTime==0 && bminTime!=0){
					bsecTime=59;
					bminTime--;
				}else if(bsecTime!=0){
					bsecTime--;
				}else if(bsecTime==0 && bminTime==0){
					clearInterval(breakIn);
					bminTime=bMin,bsecTime=0;
					sessionCount();//执行session倒计时
				}
				console.log('定时器里面breakIn='+breakIn);
				$('.timeDisplay span').html(dbNum(bminTime)+":"+dbNum(bsecTime));
			},1000);
		j++;
		console.log('break结束后breakIn='+breakIn);
    	console.log("break结束后j="+j);
	}
	//转换为2位数
	function dbNum(a){
		if(a<10){
			return "0"+a;
		}else return a;
	}
});