
var Loreal = {
	Contest: function() {
		var scope = this;

		this.started = false;
		this.index = 1;

		this.correctCount = 0;
		this.rounds = 1;

		this.trackStart = true;

		var boxAnimDuration = 0.2;

		this.initHelp = function() {
			var $target = $('#contest-help-sprite');
			var tl = new TimelineLite({
				paused: true,
				onComplete: function() {
					this.play(0);
				}
			});
			var cols = 14;
			var rows = 7;
			var frames = 97;
			var duration = (frames / 18) / frames;
			var frameWidth = 137;
			var frameHeight = 90;
			var frame = 1;
			for (var r = 0; r < rows; r++) {
				var ypos = frameHeight * -r;
				for (var i = 0; i < cols; i++) {
					frame++;
					if (frame > frames) {
						break;
					}
					var xpos = frameWidth * -i;
					tl.set($target, {
						backgroundPosition: xpos + 'px ' + ypos + 'px'
					}, frame * duration)
				}
			}

			return tl;
		};
		var helpTimeline = this.initHelp();

		this.introTimeout = false;
		this.intro = function() {
			scope.trackStart = false;
			$('#contest-r-intro').addClass('hidden');
			$('#contest-box').fadeOut('fast');
			$('#contest-help').fadeIn('fast');

			helpTimeline.play(0);

			ga('send', 'pageview', location.pathname, {
				title: 'contest_intro'
			});
			ga('send', 'event', 'page-displayed', 'contest_intro');
		};

		this.showFirstRoom = function() {
			helpTimeline.stop();
			scope.shuffle();
			$('#contest-box').fadeIn('fast');
			$('#contest-help').fadeOut('fast');
			scope.showRoom(1);

			scope.activate();
		};

		this.showRoom = function(index) {
			scope.index = index;
			var type;

			if (index === 1) {
				ga('send', 'pageview', location.pathname, {
					title: 'contest_warm'
				});
				ga('send', 'event', 'page-displayed', 'contest_warm');
				type = 'w';
			} else if (index === 2) {
				ga('send', 'pageview', location.pathname, {
					title: 'contest_cold'
				});
				ga('send', 'event', 'page-displayed', 'contest_cold');
				type = 'c';
			} else if (index === 3) {
				ga('send', 'pageview', location.pathname, {
					title: 'contest_neutral'
				});
				ga('send', 'event', 'page-displayed', 'contest_neutral');
				type = 'n';
			}

			var current = $('#contest-model-td img.active');
			TweenLite.to(current, 0.15, {
				opacity: 0,
				onComplete: function() {
					current.removeClass('active');
					var next = $('#contest-model-img-' + type);
					TweenLite.to(next, 0.15, {
						opacity: 1,
						onComplete: function() {
							next.addClass('active');
						}
					});
				}
			});

			scope.hideRooms(function(){
				var room = $('#contest-r-' + index);
				room.removeClass('hidden');
				TweenLite.fromTo($('#contest-box .inner-anim:visible'), boxAnimDuration, {
					scale: 0
				}, {
					scale: 1,
					delay: index > 1 ? boxAnimDuration : 0
				});

				$('#contest td.shuffle-enabled img').each(function(){
					$(this).addClass('changeable');
				});
				scope.activate();
			});
		};

		this.hideRooms = function(callback) {
			TweenLite.fromTo($('#contest-box .inner-anim:visible'), boxAnimDuration, {
				scale: 1
			}, {
				scale: 0,
				onComplete: function() {
					$('#contest-box > .inner').each(function(){
						$(this).addClass('hidden');
					});
					callback();
				}
			});
		};

		this.activate = function() {
			scope.started = true;
			$('#contest').addClass('started');
		};

		this.deactivate = function() {
			scope.started = false;
			$('#contest').removeClass('started');
		};

		this.shuffle = function() {
			$('#contest-box').find('.controls-none .btn-true-match').addClass('disabled');

			var tds = [];
			$('#contest td.shuffle-enabled').each(function(){
				tds.push($(this).html());
			});

			tds.sort(function() { return 0.5 - Math.random() });

			var toggleImages = function($td){
				var current = $td.children('img.active').removeClass('active');
				var other = current.siblings('img');
				other.eq(Math.round(Math.random())).addClass('active');
			};

			$('#contest td.shuffle-enabled').each(function(){
				var that = $(this);
				TweenLite.to(that, 0.15, {
					opacity: 0,
					onComplete: function() {
						that.html(tds.pop());
						TweenLite.to(that, 0.15, {
							opacity: 1,
							onComplete: function() {
								var delay = 150, count = 0;
								var easeToggleImages = function() {
									count += 1;
									delay += 50;
									toggleImages(that);
									if (count < 4) {
										setTimeout(easeToggleImages, delay);
									} else {
										$('#contest-box').find('.controls-none .btn-true-match').removeClass('disabled');
									}
								};
								easeToggleImages();
							}
						});
					}
				});
			});
		};

		this.nextRoom = function() {
			$('#contest-box').removeClass('error');
			$('#contest-box').removeClass('success');
			scope.hideErrors();
			scope.inanimateContestBox();
			scope.shuffle();

			if (scope.index + 1 < 4) {
				scope.showRoom(scope.index + 1);
			} else {
				scope.showGameOver();
			}
		};

		this.checkTrueMatch = function(type) {
			scope.deactivate();

			var wrong = 0;

			$('#contest').find('img.active').each(function(){
				if ($(this).data('type') !== type) {
					wrong++;
					scope.showWrongType($(this), type);
				} else {
					$(this).removeClass('changeable');
				}
			});

			if (wrong > 0) {
				if (scope.index === 3 && scope.correctCount < 3) {
					scope.rounds++;
				}
				scope.showWrongBox();
				ga('send', 'event', 'contest', 'wrong_' + scope.index);
			} else {
				scope.showCorrectBox();
				scope.correctCount++;
				ga('send', 'event', 'contest', 'success_' + scope.index);
			}
		};

		this.showWrongType = function(img, type) {
			var errors = img.siblings('.wrong');
			errors.children('.wrong-' + type).removeClass('hidden');
			errors.fadeIn('fast');
		};

		this.hideErrors = function() {
			$('#contest').find('.wrong').fadeOut('fast', function() {
				$('#contest').find('.wrong-text').addClass('hidden');
			});
		};

		this.animateContestBox = function() {
			var contestBox = $('#contest-box');

			TweenLite.from(contestBox, 0.5, {
				backgroundSize: '100% 200%'
			});

			TweenLite.to(contestBox, 0.5, {
				backgroundPosition: '50% 200%'
			});

			TweenLite.set(contestBox, {
				backgroundPosition: '50% -100%',
				delay: 0.5
			});

			TweenLite.to(contestBox, 2, {
				backgroundPosition: '50% 200%',
				delay: 0.5,
				onComplete: function() {
					this.reverse();
				},
				onReverseComplete: function() {
					this.restart();
				}
			});
		};

		this.inanimateContestBox = function() {
			TweenLite.killTweensOf($('#contest-box'));
		};

		this.showWrongBox = function() {
			$('#contest-r-' + scope.index).find('.controls-none').hide();
			$('#contest-r-' + scope.index).find('.controls-wrong').fadeIn('fast');
			$('#contest-box').addClass('error');
			scope.animateContestBox();
		};

		this.showCorrectBox = function() {
			$('#contest-r-' + scope.index).find('.controls-none').hide();
			$('#contest-r-' + scope.index).find('.controls-correct').fadeIn('fast');
			$('#contest-box').addClass('success');
			scope.animateContestBox();

			setTimeout(scope.nextRoom, 1000);
		};

		this.showGameOver = function() {
			$('#contest-over').fadeIn('fast');
			$('#frm-trueMatchForm-result').val(scope.correctCount);
		};

		this.tryAgain = function() {
			$('#contest-box').removeClass('error');
			$('#contest-box').removeClass('success');
			scope.hideErrors();
			scope.inanimateContestBox();
			scope.activate();

			$('#contest-box').find('.controls-none').hide();
			$('#contest-box').find('.controls-correct').hide();
			$('#contest-box').find('.controls-wrong').hide();
		};
	}
};

var contest = new Loreal.Contest();

$('#contest').on('click', 'img.changeable', function(){
	if (! contest.started) {
		return false;
	}

	var img = $(this);
	var next = img.next('img');

	if (next.length) {
		next.addClass('active');
	} else {
		img.parent().children().first().addClass('active');
	}

	img.removeClass('active');

	$('#contest-box').find('.controls-none').fadeIn('fast');

	ga('send', 'event', 'click', 'contest_img: "' + img.data('type-track') + '"');
});

$('#contest-container').on('click', '#contest-btn-play', function(){
	contest.intro();

	return false;
});

$('#contest-container').on('click', '#contest-help-start', function(){
	contest.showFirstRoom();
	ga('send', 'event', 'click', 'contest_help_start');
	if (contest.introTimeout !== false) {
		clearTimeout(contest.introTimeout);
	}

	return false;
});

$('#contest-container').on('click', '.controls-none .btn-true-match', function(){
	if (! $(this).hasClass('disabled')) {
		contest.checkTrueMatch($(this).data('type'));
	}

	return false;
});

$('#contest-container').on('click', '.wrong .btn-again', function(){
	contest.tryAgain();
	ga('send', 'event', 'click', 'contest_again_' + contest.index);

	return false;
});
