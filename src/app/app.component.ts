import { Component, OnInit } from '@angular/core';

interface NumBlock {
  numValue: number;
  leftStrValue: String;
  rightStrValue: String;
  middleStrValue: String;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'levelGame';
  numbers:number[] = [];
  numBlocks:NumBlock [] = [];
  alert = '';
  showSettings = false;
  minNumberRange = -10;
  maxNumberRange = 10;
  numberOfNumbers = 8;
  winStatus = false;

  ngOnInit() {
    this.startGame();
  }

  startGame(){
    this.winStatus = false;
    this.showSettings = false;
    this.numBlocks = [];
    this.numbers = this.generateNumbers(this.numberOfNumbers, this.minNumberRange, this.maxNumberRange);
    this.numbers.forEach(number => {
      let numBlock = {
        numValue: number,
        leftStrValue: '',
        rightStrValue: '',
        middleStrValue: number.toString()
      };
      this.numBlocks.push(numBlock);
    });
  }

  generateNumbers(amountOfNumbers: number, minRange: number, maxRange: number){
    let numbers: number[] = [];
    let firstSetSum = 0;
    let secondSetSum = 0;
    let index = 0;
    for(let i = 0; i < amountOfNumbers/2; i++) {
      let randNum = this.getRandomInt(minRange, maxRange);
      numbers[index] = randNum;
      firstSetSum += randNum;
      index ++;
    }
    for(let i = 0; i < amountOfNumbers/2 - 1; i++) {
      let randNum = this.getRandomInt(minRange, maxRange);
      numbers[index] = randNum;
      secondSetSum += randNum;
      index ++;
    }
    numbers[index] = (firstSetSum - secondSetSum);
    console.log('numbers');
    console.log(numbers);
    return numbers.sort();
  }

  numberClick(event, index) {
    let clickXPosition = event.offsetX;
    let widthOfClickedElem = document.getElementsByClassName('gridItem')[index - 1].clientWidth;
      if(widthOfClickedElem / 2 > clickXPosition) {
        this.addToLeftSide(index - 1);
      } else {
        this.addToRightSide(index - 1);
      }
  }

  addToLeftSide(numIndex: number){
    if(this.numBlocks[numIndex].rightStrValue === ''){
      this.numBlocks[numIndex].leftStrValue = this.numBlocks[numIndex].numValue.toString();
      this.numBlocks[numIndex].middleStrValue = '';
      this.checkForWin();
    }
  }

  addToRightSide(numIndex: number){
    if(this.numBlocks[numIndex].leftStrValue === ''){
      this.numBlocks[numIndex].rightStrValue = this.numBlocks[numIndex].numValue.toString();
      this.numBlocks[numIndex].middleStrValue = '';
      this.checkForWin();
    }
  }

  rightSideNumberDiscard(numIndex) {
    if(this.numBlocks[numIndex].rightStrValue !== ''){
      this.numBlocks[numIndex].middleStrValue = this.numBlocks[numIndex].rightStrValue;
      this.numBlocks[numIndex].rightStrValue = '';
      this.checkForWin();
    }
  }

  leftSideNumberDiscard(numIndex){
    if(this.numBlocks[numIndex].leftStrValue !== ''){
      this.numBlocks[numIndex].middleStrValue = this.numBlocks[numIndex].leftStrValue;
      this.numBlocks[numIndex].leftStrValue = '';
      this.checkForWin();
    }
  }

  checkForWin(){
    let leftSum = 0;
    let rightSum = 0;
    let totalLeftAndRightBlocks = 0;
    this.numBlocks.forEach(numBlock => {
      if(numBlock.leftStrValue !== '') {
        leftSum = leftSum + numBlock.numValue;
        totalLeftAndRightBlocks ++;
      } else if(numBlock.rightStrValue !== ''){
        rightSum = rightSum + numBlock.numValue;
        totalLeftAndRightBlocks++;
      }
    });
    if(leftSum === rightSum && totalLeftAndRightBlocks === this.numBlocks.length) {
      this.winStatus = true;
    } else {
      this.winStatus = false;
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
