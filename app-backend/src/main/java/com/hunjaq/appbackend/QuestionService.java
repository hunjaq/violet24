package com.hunjaq.appbackend;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class QuestionService { //where most of the logic is for returning proper data needed -- will handle returning questions based on diff collections?

    @Autowired //lets framework know to instantiate this class
    private QuestionRepository questionRepo;

    // returns all questions in the db
    public List<Question> allQuestions() {
        return questionRepo.findAll(); //calls repo method -- from mongorepository class
    }

    //function to test that everything is being returned properly and question works
    public List<Question> test() {
        List<Question> list = new ArrayList<Question>();
        Question quest = new Question("Yes");
        list.add(quest);
        return list;
    }
}