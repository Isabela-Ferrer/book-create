// PDFGenerator.js
import jsPDF from 'jspdf'; // Replace with the path to your first image
import { narrationToStory } from './StoryPages';
import { createURLS } from './ImageUrl';
import girlCover from './images/girlcover.png'
import boyCover from './images/boycover.png'
import {font} from "./Font"

const PDFGenerator = (childName, gender, storyList, callback) => {

     // Create images based on text
    //imageList = await createURLS(textlist);

    const pdf = new jsPDF({ orientation: 'l', format: "a4"});
    pdf.addFileToVFS("ComingSoon-Regular.ttf", font)
    pdf.addFont("ComingSoon-Regular.ttf", 'CustomFont', 'normal');
    pdf.setFont('CustomFont');
    pdf.setTextColor(204, 0, 102);
    pdf.setFontSize(100);
    const center = pdf.internal.pageSize.width/2

    function coverPage(girlOrBoy, name) {
        if (girlOrBoy === "niña") {
            pdf.addImage(girlCover, 'JPEG', 0, 0, 297, 210);
        } else {
            pdf.setTextColor(255, 128, 0)
            pdf.addImage(boyCover, 'JPEG', 0, 0, 297, 210);
        }
; // Parameters: image data, format, x, y, width, height
        // Add text to the first page
        const childname = name;
        pdf.text(childname, center, 90, "center");
    } 
    coverPage(gender, childName)

    function newPage(text) {
        pdf.addPage();
        //pdf.addImage(image, 'JPEG', 0, 0, 297, 210);
        pdf.setFontSize(35);
        const maxWidth = pdf.internal.pageSize.width - 40; // Adjust the width as needed
        const lineHeight = 20; // Adjust this value for the desired spacing
        const textLines = pdf.splitTextToSize(text, maxWidth);

        // Calculate the total height of the text block
        const totalHeight = lineHeight * textLines.length;

        // Calculate the starting Y position to center the text block
        const startY = (pdf.internal.pageSize.height - totalHeight) / 2;

        // Add each line of text to the page
        textLines.forEach((line, index) => {
            const textY = startY + index * lineHeight;
            pdf.text(line, pdf.internal.pageSize.width / 2, textY, { align: 'center' });
        });
    }

        // Loop through textList and imageList to create pages
    for (let i = 0; i < storyList.length; i++) {
       newPage(storyList[i]);
    }

        pdf.save('generated_pdf_with_multiple_pages.pdf');

        if (typeof callback === "function") {
            callback();
        }
};


export {PDFGenerator}
