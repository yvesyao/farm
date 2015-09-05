window.$ && $(function() {
	$('#menu').affix({
		offset: {
			top: $('#main .menu').offset().top + $('#main .menu').outerHeight(true) + 12 - $('#top').outerHeight(true),
			bottom: function() {
				return (this.bottom = $('footer').outerHeight(true) + 21);
			}
		}
	});
	$('a[href="#"]').click(function(event){
		event.preventDefault();
	})
});