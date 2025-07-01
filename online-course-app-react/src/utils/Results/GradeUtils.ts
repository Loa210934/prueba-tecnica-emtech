export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-blue-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreMessage = (score: number) => {
  if (score >= 80) return '¡Excelente! Tienes un conocimiento sólido';
  if (score >= 60) return '¡Bien! Tienes una base buena para continuar';
  if (score >= 40) return 'Buen comienzo, hay áreas para mejorar';
  return '¡Es un gran momento para empezar a aprender!';
};
