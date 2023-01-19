import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapchaVerifyService {

  verifyCaptcha: any = null

  constructor() { }


  addRecaptchaScript(captcha: any) {
    window['grecaptchaCallback'] = () => {
      this.renderReCaptcha(captcha);
    }
    (function (d, s, id, obj) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptcha(captcha); return;}
      js = d.createElement(s) as HTMLImageElement; js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
  }


  renderReCaptcha(captcha:any) {
    window['grecaptcha'].render(captcha, {
      'sitekey': environment.siteKey,
      'callback': (response: any) => {
        this.verifyCaptcha = response;
      }
    });
  }

}
