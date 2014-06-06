/**
 * Created with JetBrains WebStorm.
 * User: bairedzhang
 * Date: 14-4-13
 * Time: 上午11:00
 * @example:
 * var mask =new $.Mask({
 *                  item:'ul li', //容器sizzle selector
 *                  mask:'.example'//遮罩sizzle selector
 *                  })._init();
 * 可选：speed,callback
 */
(function($, window, undefined) {
    var Mask = function(options) {
        $.extend(true, this._defaults, options);
        return this;
    }
    Mask.prototype = {
        _defaults: {
            speed: 'fast'
        },
        out: false,
        rect: function(direct) {
            var _that = this,
                out = _that.out,
                width = $(_that._defaults.mask).width(),
                height = $(_that._defaults.mask).height();
            switch (direct) {
                case 'right':
                    if (out) {
                        return {
                            animate: {
                                left: width
                            }
                        }
                    }
                    return {
                        css: {
                            left: width,
                            top: 0
                        },
                        animate: {
                            left: 0
                        }
                    };
                case 'left':
                    if (out) {
                        return {
                            animate: {
                                left: -width
                            }
                        }
                    }
                    return {
                        css: {
                            left: -width,
                            top: 0
                        },
                        animate: {
                            left: 0
                        }
                    };
                    break;
                case 'top':
                    if (out) {
                        return {
                            animate: {
                                top: -height
                            }
                        }
                    }
                    return {
                        css: {
                            left: 0,
                            top: -height
                        },
                        animate: {
                            top: 0
                        }
                    };
                    break;
                case 'bottom':
                    if (out) {
                        return {
                            animate: {
                                top: height
                            }
                        }
                    }
                    return {
                        css: {
                            left: 0,
                            top: height
                        },
                        animate: {
                            top: 0
                        }
                    };
                    break;

            }
        },
        _init: function() {
            var _this = this,
                options = _this._defaults,
                $item = $(options.item),
                speed = options.speed,
                mask = options.mask;
            $item.hover(function(e) {
                var $e = $(this),
                    $mask = $e.find(mask).stop(),
                    _offset = $e.offset(),
                    _left = _offset.left,
                    _top = _offset.top,
                    _width = $e.width(),
                    _height = $e.height(),
                    left = e.clientX - _left,
                    top = e.clientY + $(window).scrollTop() - _top,
                    right = _width - left,
                    bottom = _height - top,
                    out = e.type == 'mouseleave',
                    direct, fn,
                    tmp = {};
                tmp[left] = 'left';
                tmp[right] = 'right';
                tmp[top] = 'top';
                tmp[bottom] = 'bottom';
                _this.out = out;
                direct = tmp[Math.min(left, right, top, bottom)];
                fn = _this.rect(direct);
                if (out) {
                    $mask.animate(fn.animate, speed, options.callback || null);
                } else {
                    $mask.css(fn.css).animate(fn.animate, speed, options.callback || null);
                }

            })
        }
    }
    $.extend({
        Mask: Mask
    });
})(jQuery, window)