export const notAdminUser = {
  id: 1,
  email: 'user@studio.com',
  lastName: 'lastName',
  firstName: 'firstName',
  admin: false,
  createdAt: '2023-04-10T00:00:00',
  updatedAt: '2023-04-10T00:00:00',
}

export const adminUser = {
  id: 1,
  username: 'JohnDoe',
  firstName: 'John',
  lastName: 'Doe',
  admin: true
}

export const firstSession = {
  id: 1,
  name: 'Insane Yoga Session',
  description: 'Hard level',
  date: '2023-09-14T00:00:00.000+00:00',
  teacher_id: 1,
}

export const secondSession = {
  id: 1,
  name: 'Easy Yoga Session',
  description: 'Easy level',
  date: '2023-09-16T00:00:00.000+00:00',
  teacher_id: 1
}

export const teacher =  { id: 1, firstName: 'Jean', lastName: 'Dubois' }
