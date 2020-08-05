const fs = require('fs');
const PDFDocument = require('pdfkit');

class PDFGenerator {
  createWriteStream() {
    const writeStream = fs.createWriteStream(this.output);

    this.done = new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve();
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    });
    this.document.pipe(writeStream);
  }

  constructor() {
    this.contentWidth = 150;
    this.startX = 10;
    this.startY = 10;
    this.done;
    this.output = './doc_example.pdf';
    this.document = new PDFDocument({
      margins: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      size: [595, 842],
      bufferPages: true,
    });
    this.createWriteStream();
  }

  drawBug() {
    const textParts = ['Document name:', '"too___long____my___document____name"'];
    let seq = this.document.fontSize(9);

    // draw first part
    const fristArgs = [textParts[0], this.startX, this.startY];
    const firstOptions = { continued: true ,width: this.contentWidth };

    seq.fillColor('black');
    seq = seq.text.apply(seq, [...fristArgs, firstOptions]);

    // draw too long word
    const secondArgs = [textParts[1]];
    const secondOptions = { continued: false, width: this.contentWidth };

    seq.fillColor('#3583f7');
    seq = seq.text.apply(seq, [...secondArgs, secondOptions]);

    // draw this value without bug
    this.document.fontSize(9).fillColor('black').text(textParts.join(' '), this.startX, 40, { width: this.contentWidth })
    
  }

  drawBorder() {
    const endY = 60;

    // horizontal lines
    this.document.moveTo(this.startX, this.startY)
      .lineTo(this.startX + this.contentWidth, this.startY)
      .lineWidth(1)
      .strokeColor('black')
      .stroke();

    this.document.moveTo(this.startX, endY)
      .lineTo(this.startX + this.contentWidth, endY)
      .lineWidth(1)
      .strokeColor('black')
      .stroke();

    // vertical lines
    this.document.moveTo(this.startX, this.startY)
      .lineTo(this.startX, endY)
      .lineWidth(1)
      .strokeColor('black')
      .stroke();

    this.document.moveTo(this.startX + this.contentWidth, this.startY)
      .lineTo(this.startX + this.contentWidth, endY)
      .lineWidth(1)
      .strokeColor('black')
      .stroke();
  }

  async generate() {
    this.drawBorder();
    this.drawBug();

    this.document.end();
    await this.done;

    return this.output;
  }
}

function generatePDF() {
  console.log('start generate');
  const instance = new PDFGenerator();

  instance.generate()
    .then(() => console.log('Generation has been finished'));
}

generatePDF();