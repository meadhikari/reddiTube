String.prototype.format = String.prototype.f = function() {
      var s = this,
          i = arguments.length;

      while (i--) {
          s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
      }
      return s;
};
String.prototype.trunc = String.prototype.trunc ||
    function(n){
        return (this.length > n) ? this.substr(0,n-1)+'&hellip;' : this;
};