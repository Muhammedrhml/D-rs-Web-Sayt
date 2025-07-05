let currentQuestionIndex = 0;
let rejectionCount = 0;
let maxRejections = 3;
let isReconciled = false;

const questions = [
    {
        title: "💔 Küsmüş müsün bana?",
        text: "Yoksa bana kızgın mısın aşkım? Gözlerinden belli oluyor...",
        yesText: "Evet, kızgınım",
        noText: "Hayır, kızgın değilim",
        rejectionMessages: [
            "Aa hayır, biliyorum kızgınsın... Gözlerindeki o parıltı yok. Lütfen doğruyu söyle 💔",
            "Aşkım, beni kandırmaya çalışma. Sesinizden belli oluyor. Gerçekten küsmüş müsün? 😢",
            "Tamam tamam, anlıyorum... Ama lütfen son bir kez söyle, gerçekten kızgın mısın? 🥺"
        ]
    },
    {
        title: "🤗 Barışalım mı?",
        text: "Biliyorum hata yaptım... Ama seninle barışmak istiyorum. Kabul eder misin?",
        yesText: "Tamam, barışalım",
        noText: "Hayır, daha erken",
        rejectionMessages: [
            "Aşkım lütfen... Çok pişmanım. Bir kez daha düşün, barışalım mı? 😔",
            "Biliyorum hak veriyorum sana ama... Seni çok seviyorum. Lütfen barışalım? 💕",
            "Son kez soruyorum aşkım... Gerçekten barışmak istemez misin? Seni o kadar çok seviyorum ki... 💖"
        ]
    },
    {
        title: "💕 Beni sevdiğini söyle",
        text: "Barıştığımız için çok mutluyum... Ama bir kez daha duymak istiyorum. Beni seviyor musun?",
        yesText: "Evet, seni seviyorum",
        noText: "Bilmiyorum",
        rejectionMessages: [
            "Aşkım, kalbim kırılıyor... Biliyorum seviyorsun beni. Lütfen söyle 💔",
            "Seni nasıl bu kadar sevebilirim acaba... Lütfen sen de sevdiğini söyle 💘",
            "Tamam, senin sessizliğin bile bir cevap... Ama lütfen beni sevdiğini söyle 💝"
        ]
    }
];

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function startQuestions() {
    currentQuestionIndex = 0;
    rejectionCount = 0;
    showNextQuestion();
}

function showNextQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = question.title;
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('yes-btn').textContent = question.yesText;
    document.getElementById('no-btn').textContent = question.noText;
    document.getElementById('rejection-message').innerHTML = '';
    
    showScreen('question-screen');
}

function handleYes() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        rejectionCount = 0;
        showNextQuestion();
    } else {
        isReconciled = true;
        showScreen('date-input-screen');
    }
}

function handleNo() {
    const question = questions[currentQuestionIndex];
    
    if (rejectionCount < maxRejections) {
        const rejectionMessage = question.rejectionMessages[rejectionCount];
        document.getElementById('rejection-message').innerHTML = rejectionMessage;
        rejectionCount++;
        
        // Kalp animasyonu ekle
        addHeartAnimation();
        
        // Eğer maksimum red sayısına ulaştıysak, otomatik kabul et
        if (rejectionCount >= maxRejections) {
            setTimeout(() => {
                document.getElementById('rejection-message').innerHTML = 
                    "Tamam aşkım, anlıyorum... Ama biliyorum ki içten içe kabul etmek istiyorsun 💕";
                
                setTimeout(() => {
                    handleYes();
                }, 2000);
            }, 1500);
        }
    }
}

