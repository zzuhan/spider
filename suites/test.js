
function prepare(){
    
    return {
        urls: 'http://www.7k7k.com/',
        waitSelector: 'body',
        inspect: function () {
            console.log(132);
            console.log('run this');
        }
    }
}


module.exports = {
    prepare: prepare
}