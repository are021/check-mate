import spacy
from random import choice
import json
def cross_reference(dct: dict, models: list, epsi=0.6):
    res = {}
    nlp = spacy.load("en_core_web_md") 
    for key, items in dct.items():

        
        if models[0] not in items or models[1] not in items or models[2] not in items:
            return {"error": "Model not found"}
        
        l1 = items[models[0]]
        l2 = items[models[1]]
        l3 = items[models[2]]
        l1 = json.loads(l1)["information"]
        l2 = json.loads(l2)["information"]
        l3 = json.loads(l3)["information"]

        for i in range(max(len(l1), len(l2), len(l3))):
            if i >= len(l1):
                l1.append("")
            if i >= len(l2):
                l2.append("")
            if i >= len(l3):
                l3.append("")
            value1 = l1[i]
            value2 = l2[i]            
            value3 = l3[i]
            value1 = nlp(str(value1))
            value2 = nlp(str(value2))
            value3 = nlp(str(value3))

            similarity1 = value1.similarity(value2)
            similarity2 = value2.similarity(value3)
            similarity3 = value3.similarity(value1)

            # similarity = sum([similarity1, similarity2, similarity3]) / 3
            similarity = (similarity1 + similarity2 + similarity3) / 3
            if similarity >= epsi:
                res[key] = {"information": choice([l1, l2, l3])}

    return res