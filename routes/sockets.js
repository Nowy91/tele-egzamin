module.exports = function (io) {
    io.sockets.on('connection', function (socket) {
        socket.on('exam activation', function (examId) {
            io.sockets.emit('activated exam', examId);
        });

        socket.on('exam deactivation', function (examId) {
            io.sockets.emit('deactivated exam', examId);
        });

        socket.on('entrance of student', function (data) {
            io.sockets.emit('entrance of student', data);
        });

        socket.on('exam finished', function (data) {
            io.sockets.emit('exam finished', data);
        });
    });
}

