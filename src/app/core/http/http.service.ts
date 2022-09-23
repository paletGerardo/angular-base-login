import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimeoutError } from 'rxjs/internal/util/TimeoutError';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Utils } from "../util/utils";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../errors/error-dialog/error-dialog.component";

export interface DialogErrorConfig {
  showDialog?: boolean,
  title?: string,
  body?: string,
  footer?: string,
  button1?: string,
  button2?: string,

}

export interface HttpClientOptions {
	headers?: { [key: string]: string | number | null } | null;
	params?: { [key: string]: string | number } | null;
	body?: { [key: string]: any } | null;
	config?: {
    dialog?: DialogErrorConfig
		bodyType?: 'json' | 'formData', // Default json
		retry?: number; // Default 0
	};
	responseType?: 'json' | 'text'; // Default 'json'
}

@Injectable()
export class HttpService {
	defaultOptions: HttpClientOptions;

	constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog
  ) {
		this.defaultOptions = {
			headers: {
				'content-Type': 'application/json; charset=utf-8',
        'user': `mimail@gmail.com`,
        'password': `admin`

			},
			params: {},
			body: {},
			config: {
				bodyType: 'json',
				retry: 0
			},
			responseType: 'json'
		};
	}

	public get<T>(resource: string, options?: HttpClientOptions): Observable<T> {
		return this.xhr('get', resource, options);
	}

	public post<T>(resource: string, options?: HttpClientOptions): Observable<T> {
		return this.xhr('post', resource, options);
	}

	public put<T>(resource: string, options?: HttpClientOptions): Observable<T> {
		return this.xhr('put', resource, options);
	}

	public delete<T>(resource: string, options?: HttpClientOptions): Observable<T> {
		return this.xhr('delete', resource, options);
	}

	public patch<T>(resource: string, options?: HttpClientOptions): Observable<T> {
		return this.xhr('patch', resource, options);
	}

  private showDialog( config: DialogErrorConfig | undefined ): void {
    this.dialog.open( ErrorDialogComponent, {
      width: '350px',
      data: config,
      restoreFocus: false
    } );
  }

  private returnError( msj: string, err: any ): void {
    throw new Error(msj + err.message);
  }

	private xhr<T>(method: string, resource: string, newOptions?: HttpClientOptions): Observable<T> {
		const options = this.prepareHttpClientOptions(this.defaultOptions, newOptions);
		// Si se envia "http" significa que es absoluta, de otra manera concatena la api con el resource
		const endpoint = resource.substring(0, 4) === 'http' ? resource : `${environment.url}${resource}`;
		return this.httpClient.request<T>(method, endpoint, options.optionsMerged)
		.pipe(
			timeout(environment.httpTimeout),
			retry(environment.retry),
			// @ts-ignore
			catchError((err: any, caught: Observable<any>): ObservableInput<any> => {
        let msj;
        let dialog: DialogErrorConfig = options.config.dialog;
        if (err instanceof TimeoutError) {
          msj= 'Error de timeout';
          this.showDialogOrThowError( dialog, msj, err );
        }
				if (err.status === 400) {
          msj= 'Error de Validación de datos, volver a intentar';
          this.showDialogOrThowError( dialog, msj, err );
				}
				if (err.status === 403) {
          msj= 'Forbidden, volver a intentar';
          this.showDialogOrThowError( dialog, msj, err );
				}
				if (err.status === 404) {
          msj= 'Bad request, recurso no encontrado';
          this.showDialogOrThowError( dialog, msj, err );
				}
				if (err.status === 429) {
          msj= 'Has sido bloqueado';
          this.showDialogOrThowError( dialog, msj, err );
				} else if (err.status === 500) {
          msj= 'Error en el servidor';
          this.showDialogOrThowError( dialog, msj, err );
				} else {
          msj= 'Error desconocido';
          this.showDialogOrThowError( dialog, msj, err );
				}
			})
		);
	}

  private showDialogOrThowError( dialog: DialogErrorConfig, msj: string, err: any ): void {
    dialog.body = msj;
    dialog.showDialog ?
      this.showDialog( dialog ) : this.returnError( msj, err );
  }

  /**
	 * Para borrar un header, enviar con value en `null`
	 */
	private setHeaders(optionsMerged: any) {
		let headers = new HttpHeaders();
		Object.keys(optionsMerged.headers).forEach((key) => {
			if (optionsMerged.headers[key] !== null) {
				headers = headers.append(key, optionsMerged.headers[key]);
			}
		});

		return headers;
	}

	private prepareHttpClientOptions(previousOptions: HttpClientOptions, newOptions?: HttpClientOptions): any {
		const optionsMerged: any = {};

		const options: HttpClientOptions = Utils.mergeDeep(previousOptions, newOptions);

		optionsMerged.headers = this.setHeaders(options);
		optionsMerged.params = options.params;
		if (options.config!.bodyType === 'json') {
			optionsMerged.body = Utils.isEmpty(options.body) ? undefined : options.body;
		} else {
			// just for formData, you need to send the reference, merged does not work
			if (newOptions!.body) {
				optionsMerged.body = newOptions!.body;
			}
		}
		optionsMerged.responseType = options.responseType;

		return {
			optionsMerged,
			config: options.config
		};
	}
}
