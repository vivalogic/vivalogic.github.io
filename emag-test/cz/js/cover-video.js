
$('#cover-video-link').click(function() {
	if (isMobile()) {
    window.open("https://youtu.be/MqxUYJlJLDo", '_blank');
	} else {
    $('#cover-video-link').detach();
    $('#video-holder').append(
      '<iframe id="cover-video" frameborder="0" allowfullscreen="1" title="" width="100%" height="100%" src="https://www.youtube.com/embed/MqxUYJlJLDo?autoplay=1&amp;showinfo=0"></iframe>'
    );
	}
});
