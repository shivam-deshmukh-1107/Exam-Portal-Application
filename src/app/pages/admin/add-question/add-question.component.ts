import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  q_id: 0 = 0;
  qTitle: any;
  question = {
    quiz: {
      q_id: 0,
    },
    content: 'Write question content...',
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.q_id = this._route.snapshot.params['q_id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['q_id'] = this.q_id;
  }

  formSubmit() {
    if (this.question.content.trim() == '' && this.question.content == null) {
      return;
    }
    if (this.question.option_1.trim() == '' && this.question.option_1 == null) {
      return;
    }
    if (this.question.option_2.trim() == '' && this.question.option_2 == null) {
      return;
    }

    // Submitting Question Data
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Question Added !!', 'success');
        this.question = {
          quiz: {
            q_id: 0,
          },
          content: '',
          option_1: '',
          option_2: '',
          option_3: '',
          option_4: '',
          answer: '',
        };
      },
      (error: any) => {
        Swal.fire('Error !!', "Error adding Question !!, 'error");
        console.log;
      }
    );
  }
}
