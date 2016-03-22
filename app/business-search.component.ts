import {Component, OnInit} from 'angular2/core';
import {ListItem} from './list-item';

@Component({
	selector: 'business-search',	
	templateUrl: 'app/business-search.component.html',
	styleUrls: ['app/business-search.component.css'],
	directives: [ListItem]
})

export class BusinessSearchComponent implements OnInit{
	//public attrs: Expandable[];				
	public addedCats: string[];
	public cats: string[]; //unadded categories
	public numbers: number[];
	public listItems: ListItem[];

	ngOnInit(){
		//this.attrs = [];
		this.addedCats = [];
		this.cats = [];
		this.numbers = [];
		this.listItems = [];

		for(var i = 1; i <= 7; i++){
			this.numbers.push(i);
		}

		var listItem = new ListItem();
		listItem.value = "TEST";

		var innerListItem = new ListItem();
		innerListItem.value = "TEST2";

		listItem.listItems.push(innerListItem);
		this.listItems.push(listItem);

	}
}
