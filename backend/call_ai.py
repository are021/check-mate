import os
from groq import Groq
import json
from pydantic import BaseModel, Field, ValidationError
from typing import List
from langchain_core.prompts import ChatPromptTemplate

from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI


# def call_ai(text: dict):
#     models = ["llama3-8b-8192", "gemma2-9b-it", "mixtral-8x7b-32768", "llava-v1.5-7b-4096-preview"]
#     # llm = ChatOpenAI(
#     #     api_key=os.environ.get("OPENAI_API_KEY"),
#     #     model="gpt-3.5-turbo",
#     #     temperature=0.5,
#     # )
#     llm = ChatGroq(
#     model=models[0],
#     temperature=0.0,
#     )
#     class FactCheckModel(BaseModel):
#         '''
#         Response for Fact Checking Information
#         '''
#         incorrect_information: List[str]
#         correct_information: List[str]
#         uncertain_information: List[str]
#         sources: List[str]
#     responses = {}
#     structured_model = llm.with_structured_output(FactCheckModel)
#     prompt = ChatPromptTemplate.from_messages(
#         [
#             (
#                 "user",  # Specify the role here
#                 (
#                     "Fact check this text: {text}. Please highlight the following in your response: "
#                     "List the Incorrect information, Correct information, Uncertain information"
#                     "Also provide additional URL Linked Sources so the users can be redirected to the site, so users can learn more about the topic"
#                     f"Your JSON object must look like this schema: {FactCheckModel.model_json_schema()}"
#                 )
#             )
#         ]
#     )
#     structured_mode = prompt | structured_model


#     for key, value in text.items():
#         res = structured_model.invoke(value)
#         res = res.dict()

#         responses[key] = res

#     return responses


def call_ai(text: dict):
    class FactCheckModel(BaseModel):
        incorrect_information: List[str]
        correct_information: List[str]
        uncertain_information: List[str]
        sources: List[str]

    models = ["llama3-8b-8192", "gemma2-9b-it", "mixtral-8x7b-32768"]

    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )
    responses = {}

    for key, value in text.items():
        for model in models:
            prompt = f"""Fact check this text: {value}.
                Please highlight the following in your response:
                Incorrect information, Correct information, Uncertain information, and Sources with links in JSON.
                Your JSON object must look like this schema:"""+"""
                {
                "incorrect_information": ["list of incorrect statements"],
                "correct_information": ["list of correct statements"],
                "uncertain_information": ["list of uncertain statements"],
                "sources": ["list of sources with links"]
                }
                """

            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": prompt
                    }
                ],
                model=model,
                response_format={"type": "json_object"}
            )
            # res = json.loads(chat_completion.choices[0].message.content)["properties"]
            # response = FactCheckModel.model_validate_json(chat_completion.choices[0].message.content)
            # if key not in responses:
            #     responses[key] = {model : res}
        
            # responses[key] = json.loads(chat_completion.choices[0].message.content)
            if key not in responses:
                responses[key] = {}

            msg = chat_completion.choices[0].message.content

            responses[key][model] = json.loads(msg)
            # if isinstance(msg, str):
            #     responses[key][model] = {json.loads(msg)}
            # elif isinstance(msg, dict):
            #     responses[key][model] = {chat_completion.choices[0].message.content}
    return responses
