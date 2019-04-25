

module.exports = {
   openFileCommand : function () {
      switch (process.platform) { 
         case 'darwin' : return 'open';
         case 'win32' : return 'start';
         case 'win64' : return 'start';
         default : return 'xdg-open';
      }
   },
   bar: function () {
     // whatever
   }
 };
