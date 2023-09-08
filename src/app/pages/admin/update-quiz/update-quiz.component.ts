import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  categories = [
    {
      c_Id: 0,
      title: '',
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  q_id = 0;
  quiz: any;

  ngOnInit(): void {
    this.q_id = this._route.snapshot.params['q_id'];
    this._quiz.getQuiz(this.q_id).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data: any) => {
        // Loading Categories
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error loading Categories', 'error');
      }
    );
  }

  // Update quiz function
  public update_quiz() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    // Calling Server
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Quiz Updated !!', 'success').then((e) => {
          this.quiz = {
            title: '',
            description: '',
            max_marks: '',
            number_of_questions: '',
            active: true,
            category: {
              c_Id: '',
            },
          };
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        Swal.fire('Error !!', "Error updating Quiz !!, 'error");
        console.log(error);
      }
    );
  }
}
