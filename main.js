//input안에 값을 입력하면 value값이 리스트에 저장됨.
//아무거도 안눌린것은 > Not done 에 있음
//했음 버튼 클릭 > done 탭에 이동됨
//했음 버튼 누를 시에 class 추가
//했음 버튼 한번더 누르면 해제
//삭제 버튼 클릭 > 삭제

let todoText = document.getElementById("todo-text");
let addButton = document.getElementById("add-button");
let addList = document.getElementById("add-list");
let closeButton = document.getElementById("close-button");
let mode = "all_tab";
let filterlist = [];
let Tabs = document.querySelectorAll(".list-tabs div");

for (let i = 0; i < Tabs.length; i++) {
	Tabs[i].addEventListener("click", function (event) {
		filter(event);
	});
}

let todolist = [];
addButton.addEventListener("click", addTask);

function addTask() {
	let task = {
		id: createRandomId(),
		taskContent: todoText.value,
		isCompelte: false,
	};
	todolist.push(task);
	renderTodolist();
	console.log(todolist);
}

function renderTodolist() {
	let list = [];
	if (mode == "all_tab") {
		list = todolist;
	} else if (mode == "doing_tab" || mode == "done_tab") {
		list = filterlist;
	}

	let resulttask = "";
	for (let i = 0; i < list.length; i++) {
		if (list[i].isCompelte == true) {
			resulttask += `<div id="list">
				<div id="task-text" class="done-check">${list[i].taskContent}</div>
				<div class="list-button">
					<button onclick= doneButton("${list[i].id}")>했음</button>
					<button onclick = deleteButton("${list[i].id}")>삭제</button>
				</div>
			</div>`;
		} else {
			resulttask += `<div id="list">
				<div id="task-text">${list[i].taskContent}</div>
				<div class="list-button">
					<button onclick = doneButton("${list[i].id}")>했음</button>
					<button onclick = deleteButton("${list[i].id}")>삭제</button>
				</div>
			</div>`;
		}
	}

	addList.innerHTML = resulttask;
}

function createRandomId() {
	return "_" + Math.random().toString(36).substr(2, 9);
}

function doneButton(id) {
	for (let i = 0; i < todolist.length; i++) {
		if (todolist[i].id == id) {
			todolist[i].isCompelte = !todolist[i].isCompelte;
			break;
		}
	}

	filter();
}

function deleteButton(id) {
	for (let i = 0; i < todolist.length; i++) {
		if (todolist[i].id == id) {
			todolist.splice(i, 1);
		}
	}

	filter();
}

function filter(event) {
	if (event) {
		mode = event.target.id;
		console.log("event일어남");
	}
	filterlist = [];
	console.log();
	if (mode === "doing_tab") {
		for (let i = 0; i < todolist.length; i++) {
			if (todolist[i].isCompelte == false) {
				filterlist.push(todolist[i]);
			}
		}
	} else if (mode === "done_tab") {
		for (let i = 0; i < todolist.length; i++) {
			if (todolist[i].isCompelte == true) {
				filterlist.push(todolist[i]);
			}
		}
	}
	renderTodolist();
}
