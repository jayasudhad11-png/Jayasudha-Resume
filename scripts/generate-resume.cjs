const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResume(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    autoFirstPage: true,
    info: {
      Title: 'Resume - D. JAYASUDHA (DCSE)',
      Author: 'D. Jayasudha',
      Subject: 'Official Resume Document',
      Keywords: 'Resume, DCSE, Diploma Computer Science, D. Jayasudha',
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const contentWidth = pageWidth - 80;

  // Colors
  const primaryNavy = '#0f172a';
  const headerBg = '#1e293b';
  const indigoAccent = '#4f46e5';
  const cyanAccent = '#0284c7';
  const emeraldAccent = '#059669';
  const textDark = '#1e293b';
  const textMuted = '#475569';
  const lightBg = '#f8fafc';
  const borderLight = '#e2e8f0';

  // Helper: Draw Section Title
  function drawSectionTitle(title, y, accentColor = indigoAccent) {
    doc.save();
    // Accent line pill
    doc.roundedRect(40, y, 4, 18, 2).fill(accentColor);
    doc.fillColor(primaryNavy)
       .font('Helvetica-Bold')
       .fontSize(13)
       .text(title.toUpperCase(), 52, y + 2, { letterSpacing: 0.5 });
    
    // Subtle horizontal divider line
    doc.moveTo(52 + doc.widthOfString(title.toUpperCase()) + 12, y + 10)
       .lineTo(pageWidth - 40, y + 10)
       .strokeColor(borderLight)
       .lineWidth(1)
       .stroke();
    doc.restore();
    return y + 26;
  }

  // ==========================================
  // PAGE 1
  // ==========================================

  // Header Banner Background
  doc.save();
  doc.rect(0, 0, pageWidth, 130).fill(headerBg);
  doc.rect(0, 127, pageWidth, 3).fill(indigoAccent);

  // Profile Image (left side)
  const avatarPath = fs.existsSync('/tmp/avatar_resume.jpg') 
    ? '/tmp/avatar_resume.jpg' 
    : (fs.existsSync('profile.jpg') ? 'profile.jpg' : null);

  if (avatarPath) {
    // White border frame for photo
    doc.roundedRect(40, 18, 92, 92, 46).fill('#ffffff');
    doc.save();
    doc.roundedRect(43, 21, 86, 86, 43).clip();
    doc.image(avatarPath, 43, 21, { width: 86, height: 86, fit: [86, 86], align: 'center', valign: 'center' });
    doc.restore();
  }

  // Header Text
  const textLeft = avatarPath ? 148 : 40;
  doc.fillColor('#ffffff')
     .font('Helvetica-Bold')
     .fontSize(22)
     .text('D. JAYASUDHA', textLeft, 24);

  doc.fillColor('#94a3b8')
     .font('Helvetica')
     .fontSize(11)
     .text('DIPLOMA IN COMPUTER SCIENCE & ENGINEERING (DCSE)', textLeft, 50);

  // Contact Chips bar
  doc.fontSize(9).font('Helvetica');
  doc.fillColor('#38bdf8').text('Mobile: ', textLeft, 72, { continued: true });
  doc.fillColor('#ffffff').text('+91 8300558682   |   ', { continued: true });
  doc.fillColor('#38bdf8').text('Email: ', { continued: true });
  doc.fillColor('#ffffff').text('jayasudhad19510057@gmail.com');

  doc.fillColor('#38bdf8').text('Address: ', textLeft, 88, { continued: true });
  doc.fillColor('#cbd5e1').text('2/227 Periyagaram, Thirupattur (Dt) - 635901, Tamil Nadu');

  doc.restore();

  let currentY = 146;

  // 1. CAREER OBJECTIVE
  currentY = drawSectionTitle('Career Objective', currentY, indigoAccent);
  doc.save();
  doc.roundedRect(40, currentY, contentWidth, 54, 6)
     .fillAndStroke(lightBg, borderLight);
  doc.fillColor(textDark)
     .font('Helvetica')
     .fontSize(9.5)
     .text(
       'Seeking a position to utilize my skill and abilities in an organization that offers personal growth while being Resourceful, Innovative and Flexible also to strive hard endeavor my best to enhance the overall development of the organization.',
       52,
       currentY + 10,
       { width: contentWidth - 24, align: 'justify', lineGap: 3 }
     );
  doc.restore();
  currentY += 66;

  // 2. PROFESSIONAL EXPERIENCE
  currentY = drawSectionTitle('Professional Experience', currentY, emeraldAccent);
  doc.save();
  doc.roundedRect(40, currentY, contentWidth, 58, 6)
     .fillAndStroke(lightBg, borderLight);

  // Company Name
  doc.fillColor(primaryNavy)
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('OLA Electric Technology, Pochempalli', 54, currentY + 10);

  // Experience Duration Badge
  doc.roundedRect(pageWidth - 170, currentY + 9, 116, 18, 9)
     .fill(emeraldAccent);
  doc.fillColor('#ffffff')
     .font('Helvetica-Bold')
     .fontSize(8.5)
     .text('3 Years 3 Months', pageWidth - 170, currentY + 14, { width: 116, align: 'center' });

  // Location & Details
  doc.fillColor(textMuted)
     .font('Helvetica')
     .fontSize(9)
     .text('Location: Pochempalli, Krishnagiri / Tamil Nadu   •   Full-time Industrial Operations', 54, currentY + 28);
  doc.text('Industry-level manufacturing, operations, and disciplined organizational workflow experience.', 54, currentY + 41);
  doc.restore();
  currentY += 70;

  // 3. ACADEMIC CREDENTIALS
  currentY = drawSectionTitle('Academic Credentials', currentY, cyanAccent);

  // Table Header
  const tableX = 40;
  const colWidths = [115, 185, 80, 58, 77]; // Total = 515
  const colHeaders = ['Course / Degree', 'Institution', 'Board', 'Passing Year', 'Percentage'];

  doc.save();
  doc.roundedRect(tableX, currentY, contentWidth, 22, 4).fill(primaryNavy);
  let curX = tableX;
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#ffffff');
  colHeaders.forEach((h, i) => {
    doc.text(h, curX + 6, currentY + 6, { width: colWidths[i] - 12, align: i >= 3 ? 'center' : 'left' });
    curX += colWidths[i];
  });
  currentY += 22;

  const eduRows = [
    {
      course: 'DIPLOMA (CSE)',
      inst: 'Government Polytechnic College, Krishnagiri',
      board: 'DOTE',
      year: '2021',
      score: '95% (Up to 4th sem)',
      highlight: true
    },
    {
      course: 'HSE (12th)',
      inst: 'Government Higher Secondary School, Kasinayakanpatti',
      board: 'State Board',
      year: '2019',
      score: '69.1%',
      highlight: false
    },
    {
      course: 'SSLC (10th)',
      inst: 'Government High School, Periyagaram',
      board: 'State Board',
      year: '2017',
      score: '86.6%',
      highlight: false
    }
  ];

  eduRows.forEach((row, idx) => {
    const rowH = 28;
    const isEven = idx % 2 === 0;
    doc.rect(tableX, currentY, contentWidth, rowH)
       .fillAndStroke(row.highlight ? '#f0fdf4' : (isEven ? '#ffffff' : '#f8fafc'), borderLight);

    curX = tableX;
    // Course
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(row.highlight ? emeraldAccent : primaryNavy);
    doc.text(row.course, curX + 6, currentY + 8, { width: colWidths[0] - 12 });
    curX += colWidths[0];

    // Institution
    doc.font('Helvetica').fontSize(8).fillColor(textDark);
    doc.text(row.inst, curX + 6, currentY + 5, { width: colWidths[1] - 12, lineGap: 1 });
    curX += colWidths[1];

    // Board
    doc.font('Helvetica').fontSize(8).fillColor(textMuted);
    doc.text(row.board, curX + 6, currentY + 8, { width: colWidths[2] - 12 });
    curX += colWidths[2];

    // Year
    doc.font('Helvetica').fontSize(8.5).fillColor(textDark);
    doc.text(row.year, curX + 6, currentY + 8, { width: colWidths[3] - 12, align: 'center' });
    curX += colWidths[3];

    // Percentage
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(row.highlight ? emeraldAccent : primaryNavy);
    doc.text(row.score, curX + 4, currentY + 8, { width: colWidths[4] - 8, align: 'center' });

    currentY += rowH;
  });
  doc.restore();
  currentY += 16;

  // 4. TECHNICAL SKILLS
  currentY = drawSectionTitle('Technical Skills', currentY, indigoAccent);
  
  // Two boxes: Programming Languages and Applications
  const halfW = (contentWidth - 12) / 2;

  doc.save();
  // Left Box: Programming Languages
  doc.roundedRect(40, currentY, halfW, 76, 6).fillAndStroke(lightBg, borderLight);
  doc.fillColor(primaryNavy).font('Helvetica-Bold').fontSize(9.5).text('Programming Languages & OS', 52, currentY + 10);
  
  const progSkills = [
    { name: 'C', desc: 'Core programming language' },
    { name: 'Java', desc: 'Object-oriented programming' },
    { name: 'HTML', desc: 'Web markup structure' },
    { name: 'Linux', desc: 'CLI & operating system' },
  ];
  let skillY = currentY + 26;
  progSkills.forEach((s) => {
    doc.fillColor(indigoAccent).font('Helvetica-Bold').fontSize(8.5).text('•  ' + s.name + ':', 54, skillY, { continued: true });
    doc.fillColor(textMuted).font('Helvetica').fontSize(8.5).text(' ' + s.desc);
    skillY += 12;
  });

  // Right Box: Applications & Databases
  doc.roundedRect(40 + halfW + 12, currentY, halfW, 76, 6).fillAndStroke(lightBg, borderLight);
  doc.fillColor(primaryNavy).font('Helvetica-Bold').fontSize(9.5).text('Applications & Database', 40 + halfW + 24, currentY + 10);

  const appSkills = [
    { name: 'MS Office', desc: 'Word, Excel, PowerPoint' },
    { name: 'MySQL', desc: 'Relational database queries' },
    { name: 'Computer Applications', desc: 'Technical documentation' },
  ];
  skillY = currentY + 26;
  appSkills.forEach((s) => {
    doc.fillColor(cyanAccent).font('Helvetica-Bold').fontSize(8.5).text('•  ' + s.name + ':', 40 + halfW + 24, skillY, { continued: true });
    doc.fillColor(textMuted).font('Helvetica').fontSize(8.5).text(' ' + s.desc);
    skillY += 12;
  });
  doc.restore();

  // Page 1 Footer Note
  doc.font('Helvetica').fontSize(8).fillColor('#94a3b8')
     .text('Page 1 of 2  •  Official Resume of D. Jayasudha (DCSE)', 40, pageHeight - 24, { width: contentWidth, align: 'center' });

  // ==========================================
  // PAGE 2
  // ==========================================
  doc.addPage();

  // Mini Top Bar
  doc.save();
  doc.rect(0, 0, pageWidth, 28).fill(headerBg);
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(8.5)
     .text('D. JAYASUDHA (DCSE)  —  RESUME CREDENTIALS', 40, 10);
  doc.fillColor('#94a3b8').font('Helvetica').fontSize(8)
     .text('Page 2 of 2', pageWidth - 100, 10, { width: 60, align: 'right' });
  doc.restore();

  currentY = 46;

  // 5. PERSONAL SKILLS & STRENGTHS
  currentY = drawSectionTitle('Personal Skills & Strengths', currentY, emeraldAccent);
  doc.save();
  const personalSkills = [
    { title: 'Adaptability', desc: 'Ability to adapt for new situations and stand up to challenges.' },
    { title: 'Continuous Learning', desc: 'High willingness to learn new technical workflows and organizational methods.' },
    { title: 'Leadership', desc: 'Demonstrated ability to lead a team collaboratively and maintain high morale.' },
    { title: 'Responsibility', desc: 'Highly responsible, punctual, dependable, and disciplined approach to work.' },
  ];

  let pColY = currentY;
  personalSkills.forEach((ps) => {
    doc.roundedRect(40, pColY, contentWidth, 24, 4).fillAndStroke(lightBg, borderLight);
    doc.fillColor(emeraldAccent).font('Helvetica-Bold').fontSize(8.5)
       .text('✔ ' + ps.title + ':', 50, pColY + 7, { continued: true });
    doc.fillColor(textDark).font('Helvetica').fontSize(8.5)
       .text('  ' + ps.desc);
    pColY += 28;
  });
  doc.restore();
  currentY = pColY + 8;

  // 6. CO-CURRICULAR ACTIVITIES
  currentY = drawSectionTitle('Co-Curricular Activities & Interests', currentY, indigoAccent);
  doc.save();
  const actWidth = (contentWidth - 24) / 4;
  const activities = [
    { name: 'Reading Books', desc: 'Knowledge Expansion' },
    { name: 'Drawing', desc: 'Visual Arts & Sketching' },
    { name: 'Writing', desc: 'Thought Articulation' },
    { name: 'Speech', desc: 'Public Speaking' },
  ];

  activities.forEach((act, i) => {
    const aX = 40 + i * (actWidth + 8);
    doc.roundedRect(aX, currentY, actWidth, 42, 4).fillAndStroke(lightBg, borderLight);
    doc.fillColor(primaryNavy).font('Helvetica-Bold').fontSize(8.5).text(act.name, aX + 4, currentY + 10, { width: actWidth - 8, align: 'center' });
    doc.fillColor(textMuted).font('Helvetica').fontSize(7.5).text(act.desc, aX + 4, currentY + 24, { width: actWidth - 8, align: 'center' });
  });
  doc.restore();
  currentY += 54;

  // 7. LANGUAGES KNOWN
  currentY = drawSectionTitle('Languages Known', currentY, cyanAccent);
  doc.save();
  const langWidth = (contentWidth - 12) / 2;
  // Tamil
  doc.roundedRect(40, currentY, langWidth, 34, 4).fillAndStroke(lightBg, borderLight);
  doc.fillColor(primaryNavy).font('Helvetica-Bold').fontSize(9).text('Tamil', 52, currentY + 7);
  doc.fillColor(textMuted).font('Helvetica').fontSize(8).text('Mother Tongue  •  Native Proficiency (Speak, Read, Write)', 52, currentY + 19);

  // English
  doc.roundedRect(40 + langWidth + 12, currentY, langWidth, 34, 4).fillAndStroke(lightBg, borderLight);
  doc.fillColor(primaryNavy).font('Helvetica-Bold').fontSize(9).text('English', 40 + langWidth + 24, currentY + 7);
  doc.fillColor(textMuted).font('Helvetica').fontSize(8).text('Professional Working Proficiency (Speak, Read, Write)', 40 + langWidth + 24, currentY + 19);
  doc.restore();
  currentY += 46;

  // 8. PERSONAL PROFILE DETAILS
  currentY = drawSectionTitle('Personal Profile', currentY, indigoAccent);
  doc.save();
  doc.roundedRect(40, currentY, contentWidth, 128, 6).fillAndStroke(lightBg, borderLight);

  const leftDetails = [
    { label: "Father's Name", val: 'Devaraj R' },
    { label: 'Date of Birth', val: '5th July 2002' },
    { label: 'Gender', val: 'Female' },
    { label: 'Marital Status', val: 'Single' },
  ];

  const rightDetails = [
    { label: 'Nationality', val: 'Indian' },
    { label: 'Religion', val: 'Hindu' },
    { label: 'Permanent Address', val: '2/227 Periyagaram vill & po,\nThirupattur (Dt) - 635901' },
  ];

  let dY = currentY + 12;
  leftDetails.forEach(d => {
    doc.fillColor(textMuted).font('Helvetica-Bold').fontSize(8.5).text(d.label + ':', 54, dY, { width: 95 });
    doc.fillColor(textDark).font('Helvetica').fontSize(8.5).text(d.val, 150, dY);
    dY += 20;
  });

  dY = currentY + 12;
  rightDetails.forEach((d, idx) => {
    doc.fillColor(textMuted).font('Helvetica-Bold').fontSize(8.5).text(d.label + ':', 40 + halfW + 12, dY, { width: 100 });
    doc.fillColor(textDark).font('Helvetica').fontSize(8.5).text(d.val, 40 + halfW + 115, dY, { lineGap: 2 });
    dY += idx === 2 ? 30 : 20;
  });
  doc.restore();
  currentY += 140;

  // 9. DECLARATION
  currentY = drawSectionTitle('Declaration', currentY, emeraldAccent);
  doc.save();
  doc.roundedRect(40, currentY, contentWidth, 90, 6).fillAndStroke('#ffffff', borderLight);

  doc.fillColor(textDark)
     .font('Helvetica-Oblique')
     .fontSize(9)
     .text(
       '"I hereby declare that the information furnished above is true to the best of my knowledge."',
       54,
       currentY + 12,
       { width: contentWidth - 28, align: 'left' }
     );

  // Meta: Place & Date
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(textMuted).text('Place:', 54, currentY + 44, { continued: true });
  doc.font('Helvetica').fillColor(textDark).text(' Thirupattur');

  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(textMuted).text('Date:', 54, currentY + 60, { continued: true });
  doc.font('Helvetica').fillColor(textDark).text(' ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));

  // Signature Block
  const sigX = pageWidth - 190;
  doc.font('Helvetica').fontSize(8.5).fillColor(textMuted).text('Yours Sincerely,', sigX, currentY + 36);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryNavy).text('(JAYASUDHA.D)', sigX, currentY + 64);
  doc.restore();

  // Page 2 Footer
  doc.font('Helvetica').fontSize(8).fillColor('#94a3b8')
     .text('Page 2 of 2  •  Official Resume of D. Jayasudha (DCSE)', 40, pageHeight - 24, { width: contentWidth, align: 'center' });

  doc.end();

  stream.on('finish', () => {
    console.log(`Resume successfully generated at: ${outputPath}`);
    try {
      const { execSync } = require('child_process');
      execSync(`gs -sDEVICE=png16m -r150 -o public/resume-page-%d.png "${outputPath}"`);
      console.log('Generated resume page previews in public/');
    } catch (e) {
      // Optional fallback
    }
  });
}

const targetPath = process.argv[2] || path.join(__dirname, '../public/resume.pdf');
generateResume(targetPath);
