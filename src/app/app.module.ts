import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { FormAboutComponent } from './components/about/form-about/form-about.component';
import { CertificateItemComponent } from './components/certificate/certificate-item/certificate-item.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { FormCertificateComponent } from './components/certificate/form-certificate/form-certificate.component';
import { EducationItemComponent } from './components/education/education-item/education-item.component';
import { EducationComponent } from './components/education/education.component';
import { FormEducationComponent } from './components/education/form-education/form-education.component';
import { ExperienceFormComponent } from './components/experience/experience-form/experience-form.component';
import { ExperienceItemComponent } from './components/experience/experience-item/experience-item.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { interceptorProvider } from './components/interceptors/Interceptor.service';

import { FormInterestComponent } from './components/interests/form-interest/form-interest.component';
import { InterestsComponent } from './components/interests/interests.component';
import { NavComponent } from './components/nav/nav.component';

import { FormPersonComponent } from './components/person/form-person/form-person.component';
import { PersonComponent } from './components/person/person.component';
import { FormSkillComponent } from './components/skills/form-skill/form-skill.component';
import { SkillItemComponent } from './components/skills/skill-item/skill-item.component';
import { SkillsComponent } from './components/skills/skills.component';
import { FormSocialComponent } from './components/social-media/form-social/form-social.component';
import { SocialMediaItemComponent } from './components/social-media/social-media-item/social-media-item.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';



import { PageCentralComponent } from './page-central/page-central.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    PageCentralComponent,
    NavComponent,
    PersonComponent,
    FormPersonComponent,
    AboutComponent,
    FormAboutComponent,
    SocialMediaComponent,
    SocialMediaItemComponent,
    FormSocialComponent,
    EducationComponent,
    EducationItemComponent,
    FormEducationComponent,
    ExperienceComponent,
    ExperienceItemComponent,
    ExperienceFormComponent,
    SkillsComponent,
    SkillItemComponent,
    FormSkillComponent,
    InterestsComponent,
    FormInterestComponent,
    CertificateComponent,
    CertificateItemComponent,
    FormCertificateComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
