// =====================================================
// GOOGLE APPS SCRIPT - PORTAL PENDIDIKAN BUNAYYA ISLAMIC SCHOOL
// =====================================================
// PETUNJUK PENGGUNAAN:
// 1. Buka Google Sheets baru
// 2. Klik Extensions > Apps Script
// 3. Hapus semua kode dan paste kode ini
// 4. Simpan project dengan nama "Portal Bunayya"
// 5. Klik Deploy > New Deployment
// 6. Pilih "Web app", Execute as: Me, Who has access: Anyone
// 7. Copy URL deployment dan paste ke index.html (SCRIPT_URL)
// 8. Jalankan menu 🏫 Portal Bunayya → Inisialisasi Sheet
// =====================================================

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

const SHEET_NAMES = {
  STUDENT_ATTENDANCE: 'Absensi_Siswa',
  TEACHER_ATTENDANCE: 'Absensi_Guru',
  JOURNAL: 'Jurnal_Mengajar',
  DAILY_REPORT: 'Laporan_Harian',
  ACTIVITY: 'Laporan_Kegiatan',
  TARGET: 'Target_Pencapaian',
  MASTER_GURU: 'Master_Guru',
  MASTER_SISWA: 'Master_Siswa',
  NILAI: 'Rekap_Nilai',
  JADWAL: 'Jadwal_Pelajaran',
  EVENT: 'Kalender_Akademik'
};

// Inisialisasi Sheet dengan Header
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const headers = {
    [SHEET_NAMES.STUDENT_ATTENDANCE]: ['id', 'type', 'class_name', 'student_name', 'nis', 'date', 'status', 'created_at'],
    [SHEET_NAMES.TEACHER_ATTENDANCE]: ['id', 'type', 'teacher_name', 'class_name', 'date', 'status', 'created_at'],
    [SHEET_NAMES.JOURNAL]: ['id', 'type', 'teacher_name', 'date', 'class_name', 'subject', 'topic', 'activity', 'notes', 'created_at'],
    [SHEET_NAMES.DAILY_REPORT]: ['id', 'type', 'class_name', 'student_name', 'date', 'topic', 'page', 'result', 'notes', 'created_at'],
    [SHEET_NAMES.ACTIVITY]: ['id', 'type', 'class_name', 'student_name', 'date', 'category', 'rating', 'description', 'created_at'],
    [SHEET_NAMES.TARGET]: ['id', 'type', 'class_name', 'student_name', 'category', 'progress', 'notes', 'created_at'],
    [SHEET_NAMES.MASTER_GURU]: ['id', 'type', 'nip', 'nama', 'email', 'telepon', 'mapel', 'status', 'alamat', 'created_at'],
    [SHEET_NAMES.MASTER_SISWA]: ['id', 'type', 'nis', 'nama', 'class_name', 'created_at'],
    [SHEET_NAMES.NILAI]: ['id', 'type', 'class_name', 'student_name', 'subject', 'nilai_type', 'score', 'date', 'notes', 'created_at'],
    [SHEET_NAMES.JADWAL]: ['id', 'type', 'class_name', 'day', 'time', 'subject', 'teacher_name', 'room', 'created_at'],
    [SHEET_NAMES.EVENT]: ['id', 'type', 'name', 'start_date', 'end_date', 'category', 'description', 'created_at']
  };
  
  for (const [sheetName, headerRow] of Object.entries(headers)) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, headerRow.length).setValues([headerRow]);
      sheet.getRange(1, 1, 1, headerRow.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, headerRow.length).setBackground('#4F46E5');
      sheet.getRange(1, 1, 1, headerRow.length).setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
      
      // Auto resize columns
      for (let i = 1; i <= headerRow.length; i++) {
        sheet.autoResizeColumn(i);
      }
    }
  }
  
  SpreadsheetApp.getUi().alert('✅ Semua sheet berhasil diinisialisasi!');
  return { success: true, message: 'Sheets initialized successfully' };
}

