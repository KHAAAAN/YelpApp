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
	public numbers: int[];
	public listItems[]: ListItems;

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
		this.listItems.push(listItem);

		/*for(var i = 1; i <= 7; i++){
			this.attrs.push(new Expandable("attribute"+i, []));
		}

		//FOR TESTING
		for(var i = 0; i < 20; i++){
			this.attrs[1].list.push("test1");
		}
		for(var i = 0; i < 20; i++){
			this.attrs[3].list.push("test1");
		}*/
	}

	/*expand(attr){
		attr.expanded = true;	
	}

	//because i dont know the word.. my excuse is uhh:
	//english is my 3rd language lolol fam cuz holla if you're a balla
	implode(attr){
		attr.expanded = false;
	}*/
}

/*class Expandable{
	public name: string;
	public list: string[];
	public expanded: boolean = false;

	constructor(name, list){
		this.name = name;
		this.list = list;
	}
}*/

