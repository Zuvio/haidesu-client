import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, first, map, Observable} from "rxjs";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AlertService} from "../_alert/alert.service";
import {Alert, AlertType} from "../_alert/alert";

@Injectable({providedIn: "root"})
export class AccountService {

  // BehaviorSubject is a variant of Subject that requires an initial value and emits its current value whenever it is
  // subscribed to. This means that new subscribers to the BehaviorSubject get the previously emitted value as soon as
  // they subscribe.
  // A Subject is a special type of Observable that allows values to be multicasted to many Observers.
  // Subjects are like EventEmitters.
  // Every Subject is an Observable and an Observer. You can subscribe to a Subject, and you can call next to feed
  // values as well as error and complete.


  // userSubject is an Observable of User or null.
  // It gets filled from the localStorage 'user' or is null.
  // user is an Observable that gets the BehaviorSubject valu as Observable: User or null.
  // You can use accountservice DI to subscribe to the user Observable to perform actions.
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router,
              private http: HttpClient,
              private toastrService: ToastrService,
              public alertService: AlertService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/users/register`, user)
      .pipe(first());
  }
  login(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, {email, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }))
  }
  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    this.toastrService.info('You have been logged out', 'Success')
    this.alertService.addAlert(new Alert({title: 'Success', message: "You have been logged out", type: AlertType.Info}));
  }
}
