// jQuery initialization after document is ready
$(document).ready(function () {
    // Initialize variables
    var singlePlayerMode = false;
    var aiSpeed = 5;
    var $rod1 = $(".rod1");
    var $rod2 = $(".rod2");
    var $ball = $(".ball");
    var $container = $(".container");
    var size = 10;
    var score1 = 0, score2 = 0;
    var currentRod = $rod2;
    var gameStart = false;
    var xDirec, yDirec;
    var $l1 = $(".heart1 .heart");
    var $l2 = $(".heart2 .heart");
    var livesNo1 = 3, livesNo2 = 3;
    var notInitial = true, id;

    // Button elements
    var $startB = $("#start-button");
    var $newGameB = $("#new-game-button");
    var $scoreDisp1 = $("#score-display1");
    var $scoreDisp2 = $("#score-display2");
    var $singlePlayerButton = $("#single-player-button");
    var $twoPlayerButton = $("#two-player-button");

    // Event listeners
    $singlePlayerButton.click(switchToSinglePlayer);
    $twoPlayerButton.click(switchToTwoPlayer);
    $startB.click(startGame);
    $newGameB.click(newGame);
    $(window).keydown(moveRod);

    function switchToSinglePlayer() {
        singlePlayerMode = true;
        $singlePlayerButton.addClass("hidden");
        $twoPlayerButton.removeClass("hidden");
        newGame();
    }

    function switchToTwoPlayer() {
        singlePlayerMode = false;
        $singlePlayerButton.removeClass("hidden");
        $twoPlayerButton.addClass("hidden");
        newGame();
    }

    function setBallPosition() {
        var ballTop = $ball.position().top;
        var ballLeft = $ball.position().left;
        var ballW = $ball.width();
        var ballH = $ball.height();
        var containerW = $container.width();
        var containerH = $container.height();

        if (ballLeft + ballW >= containerW || ballLeft <= 0) {
            xDirec *= -1;
        }

        if (singlePlayerMode) {
            if (ballTop < containerH / 2) {
                if (ballLeft > $rod1.position().left + $rod1.width() / 2) {
                    $rod1.css("left", Math.min($rod1.position().left + aiSpeed, containerW - $rod1.width()) + "px");
                } else {
                    $rod1.css("left", Math.max($rod1.position().left - aiSpeed, 0) + "px");
                }
            }
        }

        if (ballTop <= $rod1.height() && yDirec < 0) {
            var rl = $rod1.position().left - ballW;
            var rr = $rod1.position().left + $rod1.width();

            if (ballLeft >= rl && ballLeft <= rr) {
                yDirec *= -1;
                score1++;
                $scoreDisp1.text("Player 1: " + score1);
            } else {
                handleMiss(1);
                return;
            }
        } else if (ballTop + ballH >= containerH - $rod2.height() && yDirec > 0) {
            var rl = $rod2.position().left - ballW;
            var rr = $rod2.position().left + $rod2.width();

            if (ballLeft >= rl && ballLeft <= rr) {
                yDirec *= -1;
                score2++;
                $scoreDisp2.text("Player 2: " + score2);
            } else {
                handleMiss(2);
                return;
            }
        }

        ballTop += yDirec;
        ballLeft += xDirec;
        $ball.css({
            top: ballTop + "px",
            left: ballLeft + "px"
        });

        notInitial = true;
    }

    function handleMiss(player) {
        if (player == 1) {
            alert("Player 1 Missed!");
            $l1.eq(livesNo1 - 1).css("visibility", "hidden");
            livesNo1--;

            clearInterval(id);
            if (livesNo1 > 0) {
                currentRod = $rod1;
            } else {
                declareWinner();
                newGame();
            }
        } else if (player == 2) {
            alert("Player 2 Missed!");
            $l2.eq(livesNo2 - 1).css("visibility", "hidden");
            livesNo2--;

            clearInterval(id);
            if (livesNo2 > 0) {
                currentRod = $rod2;
            } else {
                declareWinner();
                newGame();
            }
        }
        notInitial = false;
        setGame();
    }

    function declareWinner() {
        if (score1 > score2) {
            alert("Winner is Player 1!");
        } else if (score2 > score1) {
            alert("Winner is Player 2!");
        } else {
            alert("It's a Tie!");
        }
    }

    function moveRod(event) {
        var r2Left = $rod2.position().left;
        var r1Left = $rod1.position().left;
        var elementW = $rod2.width();
        var containerW = $container.width();
        var key = event.keyCode;

        if (!singlePlayerMode) {
            if (key == 68) { // 'D'
                if (r1Left + elementW + size <= containerW) {
                    $rod1.css("left", r1Left + size + "px");
                } else {
                    $rod1.css("left", containerW - elementW + "px");
                }
                if (!gameStart) resetBall();
            } else if (key == 65) { // 'A'
                if (r1Left - size >= 0) {
                    $rod1.css("left", r1Left - size + "px");
                } else {
                    $rod1.css("left", "0px");
                }
                if (!gameStart) resetBall();
            }
        }

        if (key == 39) { // Right arrow
            if (r2Left + elementW + size <= containerW) {
                $rod2.css("left", r2Left + size + "px");
            } else {
                $rod2.css("left", containerW - elementW + "px");
            }
            if (!gameStart) resetBall();
        } else if (key == 37) { // Left arrow
            if (r2Left - size >= 0) {
                $rod2.css("left", r2Left - size + "px");
            } else {
                $rod2.css("left", "0px");
            }
            if (!gameStart) resetBall();
        }
    }

    function newGame() {
        clearInterval(id);

        $(".container, .score-container, .lives-container").addClass("blurry");
        $startB.removeClass("hidden");
        currentRod = $rod2;
        $l1.css("visibility", "visible");
        $l2.css("visibility", "visible");
        livesNo1 = 3;
        livesNo2 = 3;
        setGame();
        score1 = 0;
        score2 = 0;
        $scoreDisp1.text("Player 1: 0");
        $scoreDisp2.text("Player 2: 0");
    }

    function visibleScreen() {
        $(".container, .score-container, .lives-container").removeClass("blurry");
        $startB.addClass("hidden");
    }

    function setGame() {
        gameStart = false;
        resetRods();
        resetBall();
    }

    function resetBall() {
        if (currentRod.is($rod2)) {
            $ball.css({
                top: $container.height() - currentRod.height() - $ball.height() + "px",
                left: currentRod.position().left + (currentRod.width() / 2) - ($ball.width() / 2) + "px"
            });
        } else if (currentRod.is($rod1)) {
            $ball.css({
                top: currentRod.height() + "px",
                left: currentRod.position().left + (currentRod.width() / 2) - ($ball.width() / 2) + "px"
            });
        }
    }

    function resetRods() {
        var centerLeft = $container.width() / 2 - $rod1.width() / 2;
        $rod1.css("left", centerLeft + "px");
        $rod2.css("left", centerLeft + "px");
    }

    function startGame() {
        if (!notInitial) resetBall();
        visibleScreen();
        yDirec = currentRod.is($rod2) ? -1 : 1;
        xDirec = Math.random() > 0.5 ? -1 : 1;
        id = setInterval(setBallPosition, 10);
        gameStart = true;
    }
    // Add visual effects when the ball hits a rod
function setBallPosition() {
    var ballTop = $ball.position().top;
    var ballLeft = $ball.position().left;
    var ballW = $ball.width();
    var ballH = $ball.height();
    var containerW = $container.width();
    var containerH = $container.height();

    if (ballLeft + ballW >= containerW || ballLeft <= 0) {
        xDirec *= -1;
    }

    if (singlePlayerMode) {
        if (ballTop < containerH / 2) {
            if (ballLeft > $rod1.position().left + $rod1.width() / 2) {
                $rod1.stop(true).animate({left: Math.min($rod1.position().left + aiSpeed, containerW - $rod1.width())}, 10);
            } else {
                $rod1.stop(true).animate({left: Math.max($rod1.position().left - aiSpeed, 0)}, 10);
            }
        }
    }

    if (ballTop <= $rod1.height() && yDirec < 0) {
        var rl = $rod1.position().left - ballW;
        var rr = $rod1.position().left + $rod1.width();

        if (ballLeft >= rl && ballLeft <= rr) {
            yDirec *= -1;
            score1++;
            $scoreDisp1.text("Player 1: " + score1);
            $rod1.effect("bounce", { times: 2 }, 200);
        } else {
            handleMiss(1);
            return;
        }
    } else if (ballTop + ballH >= containerH - $rod2.height() && yDirec > 0) {
        var rl = $rod2.position().left - ballW;
        var rr = $rod2.position().left + $rod2.width();

        if (ballLeft >= rl && ballLeft <= rr) {
            yDirec *= -1;
            score2++;
            $scoreDisp2.text("Player 2: " + score2);
            $rod2.effect("bounce", { times: 2 }, 200);
        } else {
            handleMiss(2);
            return;
        }
    }

    ballTop += yDirec;
    ballLeft += xDirec;
    $ball.css({
        top: ballTop + "px",
        left: ballLeft + "px"
    });

    notInitial = true;
}


    newGame();
});
