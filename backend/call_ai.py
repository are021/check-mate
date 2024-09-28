import os
from groq import Groq
import json
from pydantic import BaseModel


class FactCheckModel(BaseModel):
    incorrect_information: str
    correct_information: str
    sources: list[str]




def call_ai(text: str) -> str:
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": (
                    f"Fact check this text: {text}, and highlight incorrect information, provide correct information, and provide sources with links. "
                    f"The JSON object must use the schema: {json.dumps(FactCheckModel.model_json_schema(), indent=2)}"
                )
            }
        ],
        model="llama3-8b-8192",
        response_format={"type": "json_object"}  # Changed this to a valid format
    )

    response = FactCheckModel.model_validate_json(chat_completion.choices[0].message.content)
    return json.dumps(response.dict())