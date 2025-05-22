export const createBookApiBodySchema = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', example: 'El Principito' },
      authorId: { type: 'number', example: 1 },
      editorialId: { type: 'number', example: 1 },
      genreId: { type: 'number', example: 1 },
      price: { type: 'number', example: 10990 },
      available: { type: 'boolean', example: true },
      file: { type: 'string', format: 'binary' },
    },
    required: ['title', 'authorId', 'editorialId', 'genreId', 'price', 'available'],
  },
};