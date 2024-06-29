import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {mockUser} from "../../mock-data";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  describe('getById', () => {
    it('should get a user by it id and return an Observable<User>', async () => {
      const id = mockUser.id.toString();
      service.getById(id).subscribe(user => {
        expect(user).toEqual(mockUser);
      });
      const req = httpMock.expectOne(`api/user/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete a user and return an Observable<any>', async () => {
      const id = mockUser.id.toString();
      service.delete(id).subscribe();
      const req = httpMock.expectOne(`api/user/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({})
    });
  });
});
