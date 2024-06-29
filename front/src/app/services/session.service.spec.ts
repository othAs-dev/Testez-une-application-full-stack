import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {mockLoginRequest, mockSessionInformation} from "../../mock-data";

describe('SessionService', () => {
  let service: SessionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionService]
    });
    service = TestBed.inject(SessionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  describe('logIn', () => {
    it('should log in a user and return void', async () => {
      service.logIn(mockSessionInformation);
      expect(service.isLogged).toBe(true);
      expect(service.sessionInformation).toEqual(mockSessionInformation);
    });
  });

  describe('logOut', () => {
    it('should log out a user and return void', async () => {
      service.logOut();
      expect(service.isLogged).toBe(false);
      expect(service.sessionInformation).toBeUndefined();
    });
  });
  describe('$isLogged', () => {
    it('should emit the correct initial isLogged state', (done) => {
      service.$isLogged().subscribe(value => {
        expect(value).toBe(false);
        done();
      });
    });

    it('should emit true when user logs in', (done) => {
      service.$isLogged().subscribe(value => {
        if (value) {
          expect(value).toBe(true);
          done();
        }
      });

      service.logIn(mockSessionInformation);
    });

    it('should emit false when user logs out', (done) => {
      service.logIn(mockSessionInformation);

      service.$isLogged().subscribe(value => {
        if (!value) {
          expect(value).toBe(false);
          done();
        }
      });

      service.logOut();
    });

    it('should emit correct sequence of states on logIn and logOut', (done) => {
      const expectedValues = [false, true, false];
      let index = 0;

      service.$isLogged().subscribe(value => {
        expect(value).toBe(expectedValues[index]);
        index++;
        if (index === expectedValues.length) {
          done();
        }
      });

      service.logIn(mockSessionInformation);
      service.logOut();
    });
  });
});
