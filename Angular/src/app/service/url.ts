import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CustomService {
  constructor(private http: HttpClient) {}

  public callCustomURL(): Observable<any> {
    const customUrl = 'https://192.168.1.186';

    // Make the API call using HttpClient
    return this.http.get<any>(customUrl);
  }
}