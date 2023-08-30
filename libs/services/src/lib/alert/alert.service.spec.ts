import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

class MatSnackBarStub {
  open(): unknown {
    return {
      open: () => of({}),
    };
  }
}

describe('AlertService', () => {
  let service: AlertService;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [{ provide: MatSnackBar, useClass: MatSnackBarStub }],
    });

    service = TestBed.inject(AlertService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call open method', () => {
    jest.spyOn(matSnackBar, 'open');

    service.openSnackBar('message');
    expect(matSnackBar.open).toHaveBeenCalled();
  });
});
