type MethodType =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

type CredentialsType = 'include' | 'omit' | 'same-origin' | undefined;

interface ApiInit<B = string> {
  method?: MethodType;
  headers?: Record<string, string>;
  body?: B;
  credentials?: CredentialsType;
}

interface ApiConfig<I = ApiInit> {
  readonly baseURL: string;
  readonly init?: I;
}

interface InstanceConfig {
  baseURL: string;
  withCredentials?: boolean;
  headers?: Record<string, string>;
}

export interface ApiInstance {
  get<R = unknown>(url?: string): Promise<R>;
  delete<R = unknown>(url?: string): Promise<R>;
  post<R = unknown>(url?: string, data?: Record<string, unknown>): Promise<R>;
  put<R = unknown>(url?: string, data?: Record<string, unknown>): Promise<R>;
}

export class Api implements ApiInstance {
  private readonly baseURL: string;

  private readonly init: ApiInit;

  protected constructor({ baseURL, init }: ApiConfig) {
    this.baseURL = baseURL;
    this.init = {
      method: 'GET',
      ...init,
    };
  }

  /** Factory */
  static create(instanceConfig: InstanceConfig): ApiInstance {
    const { baseURL, withCredentials, headers } = instanceConfig;

    const init: ApiInit = {};

    if (withCredentials) init.credentials = 'include';
    if (headers) init.headers = { ...headers };

    return new Api({
      baseURL,
      init: { ...init },
    });
  }

  private createMethod(options: ApiInit) {
    return async (url = '') => {
      const res = await fetch(`${this.baseURL}${url}`, options);

      if (!res.ok) {
        const message = `An error has occurred: ${res.status}`;
        throw new Error(message);
      }

      return res.json();
    };
  }

  async get<R = unknown>(url = ''): Promise<R> {
    const options: ApiInit = {
      ...this.init,
    };

    return this.createMethod(options)(url);
  }

  async delete<R = unknown>(url = ''): Promise<R> {
    const options: ApiInit = {
      ...this.init,
      method: 'DELETE',
    };

    return this.createMethod(options)(url);
  }

  async post<R = unknown>(url = '', data: Record<string, unknown>): Promise<R> {
    const options: ApiInit = {
      ...this.init,
      method: 'POST',
      headers: {
        ...this.init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return this.createMethod(options)(url);
  }

  async put<R = unknown>(url = '', data: Record<string, unknown>): Promise<R> {
    const options: ApiInit = {
      ...this.init,
      method: 'PUT',
      headers: {
        ...this.init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return this.createMethod(options)(url);
  }
}