// Web App Entry Point
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const action = e.parameter.action || 'getAll';
  let result;
  
  try {
    switch (action) {
      case 'init':
        result = initializeSheets();
        break;
      case 'getAll':
        result = getAllData();
        break;
      case 'create':
        const createData = JSON.parse(e.parameter.data || e.postData.contents);
        result = createRecord(createData);
        break;
      case 'update':
        const updateData = JSON.parse(e.parameter.data || e.postData.contents);
        result = updateRecord(updateData);
        break;
      case 'delete':
        const deleteData = JSON.parse(e.parameter.data || e.postData.contents);
        result = deleteRecord(deleteData);
        break;
      case 'getByType':
        const type = e.parameter.type;
        result = getDataByType(type);
        break;
      case 'getStudents':
        const className = e.parameter.class_name;
        result = getStudentsByClass(className);
        break;
      default:
        result = { success: false, error: 'Unknown action' };
    }
  } catch (error) {
    result = { success: false, error: error.toString() };
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Get Sheet by Record Type
function getSheetByType(type) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const typeToSheet = {
    'student_attendance': SHEET_NAMES.STUDENT_ATTENDANCE,
    'teacher_attendance': SHEET_NAMES.TEACHER_ATTENDANCE,
    'journal': SHEET_NAMES.JOURNAL,
    'daily_report': SHEET_NAMES.DAILY_REPORT,
    'activity': SHEET_NAMES.ACTIVITY,
    'target': SHEET_NAMES.TARGET,
    'master_guru': SHEET_NAMES.MASTER_GURU,
    'master_siswa': SHEET_NAMES.MASTER_SISWA,
    'nilai': SHEET_NAMES.NILAI,
    'jadwal': SHEET_NAMES.JADWAL,
    'event': SHEET_NAMES.EVENT
  };
  
  const sheetName = typeToSheet[type];
  if (!sheetName) return null;
  
  return ss.getSheetByName(sheetName);
}

// Get All Data from All Sheets
function getAllData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let allData = [];
  
  for (const sheetName of Object.values(SHEET_NAMES)) {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      const data = sheetToJson(sheet);
      allData = allData.concat(data);
    }
  }
  
  return { success: true, data: allData };
}

// Get Data by Type
function getDataByType(type) {
  const sheet = getSheetByType(type);
  if (!sheet) {
    return { success: false, error: 'Sheet not found for type: ' + type };
  }
  
  const data = sheetToJson(sheet);
  return { success: true, data: data };
}

// Get Students by Class
function getStudentsByClass(className) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.MASTER_SISWA);
  
  if (!sheet) {
    return { success: false, error: 'Master Siswa sheet not found' };
  }
  
  const allStudents = sheetToJson(sheet);
  const filtered = className 
    ? allStudents.filter(s => s.class_name === className)
    : allStudents;
  
  return { success: true, data: filtered };
}

// Convert Sheet to JSON Array
function sheetToJson(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  }).filter(obj => obj.id);
}

// Create New Record
function createRecord(record) {
  const sheet = getSheetByType(record.type);
  if (!sheet) {
    return { success: false, error: 'Sheet not found for type: ' + record.type };
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = headers.map(header => record[header] || '');
  
  sheet.appendRow(newRow);
  
  return { success: true, data: record };
}

// Update Existing Record
function updateRecord(record) {
  const sheet = getSheetByType(record.type);
  if (!sheet) {
    return { success: false, error: 'Sheet not found for type: ' + record.type };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idIndex = headers.indexOf('id');
  
  if (idIndex === -1) {
    return { success: false, error: 'ID column not found' };
  }
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] === record.id) {
      const updatedRow = headers.map(header => record[header] !== undefined ? record[header] : data[i][headers.indexOf(header)]);
      sheet.getRange(i + 1, 1, 1, headers.length).setValues([updatedRow]);
      return { success: true, data: record };
    }
  }
  
  return { success: false, error: 'Record not found' };
}

// Delete Record
function deleteRecord(record) {
  const sheet = getSheetByType(record.type);
  if (!sheet) {
    return { success: false, error: 'Sheet not found for type: ' + record.type };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idIndex = headers.indexOf('id');
  
  if (idIndex === -1) {
    return { success: false, error: 'ID column not found' };
  }
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] === record.id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Record deleted' };
    }
  }
  
  return { success: false, error: 'Record not found' };
}

// Bulk Create Records
function bulkCreate(records) {
  let successCount = 0;
  let errors = [];
  
  for (const record of records) {
    const result = createRecord(record);
    if (result.success) {
      successCount++;
    } else {
      errors.push(result.error);
    }
  }
  
  return { 
    success: true, 
    created: successCount, 
    errors: errors 
  };
}

