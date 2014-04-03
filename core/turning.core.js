/**
 * Created with JetBrains WebStorm.
 * User: bairedzhang
 * Date: 14-4-1
 * Time: 下午10:38
 * To change this template use File | Settings | File Templates.
 */
(function(global){
  var turning = {
      version:'0.0.1',
      lessons:'l1'
  }

  var modules = {};
  turning.define = function(module,dependencies,fn){
       if(typeof define == 'function' && define.amd){
           define(module,dependencies,fn);
       }else{
           if(dependencies&&dependencies.length){
               for(var i=0;i<dependencies.length;i++){
                   dependencies[i] = modules[dependencies[i]];
               }
           }
           modules[module] = fn.apply(this,dependencies||[]);
       }
  }

  if(global.turning){
      throw new Error('turing already exists')
  }else{
      global.turning = turning;
  }
  if(typeof global.define==='undefined'){
      global.define = turning.define;
  }
})(typeof window === 'undefined'?this:window)