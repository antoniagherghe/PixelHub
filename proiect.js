document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const loginBtn = document.getElementById('btn-login');
    const userInput = document.getElementById('user-input');
    const ajaxContent = document.getElementById('ajax-content');
    const body = document.querySelector('body');

    logo.addEventListener('click', (e) => {
        const neon = ['#0ff', '#f0f', '#0f0', '#ff0', '#fff'];
        const randomColor = neon[Math.floor(Math.random() * neon.length)];
        
        logo.style.transition = "0.5s";
        logo.style.color = randomColor;

        e.stopPropagation(); 
        console.log("Click pe logo - propagarea a fost oprită.");
    });

    setInterval(() => {
        const offset = Math.floor(Math.random() * 10) - 5; 
        logo.style.position = "relative";
        logo.style.left = offset + "px";
    }, 10000);

    function checkSession() {
        const sessionData = localStorage.getItem('pixelHubUser');
        if (sessionData) {
            const user = JSON.parse(sessionData);
            document.getElementById('container-login').style.display = 'none';
            document.getElementById('user-welcome').style.display = 'block';
            document.getElementById('user-display').innerText = user.name.toUpperCase();
            document.getElementById('session-info').innerText = "Sesiune începută la: " + user.date;
        }
    }

    loginBtn.addEventListener('click', () => {
        const username = userInput.value;
        const regulaValidare = /^[a-zA-Z0-9]{3,}$/;

        if (regulaValidare.test(username)) {
            const userData = {
                name: username,
                date: new Date().toLocaleString()
            };
            localStorage.setItem('pixelHubUser', JSON.stringify(userData));
            location.reload();
        } else {
            alert("Username invalid! Minim 3 caractere alfanumerice.");
            userInput.style.borderColor = "red";
        }
    });

    document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('pixelHubUser');
        location.reload();
    });

    function loadPartnerData() {
        fetch('date.json')
            .then(response => response.json())
            .then(data => {
                const evenimenteValide = data.filter(item => item.premiu !== "");

                evenimenteValide.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 's1';
                    card.innerHTML = `
                        <h4 style="color:#f0f">${item.titlu}</h4>
                        <p>${item.data}</p>
                        <small>Info: ${item.premiu}</small>
                    `;
                    ajaxContent.appendChild(card);
                });
            })
            .catch(err => console.error("Eroare AJAX:", err));
    }

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });

    setTimeout(() => {
        const promo = document.createElement('div');
        promo.id = "promo-pop";
        promo.innerHTML = "⚡ Reducere 10% activă! <button id='close-promo'>X</button>";
        promo.style = "position:fixed; top:20px; right:20px; background:#0ff; color:#000; padding:15px; border-radius:5px; z-index:9999;";
        document.body.appendChild(promo);

        document.getElementById('close-promo').onclick = function(e) {
            e.target.parentElement.remove();
        };
    }, 5000);

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        sec.addEventListener('mouseenter', (e) => {
            const stil = window.getComputedStyle(e.currentTarget);
            console.log("Culoare fundal secțiune:", stil.backgroundColor);
            e.currentTarget.classList.add('highlight-section');
        });
    });

    checkSession();
    loadPartnerData();

    const canvas = document.getElementById('canva');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        ctx.arc(50, 50, 40, 0, 2 * Math.PI);
        ctx.fillStyle = "#0ff";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#0ff";
        ctx.fill();
    }
});