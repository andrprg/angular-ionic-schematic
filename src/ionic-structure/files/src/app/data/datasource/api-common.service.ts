import { HttpClient, HttpParams, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkipLoading } from '../interceptors/loading.interceptor';

export interface ApiRequestOptions {
  params: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class ApiCommonService {
  constructor(private _http: HttpClient) { }

  /**
   * Получаем параметры запроса
   * @param объект типа Partial<ApiRequestOptions>
   * @returns
   */
  getApiRequestOptions(options?: { params: Record<string, string>; } | null): Partial<ApiRequestOptions> | undefined {
    if (!options) {
      return;
    }
    let params: HttpParams;
    if (options.params) {
      params = new HttpParams({ fromObject: options.params });
      return { ...options, params };
    }
    return;
  }

  /**
   * Gets http запрос
   * @param url
   * @param options
   * @returns get
   */
  get<T>(
    url: string,
    options?: { params: Record<string, string> } | null,
    skipLoading: boolean = false
  ): Observable<T> {
    return this._http.get<T>(
      url,
      {
        ...this.getApiRequestOptions(options),
        context: new HttpContext().set(SkipLoading, skipLoading),
      }
    );
  }

  /**
   * Posts http запрос
   * @param url
   * @param body
   * @param options
   * @returns
   */
  post<T>(
    url: string,
    body?: unknown | null,
    options?: { params: Record<string, string> },
    skipLoading: boolean = false
  ): Observable<T> {
    return this._http.post<T>(
      url,
      body ?? null,
      {
        ...this.getApiRequestOptions(options),
        context: new HttpContext().set(SkipLoading, skipLoading),
      }
    );
  }

  /**
   * Patch http запрос
   * @param url
   * @param body
   * @param options
   * @returns
   */
  patch<T>(
    url: string,
    body: unknown | null,
    options?: { params: Record<string, string> },
    skipLoading: boolean = false
  ): Observable<T> {
    return this._http.patch<T>(
      url,
      body,
      {
        ...this.getApiRequestOptions(options),
        context: new HttpContext().set(SkipLoading, skipLoading),
      });
  }

  /**
   * Put http запрос
   * @param url
   * @param body
   * @param options
   * @returns
   */
  put<T>(
    url: string,
    body: unknown | null,
    options?: { params: Record<string, string> },
    skipLoading: boolean = false
  ): Observable<T> {
    return this._http.put<T>(
      url,
      body,
      {
        ...this.getApiRequestOptions(options),
        context: new HttpContext().set(SkipLoading, skipLoading),
      }
    );
  }

  /**
   * Gets http запрос
   * @param url
   * @param options
   * @returns get
   */
  delete<T>(
    url: string,
    options?: { params: Record<string, string> },
    skipLoading: boolean = false
  ): Observable<T> {
    return this._http.delete<T>(
      url,
      {
        ...this.getApiRequestOptions(options),
        context: new HttpContext().set(SkipLoading, skipLoading),
      });
  }
}
