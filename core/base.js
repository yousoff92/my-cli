// Import here


// Start Program

module.exports = {
    addProgram: function (program) {

    program
        .command('doc:todaylog')
        .description('To create today documentation log')
        .action(() => {
            console.log('Hello World');
        });
    }
}