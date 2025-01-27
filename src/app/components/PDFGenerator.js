import React from 'react';
import jsPDF from 'jspdf';

const PDFGenerationForm = ({ doctorsNotes, symptoms, conditions, closingResponse }) => {
    const handleGeneratePDF = (event) => {
        if (event) event.preventDefault();
        
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        let yOffset = 20; // Initial Y position
        const lineHeight = 7;

        const addTitle = (title) => {
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, yOffset);
            yOffset += 8;
        };

        const addText = (text, size = 12, bold = false) => {
            doc.setFontSize(size);
            doc.setFont('helvetica', bold ? 'bold' : 'normal');

            const splitText = doc.splitTextToSize(text, pageWidth - margin * 2);
            splitText.forEach((line) => {
                if (yOffset + lineHeight > pageHeight - margin) {
                    doc.addPage();
                    yOffset = margin;
                }
                doc.text(line, margin, yOffset);
                yOffset += lineHeight;
            });
        };

        // 🏥 Doctor's Notes (Optional)
        if (doctorsNotes && doctorsNotes.trim() !== '') {
            addTitle("Doctor's Notes");
            addText(doctorsNotes);
            yOffset += 5;
        }

        // 🩺 Symptoms Section
        if (symptoms.length > 0) {
            addTitle("Reported Symptoms");
            symptoms.forEach(({ symptom, bodyPart }, index) => {
                addText(`${index + 1}. ${symptom} (${bodyPart})`, 12);
            });
            yOffset += 5;
        }

        // 📋 Possible Conditions Section
        if (conditions.length > 0) {
            addTitle("Possible Conditions");
            conditions.forEach((condition, index) => {
                addText(`${index + 1}. ${condition.name} - ${condition.severity}`, 12, true);
                addText(condition.description);
            });
            yOffset += 5;
        }

        // 🏁 Closing Response
        addTitle("Closing Response");
        addText(closingResponse);

        // 🏷 Page Numbers
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(`Page ${i} of ${pageCount}`, margin, pageHeight - 10);
        }

        // 🖨 Save the PDF
        doc.save('diagnosis.pdf');
    };

    return (
        <div className="px-6">
            <button
                type="button"
                onClick={handleGeneratePDF}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                Export PDF
            </button>
        </div>
    );
};

export default PDFGenerationForm;