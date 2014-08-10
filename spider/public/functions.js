console.alarm = function (subject, content) {
    console.log(['alarm', subject, JSON.stringify(content)]);
}

console.record = function (subject, content) {
    // console.log(['record', subject, JSON.stringify(content)]);
    console.log(JSON.stringify({
        action: 'record',
        subject: subject,
        content: content
    }));
}