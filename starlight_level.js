function dummyaction(){return false;}

var secsPerSong = 180;

function getExp(level){

 var totalExpPoint = 0;
 for(n=1;n<level;n++){
  if(n<50){totalExpPoint+=(10 * ((2 * n)+1));}
  else if(n<150){totalExpPoint+=(20 * (n+(25 * Math.floor(n/50))));}
  else if(n<160){totalExpPoint+=(20 * (n+(5 * Math.floor(n/10))));}
  else if(n<250){totalExpPoint+=(20 * (n+110+(35 * Math.floor((n-160)/10))));}
  else if(n == 250){totalExpPoint+=(20 * (n+109+(35 * Math.floor((n-161)/10))));}
  else if(n<300){totalExpPoint+=(20 * (n+109+(35 * Math.floor((n-161)/10))));}
  else{totalExpPoint+=0;}
 }

 var k = level;

 if(k<50){expPoint=(10 * ((2 * k)+1));}
 else if(k<150){expPoint=(20 * (k+(25 * Math.floor(k/50))));}
 else if(k<160){expPoint=(20 * (k+(5 * Math.floor(k/10))));}
 else if(k<250){expPoint=(20 * (k+110+(35 * Math.floor((k-160)/10))));}
 else if(k == 250){expPoint=(20 * (k+109+(35 * Math.floor((k-161)/10))));}
 else if(k<300){expPoint=(20 * (k+109+(35 * Math.floor((k-161)/10))));}
 else{expPoint=0;}
 

 return new Array(expPoint,totalExpPoint);
}


function maxPointsByLevel(level){
 
 var basePoint = 40;
 var maxPoint = basePoint;
 var k = 1;
 while(k <= 300){
  k++;
  if(k <= 20){
   if(k % 2 == 0){maxPoint++;}
  }else if(k <= 50){
    if(k % 3 == 0){maxPoint++;}
  }else if(k <= 90){
    if(k % 4 == 0){maxPoint++;}
  }else if(k <= 140){
    if(k % 5 == 0){maxPoint++;}
  }else if(k <= 300){
    if(k % 10 == 0){maxPoint++;}
  }else{
   maxPoint = 0;
   break;
  }
  if(k == level){break;}

 }
 
 return Math.floor(maxPoint);
}



function getElapsedTime(timeInSecs0){

 var timeInSecs = Math.floor(timeInSecs0) % 60;
 var timeInMins0 = (timeInSecs0 / 60);
 var timeInMins = Math.floor(timeInMins0) % 60;
 var timeInHours0 = (timeInSecs0 / 3600);
 var timeInHours = Math.floor(timeInHours0) % 24;
 var timeInDays0 = (timeInSecs0 / 86400);
 var timeInDays = Math.floor(timeInDays0);

 return new Array(timeInDays,timeInHours,timeInMins,timeInSecs);
}

function calcExp(){
 var levelnow = new Number(document.getElementById("now_prodlevel").value);
 var levelto = new Number(document.getElementById("dest_prodlevel").value);
 var enow = getExp(levelnow);
 var eto = getExp(levelto);

 if(levelnow > levelto){document.getElementById("dest_prodlevel").value = levelnow;}
 if(levelnow > 300){document.getElementById("now_prodlevel").value = 300;}
 if(levelto > 300){document.getElementById("dest_prodlevel").value = 300;}

 var etotal = Math.abs(eto[1] - enow[1]);
 var unit_exp = new Number(document.getElementById("unit_livepoint").value);
 var unit_lp = (10+document.getElementById("unit_livepoint").selectedIndex);

 var recLevelup_lp = 0;
 for(x=levelnow+1;x<=levelto;x++){recLevelup_lp += maxPointsByLevel(x);}

 var totallives_livepoint = (etotal / unit_exp);
 var totallives_masterplus = (etotal / 70);

 var elapsed_livepoint = getElapsedTime(Math.ceil(totallives_livepoint) * secsPerSong);
 var elapsed_masterplus = getElapsedTime(Math.ceil(totallives_masterplus) * secsPerSong);

 var total_livepoint = unit_lp * Math.ceil(totallives_livepoint);

 document.getElementById("livepoint_lives").innerHTML = Math.ceil(totallives_livepoint);
 document.getElementById("total_livepoint").innerHTML = total_livepoint;
 document.getElementById("masterplus_lives").innerHTML = Math.ceil(totallives_masterplus);

 document.getElementById("elapsed_livepoint").innerHTML = elapsed_livepoint[0]+"일 "+elapsed_livepoint[1]+"시간 "+elapsed_livepoint[2]+"분";
 document.getElementById("elapsed_masterplus").innerHTML = elapsed_masterplus[0]+"일 "+elapsed_masterplus[1]+"시간 "+elapsed_masterplus[2]+"분";

 document.getElementById("exp_levelup_from").innerHTML = "레벨업 경험치: "+enow[0]+" / 총경험치: "+enow[1];
 document.getElementById("exp_levelup_to").innerHTML = "레벨업 경험치: "+eto[0]+" / 총경험치: "+eto[1];

 document.getElementById("livepoint_recovery_up").innerHTML = recLevelup_lp;

}

