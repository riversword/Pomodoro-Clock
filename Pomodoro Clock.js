$(document).ready(function(){
	var sMinCache,sSecCache,bMinCache,bSecCache,
		sMin=Number($('.sessionTime span').html()),
		bMin=Number($('.breakTime span').html()),// transform the string into num
		timerId=null;
	var sminTime=sMin,
		ssecTime=0,
		bminTime=bMin,
		bsecTime=0;
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
		$('.timeDisplay').css('background','none'); //reset the background color
	});
	
	$('.sessionTime button:eq(0)').click(function(){
		if(sMin!=0){
			clearInterval(timerId);
			sMin--;
			$('.sessionTime span').html(dbNum(sMin));
			$('.controls button:eq(1)').css('display','none');
			$('.controls button:eq(0)').css('display','inline-block');
			sminTime=sMin,ssecTime=0;

			//when current time is session
			if($('.timeDisplay h2').html()=='session'){
				$('.timeDisplay span').html(dbNum(sMin)+":00");
				$('.timeDisplay').css('background','none'); 
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
				$('.timeDisplay').css('background','none');
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
				$('.timeDisplay').css('background','none');
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
				$('.timeDisplay').css('background','none');
			}
	});
	
	function sessionCount(){
		
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
			}else if(ssecTime==0 && sminTime==0){//when the current time is 00:00, stop
				clearInterval(timerId);
				sminTime=sMin,ssecTime=0; //time reset
				a1play();
				setTimeout(function(){a1stop();},500);
				breakCount();
			}
			$('.timeDisplay span').html(dbNum(sminTime)+":"+dbNum(ssecTime));
	
		},1000);
		
	}
	
	function breakCount(){
		
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
					sessionCount();
				}
				
				$('.timeDisplay span').html(dbNum(bminTime)+":"+dbNum(bsecTime));
			},1000);
		
	}
	//transform number into double-digit
	function dbNum(a){
		if(a<10){
			return "0"+a;
		}else return a;
	}

	//play audio
	function a1play(){
		audio1.play();
	}

	//stop audio
	function a1stop(){
		audio1.currentTime=0;
		audio1.pause();
	}

	function sessionAnimate(){
		var a=sminTime*60+ssecTime;
		var percent=100*(1-a/sMin/60);
		/*$('.timeDisplay').css({
				'background':'-webkit-linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(255,255,255,1) '+percent+'% )',
				'background':'-o-linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(255,255,255,1) '+percent+'% )',
				'background':'-moz-linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(255,255,255,1) '+percent+'% )',
				'background':'linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,rgba(255,255,255,1) '+percent+'% )'
			});*/
		$('.timeDisplay').css('background','-webkit-linear-gradient(bottom,rgba(255,0,0,0.5) 0%,'+'rgba(255,0,0,0.5) '+percent+'%,transparent '+percent+'% )');
	}
	
	function breakAnimate(){
		var a=bminTime*60+bsecTime;
		var percent=100*(1-a/bMin/60);
		$('.timeDisplay').css('background','-webkit-linear-gradient(top,transparent 0%,'+'transparent '+percent+'%,rgba(0,255,200,0.5) '+percent+'% )');
	}
});