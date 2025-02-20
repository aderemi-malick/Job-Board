##/IMPORTS\##
import pyodbc as odbc
from credential import username, password

from pydantic import BaseModel
from typing import Union
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


##/API INITIALISATION\##
app = FastAPI()

####CORS request permission####
origins = [
    "http://localhost:8000",
    "https://localhost",
    "http://localhost",
    "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Modifiez selon vos besoins de sécurité
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

""" class Companie(BaseModel):
    name: str
    description: Union[str, None] = None
    place: str
    type_companies: str
    sector: str """


####Connection to database####
server = "jobply.database.windows.net"
database = "jobply"
connection_string = "Driver={ODBC Driver 18 for SQL Server};Server="+server+",1433;Database="+database+";UID="+username+";PWD="+password+";Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30"
print("Good connection!")


""" sql = '''
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'AND TABLE_CATALOG='Jobply'
'''
cursor = conn.cursor()
cursor.execute(sql)

dataset = cursor.fetchall()
print(dataset) """


############################################################################/ENDPOINTS\############################################################################

#############################################################################       ROOT         #############################################################################

####Root endpoint####
@app.get("/")
def root():
    print("Root of Person API")
    try:
       data ="Welcome to API!"
       print(data)
        #conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return data

####Companies endpoint####


    


####Peoples endpoint####



####Ads endpoint####


""" @app.post("/apply")
def root():
    print("Root of Person API")
    try:
        apply = ["id_people", "id_ads", "apply_date"]
        result = []
        conn = odbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute('''
         Select * FROM "Apply" FOR JSON AUTO ;
        ''')
        for row in cursor.fetchall():
        #    companie = Companie()
            result.append(dict(zip(apply, row)))
        
        #conn.commit()
    except Exception as e:
        print(e)
    return result """

####Applies endpoint####



####Test endpoint####
@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}



##########################################################################       PEOPLES endpoints      #################################################################

############################People classe#########################
class User(BaseModel):
    lastname: str
    firstname: str
    email: str
    number: Union[str, None] = None
    password: str
    status: Union[str, None] = "Candidat"
    gender: Union[str, None] = None
    age: Union[int, None] = None
    address: Union[str, None] = None
    resume: Union[str, None] = None
    id_companies: Union[int, None] = None





############################ GETS #########################
@app.get("/peoples")
def root():
    print("Root of Person API")
    try:
        people = ["id_people", "lastname", "firstname", "email", "number", "password", "status", "gender", "age", "address", "resume", "id_companies"]
        data = []
        conn = odbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute('''
         Select * 
         FROM People  ;
        ''')
        for row in cursor.fetchall():
            result = {}
            for tag, element in (zip(people, row)):
                result[tag] = element
            data.append(result)
        print(cursor.fetchall())
        
        #conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return data


############################ POSTS #########################
############################Candidate endpoint################################
@app.post("/people_candidat")
def root(user : User):
    try:
        with odbc.connect(connection_string) as conn:
            cursor = conn.cursor()
            cursor.execute(f"INSERT INTO People (lastname, firstname, email, number, password, gender, age, address, resume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", user.lastname, user.firstname, user.email, user.number, user.password,
            user.gender, user.age, user.address, user.resume)
            conn.commit()
        
    except Exception as e:
        raise Exception(status_code=500, detail=str(e))
    return user 



############################Recrutor endpoint##############################
@app.post("/people_recrutor")
def root(user : User):
    try:
        with odbc.connect(connection_string) as conn:
            cursor = conn.cursor()
            cursor.execute(f"INSERT INTO People (lastname, firstname, email, number, password, id_companies) VALUES (?, ?, ?, ?, ?, ?)", user.lastname, user.firstname, user.email, user.number, user.password,
            user.id_companies)
            conn.commit()
        
    except Exception as e:
        raise Exception(status_code=500, detail=str(e))
    return user







##########################################################################       ADS endpoints      #################################################################


############################################Ad classe################################
class Ad(BaseModel):
    titre: str
    id_people: int  # Référence à la personne qui publie l'annonce
    description: str
    contract: str
    deadline: str
    place: str
    publish_date: str
    status: str
    domain: str




################################ GETS ################################
@app.get("/ads")
def root():
    print("Root of Person API")
    try:
        ad = ["id_ads", "titre", "id_people", "description", "contract", "deadline", "place", "publish_date", "domain", "status"]
        data = []
        conn = odbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute('''
         Select * 
        FROM Ads;
        ''')
        for row in cursor.fetchall():
            result = {}
            for tag, element in (zip(ad, row)):
                result[tag] = element
            data.append(result)
        print(cursor.fetchall())
        
        #conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return data






