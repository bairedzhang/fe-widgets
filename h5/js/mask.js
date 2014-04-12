(function($, window, undefined) {
    var rect, out;
    rect = function(direct) {
        switch (direct) {
            case 'right':
                if (out) {
                    return {
                        animate: {
                            left: 150
                        }
                    }
                }
                return {
                    css: {
                        left: 150,
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
                            left: -150
                        }
                    }
                }
                return {
                    css: {
                        left: -150,
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
                            top: -150
                        }
                    }
                }
                return {
                    css: {
                        left: 0,
                        top: -150
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
                            top: 150
                        }
                    }
                }
                return {
                    css: {
                        left: 0,
                        top: 150
                    },
                    animate: {
                        top: 0
                    }
                };
                break;

        }
    }
    $('ul li').hover(function(e) {
        var $e = $(this),
            $mask = $e.find('.example').stop(),
            _offset = $e.offset(),
            _left = _offset.left,
            _top = _offset.top,
            _width = $e.width(),
            _height = $e.height(),
            left = e.clientX - _left,
            top =  e.clientY - _top,
            right = _width - left,
            bottom = _height - top,
            direct, fn,
            tmp = {};
        tmp[left] = 'left';
        tmp[right] = 'right';
        tmp[top] = 'top';
        tmp[bottom] = 'bottom';
        direct = tmp[Math.min(left, right, top, bottom)];
        out = e.type == 'mouseleave';
        fn = rect(direct);
        if (out) {
            $mask.animate(fn.animate, 'fast');
        } else {
            $mask.css(fn.css).animate(fn.animate, 'fast');
        }

    })
})(jQuery, window)