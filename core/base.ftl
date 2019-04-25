// Import here

// Start Program

module.exports = {
    addProgram: function (program) {

    program
        .command('${component}:test')
        .description('To test component ${component}')
        .action(() => {
            console.log('Hello component ${component}');
        });
    }
}