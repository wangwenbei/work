var cd=document.getElementsByClassName('cd')[0],
    ab=document.getElementsByClassName('ab')[0],
    lis=ab.getElementsByTagName('li'),
    div=document.getElementsByClassName('cxgg');
 for (var i=0;i<lis.length;i++) {
     lis[i].onmouseover = function () {
         var silbing = utils.siblings(this);
         for (var i = 0; i < silbing.length; i++) {
             utils.removeClass(silbing[i], 'one');
         }
         utils.addClass(this, 'one');
         var index = utils.index(this);
         for (var j = 0; j < div.length; j++) {
             j == index ? utils.addClass(div[j], 'cx1') : utils.removeClass(div[j], 'cx1');
         }
     }
 };

var ss=document.getElementsByClassName('ss')[0],
    li=ss.getElementsByTagName('li'),
    divs=document.getElementsByClassName('it');

  for(var i=0;i<li.length;i++){
      li[i].onmouseover=function () {
          var silibing=utils.siblings(this);
          for (i=0;i<silibing.length;i++){
              utils.removeClass(silibing[i],'zz');

          }
          utils.addClass(this,'zz');
          var index=utils.index(this);
          for (var j=0;j<divs.length;j++){
              j==index?utils.addClass(divs[j],'it1'):utils.removeClass(divs[j],'it1');
          }
      }

  }

var pp=document.getElementsByClassName('pp')[0],
    ul=pp.getElementsByTagName('ul')[0],
    lis=ul.getElementsByTagName('li'),
    imgs=pp.getElementsByTagName('img'),
    focuse=pp.getElementsByTagName('ul')[1],
    li=focuse.getElementsByTagName('li'),
    left=pp.getElementsByClassName('left')[0],
    right=pp.getElementsByClassName('right')[0];

(function () {
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&xhr.status==200){
            window.data=utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);

})();

(function () {
    if(window.data){
        var str='';
        var str1='';
        for(var i=0;i<data.length;i++){
            str1+= i===0?'<li class="picFirst"><a href="###"><img src="'+data[i].src+'" relSrc=""></a></li>':'<li><a href="###"><img src="'+data[i].src+'" relSrc=""></a></li>';
            str+= i===0?'<li class="selected">'+(i+1)+'</li>':'<li>'+(i+1)+'</li>';
        }
        ul.innerHTML=str1;
        focuse.innerHTML=str;
    }

})();

(function () {
    for (var i=0;i<imgs.length;i++){
        var temp=new Image();
        temp.index=i;
        temp.src=imgs[i].getAttribute('relSrc');
        temp.onload=function () {
            var curImg=imgs[this.index];
            if(this.index===0){
                utils.css(curImg.parentNode.parentNode,'zIndex',1);
                animate(curImg.parentNode.parentNode,{opacity:1},200);
            }
            curImg.src=this.src;
            utils.css(curImg,'display','block');
        }
    }

})();

var step=0;
var timer=window.setInterval(autoMove,2000);
function autoMove() {
    step++;
    if(step===data.length){
      step=0;
    }
    setImg();
}
function setImg() {
    for(var i=0;i<imgs.length;i++){
        var curImg=imgs[i];
        if(i===step){
            utils.css(curImg.parentNode.parentNode,'zIndex',1);
            animate(curImg.parentNode.parentNode,{opacity:1},500,function () {
                var silbing=utils.siblings(this);
                for (var i=0;i<silbing.length;i++){
                    utils.css(silbing[i],'opacity',0);
                }
            })
        }else {
            utils.css(curImg.parentNode.parentNode,'zIndex',0);
        }
    }
    for (i=0;i<li.length;i++){
        li[i].className=i===step?'selected':'';
    }

}
pp.onmouseenter=function () {
    window.clearInterval(timer);
    left.style.display=right.style.display='block';
};

pp.onmouseleave=function () {
    timer=window.setInterval(autoMove,2000);
    left.style.display=right.style.display='none';
};

(function () {
    for (var i=0;i<li.length;i++){
        li[i].index=i;
        li[i].onclick=function () {
            step=this.index;
            setImg();
        }
    }

})();

left.onclick=function () {
    step--;
    if(step===-1){
        step=imgs.length-1;
    }
    setImg();
};

right.onclick=autoMove;


var div1=document.getElementsByClassName('teGui')[0],
    img=div1.getElementsByTagName('img'),
    a1=document.getElementById('l'),
    a2=document.getElementById('r');


(function () {
    var xhr=new XMLHttpRequest();
    xhr.open('get','data1.txt',false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&xhr.status==200){
            window.data1=utils.jsonParse(xhr.responseText)[0];
        }
    };
xhr.send(null);
})();

(function () {
    if(window.data1){
        var str2='';
        str2+='<ul class="cbanner clear" style="width:'+(data1.length+4)*199+'px">';
        for (var i=0;i<data1.length;i++){
            str2+='<li><a href="###"><img src="" relSrc="'+data1[i].src+'"></a></li>';
        }
        str2+='<li><a href="###"><img src="" relSrc="'+data1[0].src+'"></a></li>';
        str2+='<li><a href="###"><img src="" relSrc="'+data1[1].src+'"></a></li>';
        str2+='<li><a href="###"><img src="" relSrc="'+data1[2].src+'"></a></li>';
        str2+='<li><a href="###"><img src="" relSrc="'+data1[4].src+'"></a></li>';
        str2+='</ul>';
    }
    div1.innerHTML+=str2;
    window.ul1=div1.getElementsByTagName('ul')[0];
})();

(function () {
    for (var i=0;i<img.length;i++){
        var temp=new Image;
        temp.index=i;
        temp.src=img[i].getAttribute('relSrc');
        temp.onload=function () {
          img[this.index].src = this.src;
            utils.css(img[this.index],'display','block');
        }
    }

})();

var timer1=window.setInterval(autoMove1,2000);
var step1=0;
function autoMove1() {
    if(step1==2){
        step1=0;
        utils.css(ul1,'left',0)
    }
    step1++;
    animate(ul1,{'left':-step1*796},800);
}

div1.onmouseover=function () {
      if(timer1){
          window.clearInterval(timer1);
          a1.style.display=a2.style.display='block';
      }

};

div1.onmouseout=function () {
    timer1 = window.setInterval(autoMove1,2000);
    a1.style.display=a2.style.display='none';
};

div1.onclick=function (e) {
    if(e.target.className === 'l' ){
        step1--;
        if(step1===-1){
            step1=1;
            // utils.css(ul1,'left',(imgs.length-1)*-796);
            ul1.style.left = 2*-796+'px';

        }
        animate(ul1,{'left':-step1*796},800);
    }
    if(e.target.className === 'r'){
        autoMove1();
    }

};












































