const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs-extra');
const path = require('path');

// Cấu hình obfuscation
const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

// Danh sách các file JS cần obfuscate
const jsFiles = [
    'config.js',
    'js/utils.js',
    'js/wheel.js',
    'js/timetable.js',
    'js/countdown.js',
    'js/schoolWeek.js',
    'js/teachingPlan.js',
    'js/main.js'
];

// Tạo thư mục dist nếu chưa có
const distDir = path.join(__dirname, 'dist');
const distJsDir = path.join(distDir, 'js');

async function obfuscateFiles() {
    try {
        // Tạo thư mục dist
        await fs.ensureDir(distDir);
        await fs.ensureDir(distJsDir);

        console.log('Bắt đầu obfuscate các file JavaScript...\n');

        // Obfuscate từng file
        for (const file of jsFiles) {
            const filePath = path.join(__dirname, file);
            
            if (!await fs.pathExists(filePath)) {
                console.warn(`⚠️  File không tồn tại: ${file}`);
                continue;
            }

            const code = await fs.readFile(filePath, 'utf8');
            const obfuscationResult = JavaScriptObfuscator.obfuscate(code, obfuscationOptions);
            const obfuscatedCode = obfuscationResult.getObfuscatedCode();

            // Lưu file đã obfuscate
            let outputPath;
            if (file === 'config.js') {
                outputPath = path.join(distDir, 'config.js');
            } else {
                outputPath = path.join(distDir, file);
            }

            await fs.ensureDir(path.dirname(outputPath));
            await fs.writeFile(outputPath, obfuscatedCode, 'utf8');

            const originalSize = (code.length / 1024).toFixed(2);
            const obfuscatedSize = (obfuscatedCode.length / 1024).toFixed(2);
            
            console.log(`✅ ${file}`);
            console.log(`   Kích thước: ${originalSize} KB → ${obfuscatedSize} KB`);
        }

        // Copy file index.html và styles.css vào dist
        console.log('\n📋 Copy các file khác...');
        await fs.copy(path.join(__dirname, 'styles.css'), path.join(distDir, 'styles.css'));
        
        // Copy và giữ nguyên index.html (các đường dẫn script vẫn giống nhau)
        await fs.copy(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));
        
        console.log('\n✨ Hoàn thành! Các file đã được obfuscate và lưu trong thư mục dist/');
        console.log('📁 Bạn có thể deploy thư mục dist/ lên server.');
        console.log('🔒 Tất cả file JavaScript đã được obfuscate để bảo vệ code.\n');
        
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
        process.exit(1);
    }
}

obfuscateFiles();

