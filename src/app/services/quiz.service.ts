import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  // Add quiz function
  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  // Delete quiz Function
  public deleteQuiz(q_id: any) {
    return this._http.delete(`${baseUrl}/quiz/${q_id}`);
  }

  // getting Single Quiz
  public getQuiz(q_id: any) {
    return this._http.get(`${baseUrl}/quiz/${q_id}`);
  }

  // Update quiz function
  public updateQuiz(quiz: any) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  // Getting quizzes of category
  public getQuizzesOfCategory(c_Id: any) {
    return this._http.get(`${baseUrl}/quiz/category/${c_Id}`);
  }

  // Getting Active Quizzess
  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }
  // Getting
  public getActiveQuizzesOfCategory(c_Id: any) {
    return this._http.get(`${baseUrl}/quiz/category/active/${c_Id}`);
  }
}
