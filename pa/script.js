// ==========================================
// ⚙️ 1. ตั้งค่า "ร่องรอยกิจกรรม" (Evidence)
// ==========================================
const evidenceConfig = {
    folder: 'images/',       // ชื่อโฟลเดอร์
    total: 10,               // ใส่จำนวนรูปร่องรอยจริง
    ext: '.jpg'
};

const evidenceCaptions = {
    1: "บรรยากาศการจัดการเรียนรู้แบบ Active Learning",
    2: "เข้าร่วมประชุมสามัญประจำเดือน",
    3: "ดำเนินการตรวจสอบการบันทึกผลการเรียนเทียบกับระบบ SGS",
    4: "มอบทุนปัจจัยพื้นฐานนักเรียนยากจนพิเศษ",
    5: "ร่วมกิจกรรมวันไหว้ครู",
    6: "รับการประเมิน อกตปน.",
    7: "ประชุมวางแผนเตรียมโครงการ Ipad เพื่อการศึกษา",
    8: "ดำเนินโครงการ Ipad เพื่อการศึกษาสำหรับครูและนักเรียน",
    9: "บรรยากาศการจัดการเรียนการสอน",
    10: "นำนักเรียนเข้าร่วมกีฬานักเรียนมัธยมศึกษา สพม.บุรีรัมย์",
};

// ==========================================
// ⚙️ 2. ตั้งค่า "เกียรติบัตร" (Certificates)
// ==========================================
const certConfig = {
    folder: 'certificates/', // ชื่อโฟลเดอร์ใหม่
    total: 7,                // **ใส่จำนวนรูปเกียรติบัตรจริง**
    ext: '.jpg'
};

const certCaptions = {
    1: "เกียรติบัตรอบรมหลักสูตรพัฒนาสมรรถนะดิจิทัลระดับพื้นฐาน",
    2: "เกียรติบัตรอบรมหลักสูตรพัฒนาทักษาภาษาอังกฤษ ระดับ A1",
    3: "เกียรติบัตรอบรมหลักสูตรพัฒนาทักษาภาษาอังกฤษ ระดับ A2",
    4: "เกียรติบัตรอบรมและผ่านการทดสอบการพัฒนาสมรรถนะทางภาษาจีน ระดับ 1",
    5: "เกียรติบัตรอบรมและผ่านการทดสอบการพัฒนาสมรรถนะทางภาษาจีน ระดับ 2",
    6: "เกียรติบัตรอบรมและผ่านการทดสอบการพัฒนาสมรรถนะทางภาษาจีน ระดับ 3",
    7: "เกียรติบัตรรับรองผลการสอบทักษะทางด้านภาษาอังกฤษ ผลรวมทั้ง 4 ทักษะ ระดับ B2",
};

// ==========================================
// 🛠️ ส่วนการทำงาน (Logic)
// ==========================================

// ฟังก์ชันสร้างแกลเลอรี่ (ใช้ร่วมกันได้ทั้ง 2 ส่วน)
function createGallery(config, captions, containerId, badgeId, defaultText) {
    const container = document.getElementById(containerId);
    const badge = document.getElementById(badgeId);

    if (badge) badge.innerText = `พบข้อมูล ${config.total} รายการ`;

    for (let i = 1; i <= config.total; i++) {
        const fullPath = `${config.folder}${i}${config.ext}`;
        const captionText = captions[i] || `${defaultText}ที่ ${i}`;

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

// สั่งให้ทำงานเมื่อโหลดเว็บเสร็จ
window.onload = function() {
    // สร้างแกลเลอรี่ร่องรอย
    createGallery(evidenceConfig, evidenceCaptions, 'evidence-gallery', 'evidence-count-badge', 'ภาพกิจกรรม');
    
    // สร้างแกลเลอรี่เกียรติบัตร
    createGallery(certConfig, certCaptions, 'cert-gallery', 'cert-count-badge', 'เกียรติบัตรฉบับ');
};

// ระบบ Lightbox
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const capText = document.getElementById('lightbox-caption');
    
    img.src = src;
    capText.innerText = caption;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// ปุ่ม Back to Top
const backToTopBtn = document.getElementById('backToTopBtn');
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
};

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});