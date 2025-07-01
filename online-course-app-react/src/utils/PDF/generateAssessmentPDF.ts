import type { AssessmentGlobalResults } from '@/types/Courses/AssessmentsTypes';
import type { MinimalCourseDisplay } from '@/types/Courses/CourseType';
import { jsPDF } from 'jspdf';

export const generateAssessmentPDF = async ({
  assessment,
  recommendations,
  courseTitle,
}: {
  assessment: AssessmentGlobalResults;
  recommendations: MinimalCourseDisplay[];
  courseTitle?: string;
}) => {
  const doc = new jsPDF();

  // Configuraciones iniciales
  doc.setFont('helvetica');
  const lineHeight = 8;
  let y = 30;

  // Título principal
  doc.setFontSize(18);
  doc.setTextColor(33, 37, 41); // gris oscuro
  doc.text('Reporte de Assessment - EduTech Open', 20, y);
  y += 10;

  if (courseTitle) {
    doc.setFontSize(14);
    doc.text(`Curso: ${courseTitle}`, 20, y);
    y += 10;
  }

  // Información del estudiante
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Información del Estudiante', 20, y);
  y += lineHeight;

  doc.setFontSize(12);
  doc.text(`Nombre: ${assessment.studentData.name}`, 20, y);
  y += lineHeight;
  doc.text(`Email: ${assessment.studentData.email}`, 20, y);
  y += lineHeight;
  doc.text(
    `Fecha: ${new Date(assessment.completedAt).toLocaleDateString()}`,
    20,
    y,
  );
  y += lineHeight * 2;

  // Resultados
  doc.setFontSize(14);
  doc.text('Resultados del Assessment', 20, y);
  y += lineHeight;

  doc.setFontSize(12);
  doc.text(`Puntuación: ${assessment.score}/100`, 20, y);
  y += lineHeight;
  doc.text(
    `Respuestas correctas: ${assessment.correctAnswers}/${assessment.totalQuestions}`,
    20,
    y,
  );
  y += lineHeight * 2;

  // Recomendaciones
  if (recommendations.length > 0) {
    doc.setFontSize(14);
    doc.text('Cursos Recomendados', 20, y);
    y += lineHeight;

    doc.setFontSize(11);
    recommendations.forEach((course, index) => {
      if (y > 260) {
        doc.addPage();
        y = 30;
      }

      doc.setFont('', 'bold');
      doc.text(`${index + 1}. ${course.title}`, 20, y);
      y += lineHeight;

      doc.setFont('', 'normal');
      doc.text(`Nivel: ${course.level} | Duración: ${course.duration}`, 25, y);
      y += lineHeight;

      const lines = doc.splitTextToSize(course.description, 160);
      doc.text(lines, 25, y);
      y += lines.length * lineHeight + 4;
    });
  } else {
    doc.setFontSize(12);
    doc.text('No se generaron recomendaciones personalizadas.', 20, y);
  }

  // Descargar
  doc.save(`assessment-report-${assessment.studentData.name}.pdf`);
};
