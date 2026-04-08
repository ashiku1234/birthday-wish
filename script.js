document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const letterContainer = document.getElementById('letterContainer');
    const unfoldButton = document.getElementById('unfold-button');
    const greetingTextElement = document.getElementById('greetingText');

    // NEW elements (safe check to avoid errors if not present)
    const btn = document.getElementById("surpriseBtn");
    const overlay = document.getElementById("overlay");
    const music = document.getElementById("music");
    const typingText = document.getElementById("typingText");

    // --- Step 1 to Step 2 Transition ---
    envelopeContainer.addEventListener('click', () => {
        envelopeContainer.classList.add('open');
        setTimeout(() => {
            step1.classList.remove('active');
            step2.classList.add('active');
            setTimeout(() => letterContainer.classList.add('show'), 100);
        }, 700);
    });

    // --- Step 2 to Step 3 Transition ---
    unfoldButton.addEventListener('click', () => {
        step2.classList.remove('active');
        step3.classList.add('active');
        if (music) music.play();
        startFinalAnimations();
    });

    function startFinalAnimations() {
        // Typewriter effect (existing)
        const greeting = "Happy Birthday,";
        let i = 0;
        greetingTextElement.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        greetingTextElement.appendChild(cursor);

        const typing = setInterval(() => {
            if (i < greeting.length) {
                greetingTextElement.insertBefore(document.createTextNode(greeting.charAt(i)), cursor);
                i++;
            } else {
                clearInterval(typing);
                cursor.style.animation = 'none';
                cursor.style.display = 'none';
            }
        }, 100);

        // Balloon animation
        createBalloons(15);
    }

    function createBalloons(count) {
        const colors = ['#e94560', '#f0e68c', '#00d8d6', '#8e44ad', '#3498db'];
        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.animationDuration = `${Math.random() * 6 + 8}s`;
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(balloon);
        }
    }

    // =========================
    // 🎁 NEW SURPRISE FEATURE
    // =========================

    if (btn) {
        btn.addEventListener("click", () => {
            overlay.style.display = "flex"
            if (music) music.play();
            typeMessage();
            startConfetti();
        });
    }

    // Typing effect (new message)
    const message = "You’re stuck with me forever 😛🎀\nHappy Birthday tanvee my friend🫠🎀\nI'm gonna be little dramtic like an old uncle \n but 'meri umar tumhe lag jaye🤧🎀'";

    function typeMessage() {
    if (!typingText) return;

    typingText.innerHTML = "";

    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    typingText.appendChild(cursor);

    let i = 0;

    function typing() {
        if (i < message.length) {
            const char = message.charAt(i);

            typingText.insertBefore(document.createTextNode(char), cursor);
            i++;

            let delay = 40;

            // natural pauses 😏
            if (char === "\n") delay = 300;
            if (char === "." || char === "," || char === "😛" || char === "🎀") delay = 150;

            setTimeout(typing, delay);
        } else {
            setTimeout(() => cursor.style.display = "none", 1000);
        }
    }

    typing();
}

    // Confetti
    function startConfetti() {
        const canvas = document.getElementById("confetti");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let confetti = [];

        for (let i = 0; i < 120; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 6 + 2
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "pink";

            confetti.forEach(c => {
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
                ctx.fill();

                c.y += 2;
                if (c.y > canvas.height) c.y = 0;
            });

            requestAnimationFrame(draw);
        }

        draw();
    }
});