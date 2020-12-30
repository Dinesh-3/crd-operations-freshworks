import json

data = {
    "id": 1,
    "name": "Dinesh",
    "age": 20
}

# with open("sample.json", "w") as file:
#     file.write(json.dumps(data))


def insert(data):
    with open("sample.json", "a") as file:
        file.writelines(json.dumps(data))


def delete(id):
    with open("sample.json") as file:
        data = json.load(file)
        print(data)         
# insert({
#     "id": 2,
#     "name": "Gowtham G",
#     "age": 16
# })

delete(1)