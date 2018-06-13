import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Rx';
import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {

  constructor(public http: Http) {
  }

  //post
  private apiUrlLogin = 'http://clubook.club/api/user/auth';
  private apiUrlRegister = 'http://clubook.club/api/user/register';
  private apiUrlGetInfo = 'http://clubook.club/api/user/getinfo';
  private apiUrlUpdateNickName = 'http://clubook.club/api/user/change_nickname';
  private apiUrlCreateClub = 'http://clubook.club/api/community/create';
  private apiUrlCircleClub = 'http://clubook.club/api/circle/create';
  private apiUrlWriteArticle ="http://clubook.club/api/article/create"
  //get
  private apiGetClubList="http://clubook.club/api/community";
  private apiGetClub ="http://clubook.club/api/community/";
  private apiGetCircleList ="http://clubook.club/api/circle";
  private apiGetCircle = "http://clubook.club/api/circle/";
  private apiGetMyGroups ="http://clubook.club/api/user/mygroups";
  private apiGetClubJoin ="http://clubook.club/api/community/join/";
  private apiGetCircleJoin = "http://clubook.club/api/circle/join/";

  writeArticle(token,title,body,to){
    let headers = new Headers({
      Authorization: "Bearer " + token
    });
    return this.postUrlReturn(this.apiUrlWriteArticle, {
      "title": title,
      "body": body,
      "to":to
    }, headers);
  }
  
  joinClub(token,id){
    let headers = new Headers({
      Authorization: "Bearer " + token
    });
    return this.getUrlReturn(this.apiGetClubJoin+id,headers);
  }

  joinCircle(token, id) {
    let headers = new Headers({
      Authorization: "Bearer " + token
    });
    return this.getUrlReturn(this.apiGetCircleJoin + id,headers);
  }
  
  getMyGroups(token){
    let headers = new Headers({
      Authorization: "Bearer " + token
    });
    return this.getUrlReturn(this.apiGetMyGroups,headers);
  }

  createCircle(token, name, brief): Observable<string[]> {
    let headers = new Headers({
      Authorization: "Bearer " + token
    });
    return this.postUrlReturn(this.apiUrlCircleClub, {
      "name": name,
      "brief": brief
    }, headers);
  }

  getCircleList(): Observable<string[]> {
    return this.getUrlReturn(this.apiGetCircleList);
  }

  getCircleById(id): Observable<string[]> {
    return this.getUrlReturn(this.apiGetCircle + id);
  }

  createClub(token, name, brief): Observable<string[]>{
    let headers = new Headers({
      Authorization: "Bearer " + token
    });
    return this.postUrlReturn(this.apiUrlCreateClub, {
      "name": name,
      "brief": brief
    }, headers);
  }
  
  getClubList(): Observable<string[]>{
    return this.getUrlReturn(this.apiGetClubList);
  }

  getClubById(id): Observable<string[]>{
    return this.getUrlReturn(this.apiGetClub+id);
  }

  /**
   * 根据用户id获取用户信息
   * 
   * @param {any} nickname 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserInfo(token): Observable < string[] > {
    let headers = new Headers({
      Authorization: "Bearer " + token
    });
    return this.getUrlReturn(this.apiUrlGetInfo, headers);
  }

  updateNickName(nickname,token): Observable < string[] > {
    let headers = new Headers({
      Authorization: "Bearer " + token
    });
    return this.postUrlReturn(this.apiUrlUpdateNickName, {
      "nickname": nickname
    },headers);
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
  register(name, password, email,nickname): Observable < string[] > {
    return this.postUrlReturn(this.apiUrlRegister, {
      "name": name,
      "password": password,
      "email": email,
      "nickname": nickname
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
  private postUrlReturn(url: string, body: any,headers?:Headers): Observable < string[] > {
    let opitins = new RequestOptions({
      headers: headers
    });
    return this.http.post(url, body, opitins)
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
  private getUrlReturn(url: string, headers?:Headers ): Observable < string[] > {
    let opitins = new RequestOptions({
      headers: headers
    });
    return this.http.get(url, opitins)
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
    //console.log(1);
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || "";
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