// Import Sample Students Data
function importSampleStudents() {
  const students = [
    { nis: "201", nama: "Aisyah Humairo Annur", class_name: "Kelas 5" },
    { nis: "202", nama: "Faiza Alya Azizah", class_name: "Kelas 5" },
    { nis: "203", nama: "Muhammad Arkaan Mubarrok Hutapea", class_name: "Kelas 5" },
    { nis: "204", nama: "Rayzaka Azhari", class_name: "Kelas 5" },
    { nis: "231", nama: "ABRISAM KAMIL DEPATI", class_name: "Kelas 5" },
    { nis: "205", nama: "AHMAD ZAEN MALEEQ", class_name: "Kelas 4" },
    { nis: "206", nama: "ANWAR SHOFWAN ROMADHON", class_name: "Kelas 4" },
    { nis: "101", nama: "Ahmad Fauzi", class_name: "Kelas 1" },
    { nis: "102", nama: "Siti Aminah", class_name: "Kelas 1" },
    { nis: "103", nama: "Muhammad Rizki", class_name: "Kelas 2" },
    { nis: "104", nama: "Fatimah Zahra", class_name: "Kelas 2" }
  ];
  
  const records = students.map(s => ({
    id: `siswa_${s.nis}`,
    type: 'master_siswa',
    nis: s.nis,
    nama: s.nama,
    class_name: s.class_name,
    created_at: new Date().toISOString()
  }));
  
  const result = bulkCreate(records);
  SpreadsheetApp.getUi().alert(`✅ ${result.created} data siswa berhasil diimport!`);
  return result;
}

// Import Sample Teachers Data
function importSampleTeachers() {
  const teachers = [
    { nip: "T001", nama: "Nurochman", mapel: "Tahfidz" },
    { nip: "T002", nama: "Hasnal Labibah", mapel: "IQRO" },
    { nip: "T003", nama: "Nilayana", mapel: "Bahasa Arab" },
    { nip: "T004", nama: "Tri Amelia", mapel: "Matematika" },
    { nip: "T005", nama: "Anggun Fajarwati", mapel: "Bahasa Indonesia" },
    { nip: "T006", nama: "Bhika Pratami", mapel: "IPAS" },
    { nip: "T007", nama: "Latifah", mapel: "Bahasa Inggris" },
    { nip: "T008", nama: "Alfi Amelia", mapel: "Seni Budaya" },
    { nip: "T009", nama: "Faradisa", mapel: "PKN" },
    { nip: "T010", nama: "Sulitiyono", mapel: "PJOK" },
    { nip: "T011", nama: "Guru Admin", mapel: "Admin" }
  ];
  
  const records = teachers.map(t => ({
    id: `guru_${t.nip}`,
    type: 'master_guru',
    nip: t.nip,
    nama: t.nama,
    email: '',
    telepon: '',
    mapel: t.mapel,
    status: 'Aktif',
    alamat: '',
    created_at: new Date().toISOString()
  }));
  
  const result = bulkCreate(records);
  SpreadsheetApp.getUi().alert(`✅ ${result.created} data guru berhasil diimport!`);
  return result;
}

// Import Sample Events
function importSampleEvents() {
  const events = [
    { name: "Libur Hari Raya Idul Fitri", start_date: "2025-03-30", end_date: "2025-04-06", category: "Libur" },
    { name: "Ujian Tengah Semester", start_date: "2025-03-10", end_date: "2025-03-14", category: "Ujian" },
    { name: "Rapat Wali Murid", start_date: "2025-02-15", end_date: "2025-02-15", category: "Rapat" },
    { name: "Peringatan Isra Mi'raj", start_date: "2025-01-27", end_date: "2025-01-27", category: "Kegiatan" }
  ];
  
  const records = events.map((e, i) => ({
    id: `event_sample_${i}`,
    type: 'event',
    name: e.name,
    start_date: e.start_date,
    end_date: e.end_date,
    category: e.category,
    description: '',
    created_at: new Date().toISOString()
  }));
  
  const result = bulkCreate(records);
  SpreadsheetApp.getUi().alert(`✅ ${result.created} event berhasil diimport!`);
  return result;
}

