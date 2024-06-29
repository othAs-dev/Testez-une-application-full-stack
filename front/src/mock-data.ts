import { User } from "./app/interfaces/user.interface";
import { SessionInformation } from "./app/interfaces/sessionInformation.interface";
import { LoginRequest } from "./app/features/auth/interfaces/loginRequest.interface";
import {Teacher} from "./app/interfaces/teacher.interface";
import {RegisterRequest} from "./app/features/auth/interfaces/registerRequest.interface";
import {Session} from "./app/features/sessions/interfaces/session.interface";

export const mockAdmin: User = {
  id: 1,
  email: "admin@studio.com",
  firstName: "John",
  lastName: "Doe",
  admin: true,
  password: "test!1234",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUser: User = {
  ...mockAdmin,
  id: 2,
  email: "guest@studio.com",
  firstName: "Joe",
  lastName: "Dohn",
  admin: false,
  password: "test!4321",
  createdAt: new Date(),
  updatedAt: new Date(),
};


export const mockTeacher: Teacher = {
  id: 1,
  firstName: "Albert",
  lastName: "Einstein",
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockTeachers: Teacher[] = [
  mockTeacher,
  {
    id: 2,
    firstName: "Isaac",
    lastName: "Newton",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

export const mockSessionInformation: SessionInformation = {
  id: 1,
  admin: true,
  token: "token",
  type: "Bearer",
  username: "MoAli",
  firstName: "Mohammed",
  lastName: "Ali",
}
export const mockLoginRequest: LoginRequest = {
  email: "guest@studio.com",
  password: "test!4321"
}

export const mockRegisterRequest: RegisterRequest = {
  email: "guest2@studio.com",
  password: "test!4321",
  firstName: "John",
  lastName: "Cena"
}

export const mockSession: Session = {
  id: 1,
  name: 'Test Session',
  date: new Date(),
  users: [],
  teacher_id: 1,
  description: 'This is a test session',
  createdAt: new Date(),
  updatedAt: new Date()
};

