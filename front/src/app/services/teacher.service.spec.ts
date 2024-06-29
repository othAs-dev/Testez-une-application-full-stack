import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {mockTeacher, mockTeachers} from "../../mock-data";
import {Teacher} from "../interfaces/teacher.interface";

describe('TeacherService', () => {
  let service: TeacherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [TeacherService]
    });
    service = TestBed.inject(TeacherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  describe('get all teachers', () => {
    it('should get all teachers and return an Observable<Teacher[]>', async () => {
      service.all().subscribe(teachers => expect(teachers).toEqual(mockTeachers));
      const req = httpMock.expectOne('api/teacher');
      expect(req.request.method).toBe('GET');
      req.flush(mockTeachers);
    });
  })

  describe('get teacher by id', () => {
    it('should get a teacher by it id and return an Observable<Teacher>', async () => {
      const id = mockTeacher.id.toString();
      service.detail(id).subscribe(teacher => expect(teacher).toEqual(mockTeacher));
      const req = httpMock.expectOne(`api/teacher/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTeacher);
    });
  });
});
