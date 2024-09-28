import os
from groq import Groq
import json
from pydantic import BaseModel


class FactCheckModel(BaseModel):
    incorrect_information: str
    correct_information: str
    uncertain_information: str
    sources: list[str]


# models = ["llama3-8b-8192", "gemma2-9b-it", "mixtral-8x7b-32768", "llava-v1.5-7b-4096-preview"]
models = ["llama3-8b-8192"]


def call_ai(text: dict) -> str:
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )

    responses = {}

    for key, value in text.items():
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": (
                        f"Fact check this text: {text}, and highlight incorrect information, uncertain information, provide correct information, and provide sources with links. "
                        f"The JSON object must use the schema: {json.dumps(FactCheckModel.model_json_schema(), indent=2)}"
                    )
                }
            ],
            model=models[0],
            response_format={"type": "json_object"}  # Changed this to a valid format
        )


        response = FactCheckModel.model_validate_json(chat_completion.choices[0].message.content)
        responses[key] = response.dict()
    return json.dumps(responses)