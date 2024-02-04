package com.hunjaq.appbackend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController { //only meant to take response and return -- api layer
    
    @Autowired
    private QuestionService questionService;

    //getter
    @GetMapping("/all")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return new ResponseEntity<List<Question>>(questionService.allQuestions(), HttpStatus.OK);
    }

    // @GetMapping
    // public ResponseEntity<List<Question>> testQuestion() {
    //     return new ResponseEntity<List<Question>>(questionService.test(), HttpStatus.OK);
    // }
}