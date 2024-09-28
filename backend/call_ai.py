import os
from groq import Groq
import json
from pydantic import BaseModel, Field, ValidationError
from typing import List
from langchain_core.prompts import ChatPromptTemplate

from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI


def call_ai(text: dict):
    models = ["llama3-8b-8192", "gemma2-9b-it", "mixtral-8x7b-32768", "llava-v1.5-7b-4096-preview"]
    llm = ChatOpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
        model="gpt-3.5-turbo",
        temperature=0.5,
    )
    # llm = ChatGroq(
    # model=models[0],
    # temperature=0.0,
    # )
    class FactCheckModel(BaseModel):
        '''
        Response for Fact Checking Information
        '''
        incorrect_information: List[str]
        correct_information: List[str]
        uncertain_information: List[str]
        sources: List[str]
    responses = {}
    structured_model = llm.with_structured_output(FactCheckModel)
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "user",  # Specify the role here
                (
                    "Fact check this text: {text}. Please highlight the following in your response: "
                    "List the Incorrect information, Correct information, Uncertain information"
                    "Also provide additional URL Linked Sources so the users can be redirected to the site, so users can learn more about the topic"
                    f"Your JSON object must look like this schema: {FactCheckModel.model_json_schema()}"
                )
            )
        ]
    )
    structured_mode = prompt | structured_model


    for key, value in text.items():
        res = structured_model.invoke(value)
        res = res.dict()

        responses[key] = res

    return responses


# def call_ai(text: dict):
#     # class FactCheckModel(BaseModel):
#     #     incorrect_information: str
#     #     correct_information: str
#     #     uncertain_information: str
#     #     sources: List[str]
#     class FactCheckModel(BaseModel):
#         incorrect_information: List[str]
#         correct_information: List[str]
#         uncertain_information: List[str]
#         sources: List[str]

#     # class FactCheckModel(BaseModel):
#     #     # i: str
#     #     # fact: List[str] = Field(..., description="A list of facts about the subject")
#     #     incorrect_information: List[str] = Field(..., description="A list of incorrect information")
#     #     correct_information: List[str] = Field(..., description="A list of correct information")
#     #     uncertain_information: List[str] = Field(..., description="A list of uncertain information")
#     #     sources: List[str] = Field(..., description="A list of sources with links")



#     models = ["llama3-8b-8192", "gemma2-9b-it", "mixtral-8x7b-32768", "llava-v1.5-7b-4096-preview"]
#     # models = ["llama3-8b-8192"]

#     client = Groq(
#         api_key=os.environ.get("GROQ_API_KEY"),
#     )
#     responses = {}

    
#     for key, value in text.items():
#         prompt_content = (
#             f"Fact check this text: {value}. "
#             f"Please highlight the following in your response: Incorrect information, Correct information, Uncertain information, and Sources with links in JSON "
#             f"Your JSON object must look like this schema: {json.dumps(FactCheckModel.model_json_schema())}"
#         )

#         chat_completion = client.chat.completions.create(
#             messages=[
#                 {
#                     "role": "user",
#                     "content": prompt_content
#                 }
#             ],
#             model="llama3-8b-8192",
#             response_format={"type": "json_object"}
#         )
#         res = json.loads(chat_completion.choices[0].message.content)["properties"]
#         # response = FactCheckModel.model_validate_json(json.dumps(res))
#         responses[key] = json.dumps(res)

#     return json.dumps(responses)
