package com.hunjaq.appbackend;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Document(collection = "General") //collection name has to be correct
@Data //allows to not need getters/setters
@AllArgsConstructor //allows to not write allargs constructor
@NoArgsConstructor
public class Question {
    private ObjectId id;
    private String question;

    public void setQuestion(String newQ) {
        question = newQ;
    }

    public String getQuestion() {
        return question;
    }

    public Question(String q) {
        this.id = ObjectId.get();
        question = q;
    }
}