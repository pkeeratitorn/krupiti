// ============================================================
// ฟังก์ชันจัดการหน้าเว็บ (Render Logic)
// ============================================================

function renderSite() {
    // 1. ตรวจสอบว่ามีไฟล์ข้อมูลหรือไม่
    if (typeof SITE_DATA === 'undefined') {
        alert("ไม่พบข้อมูล! กรุณาตรวจสอบไฟล์ data.js");
        return;
    }

    const d = SITE_DATA; // ย่อตัวแปรให้สั้นลง

    // ฟังก์ชันย่อย: ใส่ข้อความธรรมดา (Text)
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.innerHTML = text; // ใช้ innerHTML เพื่อรองรับ <br>
    };

    // ฟังก์ชันย่อย: สร้างรายการ (List ul > li)
    const setList = (id, listArray) => {
        const el = document.getElementById(id);
        if (el && listArray) {
            el.innerHTML = ""; // เคลียร์ของเก่า
            listArray.forEach(item => {
                const li = document.createElement("li");
                li.innerText = item;
                el.appendChild(li);
            });
        }
    };

    // --- เริ่มใส่ข้อมูล ---

    // 1. Header
    setText('header-badge', d.header.badge);
    setText('header-title', d.header.title);
    setText('header-subtitle', d.header.subTitle);
    setText('header-school-year', d.header.schoolYear);
    setText('header-date', d.header.dateRange);

    // 2. Profile
    setText('profile-name', d.profile.name);
    setText('profile-position', d.profile.position);
    setText('profile-group', d.profile.group);
    setText('profile-school', d.profile.school);
    setText('profile-office', d.profile.office);
    
    // 3. Footer
    setText('footer-name', d.profile.name);
    setText('footer-position', d.profile.position);
    setText('footer-school', `${d.profile.school} ${d.profile.office}`);
    setText('footer-note', d.profile.footerNote);

    // 4. Workload
    setList('workload-teaching', d.workload.teaching);
    setList('workload-support', d.workload.support);

    // 5. PA Part 1 Cards (Card 1-3)
    const cards = [d.pa1.card1, d.pa1.card2, d.pa1.card3];
    cards.forEach((card, index) => {
        const i = index + 1;
        setText(`pa1-c${i}-icon`, card.icon);
        setText(`pa1-c${i}-title`, card.title);
        setText(`pa1-c${i}-desc`, card.desc);
        setList(`pa1-c${i}-list`, card.list);
    });

    // 6. Challenge
    setText('challenge-topic', d.challenge.topic);
    setText('challenge-target', d.challenge.target);
    setText('challenge-problem', d.challenge.problem);
    setText('challenge-method', d.challenge.method);
    setText('challenge-quant', d.challenge.outcomeQuant);
    setText('challenge-qual', d.challenge.outcomeQual);

    // Challenge Tags
    const tagContainer = document.getElementById('challenge-tags');
    if (tagContainer && d.challenge.tags) {
        tagContainer.innerHTML = "";
        d.challenge.tags.forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.innerText = tag;
            tagContainer.appendChild(span);
        });
    }

    // 7. PDF Document
    const pdfBtn = document.getElementById('pdf-download-btn');
    const pdfFrame = document.getElementById('pdf-iframe');
    const pdfLink = document.getElementById('pdf-fallback-link');
    if (d.document.fileName) {
        if(pdfBtn) pdfBtn.href = d.document.fileName;
        if(pdfFrame) pdfFrame.src = `${d.document.fileName}#toolbar=0`;
        if(pdfLink) pdfLink.href = d.document.fileName;
    }

    // 8. สร้าง Galleries (Evidence & Certificate)
    createGallery(d.evidence, 'evidence-gallery', 'evidence-count-badge', 'ภาพกิจกรรม');
    createGallery(d.certificates, 'cert-gallery', 'cert-count-badge', 'เกียรติบัตรฉบับ');
}

// ============================================================
// ฟังก์ชันสร้างแกลเลอรี่ (Core Logic)
// ============================================================
function createGallery(dataConfig, containerId, badgeId, defaultText) {
    const container = document.getElementById(containerId);
    const badge = document.getElementById(badgeId);

    if (container && badge && dataConfig) {
        badge.innerText = `พบข้อมูล ${dataConfig.total} รายการ`;

        for (let i = 1; i <= dataConfig.total; i++) {
            const fullPath = `${dataConfig.folder}${i}.jpg`;
            const captionText = dataConfig.captions[i] || `${defaultText}ที่ ${i}`;

            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.onclick = () => openLightbox(fullPath, captionText);

            const img = document.createElement('img');
            img.src = fullPath;
            img.alt = captionText;
            img.loading = "lazy";

            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerText = captionText;

            item.appendChild(img);
            item.appendChild(overlay);
            container.appendChild(item);
        }
    }
}

// ============================================================
// Lightbox & Utilities
// ============================================================
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const capText = document.getElementById('lightbox-caption');
    if(lightbox) {
        img.src = src;
        capText.innerText = caption;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) lightbox.classList.remove('active');
}

// Back to Top & Scroll
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// เริ่มทำงานเมื่อโหลดหน้าเว็บ
window.onload = renderSite;