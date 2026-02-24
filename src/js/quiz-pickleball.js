/* ============================================
   Le Smash Club — Quiz Niveau Pickleball
   Vanilla JS, no dependencies
   ============================================ */

(function () {

    var QUESTIONS = [
        {
            text: "Depuis combien de temps pratiquez-vous le pickleball ?",
            answers: [
                { text: "Moins de 3 mois", value: 1 },
                { text: "3 mois \u00e0 1 an", value: 2 },
                { text: "1 \u00e0 3 ans", value: 3 },
                { text: "Plus de 3 ans", value: 4 }
            ]
        },
        {
            text: "Comment d\u00e9crivez-vous votre service ?",
            answers: [
                { text: "Je rate souvent ou je fais des fautes de pied", value: 1 },
                { text: "Je sers r\u00e9guli\u00e8rement mais sans variation", value: 2 },
                { text: "Je place mon service et je varie court/long", value: 3 },
                { text: "Mon service est une arme \u2014 spin, placement, puissance", value: 4 }
            ]
        },
        {
            text: "Comment g\u00e9rez-vous le jeu \u00e0 la kitchen (zone de non-vol\u00e9e) ?",
            answers: [
                { text: "Je ne sais pas trop quand y aller ni quoi y faire", value: 1 },
                { text: "J\u2019y vais mais je me fais souvent d\u00e9border", value: 2 },
                { text: "Je contr\u00f4le les \u00e9changes en dink et je suis patient", value: 3 },
                { text: "Je domine la kitchen \u2014 dinks, speed-ups, erne", value: 4 }
            ]
        },
        {
            text: "Comment jouez-vous le 3\u00e8me coup (apr\u00e8s le retour de service) ?",
            answers: [
                { text: "Je ne sais pas ce que c\u2019est", value: 1 },
                { text: "J\u2019essaie le drop mais il est souvent trop haut", value: 2 },
                { text: "Je choisis entre drive et drop selon la situation", value: 3 },
                { text: "Mon 3\u00e8me coup est pr\u00e9cis et me permet de monter au filet", value: 4 }
            ]
        },
        {
            text: "Quelle est votre ma\u00eetrise du dink ?",
            answers: [
                { text: "Je ne suis pas \u00e0 l\u2019aise avec ce coup", value: 1 },
                { text: "Je dink droit devant, sans trop de contr\u00f4le", value: 2 },
                { text: "Je dink crois\u00e9 avec r\u00e9gularit\u00e9 et patience", value: 3 },
                { text: "Je varie mes dinks (crois\u00e9s, courts, avec spin) pour cr\u00e9er des ouvertures", value: 4 }
            ]
        },
        {
            text: "Comment jouez-vous en double avec votre partenaire ?",
            answers: [
                { text: "On se g\u00eane, on ne sait pas qui prend la balle", value: 1 },
                { text: "On communique un peu, mais c\u2019est flou au milieu", value: 2 },
                { text: "On se d\u00e9place ensemble (stacking ou side-by-side) et on communique", value: 3 },
                { text: "On a des automatismes \u2014 couverture, switches, signaux", value: 4 }
            ]
        },
        {
            text: "Comment g\u00e9rez-vous les attaques adverses (drives, speed-ups) ?",
            answers: [
                { text: "Je subis, je recule ou je fais des fautes", value: 1 },
                { text: "Je bloque la balle mais sans la replacer pr\u00e9cis\u00e9ment", value: 2 },
                { text: "Je r\u00e9initialise l\u2019\u00e9change en remettant un dink ou un block propre", value: 3 },
                { text: "Je contre-attaque ou je neutralise avec un reset parfait", value: 4 }
            ]
        },
        {
            text: "\u00c0 quelle fr\u00e9quence jouez-vous et participez-vous \u00e0 des tournois ?",
            answers: [
                { text: "Je joue occasionnellement, pas de tournoi", value: 1 },
                { text: "Je joue 1 \u00e0 2 fois par semaine, pas encore de tournoi", value: 2 },
                { text: "Je joue 2 \u00e0 4 fois par semaine, quelques tournois", value: 3 },
                { text: "Je joue quasi quotidiennement et je fais des tournois r\u00e9guliers", value: 4 }
            ]
        },
        {
            text: "Comment d\u00e9crivez-vous votre strat\u00e9gie g\u00e9n\u00e9rale en match ?",
            answers: [
                { text: "Je n\u2019ai pas vraiment de plan, je r\u00e9agis", value: 1 },
                { text: "J\u2019essaie de garder la balle en jeu et d\u2019\u00e9viter les fautes", value: 2 },
                { text: "Je construis les points \u2014 je sais quand attaquer et quand patienter", value: 3 },
                { text: "J\u2019exploite les faiblesses adverses et j\u2019adapte ma tactique en temps r\u00e9el", value: 4 }
            ]
        }
    ];

    var RESULTS = [
        {
            minScore: 9, maxScore: 11,
            code: "DUPR 2.0", levelNum: 1, badge: "\ud83c\udf31",
            title: "D\u00e9butant \u2014 Niveau 1",
            description: "Vous d\u00e9couvrez le pickleball ! C\u2019est un sport qui s\u2019apprend vite \u2014 en quelques sessions, vous allez d\u00e9j\u00e0 sentir une vraie progression. Concentrez-vous sur le service, le retour et le positionnement de base.",
            strengths: ["Enthousiasme et curiosit\u00e9 pour le sport", "Progression rapide possible", "Le pickleball est con\u00e7u pour \u00eatre accessible"],
            improve: ["R\u00e9gularit\u00e9 du service et du retour", "Comprendre la zone de non-vol\u00e9e (kitchen)", "Positionnement de base sur le terrain"]
        },
        {
            minScore: 12, maxScore: 14,
            code: "DUPR 2.5", levelNum: 2, badge: "\ud83c\udf3f",
            title: "D\u00e9butant confirm\u00e9 \u2014 Niveau 2",
            description: "Vous connaissez les r\u00e8gles et vous tenez des \u00e9changes. Le service passe, les \u00e9changes durent. L\u2019\u00e9tape suivante : apprendre \u00e0 monter \u00e0 la kitchen et d\u00e9couvrir le dink.",
            strengths: ["R\u00e8gles comprises et appliqu\u00e9es", "\u00c9changes de plus en plus longs", "Service r\u00e9gulier"],
            improve: ["Apprentissage du dink", "Mont\u00e9e syst\u00e9matique \u00e0 la kitchen", "Coordination avec le partenaire"]
        },
        {
            minScore: 15, maxScore: 17,
            code: "DUPR 3.0", levelNum: 3, badge: "\u26a1",
            title: "Interm\u00e9diaire \u2014 Niveau 3",
            description: "Vous jouez r\u00e9guli\u00e8rement et vous avez compris l\u2019importance de la kitchen. Le dink fait partie de votre jeu. Vous commencez \u00e0 construire des points au lieu de juste renvoyer la balle.",
            strengths: ["Jeu \u00e0 la kitchen en d\u00e9veloppement", "Compr\u00e9hension de la strat\u00e9gie de base", "R\u00e9gularit\u00e9 en progression"],
            improve: ["3\u00e8me coup (drop shot) \u00e0 travailler", "Patience dans les \u00e9changes de dinks", "Lecture du jeu adverse"]
        },
        {
            minScore: 18, maxScore: 20,
            code: "DUPR 3.5", levelNum: 4, badge: "\ud83c\udfaf",
            title: "Interm\u00e9diaire avanc\u00e9 \u2014 Niveau 4",
            description: "Vous avez un jeu structur\u00e9. Le 3\u00e8me coup, les dinks crois\u00e9s et la patience font partie de votre arsenal. Vous \u00eates pr\u00eat pour vos premiers tournois si ce n\u2019est pas d\u00e9j\u00e0 fait.",
            strengths: ["3\u00e8me coup (drop/drive) fonctionnel", "Dinks crois\u00e9s r\u00e9guliers", "Bonne compr\u00e9hension du jeu en double"],
            improve: ["Gestion des speed-ups et contre-attaques", "Variation des placements", "R\u00e9gularit\u00e9 sous pression en match"]
        },
        {
            minScore: 21, maxScore: 23,
            code: "DUPR 4.0", levelNum: 5, badge: "\ud83c\udfc5",
            title: "Avanc\u00e9 \u2014 Niveau 5",
            description: "Vous \u00eates un joueur comp\u00e9titif. Votre jeu est complet : dinks, drives, drops, vol\u00e9es. Vous savez quand acc\u00e9l\u00e9rer et quand patienter. Les tournois sont votre terrain de progression.",
            strengths: ["Arsenal technique complet", "Tactique de match \u00e9labor\u00e9e", "Bonne lecture du jeu"],
            improve: ["Constance au plus haut niveau", "Coups sp\u00e9ciaux (erne, ATP, around-the-post)", "Gestion mentale des moments cl\u00e9s"]
        },
        {
            minScore: 24, maxScore: 27,
            code: "DUPR 4.5", levelNum: 6, badge: "\ud83d\udd25",
            title: "Avanc\u00e9 confirm\u00e9 \u2014 Niveau 6",
            description: "Votre jeu est solide et vari\u00e9. Vous imposez votre rythme, vous exploitez les faiblesses adverses et vous \u00eates performant en tournoi. Le haut niveau amateur est votre quotidien.",
            strengths: ["Jeu offensif et d\u00e9fensif ma\u00eetris\u00e9", "Adaptabilit\u00e9 tactique", "Exp\u00e9rience comp\u00e9titive solide"],
            improve: ["Optimisation des transitions attaque/d\u00e9fense", "Pr\u00e9paration physique sp\u00e9cifique", "Consistance sur la dur\u00e9e d\u2019un tournoi"]
        },
        {
            minScore: 28, maxScore: 31,
            code: "DUPR 5.0", levelNum: 7, badge: "\u2b50",
            title: "Expert \u2014 Niveau 7",
            description: "Vous jouez au niveau national. Votre technique est quasi irr\u00e9prochable, votre tactique affin\u00e9e. Vous \u00eates un partenaire de double tr\u00e8s recherch\u00e9.",
            strengths: ["Ma\u00eetrise technique compl\u00e8te", "Lecture tactique avanc\u00e9e", "Performance r\u00e9guli\u00e8re en comp\u00e9tition"],
            improve: ["D\u00e9tails qui s\u00e9parent l\u2019expert du professionnel", "Coaching sp\u00e9cialis\u00e9 de haut niveau", "Pr\u00e9paration mentale pouss\u00e9e"]
        },
        {
            minScore: 32, maxScore: 36,
            code: "DUPR 5.5+", levelNum: 8, badge: "\ud83c\udfc6",
            title: "\u00c9lite \u2014 Niveau 8",
            description: "Vous \u00eates parmi les meilleurs joueurs de pickleball en France. Votre jeu est complet, votre exp\u00e9rience comp\u00e9titive profonde. Le circuit pro est \u00e0 votre port\u00e9e.",
            strengths: ["Niveau de jeu exceptionnel", "Automatismes tactiques de haut vol", "R\u00e9gularit\u00e9 en comp\u00e9tition nationale"],
            improve: ["Circuit professionnel PPA / MLP", "Coaching et sparring au plus haut niveau", "Optimisation physique et mentale cibl\u00e9e"]
        }
    ];

    // State
    var currentQuestion = 0;
    var totalScore = 0;

    // DOM refs
    var quizProgress, quizProgressFill, quizProgressLabel;
    var quizCard, quizStartBtn;
    var quizResults, quizResultsBadge, quizResultsLevel, quizResultsTitle;
    var quizResultsDesc, quizResultsStrengths, quizResultsImprove;
    var quizRestartBtn, quizNewsletter;

    function getResult(score) {
        for (var i = 0; i < RESULTS.length; i++) {
            if (score >= RESULTS[i].minScore && score <= RESULTS[i].maxScore) return RESULTS[i];
        }
        return RESULTS[0];
    }

    function updateProgress(questionIndex) {
        var pct = Math.round((questionIndex / QUESTIONS.length) * 100);
        quizProgressFill.style.width = pct + '%';
        quizProgressLabel.textContent = 'Question ' + (questionIndex + 1) + ' / ' + QUESTIONS.length;
    }

    function renderQuestion(index) {
        var q = QUESTIONS[index];
        var letters = ['A', 'B', 'C', 'D'];

        var html = '<div class="quiz-question">' +
            '<p class="quiz-question__number">Question ' + (index + 1) + ' sur ' + QUESTIONS.length + '</p>' +
            '<h2 class="quiz-question__text">' + q.text + '</h2>' +
            '<ul class="quiz-answers" role="list">';

        for (var i = 0; i < q.answers.length; i++) {
            html += '<li><button class="quiz-answer" data-value="' + q.answers[i].value + '">' +
                '<span class="quiz-answer__letter">' + letters[i] + '</span>' +
                '<span class="quiz-answer__text">' + q.answers[i].text + '</span>' +
                '</button></li>';
        }

        html += '</ul></div>';

        quizCard.classList.add('quiz-card--exit');
        setTimeout(function () {
            quizCard.innerHTML = html;
            quizCard.classList.remove('quiz-card--exit');
            quizCard.classList.add('quiz-card--enter');
            setTimeout(function () { quizCard.classList.remove('quiz-card--enter'); }, 350);

            var buttons = quizCard.querySelectorAll('.quiz-answer');
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].addEventListener('click', handleAnswer);
            }
        }, 200);
    }

    function handleAnswer(e) {
        var btn = e.currentTarget;
        var value = parseInt(btn.dataset.value, 10);

        var allBtns = quizCard.querySelectorAll('.quiz-answer');
        for (var i = 0; i < allBtns.length; i++) {
            allBtns[i].disabled = true;
        }
        btn.classList.add('quiz-answer--selected');

        totalScore += value;

        setTimeout(function () {
            currentQuestion++;
            if (currentQuestion < QUESTIONS.length) {
                updateProgress(currentQuestion);
                renderQuestion(currentQuestion);
            } else {
                quizProgressFill.style.width = '100%';
                quizProgressLabel.textContent = 'Termin\u00e9 !';
                showLoader();
            }
        }, 400);
    }

    function showLoader() {
        var duration = 5;
        var elapsed = 0;

        var html = '<div class="quiz-loader">' +
            '<div class="quiz-loader__spinner"></div>' +
            '<p class="quiz-loader__text">Analyse de vos r\u00e9ponses en cours\u2026</p>' +
            '<div class="quiz-loader__bar"><div class="quiz-loader__fill" id="loaderFill"></div></div>' +
            '<p class="quiz-loader__counter" id="loaderCounter">' + duration + 's</p>' +
            '</div>';

        quizCard.classList.add('quiz-card--exit');
        setTimeout(function () {
            quizCard.innerHTML = html;
            quizCard.classList.remove('quiz-card--exit');
            quizCard.classList.add('quiz-card--enter');
            setTimeout(function () { quizCard.classList.remove('quiz-card--enter'); }, 350);

            var fill = document.getElementById('loaderFill');
            var counter = document.getElementById('loaderCounter');

            requestAnimationFrame(function () {
                fill.style.width = '100%';
            });

            var interval = setInterval(function () {
                elapsed++;
                var remaining = duration - elapsed;
                counter.textContent = remaining + 's';
                if (remaining <= 0) {
                    clearInterval(interval);
                    showResults();
                }
            }, 1000);
        }, 200);
    }

    function showResults() {
        var result = getResult(totalScore);

        quizResultsBadge.textContent = result.badge;
        quizResultsLevel.textContent = result.code + ' \u2014 Niveau ' + result.levelNum + '/8';
        quizResultsTitle.textContent = result.title;
        quizResultsDesc.textContent = result.description;

        var sHTML = '';
        for (var i = 0; i < result.strengths.length; i++) {
            sHTML += '<li>' + result.strengths[i] + '</li>';
        }
        quizResultsStrengths.innerHTML = sHTML;

        var iHTML = '';
        for (var j = 0; j < result.improve.length; j++) {
            iHTML += '<li>' + result.improve[j] + '</li>';
        }
        quizResultsImprove.innerHTML = iHTML;

        quizCard.classList.add('quiz-card--exit');
        setTimeout(function () {
            quizCard.hidden = true;
            quizProgress.hidden = true;
            quizResults.hidden = false;
            quizResults.classList.add('quiz-results--enter');
            setTimeout(function () { quizResults.classList.remove('quiz-results--enter'); }, 500);
            quizNewsletter.hidden = false;
        }, 250);
    }

    function resetQuiz() {
        currentQuestion = 0;
        totalScore = 0;

        quizResults.hidden = true;
        quizNewsletter.hidden = true;
        quizCard.hidden = false;
        quizProgress.hidden = false;

        quizProgressFill.style.width = '0%';
        quizProgressLabel.textContent = 'Question 1 / ' + QUESTIONS.length;

        renderQuestion(0);
    }

    function startQuiz() {
        document.getElementById('quizStart').hidden = true;
        quizProgress.hidden = false;
        updateProgress(0);
        renderQuestion(0);
    }

    // Init
    document.addEventListener('DOMContentLoaded', function () {
        quizCard = document.getElementById('quizCard');
        if (!quizCard) return;

        quizProgress = document.getElementById('quizProgress');
        quizProgressFill = document.getElementById('quizProgressFill');
        quizProgressLabel = document.getElementById('quizProgressLabel');
        quizStartBtn = document.getElementById('quizStartBtn');
        quizResults = document.getElementById('quizResults');
        quizResultsBadge = document.getElementById('quizResultsBadge');
        quizResultsLevel = document.getElementById('quizResultsLevel');
        quizResultsTitle = document.getElementById('quizResultsTitle');
        quizResultsDesc = document.getElementById('quizResultsDesc');
        quizResultsStrengths = document.getElementById('quizResultsStrengths');
        quizResultsImprove = document.getElementById('quizResultsImprove');
        quizRestartBtn = document.getElementById('quizRestartBtn');
        quizNewsletter = document.getElementById('quizNewsletter');

        quizStartBtn.addEventListener('click', startQuiz);
        quizRestartBtn.addEventListener('click', resetQuiz);
    });

})();
