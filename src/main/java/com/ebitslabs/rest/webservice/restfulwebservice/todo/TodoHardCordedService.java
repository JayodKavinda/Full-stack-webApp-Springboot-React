package com.ebitslabs.rest.webservice.restfulwebservice.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardCordedService {

    private static List<Todo> todos = new ArrayList<>();
    private static long idCounter = 0;

    static {
        todos.add(new Todo(++idCounter,"jayodkavinda", "Learn to Dance",new Date(),false));
        todos.add(new Todo(++idCounter,"jayodkavinda", "Learn to Microservices",new Date(),false));
        todos.add(new Todo(++idCounter,"jayodkavinda", "Learn to Angular",new Date(),false));
    }

    public List<Todo> findAll(){
        return todos;
    }

    public Todo deleteById(long id){
        Todo todo = findByid(id);
        if(todo == null) return null;
        
        if(todos.remove(todo))
            return todo;
        return null;
    }

    public Todo findByid(long id) {
        for(Todo todo: todos){
            if(todo.getId() == id){
                return todo;
            }
        }

        return null;
    }

    public Todo saveTodo(Todo todo){
        if(todo.getId() == -1 || todo.getId() == 0){
            todo.setId(++idCounter);
            todos.add(todo);
        }else{
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }
}
