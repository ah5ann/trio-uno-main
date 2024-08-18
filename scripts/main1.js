setTimeout(function () {
    element = document.getElementById("load");
  
    element.classList.add("waa");
  }, 3000);
  function closeDialog() {
          let d = document.getElementById('myModal')
          d.style.display = "none"
          //d.close()
      }
  function myFunction4() {
     var element = document.getElementById("section");
     var checkBox = document.getElementById("myCheck");
     var text = document.getElementById("dmo");
     element.classList.toggle("dark-mode");
     document.getElementById("kbbox").style.background="#606060";
     if (checkBox.checked == true){
      document.getElementById("dmo").innerHTML = "Classic Mode";
    } else {
       document.getElementById("dmo").innerHTML = "Dark Mode";
    }
  }
  
  // Get the modal
  var modala = document.getElementById("myModal");
  
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  
  // Get the <span> element that closes the modal
  var spanx = document.getElementsByClassName("closedx")[0];
  
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modala.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  // spanx.onclick = function() {
  //   modala.style.display = "none";
  // }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modala) {
      modala.style.display = "none";
    }
  }
      var todayx = new Date();
  var ddx = String(todayx.getDate()).padStart(2, '0');
  var mmx = String(todayx.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyyx = todayx.getFullYear();
  
  todayx = mmx + '/' + ddx + '/' + yyyyx;
  console.log("today is",ddx);
  if (ddx >= 22){
      console.log("yes",ddx)
      window.document.getElementById("tops").innerText = "history";
  }else{
     console.log("omg",ddx)
     window.document.getElementById("tops").innerText = "fun round";
  }
  
          var div=document.getElementById("bbb");
           
          setInterval(function(){ 
            var toDate=new Date();
            var tomorrow=new Date();
            tomorrow.setHours(24,0,0,0);
            var diffMS=tomorrow.getTime()/1000-toDate.getTime()/1000;
            var diffHr=Math.floor(diffMS/3600);
            diffMS=diffMS-diffHr*3600;
            var diffMi=Math.floor(diffMS/60);
            diffMS=diffMS-diffMi*60;
            var diffS=Math.floor(diffMS);
            var result=((diffHr<10)?"0"+diffHr:diffHr);
            result+=":"+((diffMi<10)?"0"+diffMi:diffMi);
            result+=":"+((diffS<10)?"0"+diffS:diffS);
            div.innerHTML=result;
  
          },1000);
  
          var div2=document.getElementById("bbb2");
           
          setInterval(function(){ 
            var toDate=new Date();
            var tomorrow=new Date();
            tomorrow.setHours(24,0,0,0);
            var diffMS=tomorrow.getTime()/1000-toDate.getTime()/1000;
            var diffHr=Math.floor(diffMS/3600);
            diffMS=diffMS-diffHr*3600;
            var diffMi=Math.floor(diffMS/60);
            diffMS=diffMS-diffMi*60;
            var diffS=Math.floor(diffMS);
            var result=((diffHr<10)?"0"+diffHr:diffHr);
            result+=":"+((diffMi<10)?"0"+diffMi:diffMi);
            result+=":"+((diffS<10)?"0"+diffS:diffS);
            div2.innerHTML=result;
  
          },1000);
  