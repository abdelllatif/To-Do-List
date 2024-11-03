<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.0.7/css/boxicons.min.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>To-Do List</title>
</head>
<body class="bg-gray-100 flex flex-col min-h-screen">

  <nav class="bg-blue-600 shadow">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
      <div class="flex items-center">
        <img src="img/read.png" alt="Logo" class="h-10 mr-3">
        <h1 class="text-xl font-bold">My To-Do List</h1>
      </div>
      <div class="hidden md:flex space-x-4">
        <a href="index.html" class="font-bold hover:text-gray-200">Home</a>
        <a href="tasks.html" class="font-bold hover:text-gray-200">Tasks</a>
        <a href="about.html" class="font-bold hover:text-gray-200">About Us</a>
      </div>
      <div class="md:hidden">
        <button onclick="toggleMenu()" class="text-white">
          <i class="bx bx-menu text-3xl"></i>
        </button>
      </div>
    </div>
  </nav>

  <div id="mobileMenu" class="fixed top-0 right-0 h-full w-64 bg-blue-600 text-white transform translate-x-full transition-transform duration-300 z-40">
    <div class="p-4 flex justify-end">
      <button onclick="toggleMenu()" class="text-white">
        <i class="bx bx-x text-3xl"></i>
      </button>
    </div>
    <div class="flex flex-col space-y-4 p-4">
      <a href="index.html" class="hover:text-gray-200 text-2xl">Home</a>
      <a href="tasks.html" class="hover:text-gray-200 text-2xl">Tasks</a>
      <a href="about.html" class="hover:text-gray-200 text-2xl">About Us</a>
    </div>
  </div>


  <main class="flex-grow">
    <div class="flex flex-col items-center mt-10 text-center">
      <h1 class="text-3xl font-bold text-blue-600 mt-16  mb-6">To-Do or Not To-Do: Let the Tasks Begin</h1>
      <img class="w-11 h-14" src="img/do-not.png" alt="do or not!">
    </div>

    <div class="flex justify-center mt-8">
      <div class="relative w-72 sm:w-96">
        <input type="text" placeholder="Search tasks..." class="w-full pl-10 p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <i class="bx bx-search-alt-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
      </div>
    </div>

    <div class="flex justify-center mt-8">
      <button onclick="togglePopup()" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition duration-200">Add New Task</button>
    </div>

    <div id="popup" class="hidden fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96">
        <h2 class="text-2xl font-bold mb-4 text-center text-blue-600">Task Details</h2>
        <input type="text" id="taskInput" placeholder="Add a new task" class="p-2 w-full rounded-md border border-gray-300 mb-2" />
        <textarea class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" id="description" name="description" rows="4" maxlength="230" placeholder="Enter your description here..."></textarea>
        <div class="flex flex-col space-y-2 mb-2">
          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select id="prioritySelect" class="p-2 rounded-md flex-1 border border-gray-300 w-full sm:w-auto">
              <option value="" disabled selected>Select Priority</option>
              <option value="P1" class="text-red-600 font-bold">P1</option>
              <option value="P2" class="text-orange-600 font-bold">P2</option>
              <option value="P3" class="text-green-600 font-bold">P3</option>
            </select>
            <input type="date" id="dueDateInput" class="p-2 rounded-md flex-1 border border-gray-300 w-full sm:w-auto" />
          </div>
          <select id="statusSelect" class="p-2 w-full rounded-md border border-gray-300 mb-2">
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Done</option>
          </select>
        </div>
        
        
        <button onclick="addTask()" class="bg-blue-600 text-white w-full p-2 rounded-md mt-2 hover:bg-blue-500 transition duration-200">Save Task</button>
        <button onclick="togglePopup()" class="w-full p-2 rounded-md mt-2 text-gray-500 border border-gray-300 hover:bg-gray-200 transition duration-200">Cancel</button>
      </div>
    </div>
    <div class="flex justify-center mt-8 flex-wrap gap-4 mx-4"> 
      <div class="bg-gray-400 w-full sm:w-80 min-h-48 p-4 shadow-lg rounded-lg overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-semibold text-white">To Do <span id="todoCount">(0)</span></h3>
          <img class="w-11 h-14" src="img/start.png" alt="">
        </div>
        <ul id="todoList" class="space-y-2"></ul>
      </div>
    
      <div class="bg-gray-400 w-full sm:w-80 min-h-48 p-4 shadow-lg rounded-lg overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-semibold text-white">In Progress <span id="inProgressCount">(0)</span></h3>
          <img class="w-11 h-14" src="img/progress.png" alt="">
        </div>
        <ul id="inProgressList" class="space-y-2"></ul>
      </div>
    
      <div class="bg-gray-400 w-full sm:w-80 min-h-48 p-4 shadow-lg rounded-lg overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-semibold text-white">Completed <span id="completedCount">(0)</span></h3>
          <img class="w-11 h-14" src="img/done.png" alt="">
        </div>
        <ul id="completedList" class="space-y-2"></ul>
      </div>
    </div>
    
  </main>

  <footer class="bg-gray-900 text-white text-center h-72 mt-10 py-6 text-2xl flex items-center">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-center space-x-4 mb-4">
        <a href="#" class="hover:text-gray-300"><i class="bx bxl-facebook-square text-2xl"></i></a>
        <a href="#" class="hover:text-gray-300"><i class="bx bxl-twitter text-2xl"></i></a>
        <a href="#" class="hover:text-gray-300"><i class="bx bxl-linkedin-square text-2xl"></i></a>
        <a href="#" class="hover:text-gray-300"><i class="bx bxl-instagram text-2xl"></i></a>
      </div>
      <div class="flex justify-center space-x-4 mb-4 text-2xl">
        <a href="#" class="hover:text-gray-300">Privacy Policy</a>
        <span>|</span>
        <a href="#" class="hover:text-gray-300">Terms of Service</a>
        <span>|</span>
        <a href="about.html" class="hover:text-gray-300">About Us</a>
      </div>
      <p class="text-2xl text-gray-400">© 2024 My To-Do List. All rights reserved.</p>
    </div>
  </footer>
  <script src="test.js"></script>
</body>
</html>
