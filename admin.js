/* ==========================================================================
   VIBE CARD AI - ADMIN CONTROL & ANALYTICS ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- ADMIN CREDENTIALS ---
  const ADMIN_CREDENTIALS = {
    username: 'TANNV',
    password: 'Tien@14051'
  };

  // --- INITIAL MOCK USER LOGS DATA ---
  const MOCK_USERS = [
    { id: 'UB-1092', name: 'Minh Hieu', mode: 'vibe', info: '♉ Kim Ngưu', result: 'Quẻ: Thần Thái Bùng Nổ', isVip: true, date: '10/08/2026 22:45' },
    { id: 'UB-1091', name: 'Linh Cute', mode: 'career', info: 'NS: 15/08/2002', result: 'Con Số Chủ Đạo 9', isVip: true, date: '10/08/2026 21:12' },
    { id: 'UB-1090', name: 'Alex Pham', mode: 'vibe', info: '♏ Bọ Cạp', result: 'Quẻ: Vận May Tình Duyên', isVip: false, date: '10/08/2026 19:30' },
    { id: 'UB-1089', name: 'Khanh Vy', mode: 'career', info: 'NS: 22/11/2001', result: 'Con Số Chủ Đạo 11', isVip: true, date: '10/08/2026 18:05' },
    { id: 'UB-1088', name: 'Tuan Anh', mode: 'vibe', info: '♌ Sư Tử', result: 'Quẻ: Tiền Tài Rủ Nhau Về', isVip: false, date: '10/08/2026 16:40' },
    { id: 'UB-1087', name: 'Bao Ngoc', mode: 'career', info: 'NS: 05/03/2003', result: 'Con Số Chủ Đạo 8', isVip: true, date: '10/08/2026 14:15' },
    { id: 'UB-1086', name: 'Hoang Nam', mode: 'vibe', info: '♒ Bảo Bình', result: 'Quẻ: Ý Tưởng Sáng Tạo', isVip: false, date: '10/08/2026 11:20' }
  ];

  // Get user logs from localStorage or initialize
  function getUserLogs() {
    const saved = localStorage.getItem('vibe_user_logs');
    if (!saved) {
      localStorage.setItem('vibe_user_logs', JSON.stringify(MOCK_USERS));
      return MOCK_USERS;
    }
    return JSON.parse(saved);
  }

  function saveUserLogs(logs) {
    localStorage.setItem('vibe_user_logs', JSON.stringify(logs));
  }

  // Check login session
  function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('vibe_admin_auth') === 'true';
    const loginScreen = document.getElementById('loginScreen');
    const adminDashboard = document.getElementById('adminDashboard');

    if (isLoggedIn) {
      loginScreen.classList.add('hidden');
      adminDashboard.classList.remove('hidden');
      initDashboard();
    } else {
      loginScreen.classList.remove('hidden');
      adminDashboard.classList.add('hidden');
    }
  }

  // Handle Login Form Submit
  document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value;

    if (user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem('vibe_admin_auth', 'true');
      showToast('🔑 Đăng nhập Admin thành công!');
      checkAuth();
    } else {
      showToast('❌ Tên tài khoản hoặc mật khẩu không chính xác!');
    }
  });

  // Handle Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('vibe_admin_auth');
    showToast('👋 Đã đăng xuất khỏi trang quản trị');
    checkAuth();
  });

  // --- INITIALIZE ADMIN DASHBOARD ---
  function initDashboard() {
    const logs = getUserLogs();
    updateStatsOverview(logs);
    renderUserTable(logs);
    renderAnalyticsChart();
  }

  // Update Top Stats
  function updateStatsOverview(logs) {
    const total = logs.length * 178; // Multiplied for realistic scale display
    const vibeCount = Math.floor(total * 0.66);
    const careerCount = total - vibeCount;
    const vipCount = Math.floor(total * 0.35);
    const revenue = vipCount * 5000;

    document.getElementById('statTotalUsers').innerText = total.toLocaleString('vi-VN');
    document.getElementById('statVibeCount').innerText = vibeCount.toLocaleString('vi-VN');
    document.getElementById('statCareerCount').innerText = careerCount.toLocaleString('vi-VN');
    document.getElementById('statTotalRevenue').innerText = `${revenue.toLocaleString('vi-VN')} VNĐ`;
  }

  // Render User Management Table
  function renderUserTable(logs) {
    const tbody = document.getElementById('userTableBody');
    const searchVal = document.getElementById('userSearchInput').value.toLowerCase();
    const modeFilter = document.getElementById('filterModeSelect').value;
    const vipFilter = document.getElementById('filterVipSelect').value;

    const filtered = logs.filter(item => {
      const matchName = item.name.toLowerCase().includes(searchVal);
      const matchMode = modeFilter === 'all' || item.mode === modeFilter;
      const matchVip = vipFilter === 'all' || (vipFilter === 'vip' ? item.isVip : !item.isVip);
      return matchName && matchMode && matchVip;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 30px; color: var(--text-muted);">Không tìm thấy người dùng phù hợp.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(item => `
      <tr>
        <td><strong>${item.id}</strong></td>
        <td>
          <div style="font-weight: 700;">${item.name}</div>
        </td>
        <td>
          <span class="mode-badge ${item.mode}">
            ${item.mode === 'vibe' ? '🔮 Quẻ Vibe' : '🚀 Công Danh'}
          </span>
        </td>
        <td>${item.info}</td>
        <td><strong style="color: var(--primary-amber);">${item.result}</strong></td>
        <td>
          <span class="status-badge ${item.isVip ? 'vip' : 'free'}">
            ${item.isVip ? '👑 VIP 5K' : 'Miễn Phí'}
          </span>
        </td>
        <td style="color: var(--text-muted); font-size: 0.85rem;">${item.date}</td>
        <td>
          <button class="btn-table-action" onclick="toggleVipStatus('${item.id}')">
            ${item.isVip ? 'Hạ VIP' : 'Duyệt VIP'}
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Window function to toggle VIP
  window.toggleVipStatus = function(id) {
    const logs = getUserLogs();
    const target = logs.find(l => l.id === id);
    if (target) {
      target.isVip = !target.isVip;
      saveUserLogs(logs);

      // Also activate VIP status in local user storage
      localStorage.setItem('vibe_user_status', target.isVip ? 'vip' : 'free');

      showToast(`✅ ${target.isVip ? 'Đã duyệt VIP mở khóa lượt xem không giới hạn' : 'Đã hạ về gói miễn phí'} cho ${target.name} (${id})`);
      initDashboard();
    }
  };

  // Table Filters Events
  document.getElementById('userSearchInput').addEventListener('input', () => renderUserTable(getUserLogs()));
  document.getElementById('filterModeSelect').addEventListener('change', () => renderUserTable(getUserLogs()));
  document.getElementById('filterVipSelect').addEventListener('change', () => renderUserTable(getUserLogs()));

  // Render Analytics Canvas Chart (7 Days Traffic & Revenue)
  function renderAnalyticsChart() {
    const canvas = document.getElementById('analyticsChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Days & Data Points
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const trafficData = [120, 190, 300, 250, 420, 580, 650];
    const revenueData = [40, 70, 110, 95, 180, 260, 310]; // in K VNĐ

    const maxVal = 700;
    const paddingLeft = 50;
    const paddingBottom = 40;
    const chartW = W - paddingLeft - 20;
    const chartH = H - paddingBottom - 20;

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = 20 + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(W - 20, y);
      ctx.stroke();
    }

    // Draw X Labels (Days)
    ctx.font = '600 13px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    const stepX = chartW / (days.length - 1);
    days.forEach((day, idx) => {
      const x = paddingLeft + stepX * idx;
      ctx.fillText(day, x, H - 12);
    });

    // Draw Traffic Line (Purple)
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 4;
    ctx.beginPath();
    trafficData.forEach((val, idx) => {
      const x = paddingLeft + stepX * idx;
      const y = 20 + chartH - (val / maxVal) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Traffic Dots
    trafficData.forEach((val, idx) => {
      const x = paddingLeft + stepX * idx;
      const y = 20 + chartH - (val / maxVal) * chartH;
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Revenue Line (Gold)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    revenueData.forEach((val, idx) => {
      const x = paddingLeft + stepX * idx;
      const y = 20 + chartH - ((val * 2) / maxVal) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  // Toast Helper
  function showToast(msg) {
    const toast = document.getElementById('adminToast');
    document.getElementById('adminToastMsg').innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  // Initial check
  checkAuth();
});
