import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppComponent, CommonModule, FormsModule, MatSliderModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-frontend');
  textColor: string = 'white';
  finalValue: number = 0;
  nameError: { error: boolean; helperText: string } = { error: false, helperText: '' };
  characterError: { error: boolean; helperText: string }[] = [
    { error: false, helperText: '' },
    { error: false, helperText: '' },
    { error: false, helperText: '' },
    { error: false, helperText: '' },
  ];
  franchise: { name: string; characters: string[] } = {
    name: 'Mario',
    characters: ['Mario', 'Luigi', 'Peach', 'Daisy'],
  };
  newFranchise: { name: string; characters: string[] } = {
    name: '',
    characters: ['', '', '', ''],
  };
  franchisesList: { name: string; characters: string[] }[] = [
    {
      name: 'Mario',
      characters: ['Mario', 'Luigi', 'Peach', 'Daisy'],
    },
    {
      name: 'Zelda',
      characters: ['Link', 'Zelda', 'Ghirahim', 'Ganondorf'],
    },
    {
      name: 'Pokemon',
      characters: ['Nate', 'Yancy', 'Clay', 'Elesa'],
    },
    {
      name: 'Xenoblade',
      characters: ['Shulk', 'Fiora', 'Rex', 'Nia'],
    },
    {
      name: 'Splatoon',
      characters: ['Callie', 'Marie', 'Shiver', 'Frye'],
    },
  ];
  // Change color dynamically
  onSliderChange(newColor: Event) {
    if (
      Number((newColor.target as HTMLInputElement).value) >= 0 &&
      Number((newColor.target as HTMLInputElement).value) <= 5
    ) {
      this.textColor = '#FFFFFF';
    } else if (
      Number((newColor.target as HTMLInputElement).value) >= 5 &&
      Number((newColor.target as HTMLInputElement).value) <= 10
    ) {
      this.textColor = '#FF0000';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 10 &&
      Number((newColor.target as HTMLInputElement).value) <= 15
    ) {
      this.textColor = '#FF9D00';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 15 &&
      Number((newColor.target as HTMLInputElement).value) <= 20
    ) {
      this.textColor = '#F2FF00';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 20 &&
      Number((newColor.target as HTMLInputElement).value) <= 25
    ) {
      this.textColor = '#B7FF00';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 25 &&
      Number((newColor.target as HTMLInputElement).value) <= 30
    ) {
      this.textColor = '#2FFF00';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 30 &&
      Number((newColor.target as HTMLInputElement).value) <= 35
    ) {
      this.textColor = '#00FF90';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 35 &&
      Number((newColor.target as HTMLInputElement).value) <= 40
    ) {
      this.textColor = '#00FFE1';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 40 &&
      Number((newColor.target as HTMLInputElement).value) <= 45
    ) {
      this.textColor = '#00B3FF';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 45 &&
      Number((newColor.target as HTMLInputElement).value) <= 50
    ) {
      this.textColor = '#0048FF';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 50 &&
      Number((newColor.target as HTMLInputElement).value) <= 55
    ) {
      this.textColor = '#2600FF';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 55 &&
      Number((newColor.target as HTMLInputElement).value) <= 60
    ) {
      this.textColor = '#5D00FF';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 60 &&
      Number((newColor.target as HTMLInputElement).value) <= 65
    ) {
      this.textColor = '#A200FF';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 65 &&
      Number((newColor.target as HTMLInputElement).value) <= 70
    ) {
      this.textColor = '#EA00FF';
    } else if (
      Number((newColor.target as HTMLInputElement).value) > 70 &&
      Number((newColor.target as HTMLInputElement).value) <= 75
    ) {
      this.textColor = '#FF00AA';
    }
    this.finalValue = Number((newColor.target as HTMLInputElement).value);
  }
  changeFranchise(newFranchise: { name: string; characters: string[] }) {
    this.franchise = newFranchise;
  }
  blurName() {
    if (this.newFranchise.name == '') {
      this.nameError = { error: true, helperText: 'Must be non-empty' };
    } else if (
      this.franchisesList.filter((item) => item.name == this.newFranchise.name).length > 0
    ) {
      this.nameError = { error: true, helperText: 'Must be unique franchise name' };
    } else {
      this.nameError = { error: false, helperText: '' };
    }
  }
  blurCharacters(index: number) {
    if (this.newFranchise.characters[index] == '') {
      this.characterError[index] = { error: true, helperText: 'Must be non-empty' };
    } else {
      this.characterError[index] = { error: false, helperText: '' };
    }
  }
  createFranchise(newFranchise: { name: string; characters: string[] }) {
    if (
      !this.characterError[0].error &&
      this.newFranchise.characters[0] != '' &&
      !this.characterError[1].error &&
      this.newFranchise.characters[1] != '' &&
      !this.characterError[2].error &&
      this.newFranchise.characters[2] != '' &&
      !this.characterError[3].error &&
      this.newFranchise.characters[3] != '' &&
      !this.nameError.error &&
      this.newFranchise.name != ''
    ) {
      this.franchisesList.push(newFranchise);
    } else {
      this.blurName();
      this.blurCharacters(0);
      this.blurCharacters(1);
      this.blurCharacters(2);
      this.blurCharacters(3);
    }
  }
  setFranchiseName(name: string) {
    this.newFranchise.name = name;
  }
  setFranchiseCharacter(character: string, index: number) {
    this.newFranchise.characters[index] = character;
  }
}
