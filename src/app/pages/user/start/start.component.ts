import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  q_id: any;
  questions: any;

  marks_got = 0;
  correct_answers = 0;
  attempted = 0;

  is_submit = false;

  timer: any;
  total_time: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();

    this.q_id = this._route.snapshot.params['q_id'];

    this.loadQuestion();
  }
  loadQuestion() {
    return this._question.getQuestionsOfQuizForTest(this.q_id).subscribe(
      (data: any) => {
        this.questions = data;

        // Timer in seconds (2 min per question)
        this.total_time = this.questions.length * 2 * 60;
        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((q: any) => {
          q['given_answer'] = '';
        });

        this.start_timer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in Loading Quiz Questions !', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to submit the quiz?',
      confirmButtonText: 'Submit',
      showCancelButton: true,
    }).then((e) => {
      if (e.isConfirmed) {
        this.eval_quiz();
      }
    });
  }

  eval_quiz() {
    this.is_submit = true;
    // Calculation
    this.questions.forEach((q: any) => {
      if (q.given_answer == q.answer) {
        this.correct_answers++;
        let marks_single =
          this.questions[0].quiz.max_marks / this.questions.length;
        this.marks_got += marks_single;
      }

      if (q.given_answer.trim() != '') {
        this.attempted++;
      }
    });
  }

  start_timer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.eval_quiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  formatted_time() {
    let min = Math.floor(this.timer / 60);
    let sec = this.timer - min * 60;
    return `${min} min : ${sec} sec`;
  }
}
