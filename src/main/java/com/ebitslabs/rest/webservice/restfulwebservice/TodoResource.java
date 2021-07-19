package com.ebitslabs.rest.webservice.restfulwebservice;

import com.ebitslabs.rest.webservice.restfulwebservice.todo.Todo;
import com.ebitslabs.rest.webservice.restfulwebservice.todo.TodoHardCordedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200" )
public class TodoResource {

    @Autowired
    private TodoHardCordedService service;

    @GetMapping(path = "/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username){
       return service.findAll();
    }

    @GetMapping(path = "/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable long id){
        return service.findByid(id);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){
        Todo todo =  service.deleteById(id);
        if(todo != null){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo){
        Todo todoNew =  service.saveTodo(todo);
        return new ResponseEntity<Todo>(todo,HttpStatus.OK);
    }

    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Todo> saveTodo(@PathVariable String username, @RequestBody Todo todo){
        Todo createTodo =  service.saveTodo(todo);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(createTodo.getId()).toUri();
        return  ResponseEntity.created(uri).build();
    }
}
