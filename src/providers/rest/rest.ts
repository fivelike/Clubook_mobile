import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Rx';
import {
  Http,
  Response
} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    //console.log('Hello RestProvider Provider');
  }

  //post
  private apiUrlLogin = 'http://clubook.club/api/user/auth';
  private apiUrlRegister = 'http://clubook.club/api/user/register';
  private apiUrlGetInfo = 'http://clubook.club/api/user/getinfo';
  private apiUrlChangeNickName = 'http://clubook.club/api/user/change_nick_name';

  /**
   * 根据用户id获取用户信息
   * 
   * @param {any} nickname 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserInfo(userid): Observable < string[] > {
    return this.postUrlReturn(this.apiUrlGetInfo, {
      "userid": userid
    });
  }

  changeNickName(nickname): Observable < string[] > {
    return this.postUrlReturn(this.apiUrlChangeNickName, {
      "nickname": nickname
    })
  }
  /**
   * 根据用户名，密码，邮箱进行注册
   * 
   * @param {any} name 
   * @param {any} password 
   * @param {any} email 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  register(name, password, email): Observable < string[] > {
    return this,
    this.postUrlReturn(this.apiUrlRegister, {
      "name": name,
      "password": password,
      "email": email
    });
  }

  /**
   * 根据用户的邮箱和密码进行登陆
   * 
   * @param {any} name 
   * @param {any} password 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  login(name, password): Observable < string[] > {
    return this.postUrlReturn(this.apiUrlLogin, {
      "name": name,
      "password": password
    });
  }

  /**
   * 全局POST获取HTTP请求的方法
   * 
   * @private
   * @param {string} url 
   * @param {*} body 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private postUrlReturn(url: string, body: any): Observable < string[] > {
    return this.http.post(url, body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * 全局GET获取 HTTP 请求的方法
   * @fivelike
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable < string[] > {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * 处理接口返回的数据，处理成Json格式
   * 
   * @private
   * @param {Response} res 
   * @returns 
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    let body = res.json();
    //return JSON.parse(body) || {};
    return body;
  }

  /**
   * 处理请求中的错误，考虑了各种情况的错误处理并在console中显示error
   * 
   * @private
   * @param {(Response | any)} error 
   * @returns 
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || "";
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
