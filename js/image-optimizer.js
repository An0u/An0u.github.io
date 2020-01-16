$('img').each(function () {
  var w = $(this).width();
  var h = $(this).height();
  var nw = $(this).prop('naturalWidth');
  var nh = $(this).prop('naturalHeight');
  var s = $(this).attr('src') || $(this).attr('_src');

  if (s.indexOf('://') === -1) {
    var pn = location.pathname;
    pn = pn.split('/');
    pn.pop();
    pn = pn.join('/');
    pn = pn.replace(/\/?$/, '/');
  	s = location.protocol + '//' + location.hostname + pn + s;
  	// console.log(s);
  }

  var src = s.replace('https://', '').replace('http://', '');
  var parts = src.split('/');
  var host = parts.shift();
  var path = '/' + parts.join('/');
  var test = 0;

  if (!nw || !nh) test++;
  if (nw > w * 2) test++;
  if (nh > h * 2) test++;

  if (test) {
    var weserv = 'http://images.weserv.nl/?url='+host+path+'&t=square';

    if (path.indexOf('.gif') !== -1) {
    	// Do nothing
    } else if (path.indexOf('data:image') !== -1) {
    	// Do nothing
    } else if (host.indexOf('data:image') !== -1) {
    	// Do nothing
    } else if (path.indexOf('.png') !== -1) {
		if ((nw > w * 4)||(nh > h * 4)) {
			weserv += '&w=' + (w*4);
		    weserv += '&h=' + (h*4);
		    $(this).attr('src', weserv);
		}
    } else {
    	weserv += '&q=65';
    	weserv += '&w=' + (w*2);
	    weserv += '&h=' + (h*2);
	    $(this).attr('src', weserv);
    }
  }
});