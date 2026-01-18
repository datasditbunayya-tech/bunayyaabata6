// =====================================================
// PORTAL PENDIDIKAN BUNAYYA ISLAMIC SCHOOL - JAVASCRIPT
// =====================================================

let SCRIPT_URL = localStorage.getItem('scriptUrl') || '';

// Data Storage
let allData = [];
let studentData = [];
let teacherData = [];
let currentReport = [];
let currentPortal = 'guru';
let isConnected = false;
let currentCalendarDate = new Date();

// User Authentication
let currentUser = null;

const DEFAULT_USERS = {
  admin: { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' },
  guru: { username: 'guru', password: 'guru123', role: 'guru', name: 'Guru' },
  wali: { username: 'nis', password: 'nis', role: 'wali', name: 'Wali Siswa' }
};

// =====================================================
// INITIAL STUDENT DATA
// =====================================================

// Data siswa statis untuk fallback dan validasi login
const INITIAL_STUDENT_DATA = [
    { nis: "201", nama: "Aisyah Humairo Annur", class_name: "Kelas 5" },
    { nis: "202", nama: "Faiza Alya Azizah", class_name: "Kelas 5" },
    { nis: "203", nama: "Muhammad Arkaan Mubarrok Hutapea", class_name: "Kelas 5" },
    { nis: "204", nama: "Rayzaka Azhari", class_name: "Kelas 5" },
    { nis: "205", nama: "AHMAD ZAEN MALEEQ", class_name: "Kelas 4" },
    { nis: "206", nama: "ANWAR SHOFWAN ROMADHON", class_name: "Kelas 4" },
    { nis: "207", nama: "EARLYTA SARLINA SALSABILA", class_name: "Kelas 4" },
    { nis: "208", nama: "JIBRIL UBAIDILLAH ASSUWAYYID", class_name: "Kelas 4" },
    { nis: "209", nama: "MUHAMMAD DIRGA AZANI", class_name: "Kelas 4" },
    { nis: "210", nama: "OKSA TIARA ASY SYIFA", class_name: "Kelas 4" },
    { nis: "211", nama: "REVANI PRITA AGUSTIN", class_name: "Kelas 4" },
    { nis: "212", nama: "ZAYYAN YUSRON KAMIL", class_name: "Kelas 4" },
    { nis: "214", nama: "Anindiya Hafizah Az-Zahra", class_name: "Kelas 3" },
    { nis: "215", nama: "Dyna Salsabila", class_name: "Kelas 3" },
    { nis: "216", nama: "Hanifa Zahratusita", class_name: "Kelas 3" },
    { nis: "217", nama: "Raziq Zakir Azhari", class_name: "Kelas 3" },
    { nis: "219", nama: "Shiha Rasyih Al-Fatih", class_name: "Kelas 3" },
    { nis: "220", nama: "Afika Inara Zanati", class_name: "Kelas 3" },
    { nis: "221", nama: "Abid Zakki Hafiz Maulana", class_name: "Kelas 2" },
    { nis: "222", nama: "Alfian Izzam Pranata", class_name: "Kelas 2" },
    { nis: "223", nama: "Arha Bira Rajabi", class_name: "Kelas 2" },
    { nis: "224", nama: "Askhana Sakhi Fitriyani", class_name: "Kelas 2" },
    { nis: "225", nama: "Hanif Raffasya Sofian", class_name: "Kelas 2" },
    { nis: "226", nama: "M Habib Al Fatih", class_name: "Kelas 2" },
    { nis: "227", nama: "Muhammad Rifki Aryatama", class_name: "Kelas 2" },
    { nis: "228", nama: "Taqiyuddin Annur", class_name: "Kelas 2" },
    { nis: "229", nama: "Gibran Arya Jaya", class_name: "Kelas 2" },
    { nis: "231", nama: "ABRISAM KAMIL DEPATI", class_name: "Kelas 5" },
    { nis: "232", nama: "AKMA NAUFAL MAHADAN", class_name: "Kelas 6" },
    { nis: "233", nama: "QONITA ISMAN TAQIYYA", class_name: "Kelas 6" },
    { nis: "234", nama: "Khairunnisa Azka Zafira", class_name: "Kelas 6" },
    { nis: "235", nama: "ABDULLAH KASYAFANI DEPATI", class_name: "TK A" },
    { nis: "236", nama: "Abdurrahman Nizam", class_name: "TK B" },
    { nis: "237", nama: "Abid Ar Rasyid Riyadi", class_name: "TK A" },
    { nis: "238", nama: "Ahmad Alsyad Jauhari", class_name: "TK A" },
    { nis: "239", nama: "Aira Anindira Zalfa", class_name: "TK A" },
    { nis: "240", nama: "Arunika Banafsha Khaira", class_name: "TK B" },
    { nis: "241", nama: "Fathim Hafizah Ahmad", class_name: "TK B" },
    { nis: "242", nama: "Fauzia Naura Mikayla", class_name: "TK B" },
    { nis: "243", nama: "Hifza Rafifah Fitri", class_name: "TK A" },
    { nis: "244", nama: "Izzam Gasani", class_name: "TK A" },
    { nis: "245", nama: "M. Zyandru Al Ghilzah Andriyanto", class_name: "TK A" },
    { nis: "246", nama: "Muhammad Akhmar Al Ghifari", class_name: "TK A" },
    { nis: "247", nama: "Muhammad Attaqi Surya", class_name: "TK B" },
    { nis: "248", nama: "Muhammad Ghufran Kusuma", class_name: "TK B" },
    { nis: "249", nama: "Muhammad Ihsan Al Fatih", class_name: "TK A" },
    { nis: "251", nama: "Rayyan Alfarizqi Adhiyaksa", class_name: "TK A" },
    { nis: "253", nama: "Tafasya Mauza Khadijah", class_name: "TK A" },
    { nis: "254", nama: "Yusuf Fathlani Avicena", class_name: "TK B" },
    { nis: "255", nama: "Zulaikha Qalesya Putri", class_name: "TK A" },
    { nis: "119", nama: "Abdurrahman Alhafidz Aribowo", class_name: "Kelas 1" },
    { nis: "122", nama: "Aghniya Khoirunnisa Depati", class_name: "Kelas 1" },
    { nis: "125", nama: "Alisya Fitriyatul Muna", class_name: "Kelas 1" },
    { nis: "130", nama: "Razqia Nurma Azhari", class_name: "Kelas 1" },
    { nis: "133", nama: "Gibran Aqsan Asyraf", class_name: "Kelas 1" },
    { nis: "140", nama: "Muhammad Riza Hanafi", class_name: "Kelas 1" },
    { nis: "145", nama: "Fika Amira Ramadhani", class_name: "Kelas 1" },
    { nis: "154", nama: "Ahmad Karim", class_name: "TK B" },
    { nis: "156", nama: "Alesya Alfathunisa", class_name: "TK B" },
    { nis: "157", nama: "Alfahri Abdurrahman", class_name: "TK B" },
    { nis: "158", nama: "Andra Keano Wicaksono", class_name: "TK B" },
    { nis: "159", nama: "Aqila Nurfadilah", class_name: "TK B" },
    { nis: "160", nama: "Aretha Cyra Faaiza", class_name: "Kelas 1" },
    { nis: "162", nama: "Arli Hafizh Yulianto", class_name: "TK B" },
    { nis: "163", nama: "Arsyila Nayla", class_name: "TK B" },
    { nis: "168", nama: "Kalila Rifda Al Aqsha", class_name: "TK B" },
    { nis: "169", nama: "Kanza Asheeqa Jali", class_name: "TK B" },
    { nis: "170", nama: "Kartika Putri", class_name: "Kelas 1" },
    { nis: "171", nama: "Khairin Shaquilla Diza", class_name: "TK A" },
    { nis: "173", nama: "M. Zidane Repiansyah", class_name: "TK B" },
    { nis: "174", nama: "Misha Shaquena Almahyra", class_name: "TK B" },
    { nis: "175", nama: "Muhammad Husain Al Ibsya", class_name: "Kelas 1" },
    { nis: "176", nama: "Muhammad Zakir Saka", class_name: "TK B" },
    { nis: "177", nama: "Nayyara Mehrunisa", class_name: "TK B" },
    { nis: "179", nama: "Zaskia Khoirunnisa", class_name: "Kelas 1" },
    { nis: "180", nama: "Muhammad Faiz Alfarizi", class_name: "TK B" },
    { nis: "273", nama: "Adnan Gaffar Al-Farizqi", class_name: "TK A" },
    { nis: "274", nama: "Khaizuran Mizyan", class_name: "TK B" },
    { nis: "275", nama: "Farel Rafisqi Anwar", class_name: "TK A" },
    { nis: "276", nama: "Atha Hafiz Alfarezi", class_name: "TK A" },
    { nis: "278", nama: "Muhammad Alfarizi Abyan", class_name: "TK B" },
    { nis: "279", nama: "Kautsarrazky Satria Omar Arkanza", class_name: "TK B" },
    { nis: "280", nama: "Rafardhan Rafa Kusuma", class_name: "TK A" },
    { nis: "281", nama: "Firda Azkayra Ramadani", class_name: "TK A" },
    { nis: "282", nama: "Faisal Ramadhan Syahputra", class_name: "TK A" },
    { nis: "283", nama: "Risqiana Murni Sunjaya", class_name: "TK B" },
    { nis: "284", nama: "Nadifa Ashadiya Kirani", class_name: "TK A" },
    { nis: "285", nama: "Zaenab", class_name: "TK B" },
    { nis: "286", nama: "Habibah Fadillah Hilyah", class_name: "TK A" },
    { nis: "287", nama: "MUHAMMAD AL-FATIH", class_name: "Kelas 6" },
    { nis: "288", nama: "ZAKARIA", class_name: "Kelas 4" },
    { nis: "289", nama: "Tolhah Annur", class_name: "TK A" }
];

// =====================================================
// AUTHENTICATION FUNCTIONS
// =====================================================

// Load initial data for login validation
function loadInitialData() {
    // Load fallback data first (includes INITIAL_STUDENT_DATA)
    loadFallbackData();
    
    if (SCRIPT_URL) {
        // Try to fetch real data in background
        getAllData().then(data => {
            allData = data || [];
            teacherData = allData.filter(d => d.type === 'master_guru');
            
            // Gabungkan data siswa dari Google Sheets dengan data awal
            const sheetStudents = allData.filter(d => d.type === 'master_siswa');
            
            // Jika ada data siswa dari Google Sheets, gunakan itu
            // Jika tidak, gunakan data awal
            if (sheetStudents.length > 0) {
                studentData = sheetStudents;
            } else {
                // Tambahkan data siswa awal ke allData jika belum ada
                INITIAL_STUDENT_DATA.forEach(student => {
                    if (!allData.some(s => s.nis === student.nis)) {
                        const studentRecord = {
                            id: `siswa_${student.nis}_initial`,
                            type: 'master_siswa',
                            nis: student.nis,
                            nama: student.nama,
                            class_name: student.class_name,
                            created_at: new Date().toISOString()
                        };
                        allData.push(studentRecord);
                    }
                });
                studentData = [...INITIAL_STUDENT_DATA];
            }
            
            populateTeacherDropdowns();
            console.log('Data refreshed from sheet for login');
        }).catch(e => {
            console.log('Offline mode or init load failed');
            // Use initial student data for fallback
            studentData = [...INITIAL_STUDENT_DATA];
        });
    } else {
        // Use initial student data
        studentData = [...INITIAL_STUDENT_DATA];
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('login-password');
    const toggleIcon = document.getElementById('password-toggle-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

function handleLogin() {
    const role = document.getElementById('login-role').value;
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    const errorDiv = document.getElementById('login-error');
    const errorText = document.getElementById('login-error-text');
    
    // Validation
    if (!role) {
        errorText.textContent = 'Silakan pilih tipe pengguna';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    if (!username || !password) {
        errorText.textContent = 'Username dan password harus diisi';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    // Check credentials
    const user = DEFAULT_USERS[role];
    
    if (user && user.username === username && user.password === password) {
        // Login success
        currentUser = {
            username: username,
            role: role,
            name: user.name
        };
        
        // Save to session
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Hide login page
        document.getElementById('login-page').style.display = 'none';
        
        // Apply role-based access
        applyRoleAccess();
        
        // Show main app
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // Initialize app
        initializeApp();
        
        showToast(`Selamat datang, ${user.name}!`, 'success');
        return;
    } 

    // Check Wali Login (NIS / NIS)
    if (role === 'wali') {
        // Validasi format NIS
        if (!/^\d{3,}$/.test(username)) {
            errorText.textContent = 'Format NIS tidak valid (harus angka minimal 3 digit)';
            errorDiv.classList.remove('hidden');
            return;
        }
        
        // Ensure studentData is loaded
        if (studentData.length === 0) {
            loadFallbackData();
        }

        // Find student by NIS (Username must be NIS, Password must be NIS)
        const student = studentData.find(s => s.nis === username);
        
        if (student && password === username) { // Login dengan password sama dengan NIS
            // Login success as Wali
            currentUser = {
                username: username,
                role: 'wali',
                name: `Wali ${student.nama}`,
                studentNis: student.nis,
                studentName: student.nama,
                studentClass: student.class_name
            };
            
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            document.getElementById('login-page').style.display = 'none';
            applyRoleAccess();
            document.getElementById('loading-overlay').style.display = 'flex';
            initializeApp();
            
            showToast(`Selamat datang, Wali ${student.nama}!`, 'success');
            return;
        } else {
            // Cek jika login dengan kredensial default wali (fallback)
            const defaultWali = DEFAULT_USERS['wali'];
            if (username === defaultWali.username && password === defaultWali.password) {
                currentUser = {
                    username: username,
                    role: 'wali',
                    name: defaultWali.name
                };
                
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                document.getElementById('login-page').style.display = 'none';
                applyRoleAccess();
                document.getElementById('loading-overlay').style.display = 'flex';
                initializeApp();
                
                showToast(`Selamat datang, ${defaultWali.name}!`, 'success');
                return;
            }
        }
        
        errorText.textContent = 'NIS atau password salah';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    errorText.textContent = 'Username atau password salah';
    errorDiv.classList.remove('hidden');
}

function handleLogout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        currentUser = null;
        sessionStorage.removeItem('currentUser');
        
        // Reset form
        document.getElementById('login-role').value = '';
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-error').classList.add('hidden');
        
        // Show login page
        document.getElementById('login-page').style.display = 'flex';
        
        showToast('Berhasil logout', 'info');
    }
}

function checkSession() {
    const savedUser = sessionStorage.getItem('currentUser');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('loading-overlay').style.display = 'flex';
        applyRoleAccess();
        return true;
    }
    
    return false;
}

function applyRoleAccess() {
    if (!currentUser) return;
    
    const role = currentUser.role;
    
    // Update user info display
    const userInfo = document.getElementById('user-info');
    const roleBadge = document.getElementById('user-role-badge');
    const nameDisplay = document.getElementById('user-name-display');
    
    if (userInfo) userInfo.classList.remove('hidden');
    
    const roleIcons = {
        admin: '👑',
        guru: '👨‍🏫',
        wali: '👨‍👩‍👧‍👦'
    };
    
    const roleNames = {
        admin: 'Administrator',
        guru: 'Guru',
        wali: currentUser.name || 'Wali Siswa'
    };
    
    if (roleBadge) roleBadge.textContent = roleIcons[role] || '👤';
    if (nameDisplay) nameDisplay.textContent = roleNames[role] || currentUser.name;
    
    // Apply access restrictions based on role
    const tabGuru = document.getElementById('tab-guru');
    const tabSiswa = document.getElementById('tab-siswa');
    const tabWali = document.getElementById('tab-wali');
    const btnSetup = document.getElementById('btn-setup');
    const menuGuruHorizontal = document.getElementById('menu-guru-horizontal');
    
    // Master data menus
    const menuMasterGuru = document.getElementById('menu-master-guru');
    const menuMasterSiswaPortal = document.getElementById('menu-master-siswa-portal');
    
    // Reset visibility
    if (tabGuru) tabGuru.style.display = 'flex';
    if (tabSiswa) tabSiswa.style.display = 'flex';
    if (tabWali) tabWali.style.display = 'flex';
    if (btnSetup) btnSetup.style.display = 'block';
    if (menuMasterGuru) menuMasterGuru.style.display = 'inline-flex';
    if (menuMasterSiswaPortal) menuMasterSiswaPortal.style.display = 'inline-flex';
    if (menuGuruHorizontal) menuGuruHorizontal.style.display = 'block';
    
    if (role === 'admin') {
        // Admin: Full access
        // Tampilkan tombol Setup
        if (btnSetup) btnSetup.style.display = 'inline-block';
    } else if (role === 'guru') {
        // Guru: Access all portals EXCEPT Master Data Guru & Siswa
        if (menuMasterGuru) menuMasterGuru.style.display = 'none';
        if (menuMasterSiswaPortal) menuMasterSiswaPortal.style.display = 'none';
        // Guru BISA akses Setup Google Sheet
        if (btnSetup) btnSetup.style.display = 'inline-block';
    } else if (role === 'wali') {
        // Wali: Only Portal Wali
        if (tabGuru) tabGuru.style.display = 'none';
        if (tabSiswa) tabSiswa.style.display = 'none';
        if (btnSetup) btnSetup.style.display = 'none';
        if (menuGuruHorizontal) menuGuruHorizontal.style.display = 'none';
        
        // Force switch to portal wali
        switchPortal('wali');
        
        // If logged in as specific student parent, auto-select student
        if (currentUser.studentNis) {
            setTimeout(() => {
                const classSelect = document.getElementById('parent-class');
                const studentSelect = document.getElementById('parent-student');
                
                if (classSelect && studentSelect) {
                    classSelect.value = currentUser.studentClass;
                    // Trigger change to load students
                    loadStudentsByClass('parent');
                    
                    // Tunggu sebentar agar dropdown siswa terisi
                    setTimeout(() => {
                        // Select student berdasarkan nama
                        studentSelect.value = currentUser.studentName;
                        // Load progress
                        loadStudentProgress();
                        
                        // Disable filters untuk wali spesifik agar tidak bisa melihat siswa lain
                        classSelect.disabled = true;
                        studentSelect.disabled = true;
                        
                        // Update info siswa di header
                        const studentInfo = document.getElementById('wali-student-info');
                        if (studentInfo) {
                            studentInfo.innerHTML = `
                                <div class="text-sm text-gray-600">
                                    <span class="font-semibold">Siswa:</span> ${currentUser.studentName} (${currentUser.studentNis})
                                </div>
                            `;
                            studentInfo.classList.remove('hidden');
                        }
                        
                        showToast(`Data Ananda ${currentUser.studentName} dimuat otomatis`, 'success');
                    }, 500);
                }
            }, 1000); // Wait for data to load
        }
    }
    
    // Load logo after role access applied
    loadCurrentLogo();
}

function getCurrentUserRole() {
    return currentUser ? currentUser.role : null;
}

function hasAccess(feature) {
    if (!currentUser) return false;
    
    const role = currentUser.role;
    
    const accessMap = {
        'master-guru': ['admin'],
        'master-siswa': ['admin'],
        'setup': ['admin', 'guru'],  // Admin dan Guru bisa akses Setup
        'portal-guru': ['admin', 'guru'],
        'portal-siswa': ['admin', 'guru'],
        'portal-wali': ['admin', 'guru', 'wali']
    };
    
    const allowedRoles = accessMap[feature] || [];
    return allowedRoles.includes(role);
}

// =====================================================
// GOOGLE SHEETS API FUNCTIONS
// =====================================================

async function callGoogleScript(action, data = null) {
    if (!SCRIPT_URL) {
        throw new Error('URL Google Apps Script belum dikonfigurasi');
    }

    let url = `${SCRIPT_URL}?action=${action}`;
    
    if (data) {
        url += `&data=${encodeURIComponent(JSON.stringify(data))}`;
    }

    // Coba beberapa metode untuk mengatasi CORS
    try {
        // Metode 1: Fetch dengan redirect follow
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error('JSON parse error:', text);
            throw new Error('Response bukan JSON valid');
        }
    } catch (error) {
        console.error('Fetch error, trying JSONP:', error);
        
        // Metode 2: JSONP fallback
        return new Promise((resolve, reject) => {
            const callbackName = 'jsonpCallback_' + Date.now();
            const script = document.createElement('script');
            
            window[callbackName] = function(data) {
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(data);
            };
            
            script.onerror = function() {
                delete window[callbackName];
                document.body.removeChild(script);
                reject(new Error('JSONP request failed'));
            };
            
            // Timeout 15 detik
            setTimeout(() => {
                if (window[callbackName]) {
                    delete window[callbackName];
                    if (script.parentNode) {
                        document.body.removeChild(script);
                    }
                    reject(new Error('Request timeout'));
                }
            }, 15000);
            
            script.src = url + '&callback=' + callbackName;
            document.body.appendChild(script);
        });
    }
}

async function createRecord(record) {
    return await callGoogleScript('create', record);
}

async function updateRecord(record) {
    return await callGoogleScript('update', record);
}

async function deleteRecord(record) {
    return await callGoogleScript('delete', record);
}

async function getAllData() {
    const result = await callGoogleScript('getAll');
    if (result.success) {
        return result.data;
    }
    throw new Error(result.error || 'Failed to get data');
}

// =====================================================
// INITIALIZATION
// =====================================================

async function init() {
    // Load data immediately for login validation
    loadInitialData();

    // Check if user is already logged in
    if (checkSession()) {
        // User has active session, initialize app
        initializeApp();
    }
    // If no session, login page is already visible
}

async function initializeApp() {
    const today = new Date().toISOString().split('T')[0];
    
    // Set default dates
    const dateFields = ['student-date', 'teacher-date', 'journal-date', 'daily-date', 'activity-date', 'nilai-date', 'event-start'];
    dateFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = today;
    });

    if (SCRIPT_URL) {
        const urlInput = document.getElementById('script-url-input');
        if (urlInput) urlInput.value = SCRIPT_URL;
        await connectToGoogleSheets();
    } else {
        hideLoadingOverlay();
        // Only show setup for admin
        if (hasAccess('setup')) {
            showSetupModal();
        }
    }

    // Setup auto-generate untuk jurnal
    setupJournalAutoGenerate();
    
    // Setup event listener untuk dropdown kelas di Rekap Nilai
    setupNilaiDropdowns();
    
    // Apply role access after app is loaded
    applyRoleAccess();
}

// Setup event listener untuk Rekap Nilai
function setupNilaiDropdowns() {
    const nilaiClass = document.getElementById('nilai-class');
    if (nilaiClass) {
        nilaiClass.addEventListener('change', function() {
            loadStudentsByClass('nilai');
        });
    }
}

async function connectToGoogleSheets() {
    updateLoadingStatus('Menghubungkan ke Google Sheets...');
    updateConnectionStatus('loading', '🔄 Menghubungkan...');

    try {
        console.log('Connecting to:', SCRIPT_URL);
        const data = await getAllData();
        console.log('Data received:', data);
        
        allData = data || [];
        
        teacherData = allData.filter(d => d.type === 'master_guru');
        
        // Gabungkan data siswa dari Google Sheets dengan data awal
        const sheetStudents = allData.filter(d => d.type === 'master_siswa');
        
        // Jika ada data siswa dari Google Sheets, gunakan itu
        // Jika tidak, gunakan data awal
        if (sheetStudents.length > 0) {
            studentData = sheetStudents;
        } else {
            // Tambahkan data siswa awal ke allData jika belum ada
            INITIAL_STUDENT_DATA.forEach(student => {
                if (!allData.some(s => s.nis === student.nis)) {
                    const studentRecord = {
                        id: `siswa_${student.nis}_initial`,
                        type: 'master_siswa',
                        nis: student.nis,
                        nama: student.nama,
                        class_name: student.class_name,
                        created_at: new Date().toISOString()
                    };
                    allData.push(studentRecord);
                }
            });
            studentData = [...INITIAL_STUDENT_DATA];
        }

        console.log('Teachers:', teacherData.length, 'Students:', studentData.length);

        populateTeacherDropdowns();
        isConnected = true;
        updateConnectionStatus('connected', '✓ Terhubung');
        showToast(`Berhasil memuat ${allData.length} data dari Google Sheets`, 'success');
        
    } catch (error) {
        console.error('Connection error:', error);
        isConnected = false;
        updateConnectionStatus('disconnected', '✗ Gagal terhubung');
        showToast('Gagal terhubung: ' + error.message, 'error');
        loadFallbackData();
    }

    hideLoadingOverlay();
}

function loadFallbackData() {
    // Use INITIAL_STUDENT_DATA as fallback
    studentData = [...INITIAL_STUDENT_DATA];

    teacherData = [
        { nip: "T001", nama: "Nurochman" },
        { nip: "T002", nama: "Hasnal Labibah" },
        { nip: "T003", nama: "Nilayana" },
        { nip: "T004", nama: "Tri Amelia" },
        { nip: "T005", nama: "Anggun Fajarwati" }
    ];

    populateTeacherDropdowns();
    loadDashboard();
    renderCalendar();
}

function populateTeacherDropdowns() {
    const dropdowns = ['teacher-name', 'journal-teacher', 'report-teacher', 'jadwal-teacher'];
    
    dropdowns.forEach(id => {
        const select = document.getElementById(id);
        if (!select) return;

        const firstOption = select.options[0];
        select.innerHTML = '';
        select.appendChild(firstOption);

        teacherData.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.nama;
            option.textContent = teacher.nama;
            select.appendChild(option);
        });
    });
}

