import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiCommonService } from './api-common.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

describe('ApiCommonService', () => {
  let service: ApiCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('должны вернуть объект с HttpParams', () => {
    const obj = { params: { foo: 'foo', bar: 'bar' } };
    const options = service.getApiRequestOptions(obj);
    expect(options?.params instanceof HttpParams).toBeTruthy();
    expect((options?.params as HttpParams).get('foo'))
      .withContext('Получаем параметер foo')
      .toEqual('foo');
  });
  // 'content-type', 'application/json'
  it('должны вернуть объект с HttpHeaders', () => {
    const obj = { headers: { 'content-type': 'application/fake' } };
    const options = service.getApiRequestOptions(obj);
    expect(options?.headers instanceof HttpHeaders).toBeTruthy();
    expect((options?.headers as HttpHeaders).get('content-type'))
      .withContext('Получаем параметер content-type')
      .toEqual('application/fake');
  });
});
