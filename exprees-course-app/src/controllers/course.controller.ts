import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/courses.schema';
import { User } from '../models/user';
import { statuses } from '../constants/statuses';
import {
  AssessmentGlobalResults,
  AssessmentResults,
} from '../models/answers.schema';
export default {
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = parseInt(req.params.limit, 10) || undefined;
      const result = await Course.find({}, null, { limit }).lean();
      if (!result || result.length === 0) {
        res.status(statuses.NOTFOUND).json({ msg: 'Cursos no encontrados.' });
        return;
      }
      res.status(statuses.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await Course.findById(req.params.id).lean();
      if (!result) {
        res.status(statuses.NOTFOUND).json({ msg: 'Curso no encontrado.' });
        return;
      }
      res.status(statuses.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
  async mine(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('qwe');
    try {
      const userId = req.user._id;
      const pipeline = [
        {
          $match: {
            _id: userId,
          },
        },
        {
          $unwind: {
            path: '$courses',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'courses.course',
            foreignField: '_id',
            as: 'courseDetails',
          },
        },
        {
          $unwind: {
            path: '$courseDetails',
          },
        },
        {
          $project: {
            _id: '$courseDetails._id',
            title: '$courseDetails.title',
            description: '$courseDetails.description',
            instructor: '$courseDetails.instructor',
            price: '$courseDetails.price',
            originalPrice: '$courseDetails.originalPrice',
            rating: '$courseDetails.rating',
            students: '$courseDetails.students',
            duration: '$courseDetails.duration',
            lessons: '$courseDetails.lessons',
            level: '$courseDetails.level',
            category: '$courseDetails.category',
            image: '$courseDetails.image',
            tags: '$courseDetails.tags',
            progress: '$courses.progress',
            completedLessons: '$courses.completedLessons',
            lastAccessed: '$courses.lastAccessed',
            status: '$courses.status',
            nextLesson: '$courses.nextLesson',
          },
        },
      ];
      const enrolledCourses = await User.aggregate(pipeline);

      if (!enrolledCourses) {
        res.status(404).json({ msg: 'Cursos no encontrados.' });
        return;
      }

      res.status(statuses.OK).json(enrolledCourses);
    } catch (error) {
      next(error);
    }
  },
  async saveAnswers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body as AssessmentGlobalResults;
      const courseDataToSave = {
        ...data,
        studentId: req.user._id,
      };

      const result = await AssessmentResults.create(courseDataToSave);

      res.status(statuses.OK).json({
        msg: 'Progreso actualizado con éxito.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  async setupCourses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const courses = [
        {
          title: 'Desarrollo Web Full Stack con React y Node.js',
          description:
            'Aprende a crear aplicaciones web completas desde cero con las tecnologías más demandadas del mercado.',
          instructor: 'María González',
          price: 89.99,
          originalPrice: 129.99,
          rating: 4.8,
          students: 2847,
          duration: '42 horas',
          lessons: 156,
          level: 'Intermedio',
          category: 'Desarrollo Web',
          image: 'https://picsum.photos/300/200',
          tags: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
        },
        {
          title: 'Diseño UX/UI con Figma',
          description:
            'Domina los principios del diseño de experiencia de usuario y crea interfaces atractivas y funcionales.',
          instructor: 'Carlos Ruiz',
          price: 69.99,
          originalPrice: 99.99,
          rating: 4.9,
          students: 1923,
          duration: '28 horas',
          lessons: 89,
          level: 'Principiante',
          category: 'Diseño',
          image: 'https://picsum.photos/300/200',
          tags: ['Figma', 'UX', 'UI', 'Prototipado'],
        },
        {
          title: 'Python para Data Science',
          description:
            'Aprende análisis de datos, machine learning y visualización con Python y sus librerías más populares.',
          instructor: 'Ana Martínez',
          price: 94.99,
          originalPrice: 149.99,
          rating: 4.7,
          students: 3156,
          duration: '55 horas',
          lessons: 203,
          level: 'Intermedio',
          category: 'Data Science',
          image: 'https://picsum.photos/300/200',
          tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
        },
        {
          title: 'Marketing Digital y Redes Sociales',
          description:
            'Estrategias efectivas para hacer crecer tu negocio en el mundo digital y redes sociales.',
          instructor: 'Luis Fernández',
          price: 59.99,
          originalPrice: 89.99,
          rating: 4.6,
          students: 4521,
          duration: '35 horas',
          lessons: 124,
          level: 'Principiante',
          category: 'Marketing',
          image: 'https://picsum.photos/300/200',
          tags: ['SEO', 'SEM', 'Social Media', 'Analytics'],
        },
        {
          title: 'Desarrollo de Apps Móviles con React Native',
          description:
            'Crea aplicaciones móviles nativas para iOS y Android usando React Native y JavaScript.',
          instructor: 'Pedro Sánchez',
          price: 79.99,
          originalPrice: 119.99,
          rating: 4.5,
          students: 1687,
          duration: '38 horas',
          lessons: 142,
          level: 'Avanzado',
          category: 'Desarrollo Móvil',
          image: 'https://picsum.photos/300/200',
          tags: ['React Native', 'Mobile', 'iOS', 'Android'],
        },
        {
          title: 'Fotografía Digital Profesional',
          description:
            'Técnicas avanzadas de fotografía digital, composición, iluminación y edición profesional.',
          instructor: 'Laura Torres',
          price: 74.99,
          originalPrice: 109.99,
          rating: 4.8,
          students: 2234,
          duration: '31 horas',
          lessons: 98,
          level: 'Intermedio',
          category: 'Fotografía',
          image: 'https://picsum.photos/300/200',
          tags: ['Fotografía', 'Lightroom', 'Photoshop', 'Composición'],
        },
      ];
      await Course.insertMany(courses);
      res
        .status(statuses.CREATED)
        .json({ msg: 'Cursos de ejemplo creados con éxito.' });
    } catch (error) {
      next(error);
    }
  },
};