async function refreshData() {
    showToast('Memuat ulang data...', 'info');
    updateConnectionStatus('loading', '🔄 Memuat...');
    
    try {
        allData = await getAllData();
        teacherData = allData.filter(d => d.type === 'master_guru');
        
        // Gabungkan data siswa dari Google Sheets dengan data awal
        const sheetStudents = allData.filter(d => d.type === 'master_siswa');
        
        if (sheetStudents.length > 0) {
            studentData = sheetStudents;
        } else {
            // Jika tidak ada data dari sheet, gunakan data awal
            studentData = [...INITIAL_STUDENT_DATA];
        }
        
        populateTeacherDropdowns();
        loadDashboard();
        
        updateConnectionStatus('connected', '✓ Terhubung');
        showToast(`Data berhasil dimuat: ${allData.length} records`, 'success');
    } catch (error) {
        updateConnectionStatus('disconnected', '✗ Error');
        showToast('Gagal memuat data', 'error');
    }
}

// =====================================================
// UI FUNCTIONS
// =====================================================

function updateLoadingStatus(text) {
    const el = document.getElementById('loading-status');
    if (el) el.textContent = text;
}

function hideLoadingOverlay() {
    const el = document.getElementById('loading-overlay');
    if (el) el.style.display = 'none';
}

function updateConnectionStatus(status, text) {
    const el = document.getElementById('connection-status');
    if (!el) return;

    el.className = 'connection-status';
    if (status === 'connected') el.classList.add('status-connected');
    else if (status === 'disconnected') el.classList.add('status-disconnected');
    else el.classList.add('status-loading');
    el.textContent = text;
}

function showSetupModal() {
    document.getElementById('setup-modal').classList.remove('hidden');
}

function hideSetupModal() {
    document.getElementById('setup-modal').classList.add('hidden');
}