function addHeartAnimation() {
    const container = document.querySelector('.container');
    const heart = document.createElement('div');
    heart.innerHTML = '💔';
    heart.style.position = 'absolute';
    heart.style.fontSize = '2em';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.animation = 'heartBreak 2s ease-out forwards';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    
    container.appendChild(heart);
    
    // CSS animasyonu ekle
    if (!document.querySelector('#heart-break-style')) {
        const style = document.createElement('style');
        style.id = 'heart-break-style';
        style.textContent = `
            @keyframes heartBreak {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
                100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

function calculateTime() {
    const meetingDate = document.getElementById('meeting-date').value;
    
    if (!meetingDate) {
        alert('Lütfen tanışma tarihini giriniz!');
        return;
    }
    
    const startDate = new Date(meetingDate);
    const now = new Date();
    const timeDifference = now - startDate;
    
    if (timeDifference < 0) {
        alert('Tanışma tarihi gelecekte olamaz!');
        return;
    }
    
    // Zaman hesaplamaları
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.44); // Ortalama ay günü
    const years = Math.floor(days / 365.25); // Artık yılları dahil
    
    // Kalan değerleri hesapla
    const remainingDays = days % 365;
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    
    let timeText = `
        <div style="font-size: 1.1em; margin-bottom: 15px;">
            <strong>🎉 Tanışalı geçen zaman:</strong>
        </div>
        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin: 10px 0;">
            📅 <strong>${days}</strong> gün
        </div>
        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin: 10px 0;">
            ⏰ <strong>${hours}</strong> saat
        </div>
        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin: 10px 0;">
            ⏱️ <strong>${minutes}</strong> dakika
        </div>
        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin: 10px 0;">
            ⚡ <strong>${seconds}</strong> saniye
        </div>
    `;
    
    if (years > 0) {
        timeText += `
            <div style="background: rgba(255,255,255,0.3); padding: 20px; border-radius: 15px; margin: 20px 0; border: 2px solid #fff;">
                <div style="font-size: 1.2em; margin-bottom: 10px;">
                    🎂 <strong>${years}</strong> yıl birlikte geçirdik!
                </div>
                <div style="font-size: 0.9em; opacity: 0.9;">
                    (${months} ay, ${remainingDays} gün)
                </div>
            </div>
        `;
    }
    
    document.getElementById('time-display').innerHTML = timeText;
    
    // Gerçek zamanlı güncelleme başlat
    startRealTimeUpdate(startDate);
    
    showScreen('result-screen');
}

function startRealTimeUpdate(startDate) {
    setInterval(() => {
        const now = new Date();
        const timeDifference = now - startDate;
        
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        // Sadece temel sayıları güncelle
        const timeElements = document.querySelectorAll('#time-display > div');
        if (timeElements.length >= 4) {
            timeElements[1].innerHTML = `📅 <strong>${days}</strong> gün`;
            timeElements[2].innerHTML = `⏰ <strong>${hours}</strong> saat`;
            timeElements[3].innerHTML = `⏱️ <strong>${minutes}</strong> dakika`;
            timeElements[4].innerHTML = `⚡ <strong>${seconds}</strong> saniye`;
        }
    }, 1000);
}

function restart() {
    currentQuestionIndex = 0;
    rejectionCount = 0;
    isReconciled = false;
    showScreen('welcome-screen');
}

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Bugünün tarihini default olarak set et
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    document.getElementById('meeting-date').value = thirtyDaysAgo.toISOString().split('T')[0];
    
    // Floating hearts animasyonunu başlat
    startFloatingHearts();
});

function startFloatingHearts() {
    const hearts = document.querySelectorAll('.floating-hearts .heart');
    hearts.forEach((heart, index) => {
        heart.style.animationDelay = `${index * 1.2}s`;
        heart.style.left = `${Math.random() * 100}%`;
    });
}

// Klavye kısayolları
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen.id === 'welcome-screen') {
            startQuestions();
        } else if (activeScreen.id === 'question-screen') {
            handleYes();
        } else if (activeScreen.id === 'date-input-screen') {
            calculateTime();
        }
    }
});

// Sevgi mesajları array'i
const loveMessages = [
    "Her gün seni daha çok seviyorum 💕",
    "Seninle geçen her anı değerli 💖",
    "Barıştığımız için çok mutluyum 🥰",
    "Sen benim dünyamsın 🌍",
    "Seni seviyorum aşkım 💝"
];

// Random sevgi mesajı göster
function showRandomLoveMessage() {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = randomMessage;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.background = 'rgba(255, 107, 107, 0.9)';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '10px 20px';
    messageDiv.style.borderRadius = '20px';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.animation = 'fadeIn 0.5s ease-in-out';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Her 30 saniyede bir sevgi mesajı göster
setInterval(showRandomLoveMessage, 30000);