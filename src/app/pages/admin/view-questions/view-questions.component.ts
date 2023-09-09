import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  q_id: any;
  qTitle: any;
  questions = [
    {
      ques_Id: 0,
      content: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      answer: '',
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.q_id = this._route.snapshot.params['q_id'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.q_id).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // delete question
  deleteQuestion(q_id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you Sure? \n You want to delete this question?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete
        this._question.deleteQuestion(q_id).subscribe(
          (data: any) => {
            this.questions = this.questions.filter((q) => q.ques_Id != q_id);
            Swal.fire('Success !!', 'Question Deleted !!', 'success');
          },
          (error: any) => {
            console.log(error);
            Swal.fire('Error !!', 'Error deleting Question !!', 'error');
          }
        );
      }
    });
  }
}
