/* ==========================================================================
   VIBE CARD AI - ENGINE & INTERACTIVITY (GEN Z 2026)
   TÍCH HỢP BỐC QUẺ VIBE & THẦN SỐ HỌC CÔNG DANH SỰ NGHIỆP
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE & CONFIG ---
  const state = {
    activeMode: 'vibe', // 'vibe' or 'career'
    userName: '',
    userZodiac: '',
    userBirthdate: '',
    selectedMoods: [],
    currentHash: 0,
    fortuneData: null,
    isSoundOn: true,
    currentThemeIndex: 0,
    themes: ['theme-dark', 'theme-cyber', 'theme-pastel'],
    isVipUnlocked: false
  };

  // --- SOUND SYNTHESIZER (WEB AUDIO API) ---
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

  // --- DETERMINISTIC HASH & NUMEROLOGY ENGINE ---
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

  // Calculate Life Path Number (Thần Số Học) from YYYY-MM-DD
  function calculateLifePathNumber(birthdateStr) {
    const digits = birthdateStr.replace(/-/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    
    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  }

  // --- DATABASE MATRICES (GEN Z & CAREER DATA) ---
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
    1: {
      number: 1,
      title: 'Con Số 1 - Nhà Lãnh Đạo Tiên Phong',
      role: 'CEO Khởi Nghiệp & Quản Lý Dự Án',
      strengths: 'Táo bạo, Độc lập, Quyết đoán',
      bestCareers: ['Founder Khởi Nghiệp', 'Giám Đốc Dự Án', 'Quản Lý Sáng Tạo', 'Trưởng Phòng KD'],
      boomYears: '2026 - 2028',
      advice: 'Năm 2026 là thời điểm vàng để bạn đứng ra làm chủ hoặc tự phát triển dự án riêng. Cứ tự tin bứt phá!'
    },
    2: {
      number: 2,
      title: 'Con Số 2 - Nhà Ngoại Giao & Kết Nối',
      role: 'Chuyên Gia HR, Truyền Thông & Ngoại Giao',
      strengths: 'Duyên dáng, Lắng nghe, Hòa giải đỉnh cao',
      bestCareers: ['Quản Lý Nhân Sự (HR)', 'Chuyên Viên PR/Truyền Thông', 'Tư Vấn Tâm Lý', 'Chăm Sóc KH'],
      boomYears: '2026 - 2027',
      advice: 'Tập trung mở rộng các mối quan hệ chất lượng. Quý nhân sẽ mang lại những hợp đồng phát tài lớn.'
    },
    3: {
      number: 3,
      title: 'Con Số 3 - Thần Thái Truyền Cảm Hứng',
      role: 'Content Creator, Marketing Lead & KOLs',
      strengths: 'Hài hước, Sáng tạo dồi dào, Thu hút đám đông',
      bestCareers: ['Sáng Tạo Nội Dung (TikToker/Youtuber)', 'Designer', 'Content Lead', 'MC/Diễn Viên'],
      boomYears: '2026 - 2029',
      advice: 'Sự nghiệp thăng hoa khi được sáng tạo tự do. Đừng ngại chia sẻ cá tính cá nhân lên mạng xã hội!'
    },
    4: {
      number: 4,
      title: 'Con Số 4 - Chuyên Gia Chiến Lược Vững Chắc',
      role: 'Kỹ Sư AI, Kiến Trúc Sư & Vận Hành',
      strengths: 'Kỷ luật thép, Tỉ mỉ, Tổ chức khoa học',
      bestCareers: ['Kỹ Sư Công Nghệ / AI', 'Kế Toán / Kiểm Toán', 'Quản Lý Vận Hành', 'Kỹ Sư Xây Dựng'],
      boomYears: '2027 - 2029',
      advice: 'Tập trung rèn luyện kỹ năng chuyên môn sâu. Sự kiên trì của bạn sẽ gặt hái thăng tiến lớn.'
    },
    5: {
      number: 5,
      title: 'Con Số 5 - Nhà Đổi Mới & Bắt Trend Xu Hướng',
      role: 'Digital Marketer, Event Planner & Ecommerce',
      strengths: 'Linh hoạt, Bắt trend cực nhanh, Tự do',
      bestCareers: ['Chuyên Gia Marketing Số', 'Tổ Chức Sự Kiện', 'Thương Mại Điện Tử', 'Blogger Du Lịch'],
      boomYears: '2026 - 2028',
      advice: 'Đừng ngần ngại thử sức ở các ngách công nghệ mới. Sự linh hoạt chính là chìa khóa phát tài!'
    },
    6: {
      number: 6,
      title: 'Con Số 6 - Nhà Kiến Tạo & Thẩm Mỹ',
      role: 'Thiết Kế Nội Thất, Y Tế Spa & Thương Hiệu',
      strengths: 'Thẩm mỹ cao, Chu đáo, Trách nhiệm',
      bestCareers: ['Thiết Kế Nội Thất', 'Quản Lý Thương Hiệu', 'Quản Lý Spa / Y Tế', 'Quản Lý Giáo Dục'],
      boomYears: '2026 - 2027',
      advice: 'Mang lại giá trị thẩm mỹ và sự chu đáo cho khách hàng sẽ nâng tầm uy tín và thu nhập của bạn.'
    },
    7: {
      number: 7,
      title: 'Con Số 7 - Nhà Phân Tích & Nghiên Cứu Sâu',
      role: 'Data Scientist, AI Expert & Tư Vấn Chiến Lược',
      strengths: 'Tư duy logic sắc bén, Phân tích dữ liệu',
      bestCareers: ['Chuyên Gia Dữ Liệu (Data)', 'Nghiên Cứu Viên Tech / AI', 'Tư Vấn Tài Chính', 'Giảng Viên'],
      boomYears: '2027 - 2030',
      advice: 'Hãy trở thành chuyên gia top 1% trong ngách chuyên môn. Tri thức sẽ đem lại quyền lực lớn.'
    },
    8: {
      number: 8,
      title: 'Con Số 8 - Vua Kinh Doanh & Tài Chính Bùng Nổ',
      role: 'Giám Đốc Tài Chính, Đầu Tư & Bất Động Sản',
      strengths: 'Bản lĩnh thương trường, Quản lý dòng tiền',
      bestCareers: ['Nhà Đầu Tư Tài Chính', 'Bất Động Sản', 'Chuyên Gia Thương Mại', 'CEO Điều Hành'],
      boomYears: '2026 - 2028',
      advice: 'Số 8 là con số đại tài lộc! Hãy quyết đoán chốt các thương vụ lớn và mở rộng quy mô năm 2026.'
    },
    9: {
      number: 9,
      title: 'Con Số 9 - Nhà Tư Tưởng & Lãnh Đạo Tinh Thần',
      role: 'Diễn Giả, Quản Lý Quỹ & Lãnh Đạo Tổ Chức',
      strengths: 'Tầm nhìn bao quát, Nhân văn, Truyền cảm hứng',
      bestCareers: ['Diễn Giả / Trainer', 'Quản Lý Dự Án Xã Hội', 'Giảng Viên Cao Cấp', 'Tư Vấn Chiến Lược'],
      boomYears: '2026 - 2029',
      advice: 'Tầm nhìn rộng mở và tinh thần cống hiến sẽ đưa bạn lên vị trí quản lý cao cấp được mọi người nể trọng.'
    },
    11: {
      number: 11,
      title: 'Con Số 11 - Bậc Thầy Trực Giác & Tầm Nhìn',
      role: 'Nhà Sáng Tạo Xu Hướng & Cố Vấn Cao Cấp',
      strengths: 'Trực giác nhạy bén xuất thần, Tầm nhìn thời đại',
      bestCareers: ['Cố Vấn Chiến Lược AI', 'Đổi Mới Sáng Tạo', 'Tư Vấn Tâm Lý / Tử Vi', 'Đạo Diễn Nghệ Thuật'],
      boomYears: '2026 - 2028',
      advice: 'Tin vào trực giác của bạn trong các quyết định sự nghiệp lớn. Bạn sinh ra để dẫn dắt xu hướng mới!'
    },
    22: {
      number: 22,
      title: 'Con Số 22 - Bậc Thầy Kiến Tạo Đế Chế',
      role: 'Nhà Xây Dựng Dự Án Vĩ Đại & Founder Tập Đoàn',
      strengths: 'Tầm nhìn vĩ đại, Hiện thực hóa mọi kế hoạch lớn',
      bestCareers: ['Founder Tập Đoàn Tech', 'Nhà Phát Triển Dự Án Lớn', 'Quy Hoạch Chiến Lược', 'Quản Lý Chuỗi'],
      boomYears: '2026 - 2030',
      advice: 'Không có giới hạn nào cho bạn. Hãy tự tin thực thi những kế hoạch tham vọng nhất!'
    }
  };

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

  // --- GENERATE FORTUNE DATA ---
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

  // --- RENDER CANVAS CARD 9:16 (1080 x 1920) ---
  function renderCanvasCard(data) {
    const canvas = document.getElementById('vibeCanvas');
    const ctx = canvas.getContext('2d');
    const W = 1080;
    const H = 1920;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    if (data.mode === 'career') {
      bgGrad.addColorStop(0, '#160a28');
      bgGrad.addColorStop(0.5, '#2a1240');
      bgGrad.addColorStop(1, '#0e051a');
    } else {
      bgGrad.addColorStop(0, '#0c071e');
      bgGrad.addColorStop(0.5, '#190e38');
      bgGrad.addColorStop(1, '#080414');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Glowing Neon Orbs
    const orbColor = data.mode === 'career' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(236, 72, 153, 0.35)';
    const orb1 = ctx.createRadialGradient(200, 300, 20, 200, 300, 450);
    orb1.addColorStop(0, orbColor);
    orb1.addColorStop(1, 'transparent');
    ctx.fillStyle = orb1;
    ctx.fillRect(0, 0, W, H);

    const orb2 = ctx.createRadialGradient(880, 1600, 30, 880, 1600, 500);
    orb2.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
    orb2.addColorStop(1, 'transparent');
    ctx.fillStyle = orb2;
    ctx.fillRect(0, 0, W, H);

    // Frame Border
    ctx.strokeStyle = data.mode === 'career' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(236, 72, 153, 0.4)';
    ctx.lineWidth = 12;
    ctx.strokeRect(50, 50, W - 100, H - 100);

    ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, W - 140, H - 140);

    // Top Header Badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(W / 2 - 270, 120, 540, 70, 35);
    ctx.fill();

    ctx.font = '700 30px "Space Grotesk", sans-serif';
    ctx.fillStyle = data.mode === 'career' ? '#f59e0b' : '#ec4899';
    ctx.textAlign = 'center';
    ctx.fillText(data.mode === 'career' ? '🚀 CAREER DESTINY CARD 2026' : '✨ VIBE CARD AI • 2026 ✨', W / 2, 166);

    // Main Icon / Number Display
    if (data.mode === 'career') {
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

    // User Name
    ctx.font = '800 64px "Outfit", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(data.name.toUpperCase(), W / 2, 440);

    // Subtitle Tag
    ctx.font = '600 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    if (data.mode === 'career') {
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

    // Scores Section
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(120, 640, W - 240, 440, 24);
    ctx.fill();

    ctx.font = '800 36px "Outfit", sans-serif';
    ctx.fillStyle = data.mode === 'career' ? '#f59e0b' : '#c084fc';
    ctx.textAlign = 'left';
    ctx.fillText(data.mode === 'career' ? '🎯 TIỀM NĂNG CÔNG DANH 2026' : '⚡ CHỈ SỐ THẦN THÁI HÔM NAY', 160, 710);

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
      if (data.mode === 'career') {
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

    // Advice / Horoscope Section
    ctx.fillStyle = data.mode === 'career' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(236, 72, 153, 0.1)';
    ctx.strokeStyle = data.mode === 'career' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(236, 72, 153, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(120, 1120, W - 240, 340, 24);
    ctx.fill();
    ctx.stroke();

    ctx.font = '800 36px "Outfit", sans-serif';
    ctx.fillStyle = data.mode === 'career' ? '#f59e0b' : '#ec4899';
    ctx.textAlign = 'center';
    ctx.fillText(data.mode === 'career' ? '💡 ĐỊNH HƯỚNG CÔNG DANH' : '🔮 THÔNG ĐIỆP VŨ TRỤ', W / 2, 1185);

    ctx.font = '500 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f1f5f9';
    wrapText(ctx, `"${data.quote}"`, W / 2, 1260, W - 320, 48);

    // Bottom Lucky Matrix Grid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(120, 1500, W - 240, 200, 20);
    ctx.fill();

    const colW = (W - 240) / 4;
    const items = data.mode === 'career' ? [
      { label: 'SỐ CHỦ ĐẠO', val: `Số ${data.lifePathNum}` },
      { label: 'BÙNG NỔ', val: data.careerInfo.boomYears.split(' ')[0] },
      { label: 'THÀNH CÔNG', val: data.successPct },
      { label: 'LÃNH ĐẠO', val: data.leadershipPct }
    ] : [
      { label: 'MÀU MAY', val: data.luckyColor },
      { label: 'SỐ MAY', val: String(data.luckyNum) },
      { label: 'TÌNH DUYÊN', val: data.loveScore },
      { label: 'TÀI LỘC', val: data.wealthScore }
    ];

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

    // Footer Watermark
    ctx.font = '500 28px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`Xem Công Danh tại: goomood-team-chat.kiettng.chatgpt.site`, W / 2, 1780);
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let testY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
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
  const zodiacGroup = document.getElementById('zodiacGroup');
  const birthdateGroup = document.getElementById('birthdateGroup');
  const moodChipsGroup = document.querySelector('.form-group.full-width');
  const startGachaBtn = document.getElementById('startGachaBtn');

  tabVibeBtn.addEventListener('click', () => {
    AudioEngine.playClick();
    state.activeMode = 'vibe';
    tabVibeBtn.classList.add('active');
    tabCareerBtn.classList.remove('active');
    zodiacGroup.classList.remove('hidden');
    moodChipsGroup.classList.remove('hidden');
    birthdateGroup.classList.add('hidden');
    startGachaBtn.innerHTML = '<i class="fa-solid fa-box-open"></i> MỞ HỘP MÙ & BỐC QUẺ NGAY';
  });

  tabCareerBtn.addEventListener('click', () => {
    AudioEngine.playClick();
    state.activeMode = 'career';
    tabCareerBtn.classList.add('active');
    tabVibeBtn.classList.remove('active');
    zodiacGroup.classList.add('hidden');
    moodChipsGroup.classList.add('hidden');
    birthdateGroup.classList.remove('hidden');
    startGachaBtn.innerHTML = '<i class="fa-solid fa-briefcase"></i> TRA CỨU CÔNG DANH & SỰ NGHIỆP';
  });

  // Mood Chip Selection
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

  // Sound Toggle
  document.getElementById('soundToggleBtn').addEventListener('click', () => {
    state.isSoundOn = !state.isSoundOn;
    const btn = document.getElementById('soundToggleBtn');
    btn.innerHTML = state.isSoundOn ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
    showToast(state.isSoundOn ? 'Đã bật âm thanh' : 'Đã tắt âm thanh');
  });

  // Theme Switcher
  document.getElementById('themeToggleBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    document.body.classList.remove(state.themes[state.currentThemeIndex]);
    state.currentThemeIndex = (state.currentThemeIndex + 1) % state.themes.length;
    document.body.classList.add(state.themes[state.currentThemeIndex]);
    showToast('Đã đổi theme giao diện!');
  });

  // Submit Handler
  startGachaBtn.addEventListener('click', () => {
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
    } else {
      const birthdateInput = document.getElementById('userBirthdate').value;
      if (!birthdateInput) {
        showToast('Vui lòng chọn Ngày Tháng Năm Sinh!');
        return;
      }
      state.userName = nameInput;
      state.userBirthdate = birthdateInput;
      state.fortuneData = computeCareer(state.userName, state.userBirthdate);
    }

    AudioEngine.playClick();

    // Hide input card & Show Gacha Stage
    document.querySelector('.input-card-wrapper').classList.add('hidden');
    const gachaStage = document.getElementById('gachaStage');
    gachaStage.classList.remove('hidden');

    const gachaStatus = document.getElementById('gachaStatus');
    gachaStatus.innerText = state.activeMode === 'career' ? '🚀 Đang phân tích Ma Trận Thần Số Học Công Danh...' : '✨ Đang kết nối tần số vũ trụ...';

    setTimeout(() => {
      gachaStatus.innerText = state.activeMode === 'career' ? '📜 Đang luận giải Con Số Chủ Đạo...' : '🎁 Đang giải mã thẻ Vibe...';
      AudioEngine.playGachaSound();
    }, 1200);

    setTimeout(() => {
      gachaStage.classList.add('hidden');
      renderResultSection();
    }, 2800);
  });

  // Render Result & Back side
  function renderResultSection() {
    const data = state.fortuneData;
    
    // Render Canvas Front Card
    renderCanvasCard(data);

    // Render Back Side
    if (data.mode === 'career') {
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

  // 3D Card Flip
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

  // Download Card
  document.getElementById('downloadCardBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    const canvas = document.getElementById('vibeCanvas');
    const link = document.createElement('a');
    link.download = `${state.activeMode === 'career' ? 'CareerCard' : 'VibeCard'}_${state.userName}_${getTodayString()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('🎉 Đã tải Card PNG nét cao về máy!');
  });

  // Share Link
  document.getElementById('shareLinkBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    navigator.clipboard.writeText(window.location.href);
    showToast('🔗 Đã copy link web! Hãy chia sẻ cho bạn bè tra cứu nhé!');
  });

  // Re-Gacha Button
  document.getElementById('reGachaBtn').addEventListener('click', () => {
    AudioEngine.playClick();
    document.getElementById('resultSection').classList.add('hidden');
    document.querySelector('.input-card-wrapper').classList.remove('hidden');
    document.querySelector('.input-card-wrapper').scrollIntoView({ behavior: 'smooth' });
  });

  // Render Affiliate Items
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

  // VIP Modal Logic
  const vipModal = document.getElementById('vipModal');
  document.getElementById('openVipBtn').addEventListener('click', openVipModal);
  document.getElementById('triggerVipModalBtn').addEventListener('click', openVipModal);
  document.getElementById('closeVipModalBtn').addEventListener('click', closeVipModal);

  function openVipModal() {
    AudioEngine.playClick();
    const syntaxCode = 'VIBE VIP ' + (Math.floor(Math.random() * 8999) + 1000);
    document.getElementById('transferSyntax').innerText = syntaxCode;
    vipModal.classList.remove('hidden');
  }

  function closeVipModal() {
    vipModal.classList.add('hidden');
  }

  document.getElementById('copyCodeBtn').addEventListener('click', () => {
    const code = document.getElementById('transferSyntax').innerText;
    navigator.clipboard.writeText(code);
    showToast('Đã copy cú pháp chuyển khoản!');
  });

  document.getElementById('simulatePaidBtn').addEventListener('click', () => {
    AudioEngine.playGachaSound();
    state.isVipUnlocked = true;
    closeVipModal();
    showToast('👑 Đã xác nhận thanh toán VIP! Mở khóa Quẻ Chuyên Sâu.');
    
    if (state.fortuneData) {
      if (state.fortuneData.mode === 'career') {
        state.fortuneData.quote = `[LUẬN GIẢI CÔNG DANH VIP 2026]: Người thuộc Con Số 主導 ${state.fortuneData.lifePathNum} sẽ có cơ hội thăng chức lớn vào cuối quý 3. Hãy tự tin đầu tư vào các ngách công nghệ/AI và mở rộng đội ngũ!`;
      } else {
        state.fortuneData.quote = `[QUẺ VIP EXCLUSIVE]: Vận trình 2026 của bạn sẽ tăng vọt mạnh mẽ vào tháng tới. Người thuộc mệnh ${state.fortuneData.zodiacInfo.element} đang thầm để ý bạn. Hãy đầu tư vào bản thân và nắm bắt cơ hội tài chính lớn!`;
      }
      document.getElementById('backHoroscopeText').innerText = state.fortuneData.quote;
      renderCanvasCard(state.fortuneData);
    }
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

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('Service Worker Registered:', reg))
        .catch(err => console.log('Service Worker Failed:', err));
    });
  }
});