async function saveScriptUrl() {
    const url = document.getElementById('script-url-input').value.trim();
    if (!url) {
        showToast('Masukkan URL Google Apps Script', 'error');
        return;
    }

    // Validasi format URL
    if (!url.includes('script.google.com/macros/s/') || !url.endsWith('/exec')) {
        showToast('Format URL tidak valid. Harus seperti: https://script.google.com/macros/s/xxx/exec', 'error');
        return;
    }

    showToast('Menghubungkan ke Google Sheets...', 'info');
    
    // Test koneksi dulu
    try {
        const testUrl = url + '?action=getAll';
        console.log('Testing URL:', testUrl);
        
        const response = await fetch(testUrl, {
            method: 'GET',
            redirect: 'follow'
        });
        
        const text = await response.text();
        console.log('Response:', text.substring(0, 200));
        
        const result = JSON.parse(text);
        
        if (result.success) {
            SCRIPT_URL = url;
            localStorage.setItem('scriptUrl', url);
            
            allData = result.data || [];
            teacherData = allData.filter(d => d.type === 'master_guru');
            
            // Gabungkan data siswa dari Google Sheets dengan data awal
            const sheetStudents = allData.filter(d => d.type === 'master_siswa');
            
            if (sheetStudents.length > 0) {
                studentData = sheetStudents;
            } else {
                // Jika tidak ada data dari sheet, gunakan data awal
                studentData = [...INITIAL_STUDENT_DATA];
            }
            
            populateTeacherDropdowns();
            isConnected = true;
            updateConnectionStatus('connected', '✓ Terhubung');
            
            hideSetupModal();
            hideLoadingOverlay();
            
            showToast(`Berhasil! ${allData.length} data dimuat`, 'success');
        } else {
            throw new Error(result.error || 'Response tidak valid');
        }
    } catch (error) {
        console.error('Connection test failed:', error);
        showToast('Gagal terhubung: ' + error.message, 'error');
        updateConnectionStatus('disconnected', '✗ Gagal');
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}-toast`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// =====================================================
// PORTAL NAVIGATION
// =====================================================

function switchPortal(portal) {
    // Check access based on role
    if (currentUser) {
        const role = currentUser.role;
        
        if (role === 'wali' && portal !== 'wali') {
            showToast('Anda hanya memiliki akses ke Portal Wali', 'error');
            return;
        }
    }
    
    currentPortal = portal;
    document.getElementById('portal-guru').style.display = portal === 'guru' ? 'block' : 'none';
    document.getElementById('portal-siswa').style.display = portal === 'siswa' ? 'block' : 'none';
    document.getElementById('portal-wali').style.display = portal === 'wali' ? 'block' : 'none';

    ['tab-guru', 'tab-siswa', 'tab-wali'].forEach(id => {
        const tab = document.getElementById(id);
        if (!tab) return;
        
        if (id === `tab-${portal}`) {
            tab.classList.add('portal-card-active');
            tab.classList.remove('border-2', 'border-gray-200');
        } else {
            tab.classList.remove('portal-card-active');
            tab.classList.add('border-2', 'border-gray-200');
        }
    });
}

function showGuruSection(section) {
    // Check access for master data sections
    if (section === 'master-guru' && !hasAccess('master-guru')) {
        showToast('Anda tidak memiliki akses ke menu ini', 'error');
        return;
    }
    
    const sections = ['dashboard', 'absensi-siswa', 'absensi-guru', 'jurnal', 'rekap-nilai', 'jadwal', 'kalender', 'laporan', 'master-guru'];
    
    sections.forEach(id => {
        const sectionEl = document.getElementById(`section-${id}`);
        const menuEl = document.getElementById(`menu-${id}`);
        if (sectionEl) sectionEl.style.display = 'none';
        if (menuEl) {
            // Reset horizontal menu style
            menuEl.classList.remove('bg-indigo-600', 'text-white', 'font-semibold');
            menuEl.classList.add('bg-gray-100', 'text-gray-700');
        }
    });

    const activeSectionEl = document.getElementById(`section-${section}`);
    const activeMenuEl = document.getElementById(`menu-${section}`);
    if (activeSectionEl) activeSectionEl.style.display = 'block';
    if (activeMenuEl) {
        // Active horizontal menu style
        activeMenuEl.classList.add('bg-indigo-600', 'text-white', 'font-semibold');
        activeMenuEl.classList.remove('bg-gray-100', 'text-gray-700');
    }

    if (section === 'dashboard') loadDashboard();
    if (section === 'master-guru') loadGuruList();
    if (section === 'kalender') renderCalendar();
}

function showSiswaSection(section) {
    // Check access for master data siswa
    if (section === 'master-siswa' && !hasAccess('master-siswa')) {
        showToast('Anda tidak memiliki akses ke menu ini', 'error');
        return;
    }

    ['laporan-harian', 'laporan-kegiatan', 'target', 'master-siswa'].forEach(id => {
        // Handle both portal guru and portal siswa sections
        const sectionEl = document.getElementById(`section-${id}`);
        const sectionElSiswa = document.getElementById(`section-${id}-siswa`);
        const menuEl = document.getElementById(`menu-${id}`);
        const menuElPortal = document.getElementById(`menu-${id}-portal`);
        
        if (sectionEl) sectionEl.style.display = 'none';
        if (sectionElSiswa) sectionElSiswa.style.display = 'none';
        if (menuEl) {
            menuEl.classList.remove('bg-indigo-600', 'text-white', 'font-semibold');
            menuEl.classList.add('bg-gray-100', 'text-gray-700');
        }
        if (menuElPortal) {
            menuElPortal.classList.remove('bg-indigo-600', 'text-white', 'font-semibold');
            menuElPortal.classList.add('bg-gray-100', 'text-gray-700');
        }
    });

    // Show active section
    if (section === 'master-siswa') {
        const sectionElSiswa = document.getElementById('section-master-siswa-siswa');
        if (sectionElSiswa) sectionElSiswa.style.display = 'block';
        loadSiswaList2();
    } else {
        const activeSectionEl = document.getElementById(`section-${section}`);
        if (activeSectionEl) activeSectionEl.style.display = 'block';
    }

    // Update menu styles
    const activeMenuEl = document.getElementById(`menu-${section}`);
    const activeMenuElPortal = document.getElementById(`menu-${section}-portal`);
    
    if (activeMenuEl) {
        activeMenuEl.classList.add('bg-indigo-600', 'text-white', 'font-semibold');
        activeMenuEl.classList.remove('bg-gray-100', 'text-gray-700');
    }
    if (activeMenuElPortal) {
        activeMenuElPortal.classList.add('bg-indigo-600', 'text-white', 'font-semibold');
        activeMenuElPortal.classList.remove('bg-gray-100', 'text-gray-700');
    }
}

// =====================================================
// DASHBOARD FUNCTIONS
// =====================================================

function loadDashboard() {
    // Update summary cards
    document.getElementById('dash-total-siswa').textContent = studentData.length;
    document.getElementById('dash-total-guru').textContent = teacherData.length;
    
    const thisMonth = new Date().toISOString().substring(0, 7);
    const jurnalBulanIni = allData.filter(d => d.type === 'journal' && (d.date || '').startsWith(thisMonth)).length;
    document.getElementById('dash-total-jurnal').textContent = jurnalBulanIni;

    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = allData.filter(d => d.type === 'student_attendance' && d.date === today);
    const hadirCount = todayAttendance.filter(a => a.status === 'Hadir').length;
    const kehadiran = todayAttendance.length > 0 ? Math.round((hadirCount / todayAttendance.length) * 100) : 0;
    document.getElementById('dash-kehadiran').textContent = kehadiran + '%';

    // Attendance chart (last 6 days)
    updateAttendanceChart();
    
    // Subject distribution
    updateSubjectChart();
    
    // Recent activities
    updateRecentActivities();
}

function updateAttendanceChart() {
    const chartContainer = document.getElementById('dash-attendance-chart');
    const days = [];
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toISOString().split('T')[0]);
    }

    const attendanceByDay = days.map(day => {
        const dayAttendance = allData.filter(d => d.type === 'student_attendance' && d.date === day);
        return dayAttendance.filter(a => a.status === 'Hadir').length;
    });

    const maxVal = Math.max(...attendanceByDay, 1);
    
    chartContainer.innerHTML = attendanceByDay.map((count, i) => `
        <div class="flex-1 flex flex-col items-center">
            <div class="w-full bg-blue-500 rounded-t chart-bar" style="height: ${(count/maxVal)*100}%"></div>
            <div class="text-sm font-bold text-blue-700 mt-1">${count}</div>
        </div>
    `).join('');
}

function updateSubjectChart() {
    const chartContainer = document.getElementById('dash-subject-chart');
    const journals = allData.filter(d => d.type === 'journal');
    
    const subjectCount = {};
    journals.forEach(j => {
        const subject = j.subject || 'Lainnya';
        subjectCount[subject] = (subjectCount[subject] || 0) + 1;
    });

    const subjects = Object.entries(subjectCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxVal = Math.max(...subjects.map(s => s[1]), 1);
    
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    chartContainer.innerHTML = subjects.map(([subject, count], i) => `
        <div class="flex-1 flex flex-col items-center">
            <div class="w-full rounded-t chart-bar" style="height: ${(count/maxVal)*100}%; background-color: ${colors[i]}"></div>
            <div class="text-xs font-bold mt-1" style="color: ${colors[i]}">${count}</div>
            <div class="text-xs text-gray-600 text-center truncate w-full" title="${subject}">${subject.substring(0, 6)}</div>
        </div>
    `).join('') || '<p class="text-gray-400 text-sm">Belum ada data</p>';
}

function updateRecentActivities() {
    const container = document.getElementById('dash-recent-activities');
    const recentItems = allData
        .filter(d => d.created_at)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    if (recentItems.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Belum ada aktivitas</p>';
        return;
    }

    container.innerHTML = recentItems.map(item => {
        const icons = {
            'journal': '📝',
            'student_attendance': '📋',
            'teacher_attendance': '👨‍🏫',
            'daily_report': '📄',
            'activity': '🎯',
            'nilai': '📊',
            'jadwal': '🗓️',
            'event': '📅'
        };
        const icon = icons[item.type] || '📌';
        const time = new Date(item.created_at).toLocaleString('id-ID');
        
        return `
            <div class="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition">
                <div class="text-2xl">${icon}</div>
                <div class="flex-1">
                    <div class="font-semibold text-gray-800">${item.type.replace('_', ' ').toUpperCase()}</div>
                    <div class="text-sm text-gray-600">${item.teacher_name || item.student_name || item.class_name || '-'}</div>
                </div>
                <div class="text-xs text-gray-400">${time}</div>
            </div>
        `;
    }).join('');
}

// =====================================================
// STUDENT DATA LOADING
// =====================================================

function loadStudentsByClass(prefix) {
    // Mapping untuk ID element yang berbeda
    const classMapping = {
        'daily': 'daily-class',
        'activity': 'activity-class',
        'target': 'target-class',
        'parent': 'parent-class',
        'nilai': 'nilai-class'
    };
    
    const studentMapping = {
        'daily': 'daily-student',
        'activity': 'activity-student',
        'target': 'target-student',
        'parent': 'parent-student',
        'nilai': 'nilai-student'
    };
    
    const classSelectId = classMapping[prefix] || `${prefix}-class`;
    const studentSelectId = studentMapping[prefix] || `${prefix}-student`;
    
    const classSelect = document.getElementById(classSelectId);
    const studentSelect = document.getElementById(studentSelectId);
    
    if (!classSelect || !studentSelect) {
        console.error('Element not found:', classSelectId, studentSelectId);
        return;
    }
    
    const selectedClass = classSelect.value;

    studentSelect.innerHTML = '<option value="">Pilih Siswa</option>';

    if (selectedClass) {
        // Filter siswa berdasarkan kelas - handle both string and number NIS
        const filteredStudents = studentData.filter(s => s.class_name === selectedClass);
        
        // Sort alphabetically by name
        filteredStudents.sort((a, b) => (a.nama || '').localeCompare(b.nama || ''));
        
        filteredStudents.forEach(student => {
            const option = document.createElement('option');
            option.value = student.nama;
            option.textContent = `${student.nama} (${student.nis})`;
            studentSelect.appendChild(option);
        });
        
        console.log(`Loaded ${filteredStudents.length} students for class ${selectedClass}`);
    }
}

// =====================================================
// ATTENDANCE FUNCTIONS
// =====================================================

function loadStudentAttendance() {
    const className = document.getElementById('student-class').value;
    const date = document.getElementById('student-date').value;

    if (!className || !date) {
        showToast('Pilih kelas dan tanggal', 'error');
        return;
    }

    const students = studentData.filter(s => s.class_name === className);
    const listContainer = document.getElementById('student-attendance-list');

    if (students.length === 0) {
        listContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Tidak ada siswa di kelas ini</p>';
        return;
    }

    let html = '<div class="mt-4 border border-gray-200 rounded-lg overflow-hidden"><table class="w-full">';
    html += '<thead class="bg-indigo-50"><tr>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">NIS</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>';
    html += '</tr></thead><tbody class="bg-white divide-y divide-gray-200">';

    students.forEach((student, index) => {
        const existing = allData.find(item => 
            item.type === 'student_attendance' && 
            item.student_name === student.nama && 
            item.date === date
        );
        const status = existing ? existing.status : 'Hadir';

        html += `<tr class="hover:bg-gray-50">`;
        html += `<td class="px-4 py-3 text-sm text-gray-700">${index + 1}</td>`;
        html += `<td class="px-4 py-3 text-sm text-gray-700">${student.nis}</td>`;
        html += `<td class="px-4 py-3 text-sm text-gray-700">${student.nama}</td>`;
        html += `<td class="px-4 py-3"><select id="status-${student.nis}" class="px-3 py-1 border border-gray-300 rounded-lg text-sm">`;
        html += `<option value="Hadir" ${status === 'Hadir' ? 'selected' : ''}>✓ Hadir</option>`;
        html += `<option value="Sakit" ${status === 'Sakit' ? 'selected' : ''}>🤒 Sakit</option>`;
        html += `<option value="Izin" ${status === 'Izin' ? 'selected' : ''}>📝 Izin</option>`;
        html += `<option value="Alpa" ${status === 'Alpa' ? 'selected' : ''}>✗ Alpa</option>`;
        html += `</select></td></tr>`;
    });

    html += '</tbody></table></div>';
    listContainer.innerHTML = html;
    showToast(`${students.length} siswa dimuat`, 'success');
}

async function saveStudentAttendance() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const className = document.getElementById('student-class').value;
    const date = document.getElementById('student-date').value;

    if (!className || !date) {
        showToast('Pilih kelas dan tanggal', 'error');
        return;
    }

    const students = studentData.filter(s => s.class_name === className);
    let saveCount = 0;

    for (const student of students) {
        const statusSelect = document.getElementById(`status-${student.nis}`);
        if (!statusSelect) continue;

        const status = statusSelect.value;
        const existing = allData.find(item => 
            item.type === 'student_attendance' && 
            item.student_name === student.nama && 
            item.date === date
        );

        try {
            if (existing) {
                existing.status = status;
                await updateRecord(existing);
            } else {
                const record = {
                    id: `student_att_${student.nis}_${date}_${Date.now()}`,
                    type: 'student_attendance',
                    class_name: className,
                    student_name: student.nama,
                    nis: student.nis,
                    date: date,
                    status: status,
                    created_at: new Date().toISOString()
                };
                await createRecord(record);
                allData.push(record);
            }
            saveCount++;
        } catch (error) {
            console.error('Save error:', error);
        }
    }

    if (saveCount > 0) {
        showToast(`Absensi ${saveCount} siswa berhasil disimpan`, 'success');
        loadDashboard();
    } else {
        showToast('Gagal menyimpan absensi', 'error');
    }
}

function loadTeacherAttendance() {
    const teacherName = document.getElementById('teacher-name').value;
    const className = document.getElementById('teacher-class').value;
    const date = document.getElementById('teacher-date').value;

    if (!teacherName || !className || !date) {
        showToast('Lengkapi guru, kelas, dan tanggal', 'error');
        return;
    }

    const existing = allData.find(item => 
        item.type === 'teacher_attendance' && 
        item.teacher_name === teacherName && 
        item.class_name === className &&
        item.date === date
    );

    const displayContainer = document.getElementById('teacher-attendance-display');

    if (existing) {
        document.getElementById('teacher-status').value = existing.status;
        displayContainer.innerHTML = `
            <div class="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-green-800 mb-2">✅ Data Ditemukan</h3>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="text-gray-600">Guru:</div><div class="font-semibold">${existing.teacher_name}</div>
                    <div class="text-gray-600">Kelas:</div><div class="font-semibold">${existing.class_name}</div>
                    <div class="text-gray-600">Tanggal:</div><div class="font-semibold">${formatDate(existing.date)}</div>
                    <div class="text-gray-600">Status:</div><div class="font-semibold">${existing.status}</div>
                </div>
            </div>`;
        showToast('Data absensi ditemukan', 'success');
    } else {
        document.getElementById('teacher-status').value = 'Hadir';
        displayContainer.innerHTML = `
            <div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-yellow-800 mb-2">ℹ️ Belum Ada Data</h3>
                <p class="text-sm text-gray-600">Silakan pilih status dan klik Simpan.</p>
            </div>`;
    }
}

async function saveTeacherAttendance() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const teacherName = document.getElementById('teacher-name').value;
    const className = document.getElementById('teacher-class').value;
    const date = document.getElementById('teacher-date').value;
    const status = document.getElementById('teacher-status').value;

    if (!teacherName || !className || !date) {
        showToast('Lengkapi guru, kelas, dan tanggal', 'error');
        return;
    }

    const existing = allData.find(item => 
        item.type === 'teacher_attendance' && 
        item.teacher_name === teacherName && 
        item.class_name === className &&
        item.date === date
    );

    try {
        if (existing) {
            existing.status = status;
            await updateRecord(existing);
            showToast('Absensi guru berhasil diperbarui', 'success');
        } else {
            const record = {
                id: `teacher_att_${Date.now()}`,
                type: 'teacher_attendance',
                teacher_name: teacherName,
                class_name: className,
                date: date,
                status: status,
                created_at: new Date().toISOString()
            };
            await createRecord(record);
            allData.push(record);
            showToast('Absensi guru berhasil disimpan', 'success');
        }
        loadTeacherAttendance();
    } catch (error) {
        showToast('Gagal menyimpan absensi: ' + error.message, 'error');
    }
}

// =====================================================
// JOURNAL FUNCTIONS
// =====================================================

// Auto-generate Kegiatan dan Catatan berdasarkan Topik
function generateJournalContent() {
    const subject = document.getElementById('journal-subject').value;
    const topic = document.getElementById('journal-topic').value;
    const className = document.getElementById('journal-class').value;
    
    if (!topic) return;
    
    // Template kegiatan berdasarkan mata pelajaran
    const activityTemplates = {
        'IQRO': [
            `Pembelajaran membaca IQRO dengan materi ${topic}`,
            `Siswa berlatih membaca ${topic} dengan bimbingan guru`,
            `Praktek tajwid dan makhorijul huruf pada ${topic}`,
            `Latihan pelafalan huruf hijaiyah: ${topic}`
        ],
        'TAHFIDZ': [
            `Hafalan ${topic} dengan metode talaqqi`,
            `Muroja'ah dan setoran hafalan ${topic}`,
            `Pembelajaran tajwid dan hafalan ${topic}`,
            `Siswa menyetorkan hafalan ${topic} secara individu`
        ],
        'MAKHORIJUL KHURUF': [
            `Pembelajaran makhorijul huruf: ${topic}`,
            `Praktek pelafalan huruf dengan benar pada ${topic}`,
            `Latihan pengucapan huruf hijaiyah: ${topic}`
        ],
        'HAFALAN HADIST HARIAN': [
            `Hafalan hadist tentang ${topic}`,
            `Pembelajaran makna dan amaliyah hadist ${topic}`,
            `Siswa menghafalkan hadist ${topic} dengan artinya`
        ],
        'HAFALAN DOA HARIAN': [
            `Hafalan doa ${topic}`,
            `Pembelajaran makna dan adab doa ${topic}`,
            `Praktek membaca doa ${topic} dengan benar`
        ],
        'HAFALAN DOA SHOLAT': [
            `Hafalan bacaan sholat: ${topic}`,
            `Praktek gerakan dan bacaan ${topic}`,
            `Pembelajaran makna bacaan ${topic} dalam sholat`
        ],
        'BAHASA ARAB': [
            `Pembelajaran kosakata bahasa Arab: ${topic}`,
            `Latihan percakapan bahasa Arab tentang ${topic}`,
            `Menulis dan membaca teks Arab: ${topic}`
        ],
        'BAHASA INGGRIS': [
            `English lesson about ${topic}`,
            `Vocabulary and conversation practice: ${topic}`,
            `Reading and writing activity: ${topic}`
        ],
        'MATEMATIKA': [
            `Pembelajaran matematika materi ${topic}`,
            `Latihan soal dan pembahasan ${topic}`,
            `Praktek pemecahan masalah: ${topic}`
        ],
        'IPAS': [
            `Pembelajaran IPA/IPS tentang ${topic}`,
            `Eksplorasi dan diskusi materi ${topic}`,
            `Pengamatan dan percobaan: ${topic}`
        ],
        'BAHASA INDONESIA': [
            `Pembelajaran bahasa Indonesia: ${topic}`,
            `Latihan membaca dan menulis: ${topic}`,
            `Diskusi dan presentasi tentang ${topic}`
        ],
        'PKN': [
            `Pembelajaran PKN tentang ${topic}`,
            `Diskusi nilai-nilai Pancasila: ${topic}`,
            `Praktek sikap dan perilaku: ${topic}`
        ],
        'PJOK': [
            `Pembelajaran olahraga: ${topic}`,
            `Praktek dan latihan ${topic}`,
            `Permainan dan aktivitas fisik: ${topic}`
        ],
        'SENI BUDAYA': [
            `Pembelajaran seni budaya: ${topic}`,
            `Praktek dan kreativitas: ${topic}`,
            `Apresiasi dan ekspresi seni: ${topic}`
        ],
        'PRAKTEK AQIDAH DAN AKHLAQ': [
            `Pembelajaran akidah akhlak: ${topic}`,
            `Praktek adab dan akhlak mulia: ${topic}`,
            `Diskusi dan tanya jawab tentang ${topic}`
        ],
        'AKHLAQ': [
            `Pembelajaran akhlak tentang ${topic}`,
            `Diskusi dan pemahaman tentang ${topic}`,
            `Praktek penerapan akhlak mulia: ${topic}`,
            `Pembinaan karakter melalui materi ${topic}`
        ],
        'NAHWU': [
            `Pembelajaran nahwu (tata bahasa Arab): ${topic}`,
            `Latihan i'rab dan struktur kalimat: ${topic}`,
            `Penjelasan kaidah nahwu tentang ${topic}`,
            `Praktek analisis kalimat bahasa Arab: ${topic}`
        ],
        'BELAJAR HURUF ABJAD': [
            `Pembelajaran huruf abjad: ${topic}`,
            `Latihan menulis dan membaca huruf: ${topic}`,
            `Permainan edukatif mengenal huruf: ${topic}`
        ],
        'BELAJAR ANGKA': [
            `Pembelajaran mengenal angka: ${topic}`,
            `Latihan berhitung dan menulis angka: ${topic}`,
            `Permainan edukatif tentang angka: ${topic}`
        ],
        'LAINNYA': [
            `Pembelajaran materi ${topic} dengan metode interaktif`,
            `Kegiatan belajar mengajar tentang ${topic}`,
            `Siswa mempelajari ${topic} dengan bimbingan guru`,
            `Praktek dan latihan materi ${topic}`
        ]
    };

    // Template catatan berdasarkan mata pelajaran
    const notesTemplates = {
        'IQRO': [
            `Siswa antusias mengikuti pembelajaran ${topic}. Perlu latihan lebih lanjut untuk beberapa siswa.`,
            `Pembelajaran ${topic} berjalan lancar. Mayoritas siswa sudah mampu membaca dengan baik.`,
            `Siswa ${className} menunjukkan kemajuan dalam membaca ${topic}.`
        ],
        'TAHFIDZ': [
            `Hafalan ${topic} berjalan dengan baik. Beberapa siswa sudah lancar, sebagian perlu muroja'ah.`,
            `Siswa aktif menyetorkan hafalan ${topic}. Perlu pengulangan untuk memperkuat hafalan.`,
            `Pembelajaran ${topic} mencapai target. Siswa menunjukkan semangat menghafal.`
        ],
        'MAKHORIJUL KHURUF': [
            `Siswa berlatih pelafalan ${topic} dengan antusias. Perlu koreksi pada beberapa huruf.`,
            `Pembelajaran makhorijul huruf ${topic} berjalan baik. Siswa mampu membedakan huruf dengan benar.`
        ],
        'HAFALAN HADIST HARIAN': [
            `Siswa menghafalkan hadist ${topic} dengan baik. Perlu pemahaman makna lebih lanjut.`,
            `Hafalan hadist ${topic} tercapai. Siswa mampu mengamalkan dalam kehidupan sehari-hari.`
        ],
        'HAFALAN DOA HARIAN': [
            `Siswa mampu menghafalkan doa ${topic} dengan lancar. Praktek dilakukan dengan baik.`,
            `Pembelajaran doa ${topic} berjalan lancar. Siswa memahami adab dan waktu membaca doa.`
        ],
        'HAFALAN DOA SHOLAT': [
            `Siswa berlatih bacaan ${topic} dengan semangat. Beberapa perlu bimbingan tambahan.`,
            `Hafalan bacaan sholat ${topic} berjalan baik. Siswa mampu mempraktekkan dengan benar.`
        ],
        'BAHASA ARAB': [
            `Siswa antusias belajar bahasa Arab tentang ${topic}. Kosakata baru dikuasai dengan baik.`,
            `Pembelajaran ${topic} berjalan lancar. Siswa aktif dalam percakapan sederhana.`
        ],
        'BAHASA INGGRIS': [
            `Students are enthusiastic learning about ${topic}. Good progress in vocabulary.`,
            `English lesson about ${topic} went well. Students participated actively.`
        ],
        'MATEMATIKA': [
            `Pembelajaran ${topic} tercapai dengan baik. Siswa mampu mengerjakan soal-soal latihan.`,
            `Siswa aktif dalam pembelajaran ${topic}. Beberapa perlu bimbingan tambahan.`
        ],
        'IPAS': [
            `Siswa antusias mengikuti pembelajaran ${topic}. Diskusi berjalan aktif dan menarik.`,
            `Eksplorasi materi ${topic} berjalan baik. Siswa mampu memahami konsep dasar.`
        ],
        'BAHASA INDONESIA': [
            `Pembelajaran ${topic} berjalan lancar. Siswa aktif dalam kegiatan membaca dan menulis.`,
            `Siswa menunjukkan kemajuan dalam ${topic}. Kreativitas dalam menulis berkembang.`
        ],
        'PKN': [
            `Diskusi tentang ${topic} berjalan aktif. Siswa memahami nilai-nilai yang diajarkan.`,
            `Pembelajaran ${topic} tercapai. Siswa mampu menerapkan dalam kehidupan sehari-hari.`
        ],
        'PJOK': [
            `Siswa aktif dalam kegiatan ${topic}. Semangat dan sportivitas terlihat dengan baik.`,
            `Pembelajaran ${topic} berjalan lancar. Siswa menikmati aktivitas olahraga.`
        ],
        'SENI BUDAYA': [
            `Siswa kreatif dalam pembelajaran ${topic}. Hasil karya menunjukkan perkembangan baik.`,
            `Kegiatan ${topic} berjalan menyenangkan. Siswa antusias mengekspresikan kreativitas.`
        ],
        'PRAKTEK AQIDAH DAN AKHLAQ': [
            `Pembelajaran ${topic} berjalan baik. Siswa memahami dan mempraktekkan adab dengan benar.`,
            `Siswa aktif dalam diskusi ${topic}. Pemahaman akhlak mulia semakin berkembang.`
        ],
        'AKHLAQ': [
            `Siswa memahami materi akhlak tentang ${topic} dengan baik.`,
            `Pembelajaran ${topic} berjalan lancar. Siswa menunjukkan sikap positif.`,
            `Diskusi tentang ${topic} sangat aktif. Siswa mampu mengaitkan dengan kehidupan sehari-hari.`
        ],
        'NAHWU': [
            `Siswa memahami kaidah nahwu tentang ${topic} dengan baik.`,
            `Pembelajaran ${topic} berjalan lancar. Beberapa siswa perlu latihan tambahan.`,
            `Latihan i'rab tentang ${topic} menunjukkan kemajuan. Siswa mulai mampu menganalisis kalimat sederhana.`
        ],
        'BELAJAR HURUF ABJAD': [
            `Siswa antusias mengenal huruf ${topic}. Kemampuan membaca dan menulis berkembang.`,
            `Pembelajaran huruf ${topic} berjalan menyenangkan. Siswa aktif dalam permainan edukatif.`
        ],
        'BELAJAR ANGKA': [
            `Siswa mampu mengenal dan menulis angka ${topic} dengan baik.`,
            `Pembelajaran angka ${topic} berjalan lancar. Siswa menikmati kegiatan berhitung.`
        ],
        'LAINNYA': [
            `Siswa mengikuti pembelajaran ${topic} dengan antusias dan aktif.`,
            `Pembelajaran ${topic} berjalan lancar. Siswa menunjukkan pemahaman yang baik.`,
            `Kegiatan ${topic} tercapai dengan baik. Siswa berpartisipasi aktif.`
        ]
    };

    // Pilih template secara random
    const activities = activityTemplates[subject] || [`Pembelajaran ${topic} dengan metode interaktif dan menyenangkan`];
    const notes = notesTemplates[subject] || [`Siswa ${className} mengikuti pembelajaran ${topic} dengan antusias dan aktif.`];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const randomNotes = notes[Math.floor(Math.random() * notes.length)];
    
    document.getElementById('journal-activity').value = randomActivity;
    document.getElementById('journal-notes').value = randomNotes;
}

