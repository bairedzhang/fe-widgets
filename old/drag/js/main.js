
$(function(){
     var $login = $('.loginBox'),
         logW = $login.width(),
         logH = $login.height(),
         winW = $(window).width(),
         winH = $(window).height(),
         relLeft = 0,
         relTop = 0,
         drag = false;

     $login.mousedown(function(e){
             relLeft = e.clientX-$login.offset().left;
             relTop = e.clientY-$login.offset().top;
             drag = true;

     }).mouseup(function(){
        drag = false;
     });
    $(document).mousemove(function(e){
        var mouseLeft = e.clientX,
            mouseTop = e.clientY,
            logLeft = $login.offset().left,
            logTop = $login.offset().top;
        if(!drag){
            return false;
        }
        $login.css({
            left:mouseLeft-relLeft,//logLeft<0?0:logLeft+logW>winW?winW-logW:mouseLeft-relLeft,
            top:mouseTop-relTop//logTop<0?0:logTop+logH>winH?winH-logH:mouseTop-relTop
        })
        /*if(logLeft+logW>=winW||logTop+logH>=winH||logLeft==0||logTop ==0){
            drag = false;
        }*/
    });
})

