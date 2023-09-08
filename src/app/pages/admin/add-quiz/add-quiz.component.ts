import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories = [
    {
      c_Id: 0,
      title: '',
    },
  ];

  quiz_data = {
    title: '',
    description: '',
    max_marks: '',
    number_of_questions: '',
    active: true,
    category: {
      c_Id: '',
    },
  };

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
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

  addQuiz() {
    if (this.quiz_data.title.trim() == '' || this.quiz_data.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    // Calling Server
    this._quiz.addQuiz(this.quiz_data).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Quiz Added !!', 'success');
        this.quiz_data = {
          title: '',
          description: '',
          max_marks: '',
          number_of_questions: '',
          active: true,
          category: {
            c_Id: '',
          },
        };
      },
      (error) => {
        Swal.fire('Error !!', "Error adding Quiz !!, 'error");
        console.log(error);
      }
    );
  }
}
