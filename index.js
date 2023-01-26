// задаем базовое значение айди
let id = "no";
selectData();

function manageData() {
	// Заполняем msg пустотой
	document.getElementById('msg').innerHTML = "";
	// Инициализируем переменную "name", в которую помещаем то, что пользователь вводит в инпут.
	let name = document.getElementById('name').value;
	// // Если в инпуте ничего нет, то в msg выводим просьбу о заполнении поля ввода
	if (name == '') {
		document.getElementById('msg').innerHTML = 'Please enter your name';
	}
	// Если инпут заполнен то
	else {
		// Если id не поменял своё значение
		if (id == 'no') {
			// Инициализируем переменную, в которую помещаем функцию получения данных
			let arr = getCrudData();

			// Если после попытки получения данных оказалось, что данных нету.
			if (arr == null) {
				// Инициализируем переменную, в которую помещаем данные, которые мы до этого взяли из инпута
				let data = [name];
				// // Активируем функцию, в которую мы помещаем полученные данные
				setCrudData(data);
			}

			// Если после попытки получения данных оказалось, что данных есть.
			else {
				// внедряем в переменную данные из инпута
				arr.push(name);
				// // Активируем функцию, в которую мы помещаем полученные данные
				setCrudData(arr);
			}
			// Оповещаем пользователя о том, что данные были добавлены
			document.getElementById('msg').innerHTML = 'Data added';
		}

		// // Если id строки поменял своё значение
		else {
			// Инициализируем переменную, в которую помещаем функцию получения данных
			let arr = getCrudData();
			arr[id] = name;
			// // Активируем функцию, в которую мы помещаем полученные данные
			setCrudData(arr);
			// Оповещаем пользователя о том, что данные были обновлены
			document.getElementById('msg').innerHTML = 'Data updated';
		}
		// Обнуляем текст внутри инпута после изменения данных
		document.getElementById('name').value = '';
		selectData();
	}
}

// Функция выводит данные в таблицу
function selectData() {
	// Инициализируем переменную, в которую помещаем функцию получения данных
	let arr = getCrudData();
	// Если после попытки получения данных оказалось, что данных есть.
	if (arr != null) {
		// Инициализируем пустую переменную
		let html = '';
		// Инициализируем переменную, которая далее, при помощи цикла, будет показывать номер строки у каждой строки
		let sno = 1;
		// Цикл нужен для помещения в html-ный tbody, построчно, данных из localStorage
		for (let k in arr) {
			// Обновляем пустую переменную, внедряем в неё построчно данные(sno - номер строки, arr[k] - )
			html = html + `<tr>
									 <td>${sno}</td>
									 <td>${arr[k]}</td>
									 <td>
									 		<a href="javascript:void(0)" onclick="editData(${k})">Edit</a>&nbsp;
									   	<a href="javascript:void(0)" onclick="deleteData(${k})">Delete</a>
									 </td>
							   </tr>`;
			sno++;
		}

		// добавленные в html-переменную данные, внедряем в сам html и его tbody с id-шником "root"
		document.getElementById('root').innerHTML = html;
	}
}

function editData(rid) {
	id = rid;
	let arr = getCrudData();
	document.getElementById('name').value = arr[rid];
}

function deleteData(rid) {
	let arr = getCrudData();
	arr.splice(rid, 1);
	setCrudData(arr);
	selectData();
}

// // вывод
function getCrudData() {
	if (document.getElementById('crud')) {
		let arr = JSON.parse(localStorage.getItem('crud'));
		return arr;
	}

	else if (document.getElementById('crud2')) {
		let arr = JSON.parse(localStorage.getItem('crud2'));
		return arr;
	}

	else if (document.getElementById('crud3')) {
		let arr = JSON.parse(localStorage.getItem('crud3'));
		return arr;
	}
}

// // запись
function setCrudData(arr) {
	if (document.getElementById('crud')) {
		localStorage.setItem('crud', JSON.stringify(arr));
	}

	else if (document.getElementById('crud2')) {
		localStorage.setItem('crud2', JSON.stringify(arr));
	}

	else if (document.getElementById('crud3')) {
		localStorage.setItem('crud3', JSON.stringify(arr));
	}

}	
