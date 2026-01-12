// API endpoint để serve các file JavaScript
// Sử dụng: /api/js?file=config.js hoặc /api/js?file=utils.js

const fs = require('fs');
const path = require('path');

// Xác định đường dẫn gốc (tương thích với Vercel)
const rootPath = process.cwd();

// Danh sách file JS được phép truy cập
const ALLOWED_FILES = {
  'config.js': path.join(rootPath, 'config.js'),
  'utils.js': path.join(rootPath, 'js', 'utils.js'),
  'wheel.js': path.join(rootPath, 'js', 'wheel.js'),
  'timetable.js': path.join(rootPath, 'js', 'timetable.js'),
  'countdown.js': path.join(rootPath, 'js', 'countdown.js'),
  'schoolWeek.js': path.join(rootPath, 'js', 'schoolWeek.js'),
  'teachingPlan.js': path.join(rootPath, 'js', 'teachingPlan.js'),
  'main.js': path.join(rootPath, 'js', 'main.js')
};

module.exports = async (req, res) => {
  // Chỉ cho phép GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Lấy tên file từ query parameter
  const fileName = req.query.file;

  if (!fileName) {
    return res.status(400).json({ error: 'Missing file parameter' });
  }

  // Kiểm tra file có trong danh sách cho phép không
  const filePath = ALLOWED_FILES[fileName];
  
  if (!filePath) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    // Đọc file
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Set headers cho JavaScript
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache 1 giờ
    
    // Trả về nội dung file
    return res.status(200).send(fileContent);
  } catch (error) {
    console.error('Error reading file:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