// Setup event listeners untuk auto-generate
function setupJournalAutoGenerate() {
    const topicInput = document.getElementById('journal-topic');
    const subjectSelect = document.getElementById('journal-subject');
    
    if (topicInput) {
        topicInput.addEventListener('input', generateJournalContent);
        topicInput.addEventListener('change', generateJournalContent);
    }
    
    if (subjectSelect) {
        subjectSelect.addEventListener('change', generateJournalContent);
    }
}

async function saveJournal() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const teacher = document.getElementById('journal-teacher').value;
    const date = document.getElementById('journal-date').value;
    const className = document.getElementById('journal-class').value;
    const subject = document.getElementById('journal-subject').value;
    const topic = document.getElementById('journal-topic').value;
    const activity = document.getElementById('journal-activity').value;
    const notes = document.getElementById('journal-notes').value;

    if (!teacher || !date || !className || !subject || !topic) {
        showToast('Lengkapi semua field yang wajib (*)', 'error');
        return;
    }

    const record = {
        id: `journal_${Date.now()}`,
        type: 'journal',
        teacher_name: teacher,
        date: date,
        class_name: className,
        subject: subject,
        topic: topic,
        activity: activity || `Pembelajaran ${topic}`,
        notes: notes || '',
        created_at: new Date().toISOString()
    };

    try {
        await createRecord(record);
        allData.push(record);
        showToast('Jurnal berhasil disimpan', 'success');
        
        document.getElementById('journal-topic').value = '';
        document.getElementById('journal-activity').value = '';
        document.getElementById('journal-notes').value = '';
        loadDashboard();
    } catch (error) {
        showToast('Gagal menyimpan jurnal: ' + error.message, 'error');
    }
}

