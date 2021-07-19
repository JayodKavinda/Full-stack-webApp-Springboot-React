package com.ebitslabs.rest.webservice.restfulwebservice.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200" )
public class HelloWorldController {

    @GetMapping(path="/hello-world")
    public String helloWorld(){
        return "Hello World";
    }

    @GetMapping(path="/hello-world-bean")
    public HelloWorldBean helloWorldBean(){
        return new HelloWorldBean("hello");
    }

    @GetMapping(path="/hello-world/path/{name}")
    public HelloWorldBean helloWorldPathVariable(@PathVariable String name){
        //throw new RuntimeException("something went wrong");
        return new HelloWorldBean(String.format("hello, %s", name));
    }
}
