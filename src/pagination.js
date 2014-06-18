var ZW = ZW||{};
(function ($, ZW, window, undefined) {
    ZW = ZW||{};
    var _helper = {
        gid: 1,
        guid: function (prefix) {
            prefix = prefix || 'ZW';
            return prefix + '_'+this.gid++;
        },
        instance: {},
        getInstance: function (guid) {
            return this.instance[guid];
        }
    };
    var Pagination = function (args) {
        if (!(this instanceof Pagination)) {
            return new Pagination(args);
        }
        this.config = $.extend(Pagination.default, args);
        args.autoinit && this.init();
    };
    Pagination.default = {
        container: null,
        id: null,
        className: {
            container: '',
            pre: '',
            next: '',
            pre_disable: 'pre-disable',
            next_disable: 'next-disable',
            ellipsis: '...',
            active: 'on'
        },
        template: '<a href="#" data-page="{{page}}" class="j-page">{{page}}</a>',
        current: 1,
        handler: null,
        autoinit: false,
        len: 5,
        total: 1,
        trigger:false,
        showPreNext: false,
        //showStartEnd: false,
        nextText: '下一页',
        preText: '上一页'
    };
    Pagination.prototype = {
        config: {},
        refresh: function (cur,trigger) {
            if(arguments.length==1&&typeof arguments[0]=='object'){
                this.config = $.extend(this.config,arguments[0]);
            }else if(arguments.length ==2){
                this.config = $.extend(this.config,{current:cur,trigger:trigger});
            this.makeHtml();
            }
        },
        go:function(page){
            this.refresh(page,true);
        },
        elems:{},
        init: function () {
            var self = this;
            if (self.isInited || self.config.total <= 1) {
                return;
            }
            self.config.id = _helper.guid('Pagination');
            _helper.instance[self.config.id] = self;
            self.elems.container =  $('#'+self.config.container);
            self.makeHtml();
            self.bind();
            self.isInited = true;
        },
        isInited: false,
        bind: function () {
            var self = this;
            self.elems.container.on('click','[data-page]',function(){
                var page = $(this).attr('data-page');
                if(page==self.config.current){
                    return;
                }
                self.refresh(page,true);
            });
        },
        makeHtml:function(){
            var self = this,
                config = self.config,
                len = config.len,
                current = parseInt(config.current),
                total = config.total,
                template = config.template,
                ellipsis = config.className.ellipsis,
              //  showStartEnd = config.showStartEnd,
                showPreNext = config.showPreNext;
            var html = ['<div id="', config.id, '" class="',config.className.container,'">'];
            if(showPreNext){
                html.push('<a href="#" class="j-page pre" data-page="'+Math.max(current-1,1)+'">'+config.preText+'</a>');
            }
            if (total <=len+2) {
                for(var i =1;i<=total;i++){
                    html.push(template.replace(/\{\{page\}\}/g,i));
                }
            }else{
                if(current<=len-1){
                   for(var i=1;i<=len+1;i++){
                      html.push(template.replace(/\{\{page\}\}/g,i));
                   }
                   html.push('<a href="javascript:;">'+ellipsis+'</a>');
                   html.push(template.replace(/\{\{page\}\}/g,total));
                }else if(current>len-1){
                   var step = Math.max(1,Math.floor(len/2));
                   html.push(template.replace(/\{\{page\}\}/g,1));
                   if(current-step>2){
                       var start = current-step;
                       if(start!=2){
                           html.push('<a href="javascript:;">'+ellipsis+'</a>');
                       }
                       if(start+len>total){
                          start= total-len;
                       }
                       for(var i =start;i<Math.min(start+len,total);i++){
                           html.push(template.replace(/\{\{page\}\}/g,i));
                       }
                       if(start+len<=total-1){
                           html.push('<a href="javascript:;">'+ellipsis+'</a>');
                       }
                   }else {
                       for(var i =2;i<2+len;i++){
                           html.push(template.replace(/\{\{page\}\}/g,i));
                       }
                       if(len<=total-3){
                           html.push('<a href="javascript:;">'+ellipsis+'</a>');
                       }
                   }

                   html.push(template.replace(/\{\{page\}\}/g,total));

                }
            }
            if(showPreNext){
                html.push('<a href="#" class="j-page next" data-page="'+Math.min(current+1,total)+'">'+config.nextText+'</a>');
            }
            html.push('</div>');
            self.html = html.join('');
            self.draw();
        },
        draw: function () {
            var self = this,
                config =self.config;
            $('#'+self.config.container).html(self.html);
            var $container =  $('#'+config.id);
            $container.find('[data-page='+config.current+']').not('.pre,.next').addClass(config.className.active);
            if(config.showPreNext){
                var next_disable = config.className.next_disable,
                    pre_disable  = config.className.pre_disable;
                $container.find('.next').removeClass(next_disable)
                          .siblings('.pre').removeClass(pre_disable);
                if(config.current==config.total){
                    $('#'+config.id).find('.next').addClass(next_disable);
                }else if(config.current==1){
                    $('#'+config.id).find('.pre').addClass(pre_disable);
                }
            }
            if(self.config.trigger){
                self.config.handler(self.config.current);
            }
        },
        html: null
    };
    ZW.Pagination = Pagination;
})(jQuery, ZW, window);
