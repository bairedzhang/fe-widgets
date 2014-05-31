
$(function(){
    var opts1 = {
        elem:$('#textarea1')[0],
        url : "http://suggestion.baidu.com/su?&zxmode=1&json=1&p=3&sid=&cb=?&wd="
    };
    var opts2 = {
        elem:$('#textarea2')[0],
        url : "http://suggestion.baidu.com/su?&zxmode=1&json=1&p=3&sid=&cb=?&wd="
    };
    var atfriends1=new atFriends(opts1);
    atfriends1.init();
    var atfriends2=new atFriends(opts2);
    atfriends2.init();
});

function atFriends(opts){
    this.elem=opts.elem; //文本框
    this.at= {}; //临时保存文本框内容截取属性
    this.url=opts.url;
    this.index=0;
}
//微博的@功能
atFriends.prototype= {
    init: function() {//首先我们要初始化

        if($('#tWarp').length!=0){
            $('#tWarp').remove();
        }

        var _body=$("body");

        var _div=$('<div id="tWarp"></div>');

        _body.append(_div);

        var _left=$(this.elem).offset().left+"px",

            _top=$(this.elem).offset().top+"px",

            _width=$(this.elem).width()+"px",

            _height=$(this.elem).height()+"px",

            _lineHeight=$(this.elem).css("line-height"),

            _style="position:absolute;overflow:hidden;white-space:pre-wrap;z-index:-9999;word-wrap:break-word;word-break:break-all;line-height:"+_lineHeight+";width:"+_width+";height:"+_height+";left:"+_left+";top:"+_top;
        _div.attr("style",_style);

        this.inset();
    },
    inset: function() {//给li绑定事件，

        var _this=this;

        $("#tipAt").delegate('li','click',function() {//事件委托
            _this.hiddenTip();

            var txtData=$(this).text();

            _this.add(_this.elem,txtData,_this.at['pos'],_this.at['len']);

            _this.hiddenTip();
        })
        $(this.elem).keyup(function(){
            _this.getAt();
        });
    },
    getCursor: function() {

        var _this=this;

        var rangeData = {

            start: 0,

            end: 0,

            text: ""

        };

        if(typeof(_this.elem.selectionStart)=="number") {//W3C

            rangeData.start=_this.elem.selectionStart;//光标起始位置

            rangeData.end=_this.elem.selectionEnd;//光标末尾位置

            rangeData.text=_this.elem.value.substring(0,this.elem.selectionStart);//获取文本框value

        } else if (document.selection) {//IE

            var sRange=document.selection.createRange();

            var oRange=document.body.createTextRange();

            oRange.moveToElementText(_this.elem);

            rangeData.text=sRange.text;

            rangeData.bookmark = sRange.getBookmark();

            for(var i=0;oRange.compareEndPoints("StartToStart",sRange)< 0 && sRange.moveStart("character", -1) !== 0; i ++) {

                if (this.elem.value.charAt(i) == '\r') {

                    i ++;//IE的特殊处理，遇到enter键需要加1

                }

            }

            rangeData.start=i;

            rangeData.end = rangeData.text.length + rangeData.start;

            rangeData.text=_this.elem.value.substring(0,i);

        }

        return rangeData;

    },

    setCursor: function(elem,start,end) {//设置光标

        if(this.elem.setSelectionRange) {//W3C

            this.elem.setSelectionRange(start,end);

        } else if(this.elem.createRange) {//IE

            var range=this.elem.createRange();

            if(this.elem.value.length==rangeData.start) {

                range.collapse(false);

                range.select();

            } else {

                range.moveToBookmark(rangeData.bookmark);

                range.select();

            }

        }

    },

    add: function(elem,txtData,nStart, nLen){//插入文本参数操作的元素，数据，起始坐标位置，用户输入字符长度

//this.setCursor(this.elem,this.rangeData);
        // this.hiddenTip()
        this.elem.focus();

        var _range;

        if(this.elem.setSelectionRange) {//W3C

            _tValue=this.elem.value;//获取文本框内容

            var _start = nStart - nLen,//设置光标起点光标的位置-离@的文本长度

                _end = _start + txtData.length,//设置光标末尾，start+数据文字长度

                _value=_tValue.substring(0,_start)+'@'+txtData+" "+_tValue.substring(nStart, this.elem.value.length);

            this.elem.value=_value;

            this.setCursor(this.elem,_end+2,_end+2);

        } else if(this.elem.createTextRange) {

            _range=document.selection.createRange();

            _range.moveStart("character", -nLen);//移动光标

            _range.text = '@'+txtData+" ";

        }
        //this.keyHandler();
    },
    checkLocation:function(){
        if($('#tWarp').length!=0){
            $('#tWarp').remove();
        }

        var _body=$("body");

        var _div=$('<div id="tWarp"></div>');

        _body.append(_div);

        var _left=$(this.elem).offset().left+"px",

            _top=$(this.elem).offset().top+"px",

            _width=$(this.elem).width()+"px",

            _height=$(this.elem).height()+"px",

            _lineHeight=$(this.elem).css("line-height"),

            _style="position:absolute;overflow:hidden;white-space:pre-wrap;z-index:-9999;word-wrap:break-word;word-break:break-all;line-height:"+_lineHeight+";width:"+_width+";height:"+_height+";left:"+_left+";top:"+_top;
        _div.attr("style",_style);
    },

    getAt: function() {
        this.checkLocation();

        var _rangeData=this.getCursor();

        var k=_value=_rangeData.text.replace(/\r/g,"");//去掉换行符

        var _reg=/@[^@]{1,20}$/g;//正则，获取value值后末尾含有@的并且在20字符内

        var _string="";

        if(_value.indexOf("@")>=0&&_value.match(_reg)) {

            var _postion=_rangeData.start;

            var _oValue=_value.match(_reg)[0];//找到value中最后匹配的数据

            var vReg=new RegExp("^"+_oValue+".*$","m");//跟数据匹配的正则 暂时保留

            _value_value=_value.slice(0, _postion); //重写_value 字符串截取从0截取到光标位置


            if(/^@[a-zA-Z0-9\u4e00-\u9fa5_]*$/.test(_oValue)&& !/\s/.test(_oValue)||_oValue=='') {

                this.at['m'] = _oValue_oValue = _oValue.slice(1);//用户输入的字符 如@颓废小魔，即"颓废小魔"

                this.at['l'] = _value.slice(0, -_oValue.length); //@前面的文字

                this.at['r'] = k.slice(_postion - _oValue.length, k.length);//@后面的文字

                this.at['pos']=_postion;//光标位置

                this.at['len']=_oValue.length;//光标位置至@的长度，如 @颓废小魔，即"颓废小魔"的长度
                this.showTip(this.url);
            } else {
                this.hiddenTip();
            }

        } else {

            this.hiddenTip()

        }

    },

    buidTip: function(li) {//创建tip，设置tip的位置
        var _this=this;
        $("#tWarp").empty();
        var _string="  "+this.at['l']+""+"<cite>@</cite>"+""+this.at['r']+"";
        $("#tWarp").html(_string);
        var _left=$("#tWarp cite").offset().left+"px",

            _top=$("#tWarp cite").offset().top+parseInt($("#tWarp").css("line-height"))+5+"px";

        if(parseInt(_top)>parseInt($("#tWarp").offset().top+$("#tWarp").height())) {

            _top=$("#tWarp").offset().top+$("#tWarp").height()+5+"px";
        }
        if(document.all){
            var top=$(document).scrollTop();
            var p=this.getInputPositon(this.elem);
            _left=p.left+'px';
            _top=p.bottom+top+'px';
        }


        $("#tipAt").css({

            "left":_left,

            "top":_top,

            "display":"block"

        });
        var obj=$("#tipAt").find('li').eq(0);
        obj.addClass("li_on");

        $(_this.elem).unbind('keyup').bind('keydown', function(e) {
            return _this.keyMove(e);
        });
        _this.hover();
    },

    hiddenTip: function() {

        var _this=this;

        $("#tipAt").css("display","none");

        $("#tipAt li").unbind("click,mouseover");

    },
    keyMove: function(e) {//键盘操作

        var _this=this;

        var _key=e.keyCode;

        var _len=$("#tipAt li").length;

        switch(_key) {

            case 40:

//下

                _this.index++;

                if(_this.index>=_len) {

                    _this.index=0;

                }

                _this.keyMoveTo(_this.index);

//return false一定要加上，不然JS会继续进行调用keyHandler，从而绑定了keyup事件影响到键盘的keydown事件

                return false;

                break;

            case 38:

//上

                _this.index--;

                if(_this.index<0) {

                    _this.index=_len-1;

                }

                _this.keyMoveTo(_this.index);

                return false;

                break;

            case 13:

//enter键

                var txtData=$(".li_on").text();

                _this.add(_this.elem,txtData,_this.at['pos'],_this.at['len'])

                _this.hiddenTip();

                _this.keyHandler();

                return false;

                break;

            default://_this.keyHandler();

        };

        //_this.hiddenTip();

        _this.keyHandler();

    },

    keyHandler: function() {

        var _this=this;

        _this.index=0;

        //enter键盘操作后重新绑定keyup

        $(_this.elem).unbind("keydown").bind("keyup", function() {

            _this.getAt();

        })

    },

    keyMoveTo: function(index) {
        $("#tipAt li").removeClass("li_on").eq(index).addClass("li_on");

    },
    hover: function() {

//hover事件

        var _this=this;

        $("#tipAt").delegate('li','mouseover', function() {

            _this.index=$(this).index();

            $(this).addClass("hover").siblings().removeClass("li_on hover")

        });
        $("#tipAt").delegate('li','mouseout',function() {

            $(this).removeClass("hover");

        })

    },
    showTip:function(url){
        $('#tipAt').empty();
        url=url+encodeURIComponent(this.at.m);
        $.getJSON(url,function(data){
            //console.log(data);
            data = data.s;
            var li='';
            if(data.length>0){
                var len=Math.min(10,data.length);
                li='<li class="li_on">'+data[0]+'</li>';
                if(len>1){
                    for(var i=1;i<len;i++){
                        li=li+'<li>'+data[i]+'</li>';
                    }
                }
                $('#tipAt').append(li);
            }
        },'json');
        this.buidTip();
    },
    getInputPositon: function (elem) {
        if (document.selection) {   //IE Support
            elem.focus();
            var Sel = document.selection.createRange();
            return {
                left: Sel.boundingLeft,
                top: Sel.boundingTop,
                bottom: Sel.boundingTop + Sel.boundingHeight
            };
        }
    }
}