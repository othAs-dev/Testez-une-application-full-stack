import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {expect} from '@jest/globals';

import {RegisterComponent} from './register.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {NgZone} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {mockRegisterRequest, mockSessionInformation} from "../../../../../mock-data";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [AuthService],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    httpMock = TestBed.inject(HttpTestingController);
    jest.spyOn(router, 'navigate');
    fixture.detectChanges();
  });


  afterEach(() => httpMock.verify());


  it('should create the register component', () => {
    expect(component).toBeTruthy();
    expect(component.onError).toBe(false);
    expect(component.form.dirty).toBe(false);
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBe(true);
  });

  it(`should call AuthService.login with correct parameter
      and navigate to /sessions when login flow is successful`, () => {

    component.form.setValue(mockRegisterRequest);
    fixture.detectChanges();

    expect(component.form.valid).toBe(true);
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBe(false);

    ngZone.run(() => {
      component.submit();

      const req = httpMock.expectOne('api/auth/register');
      expect(req.request.body).toEqual(mockRegisterRequest);
      req.flush(mockSessionInformation);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  it('should set onError to true on failed login attempt', () => {
    component.form.setValue(mockRegisterRequest);
    fixture.detectChanges();

    ngZone.run(() => {
      component.submit();
      const req = httpMock.expectOne('api/auth/register');
      req.flush('Error', { status: 500, statusText: 'Server Error' })
      fixture.detectChanges();

      expect(component.onError).toBe(true);
      const errorMessage = fixture.debugElement.nativeElement.querySelector('.error');
      expect(errorMessage.textContent).toContain('An error occurred');
    });
  });
});
