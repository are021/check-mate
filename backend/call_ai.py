import os
from groq import Groq
import json
from pydantic import BaseModel, Field, ValidationError
from typing import List, Tuple
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
        # incorrect_information: List[str]
        # correct_information: List[str]
        # uncertain_information: List[str]
        information: List[List[str]]
        # sources: List[str]

    # models = ["llama3-8b-8192", "gemma2-9b-it", "mixtral-8x7b-32768"]
    models = ["llama3-8b-8192"]

    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )
    responses = {}

    for key, value in text.items():
        # for model in models:
            # prompt = f"""Fact check this text: {value}.
            #     Please highlight the following in your response:
            #     Incorrect information, Correct information, Uncertain information, and Sources with links in JSON.
            #     Your JSON object must look like this schema:"""+"""
            #     {
            #     "incorrect_information": ["list of incorrect statements"],
            #     "correct_information": ["list of correct statements"],
            #     "uncertain_information": ["list of uncertain statements"],
            #     "sources": ["list of sources with links"]
            #     }
            #     """
        prompt = f"""Fact check this text: {value}.
            Please highlight the following in your response:
            Incorrect information, Correct information, Uncertain information, and Sources with links in JSON.
            Your JSON object must look like this schema:"""+"""
            {
            "information": [["0 for incorrect statements, "incorrect statement", "links for correct information"], ["1 for correct statements", "correct statement", "links for correct information"], ["2 for uncertain statements", "uncertain statement", "links for correct information"]],
            }
            """

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": prompt
                }
            ],
            model=models[0],
            response_format={"type": "json_object"}
        )

        if key not in responses:
            responses[str(key)] = {}

        msg = chat_completion.choices[0].message.content

        responses[str(key)] = json.loads(msg)
        # Second part is get the sources
    return responses