################################ POSTS ################################
@app.post("/new_ad")
def root(ad : Ad):
    try:
        with odbc.connect(connection_string) as conn:
            cursor = conn.cursor()
            cursor.execute(f"INSERT INTO Ads (titre, id_people, description, contract, deadline, place, publish_date, domain, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", ad.titre, ad.id_people, ad.description, ad.contract, datetime.strptime(ad.deadline, '%a %b %d %Y'), ad.place, datetime.strptime(ad.publish_date, '%a %b %d %Y'), ad.domain, ad.status)
            conn.commit()
        
    except Exception as e:
        raise Exception(status_code=500, detail=str(e))
    return ad

##########################################################################     COMPANIES endpoints      #################################################################

############################################Companie classe################################
class Companie(BaseModel):
    name: str
    description: Union[str, None] = None
    place: str
    type_companies: str
    sector: str

###########################################################################################
################################ GETS ################################
@app.get("/companies")
def root():
    print("Root of Person API")
    try:
        companie = ["id_companies", "name", "description", "place", "type_companies", "sector"]
        data = []
        conn = odbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute('''
         Select * 
        FROM Companies ;
        ''')
        for row in cursor.fetchall():
            result = {}
            for tag, element in (zip(companie, row)):
                result[tag] = element
            data.append(result)
        print(cursor.fetchall())
        
        #conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return data

#-------------------------------------------------------------------------------------#

@app.get("/companie_id/{id}")
def read_companie(id : str):
    try:
        with odbc.connect(connection_string) as conn:
            cursor = conn.cursor()
            cursor.execute(f"Select id_companies FROM Companies WHERE name = '{id}';")
            id = list(cursor.fetchone())
            print(id)
    except Exception as e:
        raise Exception(status_code=500, detail=str(e))
    return id


########################################################################################
################################ POSTS ################################
@app.post("/new_companie")
def root(companie : Companie):
    try:
        with odbc.connect(connection_string) as conn:
            cursor = conn.cursor()
            cursor.execute(f"INSERT INTO Companies (name, description, place, type_companies, sector) VALUES (?, ?, ?, ?, ?)", companie.name, companie.description, 
                           companie.place, companie.type_companies, companie.sector)
            conn.commit()
        
    except Exception as e:
        raise Exception(status_code=500, detail=str(e))
    return companie



##########################################################################         APPLIES endpoints       #################################################################


############################################Apply classe################################
class Apply(BaseModel):
    id_people: int
    id_ads: int
    apply_date : str



################################ GETS ################################
@app.get("/applies")
def root():
    print("Root of Person API")
    try:
        apply = ["id_people", "id_ads", "apply_date"]
        data = []
        conn = odbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute('''
         Select * 
         FROM "Apply"  ;
        ''')
        for row in cursor.fetchall():
            result = {}
            for tag, element in (zip(apply, row)):
                result[tag] = element
            data.append(result)
        print(cursor.fetchall())
        
        #conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return data

#------------------------------------------------------------------------------------#

# @app.get("/applies/{id}")
# def read_applies(id : int):
#     try:
#         apply = ["candidatefirst", "candidatelast", "titre", "apply_date"]
#         data = []
#         with odbc.connect(connection_string) as conn:
#             cursor = conn.cursor()
#             cursor.execute(f"SELECT People.firstname, People.lastname, Ads.titre, Apply.apply_date
#                             FROM Apply
#                             INNER JOIN Ads ON Apply.id_ads = Ads.id_ads;
#                             INNER JOIN People ON Ads.id_people = {id};")
#             for row in cursor.fetchall():
#                 result = {}
#                 for tag, element in (zip(apply, row)):
#                     result[tag] = element
#                 data.append(result)
#             print(cursor.fetchall())

#     except Exception as e:
#         raise Exception(status_code=500, detail=str(e))
#     return data


#------------------------------------------------------------------------------------#

@app.get("/my_applies/{id}")
def read_applies(id : int):
    try:
        apply = ["titre", "apply_date", "contract","description" ]
        data = []
        with odbc.connect(connection_string) as conn:
            cursor = conn.cursor()
            cursor.execute(f"SELECT Ads.titre, Apply.apply_date, Ads.contract, Ads.description FROM Apply INNER JOIN Ads ON Apply.id_people = {id};")
                 
            for row in cursor.fetchall():
                result = {}
                for tag, element in (zip(apply, row)):
                    result[tag] = element
                data.append(result)
            print(cursor.fetchall())

    except Exception as e:
        raise Exception(status_code=500, detail=str(e))
    return data


################################ POSTS ################################

@app.post("/new_apply")
def root(apply : Apply):
    try:
        with odbc.connect(connection_string) as conn:
            cursor = conn.cursor()
            cursor.execute(f"INSERT INTO applys (id_people, id_ads, apply_date) VALUES (?, ?, ?)", apply.id_people, apply.id_ads, datetime.strptime(apply.apply_date, '%a %b %d %Y'))
            conn.commit()
        
    except Exception as e:
        raise Exception(status_code=500, detail=str(e))
    return apply






























