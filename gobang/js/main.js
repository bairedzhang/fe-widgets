/**
 * Created with JetBrains WebStorm.
 * User: bairedzhang
 * Date: 14-4-9
 * Time: 下午3:08
 * To change this template use File | Settings | File Templates.
 */
$(function(){
  var $dom = $('.main'),
      isSuc = false,
      tip = false,
      board = {
      clientX : $dom.offset().left,
      clientY : $dom.offset().top,
      timer   : 1,
      dropped :{}
  };
  var checkSuc = function(x,y){
      var arr = [
          {
              start:{
                x:Math.max(x-4,0),
                y:y
              },
              end:{
                  x:Math.min(x+4,10),
                  y:y
              },
              step:{
                  x:1,
                  y:0
              }
          },
          {
              start:{
                  x:x,
                  y:Math.max(y-4,0)
              },
              end:{
                  x:x,
                  y:Math.min(y+4,10)
              },
              step:{
                  x:0,
                  y:1
              }
          },{
              start:{
                  x:Math.max(x-4,0),
                  y:x-4<0?y-x:y-4
              },
              end:{
                  x:Math.min(x+4,10),
                  y:x+4>10?y+10-x:y+4
              },
              step:{
                  x:1,
                  y:1
              }
          },{
              start:{
                  x:Math.max(x-4,0),
                  y:x-4<0?y+x:y+4
              },
              end:{
                  x:y-4<0?x+y:x+4,
                  y:Math.max(y-4,0)
              },
              step:{
                  x:1,
                  y:-1
              }
          }
      ];
      if(board.timer>9){
          for(var i=0;i<arr.length;i++){
              var o = arr[i];
             checkNum(o.start, o.end, o.step);
          }
          /*var o = arr[3];
          checkNum(o.start, o.end, o.step); */
      }
  };
  var checkNum = function(start,end,step){

      var stop = false,
          i = start.x,j = start.y,
          ii = end.x-4*step.x,jj = end.y-4*step.y,
          val =board.timer%2==0?'black':'white';
     // alert(i+','+j+','+end.x+','+end.y);
      //alert(ii/step<5&&jj/step<5);
      if(isSuc&&!tip){
          alert(val +' succeed!');
          tip = true;
      }
      if(isSuc){
          return false;
      }
      if(Math.abs(end.x-start.x)<4&&Math.abs(end.y-start.y)<4){
          return false;
      }
      while(!isSuc&&!stop){
          if(i==ii&&j==jj){
              stop = true;
          }
          var flag = true,
              m;
          for(m=0;m<5;m++){
            var  idx = (i+m*step.x)+','+(j+m*step.y);
           // alert(idx);
            if(!board.dropped[idx]||board.dropped[idx]!=val){
                flag = false;
            }
          }
          //alert(flag);
          if(flag){
              isSuc=true;
              alert(val +' succeed!');
              tip = true;
          }
          i+=step.x;
          j+=step.y;
      }

  }
  $('.main').click(function(e){
      var x = Math.round((e.clientX-board.clientX)/60),
          y  = Math.round((e.clientY-board.clientY)/60),
          left = x*60 + board.clientX-15+ $(window).scrollLeft(),
          top  = y*60 + board.clientY-15+ $(window).scrollTop(),
          idx = x+','+ y,
          cl   = 'blk';
          if(board.dropped[idx]){
              return false;
          }

          if(board.timer++%2==0){
              cl = 'wht';
              board.dropped[idx] = 'white';
          }else{
              board.dropped[idx] = 'black';
          }
      $('.main').append('<em class="'+cl+'" style="left:'+left+'px;top:'+top+'px" data-x="'+x+'" data-y="'+y+'"></em>');
      checkSuc(x,y);
  })
})