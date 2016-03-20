import {Component} from 'angular2/core';

@Component({
	selector: "list-item",
	templateUrl: "app/list-item.html",
	directives: [ListItem],
	inputs: ['value', 'listItems']
})

export class ListItem{
	public listItems: ListItem[];
	public value: string;
	public expanded: boolean = false;

	constructor(){
		this.listItems = [];
	}

	expand(){
		this.expanded = true;	
	}

	//because i dont know the word.. my excuse is uhh:
	//english is my 3rd language lolol fam cuz holla if you're a balla
	implode(){
		this.expanded = false;
	}
}

