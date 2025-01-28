import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
})
export class InputFileComponent {
  label = input('');

  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result || '';
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }
}
