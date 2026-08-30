import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppComponent, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-frontend');
  textColor: string = 'white';
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
  changeColor(newColor: string) {
    this.textColor = newColor;
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
