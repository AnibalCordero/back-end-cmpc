export const updateBookApiBodySchema = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      authorId: { type: 'number' },
      editorialId: { type: 'number' },
      genreId: { type: 'number' },
      price: { type: 'number' },
      available: { type: 'boolean' },
      file: { type: 'string', format: 'binary' },
    },
  },
}