function calcLevelup(){

 var levelnow = new Number(document.getElementById("now_prodlevel_todo").value);
 var expnow = new Number(document.getElementById("prodlevel_expnow").value);
 
 var levelup = getExp(levelnow);

 var explevelup = levelup[0];
 var expfrom = levelup[1]+expnow;

 document.getElementById("prodlevel_maxexp").innerHTML = explevelup;
 
 var unit_exp = new Number(document.getElementById("unit_livepoint_todo").value);
 var unit_lp = (10+document.getElementById("unit_livepoint_todo").selectedIndex);

 var totallives_livepoint = new Number(document.getElementById("livepoint_lives_todo").value);
 var totallives_masterplus = new Number(document.getElementById("masterplus_lives_todo").value);

 var totalexp_livepoint = (unit_exp * totallives_livepoint);
 var totalexp_masterplus = (70 * totallives_masterplus);


 var business_normal =  document.getElementById("unit_business_normal").value.split(",");
 var business_special =  document.getElementById("unit_business_special").value.split(",");

 var totalbusinesses_normal = new Number(document.getElementById("business_normal_todo").value);
 var totalexp_business_normal = (business_normal[1] * totalbusinesses_normal);

 var totalbusinesses_special = new Number(document.getElementById("business_special_count").value);
 var totalexp_business_special = (business_special[1] * totalbusinesses_special);


 var totalexp_accmulated = totalexp_livepoint + totalexp_masterplus + totalexp_business_normal + totalexp_business_special;

 var expto = expfrom+totalexp_accmulated;

 var elapsed_livepoint = totallives_livepoint * secsPerSong;
 var elapsed_masterplus = totallives_masterplus * secsPerSong;
 var elapsed_lives_todo = getElapsedTime(elapsed_livepoint + elapsed_masterplus);


 var elapsed_business_normal = totalbusinesses_normal * business_normal[0];
 var elapsed_business_special = totalbusinesses_special * business_special[0];
 var elapsed_business_todo = getElapsedTime(elapsed_business_normal + elapsed_business_special);

 var totallivepoint_business = (elapsed_business_normal + elapsed_business_special) / 900;

 
 var x = 0;
 var dest;
 var expdest = 0;
 while(getExp(++x)[1] <= expto){
  if(x > 300){break;}
 }


 var exp_destlevel = getExp(--x);

 var exp_dest = expto-exp_destlevel[1];
 if(x == 300){exp_dest = 0;}
 
 document.getElementById("elapsed_lives_todo").innerHTML = elapsed_lives_todo[0]+"일 "+elapsed_lives_todo[1]+"시간 "+elapsed_lives_todo[2]+"분";
 document.getElementById("elapsed_business_todo").innerHTML = elapsed_business_todo[0]+"일 "+elapsed_business_todo[1]+"시간 "+elapsed_business_todo[2]+"분";
 document.getElementById("totallivepoint_business").innerHTML = totallivepoint_business;
 document.getElementById("totalexp_accmulated").innerHTML = totalexp_accmulated;
 document.getElementById("dest_prodlevel_todo").innerHTML = x;
 document.getElementById("exp_prodlevel_todo").innerHTML = "경험치 "+exp_dest+" / "+exp_destlevel[0];

 if(x == 300){document.getElementById("exp_progress").style.width = "100%";}
 else{document.getElementById("exp_progress").style.width = Math.ceil(100 * (exp_dest / exp_destlevel[0]))+"%";}

}

function specialBusinessCount(){
 var selValues = document.getElementById("unit_business_special").value.split(",");
 var addCount = document.getElementById("business_special_count");
 
 addCount.length = 0;
 for(c=0;c<=selValues[2];c++){
  var countValue = document.createElement("option");
  countValue.text = c;
  countValue.value = c;
  addCount.add(countValue);
 }
calcLevelup();
}


function initCalc(){
 calcExp();
 calcLevelup();
 specialBusinessCount();
}