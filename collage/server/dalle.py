from openai import OpenAI
from dotenv import load_dotenv
import os

# load_dotenv()

# api_key = os.getenv("OPENAI_API_KEY")
# client = OpenAI(api_key=api_key)

# TODO: for CI/CD
client = OpenAI()

def generate_image(model, prompt):
    response = client.images.generate(
        model=model, # "dall-e-3"
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )

    image_url = response.data[0].url

    return image_url


def format_prompt(course_description, class_topic):
    return f"A college class about {class_topic} with the content of {course_description} "
