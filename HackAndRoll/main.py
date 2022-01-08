from ast import parse
from flask import Flask, json, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from numpy import broadcast
import HackAndRoll.word_matching as word_matching
import HackAndRoll.database as database
import spacy
from flask_socketio import SocketIO, emit, send
import eventlet
import json

app = Flask(__name__,static_url_path="",static_folder="frontend/public")
CORS(app, resources={r'/*': {'origins': '*'}}) 
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

nlp = spacy.load("en_core_web_sm")
cuisines = json.load("HackAndRoll/cuisines.json")
locs = {"north":(1.437654934223027, 103.7890098692578),"south":(1.266075163515114, 103.82340848233613),"east":(1.3267096173254058, 103.94050037904894),"west":(1.318826868074472, 103.7630842996342),"central":(1.292037330209688, 103.85111964964663),"town":(1.292037330209688, 103.85111964964663)}

def parse_email(email):
    return email.replace("@","__").replace(".","__")

# @app.route("/")
# def home_page():
#     return "home"

# @app.route("/trainmodel")
# def train_model():
#     global nlp
#     nlp, trained = word_matching.train_cuisines(nlp)
#     return "Model Trained Successfully" if trained else "Error training model"

# @app.route("/message", methods=["POST"])
# def process_message():
#     # {email: email, message:message}
#     pass

@socketio.on("join")
def user_join_chat(m):
    emit("botmessage",{"id":"bot","message":"Hello there! Ask me for a recommendation!"})

@socketio.on("message")
def user_message(m):
    #const data = {
#     restaurant: "Genki Sushi",
#     restaurantPic: "",
#     desc: "Genki Sushi is a chain of conveyor belt sushi restaurants established in 1990 in Japan.",
#     locationDesc: "Nearest Outlet: Genki Sushi Orchard Central (15km)",
#     url: "https://www.genkisushi.com.sg/",
#     reviews: ["Wow its so nice!!", "Highly recommended!"],
#   }
    user_cuisines = set()
    user_location = ""
    for i in m:
        if i in cuisines:
            user_cuisines.add(cuisines[i])
        if i in locs:
            user_location = i
    doc = nlp(m)
    # for ent in doc.ents:
    #     if ent.label_ == "NORP":
    #         user_cuisines.add(ent.text)
    #     if ent.label_ == "FACILITY":
    #         user_location.add(ent.text)
    
    recommendations = database.get_best_result(user_cuisines,user_location)
    emit('botmessage', {"id": "bot", "data":m}) #{"recommendations":[{},{}]}

@app.route("/validatelogin", methods=["POST"])
def validate_login():
    # {email:email,password:password}
    # hash the plain text using the password first
    email = parse_email(request.json["email"])
    password = request.json["password"]
    response = database.validate_user(email,password)
    if response:
        return jsonify({"payload":email})
    return jsonify({"payload":None})

@app.route("/setpreference",methods=["POST"])
def set_preference():
    # {email:email, preference:preference, age:age}
    email = parse_email(request.json["email"])
    age = request.json["age"]
    cuisines = request.json["cuisines"]
    if database.add_cuisine(email,cuisines) and database.set_age(email,age):
        return jsonify({"State":"Successfully set preference"})
    return jsonify({"State":"Failed to set preference"})

@app.route("/checkregistered",methods=["POST"])
def check_registered():
    # {email:email}
    email = parse_email(request.json["email"])
    if database.has_preference(email):
        return jsonify({"payload":True})
    return jsonify({"payload":False})

@app.route("/register",methods=["POST"])
def register_user():
    email = parse_email(request.json["email"])
    password = request.json["password"]
    if database.add_user(email,password):
        return jsonify({"State":"Successfully registered " + request.json["email"]})
    return jsonify({"State":"Error registering user."})

