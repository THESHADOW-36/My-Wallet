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
               if (axios.isCancel(error)) {
                  observer.next(error.message);
                  observer.complete();
                  console.log('Request canceled:', error.message);
               } else if (error.response && error.response.status === 401) {
                  observer.next(error.message);
                  observer.complete();
               } else {
                  observer.error(error)
                  observer.complete();
               }
               // if (error && error.response && error.response.status === 401) {
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
               // }
            }
            )
      })
   } catch (err) {
      console.log('catch err', err);
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
         const _params = cancelToken ? { params, headers, cancelToken: cancelToken } : { params, headers };
         // console.log("_params :", _params)
         axios.get(url, _params)
            .then((response) => {
               observer.next(response.data);
               observer.complete();
            })
            .catch((error) => {
               if (axios.isCancel(error)) {
                  observer.next(error.message);
                  observer.complete();
                  console.log('Request canceled:', error.message);
               } else if (error.response && error.response.status === 401) {
                  console.log('Unauthorized:', error.response.data);
                  observer.error(error);
                  observer.complete();
               } else {
                  console.log('Axios Error:', error);
                  observer.error(error);
                  observer.complete();

                  // if (error && error.response && error.response.status === 401) {
                  //      refreshToken('get', url, params).subscribe(
                  //          res => {
                  //              observer.next(res);
                  //              observer.complete();
                  //          }, err => {
                  //              observer.error(err);
                  //              observer.complete();
                  //          }
                  //      )
                  //    console.log("Axios Error - ", error)
                  // } else {
                  //    observer.error(error);
                  //    observer.complete();
               }
            }
            )
      })
   } catch (err) {
      console.log('catch err', err);
   }
}

export const API = {
   post,
   get,
   // put,
   // deleteApi,
   // getisalive
};

