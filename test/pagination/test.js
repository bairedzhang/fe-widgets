var page = ZW.Pagination(
{
    container: 'page',
    className: {
        container: 'Z_page',
        //pre: '',
        //next: '',
        pre_disable: 'disable',
        next_disable: 'disable',
        ellipsis: '...',
        active: 'on'
    },
    current: 1,
    handler:function(page,instance){
        console.log(page);
    },
    autoinit: false,
    len: 5,
    total: 30,
    showPreNext: true,
    nextText: 'next',
    preText: 'pre'
});
page.init();
