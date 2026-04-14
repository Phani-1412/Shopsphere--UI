 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // ADD THIS
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ADD THIS
import { Auth } from './auth';
import { AuthService } from '../../Services/auth-service';
 
describe('Auth', () => {
  let component: Auth;
  let fixture: ComponentFixture<Auth>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [Auth],
      providers: [AuthService]
    }).compileComponents();
 
    fixture = TestBed.createComponent(Auth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 