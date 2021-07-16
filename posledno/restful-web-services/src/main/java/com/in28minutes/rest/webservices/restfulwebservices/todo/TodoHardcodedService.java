package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardcodedService {

	private static List<Todo> todos = new ArrayList<>();
	private static long idCounter = 0;

	static {
//		todos.add(new Todo(++idCounter, "in28minutes", "Learn to Dance 2", "dsada", new Date(), new Date(),false, 11));
//		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Microservices 2", "dsadsa", new Date(), new Date(),false, 11));
//		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Angular", "dsadsa", new Date(), new Date(),false, 11));
	}

	public List<Todo> findAll() {
		return todos;
	}
	
	public Todo save(Todo todo) {
		if(todo.getId()==-1 || todo.getId()==0) {
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}

	public Todo deleteById(long id) {
		Todo todo = findById(id);

		if (todo == null)
			return null;

		if (todos.remove(todo)) {
			return todo;
		}

		return null;
	}

	public Todo findById(long id) {
		for (Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}

		return null;
	}
}