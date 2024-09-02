// 엘러먼트 아이디 선택자에 접근
let todoTitle = document.getElementById("todo_title");
let todoText = document.getElementById("todo_text");
let todoLists = document.getElementById("todo_lists");
const todoForm = document.getElementById("todo_form");

// 로컬스토리지 설정
let locStore = JSON.parse(localStorage.getItem("todos")) || [];

// 폼 리셋
function todoFormReset() {
  todoTitle.value = "";
  todoText.value = "";
}

// 페이지 새로고침시 보여지는 데이터
locStore.forEach((value) => {
  todoLists.innerHTML += `
     <div>
        <h4>${value.title}</h4>
        <p>${value.text}</p>
        <button onclick={()=>deleteTodo(${value.id})} >삭제</button>
    </div>
    `;
});

// 폼 제출시 발생되는 동작
todoForm.addEventListener("submit", function (event) {
  // form 기본동작 방지
  event.preventDefault();

  // 입력되는 할일 데이터
  const todo = {
    id: crypto.randomUUID(),
    title: todoTitle.value,
    text: todoText.value,
  };

  // 로컬스토리지에 저장되는 로직
  locStore.push(todo);
  localStorage.setItem("todos", JSON.stringify(locStore));

  // todoList 게시글 전체를 초기화하고 todo 데이터 전체 렌더링하여 중복을 해결하였습니다.
  todoLists.innerHTML = "";
  locStore.forEach((value) => {
    todoLists.innerHTML += `
     <div>${value.text}</div>
    `;
  });

  // 입력후 리셋
  todoFormReset();

  // 만일 공백을 입력할시 경고 메세지를 출력합니다.
  if (todo.title === "" || todo.text === "")
    return window.alert("빈칸을 모두 입력해주세요");
});
