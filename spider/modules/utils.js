exports.extend = function(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

exports.parseCLIArgs = function(args) {
    var paramRegex = /^--(.+)=(.+)$/,
        ret = {};

    args.forEach(function(arg) {
        var matches = null;
        if (matches = arg.match(paramRegex)) {
            ret[matches[1]] = matches[2];
        }
    });

    return ret;
}