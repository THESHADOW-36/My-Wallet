import axios from 'axios';
import { Observable } from 'rxjs';

/**
 * Http post request
 * 
 * @param {string} url 
 * @param {{}} params 
 * @param {{}} [headers] 
 * @returns 
 */
const post = (url: string, paramsObj?: {}, headers?: {}) => {
   try {

      return new Observable((observer: any) => {
         const params = { ...paramsObj };
         // params['AppCode'] = '1';
         // params['SelectedLanguage'] = selectedLanguage.toLowerCase();
         axios.post(url, params, headers)
            .then((response) => {
               observer.next(response);
               observer.complete();
            })
            .catch((error) => {
               if (error && error.response && error.response.status === 401) {
                  //    refreshToken('post', url, params).subscribe(
                  //       res => {
                  //          observer.next(res);
                  //          observer.complete();
                  //       }, err => {
                  //          observer.error(err);
                  //          observer.complete();
                  //       }
                  //    )
                  // } else {
                  //    observer.error(error);
                  //    observer.complete();
                  console.log("Axios Error - ", error)
               }
            }
            )
      })
   } catch (err) {
      // console.log('catch err', err)
   }
};


/**
 * Http get request
 * 
 * @param {string} url 
 * @param {{}} params 
 * @param {{}} [headers] 
 * @param {*} [cancelToken] 
 * @returns 
 */
const get = (url: string, paramsObj?: {}, headers?: {}, cancelToken?: any) => {
   try {
      return new Observable((observer: any) => {
         const params = { ...paramsObj };
         //   params['AppCode'] = '1';
         //   params['SelectedLanguage'] = selectedLanguage.toLowerCase();
         const _params = cancelToken ? { params: params, headers, cancelToken: cancelToken } : { params: params, headers };
         axios.get(url, _params)
            .then((response) => {
               observer.next(response);
               observer.complete();
            })
            .catch((error) => {
               if (error && error.response && error.response.status === 401) {
                  //   refreshToken('get', url, params).subscribe(
                  //       res => {
                  //           observer.next(res);
                  //           observer.complete();
                  //       }, err => {
                  //           observer.error(err);
                  //           observer.complete();
                  //       }
                  //   )
                  console.log("Axios Error - ", error)
               } else {
                  observer.error(error);
                  observer.complete();
               }
            }
            )
      });
   } catch (err) {
      // console.log('catch err', err)
   }
}

export const API = {
   // post,
   get,
   // put,
   // deleteApi,
   // getisalive
};

