/* ==========================================================================
   VIBE CARD AI - ENGINE & INTERACTIVITY (GEN Z 2026)
   TÍCH HỢP QUẺ VIBE, THẦN SỐ HỌC CÔNG DANH, BÓI HỢP ĐÔI & VÒNG QUAY MAY MẮN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE & CONFIG ---
  const state = {
    activeMode: 'vibe', // 'vibe', 'career', or 'couple'
    userName: '',
    userZodiac: '',
    userBirthdate: '',
    coupleName2: '',
    coupleZodiac2: '',
    selectedMoods: [],
    currentHash: 0,
    fortuneData: null,
    isSoundOn: true,
    currentThemeIndex: 0,
    themes: ['theme-dark', 'theme-cyber', 'theme-pastel'],
    isVipUnlocked: false
  };

  // --- USER QUOTA & VIP MANAGEMENT ---
  function getUserState() {
    let usageCount = parseInt(localStorage.getItem('vibe_user_usage_count') || '0');
    let userStatus = localStorage.getItem('vibe_user_status') || 'free';
    let userId = localStorage.getItem('vibe_user_id');
    
    if (!userId) {
      userId = 'USER' + Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem('vibe_user_id', userId);
    }

    return { usageCount, userStatus, userId };
  }

  function updateUsageBadge() {
    const userState = getUserState();
    const badge = document.getElementById('usageCountBadge');
    if (!badge) return;
    
    if (userState.userStatus === 'vip') {
      badge.innerHTML = '<i class="fa-solid fa-crown" style="color: #f59e0b;"></i> VIP: Không Giới Hạn';
      badge.style.background = 'rgba(245, 158, 11, 0.2)';
      badge.style.color = '#fbbf24';
      badge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
    } else {
      const remaining = Math.max(0, 3 - userState.usageCount);
      badge.innerHTML = `<i class="fa-solid fa-eye"></i> Lượt xem: ${remaining}/3`;
      if (remaining === 0) {
        badge.style.background = 'rgba(239, 68, 68, 0.2)';
        badge.style.color = '#f87171';
        badge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      } else {
        badge.style.background = 'rgba(236, 72, 153, 0.2)';
        badge.style.color = '#f472b6';
        badge.style.borderColor = 'rgba(236, 72, 153, 0.4)';
      }
    }
  }

  function openLimitModal() {
    const userState = getUserState();
    const limitModal = document.getElementById('limitModal');
    document.getElementById('limitTransferCode').innerText = `VIBE VIP ${userState.userId}`;
    limitModal.classList.remove('hidden');
  }

  // --- SOUND SYNTHESIZER ---
  const AudioEngine = {
    ctx: null,
    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    },
    playClick() {
      if (!state.isSoundOn) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    },
    playGachaSound() {
      if (!state.isSoundOn) return;
      this.init();
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        gain.gain.setValueAtTime(0.2, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.4);
      });
    },
    playFlip() {
      if (!state.isSoundOn) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    }
  };

  // --- DETERMINISTIC HASH & CALCULATORS ---
  function getTodayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function calculateLifePathNumber(birthdateStr) {
    const digits = birthdateStr.replace(/-/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  }

  // --- MATRICES DATA ---
  const ZODIAC_DATA = {
    Aries: { name: 'Bạch Dương', symbol: '♈', element: 'Lửa' },
    Taurus: { name: 'Kim Ngưu', symbol: '♉', element: 'Đất' },
    Gemini: { name: 'Song Tử', symbol: '♊', element: 'Khí' },
    Cancer: { name: 'Cự Giải', symbol: '♋', element: 'Nước' },
    Leo: { name: 'Sư Tử', symbol: '♌', element: 'Lửa' },
    Virgo: { name: 'Xử Nữ', symbol: '♍', element: 'Đất' },
    Libra: { name: 'Thiên Bình', symbol: '♎', element: 'Khí' },
    Scorpio: { name: 'Bọ Cạp', symbol: '♏', element: 'Nước' },
    Sagittarius: { name: 'Nhân Mã', symbol: '♐', element: 'Lửa' },
    Capricorn: { name: 'Ma Kết', symbol: '♑', element: 'Đất' },
    Aquarius: { name: 'Bảo Bình', symbol: '♒', element: 'Khí' },
    Pisces: { name: 'Song Ngư', symbol: '♓', element: 'Nước' }
  };

  const NUMEROLOGY_CAREER_DATA = {
    1: { title: 'Con Số 1 - Nhà Lãnh Đạo Tiên Phong', role: 'CEO Khởi Nghiệp', bestCareers: ['Founder Khởi Nghiệp', 'Giám Đốc Dự Án', 'Quản Lý Sáng Tạo'], boomYears: '2026 - 2028', advice: 'Năm 2026 là thời điểm vàng để bạn đứng ra làm chủ hoặc tự phát triển dự án riêng. Cứ tự tin bứt phá!' },
    2: { title: 'Con Số 2 - Nhà Ngoại Giao & Kết Nối', role: 'Chuyên Gia HR', bestCareers: ['Quản Lý Nhân Sự (HR)', 'Chuyên Viên Truyền Thông', 'Tư Vấn Tâm Lý'], boomYears: '2026 - 2027', advice: 'Tập trung mở rộng các mối quan hệ chất lượng. Quý nhân sẽ mang lại những hợp đồng phát tài lớn.' },
    3: { title: 'Con Số 3 - Thần Thái Truyền Cảm Hứng', role: 'Content Creator', bestCareers: ['Sáng Tạo Nội Dung (TikToker)', 'Designer', 'Content Lead'], boomYears: '2026 - 2029', advice: 'Sự nghiệp thăng hoa khi được sáng tạo tự do. Đừng ngại chia sẻ cá tính cá nhân lên mạng xã hội!' },
    4: { title: 'Con Số 4 - Chuyên Gia Chiến Lược Vững Chắc', role: 'Kỹ Sư AI', bestCareers: ['Kỹ Sư Công Nghệ / AI', 'Kế Toán / Kiểm Toán', 'Quản Lý Vận Hành'], boomYears: '2027 - 2029', advice: 'Tập trung rèn luyện kỹ năng chuyên môn sâu. Sự kiên trì của bạn sẽ gặt hái thăng tiến lớn.' },
    5: { title: 'Con Số 5 - Nhà Đổi Mới & Bắt Trend', role: 'Digital Marketer', bestCareers: ['Chuyên Gia Marketing Số', 'Tổ Chức Sự Kiện', 'Thương Mại Điện Tử'], boomYears: '2026 - 2028', advice: 'Đừng ngần ngại thử sức ở các ngách công nghệ mới. Sự linh hoạt chính là chìa khóa phát tài!' },
    6: { title: 'Con Số 6 - Nhà Kiến Tạo & Thẩm Mỹ', role: 'Thiết Kế Nội Thất', bestCareers: ['Thiết Kế Nội Thất', 'Quản Lý Thương Hiệu', 'Quản Lý Spa'], boomYears: '2026 - 2027', advice: 'Mang lại giá trị thẩm mỹ và sự chu đáo cho khách hàng sẽ nâng tầm uy tín và thu nhập của bạn.' },
    7: { title: 'Con Số 7 - Nhà Phân Tích & Nghiên Cứu Sâu', role: 'Data Scientist', bestCareers: ['Chuyên Gia Dữ Liệu (Data)', 'Nghiên Cứu Viên AI', 'Tư Vấn Tài Chính'], boomYears: '2027 - 2030', advice: 'Hãy trở thành chuyên gia top 1% trong ngách chuyên môn. Tri thức sẽ đem lại quyền lực lớn.' },
    8: { title: 'Con Số 8 - Vua Kinh Doanh & Tài Chính', role: 'Giám Đốc Tài Chính', bestCareers: ['Nhà Đầu Tư Tài Chính', 'Bất Động Sản', 'CEO Điều Hành'], boomYears: '2026 - 2028', advice: 'Số 8 là con số đại tài lộc! Hãy quyết đoán chốt các thương vụ lớn và mở rộng quy mô năm 2026.' },
    9: { title: 'Con Số 9 - Nhà Tư Tưởng & Lãnh Đạo Tinh Thần', role: 'Diễn Giả / Trainer', bestCareers: ['Diễn Giả / Trainer', 'Quản Lý Dự Án Xã Hội', 'Giảng Viên Cao Cấp'], boomYears: '2026 - 2029', advice: 'Tầm nhìn rộng mở và tinh thần cống hiến sẽ đưa bạn lên vị trí quản lý cao cấp được mọi người nể trọng.' },
    11: { title: 'Con Số 11 - Bậc Thầy Trực Giác & Tầm Nhìn', role: 'Cố Vấn Chiến Lược AI', bestCareers: ['Cố Vấn Chiến Lược AI', 'Đổi Mới Sáng Tạo', 'Tư Vấn Tâm Lý'], boomYears: '2026 - 2028', advice: 'Tin vào trực giác của bạn trong các quyết định sự nghiệp lớn. Bạn sinh ra để dẫn dắt xu hướng mới!' },
    22: { title: 'Con Số 22 - Bậc Thầy Kiến Tạo Đế Chế', role: 'Founder Tập Đoàn', bestCareers: ['Founder Tập Đoàn Tech', 'Nhà Phát Triển Dự Án Lớn', 'Quản Lý Chuỗi'], boomYears: '2026 - 2030', advice: 'Không có giới hạn nào cho bạn. Hãy tự tin thực thi những kế hoạch tham vọng nhất!' }
  };

  const COUPLE_TRAITS = [
    "💖 Tri Kỷ Tâm Giao - Định Mệnh Sinh Ra Dành Cho Nhau",
    "⚡ Cặp Đôi Oan Gia Ngõ Hẹp - Càng Cãi Càng Yêu Dậm Dà",
    "🔥 Đội Hình Quyền Lực - Cùng Nhau Phát Tài & Thăng Tiến",
    "✨ Cặp Đôi Ngọt Ngào - Luôn Trao Nhau Năng Lượng Tích Cực",
    "🌙 Cặp Đôi Hút Nhau Từ Trái Dấu - Bù Trừ Hoàn Hảo"
  ];

  const HOROSCOPE_QUOTES = [
    "Hôm nay vũ trụ bật đèn xanh cho mọi quyết định cá tính của bạn. Cứ tự tin bước tới!",
    "Một cơ hội bất ngờ về tình duyên hoặc tài lộc đang chờ bạn ở quán cà phê quen thuộc.",
    "Hôm nay hãy thả lỏng và yêu thương bản thân nhiều hơn. Đừng làm quá sức!",
    "Bật mode thần thái bùng nổ, mọi ánh mắt hôm nay đều bị thu hút bởi năng lượng của bạn.",
    "Tránh xa những năng lượng tiêu cực, tập trung vào mục tiêu cá nhân và thưởng cho mình 1 ly trà sữa!",
    "Tiền tài đang rủ nhau tìm về túi bạn. Tự tin săn sale và chốt đơn ngay!",
    "Người ấy có vẻ đang thầm thương nhớ bạn đấy. Hãy để ý những tin nhắn vô tình trong ngày.",
    "Ý tưởng sáng tạo đỉnh cao sẽ bùng nổ vào tầm chiều tối. Hãy chuẩn bị ghi chép lại!"
  ];

  const LUCKY_COLORS = ['Hồng Neon', 'Xanh Cyber', 'Tím Obsidian', 'Vàng Hoàng Kim', 'Xanh Mint Refresh', 'Cam San Hô'];
  const LUCKY_ITEMS = [
    { title: 'Kính Mát Y2K Gọng Bạc', price: '129.000đ', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80', desc: 'Tăng 100% điểm thần thái cá tính' },
    { title: 'Kẹp Tóc Coquette Đính Nơ', price: '45.000đ', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80', desc: 'Thu hút vận may tình duyên dịu dàng' },
    { title: 'Bình Nước Giữ Nhiệt 2L Pastel', price: '189.000đ', img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80', desc: 'Bật mode chăm chỉ & detox da đẹp' },
    { title: 'Đèn Cầy Thơm Ambient Relax', price: '150.000đ', img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=300&q=80', desc: 'Giải tỏa năng lượng suy tư buổi tối' }
  ];

  function computeFortune(name, zodiacKey, moods) {
    const dateStr = getTodayString();
    const rawSeed = hashString(`${name.toLowerCase().trim()}_${zodiacKey}_${dateStr}`);
    let seed = rawSeed;

    const zodiacInfo = ZODIAC_DATA[zodiacKey] || ZODIAC_DATA.Aries;
    const energyScores = [
      { name: 'Độc Lập', pct: Math.floor(seededRandom(seed++) * 25) + 75 },
      { name: 'Sáng Tạo', pct: Math.floor(seededRandom(seed++) * 25) + 74 },
      { name: 'Thu Hút', pct: Math.floor(seededRandom(seed++) * 25) + 75 },
      { name: 'Số Tốt Bút', pct: Math.floor(seededRandom(seed++) * 25) + 72 }
    ];

    const loveScore = Math.floor(seededRandom(seed++) * 25) + 75;
    const wealthScore = Math.floor(seededRandom(seed++) * 25) + 73;
    const luckyNum = Math.floor(seededRandom(seed++) * 90) + 10;
    
    const quoteIndex = Math.floor(seededRandom(seed++) * HOROSCOPE_QUOTES.length);
    const colorIndex = Math.floor(seededRandom(seed++) * LUCKY_COLORS.length);

    return {
      mode: 'vibe',
      name,
      zodiacKey,
      zodiacInfo,
      moods: moods.length > 0 ? moods : ['Yêu Đời', 'Bật Mode Chăm'],
      energyScores,
      loveScore: loveScore + '%',
      wealthScore: wealthScore + '%',
      luckyNum,
      luckyColor: LUCKY_COLORS[colorIndex],
      quote: HOROSCOPE_QUOTES[quoteIndex]
    };
  }

  function computeCareer(name, birthdateStr) {
    const lifePathNum = calculateLifePathNumber(birthdateStr);
    const careerInfo = NUMEROLOGY_CAREER_DATA[lifePathNum] || NUMEROLOGY_CAREER_DATA[1];
    
    const rawSeed = hashString(`${name.toLowerCase().trim()}_${birthdateStr}`);
    let seed = rawSeed;

    const successPct = Math.floor(seededRandom(seed++) * 15) + 85;
    const leadershipPct = Math.floor(seededRandom(seed++) * 20) + 80;

    return {
      mode: 'career',
      name,
      birthdateStr,
      lifePathNum,
      careerInfo,
      successPct: successPct + '%',
      leadershipPct: leadershipPct + '%',
      energyScores: [
        { name: 'Lãnh Đạo', pct: leadershipPct },
        { name: 'Thành Công', pct: successPct },
        { name: 'Chiến Lược', pct: Math.floor(seededRandom(seed++) * 18) + 82 },
        { name: 'Phát Tài', pct: Math.floor(seededRandom(seed++) * 15) + 85 }
      ],
      quote: careerInfo.advice,
      luckyColor: 'Vàng Hoàng Kim',
      luckyNum: lifePathNum
    };
  }

  function computeCouple(name1, zodiacKey1, name2, zodiacKey2) {
    const rawSeed = hashString(`${name1.toLowerCase().trim()}_${zodiacKey1}_${name2.toLowerCase().trim()}_${zodiacKey2}`);
    let seed = rawSeed;

    const matchPct = Math.floor(seededRandom(seed++) * 15) + 85;
    const traitIndex = Math.floor(seededRandom(seed++) * COUPLE_TRAITS.length);
    const trait = COUPLE_TRAITS[traitIndex];

    const zodiacInfo1 = ZODIAC_DATA[zodiacKey1] || ZODIAC_DATA.Aries;
    const zodiacInfo2 = ZODIAC_DATA[zodiacKey2] || ZODIAC_DATA.Leo;

    return {
      mode: 'couple',
      name: `${name1} ❤️ ${name2}`,
      name1,
      name2,
      zodiacInfo1,
      zodiacInfo2,
      matchPct: matchPct + '%',
      trait,
      energyScores: [
        { name: 'Thấu Hiểu', pct: matchPct },
        { name: 'Gắn Kết', pct: Math.floor(seededRandom(seed++) * 12) + 88 },
        { name: 'Đồng Điệu', pct: Math.floor(seededRandom(seed++) * 15) + 85 },
        { name: 'Hợp Cạ', pct: Math.floor(seededRandom(seed++) * 14) + 86 }
      ],
      quote: `Chỉ số hợp nhau là ${matchPct}%. ${trait}. Hai bạn chính là cặp đôi hoàn hảo thu hút nhiều vận may tài lộc khi ở cạnh nhau!`,
      luckyColor: 'Hồng Romantic',
      luckyNum: 99
    };
  }

  // --- RENDER CANVAS CARD 9:16 (1080 x 1920) ---
  function renderCanvasCard(data) {
    const canvas = document.getElementById('vibeCanvas');
    const ctx = canvas.getContext('2d');
    const W = 1080;
    const H = 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    if (data.mode === 'career') {
      bgGrad.addColorStop(0, '#160a28');
      bgGrad.addColorStop(0.5, '#2a1240');
      bgGrad.addColorStop(1, '#0e051a');
    } else if (data.mode === 'couple') {
      bgGrad.addColorStop(0, '#2d0a1e');
      bgGrad.addColorStop(0.5, '#42122b');
      bgGrad.addColorStop(1, '#1a0510');
    } else {
      bgGrad.addColorStop(0, '#0c071e');
      bgGrad.addColorStop(0.5, '#190e38');
      bgGrad.addColorStop(1, '#080414');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    const orbColor = data.mode === 'couple' ? 'rgba(244, 114, 182, 0.4)' : (data.mode === 'career' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(236, 72, 153, 0.35)');
    const orb1 = ctx.createRadialGradient(200, 300, 20, 200, 300, 450);
    orb1.addColorStop(0, orbColor);
    orb1.addColorStop(1, 'transparent');
    ctx.fillStyle = orb1;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = data.mode === 'couple' ? 'rgba(244, 114, 182, 0.6)' : (data.mode === 'career' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(236, 72, 153, 0.4)');
    ctx.lineWidth = 12;
    ctx.strokeRect(50, 50, W - 100, H - 100);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(W / 2 - 270, 120, 540, 70, 35);
    ctx.fill();

    ctx.font = '700 30px "Space Grotesk", sans-serif';
    ctx.fillStyle = data.mode === 'couple' ? '#f472b6' : (data.mode === 'career' ? '#f59e0b' : '#ec4899');
    ctx.textAlign = 'center';
    ctx.fillText(data.mode === 'couple' ? '💖 COUPLE VIBE MATCH 2026' : (data.mode === 'career' ? '🚀 CAREER DESTINY CARD' : '✨ VIBE CARD AI • 2026 ✨'), W / 2, 166);

    if (data.mode === 'couple') {
      ctx.font = '900 110px "Outfit", sans-serif';
      ctx.fillStyle = '#f472b6';
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 35;
      ctx.fillText(`${data.zodiacInfo1.symbol} ❤️ ${data.zodiacInfo2.symbol}`, W / 2, 330);
      ctx.shadowBlur = 0;
    } else if (data.mode === 'career') {
      ctx.font = '900 140px "Outfit", sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 35;
      ctx.fillText(`SỐ ${data.lifePathNum}`, W / 2, 340);
      ctx.shadowBlur = 0;
    } else {
      ctx.font = '900 130px "Outfit", sans-serif';
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 30;
      ctx.fillText(data.zodiacInfo.symbol, W / 2, 340);
      ctx.shadowBlur = 0;
    }

    ctx.font = '800 58px "Outfit", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(data.name.toUpperCase(), W / 2, 440);

    ctx.font = '600 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    if (data.mode === 'couple') {
      ctx.fillText(data.trait, W / 2, 500);
      ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#f472b6';
      ctx.fillText(`ĐỘ HỢP NHAU: ${data.matchPct}`, W / 2, 560);
    } else if (data.mode === 'career') {
      ctx.fillText(data.careerInfo.title, W / 2, 500);
      ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Cột Mốc Phát Tài: ${data.careerInfo.boomYears}`, W / 2, 560);
    } else {
      ctx.fillText(`${data.zodiacInfo.name} • ${data.zodiacInfo.element}`, W / 2, 500);
      const moodsText = data.moods.map(m => `#${m}`).join('  ');
      ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(moodsText, W / 2, 560);
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(120, 640, W - 240, 440, 24);
    ctx.fill();

    ctx.font = '800 36px "Outfit", sans-serif';
    ctx.fillStyle = data.mode === 'couple' ? '#f472b6' : (data.mode === 'career' ? '#f59e0b' : '#c084fc');
    ctx.textAlign = 'left';
    ctx.fillText(data.mode === 'couple' ? '💞 CHỈ SỐ HỢP CẠ TÌNH YÊU' : (data.mode === 'career' ? '🎯 TIỀM NĂNG CÔNG DANH 2026' : '⚡ CHỈ SỐ THẦN THÁI HÔM NAY'), 160, 710);

    let startY = 770;
    data.energyScores.forEach(item => {
      ctx.font = '600 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(item.name, 160, startY + 24);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(360, startY, 440, 26, 13);
      ctx.fill();

      const fillGrad = ctx.createLinearGradient(360, 0, 360 + (440 * item.pct / 100), 0);
      if (data.mode === 'couple') {
        fillGrad.addColorStop(0, '#f472b6');
        fillGrad.addColorStop(1, '#ec4899');
      } else if (data.mode === 'career') {
        fillGrad.addColorStop(0, '#f59e0b');
        fillGrad.addColorStop(1, '#a855f7');
      } else {
        fillGrad.addColorStop(0, '#06b6d4');
        fillGrad.addColorStop(1, '#ec4899');
      }
      ctx.fillStyle = fillGrad;
      ctx.beginPath();
      ctx.roundRect(360, startY, 440 * (item.pct / 100), 26, 13);
      ctx.fill();

      ctx.font = '800 30px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`${item.pct}%`, 825, startY + 24);

      startY += 75;
    });

    ctx.fillStyle = data.mode === 'couple' ? 'rgba(244, 114, 182, 0.1)' : (data.mode === 'career' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(236, 72, 153, 0.1)');
    ctx.strokeStyle = data.mode === 'couple' ? 'rgba(244, 114, 182, 0.3)' : (data.mode === 'career' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(236, 72, 153, 0.3)');
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(120, 1120, W - 240, 340, 24);
    ctx.fill();
    ctx.stroke();

    ctx.font = '800 36px "Outfit", sans-serif';
    ctx.fillStyle = data.mode === 'couple' ? '#f472b6' : (data.mode === 'career' ? '#f59e0b' : '#ec4899');
    ctx.textAlign = 'center';
    ctx.fillText(data.mode === 'couple' ? '💌 THÔNG ĐIỆP TÌNH YÊU' : (data.mode === 'career' ? '💡 ĐỊNH HƯỚNG CÔNG DANH' : '🔮 THÔNG ĐIỆP VŨ TRỤ'), W / 2, 1185);

    ctx.font = '500 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f1f5f9';
    wrapText(ctx, `"${data.quote}"`, W / 2, 1260, W - 320, 48);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(120, 1500, W - 240, 200, 20);
    ctx.fill();

    const colW = (W - 240) / 4;
    const items = data.mode === 'couple' ? [
      { label: 'HỢP NHAU', val: data.matchPct },
      { label: 'QUÝ NHÂN', val: 'Có' },
      { label: 'TÂM ĐẦU', val: '100%' },
      { label: 'Ý HỢP', val: '100%' }
    ] : (data.mode === 'career' ? [
      { label: 'SỐ CHỦ ĐẠO', val: `Số ${data.lifePathNum}` },
      { label: 'BÙNG NỔ', val: data.careerInfo.boomYears.split(' ')[0] },
      { label: 'THÀNH CÔNG', val: data.successPct },
      { label: 'LÃNH ĐẠO', val: data.leadershipPct }
    ] : [
      { label: 'MÀU MAY', val: data.luckyColor },
      { label: 'SỐ MAY', val: String(data.luckyNum) },
      { label: 'TÌNH DUYÊN', val: data.loveScore },
      { label: 'TÀI LỘC', val: data.wealthScore }
    ]);

    items.forEach((it, idx) => {
      const cx = 120 + colW * idx + colW / 2;
      ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(it.label, cx, 1560);

      ctx.font = '800 32px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(it.val, cx, 1630);
    });

    ctx.font = '500 28px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`Bói Hợp Đôi tại: goomood-team-chat.kiettng.chatgpt.site`, W / 2, 1780);
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let testY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, testY);
        line = words[n] + ' ';
        testY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, testY);
  }

  // --- UI MODE TABS SWITCHING ---
  const tabVibeBtn = document.getElementById('tabVibeMode');
  const tabCareerBtn = document.getElementById('tabCareerMode');
  const tabCoupleBtn = document.getElementById('tabCoupleMode');
  
  const zodiacGroup = document.getElementById('zodiacGroup');
  const birthdateGroup = document.getElementById('birthdateGroup');
  const coupleGroup = document.getElementById('coupleGroup');
  const moodChipsGroup = document.querySelector('.form-group.full-width');
  const startGachaBtn = document.getElementById('startGachaBtn');

  tabVibeBtn.addEventListener('click', () => {
    AudioEngine.playClick();
    state.activeMode = 'vibe';
    tabVibeBtn.classList.add('active');
    tabCareerBtn.classList.remove('active');
    tabCoupleBtn.classList.remove('active');
    zodiacGroup.classList.remove('hidden');
    moodChipsGroup.classList.remove('hidden');
    birthdateGroup.classList.add('hidden');
    coupleGroup.classList.add('hidden');
    startGachaBtn.innerHTML = '<i class="fa-solid fa-box-open"></i> MỞ HỘP MÙ & BỐC QUẺ NGAY';
  });

  tabCareerBtn.addEventListener('click', () => {
    AudioEngine.playClick();
    state.activeMode = 'career';
    tabCareerBtn.classList.add('active');
    tabVibeBtn.classList.remove('active');
    tabCoupleBtn.classList.remove('active');
    zodiacGroup.classList.add('hidden');
    moodChipsGroup.classList.add('hidden');
    birthdateGroup.classList.remove('hidden');
    coupleGroup.classList.add('hidden');
    startGachaBtn.innerHTML = '<i class="fa-solid fa-briefcase"></i> TRA CỨU CÔNG DANH & SỰ NGHIỆP';
  });

  tabCoupleBtn.addEventListener('click', () => {
    AudioEngine.playClick();
    state.activeMode = 'couple';
    tabCoupleBtn.classList.add('active');
    tabVibeBtn.classList.remove('active');
    tabCareerBtn.classList.remove('active');
    zodiacGroup.classList.remove('hidden');
    moodChipsGroup.classList.add('hidden');
    birthdateGroup.classList.add('hidden');
    coupleGroup.classList.remove('hidden');
    startGachaBtn.innerHTML = '<i class="fa-solid fa-heart"></i> XEM ĐỘ HỢP ĐÔI TÌNH YÊU';
  });

  // Mood Chips Selection
  const moodChipsContainer = document.getElementById('moodChips');
  moodChipsContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    AudioEngine.playClick();
    const mood = chip.dataset.mood;
    if (chip.classList.contains('active')) {
      chip.classList.remove('active');
      state.selectedMoods = state.selectedMoods.filter(m => m !== mood);
    } else {
      if (state.selectedMoods.length >= 3) {
        showToast('Bạn chỉ chọn tối đa 3 từ khóa tâm trạng nhé!');
        return;
      }
      chip.classList.add('active');
      state.selectedMoods.push(mood);
    }
  });

  // Sound & Theme Toggle
  document.getElementById('soundToggleBtn').addEventListener('click', () => {
    state.isSoundOn = !state.isSoundOn;
    document.getElementById('soundToggleBtn').innerHTML = state.isSoundOn ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
    showToast(state.isSoundOn ? 'Đã bật âm thanh' : 'Đã tắt âm thanh');
  });

  document.getElementById('themeToggleBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    document.body.classList.remove(state.themes[state.currentThemeIndex]);
    state.currentThemeIndex = (state.currentThemeIndex + 1) % state.themes.length;
    document.body.classList.add(state.themes[state.currentThemeIndex]);
    showToast('Đã đổi theme giao diện!');
  });

  // Submit Handler
  startGachaBtn.addEventListener('click', () => {
    const userState = getUserState();

    if (userState.userStatus !== 'vip' && userState.usageCount >= 3) {
      AudioEngine.playClick();
      openLimitModal();
      showToast('⚠️ Bạn đã dùng hết 3 lượt xem miễn phí. Vui lòng chuyển khoản nâng VIP!');
      return;
    }

    const nameInput = document.getElementById('userName').value.trim();
    if (!nameInput) {
      showToast('Vui lòng nhập tên của bạn nhé!');
      return;
    }

    if (state.activeMode === 'vibe') {
      const zodiacSelect = document.getElementById('userZodiac').value;
      if (!zodiacSelect) {
        showToast('Vui lòng chọn Cung Hoàng Đạo!');
        return;
      }
      state.userName = nameInput;
      state.userZodiac = zodiacSelect;
      state.fortuneData = computeFortune(state.userName, state.userZodiac, state.selectedMoods);
    } else if (state.activeMode === 'career') {
      const birthdateInput = document.getElementById('userBirthdate').value;
      if (!birthdateInput) {
        showToast('Vui lòng chọn Ngày Tháng Năm Sinh!');
        return;
      }
      state.userName = nameInput;
      state.userBirthdate = birthdateInput;
      state.fortuneData = computeCareer(state.userName, state.userBirthdate);
    } else {
      const zodiacSelect1 = document.getElementById('userZodiac').value;
      const name2 = document.getElementById('coupleName2').value.trim();
      const zodiacSelect2 = document.getElementById('coupleZodiac2').value;

      if (!zodiacSelect1 || !name2 || !zodiacSelect2) {
        showToast('Vui lòng điền đủ thông tin 2 người!');
        return;
      }
      state.userName = nameInput;
      state.userZodiac = zodiacSelect1;
      state.coupleName2 = name2;
      state.coupleZodiac2 = zodiacSelect2;
      state.fortuneData = computeCouple(state.userName, state.userZodiac, state.coupleName2, state.coupleZodiac2);
    }

    if (userState.userStatus !== 'vip') {
      const newCount = userState.usageCount + 1;
      localStorage.setItem('vibe_user_usage_count', newCount.toString());
      updateUsageBadge();
    }

    saveUserLogToAdmin({
      id: userState.userId,
      name: state.userName,
      mode: state.activeMode,
      info: state.activeMode === 'couple' ? `${state.userName} ❤️ ${state.coupleName2}` : (state.activeMode === 'vibe' ? ZODIAC_DATA[state.userZodiac].name : `NS: ${state.userBirthdate}`),
      result: state.activeMode === 'couple' ? `Hợp nhau ${state.fortuneData.matchPct}` : (state.activeMode === 'vibe' ? state.fortuneData.quote.substring(0, 18) + '...' : `Con Số Chủ Đạo ${state.fortuneData.lifePathNum}`),
      isVip: userState.userStatus === 'vip',
      date: new Date().toLocaleString('vi-VN')
    });

    AudioEngine.playClick();

    document.querySelector('.input-card-wrapper').classList.add('hidden');
    const gachaStage = document.getElementById('gachaStage');
    gachaStage.classList.remove('hidden');

    const gachaStatus = document.getElementById('gachaStatus');
    gachaStatus.innerText = state.activeMode === 'couple' ? '💖 Đang kết nối tần số tình yêu 2 người...' : (state.activeMode === 'career' ? '🚀 Đang phân tích Ma Trận Thần Số Học...' : '✨ Đang kết nối tần số vũ trụ...');

    setTimeout(() => {
      gachaStatus.innerText = '🎁 Đang kết xuất Vibe Card...';
      AudioEngine.playGachaSound();
    }, 1200);

    setTimeout(() => {
      gachaStage.classList.add('hidden');
      renderResultSection();
    }, 2800);
  });

  function saveUserLogToAdmin(newLog) {
    let logs = JSON.parse(localStorage.getItem('vibe_user_logs') || '[]');
    logs.unshift(newLog);
    if (logs.length > 50) logs.pop();
    localStorage.setItem('vibe_user_logs', JSON.stringify(logs));
  }

  function renderResultSection() {
    const data = state.fortuneData;
    renderCanvasCard(data);

    if (data.mode === 'couple') {
      document.getElementById('backZodiacTag').innerText = `Tình Yêu: Hợp Nhau ${data.matchPct}`;
      document.getElementById('backTitle').innerText = data.trait;
      document.getElementById('backHoroscopeText').innerText = data.quote;
      document.getElementById('backLuckyColor').innerText = 'Hồng Neon';
      document.getElementById('backLuckyNumber').innerText = 99;
      document.getElementById('backLoveScore').innerText = data.matchPct;
      document.getElementById('backWealthScore').innerText = '100%';
    } else if (data.mode === 'career') {
      document.getElementById('backZodiacTag').innerText = `Thần Số Học: Con Số ${data.lifePathNum}`;
      document.getElementById('backTitle').innerText = data.careerInfo.title;
      document.getElementById('backHoroscopeText').innerText = `Ngành nghề hợp nhất: ${data.careerInfo.bestCareers.join(', ')}. ${data.careerInfo.advice}`;
      document.getElementById('backLuckyColor').innerText = 'Vàng Kim';
      document.getElementById('backLuckyNumber').innerText = data.lifePathNum;
      document.getElementById('backLoveScore').innerText = data.successPct;
      document.getElementById('backWealthScore').innerText = data.leadershipPct;
    } else {
      document.getElementById('backZodiacTag').innerText = `${data.zodiacInfo.symbol} ${data.zodiacInfo.name}`;
      document.getElementById('backTitle').innerText = `Quẻ: Thần Thái Bùng Nổ`;
      document.getElementById('backHoroscopeText').innerText = data.quote;
      document.getElementById('backLuckyColor').innerText = data.luckyColor;
      document.getElementById('backLuckyNumber').innerText = data.luckyNum;
      document.getElementById('backLoveScore').innerText = data.loveScore;
      document.getElementById('backWealthScore').innerText = data.wealthScore;
    }

    const barsList = document.getElementById('backEnergyBars');
    barsList.innerHTML = data.energyScores.map(score => `
      <div class="bar-row">
        <span class="bar-name">${score.name}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${score.pct}%;"></div>
        </div>
        <span class="bar-pct">${score.pct}%</span>
      </div>
    `).join('');

    renderAffiliateGrid();

    const resultSection = document.getElementById('resultSection');
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
  }

  // Card Flip, Download, Share Controls
  const card3d = document.getElementById('card3d');
  card3d.addEventListener('click', (e) => {
    if (e.target.closest('#flipBackBtn')) return;
    AudioEngine.playFlip();
    card3d.classList.toggle('flipped');
  });
  document.getElementById('flipBackBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    AudioEngine.playFlip();
    card3d.classList.remove('flipped');
  });

  document.getElementById('downloadCardBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    const canvas = document.getElementById('vibeCanvas');
    const link = document.createElement('a');
    link.download = `VibeCard_${state.userName}_${getTodayString()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('🎉 Đã tải Card PNG nét cao về máy!');
  });

  document.getElementById('shareLinkBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    navigator.clipboard.writeText(window.location.href);
    showToast('🔗 Đã copy link web! Hãy chia sẻ cho bạn bè tra cứu nhé!');
  });

  document.getElementById('reGachaBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    document.getElementById('resultSection').classList.add('hidden');
    document.querySelector('.input-card-wrapper').classList.remove('hidden');
    document.querySelector('.input-card-wrapper').scrollIntoView({ behavior: 'smooth' });
  });

  function renderAffiliateGrid() {
    const grid = document.getElementById('affiliateGrid');
    grid.innerHTML = LUCKY_ITEMS.map(item => `
      <div class="glass-card affiliate-card">
        <img class="aff-img" src="${item.img}" alt="${item.title}">
        <div class="aff-info">
          <h4 class="aff-title">${item.title}</h4>
          <p class="aff-desc">${item.desc}</p>
          <div class="aff-price-row">
            <span class="aff-price">${item.price}</span>
            <span class="badge-tag">Phong Thủy Gen Z</span>
          </div>
        </div>
        <a href="https://shopee.vn" target="_blank" rel="noopener" class="btn-aff-buy">
          <i class="fa-solid fa-cart-shopping"></i> Sắm Ngay May Mắn
        </a>
      </div>
    `).join('');
  }

  // --- LUCKY WHEEL ENGINE & DRAWING ---
  const wheelModal = document.getElementById('wheelModal');
  document.getElementById('openWheelBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    renderSpinWheel();
    wheelModal.classList.remove('hidden');
  });
  document.getElementById('closeWheelModalBtn').addEventListener('click', () => {
    wheelModal.classList.add('hidden');
  });

  const wheelPrizes = ['🎁 +1 Lượt Free', '🎟️ Mã VIP 50%', '💖 Quẻ Tình Duyên', '🌟 x2 Thần Thái', '🛍️ Voucher Shopee', '👑 VIP 1 Ngày'];
  const wheelColors = ['#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#10b981', '#a855f7'];

  function renderSpinWheel(angle = 0) {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const radius = W / 2 - 10;
    const numSlices = wheelPrizes.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    ctx.clearRect(0, 0, W, H);

    wheelPrizes.forEach((prize, i) => {
      const startA = angle + i * sliceAngle;
      const endA = startA + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startA, endA);
      ctx.closePath();
      ctx.fillStyle = wheelColors[i];
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startA + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(prize, radius - 20, 5);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0712';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  let isSpinning = false;
  document.getElementById('spinNowBtn').addEventListener('click', () => {
    if (isSpinning) return;

    const todayStr = getTodayString();
    const lastSpin = localStorage.getItem('vibe_last_spin_date');
    if (lastSpin === todayStr) {
      showToast('⚠️ Bạn đã quay thưởng hôm nay rồi! Hãy quay lại vào ngày mai nhé!');
      return;
    }

    isSpinning = true;
    AudioEngine.playClick();
    let currentAngle = 0;
    const spinDuration = 3000;
    const startTime = performance.now();
    const totalRotation = Math.PI * 2 * 6 + Math.random() * Math.PI * 2;

    function animateSpin(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / spinDuration);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentAngle = totalRotation * easeOut;

      renderSpinWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        isSpinning = false;
        localStorage.setItem('vibe_last_spin_date', todayStr);
        AudioEngine.playGachaSound();

        // Award Free View Bonus
        let userCount = parseInt(localStorage.getItem('vibe_user_usage_count') || '0');
        if (userCount > 0) {
          localStorage.setItem('vibe_user_usage_count', (userCount - 1).toString());
          updateUsageBadge();
        }

        document.getElementById('wheelResultText').innerHTML = '🎉 **CHÚC MỪNG:** Bạn đã trúng phần thưởng **+1 Lượt bốc quẻ miễn phí**!';
        showToast('🎁 Chúc mừng bạn trúng thêm 1 lượt bốc quẻ miễn phí!');
      }
    }

    requestAnimationFrame(animateSpin);
  });

  // Modals Event Handlers
  const vipModal = document.getElementById('vipModal');
  const limitModal = document.getElementById('limitModal');

  document.getElementById('openVipBtn').addEventListener('click', openVipModal);
  document.getElementById('triggerVipModalBtn').addEventListener('click', openVipModal);
  document.getElementById('closeVipModalBtn').addEventListener('click', () => vipModal.classList.add('hidden'));
  document.getElementById('closeLimitModalBtn').addEventListener('click', () => limitModal.classList.add('hidden'));

  function openVipModal() {
    AudioEngine.playClick();
    const userState = getUserState();
    document.getElementById('transferSyntax').innerText = `VIBE VIP ${userState.userId}`;
    vipModal.classList.remove('hidden');
  }

  document.getElementById('copyCodeBtn').addEventListener('click', () => {
    const code = document.getElementById('transferSyntax').innerText;
    navigator.clipboard.writeText(code);
    showToast('Đã copy cú pháp chuyển khoản!');
  });

  document.getElementById('copyLimitCodeBtn').addEventListener('click', () => {
    const code = document.getElementById('limitTransferCode').innerText;
    navigator.clipboard.writeText(code);
    showToast('Đã copy cú pháp chuyển khoản MoMo!');
  });

  document.getElementById('simulatePaidBtn').addEventListener('click', () => {
    AudioEngine.playGachaSound();
    vipModal.classList.add('hidden');
    showToast('📬 Đã gửi thông báo cho Admin TANNV! Đang chờ duyệt VIP...');
  });

  document.getElementById('notifyAdminPaidBtn').addEventListener('click', () => {
    AudioEngine.playGachaSound();
    limitModal.classList.add('hidden');
    showToast('📬 Đã gửi thông báo chuyển khoản MoMo cho Admin TANNV! Đang chờ xác nhận...');
  });

  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    document.getElementById('toastMsg').innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  function createStars() {
    const container = document.getElementById('starsContainer');
    const count = 45;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.width = (Math.random() * 3 + 1) + 'px';
      star.style.height = star.style.width;
      star.style.backgroundColor = '#ffffff';
      star.style.borderRadius = '50%';
      star.style.opacity = Math.random() * 0.7 + 0.3;
      star.style.top = Math.random() * 100 + '%';
      star.style.left = Math.random() * 100 + '%';
      star.style.animation = `pulseGlow ${Math.random() * 3 + 2}s infinite alternate`;
      container.appendChild(star);
    }
  }

  createStars();
  updateUsageBadge();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('Service Worker Registered:', reg))
        .catch(err => console.log('Service Worker Failed:', err));
    });
  }
});
