/* ============================================
   Le Smash Club — Quiz Niveau Padel
   Vanilla JS, no dependencies
   ============================================ */

(function () {

    var QUESTIONS = [
        {
            text: "Depuis combien de temps pratiquez-vous le padel ?",
            answers: [
                { text: "Moins de 6 mois", value: 1 },
                { text: "6 mois \u00e0 2 ans", value: 2 },
                { text: "2 \u00e0 5 ans", value: 3 },
                { text: "Plus de 5 ans", value: 4 }
            ]
        },
        {
            text: "Comment d\u00e9crivez-vous votre coup droit (drive) ?",
            answers: [
                { text: "Je le rate souvent, j\u2019ai du mal \u00e0 contr\u00f4ler la balle", value: 1 },
                { text: "Je le r\u00e9ussis en situation stable, mais pas sous pression", value: 2 },
                { text: "Je le joue avec consistance et je place la balle", value: 3 },
                { text: "Je varie les effets et les trajectoires \u00e0 volont\u00e9", value: 4 }
            ]
        },
        {
            text: "Comment g\u00e9rez-vous les balles qui rebondissent sur les vitres ?",
            answers: [
                { text: "Je les laisse passer, je ne sais pas les lire", value: 1 },
                { text: "Je r\u00e9cup\u00e8re parfois, mais sans contr\u00f4le", value: 2 },
                { text: "Je lis bien le rebond et je relance correctement", value: 3 },
                { text: "Je transforme le rebond de vitre en opportunit\u00e9 d\u2019attaque", value: 4 }
            ]
        },
        {
            text: "\u00c0 quelle fr\u00e9quence montez-vous au filet pendant un match ?",
            answers: [
                { text: "Presque jamais, je reste en fond de court", value: 1 },
                { text: "Parfois, mais souvent au mauvais moment", value: 2 },
                { text: "R\u00e9guli\u00e8rement \u2014 je sais quand monter", value: 3 },
                { text: "Je domine le point depuis le filet naturellement", value: 4 }
            ]
        },
        {
            text: "Comment \u00e9valuez-vous vos smashs et bandejas ?",
            answers: [
                { text: "Je ne les ma\u00eetrise pas encore", value: 1 },
                { text: "Je frappe le smash mais sans placement pr\u00e9cis", value: 2 },
                { text: "Je choisis entre smash et bandeja selon la situation", value: 3 },
                { text: "Je finis les points au smash avec puissance et variation", value: 4 }
            ]
        },
        {
            text: "Comment jouez-vous avec votre partenaire en double ?",
            answers: [
                { text: "On se g\u00eane souvent, la communication est difficile", value: 1 },
                { text: "On se comprend sur les balles simples", value: 2 },
                { text: "On couvre le terrain ensemble et on communique bien", value: 3 },
                { text: "On a des automatismes tactiques et on construit les points \u00e0 deux", value: 4 }
            ]
        },
        {
            text: "Comment g\u00e9rez-vous la d\u00e9fense quand vous \u00eates coinc\u00e9 en fond de court ?",
            answers: [
                { text: "Je renvoie la balle sans vrai plan", value: 1 },
                { text: "J\u2019essaie de remettre la balle en jeu sans trop d\u2019erreurs", value: 2 },
                { text: "Je d\u00e9fends et je cherche le bon moment pour remonter", value: 3 },
                { text: "Je construis depuis la d\u00e9fense pour reprendre le filet", value: 4 }
            ]
        },
        {
            text: "\u00c0 combien de matchs ou tournois participez-vous par mois ?",
            answers: [
                { text: "Aucun encore, je m\u2019entra\u00eene seulement", value: 1 },
                { text: "1 \u00e0 2 matchs entre amis", value: 2 },
                { text: "3 \u00e0 5 matchs, dont parfois des tournois", value: 3 },
                { text: "6+ matchs, tournois r\u00e9guliers FFT", value: 4 }
            ]
        },
        {
            text: "Comment d\u00e9crivez-vous votre jeu au filet (vol\u00e9es et r\u00e9flexes) ?",
            answers: [
                { text: "Je n\u2019ai pas encore de r\u00e9flexes au filet", value: 1 },
                { text: "Je bloque les balles directes mais sans attaquer", value: 2 },
                { text: "Je place mes vol\u00e9es avec angle et bon timing", value: 3 },
                { text: "Je ferme les points avec des vol\u00e9es agressives et plac\u00e9es", value: 4 }
            ]
        }
    ];

    var RESULTS = [
        {
            minScore: 9, maxScore: 11,
            code: "P100", levelNum: 1, badge: "\ud83c\udf31",
            title: "Initiation \u2014 Niveau 1",
            description: "Vous d\u00e9butez l\u2019aventure padel ! C\u2019est la phase la plus excitante : chaque session apporte de nouvelles sensations. L\u2019essentiel \u00e0 ce stade, c\u2019est de prendre du plaisir et de comprendre les bases du jeu.",
            strengths: ["Motivation et envie d\u2019apprendre", "Capacit\u00e9 \u00e0 progresser rapidement", "Chaque session est une d\u00e9couverte"],
            improve: ["Ma\u00eetrise des coups de base (drive, revers)", "Lecture des rebonds sur les vitres", "Placement sur le terrain"]
        },
        {
            minScore: 12, maxScore: 14,
            code: "P250", levelNum: 2, badge: "\ud83c\udf3f",
            title: "D\u00e9butant \u2014 Niveau 2",
            description: "Vous avez les fondamentaux et vous commencez \u00e0 sentir le jeu. Vos \u00e9changes durent plus longtemps. C\u2019est le moment id\u00e9al pour rejoindre des cours collectifs et structurer votre progression.",
            strengths: ["Coups de base acquis", "Compr\u00e9hension de la logique des \u00e9changes", "Progr\u00e8s rapides avec de la r\u00e9gularit\u00e9"],
            improve: ["Gestion des balles de vitre en fond de court", "Coordination avec votre partenaire", "Premi\u00e8res mont\u00e9es au filet"]
        },
        {
            minScore: 15, maxScore: 17,
            code: "P500", levelNum: 3, badge: "\u26a1",
            title: "Interm\u00e9diaire d\u00e9butant \u2014 Niveau 3",
            description: "Vous jouez avec r\u00e9gularit\u00e9 et vous commencez \u00e0 construire des points. Vos rebonds de vitre sont ma\u00eetris\u00e9s en situation stable. Les tournois amateurs sont \u00e0 votre port\u00e9e.",
            strengths: ["R\u00e9gularit\u00e9 en situation de jeu simple", "Compr\u00e9hension du jeu en double", "Drive et revers fiables"],
            improve: ["Jeu sous pression et en d\u00e9fense profonde", "Bandeja et smash en match", "Lecture du jeu adverse"]
        },
        {
            minScore: 18, maxScore: 20,
            code: "P1000", levelNum: 4, badge: "\ud83c\udfaf",
            title: "Interm\u00e9diaire \u2014 Niveau 4",
            description: "Vous \u00eates \u00e0 l\u2019aise sur le terrain et votre tactique prend forme. La mont\u00e9e au filet devient un outil, pas un hasard. Les tournois FFT P1000 sont votre terrain naturel.",
            strengths: ["Jeu \u00e0 deux bien coordonn\u00e9", "Mont\u00e9e au filet ma\u00eetris\u00e9e", "Bonne lecture des rebonds"],
            improve: ["Variation d\u2019effets et de trajectoires", "Finition des points (smash, bandeja)", "Gestion du stress en comp\u00e9tition"]
        },
        {
            minScore: 21, maxScore: 23,
            code: "P2000", levelNum: 5, badge: "\ud83c\udfc5",
            title: "Interm\u00e9diaire avanc\u00e9 \u2014 Niveau 5",
            description: "Votre jeu est solide et complet. Vous participez r\u00e9guli\u00e8rement aux comp\u00e9titions et vous connaissez vos forces. La constance en comp\u00e9tition est votre prochain d\u00e9fi.",
            strengths: ["Technique compl\u00e8te et fiable", "Tactique de match \u00e9labor\u00e9e", "Bonne condition physique pour le padel"],
            improve: ["Constance sous haute pression", "Exploitation des faiblesses adverses", "Endurance sur les longs matchs"]
        },
        {
            minScore: 24, maxScore: 27,
            code: "P5000", levelNum: 6, badge: "\ud83d\udd25",
            title: "Avanc\u00e9 \u2014 Niveau 6",
            description: "Vous jouez \u00e0 un niveau \u00e9lev\u00e9 avec un jeu construit et vari\u00e9. Smashs et d\u00e9fenses sont vos armes. Vous \u00eates comp\u00e9titif dans les tournois r\u00e9gionaux FFT.",
            strengths: ["Jeu offensif et d\u00e9fensif \u00e9quilibr\u00e9", "Variation d\u2019effets ma\u00eetris\u00e9e", "Lecture tactique approfondie"],
            improve: ["R\u00e9gularit\u00e9 au plus haut niveau r\u00e9gional", "Puissance et pr\u00e9cision du smash en comp\u00e9tition", "Gestion mentale des moments cl\u00e9s"]
        },
        {
            minScore: 28, maxScore: 31,
            code: "P10000", levelNum: 7, badge: "\u2b50",
            title: "Expert \u2014 Niveau 7",
            description: "Vous \u00e9voluez au niveau national. Technique, tactique et physique sont au rendez-vous. Vous \u00eates un partenaire recherch\u00e9 et un adversaire redout\u00e9.",
            strengths: ["Ma\u00eetrise technique compl\u00e8te", "Lecture tactique avanc\u00e9e", "Consistance en tournois nationaux"],
            improve: ["Les d\u00e9tails qui s\u00e9parent l\u2019expert de l\u2019\u00e9lite", "Adaptation tactique en temps r\u00e9el", "Optimisation physique cibl\u00e9e"]
        },
        {
            minScore: 32, maxScore: 36,
            code: "P25000+", levelNum: 8, badge: "\ud83c\udfc6",
            title: "\u00c9lite nationale \u2014 Niveau 8",
            description: "Vous jouez au plus haut niveau amateur fran\u00e7ais. Votre padel est une arme compl\u00e8te. Vous \u00eates probablement licenci\u00e9 en club comp\u00e9titif et actif sur le circuit national FFT.",
            strengths: ["Niveau de jeu exceptionnel", "Automatismes tactiques avanc\u00e9s", "R\u00e9gularit\u00e9 en comp\u00e9tition nationale"],
            improve: ["L\u2019horizon : le circuit professionnel Premier Padel", "Coaching sp\u00e9cialis\u00e9 de haut niveau", "Pr\u00e9paration physique et mentale cibl\u00e9e"]
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

        // Animate out, swap, animate in
        quizCard.classList.add('quiz-card--exit');
        setTimeout(function () {
            quizCard.innerHTML = html;
            quizCard.classList.remove('quiz-card--exit');
            quizCard.classList.add('quiz-card--enter');
            setTimeout(function () { quizCard.classList.remove('quiz-card--enter'); }, 350);

            // Attach click handlers
            var buttons = quizCard.querySelectorAll('.quiz-answer');
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].addEventListener('click', handleAnswer);
            }
        }, 200);
    }

    function handleAnswer(e) {
        var btn = e.currentTarget;
        var value = parseInt(btn.dataset.value, 10);

        // Disable all buttons, highlight selected
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
                // Fill progress to 100%
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

            // Animate the fill bar over 5 seconds
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

        // Transition
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
        if (!quizCard) return; // Guard: only run on quiz page

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
