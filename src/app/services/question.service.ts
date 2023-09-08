import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  // Getting questions
  public getQuestionsOfQuiz(q_id: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${q_id}`);
  }

  // Getting questions for test
  public getQuestionsOfQuizForTest(q_id: any) {
    return this._http.get(`${baseUrl}/question/quiz/${q_id}`);
  }

  // Adding Questions
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  // Delete Question
  public deleteQuestion(question_Id: any) {
    return this._http.delete(`${baseUrl}/question/${question_Id}`);
  }
}
