import os

from groq import Groq


def call_ai(text: str) -> str:
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Fact check this text: {text}, and highlight incorrect information, provide correct information, and provide sources.",
            }
        ],
        model="llama3-8b-8192",
    )

    return chat_completion.choices[0].message.content