// =====================================================
// NILAI (GRADES) FUNCTIONS
// =====================================================

async function saveNilai() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const className = document.getElementById('nilai-class').value;
    const studentName = document.getElementById('nilai-student').value;
    const subject = document.getElementById('nilai-subject').value;
    const nilaiType = document.getElementById('nilai-type').value;
    const score = document.getElementById('nilai-score').value;
    const date = document.getElementById('nilai-date').value;
    const notes = document.getElementById('nilai-notes').value;

    if (!className || !studentName || !subject || !nilaiType || !score || !date) {
        showToast('Lengkapi semua field yang wajib (*)', 'error');
        return;
    }

    const record = {
        id: `nilai_${Date.now()}`,
        type: 'nilai',
        class_name: className,
        student_name: studentName,
        subject: subject,
        nilai_type: nilaiType,
        score: parseInt(score),
        date: date,
        notes: notes || '',
        created_at: new Date().toISOString()
    };

    try {
        await createRecord(record);
        allData.push(record);
        showToast('Nilai berhasil disimpan', 'success');
        
        document.getElementById('nilai-score').value = '';
        document.getElementById('nilai-notes').value = '';
        loadNilaiList();
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

function loadNilaiList() {
    const classFilter = document.getElementById('filter-nilai-class').value;
    const subjectFilter = document.getElementById('filter-nilai-subject').value;
    
    let nilaiData = allData.filter(d => d.type === 'nilai');
    
    if (classFilter) nilaiData = nilaiData.filter(n => n.class_name === classFilter);
    if (subjectFilter) nilaiData = nilaiData.filter(n => n.subject === subjectFilter);

    const listContainer = document.getElementById('nilai-list');

    if (nilaiData.length === 0) {
        listContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Tidak ada data nilai</p>';
        return;
    }

    let html = '<table class="w-full border border-gray-200 rounded-lg">';
    html += '<thead class="bg-purple-50"><tr>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Siswa</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kelas</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mapel</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jenis</th>';
    html += '<th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Nilai</th>';
    html += '</tr></thead><tbody class="bg-white divide-y divide-gray-200">';

    nilaiData.forEach((nilai, index) => {
        const scoreColor = nilai.score >= 80 ? 'text-green-600' : nilai.score >= 60 ? 'text-yellow-600' : 'text-red-600';
        html += `<tr class="hover:bg-gray-50">`;
        html += `<td class="px-4 py-3 text-sm">${index + 1}</td>`;
        html += `<td class="px-4 py-3 text-sm">${formatDate(nilai.date)}</td>`;
        html += `<td class="px-4 py-3 text-sm font-semibold">${nilai.student_name}</td>`;
        html += `<td class="px-4 py-3 text-sm">${nilai.class_name}</td>`;
        html += `<td class="px-4 py-3 text-sm">${nilai.subject}</td>`;
        html += `<td class="px-4 py-3 text-sm">${nilai.nilai_type}</td>`;
        html += `<td class="px-4 py-3 text-center font-bold text-lg ${scoreColor}">${nilai.score}</td>`;
        html += `</tr>`;
    });

    html += '</tbody></table>';
    listContainer.innerHTML = html;
}

function downloadNilaiReport() {
    const classFilter = document.getElementById('filter-nilai-class').value;
    const subjectFilter = document.getElementById('filter-nilai-subject').value;
    
    let nilaiData = allData.filter(d => d.type === 'nilai');
    if (classFilter) nilaiData = nilaiData.filter(n => n.class_name === classFilter);
    if (subjectFilter) nilaiData = nilaiData.filter(n => n.subject === subjectFilter);

    if (nilaiData.length === 0) {
        showToast('Tidak ada data untuk diunduh', 'error');
        return;
    }

    let excelContent = `<html><head><meta charset="utf-8"></head><body><table border="1">
        <tr><th>No</th><th>Tanggal</th><th>Siswa</th><th>Kelas</th><th>Mapel</th><th>Jenis</th><th>Nilai</th></tr>
        ${nilaiData.map((n, i) => `<tr><td>${i+1}</td><td>${formatDate(n.date)}</td><td>${n.student_name}</td><td>${n.class_name}</td><td>${n.subject}</td><td>${n.nilai_type}</td><td>${n.score}</td></tr>`).join('')}
    </table></body></html>`;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rekap_nilai_${Date.now()}.xls`;
    link.click();
    showToast('Rekap nilai berhasil diunduh', 'success');
}

// =====================================================
// JADWAL (SCHEDULE) FUNCTIONS
// =====================================================

async function saveJadwal() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const className = document.getElementById('jadwal-class').value;
    const day = document.getElementById('jadwal-day').value;
    const time = document.getElementById('jadwal-time').value;
    const subject = document.getElementById('jadwal-subject').value;
    const teacher = document.getElementById('jadwal-teacher').value;
    const room = document.getElementById('jadwal-room').value;

    if (!className || !day || !time || !subject || !teacher) {
        showToast('Lengkapi semua field yang wajib (*)', 'error');
        return;
    }

    const record = {
        id: `jadwal_${Date.now()}`,
        type: 'jadwal',
        class_name: className,
        day: day,
        time: time,
        subject: subject,
        teacher_name: teacher,
        room: room || '',
        created_at: new Date().toISOString()
    };

    try {
        await createRecord(record);
        allData.push(record);
        showToast('Jadwal berhasil disimpan', 'success');
        
        document.getElementById('jadwal-room').value = '';
        loadJadwalView();
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

function loadJadwalView() {
    const className = document.getElementById('view-jadwal-class').value;
    const container = document.getElementById('jadwal-view');

    if (!className) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">Pilih kelas untuk melihat jadwal</p>';
        return;
    }

    const jadwalData = allData.filter(d => d.type === 'jadwal' && d.class_name === className);
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const times = ['07:00-07:45', '07:45-08:30', '08:30-09:15', '09:30-10:15', '10:15-11:00', '11:00-11:45'];

    let html = '<table class="w-full border border-gray-200 rounded-lg">';
    html += '<thead class="bg-cyan-50"><tr><th class="px-2 py-2 text-sm border">Jam</th>';
    days.forEach(day => {
        html += `<th class="px-2 py-2 text-sm border">${day}</th>`;
    });
    html += '</tr></thead><tbody>';

    times.forEach(time => {
        html += `<tr><td class="px-2 py-2 text-xs font-semibold border bg-gray-50">${time}</td>`;
        days.forEach(day => {
            const slot = jadwalData.find(j => j.day === day && j.time === time);
            if (slot) {
                html += `<td class="px-2 py-2 text-xs border bg-blue-50">
                    <div class="font-semibold text-blue-800">${slot.subject}</div>
                    <div class="text-gray-600">${slot.teacher_name}</div>
                    ${slot.room ? `<div class="text-gray-400">${slot.room}</div>` : ''}
                </td>`;
            } else {
                html += `<td class="px-2 py-2 text-xs border text-gray-400 text-center">-</td>`;
            }
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// =====================================================
// KALENDER (CALENDAR) FUNCTIONS
// =====================================================

async function saveEvent() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const name = document.getElementById('event-name').value;
    const startDate = document.getElementById('event-start').value;
    const endDate = document.getElementById('event-end').value;
    const category = document.getElementById('event-category').value;
    const description = document.getElementById('event-description').value;

    if (!name || !startDate || !category) {
        showToast('Lengkapi semua field yang wajib (*)', 'error');
        return;
    }

    const record = {
        id: `event_${Date.now()}`,
        type: 'event',
        name: name,
        start_date: startDate,
        end_date: endDate || startDate,
        category: category,
        description: description || '',
        created_at: new Date().toISOString()
    };

    try {
        await createRecord(record);
        allData.push(record);
        showToast('Event berhasil disimpan', 'success');
        
        document.getElementById('event-name').value = '';
        document.getElementById('event-description').value = '';
        renderCalendar();
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    renderCalendar();
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    document.getElementById('calendar-month-year').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const events = allData.filter(d => d.type === 'event');
    
    let html = '<div class="grid grid-cols-7 gap-1">';
    
    // Day headers
    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach(day => {
        html += `<div class="text-center font-semibold text-gray-600 py-2">${day}</div>`;
    });
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="p-2"></div>';
    }
    
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.start_date <= dateStr && e.end_date >= dateStr);
        
        const isToday = dateStr === new Date().toISOString().split('T')[0];
        const todayClass = isToday ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-gray-100';
        
        html += `<div class="calendar-day ${todayClass} rounded-lg p-2 min-h-20 border border-gray-200">
            <div class="font-semibold ${isToday ? '' : 'text-gray-800'}">${day}</div>`;
        
        dayEvents.slice(0, 2).forEach(event => {
            const categoryColors = {
                'Ujian': 'bg-red-100 text-red-800',
                'Libur': 'bg-green-100 text-green-800',
                'Kegiatan': 'bg-blue-100 text-blue-800',
                'Rapat': 'bg-purple-100 text-purple-800',
                'Lainnya': 'bg-gray-100 text-gray-800'
            };
            html += `<div class="calendar-event ${categoryColors[event.category] || 'bg-gray-100'} truncate" title="${event.name}">${event.name}</div>`;
        });
        
        if (dayEvents.length > 2) {
            html += `<div class="text-xs text-gray-500">+${dayEvents.length - 2} lagi</div>`;
        }
        
        html += '</div>';
    }
    
    html += '</div>';
    document.getElementById('calendar-view').innerHTML = html;
    
    // Update upcoming events
    updateUpcomingEvents();
}

function updateUpcomingEvents() {
    const today = new Date().toISOString().split('T')[0];
    const events = allData
        .filter(d => d.type === 'event' && d.start_date >= today)
        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
        .slice(0, 5);
    
    const container = document.getElementById('upcoming-events');
    
    if (events.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Tidak ada event mendatang</p>';
        return;
    }
    
    const categoryIcons = {
        'Ujian': '📝',
        'Libur': '🏖️',
        'Kegiatan': '🎉',
        'Rapat': '👥',
        'Lainnya': '📌'
    };
    
    container.innerHTML = events.map(event => `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div class="text-2xl">${categoryIcons[event.category] || '📌'}</div>
            <div class="flex-1">
                <div class="font-semibold text-gray-800">${event.name}</div>
                <div class="text-sm text-gray-600">${formatDate(event.start_date)}${event.end_date !== event.start_date ? ' - ' + formatDate(event.end_date) : ''}</div>
            </div>
            <span class="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">${event.category}</span>
        </div>
    `).join('');
}

// =====================================================
// REPORT FUNCTIONS
// =====================================================

function generateReport() {
    const teacher = document.getElementById('report-teacher').value;
    const className = document.getElementById('report-class').value;
    const month = document.getElementById('report-month').value;
    const reportType = document.getElementById('report-type').value;

    if (!className || !month || !reportType) {
        showToast('Lengkapi kelas, bulan, dan jenis laporan', 'error');
        return;
    }

    let filteredData = allData.filter(item => {
        const itemDate = new Date(item.date || item.created_at);
        const itemMonth = itemDate.toISOString().substring(0, 7);

        let typeMatch = false;
        if (reportType === 'Absensi') {
            typeMatch = item.type === 'teacher_attendance' || item.type === 'student_attendance';
        } else if (reportType === 'Jurnal Mengajar') {
            typeMatch = item.type === 'journal';
        } else if (reportType === 'Laporan Kegiatan') {
            typeMatch = item.type === 'activity' || item.type === 'daily_report';
        } else if (reportType === 'Nilai') {
            typeMatch = item.type === 'nilai';
        }

        const classMatch = item.class_name === className;
        const monthMatch = itemMonth === month;
        const teacherMatch = !teacher || item.teacher_name === teacher;

        return typeMatch && classMatch && monthMatch && teacherMatch;
    });

    currentReport = filteredData;
    updateReportDisplay();

    if (filteredData.length === 0) {
        showToast('Tidak ada data untuk laporan ini', 'error');
    } else {
        showToast(`${filteredData.length} data ditemukan`, 'success');
    }
}

function updateReportDisplay() {
    const display = document.getElementById('report-display');
    if (!display) return;

    if (currentReport.length === 0) {
        display.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada laporan</p>';
        return;
    }

    const html = `
        <div class="border border-gray-200 rounded-lg overflow-hidden">
            <table class="w-full">
                <thead class="bg-indigo-50">
                    <tr>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kelas</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Detail</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${currentReport.map((item, index) => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-700">${index + 1}</td>
                            <td class="px-4 py-3 text-sm text-gray-700">${formatDate(item.date || item.created_at)}</td>
                            <td class="px-4 py-3 text-sm text-gray-700">${item.teacher_name || item.student_name || '-'}</td>
                            <td class="px-4 py-3 text-sm text-gray-700">${item.class_name || '-'}</td>
                            <td class="px-4 py-3 text-sm text-gray-700">${getDetailText(item)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <p class="mt-4 text-sm text-gray-600">Total: ${currentReport.length} data</p>
    `;

    display.innerHTML = html;
}

function getDetailText(item) {
    if (item.type === 'journal') return `${item.subject || ''} - ${item.topic || ''}`;
    if (item.type === 'teacher_attendance' || item.type === 'student_attendance') return item.status || 'Hadir';
    if (item.type === 'daily_report') return `${item.topic || ''} (${item.result || ''})`;
    if (item.type === 'activity') return `${item.category || ''} - ${item.rating || ''}`;
    if (item.type === 'nilai') return `${item.subject || ''} - ${item.score || 0}`;
    return '-';
}

function downloadReport() {
    if (currentReport.length === 0) {
        showToast('Tidak ada data untuk diunduh', 'error');
        return;
    }

    let excelContent = `<html><head><meta charset="utf-8"></head><body><table border="1">
        <tr><th>No</th><th>Tanggal</th><th>Nama</th><th>Kelas</th><th>Detail</th></tr>
        ${currentReport.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${formatDate(item.date || item.created_at)}</td>
                <td>${item.teacher_name || item.student_name || '-'}</td>
                <td>${item.class_name || '-'}</td>
                <td>${getDetailText(item)}</td>
            </tr>
        `).join('')}
    </table></body></html>`;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `laporan_${Date.now()}.xls`;
    link.click();
    showToast('Laporan Excel berhasil diunduh', 'success');
}

async function deleteReportData() {
    if (currentReport.length === 0) {
        showToast('Tidak ada data untuk dihapus', 'error');
        return;
    }

    const btn = document.getElementById('delete-btn');
    const confirmDelete = btn.getAttribute('data-confirm') === 'true';

    if (!confirmDelete) {
        btn.setAttribute('data-confirm', 'true');
        btn.innerHTML = '⚠️ Konfirmasi?';
        btn.className = 'bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700';
        
        setTimeout(() => {
            btn.setAttribute('data-confirm', 'false');
            btn.innerHTML = '🗑️ Hapus Data';
            btn.className = 'bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700';
        }, 3000);
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<div class="loading-spinner"></div>';

    let deleteCount = 0;
    for (const item of currentReport) {
        try {
            await deleteRecord(item);
            const index = allData.findIndex(d => d.id === item.id);
            if (index > -1) allData.splice(index, 1);
            deleteCount++;
        } catch (error) {
            console.error('Delete error:', error);
        }
    }

    btn.disabled = false;
    btn.innerHTML = '🗑️ Hapus Data';
    btn.setAttribute('data-confirm', 'false');
    btn.className = 'bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700';

    if (deleteCount > 0) {
        showToast(`${deleteCount} data berhasil dihapus`, 'success');
        currentReport = [];
        updateReportDisplay();
    }
}

// =====================================================
// DAILY REPORT & ACTIVITY FUNCTIONS
// =====================================================

async function saveDailyReport() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const className = document.getElementById('daily-class').value;
    const studentName = document.getElementById('daily-student').value;
    const date = document.getElementById('daily-date').value;
    const topic = document.getElementById('daily-topic').value;
    const page = document.getElementById('daily-page').value;
    const result = document.getElementById('daily-result').value;
    const notes = document.getElementById('daily-notes').value;

    if (!className || !studentName || !date || !topic || !result) {
        showToast('Lengkapi semua field yang wajib (*)', 'error');
        return;
    }

    const record = {
        id: `daily_${Date.now()}`,
        type: 'daily_report',
        class_name: className,
        student_name: studentName,
        date: date,
        topic: topic,
        page: page || '',
        result: result,
        notes: notes || '',
        created_at: new Date().toISOString()
    };

    try {
        await createRecord(record);
        allData.push(record);
        showToast('Laporan harian berhasil disimpan', 'success');
        
        document.getElementById('daily-topic').value = '';
        document.getElementById('daily-page').value = '';
        document.getElementById('daily-result').value = '';
        document.getElementById('daily-notes').value = '';
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

async function saveActivityReport() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const className = document.getElementById('activity-class').value;
    const studentName = document.getElementById('activity-student').value;
    const date = document.getElementById('activity-date').value;
    const category = document.getElementById('activity-category').value;
    const rating = document.getElementById('activity-rating').value;
    const description = document.getElementById('activity-description').value;

    if (!className || !studentName || !date || !category || !rating || !description) {
        showToast('Lengkapi semua field yang wajib (*)', 'error');
        return;
    }

    const record = {
        id: `activity_${Date.now()}`,
        type: 'activity',
        class_name: className,
        student_name: studentName,
        date: date,
        category: category,
        rating: rating,
        description: description,
        created_at: new Date().toISOString()
    };

    try {
        await createRecord(record);
        allData.push(record);
        showToast('Laporan kegiatan berhasil disimpan', 'success');
        
        document.getElementById('activity-category').value = '';
        document.getElementById('activity-rating').value = '';
        document.getElementById('activity-description').value = '';
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

async function saveTarget() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const className = document.getElementById('target-class').value;
    const studentName = document.getElementById('target-student').value;
    const category = document.getElementById('target-category').value;
    const progress = document.getElementById('target-progress').value;
    const notes = document.getElementById('target-notes').value;

    if (!className || !studentName || !category || !progress) {
        showToast('Lengkapi semua field yang wajib (*)', 'error');
        return;
    }

    const record = {
        id: `target_${Date.now()}`,
        type: 'target',
        class_name: className,
        student_name: studentName,
        category: category,
        progress: progress,
        notes: notes || '',
        created_at: new Date().toISOString()
    };

    try {
        await createRecord(record);
        allData.push(record);
        showToast('Target berhasil disimpan', 'success');
        
        document.getElementById('target-category').value = '';
        document.getElementById('target-progress').value = '';
        document.getElementById('target-notes').value = '';
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

// =====================================================
// WALI PORTAL FUNCTIONS
// =====================================================

function loadStudentProgress() {
    const studentName = document.getElementById('parent-student').value;
    const className = document.getElementById('parent-class').value;

    if (!studentName || !className) {
        document.getElementById('student-progress-detail').innerHTML = '<p class="text-gray-500 text-center py-8">Pilih kelas dan siswa</p>';
        resetWaliCharts();
        return;
    }

    const studentReports = allData.filter(item => 
        item.student_name === studentName && item.class_name === className
    );

    const totalReports = studentReports.filter(r => r.type === 'daily_report').length;
    const passedReports = studentReports.filter(r => r.type === 'daily_report' && r.result === 'Lulus').length;
    const failedReports = studentReports.filter(r => r.type === 'daily_report' && r.result === 'Tidak Lulus').length;
    const activeTargets = studentReports.filter(r => r.type === 'target').length;

    document.getElementById('total-reports').textContent = totalReports;
    document.getElementById('passed-reports').textContent = passedReports;
    document.getElementById('failed-reports').textContent = failedReports;
    document.getElementById('active-targets').textContent = activeTargets;

    // Update 6 grafik
    updateWaliChartKehadiran(studentReports);
    updateWaliChartKelulusan(passedReports, failedReports);
    updateWaliChartNilai(studentReports);
    updateWaliChartTarget(studentReports);
    updateWaliChartAktivitas(studentReports);
    updateWaliChartKategori(studentReports);

    showWaliTab('laporan-harian');
}

// Reset semua grafik wali
function resetWaliCharts() {
    const chartIds = ['wali-chart-kehadiran', 'wali-chart-kelulusan', 'wali-chart-nilai', 
                        'wali-chart-target', 'wali-chart-aktivitas', 'wali-chart-kategori'];
    chartIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<div class="text-center text-gray-400 text-xs w-full">Pilih siswa</div>';
    });
}

// Grafik 1: Kehadiran Bulanan (Bar Chart)
function updateWaliChartKehadiran(reports) {
    const container = document.getElementById('wali-chart-kehadiran');
    const attendance = reports.filter(r => r.type === 'student_attendance');
    
    if (attendance.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 text-xs w-full flex items-center justify-center h-full">Belum ada data kehadiran</div>';
        return;
    }

    const statusCount = {
        'Hadir': attendance.filter(a => a.status === 'Hadir').length,
        'Sakit': attendance.filter(a => a.status === 'Sakit').length,
        'Izin': attendance.filter(a => a.status === 'Izin').length,
        'Alpa': attendance.filter(a => a.status === 'Alpa').length
    };

    const maxVal = Math.max(...Object.values(statusCount), 1);
    const colors = { 'Hadir': '#10b981', 'Sakit': '#f59e0b', 'Izin': '#3b82f6', 'Alpa': '#ef4444' };

    container.innerHTML = Object.entries(statusCount).map(([status, count]) => `
        <div class="flex-1 flex flex-col items-center justify-end h-full">
            <div class="w-full rounded-t transition-all duration-500" style="height: ${(count/maxVal)*100}%; background-color: ${colors[status]}; min-height: ${count > 0 ? '8px' : '0'}"></div>
            <div class="text-xs font-bold mt-1" style="color: ${colors[status]}">${count}</div>
            <div class="text-xs text-gray-500">${status}</div>
        </div>
    `).join('');
}

// Grafik 2: Rasio Kelulusan (Pie Chart)
function updateWaliChartKelulusan(passed, failed) {
    const container = document.getElementById('wali-chart-kelulusan');
    const total = passed + failed;

    if (total === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 text-xs flex items-center justify-center h-full">Belum ada data kelulusan</div>';
        return;
    }

    const passPercent = Math.round((passed / total) * 100);
    const failPercent = 100 - passPercent;

    container.innerHTML = `
        <div class="relative flex flex-col items-center">
            <svg viewBox="0 0 36 36" class="w-20 h-20">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="${failPercent}, 100" stroke-dashoffset="0"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="${passPercent}, 100" stroke-dashoffset="-${failPercent}"/>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-lg font-bold text-green-600">${passPercent}%</span>
            </div>
            <div class="flex gap-3 mt-2 text-xs">
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span>Lulus: ${passed}</span>
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-red-500"></span>Tidak: ${failed}</span>
            </div>
        </div>
    `;
}

// Grafik 3: Nilai per Mapel (Bar Chart)
function updateWaliChartNilai(reports) {
    const container = document.getElementById('wali-chart-nilai');
    const nilaiData = reports.filter(r => r.type === 'nilai');

    if (nilaiData.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 text-xs w-full flex items-center justify-center h-full">Belum ada data nilai</div>';
        return;
    }

    // Hitung rata-rata per mapel
    const mapelScores = {};
    nilaiData.forEach(n => {
        const mapel = n.subject || 'Lainnya';
        if (!mapelScores[mapel]) mapelScores[mapel] = [];
        mapelScores[mapel].push(n.score || 0);
    });

    const avgScores = Object.entries(mapelScores).map(([mapel, scores]) => ({
        mapel: mapel.substring(0, 6),
        fullMapel: mapel,
        avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    })).slice(0, 5);

    const maxVal = 100;
    const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

    container.innerHTML = avgScores.map((item, i) => `
        <div class="flex-1 flex flex-col items-center justify-end h-full" title="${item.fullMapel}: ${item.avg}">
            <div class="w-full rounded-t transition-all duration-500" style="height: ${(item.avg/maxVal)*100}%; background-color: ${colors[i % colors.length]}; min-height: 4px"></div>
            <div class="text-xs font-bold mt-1" style="color: ${colors[i % colors.length]}">${item.avg}</div>
            <div class="text-xs text-gray-500 truncate w-full text-center">${item.mapel}</div>
        </div>
    `).join('');
}

// Grafik 4: Progress Target (Progress Bars)
function updateWaliChartTarget(reports) {
    const container = document.getElementById('wali-chart-target');
    const targets = reports.filter(r => r.type === 'target');

    if (targets.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 text-xs w-full flex items-center justify-center h-full">Belum ada target</div>';
        return;
    }

    // Ambil 4 target terbaru
    const latestTargets = targets.slice(-4);
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    container.innerHTML = latestTargets.map((t, i) => {
        // Parse progress seperti "5/10" atau "50%"
        let percent = 0;
        const progress = t.progress || '0';
        if (progress.includes('/')) {
            const [cur, total] = progress.split('/').map(Number);
            percent = total > 0 ? Math.round((cur / total) * 100) : 0;
        } else if (progress.includes('%')) {
            percent = parseInt(progress) || 0;
        } else {
            percent = parseInt(progress) || 0;
        }
        percent = Math.min(Math.max(percent, 0), 100);

        return `
            <div class="flex-1 flex flex-col items-center justify-end h-full" title="${t.category}: ${t.progress}">
                <div class="w-full rounded-t transition-all duration-500 relative" style="height: 100%; background: linear-gradient(to top, ${colors[i % colors.length]} ${percent}%, #e5e7eb ${percent}%)"></div>
                <div class="text-xs font-bold mt-1" style="color: ${colors[i % colors.length]}">${percent}%</div>
                <div class="text-xs text-gray-500 truncate w-full text-center">${(t.category || '').substring(0, 5)}</div>
            </div>
        `;
    }).join('');
}

// Grafik 5: Aktivitas Mingguan (Bar Chart untuk 7 hari terakhir)
function updateWaliChartAktivitas(reports) {
    const container = document.getElementById('wali-chart-aktivitas');
    
    // Hitung aktivitas per hari dalam 7 hari terakhir
    const days = [];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push({
            date: date.toISOString().split('T')[0],
            dayName: dayNames[date.getDay()]
        });
    }

    const activityByDay = days.map(d => {
        const count = reports.filter(r => 
            (r.type === 'daily_report' || r.type === 'activity') && 
            r.date === d.date
        ).length;
        return { ...d, count };
    });

    const maxVal = Math.max(...activityByDay.map(d => d.count), 1);
    const hasData = activityByDay.some(d => d.count > 0);

    if (!hasData) {
        container.innerHTML = '<div class="text-center text-gray-400 text-xs w-full flex items-center justify-center h-full">Belum ada aktivitas minggu ini</div>';
        return;
    }

    container.innerHTML = activityByDay.map(d => `
        <div class="flex-1 flex flex-col items-center justify-end h-full">
            <div class="w-full bg-cyan-500 rounded-t transition-all duration-500" style="height: ${(d.count/maxVal)*100}%; min-height: ${d.count > 0 ? '4px' : '0'}"></div>
            <div class="text-xs font-bold text-cyan-700 mt-1">${d.count}</div>
            <div class="text-xs text-gray-500">${d.dayName}</div>
        </div>
    `).join('');
}

// Grafik 6: Kategori Kegiatan (Horizontal Bar)
function updateWaliChartKategori(reports) {
    const container = document.getElementById('wali-chart-kategori');
    const activities = reports.filter(r => r.type === 'activity' || r.type === 'daily_report');

    if (activities.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 text-xs w-full flex items-center justify-center h-full">Belum ada kegiatan</div>';
        return;
    }

    // Hitung per kategori
    const categoryCount = {};
    activities.forEach(a => {
        const cat = a.category || a.topic || 'Lainnya';
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    const topCategories = Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const maxVal = Math.max(...topCategories.map(c => c[1]), 1);
    const colors = ['#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#3b82f6'];

    container.innerHTML = topCategories.map(([cat, count], i) => `
        <div class="flex-1 flex flex-col items-center justify-end h-full" title="${cat}: ${count}">
            <div class="w-full rounded-t transition-all duration-500" style="height: ${(count/maxVal)*100}%; background-color: ${colors[i % colors.length]}; min-height: 4px"></div>
            <div class="text-xs font-bold mt-1" style="color: ${colors[i % colors.length]}">${count}</div>
            <div class="text-xs text-gray-500 truncate w-full text-center">${cat.substring(0, 5)}</div>
        </div>
    `).join('');
}

function showWaliTab(tab) {
    const studentName = document.getElementById('parent-student').value;
    const className = document.getElementById('parent-class').value;

    if (!studentName || !className) return;

    ['laporan-harian', 'laporan-kegiatan', 'nilai', 'target', 'absensi'].forEach(t => {
        const btn = document.getElementById(`wali-tab-${t}`);
        if (btn) {
            btn.className = t === tab 
                ? 'px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold whitespace-nowrap'
                : 'px-4 py-2 rounded-lg bg-gray-200 text-gray-700 whitespace-nowrap hover:bg-gray-300';
        }
    });

    const studentReports = allData.filter(item => 
        item.student_name === studentName && item.class_name === className
    );

    let detailHtml = '<div class="space-y-4">';

    if (tab === 'laporan-harian') {
        const dailyReports = studentReports.filter(r => r.type === 'daily_report').slice(0, 10);
        detailHtml += '<h3 class="text-lg font-semibold text-gray-800 mb-3">📝 Laporan Harian Terbaru</h3>';
        if (dailyReports.length > 0) {
            dailyReports.forEach(report => {
                const resultColor = report.result === 'Lulus' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
                detailHtml += `
                    <div class="border rounded-lg p-4 ${resultColor}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="font-semibold text-gray-800">${report.topic || '-'}</div>
                            <div class="text-sm text-gray-500">${formatDate(report.date)}</div>
                        </div>
                        <div class="text-sm text-gray-600">
                            <div><span class="font-medium">Hasil:</span> <span class="font-bold">${report.result}</span></div>
                            ${report.notes ? `<div><span class="font-medium">Catatan:</span> ${report.notes}</div>` : ''}
                        </div>
                    </div>`;
            });
        } else {
            detailHtml += '<p class="text-gray-500 text-center py-8">Belum ada laporan harian</p>';
        }
    } else if (tab === 'nilai') {
        const nilaiReports = studentReports.filter(r => r.type === 'nilai').slice(0, 10);
        detailHtml += '<h3 class="text-lg font-semibold text-gray-800 mb-3">📊 Nilai Terbaru</h3>';
        if (nilaiReports.length > 0) {
            nilaiReports.forEach(report => {
                const scoreColor = report.score >= 80 ? 'bg-green-50 border-green-200' : report.score >= 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
                detailHtml += `
                    <div class="border rounded-lg p-4 ${scoreColor}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="font-semibold text-gray-800">${report.subject || '-'}</div>
                            <div class="text-3xl font-bold ${report.score >= 80 ? 'text-green-600' : report.score >= 60 ? 'text-yellow-600' : 'text-red-600'}">${report.score}</div>
                        </div>
                        <div class="text-sm text-gray-600">
                            <div><span class="font-medium">Jenis:</span> ${report.nilai_type}</div>
                            <div><span class="font-medium">Tanggal:</span> ${formatDate(report.date)}</div>
                        </div>
                    </div>`;
            });
        } else {
            detailHtml += '<p class="text-gray-500 text-center py-8">Belum ada data nilai</p>';
        }
    } else if (tab === 'laporan-kegiatan') {
        const activityReports = studentReports.filter(r => r.type === 'activity').slice(0, 10);
        detailHtml += '<h3 class="text-lg font-semibold text-gray-800 mb-3">🎯 Laporan Kegiatan</h3>';
        if (activityReports.length > 0) {
            activityReports.forEach(report => {
                detailHtml += `
                    <div class="border border-purple-200 bg-purple-50 rounded-lg p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div class="font-semibold text-gray-800">${report.category || '-'}</div>
                            <div class="text-sm text-gray-500">${formatDate(report.date)}</div>
                        </div>
                        <div class="text-sm text-gray-600">
                            <div><span class="font-medium">Penilaian:</span> ${report.rating}</div>
                            <div><span class="font-medium">Deskripsi:</span> ${report.description}</div>
                        </div>
                    </div>`;
            });
        } else {
            detailHtml += '<p class="text-gray-500 text-center py-8">Belum ada laporan kegiatan</p>';
        }
    } else if (tab === 'target') {
        const targetReports = studentReports.filter(r => r.type === 'target');
        detailHtml += '<h3 class="text-lg font-semibold text-gray-800 mb-3">🎯 Target Pencapaian</h3>';
        if (targetReports.length > 0) {
            targetReports.forEach(report => {
                detailHtml += `
                    <div class="border border-blue-200 bg-blue-50 rounded-lg p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div class="font-semibold text-gray-800">${report.category || '-'}</div>
                            <div class="text-sm text-gray-500">${formatDate(report.created_at)}</div>
                        </div>
                        <div class="text-sm text-gray-600">
                            <div><span class="font-medium">Progress:</span> <span class="font-bold text-blue-700">${report.progress}</span></div>
                            ${report.notes ? `<div><span class="font-medium">Catatan:</span> ${report.notes}</div>` : ''}
                        </div>
                    </div>`;
            });
        } else {
            detailHtml += '<p class="text-gray-500 text-center py-8">Belum ada target</p>';
        }
    } else if (tab === 'absensi') {
        const attendanceReports = studentReports.filter(r => r.type === 'student_attendance').slice(0, 20);
        detailHtml += '<h3 class="text-lg font-semibold text-gray-800 mb-3">📋 Riwayat Absensi</h3>';
        if (attendanceReports.length === 0) {
            detailHtml += '<p class="text-gray-500 text-center py-8">Belum ada data absensi</p>';
        } else {
            detailHtml += '<div class="grid grid-cols-2 md:grid-cols-4 gap-3">';
            attendanceReports.forEach(report => {
                const statusColors = {
                    'Hadir': 'bg-green-100 border-green-300 text-green-800',
                    'Sakit': 'bg-yellow-100 border-yellow-300 text-yellow-800',
                    'Izin': 'bg-blue-100 border-blue-300 text-blue-800',
                    'Alpa': 'bg-red-100 border-red-300 text-red-800'
                };
                const statusColor = statusColors[report.status] || 'bg-gray-100 border-gray-300 text-gray-800';
                detailHtml += `
                    <div class="border-2 ${statusColor} rounded-lg p-3 text-center">
                        <div class="font-semibold text-lg">${report.status}</div>
                        <div class="text-xs mt-1">${formatDate(report.date)}</div>
                    </div>`;
            });
            detailHtml += '</div>';
        }
    }

    detailHtml += '</div>';
    document.getElementById('student-progress-detail').innerHTML = detailHtml;
}

// =====================================================
// MASTER DATA GURU FUNCTIONS
// =====================================================

async function saveGuru() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const nip = document.getElementById('guru-nip').value.trim();
    const nama = document.getElementById('guru-nama').value.trim();
    const email = document.getElementById('guru-email').value.trim();
    const telepon = document.getElementById('guru-telepon').value.trim();
    const mapel = document.getElementById('guru-mapel').value;
    const status = document.getElementById('guru-status').value;
    const alamat = document.getElementById('guru-alamat').value.trim();

    if (!nip || !nama) {
        showToast('NIP dan Nama wajib diisi', 'error');
        return;
    }

    const existing = teacherData.find(g => g.nip === nip);

    try {
        if (existing) {
            existing.nama = nama;
            existing.email = email;
            existing.telepon = telepon;
            existing.mapel = mapel;
            existing.status = status;
            existing.alamat = alamat;
            await updateRecord(existing);
            showToast('Data guru berhasil diperbarui', 'success');
        } else {
            const record = {
                id: `guru_${nip}_${Date.now()}`,
                type: 'master_guru',
                nip: nip,
                nama: nama,
                email: email,
                telepon: telepon,
                mapel: mapel,
                status: status,
                alamat: alamat,
                created_at: new Date().toISOString()
            };
            await createRecord(record);
            allData.push(record);
            teacherData.push(record);
            showToast('Data guru berhasil ditambahkan', 'success');
        }
        
        clearGuruForm();
        loadGuruList();
        populateTeacherDropdowns();
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

function clearGuruForm() {
    document.getElementById('guru-nip').value = '';
    document.getElementById('guru-nama').value = '';
    document.getElementById('guru-email').value = '';
    document.getElementById('guru-telepon').value = '';
    document.getElementById('guru-mapel').value = '';
    document.getElementById('guru-status').value = 'Aktif';
    document.getElementById('guru-alamat').value = '';
}

function loadGuruList() {
    const listContainer = document.getElementById('guru-list');
    const countEl = document.getElementById('guru-count');
    
    if (teacherData.length === 0) {
        listContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada data guru.</p>';
        countEl.textContent = '0';
        return;
    }

    countEl.textContent = teacherData.length;

    let html = '<div class="overflow-x-auto"><table class="w-full border border-gray-200 rounded-lg">';
    html += '<thead class="bg-indigo-50"><tr>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">NIP</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mapel</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>';
    html += '<th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>';
    html += '</tr></thead><tbody class="bg-white divide-y divide-gray-200">';

    teacherData.forEach(guru => {
        const statusClass = guru.status === 'Aktif' ? 'bg-green-100 text-green-800' : 
                           guru.status === 'Cuti' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
        
        html += `<tr class="hover:bg-gray-50 guru-row" data-nama="${(guru.nama || '').toLowerCase()}" data-nip="${guru.nip || ''}">`;
        html += `<td class="px-4 py-3 text-sm font-mono">${guru.nip || '-'}</td>`;
        html += `<td class="px-4 py-3 text-sm font-semibold">${guru.nama || '-'}</td>`;
        html += `<td class="px-4 py-3 text-sm">${guru.mapel || '-'}</td>`;
        html += `<td class="px-4 py-3"><span class="px-2 py-1 rounded-full text-xs font-semibold ${statusClass}">${guru.status || 'Aktif'}</span></td>`;
        html += `<td class="px-4 py-3 text-center">
            <button onclick="editGuru('${guru.nip}')" class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 mr-1">✏️</button>
            <button onclick="deleteGuru('${guru.id}')" class="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">🗑️</button>
        </td>`;
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    listContainer.innerHTML = html;
}

function filterGuruList() {
    const search = document.getElementById('guru-search').value.toLowerCase();
    const rows = document.querySelectorAll('.guru-row');
    
    rows.forEach(row => {
        const nama = row.getAttribute('data-nama');
        const nip = row.getAttribute('data-nip');
        row.style.display = (nama.includes(search) || nip.includes(search)) ? '' : 'none';
    });
}

function editGuru(nip) {
    const guru = teacherData.find(g => g.nip === nip);
    if (!guru) return;

    document.getElementById('guru-nip').value = guru.nip || '';
    document.getElementById('guru-nama').value = guru.nama || '';
    document.getElementById('guru-email').value = guru.email || '';
    document.getElementById('guru-telepon').value = guru.telepon || '';
    document.getElementById('guru-mapel').value = guru.mapel || '';
    document.getElementById('guru-status').value = guru.status || 'Aktif';
    document.getElementById('guru-alamat').value = guru.alamat || '';

    document.getElementById('section-master-guru').scrollIntoView({ behavior: 'smooth' });
    showToast('Data guru dimuat untuk diedit', 'info');
}

async function deleteGuru(id) {
    if (!confirm('Yakin ingin menghapus data guru ini?')) return;

    const guru = teacherData.find(g => g.id === id);
    if (!guru) return;

    try {
        await deleteRecord(guru);
        
        const idx1 = allData.findIndex(d => d.id === id);
        if (idx1 > -1) allData.splice(idx1, 1);
        
        const idx2 = teacherData.findIndex(g => g.id === id);
        if (idx2 > -1) teacherData.splice(idx2, 1);

        loadGuruList();
        populateTeacherDropdowns();
        showToast('Data guru berhasil dihapus', 'success');
    } catch (error) {
        showToast('Gagal menghapus: ' + error.message, 'error');
    }
}

function downloadGuruTemplate() {
    const csv = 'NIP,Nama,Email,Telepon,Mapel,Status,Alamat\nT001,Nama Guru,guru@email.com,08123456789,MATEMATIKA,Aktif,Alamat Lengkap';
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'template_guru.csv';
    link.click();
    showToast('Template CSV berhasil diunduh', 'success');
}

async function importGuruCSV() {
    const fileInput = document.getElementById('guru-csv-file');
    if (!fileInput.files.length) {
        showToast('Pilih file CSV terlebih dahulu', 'error');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = async function(e) {
        const text = e.target.result;
        const lines = text.split('\n').filter(l => l.trim());
        
        if (lines.length < 2) {
            showToast('File CSV kosong atau tidak valid', 'error');
            return;
        }

        let importCount = 0;
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            if (cols.length < 2) continue;

            const record = {
                id: `guru_${cols[0]}_${Date.now()}_${i}`,
                type: 'master_guru',
                nip: cols[0] || '',
                nama: cols[1] || '',
                email: cols[2] || '',
                telepon: cols[3] || '',
                mapel: cols[4] || '',
                status: cols[5] || 'Aktif',
                alamat: cols[6] || '',
                created_at: new Date().toISOString()
            };

            try {
                await createRecord(record);
                allData.push(record);
                teacherData.push(record);
                importCount++;
            } catch (error) {
                console.error('Import error:', error);
            }
        }

        fileInput.value = '';
        loadGuruList();
        populateTeacherDropdowns();
        showToast(`${importCount} data guru berhasil diimport`, 'success');
    };

    reader.readAsText(file);
}

// =====================================================
// MASTER DATA SISWA FUNCTIONS
// =====================================================

async function saveSiswa() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const nis = document.getElementById('siswa-nis').value.trim();
    const nama = document.getElementById('siswa-nama').value.trim();
    const kelas = document.getElementById('siswa-kelas').value;

    if (!nis || !nama || !kelas) {
        showToast('NIS, Nama, dan Kelas wajib diisi', 'error');
        return;
    }

    const existing = studentData.find(s => s.nis === nis);

    try {
        if (existing) {
            existing.nama = nama;
            existing.class_name = kelas;
            await updateRecord(existing);
            showToast('Data siswa berhasil diperbarui', 'success');
        } else {
            const record = {
                id: `siswa_${nis}_${Date.now()}`,
                type: 'master_siswa',
                nis: nis,
                nama: nama,
                class_name: kelas,
                created_at: new Date().toISOString()
            };
            await createRecord(record);
            allData.push(record);
            studentData.push(record);
            showToast('Data siswa berhasil ditambahkan', 'success');
        }
        
        clearSiswaForm();
        loadSiswaList();
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

function clearSiswaForm() {
    document.getElementById('siswa-nis').value = '';
    document.getElementById('siswa-nama').value = '';
    document.getElementById('siswa-kelas').value = '';
}

function loadSiswaList() {
    const listContainer = document.getElementById('siswa-list');
    const countEl = document.getElementById('siswa-count');
    
    if (studentData.length === 0) {
        listContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada data siswa.</p>';
        countEl.textContent = '0';
        return;
    }

    countEl.textContent = studentData.length;

    let html = '<div class="overflow-x-auto"><table class="w-full border border-gray-200 rounded-lg">';
    html += '<thead class="bg-green-50"><tr>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">NIS</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kelas</th>';
    html += '<th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>';
    html += '</tr></thead><tbody class="bg-white divide-y divide-gray-200">';

    studentData.forEach((siswa, index) => {
        html += `<tr class="hover:bg-gray-50 siswa-row" data-nama="${(siswa.nama || '').toLowerCase()}" data-nis="${siswa.nis || ''}" data-kelas="${siswa.class_name || ''}">`;
        html += `<td class="px-4 py-3 text-sm">${index + 1}</td>`;
        html += `<td class="px-4 py-3 text-sm font-mono">${siswa.nis || '-'}</td>`;
        html += `<td class="px-4 py-3 text-sm font-semibold">${siswa.nama || '-'}</td>`;
        html += `<td class="px-4 py-3"><span class="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">${siswa.class_name || '-'}</span></td>`;
        html += `<td class="px-4 py-3 text-center">
            <button onclick="editSiswa('${siswa.nis}')" class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 mr-1">✏️</button>
            <button onclick="deleteSiswa('${siswa.id}')" class="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">🗑️</button>
        </td>`;
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    listContainer.innerHTML = html;
}

function filterSiswaList() {
    const search = document.getElementById('siswa-search').value.toLowerCase();
    const kelasFilter = document.getElementById('siswa-filter-kelas').value;
    const rows = document.querySelectorAll('.siswa-row');
    
    rows.forEach(row => {
        const nama = row.getAttribute('data-nama');
        const nis = row.getAttribute('data-nis');
        const kelas = row.getAttribute('data-kelas');
        
        const matchSearch = nama.includes(search) || nis.includes(search);
        const matchKelas = !kelasFilter || kelas === kelasFilter;
        
        row.style.display = (matchSearch && matchKelas) ? '' : 'none';
    });
}

function editSiswa(nis) {
    const siswa = studentData.find(s => s.nis === nis);
    if (!siswa) return;

    document.getElementById('siswa-nis').value = siswa.nis || '';
    document.getElementById('siswa-nama').value = siswa.nama || '';
    document.getElementById('siswa-kelas').value = siswa.class_name || '';

    document.getElementById('section-master-siswa').scrollIntoView({ behavior: 'smooth' });
    showToast('Data siswa dimuat untuk diedit', 'info');
}

async function deleteSiswa(id) {
    if (!confirm('Yakin ingin menghapus data siswa ini?')) return;

    const siswa = studentData.find(s => s.id === id);
    if (!siswa) return;

    try {
        await deleteRecord(siswa);
        
        const idx1 = allData.findIndex(d => d.id === id);
        if (idx1 > -1) allData.splice(idx1, 1);
        
        const idx2 = studentData.findIndex(s => s.id === id);
        if (idx2 > -1) studentData.splice(idx2, 1);

        loadSiswaList();
        showToast('Data siswa berhasil dihapus', 'success');
    } catch (error) {
        showToast('Gagal menghapus: ' + error.message, 'error');
    }
}

function downloadSiswaTemplate() {
    const csv = 'NIS,Nama,Kelas\n201,Nama Siswa,Kelas 5';
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'template_siswa.csv';
    link.click();
    showToast('Template CSV berhasil diunduh', 'success');
}

async function importSiswaCSV() {
    const fileInput = document.getElementById('siswa-csv-file');
    if (!fileInput.files.length) {
        showToast('Pilih file CSV terlebih dahulu', 'error');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = async function(e) {
        const text = e.target.result;
        const lines = text.split('\n').filter(l => l.trim());
        
        if (lines.length < 2) {
            showToast('File CSV kosong atau tidak valid', 'error');
            return;
        }

        let importCount = 0;
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            if (cols.length < 3) continue;

            const record = {
                id: `siswa_${cols[0]}_${Date.now()}_${i}`,
                type: 'master_siswa',
                nis: cols[0] || '',
                nama: cols[1] || '',
                class_name: cols[2] || '',
                created_at: new Date().toISOString()
            };

            try {
                await createRecord(record);
                allData.push(record);
                studentData.push(record);
                importCount++;
            } catch (error) {
                console.error('Import error:', error);
            }
        }

        fileInput.value = '';
        loadSiswaList();
        showToast(`${importCount} data siswa berhasil diimport`, 'success');
    };

    reader.readAsText(file);
}

// =====================================================
// MASTER DATA SISWA - PORTAL SISWA (versi 2)
// =====================================================

async function saveSiswa2() {
    if (!isConnected) {
        showToast('Tidak terhubung ke Google Sheets', 'error');
        return;
    }

    const nis = document.getElementById('siswa-nis-2').value.trim();
    const nama = document.getElementById('siswa-nama-2').value.trim();
    const kelas = document.getElementById('siswa-kelas-2').value;

    if (!nis || !nama || !kelas) {
        showToast('NIS, Nama, dan Kelas wajib diisi', 'error');
        return;
    }

    const existing = studentData.find(s => s.nis === nis);

    try {
        if (existing) {
            existing.nama = nama;
            existing.class_name = kelas;
            await updateRecord(existing);
            showToast('Data siswa berhasil diperbarui', 'success');
        } else {
            const record = {
                id: `siswa_${nis}_${Date.now()}`,
                type: 'master_siswa',
                nis: nis,
                nama: nama,
                class_name: kelas,
                created_at: new Date().toISOString()
            };
            await createRecord(record);
            allData.push(record);
            studentData.push(record);
            showToast('Data siswa berhasil ditambahkan', 'success');
        }
        
        clearSiswaForm2();
        loadSiswaList2();
    } catch (error) {
        showToast('Gagal menyimpan: ' + error.message, 'error');
    }
}

function clearSiswaForm2() {
    document.getElementById('siswa-nis-2').value = '';
    document.getElementById('siswa-nama-2').value = '';
    document.getElementById('siswa-kelas-2').value = '';
}

function loadSiswaList2() {
    const listContainer = document.getElementById('siswa-list-2');
    const countEl = document.getElementById('siswa-count-2');
    
    if (!listContainer) return;
    
    if (studentData.length === 0) {
        listContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Belum ada data siswa.</p>';
        if (countEl) countEl.textContent = '0';
        return;
    }

    if (countEl) countEl.textContent = studentData.length;

    let html = '<div class="overflow-x-auto"><table class="w-full border border-gray-200 rounded-lg">';
    html += '<thead class="bg-green-50"><tr>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">NIS</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>';
    html += '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kelas</th>';
    html += '<th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>';
    html += '</tr></thead><tbody class="bg-white divide-y divide-gray-200">';

    studentData.forEach((siswa, index) => {
        html += `<tr class="hover:bg-gray-50 siswa-row-2" data-nama="${(siswa.nama || '').toLowerCase()}" data-nis="${siswa.nis || ''}" data-kelas="${siswa.class_name || ''}">`;
        html += `<td class="px-4 py-3 text-sm">${index + 1}</td>`;
        html += `<td class="px-4 py-3 text-sm font-mono">${siswa.nis || '-'}</td>`;
        html += `<td class="px-4 py-3 text-sm font-semibold">${siswa.nama || '-'}</td>`;
        html += `<td class="px-4 py-3"><span class="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">${siswa.class_name || '-'}</span></td>`;
        html += `<td class="px-4 py-3 text-center">
            <button onclick="editSiswa2('${siswa.nis}')" class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 mr-1">✏️</button>
            <button onclick="deleteSiswa2('${siswa.id}')" class="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">🗑️</button>
        </td>`;
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    listContainer.innerHTML = html;
}

function filterSiswaList2() {
    const search = document.getElementById('siswa-search-2').value.toLowerCase();
    const kelasFilter = document.getElementById('siswa-filter-kelas-2').value;
    const rows = document.querySelectorAll('.siswa-row-2');
    
    rows.forEach(row => {
        const nama = row.getAttribute('data-nama');
        const nis = row.getAttribute('data-nis');
        const kelas = row.getAttribute('data-kelas');
        
        const matchSearch = nama.includes(search) || nis.includes(search);
        const matchKelas = !kelasFilter || kelas === kelasFilter;
        
        row.style.display = (matchSearch && matchKelas) ? '' : 'none';
    });
}

function editSiswa2(nis) {
    const siswa = studentData.find(s => s.nis === nis);
    if (!siswa) return;

    document.getElementById('siswa-nis-2').value = siswa.nis || '';
    document.getElementById('siswa-nama-2').value = siswa.nama || '';
    document.getElementById('siswa-kelas-2').value = siswa.class_name || '';

    document.getElementById('section-master-siswa-siswa').scrollIntoView({ behavior: 'smooth' });
    showToast('Data siswa dimuat untuk diedit', 'info');
}

async function deleteSiswa2(id) {
    if (!confirm('Yakin ingin menghapus data siswa ini?')) return;

    const siswa = studentData.find(s => s.id === id);
    if (!siswa) return;

    try {
        await deleteRecord(siswa);
        
        const idx1 = allData.findIndex(d => d.id === id);
        if (idx1 > -1) allData.splice(idx1, 1);
        
        const idx2 = studentData.findIndex(s => s.id === id);
        if (idx2 > -1) studentData.splice(idx2, 1);

        loadSiswaList2();
        showToast('Data siswa berhasil dihapus', 'success');
    } catch (error) {
        showToast('Gagal menghapus: ' + error.message, 'error');
    }
}

async function importSiswaCSV2() {
    const fileInput = document.getElementById('siswa-csv-file-2');
    if (!fileInput.files.length) {
        showToast('Pilih file CSV terlebih dahulu', 'error');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = async function(e) {
        const text = e.target.result;
        const lines = text.split('\n').filter(l => l.trim());
        
        if (lines.length < 2) {
            showToast('File CSV kosong atau tidak valid', 'error');
            return;
        }

        let importCount = 0;
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            if (cols.length < 3) continue;

            const record = {
                id: `siswa_${cols[0]}_${Date.now()}_${i}`,
                type: 'master_siswa',
                nis: cols[0] || '',
                nama: cols[1] || '',
                class_name: cols[2] || '',
                created_at: new Date().toISOString()
            };

            try {
                await createRecord(record);
                allData.push(record);
                studentData.push(record);
                importCount++;
            } catch (error) {
                console.error('Import error:', error);
            }
        }

        fileInput.value = '';
        loadSiswaList2();
        showToast(`${importCount} data siswa berhasil diimport`, 'success');
    };

    reader.readAsText(file);
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// =====================================================
// LOGO UPLOAD FUNCTIONS (ADMIN ONLY)
// =====================================================

function showLogoModal() {
    if (!hasAccess('setup')) {
        showToast('Hanya Admin yang dapat mengubah logo', 'error');
        return;
    }
    
    // Load current logo
    loadCurrentLogo();
    document.getElementById('logo-modal').classList.remove('hidden');
}

function hideLogoModal() {
    document.getElementById('logo-modal').classList.add('hidden');
    document.getElementById('logo-file-input').value = '';
    document.getElementById('new-logo-preview-container').classList.add('hidden');
}

function loadCurrentLogo() {
    const savedLogo = localStorage.getItem('schoolLogo');
    const loginLogo = document.getElementById('login-logo');
    const loginPlaceholder = document.getElementById('login-logo-placeholder');
    const headerLogo = document.getElementById('header-logo');
    const headerPlaceholder = document.getElementById('header-logo-placeholder');
    const currentPreview = document.getElementById('current-logo-preview');
    const currentPlaceholder = document.getElementById('current-logo-placeholder');
    
    if (savedLogo) {
        // Show logo images
        if (loginLogo) {
            loginLogo.src = savedLogo;
            loginLogo.classList.remove('hidden');
        }
        if (loginPlaceholder) loginPlaceholder.classList.add('hidden');
        
        if (headerLogo) {
            headerLogo.src = savedLogo;
            headerLogo.classList.remove('hidden');
        }
        if (headerPlaceholder) headerPlaceholder.classList.add('hidden');
        
        if (currentPreview) {
            currentPreview.src = savedLogo;
            currentPreview.classList.remove('hidden');
        }
        if (currentPlaceholder) currentPlaceholder.classList.add('hidden');
    } else {
        // Show placeholders
        if (loginLogo) loginLogo.classList.add('hidden');
        if (loginPlaceholder) loginPlaceholder.classList.remove('hidden');
        
        if (headerLogo) headerLogo.classList.add('hidden');
        if (headerPlaceholder) headerPlaceholder.classList.remove('hidden');
        
        if (currentPreview) currentPreview.classList.add('hidden');
        if (currentPlaceholder) currentPlaceholder.classList.remove('hidden');
    }
}

function previewLogo(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showToast('Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.', 'error');
        event.target.value = '';
        return;
    }
    
    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
        showToast('Ukuran file terlalu besar. Maksimum 2MB.', 'error');
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('new-logo-preview');
        const container = document.getElementById('new-logo-preview-container');
        
        preview.src = e.target.result;
        container.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function saveLogo() {
    const fileInput = document.getElementById('logo-file-input');
    
    if (!fileInput.files.length) {
        showToast('Pilih gambar logo terlebih dahulu', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const logoData = e.target.result;
        
        // Save to localStorage
        try {
            localStorage.setItem('schoolLogo', logoData);
            
            // Update all logo displays
            loadCurrentLogo();
            
            showToast('Logo berhasil disimpan!', 'success');
            hideLogoModal();
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                showToast('Ukuran logo terlalu besar. Coba gunakan gambar yang lebih kecil.', 'error');
            } else {
                showToast('Gagal menyimpan logo: ' + error.message, 'error');
            }
        }
    };
    
    reader.readAsDataURL(file);
}

function removeLogo() {
    if (!confirm('Yakin ingin menghapus logo sekolah?')) return;
    
    localStorage.removeItem('schoolLogo');
    loadCurrentLogo();
    
    // Reset file input
    document.getElementById('logo-file-input').value = '';
    document.getElementById('new-logo-preview-container').classList.add('hidden');
    
    showToast('Logo berhasil dihapus', 'success');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);