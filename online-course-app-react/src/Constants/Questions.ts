import type { QuestionType } from '@/types/Courses/Questions';

export const questions: QuestionType[] = [
  {
    id: 1,
    question: '¿Qué significa HTML?',
    options: [
      'Hypertext Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlink and Text Markup Language',
    ],
    correct: 0,
    category: 'HTML',
  },
  {
    id: 2,
    question: '¿Cuál es la forma correcta de aplicar CSS a un elemento HTML?',
    options: [
      'Con el atributo style',
      'Con una hoja de estilos externa',
      'Con una etiqueta <style> en el head',
      'Todas las anteriores son correctas',
    ],
    correct: 3,
    category: 'CSS',
  },
  {
    id: 3,
    question: '¿Qué tipo de dato devuelve typeof null en JavaScript?',
    options: ['null', 'undefined', 'object', 'boolean'],
    correct: 2,
    category: 'JavaScript',
  },
  {
    id: 4,
    question: '¿Cuál es la diferencia entre let y var en JavaScript?',
    options: [
      'No hay diferencia',
      'let tiene scope de bloque, var tiene scope de función',
      'var es más moderno que let',
      'let solo se puede usar en funciones',
    ],
    correct: 1,
    category: 'JavaScript',
  },
  {
    id: 5,
    question: '¿Qué etiqueta HTML se usa para crear un enlace?',
    options: ['<link>', '<a>', '<href>', '<url>'],
    correct: 1,
    category: 'HTML',
  },
  {
    id: 6,
    question: '¿Cuál es la propiedad CSS para cambiar el color de fondo?',
    options: ['color', 'background-color', 'bg-color', 'background'],
    correct: 1,
    category: 'CSS',
  },
  {
    id: 7,
    question:
      '¿Qué método se usa para agregar un elemento al final de un array en JavaScript?',
    options: ['add()', 'append()', 'push()', 'insert()'],
    correct: 2,
    category: 'JavaScript',
  },
  {
    id: 8,
    question: '¿Cuál es la estructura básica de un documento HTML5?',
    options: [
      '<!DOCTYPE html>',
      '<html>, <head>, <body>',
      'Declaración DOCTYPE y elementos html, head, body',
      'Solo las etiquetas <html> y <body>',
    ],
    correct: 2,
    category: 'HTML',
  },
  {
    id: 9,
    question: '¿Qué es CSS Grid?',
    options: [
      'Un framework de CSS',
      'Un sistema de layout bidimensional',
      'Una librería de JavaScript',
      'Un preprocesador de CSS',
    ],
    correct: 1,
    category: 'CSS',
  },
  {
    id: 10,
    question: '¿Cuál es la diferencia entre == y === en JavaScript?',
    options: [
      'No hay diferencia',
      '=== compara tipo y valor, == solo valor',
      '== es más estricto que ===',
      '=== solo funciona con números',
    ],
    correct: 1,
    category: 'JavaScript',
  },
];
