import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { MeComponent } from './me.component';
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user.interface";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { mockAdmin, mockUser } from "../../../mock-data";

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let userServiceMock: Partial<UserService>;
  let sessionServiceMock: Partial<SessionService>;
  let matSnackBarMock: Partial<MatSnackBar>;
  let routerMock = { navigate: jest.fn() };

  function setupUserServiceMock(user: User): Partial<UserService> {
    return {
      getById: jest.fn(() => of(user)),
      delete: jest.fn(() => of(null)),
    };
  }

  function setupSessionServiceMock(user: User): Partial<SessionService> {
    return {
      sessionInformation: {
        id: user.id,
        admin: user.admin,
        token: 'mockToken',
        type: 'mockType',
        username: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      logOut: jest.fn(),
      isLogged: true,
    };
  }

  async function setupTestBed(user: User) {
    userServiceMock = setupUserServiceMock(user);
    sessionServiceMock = setupSessionServiceMock(user);
    matSnackBarMock = {
      open: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [MatSnackBarModule, MatCardModule, MatIconModule, RouterTestingModule],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: MatSnackBar, useValue: matSnackBarMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('when user is an admin', () => {
    beforeEach(async () => await setupTestBed(mockAdmin));

    it('should display the admin data', () => expect(component.user).toEqual(mockAdmin));

    it('should not allow the admin to delete their account', () => {
      const buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
      const deleteButton = buttons.find(button =>
        (button as HTMLButtonElement).textContent?.includes('delete')
      );
      expect(deleteButton).toBeFalsy();
    });
  });

  describe('when user is a regular user', () => {
    beforeEach(async () => await setupTestBed(mockUser));

    it('should display the user data', () => expect(component.user).toEqual(mockUser));

    it('should display the delete button', () => {
      const buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
      const deleteButton = buttons.find(button =>
        (button as HTMLButtonElement).textContent?.includes('delete')
      );
      expect(deleteButton).toBeTruthy();
    });

    it('should delete the user account and navigate to home when the delete button is clicked', fakeAsync(() => {
      const snackBarSpy = jest.spyOn(matSnackBarMock, 'open');
      const deleteSpy = jest.spyOn(userServiceMock, 'delete');
      const logOutSpy = jest.spyOn(sessionServiceMock, 'logOut');
      const navigateSpy = jest.spyOn(routerMock, 'navigate');

      component.delete();
      tick();

      expect(deleteSpy).toHaveBeenCalledWith(mockUser.id.toString());
      expect(snackBarSpy).toHaveBeenCalledWith("Your account has been deleted !", 'Close', { duration: 3000 });
      expect(logOutSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    }));
  });

  it('should navigate back when back button is clicked', () => {
    const backSpy = jest.spyOn(window.history, 'back');
    component.back();
    expect(backSpy).toHaveBeenCalled();
  });
});
