import { Component, OnInit } from '@angular/core';
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quiz_icon = faClipboardQuestion;

  quizzes = [
    {
      q_id: 0,
      title: '',
      description: '',
      max_marks: '',
      number_of_questions: '',
      active: '',
      category: {
        title: '',
      },
    },
  ];

  constructor(private _quiz: QuizService) {}
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in Loading Data !', 'error');
      }
    );
  }

  deleteQuiz(q_id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you Sure? \n You want to delete quiz?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete
        this._quiz.deleteQuiz(q_id).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.q_id != q_id);
            Swal.fire('Success !!', 'Quiz Deleted !!', 'success');
          },
          (error: any) => {
            console.log(error);
            Swal.fire('Error !!', 'Error deleting Quiz !!', 'error');
          }
        );
      }
    });
  }
}
