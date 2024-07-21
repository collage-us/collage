# """Code for the Custom Collage AI Agent."""
import os
from dotenv import load_dotenv
from llama_index.agent.openai import OpenAIAgent
from llama_index.llms.openai import OpenAI
from typing import List, Dict, Any

load_dotenv()

# Initialize the language model (assuming you have an OpenAI key and library setup)
curr_model = 'gpt-4o-mini'
api_key = os.getenv("OPENAI_API_KEY")

if api_key is None:
    raise ValueError("OPENAI_API_KEY is not set in the environment variables")

collage_ai = OpenAI(model=curr_model)

# Placeholder for the database of student backgrounds
# In a real implementation, this would be connected to an actual database
student_database: Dict[str, Any] = {
    "Jaden": {
        "background": "Computer Science major with interest in AI and data science.",
        "career_goal": "AI Researcher"
    },
    "Alex": {
        "background": "Business major with a focus on marketing and entrepreneurship.",
        "career_goal": "Marketing Manager"
    }
}

# Function to retrieve student information from the database
def get_student_info(student_id: str) -> Dict[str, Any]:
    return student_database.get(student_id, {"error": "Student not found."})


# Function to generate a response using OpenAI's language model
def generate_response(prompt, question) -> str:
    agent = OpenAIAgent.from_tools(
        llm=collage_ai,
        verbose=True,
        system_prompt=prompt,
    )
    response = agent.chat(question)
    return str(response)


# Chatbot function to handle user input and respond appropriately
def collage_ai_assistant(user_input: str) -> str:
    parts = user_input.split(':')
    if len(parts) != 2:
        return "Invalid input format. Please use the format: <student_id>: <your question>"

    student_id, query = parts
    student_info = get_student_info(student_id.strip())

    if "error" in student_info:
        return student_info["error"]

    # Construct the prompt for the OpenAI model
    background = student_info.get("background", "")
    career_goal = student_info.get("career_goal", "")
    prompt = (
        f"You are a Collage AI assistant with the following student information:\n"
        f"Please introduce yourself as Special Collage AI Assistant (Collage, not College) at the first response"
        f"Background: {background}\n"
        f"Career Goal: {career_goal}\n\n"
        f"Provide a detailed and informative response."
    )

    response = generate_response(prompt, query.strip())
    return response


# Example usage of the chatbot in a simple interactive loop
def main():
    print("Welcome to the Collage AI Assistant!")
    print("Format: <student_id>: <your question>")
    print("Example: Jaden: What classes do you recommend?")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            break
        response = collage_ai_assistant(user_input)
        print(f"Collage AI Assistant: {response}")


if __name__ == "__main__":
    main()