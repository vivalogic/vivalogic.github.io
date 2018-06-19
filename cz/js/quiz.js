
var ACTIVE_QUIZ = 'quiz-active';

function removeHash() {
	var scrollV, scrollH, loc = window.location;
	if ("pushState" in history)
		history.replaceState("", document.title, loc.pathname + loc.search);
	else {
		// Prevent scrolling by storing the page's current scroll offset
		// zakomentoval jsem scroll
		// scrollV = document.body.scrollTop;
		// scrollH = document.body.scrollLeft;

		loc.hash = "";

		// Restore the scroll offset, should be flicker free	
		// zakomentoval jsem scroll
		// document.body.scrollTop = scrollV;
		// document.body.scrollLeft = scrollH;
	}
}

function getQuizResult() {
	var answer_1 = parseInt($('#quiz_1 .answers li.active').data('answer'), 10);
	var answer_2 = parseInt($('#quiz_2 .answers li.active').data('answer'), 10);
	var answer_3 = parseInt($('#quiz_3 .answers li.active').data('answer'), 10);

	var neutral = 0;
	var cold = 0;
	var warm = 0;

	if (answer_1 === 1) {
		neutral++;
	} else if (answer_1 === 2) {
		cold++;
	} else if (answer_1 === 3) {
		warm++;
	}

	if (answer_2 === 1) {
		warm++;
	} else if (answer_2 === 2) {
		cold++;
	} else if (answer_2 === 3) {
		neutral++;
	}

	if (answer_3 === 1) {
		cold++;
	} else if (answer_3 === 2) {
		warm++;
	} else if (answer_3 === 3) {
		neutral++;
	}

	if (warm >= 2) {
		return 'warm';
	} else if (cold >= 2) {
		return 'cold';
	} else {
		return 'neutral';
	}
}

$('#quiz_intro').on('click', '.btn', function(){
	$('#quiz_intro').fadeOut(300);
	$('#quiz_1').fadeIn(300);
	ga('send', 'pageview', location.pathname, {
		title: 'quiz_q1'
	});
	ga('send', 'event', 'page-displayed', 'quiz_q1');
	return false;
});

$('.quiz-question').on('click', '.answers li', function(){
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	TweenLite.to($(this).find('img'), 0.1, {
		borderColor: '#deac94'
	});
	TweenLite.to($(this).find('img'), 0.1, {
		borderColor: '#f3d6c2',
		delay: 0.1
	});
	$(this).closest('.quiz-question').find('.controls .btn').addClass('show');
	return false;
});

$('.quiz-question').on('click', '.controls .btn-next', function(){
	var quiz = $(this).closest('.quiz-question');
  quiz.removeClass(ACTIVE_QUIZ);
	TweenLite.to(quiz, 0.2, {
		opacity: 0
	});
	var next = $('#quiz_' + (quiz.data('quiz') + 1));
	next.show();
  next.addClass(ACTIVE_QUIZ);
	TweenLite.fromTo(next, 0.2, {
    opacity: 0
	}, {
    opacity: 1
	});

	ga('send', 'pageview', location.pathname, {
		title: 'quiz_q' + (quiz.data('quiz') + 1)
	});
	ga('send', 'event', 'page-displayed', 'quiz_q' + (quiz.data('quiz') + 1));

	return false;
});

$('.quiz-question').on('click', '.controls .btn-prev', function(){
	var quiz = $(this).closest('.quiz-question');
  quiz.removeClass(ACTIVE_QUIZ);
	TweenLite.to(quiz, 0.2, {
    opacity: 0
	});
	var next = $('#quiz_' + (quiz.data('quiz') - 1));
	next.show();
  next.addClass(ACTIVE_QUIZ);
	TweenLite.fromTo(next, 0.2, {
    opacity: 0
	}, {
    opacity: 1
	});

	ga('send', 'pageview', location.pathname, {
		title: 'quiz_q' + (quiz.data('quiz') - 1)
	});
	ga('send', 'event', 'page-displayed', 'quiz_q' + (quiz.data('quiz') - 1));

	return false;
});

$('.quiz-question').on('click', '.controls .btn-finish', function(){
	var quiz = $(this).closest('.quiz-question');
	quiz.fadeOut(200);
	$('#quiz_answer_' + getQuizResult()).fadeIn(200);

	ga('send', 'pageview', location.pathname, {
		title: 'quiz_result'
	});
	ga('send', 'event', 'page-displayed', 'quiz_result');

	return false;
});

$('.section-quiz').on('click', '.btn-modal', function(){
	$('#frm-quizForm-quiz_result').val(getQuizResult());
	$('#quiz_modal').addClass('modal-show');
	$('#header').addClass('modal-hide');

	return false;
});

$('.section-quiz').on('click', '.modal-container .close', function(){
	var modalContainer = $(this).closest('.modal-container');
	modalContainer.removeClass('modal-show');
	$('#header').removeClass('modal-hide');
	removeHash();

	return false;
});

$('body').on('click', '#quiz_modal', function(e) {
	if ($(e.target).is('#quiz_modal .modal *, #quiz_modal .modal')) {
		return;
	}
	$('#quiz_modal').removeClass('modal-show');
	$('#header').removeClass('modal-hide');
	removeHash();

	return false;
});
