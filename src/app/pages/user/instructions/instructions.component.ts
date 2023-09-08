import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  q_id: any;
  quiz: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.q_id = this._route.snapshot.params['q_id'];

    this._quiz.getQuiz(this.q_id).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in Loading Quiz Data !', 'error');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to start the quiz?',
      confirmButtonText: 'Start',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.q_id]);
      }
    });
  }
}