// Import Sample Schedule
function importSampleSchedule() {
  const schedules = [
    { class_name: "Kelas 5", day: "Senin", time: "07:00-07:45", subject: "TAHFIDZ", teacher_name: "Nurochman" },
    { class_name: "Kelas 5", day: "Senin", time: "07:45-08:30", subject: "IQRO", teacher_name: "Hasnal Labibah" },
    { class_name: "Kelas 5", day: "Senin", time: "08:30-09:15", subject: "MATEMATIKA", teacher_name: "Tri Amelia" },
    { class_name: "Kelas 5", day: "Selasa", time: "07:00-07:45", subject: "BAHASA ARAB", teacher_name: "Nilayana" },
    { class_name: "Kelas 5", day: "Selasa", time: "07:45-08:30", subject: "BAHASA INDONESIA", teacher_name: "Anggun Fajarwati" },
    { class_name: "Kelas 4", day: "Senin", time: "07:00-07:45", subject: "TAHFIDZ", teacher_name: "Nurochman" },
    { class_name: "Kelas 4", day: "Senin", time: "07:45-08:30", subject: "MATEMATIKA", teacher_name: "Tri Amelia" }
  ];
  
  const records = schedules.map((s, i) => ({
    id: `jadwal_sample_${i}`,
    type: 'jadwal',
    class_name: s.class_name,
    day: s.day,
    time: s.time,
    subject: s.subject,
    teacher_name: s.teacher_name,
    room: '',
    created_at: new Date().toISOString()
  }));
  
  const result = bulkCreate(records);
  SpreadsheetApp.getUi().alert(`✅ ${result.created} jadwal berhasil diimport!`);
  return result;
}

// Generate Sample Grades
function importSampleGrades() {
  const grades = [
    { class_name: "Kelas 5", student_name: "Aisyah Humairo Annur", subject: "MATEMATIKA", nilai_type: "Ulangan Harian", score: 85 },
    { class_name: "Kelas 5", student_name: "Aisyah Humairo Annur", subject: "TAHFIDZ", nilai_type: "Praktek", score: 90 },
    { class_name: "Kelas 5", student_name: "Faiza Alya Azizah", subject: "MATEMATIKA", nilai_type: "Ulangan Harian", score: 78 },
    { class_name: "Kelas 5", student_name: "Muhammad Arkaan Mubarrok Hutapea", subject: "BAHASA INDONESIA", nilai_type: "Tugas", score: 88 },
    { class_name: "Kelas 4", student_name: "AHMAD ZAEN MALEEQ", subject: "MATEMATIKA", nilai_type: "UTS", score: 82 }
  ];
  
  const today = new Date().toISOString().split('T')[0];
  
  const records = grades.map((g, i) => ({
    id: `nilai_sample_${i}`,
    type: 'nilai',
    class_name: g.class_name,
    student_name: g.student_name,
    subject: g.subject,
    nilai_type: g.nilai_type,
    score: g.score,
    date: today,
    notes: '',
    created_at: new Date().toISOString()
  }));
  
  const result = bulkCreate(records);
  SpreadsheetApp.getUi().alert(`✅ ${result.created} nilai berhasil diimport!`);
  return result;
}

// Clear All Data (Use with caution!)
function clearAllData() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('⚠️ PERINGATAN', 'Apakah Anda yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan!', ui.ButtonSet.YES_NO);
  
  if (response !== ui.Button.YES) {
    return;
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  for (const sheetName of Object.values(SHEET_NAMES)) {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet && sheet.getLastRow() > 1) {
      sheet.deleteRows(2, sheet.getLastRow() - 1);
    }
  }
  
  ui.alert('✅ Semua data berhasil dihapus!');
}

// Menu untuk Run Manual di Apps Script
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏫 Portal Bunayya')
    .addItem('📋 Inisialisasi Sheet', 'initializeSheets')
    .addSeparator()
    .addSubMenu(ui.createMenu('📥 Import Data Sample')
      .addItem('👨‍🎓 Data Siswa', 'importSampleStudents')
      .addItem('👨‍🏫 Data Guru', 'importSampleTeachers')
      .addItem('📅 Kalender Akademik', 'importSampleEvents')
      .addItem('🗓️ Jadwal Pelajaran', 'importSampleSchedule')
      .addItem('📊 Nilai Siswa', 'importSampleGrades'))
    .addSeparator()
    .addItem('🗑️ Hapus Semua Data', 'clearAllData')
    .addToUi();
}
