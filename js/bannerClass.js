function Banner(container,dataUrl,num) {
    this.container=container;
    this.dataUrl=dataUrl;
    this.interval=2000;
    this.tbn=$(this.container).find('.tbn');
    this.li= $(this.tbn).find('li');
    this.imgs=$(this.tbn).get(0).getElementsByTagName('img');
    this.tba=$(this.container).find('.tba');
    this.lia=$(this.tba).get(0).getElementsByTagName('li');
    this.left=$(this.container).get(0).getElementsByClassName('left');
    this.right=$(this.container).get(0).getElementsByClassName('right');
    this.timer = null;
    this.step = 0;
    this.num = num;
    this.data = null;
    return this.init();
}
Banner.prototype={
    constructor:Banner,
    getData:function () {
        var xhr=new XMLHttpRequest();
        xhr.open('get',this.dataUrl+'?_='+Math.random(),false);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                this.data=JSON.parse(xhr.responseText)[this.num];

            }
        };
        xhr.send(null);
    },
    bindData:function () {
        if(this.data){
            var str1='';
            var strImg='';
            for (var i=0;i<this.data.length;i++){
                str1+=i==0?'<li class="a2"></li>':'<li></li>';
                strImg+=` <li>
                   <a href="###">
                       <img src="" relSrc="${this.data[i].src}">
                   </a>
               </li>`
            }

        }
        $(this.tbn).html(strImg);
        $(this.tba).html(str1);
    },
    imgLoad:function () {
    for (let i=0;i<this.imgs.length;i++){
        let curImg=this.imgs[i];
        let tempImg=new Image,
            that = this;
            tempImg.index = i;
        tempImg.src=curImg.getAttribute('relSrc');
        tempImg.onload= function() {
            var img = that.imgs[this.index];
            if(this.index==0){
                utils.css(img.parentNode.parentNode,'zIndex',1);
                $(img.parentNode.parentNode).animate({opacity:1},1000);
            }
            img.src=this.src;
            utils.css(img,'display','block');

        }
    }

    },
    autoMove:function () {
        this.step++;
        if(this.step==this.imgs.length){
            this.step=0;
        }
        this.setImg();
    },
    setImg:function () {
        for (var i=0;i<this.imgs.length;i++){
            var curImg=this.imgs[i];
            if(i==this.step){
                utils.css(curImg.parentNode.parentNode,'zIndex',1);
                animate(curImg.parentNode.parentNode,{'opacity':1},500,function () {
                    var silibings=utils.siblings(this);
                    for (var i=0;i<silibings.length;i++){
                        utils.css(silibings[i],'opacity',0);
                    }

                })
            }else {
                 utils.css(curImg.parentNode.parentNode,'zIndex',0);
            }
        }
        for (var i=0;i<this.lia.length;i++){
            this.lia[i].className=i===this.step?'a2':'';
        }
    },
    binnerBindEvent:function () {
        var that=this;
      this.container.onmouseover=function () {
          window.clearInterval(that.timer);
          $(that.left).css('display','block');
          $(that.right).css('display','block');
         // $(that.left).get(0).style.diaplay=$(that.right).get(0).style.display='block';
      };
      this.container.onmouseout=function () {
          that.timer=window.setInterval(()=>{
              that.autoMove();
          },that.interval);
          $(that.left).css('display','none');
          $(that.right).css('display','none');
          //this.left.style.display=this.right.style.display='none';
      }

    },
    focusBindEvent:function () {
        for(var i=0;i<this.lia.length;i++){
            var curLi=this.lia[i];
            curLi.onclick=()=> {
                this.step=i;
                setImg();
            }
        }
    },
    buttonBindEvent:function () {
        $(this.left).on('click',()=>{
            this.step--;
            if(this.step==-1){
                this.step=this.data.length-1;
            }
            this.setImg();
        });
        $(this.right).on('click',()=>{
            this.autoMove();
        })
    },
    init:function () {
        this.getData();
        this.bindData(this.data);
        this.imgLoad();
        this.timer=window.setInterval(()=>{
            this.autoMove();
        },this.interval);
        this.binnerBindEvent();
        this.focusBindEvent();
        this.buttonBindEvent();

    }

};
var div=document.getElementById('over');
new Banner(div,'./data1.txt',1);

var div1=document.getElementById('roll2');
new Banner(div1,'./data1.txt',2);

var div2=document.getElementById('roll1');
new Banner(div2,'./data1.txt',3);











