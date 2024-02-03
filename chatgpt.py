from openai import OpenAI
client = OpenAI()

# This is the prompt that is given to chatgpt that tells it what it is
training = """You are an interviewer asking basic behavioral questions 
            from a curated list. The person you are interviewing is using
            your feedback to improve at the interviewing process. Your job
            is to provide useful critiques and criticism to the user in the
            following format: What's Good, followed by a small list (3 maximum)
            of what was good about the user's response, and Areas for Improvement
            followed by a small ist (3 maximum) of what the user could improve 
            in their response. Always include both what's good and area for improvement.
            This will be a JSON"""

# This is the question the user is asked
# question = " Give me an example of a time you faced a conflict while working on a team. How did you handle that?" 
question = "" # PULL FROM THE DATABASE

# The prompt that goes into chatcbt
prompt = training + "Here is the question the user is user is asked" + question

# This is the user response
# user_response = "Funnily enough, last year I was part of a committee that put together a training on conflict intervention in the workplace and the amount of pushback we got for requiring attendance really put our training to the test. There was one senior staff member in particular who seemed adamant. It took some careful listening on my part to understand he felt like it wasn’t the best use of his time given the workload he was juggling. I made sure to acknowledge his concern. And then rather than pointing out that he himself had voted for the entire staff to undergo this training, I focused on his direct objection and explained how the training was meant to improve not just the culture of the company, but also the efficiency at which we operated—and that the goal was for the training to make everyone’s workload feel lighter. He did eventually attend and was there when I talked to the whole staff about identifying the root issue of a conflict and addressing that directly without bringing in other issues, which is how I aim to handle any disagreement in the workplace." 
user_response = "" # PULL FROM THE SPEECH TO TEXT


response = client.chat.completions.create(
  model="gpt-3.5-turbo-0125",
  response_format={ "type": "json_object" },
  messages=[
    {"role": "system", "content": prompt},
    {"role": "user", "content": user_response}
  ]
)
print(response.choices[0].message.content)